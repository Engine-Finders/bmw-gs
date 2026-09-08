#!/usr/bin/env python3
"""
Post-processing pass: reads every generated (and reference) model/variant/
engine-family JSON set, computes real internal hrefs for engine codes, model
names and variant names, and patches those fields in place on disk.

Must run AFTER migrate_bmw_content.py (needs scripts/output/site-routes.json)
and before/after component edits are unimportant — the components already
render a plain span/text when an href field is absent, so this script is
safe to re-run any number of times (idempotent: it recomputes hrefs fresh
each time rather than accumulating).

Usage: python scripts/inject_crosslinks.py [--dry-run]
"""
import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "src" / "data"
OUT_DIR = ROOT / "scripts" / "output"

sys.path.insert(0, str(Path(__file__).resolve().parent))
from migrate_bmw_content import (  # noqa: E402
    ENGINE_CODES, slugify, MODEL_MD_DIR, VARIANT_TXT_DIR, ENGINE_TXT_DIR,
    parse_model_md, parse_variant_txt, parse_engine_txt, split_combined_variant_stem,
    NON_BMW_SKIP, is_out_of_scope, is_malformed_reference_doc,
)


def normalize(name):
    name = re.sub(r"^BMW\s+", "", name.strip(), flags=re.I)
    name = name.lower()
    name = re.sub(r"[^a-z0-9]+", " ", name).strip()
    return name


def build_lookups():
    """Re-derive slug + display-name for every page (reference pages included)
    directly from source files, rather than trusting the generation-time
    manifest, so this stays correct even if pages were hand-edited since."""
    engine_href = {}
    for f in sorted(ENGINE_TXT_DIR.glob("*.txt")):
        p = parse_engine_txt(f)
        code = p["code"]
        engine_href[code] = f"/bmw-{code.lower()}-engine"

    model_href = {}
    model_series_by_slug = {}
    for f in sorted(MODEL_MD_DIR.glob("*.md")):
        p = parse_model_md(f)
        slug = "/" + p["slug"].strip("/")
        model_href[normalize(p["model"])] = slug
        model_series_by_slug[slug] = p["model"]

    variant_href = {}
    variant_model_of = {}  # variant normalized name -> parent model/series name
    variant_display_name = {}  # normalized name -> original-cased display name
    for f in sorted(VARIANT_TXT_DIR.glob("*.txt")):
        if f.name.lower() in NON_BMW_SKIP or is_out_of_scope(f) or is_malformed_reference_doc(f):
            continue
        stem = f.stem.replace("BMW ", "").strip()
        for name in split_combined_variant_stem(stem):
            p = parse_variant_txt(f, variant_name_override=name)
            slug = f"/bmw-{slugify(name)}-engines"
            variant_href[normalize(name)] = slug
            variant_display_name[normalize(name)] = name
            if p.get("model"):
                variant_model_of[normalize(name)] = p["model"]

    return engine_href, model_href, variant_href, variant_model_of, variant_display_name


def find_engine_code_in_text(text):
    for code in ENGINE_CODES:
        if re.search(rf"\b{re.escape(code)}\b", text):
            return code
    return None


def patch_variant(prefix, engine_href, model_href, variant_href, variant_model_of, dry_run):
    changed = []

    # Sec3: cards[].code -> codeHref
    p3 = DATA / "variant" / f"{prefix}Sec3.json"
    if p3.exists():
        d = json.loads(p3.read_text(encoding="utf-8"))
        for c in d.get("cards", []):
            code = c.get("code", "")
            if code in engine_href:
                c["codeHref"] = engine_href[code]
        if not dry_run:
            p3.write_text(json.dumps(d, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        changed.append("Sec3")

    # Sec10: codes.cards[].codeHighlight -> codeHref
    p10 = DATA / "variant" / f"{prefix}Sec10.json"
    if p10.exists():
        d = json.loads(p10.read_text(encoding="utf-8"))
        for c in d.get("codes", {}).get("cards", []):
            code = c.get("codeHighlight", "")
            if code in engine_href:
                c["codeHref"] = engine_href[code]
        for r in d.get("applications", {}).get("rows", []):
            code = r.get("engineCode", "")
            if code in engine_href:
                r["codeHref"] = engine_href[code]
        if not dry_run:
            p10.write_text(json.dumps(d, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        changed.append("Sec10")

    # Sec11: rows[].engineCode -> codeHref
    p11 = DATA / "variant" / f"{prefix}Sec11.json"
    if p11.exists():
        d = json.loads(p11.read_text(encoding="utf-8"))
        for r in d.get("rows", []):
            code = r.get("engineCode", "")
            if code in engine_href:
                r["codeHref"] = engine_href[code]
        if not dry_run:
            p11.write_text(json.dumps(d, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        changed.append("Sec11")

    return changed


def patch_variant_related(prefix, variant_name, model_href, variant_href, variant_model_of, variant_display_name, dry_run):
    """Rebuild Sec12.related with real sibling-variant links + a real
    viewAllHref pointing at the correct parent model page."""
    p12 = DATA / "variant" / f"{prefix}Sec12.json"
    if not p12.exists():
        return
    d = json.loads(p12.read_text(encoding="utf-8"))
    self_norm = normalize(variant_name)
    parent_model = variant_model_of.get(self_norm, "")

    d.setdefault("yearBanner", {})["vehicleLabel"] = f"BMW {variant_name}"

    siblings = [
        (name, href) for name, href in variant_href.items()
        if variant_model_of.get(name) == parent_model and name != self_norm
    ]
    siblings.sort()
    links = [{"label": f"BMW {variant_display_name.get(name, name)} Engine", "href": href} for name, href in siblings[:6]]
    if links:
        d.setdefault("related", {})["links"] = links
    if parent_model and normalize(parent_model) in model_href:
        d.setdefault("related", {})["viewAllHref"] = model_href[normalize(parent_model)]
        d["related"]["viewAll"] = f"View All BMW {parent_model} Engines"
        d["related"]["title"] = f"RELATED BMW {parent_model.upper()} VARIANTS"

    if not dry_run:
        p12.write_text(json.dumps(d, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def patch_model(prefix, engine_href, variant_href, dry_run):
    changed = []

    p3 = DATA / "model" / f"{prefix}Sec3.json"
    if p3.exists():
        d = json.loads(p3.read_text(encoding="utf-8"))
        for c in d.get("cards", []):
            code = find_engine_code_in_text(c.get("code", ""))
            if code:
                c["codeHref"] = engine_href[code]
        if not dry_run:
            p3.write_text(json.dumps(d, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        changed.append("Sec3")

    p4 = DATA / "model" / f"{prefix}Sec4.json"
    if p4.exists():
        d = json.loads(p4.read_text(encoding="utf-8"))
        for r in d.get("rows", []):
            code = find_engine_code_in_text(r.get("family", ""))
            if code:
                r["familyHref"] = engine_href[code]
        if not dry_run:
            p4.write_text(json.dumps(d, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        changed.append("Sec4")

    p17 = DATA / "model" / f"{prefix}Sec17.json"
    if p17.exists():
        d = json.loads(p17.read_text(encoding="utf-8"))
        pruned_tabs, pruned_variants = [], []
        for tab_label, tab in zip(d.get("tabs", []), d.get("tabVariants", [])):
            for item in tab:
                if isinstance(item, dict):
                    href = variant_href.get(normalize(item.get("label", "")))
                    if href:
                        item["href"] = href
            # Drop entries with no real page to link to — a badge that
            # isn't clickable reads as a variant we cover but don't — and
            # drop the whole tab if nothing in it survives, so there's no
            # clickable-but-empty tab left behind.
            kept = [item for item in tab if isinstance(item, dict) and item.get("href")]
            if kept:
                pruned_tabs.append(tab_label)
                pruned_variants.append(kept)
        if pruned_tabs:
            d["tabs"] = pruned_tabs
            d["tabVariants"] = pruned_variants
            d["activeTab"] = 0
        if not dry_run:
            p17.write_text(json.dumps(d, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        changed.append("Sec17")

    p15 = DATA / "model" / f"{prefix}Sec15.json"
    if p15.exists():
        d = json.loads(p15.read_text(encoding="utf-8"))
        highlight = d.get("checklistTitleHighlight", "")
        vm = re.match(r"BMW\s+(.+?)\s+Model:?$", highlight.strip())
        if vm:
            href = variant_href.get(normalize(vm.group(1)))
            if href:
                d["checklistHref"] = href
        if not dry_run:
            p15.write_text(json.dumps(d, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        changed.append("Sec15")

    p10 = DATA / "model" / f"{prefix}Sec10.json"
    if p10.exists():
        d = json.loads(p10.read_text(encoding="utf-8"))
        for c in d.get("cards", []):
            href = variant_href.get(normalize(c.get("model", "")))
            if href:
                c["href"] = href
        if not dry_run:
            p10.write_text(json.dumps(d, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        changed.append("Sec10")

    return changed


def patch_engine(prefix, model_href, variant_href, dry_run):
    p3 = DATA / "engine-family" / f"{prefix}Sec3.json"
    if not p3.exists():
        return []
    d = json.loads(p3.read_text(encoding="utf-8"))
    for r in d.get("rows", []):
        mhref = model_href.get(normalize(r.get("model", "")))
        if mhref:
            r["modelHref"] = mhref
        vhref = variant_href.get(normalize(r.get("variant", "")))
        if vhref:
            r["variantHref"] = vhref
    if not dry_run:
        p3.write_text(json.dumps(d, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    return ["Sec3"]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    engine_href, model_href, variant_href, variant_model_of, variant_display_name = build_lookups()
    print(f"lookups: {len(engine_href)} engines, {len(model_href)} models, {len(variant_href)} variants")

    # variant sets: derive {prefix, display_name} pairs the same way the
    # generator did (including the b58/320d-style reference prefixes).
    variant_prefixes = {}
    for f in sorted(VARIANT_TXT_DIR.glob("*.txt")):
        if f.name.lower() in NON_BMW_SKIP or is_out_of_scope(f) or is_malformed_reference_doc(f):
            continue
        stem = f.stem.replace("BMW ", "").strip()
        for name in split_combined_variant_stem(stem):
            slug = slugify(name)
            prefix = "bmw" + "".join(w.capitalize() for w in slug.split("-"))
            variant_prefixes[prefix] = name
    variant_prefixes["bmw320d"] = "320d"  # reference page

    for prefix, name in sorted(variant_prefixes.items()):
        if not (DATA / "variant" / f"{prefix}Sec1.json").exists():
            continue
        patch_variant(prefix, engine_href, model_href, variant_href, variant_model_of, args.dry_run)
        patch_variant_related(prefix, name, model_href, variant_href, variant_model_of, variant_display_name, args.dry_run)

    model_prefixes = {}
    for f in sorted(MODEL_MD_DIR.glob("*.md")):
        p = parse_model_md(f)
        slug = p["slug"].strip("/")
        prefix = "bmw" + "".join(w.capitalize() for w in slug.replace("bmw-", "").replace("-engines", "").split("-"))
        model_prefixes[prefix] = slug
    model_prefixes["bmw3Series"] = "bmw-3-series-engines"  # reference page

    for prefix in sorted(model_prefixes):
        if not (DATA / "model" / f"{prefix}Sec1.json").exists():
            continue
        patch_model(prefix, engine_href, variant_href, args.dry_run)

    engine_prefixes = {c.lower() for c in ENGINE_CODES}
    engine_prefixes.add("b58")
    for prefix in sorted(engine_prefixes):
        if not (DATA / "engine-family" / f"{prefix}Sec1.json").exists():
            continue
        patch_engine(prefix, model_href, variant_href, args.dry_run)

    print("Done.")


if __name__ == "__main__":
    main()
