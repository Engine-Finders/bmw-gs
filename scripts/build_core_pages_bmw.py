#!/usr/bin/env python3
"""
Builds the BMW site's Core content pages, directory/index pages, and the
header + footer navigation data from:
  ../gs-core-pages/BMW/*.txt          (core page copy)
  src/data/shared/siteRoutes.json      (generated model/variant/engine routes)

Outputs:
  src/data/core/*.json  +  src/app/<slug>/page.js   (LegalPage / DirectoryPage)
  src/data/shared/navbar.json  (dropdown menu structure)
  src/data/shared/footer.json

Also normalises the business phone number across src/data to the Contact-Us value.

Usage: python scripts/build_core_pages_bmw.py
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "src" / "data"
APP = ROOT / "src" / "app"
CORE_SRC = ROOT.parent / "gs-core-pages" / "BMW"

PHONE = "01268 944234"
WHATSAPP = "07975 827 396"
EMAIL = "info@bmwgarage.uk"
ADDRESS = "Unit A5 Windsor Road, Commercial Estate, Ramsden Heath, Billericay, CM11 1QE"
HOURS = "Mon–Fri 9am–6pm · Sat 11am–2pm"

CORE_MAP = {
    "GS-BMW-About-Us.txt": ("about", "About Us"),
    "GS-BMW-Contact-Us.txt": ("contact", "Contact"),
    "BMW Garage - Financing & Payment Options.txt": ("financing", "Financing & Payment"),
    "BMW Garage - Pricing & Legal Disclaimer.txt": ("pricing-legal-disclaimer", "Pricing & Legal Disclaimer"),
    "BMW Garage - Privacy Policy.txt": ("privacy-policy", "Privacy Policy"),
    "BMW Garage - Terms & Conditions.txt": ("terms-and-conditions", "Terms & Conditions"),
    "BMW Garage - Warranty.txt": ("warranty", "Warranty"),
}

# reference pages that predate the generation manifest (never in siteRoutes.json)
REFERENCE_ROUTES = [
    {"type": "model", "slug": "bmw-3-series-engines", "title": "BMW 3 Series Engine Rebuild"},
    {"type": "variant", "slug": "bmw-320d-engines", "title": "BMW 320d Engine Rebuild"},
    {"type": "engine", "slug": "bmw-b58-engine", "title": "BMW B58 Engine Rebuild"},
]


def clean(s):
    return re.sub(r"\s+", " ", s.replace("&nbsp;", " ")).strip()


def cta_href(label):
    l = label.lower()
    phone = re.search(r"(0\d[\d\s]{8,})", label)
    if phone:
        return "tel:" + re.sub(r"\s+", "", phone.group(1))
    if "whatsapp" in l:
        return "https://wa.me/447975827396"
    return "/contact"


def parse_core(path):
    raw = path.read_text(encoding="utf-8", errors="replace")
    lines = raw.splitlines()

    title = desc = ""
    for l in lines:
        m = re.match(r"\*\*Title:\*\*\s*(.+)", l)
        if m and not title:
            title = clean(m.group(1))
        m = re.match(r"\*\*Description:\*\*\s*(.+)", l)
        if m and not desc:
            desc = clean(m.group(1))

    try:
        start = next(i for i, l in enumerate(lines) if l.strip().lower() == "## page content")
        body_lines = lines[start + 1:]
    except StopIteration:
        body_lines = lines

    # the source pages append a raw JSON-LD dump — that belongs in <head>, not
    # the visible body. Cut everything from the first such marker.
    cut = None
    for i, l in enumerate(body_lines):
        s = l.strip().lower()
        if (re.match(r"#{1,4}\s*schema markup", s) or "json-ld" in s or "application/ld+json" in s
                or s.startswith("<script") or s == '```json'
                or (s.startswith('{') and '"@context"' in "".join(body_lines[i:i + 3]).lower())
                or s.startswith('"@context"')):
            cut = i
            break
    if cut is not None:
        body_lines = body_lines[:cut]

    blocks = []
    updated = ""
    intro = ""
    ul = []

    def flush_ul():
        nonlocal ul
        if ul:
            blocks.append({"type": "ul", "items": ul})
            ul = []

    for l in body_lines:
        s = l.strip()
        if not s or s == "---":
            flush_ul()
            continue
        if s.startswith("<!--") or s.startswith("```"):
            continue
        if s.startswith("*BMW Garage is a trading name") or (s.startswith("*") and "trading name" in s):
            intro = clean(s.strip("*"))
            continue
        um = re.match(r"\*?\*?Last updated:.*", s)
        if um:
            updated = clean(s.strip("*"))
            continue
        hm = re.match(r"(#{1,4})\s+(.+)", s)
        if hm:
            flush_ul()
            level = len(hm.group(1))
            text = clean(hm.group(2))
            if text.lower() in ("meta tags", "page content"):
                continue
            blocks.append({"type": "h2" if level <= 2 else "h3", "text": text})
            continue
        bm = re.match(r"[-*]\s+(.+)", s)
        if bm:
            ul.append(clean(bm.group(1)))
            continue
        # a line of one or more bare "[Label]" bracket placeholders (no markdown
        # link target) — these are CTA-button call-outs in the source content,
        # not literal bracket text. Render them as real buttons.
        cta_labels = re.findall(r"\[([^\]]+)\]", s)
        if cta_labels and re.fullmatch(r"(\s*\[[^\]]+\]\s*)+", s):
            flush_ul()
            blocks.append({"type": "ctaRow", "items": [{"label": clean(lb), "href": cta_href(lb)} for lb in cta_labels]})
            continue
        flush_ul()
        blocks.append({"type": "p", "text": clean(s)})
    flush_ul()

    while blocks and blocks[0]["type"] in ("h2", "h3") and blocks[0]["text"].lower() == title.split("|")[0].strip().lower():
        blocks.pop(0)

    return {
        "title": title.split("|")[0].strip() or path.stem,
        "metaTitle": title,
        "metaDescription": desc,
        "updated": updated,
        "intro": intro,
        "blocks": blocks,
    }


def esc(s):
    return s.replace("\\", "\\\\").replace('"', '\\"')


def write_legal_page(slug, data):
    (APP / slug).mkdir(parents=True, exist_ok=True)
    (DATA / "core").mkdir(parents=True, exist_ok=True)
    (DATA / "core" / f"{slug}.json").write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    fn = "".join(w.capitalize() for w in slug.split("-")) + "Page"
    page_type = {"contact": "ContactPage", "about": "AboutPage"}.get(slug, "WebPage")
    crumb = data["title"].split("|")[0].strip()
    js = f'''import LegalPage from "@/components/shared/LegalPage";
import JsonLd from "@/components/shared/JsonLd";
import {{ webPageSchema, breadcrumbSchema, graphDoc }} from "@/lib/schema";
import data from "@/data/core/{slug}.json";

const PATH = "/{slug}";

export const metadata = {{
  title: "{esc(data['metaTitle'] or data['title'])}",
  description: "{esc(data['metaDescription'])}",
  alternates: {{ canonical: PATH }},
}};

export default function {fn}() {{
  return (
    <>
      <JsonLd
        data={{graphDoc([
          webPageSchema({{ name: {json.dumps(data['metaTitle'] or data['title'])}, description: {json.dumps(data['metaDescription'])}, path: PATH, type: "{page_type}" }}),
          breadcrumbSchema([{{ name: "Home", path: "/" }}, {{ name: {json.dumps(crumb)}, path: PATH }}], PATH),
        ])}}
      />
      <LegalPage data={{data}} />
    </>
  );
}}
'''
    (APP / slug / "page.js").write_text(js, encoding="utf-8")


def write_directory_page(slug, data):
    (APP / slug).mkdir(parents=True, exist_ok=True)
    (DATA / "core" / f"{slug}.json").write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    fn = "".join(w.capitalize() for w in slug.split("-")) + "Page"
    js = f'''import DirectoryPage from "@/components/shared/DirectoryPage";
import JsonLd from "@/components/shared/JsonLd";
import {{ webPageSchema, breadcrumbSchema, graphDoc }} from "@/lib/schema";
import data from "@/data/core/{slug}.json";

const PATH = "/{slug}";

export const metadata = {{
  title: "{esc(data['title'])} | BMW Garage",
  description: "{esc(data.get('subtitle', ''))}",
  alternates: {{ canonical: PATH }},
}};

export default function {fn}() {{
  return (
    <>
      <JsonLd
        data={{graphDoc([
          webPageSchema({{ name: {json.dumps(data['title'] + " | BMW Garage")}, description: {json.dumps(data.get('subtitle', ''))}, path: PATH, type: "CollectionPage" }}),
          breadcrumbSchema([{{ name: "Home", path: "/" }}, {{ name: {json.dumps(data['title'])}, path: PATH }}], PATH),
        ])}}
      />
      <DirectoryPage data={{data}} />
    </>
  );
}}
'''
    (APP / slug / "page.js").write_text(js, encoding="utf-8")


def title_case_model(slug):
    core = slug.replace("bmw-", "").replace("-engines", "")
    return "BMW " + " ".join(w.upper() if len(w) <= 3 else w.capitalize() for w in core.split("-"))


def main():
    routes = json.loads((DATA / "shared" / "siteRoutes.json").read_text(encoding="utf-8"))
    routes = [r for r in routes if r["type"] in ("model", "variant", "engine")] + REFERENCE_ROUTES
    models = sorted({r["slug"]: r for r in routes if r["type"] == "model"}.values(), key=lambda r: r["slug"])
    variants = sorted({r["slug"]: r for r in routes if r["type"] == "variant"}.values(), key=lambda r: r["slug"])
    engines = sorted({r["slug"]: r for r in routes if r["type"] == "engine"}.values(), key=lambda r: r["slug"])

    # ---- core pages ----
    core_nav = []
    for fname, (slug, label) in CORE_MAP.items():
        p = CORE_SRC / fname
        if not p.exists():
            print("  missing core src:", fname)
            continue
        data = parse_core(p)
        if slug == "contact":
            data["blocks"] = [
                {"type": "h2", "text": "Call Us"},
                {"type": "p", "text": f"**{PHONE}** — Mon–Fri 9am–6pm, Sat 11am–2pm"},
                {"type": "p", "text": f"**WhatsApp {WHATSAPP}** — message anytime, response within 2 business hours"},
                {"type": "h2", "text": "Email"},
                {"type": "p", "text": f"General enquiries: [{EMAIL}](mailto:{EMAIL})"},
                {"type": "p", "text": "GDPR requests: [gdpr@bmwgarage.uk](mailto:gdpr@bmwgarage.uk)"},
                {"type": "h2", "text": "Workshop"},
                {"type": "p", "text": ADDRESS},
                {"type": "p", "text": "Nationwide collection and delivery available across mainland UK."},
            ] + data["blocks"]
        write_legal_page(slug, data)
        core_nav.append({"label": label, "href": f"/{slug}"})
        print(f"  core -> /{slug}")

    # ---- directory pages ----
    write_directory_page("engines", {
        "title": "BMW Engine Rebuilds",
        "subtitle": "Every BMW engine family we rebuild and replace — click through for pricing, applications and known issues.",
        "groups": [{
            "heading": "",
            "items": [{"label": r["slug"].replace("bmw-", "").replace("-engine", "").upper(),
                       "href": f"/{r['slug']}"} for r in engines],
        }],
    })
    write_directory_page("models", {
        "title": "BMW Models",
        "subtitle": "Engine rebuild and replacement coverage for every BMW model line.",
        "groups": [{
            "heading": "",
            "items": [{"label": title_case_model(r["slug"]), "href": f"/{r['slug']}"} for r in models],
        }],
    })
    vgroups = {}
    for r in variants:
        pref = "bmw" + "".join(w.capitalize() for w in r["slug"].replace("bmw-", "").replace("-engines", "").split("-"))
        parent = "Other"
        p2 = DATA / "variant" / f"{pref}Sec2.json"
        if p2.exists():
            specs = {s.get("label"): s.get("value") for s in json.loads(p2.read_text(encoding="utf-8")).get("specs", [])}
            parent = specs.get("Model") or "Other"
        label = r.get("title", r["slug"]).replace(" Engine Rebuild", "").replace("BMW ", "")
        vgroups.setdefault(parent, []).append({"label": label, "href": f"/{r['slug']}"})
    write_directory_page("variants", {
        "title": "BMW Variants",
        "subtitle": "Every individual BMW variant we cover, grouped by model line.",
        "groups": [{"heading": k, "items": sorted(v, key=lambda x: x["label"])}
                   for k, v in sorted(vgroups.items())],
    })
    print("  directory -> /engines /models /variants")

    # ---- navbar ----
    top_engines = ["n47", "n57", "b47", "n20", "n63", "s55", "b58", "n55", "n54", "m54"]
    eng_links = [{"label": c.upper(), "href": f"/bmw-{c}-engine"}
                 for c in top_engines if any(r["slug"] == f"bmw-{c}-engine" for r in engines)]
    navbar = {
        "brand": "BMW GARAGE",
        "tagline": "BMW ENGINE SPECIALISTS",
        "phone": PHONE,
        "phoneHref": "tel:" + PHONE.replace(" ", ""),
        "cta": {"label": "Get a Quote", "href": "/contact"},
        "links": [
            {"label": "Home", "href": "/"},
            {
                "label": "Models", "href": "/models",
                "children": [{"label": title_case_model(r["slug"]), "href": f"/{r['slug']}"} for r in models],
            },
            {
                "label": "Engines", "href": "/engines",
                "children": eng_links + [{"label": "View all engines →", "href": "/engines"}],
            },
            {
                "label": "Variants", "href": "/variants",
                "children": [{"label": k, "href": "/variants#" + re.sub(r"[^a-z0-9]+", "-", k.lower())}
                             for k in sorted(vgroups)][:12] + [{"label": "View all variants →", "href": "/variants"}],
            },
            {"label": "About", "href": "/about"},
            {"label": "Contact", "href": "/contact"},
        ],
    }
    (DATA / "shared" / "navbar.json").write_text(json.dumps(navbar, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    # ---- footer ----
    footer = {
        "brand": "BMW GARAGE",
        "blurb": "BMW engine rebuild specialists. N47, N57, B58, M-Power & more — cars, SUVs, M models. Fixed-price quotes, 12-month unlimited-mileage warranty.",
        "columns": [
            {"title": "Company", "links": core_nav},
            {"title": "Popular Engines", "links": eng_links[:6] + [{"label": "All engines", "href": "/engines"}]},
            {"title": "Popular Models", "links": [
                {"label": title_case_model(r["slug"]), "href": f"/{r['slug']}"}
                for r in models if r["slug"] in (
                    "bmw-3-series-engines", "bmw-5-series-engines", "bmw-1-series-engines",
                    "bmw-x3-engines", "bmw-x5-engines", "bmw-4-series-engines")
            ] + [{"label": "All models", "href": "/models"}]},
        ],
        "contact": {
            "address": ADDRESS,
            "phone": PHONE,
            "whatsapp": WHATSAPP,
            "email": EMAIL,
            "hours": HOURS,
        },
        "social": [
            {"label": "Facebook", "href": "https://facebook.com/JLREngineSpecialists"},
            {"label": "Instagram", "href": "https://instagram.com/jlr_engine_specialists_ltd"},
            {"label": "TikTok", "href": "https://tiktok.com/@land.rover.engine"},
        ],
        "copyright": "© 2026 BMW Garage — a trading name of JLR Engine Specialists Ltd (Company No. 16500838). Independent BMW specialist, not affiliated with BMW AG.",
    }
    (DATA / "shared" / "footer.json").write_text(json.dumps(footer, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print("  navbar.json + footer.json written")

    # ---- add core + directory routes to the sitemap manifest ----
    all_routes = json.loads((DATA / "shared" / "siteRoutes.json").read_text(encoding="utf-8"))
    all_routes = [r for r in all_routes if r["type"] not in ("core", "directory")]
    all_routes += [{"type": "directory", "slug": s, "title": t} for s, t in (
        ("engines", "BMW Engine Rebuilds"), ("models", "BMW Models"), ("variants", "BMW Variants"))]
    all_routes += [{"type": "core", "slug": slug, "title": label} for slug, label in
                   [(s, l) for _, (s, l) in CORE_MAP.items()]]
    all_routes.sort(key=lambda r: (r["type"], r["slug"]))
    (DATA / "shared" / "siteRoutes.json").write_text(
        json.dumps(all_routes, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"  siteRoutes.json now {len(all_routes)} routes")

    # ---- phone normalisation across generated data ----
    n = 0
    for f in DATA.rglob("*.json"):
        t = f.read_text(encoding="utf-8")
        nt = (t.replace("+44 01268 944 234", PHONE).replace("01268 944 234", PHONE)
              .replace("tel:+4401268944234", "tel:" + PHONE.replace(" ", ""))
              .replace("tel:01268944234", "tel:" + PHONE.replace(" ", "")))
        if nt != t:
            f.write_text(nt, encoding="utf-8")
            n += 1
    print(f"  phone normalised in {n} data files")


if __name__ == "__main__":
    main()
