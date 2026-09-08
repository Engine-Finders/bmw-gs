#!/usr/bin/env python3
"""
BMW Garage content migration script.

Generates src/data/{model,variant,engine-family}/*.json and matching
src/app/bmw-*/page.js routes for every source file in:
  BMW-models/*.md
  "Garage Site - Vairant Pages BMW"/*.txt
  "Garage Site - Engine Pages BMW"/*.txt

Strategy: the 3 already-built reference pages (3 Series model, 320d variant,
B58 engine-family) are used as JSON *templates*. For every new source file we
deep-copy the matching template, text-substitute the reference vehicle's name
for the new one across all string leaves (so boilerplate copy - reviews,
process steps, trust bar, gallery captions etc. - reads correctly for the new
page without being reinvented), then override the specific data-bearing
fields (price, specs, generations, engine codes, FAQ, variant/family lists)
with values parsed out of the new source file.

Usage:
  python scripts/migrate_bmw_content.py --type model|variant|engine|all [--dry-run] [--limit N]
"""
import argparse
import copy
import json
import re
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
DATA = SRC / "data"
APP = SRC / "app"
COMPONENTS = SRC / "components"

MODEL_MD_DIR = ROOT / "BMW-models"
VARIANT_TXT_DIR = ROOT / "Garage Site - Vairant Pages BMW"
ENGINE_TXT_DIR = ROOT / "Garage Site - Engine Pages BMW"

OUT_DIR = ROOT / "scripts" / "output"

# ---------------------------------------------------------------------------
# Reference pages used as JSON templates (already hand-tuned, never overwritten)
# ---------------------------------------------------------------------------
MODEL_REF = {"slug": "bmw-3-series-engines", "prefix": "bmw3Series", "name": "3 Series", "count": 18}
VARIANT_REF = {"slug": "bmw-320d-engines", "prefix": "bmw320d", "name": "320d", "count": 13}
ENGINE_REF = {"slug": "bmw-b58-engine", "prefix": "b58", "name": "B58", "count": 11}

# The closed icon vocabulary from src/components/reusable/Icon.js — anything
# outside this list is silently rendered as "gear" by the component, so the
# generator must only ever pick from here.
KNOWN_ICONS = {
    "bearing", "building", "calendar", "camera", "car", "chain", "chart", "check",
    "clipboard", "clock", "code", "cog", "crane", "engine", "engine-light", "flag",
    "fuel", "gasket", "gauge", "gear", "gears", "gem", "guide", "knock", "layers",
    "link", "lock", "medal", "monitor", "note", "oil", "oil-can", "phone", "pin",
    "piston", "power", "price", "pulse", "pump", "refresh", "road", "search",
    "shield", "shield-check", "sliders", "smoke", "speed", "star", "tech", "tool",
    "truck", "turbo", "value", "warning", "wrench",
}

ENGINE_CODES = [
    "B37", "B38", "B47", "B48", "B57", "B58", "M54", "N13", "N20", "N47", "N52",
    "N54", "N55", "N57", "N63", "N63TU", "N74", "S54", "S55", "S58", "S62", "S63",
    "S63TU", "S65", "S68", "S85",
]
ENGINE_CODE_RE = re.compile(r"\b([BMNS]\d{2,3}(?:TU)?)\b")

NON_BMW_SKIP = {"mercedes-amg gt.txt"}


# ---------------------------------------------------------------------------
# generic helpers
# ---------------------------------------------------------------------------
def slugify(text):
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    text = text.lower().strip()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return re.sub(r"-+", "-", text).strip("-")


def load_template(prefix, count):
    """Load the N reference JSON sections for a page type, keyed 1..count."""
    folder = {"bmw3Series": "model", "bmw320d": "variant", "b58": "engine-family"}[prefix]
    out = {}
    for n in range(1, count + 1):
        p = DATA / folder / f"{prefix}Sec{n}.json"
        out[n] = json.loads(p.read_text(encoding="utf-8"))
    return out


def replace_strings(obj, replacements):
    """Recursively apply an ordered list of (old, new) str.replace pairs to
    every string leaf in a JSON-like structure (dict/list/str/other)."""
    if isinstance(obj, dict):
        return {k: replace_strings(v, replacements) for k, v in obj.items()}
    if isinstance(obj, list):
        return [replace_strings(v, replacements) for v in obj]
    if isinstance(obj, str):
        out = obj
        for old, new in replacements:
            if old:
                out = out.replace(old, new)
        return out
    return obj


def set_path(d, path, value):
    """path like 'specs.rows' or 'cards' — sets d[path...] = value if the
    parent exists; no-ops safely if the shape doesn't match (defensive)."""
    parts = path.split(".")
    cur = d
    for p in parts[:-1]:
        if not isinstance(cur, dict) or p not in cur:
            return False
        cur = cur[p]
    if not isinstance(cur, dict):
        return False
    cur[parts[-1]] = value
    return True


def write_json(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def read_text(path):
    return path.read_text(encoding="utf-8", errors="replace")


# ---------------------------------------------------------------------------
# generic content extraction (shared across the 3 source formats)
# ---------------------------------------------------------------------------
def find_col(row, *names):
    """Look up a table-row dict value by fuzzy column-name match (the two
    source table formats don't share a fixed column order/count)."""
    for k, v in row.items():
        if any(n.lower() in k.lower() for n in names):
            return v
    return ""


def expand_year_rows(price_rows, fuel, current_year=2026):
    """Turn price-table rows like {Engine Code, Generation, Years, Rebuild
    From} into one row per calendar year (year, generation, engineCode,
    fuel, service), for the Sec11 year-by-year coverage table."""
    out = []
    for r in price_rows:
        code = find_col(r, "Engine Code", "Code")
        gen = find_col(r, "Generation")
        years_raw = find_col(r, "Years") or gen
        m = re.search(r"(\d{4})\s*[–-]\s*(\d{4}|present)", years_raw)
        if not m:
            continue
        start = int(m.group(1))
        end = current_year if m.group(2) == "present" else int(m.group(2))
        gen_clean = re.sub(r"\s*\(.*?\)\s*", "", gen).strip() or gen
        for year in range(start, min(end, start + 14) + 1):
            out.append({
                "year": str(year), "generation": gen_clean, "engineCode": code,
                "fuel": fuel, "service": "Rebuild / Replacement",
            })
    return out


def extract_price(text):
    m = re.search(r"[Ss]tarting [Ff]rom\s*£?\s*([\d,]+)", text)
    return m.group(1).replace(",", "") if m else None


def extract_table_generic(block):
    """Row-of-dicts table parser that accepts either markdown pipe tables
    or plain tab-separated rows (both formats appear across the variant
    .txt files), using the first row as headers."""
    lines = [l for l in block.splitlines() if l.strip()]
    if not lines:
        return []
    if lines[0].strip().startswith("|"):
        return extract_md_table(block)
    rows = [l.split("\t") for l in lines if "\t" in l]
    if len(rows) < 2:
        return []
    header = [c.strip() for c in rows[0]]
    out = []
    for r in rows[1:]:
        vals = [c.strip() for c in r]
        if len(vals) != len(header):
            continue
        out.append({header[i]: vals[i] for i in range(len(header))})
    return out


def extract_md_table(block):
    """Parse a markdown pipe table block into a list of row dicts using the
    header row as keys. Skips the '---' separator row."""
    lines = [l for l in block.splitlines() if l.strip().startswith("|")]
    if len(lines) < 2:
        return []
    def cells(line):
        return [c.strip() for c in line.strip().strip("|").split("|")]
    header = cells(lines[0])
    rows = []
    for line in lines[2:]:
        vals = cells(line)
        if len(vals) != len(header):
            continue
        rows.append({header[i]: vals[i] for i in range(len(header))})
    return rows


def extract_tab_kv(block):
    """Parse plain 'Key\\tValue' lines (the format used by the ~141 variant
    .txt files that have no markdown frontmatter/tables at all)."""
    out = {}
    for line in block.splitlines():
        if "\t" not in line:
            continue
        k, v = line.split("\t", 1)
        k, v = k.strip(), v.strip()
        if k and v:
            out[k] = v
    return out


def extract_spec_block(body, heading_regex):
    """Find a 'Your BMW {x} Engine' style spec block regardless of whether
    it's a '## '-prefixed markdown heading with a pipe table (26 files) or a
    bare text heading with tab-separated key/value lines (141 files), and
    return the parsed dict."""
    m = re.search(heading_regex + r"\n(.*?)(?:\n\n|\Z)", body, re.S)
    if not m:
        return {}
    block = m.group(1)
    if "|" in block:
        return extract_kv_table(block)
    return extract_tab_kv(block)


def extract_kv_table(block):
    """Parse a 2-column markdown table used as key/value pairs, where the
    header row is blank (`| | |`) — e.g. the "Your BMW {variant} Engine"
    spec table. Keys come from **bold** cells in column 1, stripped of `**`.
    Falls back gracefully on any 2-cell row even without bold markers."""
    out = {}
    for line in block.splitlines():
        line = line.strip()
        if not line.startswith("|"):
            continue
        cells = [c.strip() for c in line.strip("|").split("|")]
        if len(cells) != 2:
            continue
        key = cells[0].strip("*").strip()
        val = cells[1].strip()
        if not key or set(key) <= {"-", " "} or not val or set(val) <= {"-", " "}:
            continue
        out[key] = val
    return out


def extract_faq(text):
    """Pull Q/A pairs from a Frequently Asked Questions section — handles
    both '**Question?**\\nAnswer' (markdown-bold) and plain 'Question?\\n
    Answer\\n\\n' formats (the two source styles seen across the .txt files)."""
    m = re.search(r"Frequently Asked Questions\n(.*?)(?:\n---|\Z)", text, re.S)
    if not m:
        return []
    body = m.group(1)
    pairs = re.findall(r"\*\*(.+?\?)\*\*\s*\n(.+?)(?=\n\*\*|\Z)", body, re.S)
    if not pairs:
        pairs = re.findall(r"^(.+?\?)\n(.+?)(?=\n\n|\Z)", body.strip(), re.S | re.M)
    return [{"q": q.strip(), "a": a.strip().replace("\n", " ")} for q, a in pairs]


def find_engine_codes(text):
    codes = {c for c in ENGINE_CODE_RE.findall(text) if c in ENGINE_CODES}
    return sorted(codes)


def strip_frontmatter(text):
    """Remove a leading YAML block if present. Handles both a fully-fenced
    ---\\n...\\n--- block and the malformed "closing fence only" variant seen
    in ~26 of the variant .txt files (key: value lines then a single ---)."""
    lines = text.splitlines()
    if not lines:
        return text
    if lines[0].strip() == "---":
        for i in range(1, len(lines)):
            if lines[i].strip() == "---":
                return "\n".join(lines[i + 1:])
        return text
    # malformed: key: value lines until a lone '---'
    if re.match(r"^[a-z_]+:\s", lines[0]):
        for i, l in enumerate(lines):
            if l.strip() == "---":
                return "\n".join(lines[i + 1:])
    return text


OUT_OF_SCOPE_MARKERS = (
    "out of scope",
    "no engine rebuild",
    "rebuild from\tnot applicable",
    "rebuild from | not applicable",
)


def is_out_of_scope(path):
    """Some source files (fully-electric variants like i5/i7 sub-trims,
    X1 iX1, X2 iX2) are explicitly marked as not serviced by this
    business — via an "Out of Scope" title, "No Engine Rebuild" heading, or
    a "Rebuild From: Not applicable" spec row. Building a normal
    rebuild-service page for these would fabricate pricing/coverage for a
    vehicle the client has explicitly said they don't work on, so they're
    excluded from generation entirely. Deliberately does NOT key on "no
    combustion engine" alone — i5 eDrive40 says that too but IS a real
    serviced (motor-service) page."""
    head = read_text(path)[:600].lower()
    return any(marker in head for marker in OUT_OF_SCOPE_MARKERS)


def is_malformed_reference_doc(path):
    """BMW M760i.txt is a "VRF — BMW 7 Series (Per Model)" internal variant
    inventory/reference document, not normal per-variant page content — it
    has no spec table, no price table, and coincidentally mentions
    "out of scope" while cataloguing the i7 sub-variants. Not valid source
    content for a page of its own."""
    return read_text(path)[:20].strip().startswith("VRF")


def parse_frontmatter(text):
    """Best-effort key: value frontmatter parser for the model .md files
    (full ---\\n...\\n--- blocks)."""
    lines = text.splitlines()
    fm = {}
    if lines and lines[0].strip() == "---":
        for l in lines[1:]:
            if l.strip() == "---":
                break
            if ":" in l:
                k, v = l.split(":", 1)
                fm[k.strip()] = v.strip().strip('"')
    return fm


# ---------------------------------------------------------------------------
# MODEL
# ---------------------------------------------------------------------------
def parse_model_md(path):
    raw = read_text(path)
    fm = parse_frontmatter(raw)
    body = strip_frontmatter(raw)

    h1_m = re.search(r"^#\s+(.+)$", body, re.M)
    sub_m = re.search(r"^###\s+(.+)$", body, re.M)

    price_table_m = re.search(r"## BMW .+? Engine Rebuild Price Guide.*?\n(.*?)\n---", body, re.S)
    price_rows = extract_md_table(price_table_m.group(1)) if price_table_m else []

    variants_m = re.search(r"## Most Popular BMW .+? Rebuilds\n(.*?)\n---", body, re.S)
    variant_names = []
    if variants_m:
        variant_names = re.findall(r"^\d+\.\s+(.+)$", variants_m.group(1), re.M)

    coverage_m = re.search(r"### Full Variant Coverage\n(.+?)\n", body)
    faq = extract_faq(body)
    starting_from = extract_price(body)

    # "### Engines by Model Year" -> real per-generation chassis codes (the
    # reference template's generations are 3-Series-specific E36/E46/etc and
    # must not leak into other models).
    year_gen_m = re.search(r"### Engines by Model Year\n(.*?)\n\n", body, re.S)
    year_generations = []
    if year_gen_m:
        for line in year_gen_m.group(1).splitlines():
            gm = re.match(r"\*\*([\d–\-]+)\s*\(([^)]+)\):\*\*\s*(.+)", line.strip())
            if gm:
                year_generations.append({"years": gm.group(1), "code": gm.group(2), "list": gm.group(3).strip()})

    # "We Cover Every BMW {variant} Model:" + a "✓ ..." checklist line ->
    # a real featured-variant checklist instead of the template's "320d".
    checklist_variant, checklist_items = "", []
    cov_m = re.search(r"We Cover Every BMW (.+?) Model:\n(.+)", body)
    if cov_m:
        checklist_variant = cov_m.group(1).strip()
        checklist_items = [c.strip() for c in re.split(r"✓", cov_m.group(2)) if c.strip()]

    return {
        "title": fm.get("title", "").strip('"'),
        "slug": fm.get("slug", "/" + slugify(fm.get("model", path.stem))),
        "meta_description": fm.get("meta_description", "").strip('"'),
        "model": fm.get("model", path.stem),
        "h1": h1_m.group(1).strip() if h1_m else fm.get("title", ""),
        "subhead": sub_m.group(1).strip() if sub_m else "",
        "starting_from": starting_from,
        "price_rows": price_rows,
        "variant_names": [v.strip() for v in variant_names],
        "faq": faq,
        "engine_codes": find_engine_codes(body),
        "year_generations": year_generations,
        "checklist_variant": checklist_variant,
        "checklist_items": checklist_items,
    }


_VARIANT_FILE_INDEX = None


def variant_file_index():
    """Lazily-built, cached map of normalize(variant name) -> source .txt
    Path, across every (including combined-file-split) variant."""
    global _VARIANT_FILE_INDEX
    if _VARIANT_FILE_INDEX is None:
        _VARIANT_FILE_INDEX = {}
        for f in VARIANT_TXT_DIR.glob("*.txt"):
            if f.name.lower() in NON_BMW_SKIP:
                continue
            stem = f.stem.replace("BMW ", "").strip()
            for name in split_combined_variant_stem(stem):
                _VARIANT_FILE_INDEX[re.sub(r"[^a-z0-9]", "", name.lower())] = f
    return _VARIANT_FILE_INDEX


def _strip_bmw_prefix(name):
    return re.sub(r"^BMW\s+", "", name.strip(), flags=re.I)


def variant_spec_summary(name):
    """'2.0L Diesel (N47 / B47)' style summary pulled from that variant's
    own source file, for use in another page's "popular variant" card."""
    bare = _strip_bmw_prefix(name)
    key = re.sub(r"[^a-z0-9]", "", bare.lower())
    f = variant_file_index().get(key)
    if not f:
        # No source file for this variant — an honest fallback line rather
        # than leaving the card visibly blank/inconsistent with its siblings.
        return "Rebuild & Replacement Available"
    p = parse_variant_txt(f, variant_name_override=bare)
    bits = [b for b in (p.get("capacity"), p.get("fuel")) if b]
    codes = p.get("engine") or " / ".join(p.get("engine_codes", []))
    summary = " ".join(bits)
    return f"{summary} ({codes})" if codes else summary


def variant_card_image(name):
    slug = slugify(_strip_bmw_prefix(name))
    if (ROOT / "public" / "variant" / "vehicles" / f"{slug}.webp").exists():
        return f"/variant/vehicles/{slug}.webp"
    return "/variant/vehicles/_fallback.webp"


def build_model_json(template, parsed, ref_name):
    out = copy.deepcopy(template)
    model_name = parsed["model"]
    replacements = [
        (f"BMW {ref_name}", f"BMW {model_name}"),
        (ref_name, model_name),
    ]
    for n in out:
        out[n] = replace_strings(out[n], replacements)

    # The reference template (3 Series) uses "320d" as its own worked
    # example of a popular variant in several sections (reviews, pricing
    # tabs, variant-card footnotes) — a plain name-substitution pass never
    # catches that since it isn't the model's own name. Swap it for this
    # model's actual most-popular variant so nothing references a variant
    # that doesn't belong to this model.
    example_variant = parsed["variant_names"][0] if parsed["variant_names"] else model_name
    for n in out:
        out[n] = replace_strings(out[n], [("320d", example_variant)])

    # Sec1 hero — h1 is left as-is from the replace_strings() pass above:
    # the reference template's "BMW {name}|Engine Rebuild &|Replacement
    # Specialists" already becomes correct for any model via straight text
    # substitution, and ModelHeroSec1.js requires the "|"-delimited 3-line
    # format to render correctly (splitting it into a single line breaks
    # the desktop layout, which assumes short per-line text).
    if parsed["subhead"]:
        out[1]["subhead"] = parsed["subhead"]
    if parsed["starting_from"]:
        set_path(out[1], "priceCta.price", f"£{int(parsed['starting_from']):,}")

    # Sec4 comparison table rows, if we parsed a price table with the right shape
    if parsed["price_rows"] and "rows" in out.get(4, {}):
        rows = []
        for r in parsed["price_rows"]:
            keys = list(r.keys())
            if len(keys) >= 4:
                rows.append({
                    "family": r.get(keys[0], ""),
                    "fuel": r.get(keys[1], ""),
                    "size": r.get(keys[2], ""),
                    "range": r.get(keys[3], ""),
                })
        if rows:
            out[4]["rows"] = rows

    # Sec12 "recent recoveries" gallery — per the source spec this is an
    # explicitly generic, reused portfolio ("reused portfolio across all BMW
    # pages, not dated claims"), meant to look identical on every page, not
    # vary per model. Restore the untouched template cards rather than
    # cycling this model's own variant names onto them (that made every
    # model page claim recent jobs on other models' cars).
    if "cards" in out.get(12, {}) and "cards" in template.get(12, {}):
        out[12]["cards"] = copy.deepcopy(template[12]["cards"])

    # Sec10 "Most Popular Rebuilds" — real cards, one per actual popular
    # variant (no padding/cycling to a fixed count, so no repeated variants
    # or a card that outnumbers what we actually list), each with its own
    # real photo and real spec pulled from that variant's own source data —
    # the template's spec text ("1.6L Petrol (N13/N43)") and href are
    # 3-Series-specific and wrong for every other model's variants.
    sec10 = out.get(10)
    if sec10 and "cards" in sec10 and parsed["variant_names"]:
        cards = []
        for i, name in enumerate(parsed["variant_names"]):
            cards.append({
                "number": f"{i + 1:02d}",
                "model": name,
                "spec": variant_spec_summary(name),
                "image": variant_card_image(name),
            })
        sec10["cards"] = cards

    # Sec18 FAQ
    if parsed["faq"] and "faqLeft" in out.get(18, {}):
        half = (len(parsed["faq"]) + 1) // 2
        out[18]["faqLeft"] = parsed["faq"][:half]
        out[18]["faqRight"] = parsed["faq"][half:]

    # Sec17 "Full Variant Coverage" tabs — the reference template's tabs are
    # a 3-Series-only body-style taxonomy (Compact/Convertible/Coupé/
    # Touring) with historic 3-Series-only variant codes (316ti, M3
    # Compact...) that don't exist for any other model and don't correspond
    # to any real generated variant page. Replace with a single tab holding
    # this model's actual variant list (hrefs added later by
    # inject_crosslinks.py once the full cross-model variant map exists).
    if parsed["variant_names"] and "tabVariants" in out.get(17, {}):
        out[17]["tabs"] = ["All Variants"]
        out[17]["activeTab"] = 0
        out[17]["tabVariants"] = [[{"label": name} for name in parsed["variant_names"]]]

    # Sec15 real per-generation chassis codes (replaces the 3-Series-only
    # E36/E46/E90/etc. left in the template) and a real featured-variant
    # checklist (replaces the template's hardcoded "320d" checklist).
    if parsed["year_generations"] and "generations" in out.get(15, {}):
        out[15]["generations"] = parsed["year_generations"]
    if parsed["checklist_variant"] and "checklistTitleHighlight" in out.get(15, {}):
        out[15]["checklistTitleHighlight"] = f"BMW {parsed['checklist_variant']} Model:"
        items = parsed["checklist_items"]
        half = (len(items) + 1) // 2
        if items:
            out[15]["checklistLeft"] = items[:half]
            out[15]["checklistRight"] = items[half:]

    return out


def gen_model_page_js(slug, prefix, count):
    imports = "\n".join(f'import ModelSec{n} from "@/components/model/ModelSec{n}";' for n in range(2, count + 1))
    data_imports = "\n".join(f'import modelSec{n} from "@/data/model/{prefix}Sec{n}.json";' for n in range(1, count + 1))
    renders = "\n      ".join(f"<ModelSec{n} data={{modelSec{n}}} />" for n in range(2, count + 1))
    fn_name = "".join(w.capitalize() for w in slug.split("-")) + "Page"
    return f'''import ModelHeroSec1 from "@/components/model/ModelHeroSec1";
{imports}

import modelSec1 from "@/data/model/{prefix}Sec1.json";
{data_imports.split(chr(10), 1)[1] if data_imports else ""}

export const metadata = {{
  title: modelSec1.h1?.replaceAll("|", " ") || "{slug}",
  description: modelSec1.subhead || "",
}};

export default function {fn_name}() {{
  return (
    <>
      <ModelHeroSec1 data={{modelSec1}} />
      {renders}
    </>
  );
}}
'''


# ---------------------------------------------------------------------------
# VARIANT
# ---------------------------------------------------------------------------
COMBINED_SPLIT_RE = re.compile(r"\s+(?=\d{2,3}[a-zA-Z]+$)")


def split_combined_variant_stem(stem):
    """'425d 430d' -> ['425d', '430d']; 'X1 sDrive18d xDrive20i' -> handled
    upstream via the leading model prefix; default: no split."""
    tokens = stem.split()
    # crude heuristic: tokens that look like variant codes (start with digit
    # or contain digit+letters) after the model-name tokens
    variant_tokens = [t for t in tokens if re.match(r"^[a-zA-Z]{0,7}\d{2,3}[a-zA-Z]*$", t)]
    if len(variant_tokens) >= 2:
        prefix_tokens = tokens[: tokens.index(variant_tokens[0])]
        return [" ".join(prefix_tokens + [v]).strip() for v in variant_tokens]
    return [stem]


def parse_variant_txt(path, variant_name_override=None):
    raw = read_text(path)
    body = strip_frontmatter(raw)
    lines = [l for l in body.splitlines() if l.strip()]
    title_line = lines[0] if lines else path.stem

    # "Your BMW {x}" heading (electric variants drop the "Engine" suffix,
    # e.g. "Your BMW i5 eDrive40" not "...Engine")
    spec = extract_spec_block(body, r"#{0,2}\s*Your BMW [^\n]*")

    # electric variants use "Service Price" instead of "Engine Rebuild Price"
    price_table_m = re.search(
        r"#{0,2}\s*BMW .+? (?:Engine Rebuild|Service) Price\n.*?\n((?:\|.*|.+\t.+)(?:\n(?:\|.*|.+\t.+))*)", body
    )
    price_rows = extract_table_generic(price_table_m.group(1)) if price_table_m else []

    faq = extract_faq(body)
    starting_from = extract_price(body)
    codes = find_engine_codes(body)

    apps_m = re.search(r"Applications by Generation\n((?:.+\t.+\n?)+)", body)
    applications_by_gen = extract_table_generic(apps_m.group(1)) if apps_m else []

    return {
        "title": title_line.strip(),
        "variant": variant_name_override or spec.get("Variant", path.stem),
        "model": spec.get("Model", ""),
        "fuel": spec.get("Fuel", ""),
        "engine": spec.get("Engine", ""),
        "capacity": spec.get("Capacity", ""),
        "generations": spec.get("Generations", spec.get("Generation", "")),
        "starting_from": starting_from,
        "price_rows": price_rows,
        "faq": faq,
        "engine_codes": codes,
        "applications_by_gen": applications_by_gen,
    }


def build_variant_json(template, parsed, ref_name):
    out = copy.deepcopy(template)
    variant_name = parsed["variant"]
    replacements = [
        (f"BMW {ref_name}", f"BMW {variant_name}"),
        (ref_name, variant_name),
    ]
    for n in out:
        out[n] = replace_strings(out[n], replacements)

    # The 320d reference's narrative prose (Sec10 "about" paragraphs etc.)
    # mentions its own series name and chassis codes in free text that a
    # plain name-substitution never catches (e.g. "the 3 Series diesel
    # range", "the early F30/F31 models"). Clean those up so another
    # variant's page doesn't show a different model's series name/chassis.
    cleanup = []
    if parsed.get("model") and parsed["model"] != "3 Series":
        cleanup.append(("3 Series", parsed["model"]))
    gen_codes = [g.split("(")[0].strip() for g in parsed.get("generations", "").split("·") if g.strip()]
    for i, ref_code in enumerate(["F30/F31", "G20/G21"]):
        if gen_codes:
            cleanup.append((ref_code, gen_codes[i % len(gen_codes)]))
    if cleanup:
        for n in out:
            out[n] = replace_strings(out[n], cleanup)

    if parsed["starting_from"]:
        set_path(out[1], "priceCta.price", f"£{int(parsed['starting_from']):,}")

    # Sec8 "recent recoveries" gallery — per the source content spec, this
    # is an explicitly generic, reused portfolio gallery ("reused portfolio
    # across all BMW pages, not dated claims"), shown identically on every
    # page. It must NOT be name-substituted: a straight "320d" text
    # substitution above only catches literal "320d" matches, leaving every
    # other item's model name (330i, 335d, M3 (E92), etc. — all 3-Series-
    # specific) baked in unchanged on every other model's variant pages,
    # and inventing nonsense trims like "116d xDrive". Restore the pristine
    # template version so it stays the same intentionally-generic gallery
    # everywhere, matching the reference page exactly.
    if "gallery" in out.get(8, {}) and "gallery" in template.get(8, {}):
        out[8]["gallery"]["items"] = copy.deepcopy(template[8]["gallery"]["items"])

    # Sec2 spec rows: keep template icon per row, override label/value pairs
    # for the fields we actually parsed.
    if "specs" in out.get(2, {}) and isinstance(out[2]["specs"], list):
        price_str = f"£{int(parsed['starting_from']):,}" if parsed["starting_from"] else ""
        field_map = {
            "Fuel": parsed["fuel"], "Engine": parsed["engine"],
            "Capacity": parsed["capacity"], "Generations": parsed["generations"],
            "Rebuild From": price_str,
        }
        for row in out[2]["specs"]:
            label = row.get("label", "")
            if label in field_map and field_map[label]:
                row["value"] = field_map[label]

    # Sec3 engine code / price cards — look columns up by name, not position:
    # the two source table formats have a different column count/order
    # (markdown: Code|Generation|Rebuild From; plain-text: Code|Generation|
    # Years|Rebuild From), so a positional index-2 read grabs "Years" as the
    # price on the plain-text format.
    if parsed["price_rows"] and "cards" in out.get(3, {}):
        template_cards = out[3]["cards"]
        cards = []
        for i, r in enumerate(parsed["price_rows"]):
            base = copy.deepcopy(template_cards[i % len(template_cards)]) if template_cards else {}
            code = find_col(r, "Engine Code", "Code")
            gen = find_col(r, "Generation")
            years = find_col(r, "Years")
            price = find_col(r, "Rebuild From", "Price")
            base["code"] = code or base.get("code", "")
            base["generation"] = f"{gen} ({years})" if gen and years else (gen or base.get("generation", ""))
            base["price"] = price or base.get("price", "")
            cards.append(base)
        out[3]["cards"] = cards

    # Sec11 year-by-year table — rebuilt entirely from the real price rows
    # (the template's rows are 320d/3-Series-specific chassis codes and
    # years, which must never leak onto another variant's page).
    if parsed["price_rows"] and "rows" in out.get(11, {}):
        rows = expand_year_rows(parsed["price_rows"], parsed["fuel"])
        if rows:
            out[11]["rows"] = rows

    # Sec10 "Applications By Generation" table — same class of bug as Sec11:
    # this is real per-variant chassis/year/engine-code data, not generic
    # boilerplate, so it must come from this variant's own source table
    # rather than leaking the reference page's years/row-count.
    if parsed["applications_by_gen"] and "applications" in out.get(10, {}):
        rows = []
        for r in parsed["applications_by_gen"]:
            rows.append({
                "generation": r.get("Generation", ""),
                "chassis": r.get("Chassis", ""),
                "years": r.get("Years", ""),
                "engineCode": r.get("Engine Code", ""),
                "fuel": r.get("Fuel", ""),
            })
        out[10]["applications"]["rows"] = rows

    if parsed["faq"] and "faq" in out.get(13, {}):
        half = (len(parsed["faq"]) + 1) // 2
        set_path(out[13], "faq.faqLeft", parsed["faq"][:half]) if isinstance(out[13].get("faq"), dict) else None

    return out


def gen_variant_page_js(slug, prefix, count):
    imports = "\n".join(f'import VariantSec{n} from "@/components/variant/VariantSec{n}";' for n in range(2, count + 1))
    data_imports = "\n".join(f'import variantSec{n} from "@/data/variant/{prefix}Sec{n}.json";' for n in range(2, count + 1))
    renders = "\n      ".join(f"<VariantSec{n} data={{variantSec{n}}} />" for n in range(2, count + 1))
    fn_name = "".join(w.capitalize() for w in slug.split("-")) + "Page"
    return f'''import VariantHeroSec1 from "@/components/variant/VariantHeroSec1";
{imports}

import variantSec1 from "@/data/variant/{prefix}Sec1.json";
{data_imports}

export const metadata = {{
  title: variantSec1.h1?.replaceAll("|", " ") || "{slug}",
  description: variantSec1.subhead || "",
}};

export default function {fn_name}() {{
  return (
    <>
      <VariantHeroSec1 data={{variantSec1}} />
      {renders}
    </>
  );
}}
'''


# ---------------------------------------------------------------------------
# ENGINE FAMILY
# ---------------------------------------------------------------------------
def parse_engine_txt(path):
    raw = read_text(path)
    body = strip_frontmatter(raw)
    lines = [l for l in body.splitlines() if l.strip()]
    title_line = lines[0] if lines else path.stem
    code = path.stem.replace("BMW ", "").strip()

    spec_m = re.search(r"Engine Specifications\n(.*?)\n\n", body, re.S)
    spec_lines = spec_m.group(1).splitlines() if spec_m else []
    spec = {}
    for l in spec_lines:
        if "\t" in l:
            k, v = l.split("\t", 1)
            spec[k.strip()] = v.strip()

    apps_m = re.search(r"Applications.*?\n(Model\s+Variant.*?)\n\n", body, re.S)
    applications = []
    if apps_m:
        app_lines = apps_m.group(1).splitlines()[1:]
        for l in app_lines:
            parts = [p for p in re.split(r"\t+", l) if p.strip()]
            if len(parts) >= 5:
                applications.append({
                    "model": parts[0], "variant": parts[1], "generation": parts[2],
                    "chassis": parts[3], "years": parts[4],
                })

    faq = extract_faq(body)
    starting_from = extract_price(body)

    return {
        "title": title_line.strip(),
        "code": code,
        "manufacturer": spec.get("Manufacturer", "BMW"),
        "configuration": spec.get("Configuration", ""),
        "capacity": spec.get("Capacity", ""),
        "fuel": spec.get("Fuel", ""),
        "production_years": spec.get("Production Years", ""),
        "used_in": spec.get("Used In", ""),
        "applications": applications,
        "starting_from": starting_from,
        "faq": faq,
    }


def build_engine_json(template, parsed, ref_name):
    out = copy.deepcopy(template)
    code = parsed["code"]
    replacements = [
        (f"BMW {ref_name}", f"BMW {code}"),
        (ref_name, code),
    ]
    for n in out:
        out[n] = replace_strings(out[n], replacements)

    if parsed["starting_from"]:
        set_path(out[2], "price.startingFromPrice", f"£{int(parsed['starting_from']):,}")

    field_map = {
        "Configuration": parsed["configuration"], "Capacity": parsed["capacity"],
        "Fuel": parsed["fuel"], "Production Years": parsed["production_years"],
        "Used In": parsed["used_in"],
    }
    if "specs" in out.get(2, {}) and isinstance(out[2]["specs"].get("rows"), list):
        for row in out[2]["specs"]["rows"]:
            label = row.get("label", "")
            if label in field_map and field_map[label]:
                row["value"] = field_map[label]

    if parsed["applications"] and "rows" in out.get(3, {}):
        out[3]["rows"] = parsed["applications"]

    return out


def gen_engine_page_js(slug, code, count):
    imports = "\n".join(f'import Sec{n} from "@/components/engine-family/Sec{n}";' for n in range(2, count + 1))
    data_imports = "\n".join(f'import sec{n} from "@/data/engine-family/{code}Sec{n}.json";' for n in range(2, count + 1))
    renders = "\n      ".join(f"<Sec{n} data={{sec{n}}} />" for n in range(2, count + 1))
    fn_name = "".join(w.capitalize() for w in slug.split("-")) + "Page"
    return f'''import HeroSec1 from "@/components/engine-family/HeroSec1";
{imports}

import sec1 from "@/data/engine-family/{code}Sec1.json";
{data_imports}

export const metadata = {{
  title: sec1.h1?.replaceAll("|", " ") || "{slug}",
  description: sec1.subhead || "",
}};

export default function {fn_name}() {{
  return (
    <>
      <HeroSec1 data={{sec1}} />
      {renders}
    </>
  );
}}
'''


# ---------------------------------------------------------------------------
# orchestration
# ---------------------------------------------------------------------------
def run_model(dry_run, limit):
    template = load_template(MODEL_REF["prefix"], MODEL_REF["count"])
    manifest = []
    files = sorted(MODEL_MD_DIR.glob("*.md"))
    if limit:
        files = files[:limit]
    seen_slugs = {MODEL_REF["slug"]}
    for f in files:
        parsed = parse_model_md(f)
        slug = parsed["slug"].strip("/")
        if slug in seen_slugs:
            print(f"skip (duplicate slug /{slug}): {f.name}")
            continue
        seen_slugs.add(slug)
        prefix = "bmw" + "".join(w.capitalize() for w in slug.replace("bmw-", "").replace("-engines", "").split("-"))
        out = build_model_json(template, parsed, MODEL_REF["name"])
        manifest.append({"type": "model", "slug": slug})
        print(f"model  -> /{slug}  ({f.name})")
        if not dry_run:
            for n, data in out.items():
                write_json(DATA / "model" / f"{prefix}Sec{n}.json", data)
            (APP / slug).mkdir(parents=True, exist_ok=True)
            (APP / slug / "page.js").write_text(
                gen_model_page_js(slug, prefix, MODEL_REF["count"]), encoding="utf-8"
            )
    return manifest


def run_variant(dry_run, limit):
    template = load_template(VARIANT_REF["prefix"], VARIANT_REF["count"])
    manifest = []
    files = sorted(VARIANT_TXT_DIR.glob("*.txt"))
    if limit:
        files = files[:limit]
    count_done = 0
    # Some names (M2/M3/M4/M5/M6/M8, X3 M/X4 M/X5 M/X6 M) are BOTH a
    # standalone BMW model line (their own BMW-models/*.md, full 18-section
    # page) AND listed as a "popular variant" inside another model's page
    # (e.g. 3 Series listing "M3"). Both would generate at the identical
    # /bmw-m3-engines slug — seed seen_slugs with every real model slug so
    # the dedicated, richer Model page always wins and is never silently
    # overwritten by a thinner Variant-type page of the same name.
    seen_slugs = {VARIANT_REF["slug"]}
    for mf in sorted(MODEL_MD_DIR.glob("*.md")):
        seen_slugs.add(parse_model_md(mf)["slug"].strip("/"))
    for f in files:
        if f.name.lower() in NON_BMW_SKIP:
            print(f"skip (non-BMW): {f.name}")
            continue
        if is_malformed_reference_doc(f):
            print(f"skip (internal VRF inventory doc, not page content): {f.name}")
            continue
        if is_out_of_scope(f):
            print(f"skip (out of scope — no combustion engine): {f.name}")
            continue
        stem = f.stem.replace("BMW ", "").strip()
        names = split_combined_variant_stem(stem)
        for name in names:
            parsed = parse_variant_txt(f, variant_name_override=name)
            slug = "bmw-" + slugify(name) + "-engines"
            if slug in seen_slugs:
                print(f"skip (duplicate slug /{slug}): {f.name}")
                continue
            seen_slugs.add(slug)
            prefix = "bmw" + "".join(w.capitalize() for w in slugify(name).split("-"))
            out = build_variant_json(template, parsed, VARIANT_REF["name"])
            manifest.append({"type": "variant", "slug": slug})
            print(f"variant -> /{slug}  ({f.name})")
            count_done += 1
            if not dry_run:
                for n, data in out.items():
                    write_json(DATA / "variant" / f"{prefix}Sec{n}.json", data)
                (APP / slug).mkdir(parents=True, exist_ok=True)
                (APP / slug / "page.js").write_text(
                    gen_variant_page_js(slug, prefix, VARIANT_REF["count"]), encoding="utf-8"
                )
    return manifest


def run_engine(dry_run, limit):
    template = load_template(ENGINE_REF["prefix"], ENGINE_REF["count"])
    manifest = []
    files = sorted(ENGINE_TXT_DIR.glob("*.txt"))
    if limit:
        files = files[:limit]
    seen_slugs = {ENGINE_REF["slug"]}
    for f in files:
        parsed = parse_engine_txt(f)
        code = parsed["code"]
        slug = f"bmw-{code.lower()}-engine"
        if slug in seen_slugs:
            print(f"skip (duplicate slug /{slug}): {f.name}")
            continue
        seen_slugs.add(slug)
        out = build_engine_json(template, parsed, ENGINE_REF["name"])
        manifest.append({"type": "engine", "slug": slug})
        print(f"engine -> /{slug}  ({f.name})")
        if not dry_run:
            for n, data in out.items():
                write_json(DATA / "engine-family" / f"{code.lower()}Sec{n}.json", data)
            (APP / slug).mkdir(parents=True, exist_ok=True)
            (APP / slug / "page.js").write_text(
                gen_engine_page_js(slug, code.lower(), ENGINE_REF["count"]), encoding="utf-8"
            )
    return manifest


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--type", choices=["model", "variant", "engine", "all"], default="all")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--limit", type=int, default=0, help="only process first N source files (per type)")
    args = ap.parse_args()

    manifest = []
    if args.type in ("model", "all"):
        manifest += run_model(args.dry_run, args.limit)
    if args.type in ("variant", "all"):
        manifest += run_variant(args.dry_run, args.limit)
    if args.type in ("engine", "all"):
        manifest += run_engine(args.dry_run, args.limit)

    if not args.dry_run:
        OUT_DIR.mkdir(parents=True, exist_ok=True)
        write_json(OUT_DIR / "site-routes.json", manifest)
        # also written under src/data so it can be imported by src/app/sitemap.js
        # (Next.js only bundles files inside src/ for the build)
        write_json(DATA / "shared" / "siteRoutes.json", manifest)
    print(f"\nDone. {len(manifest)} pages {'would be' if args.dry_run else ''} generated.")


if __name__ == "__main__":
    main()
