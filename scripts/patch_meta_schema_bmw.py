#!/usr/bin/env python3
"""
One-time patch over the 214 already-built BMW model/variant/engine page.js
files: adds `alternates.canonical` (missing entirely until now) and a
per-page JSON-LD block (Service + FAQPage + BreadcrumbList), matching what
the Mercedes site generates fresh. Idempotent — skips any file that already
has `alternates:` in its metadata.

Usage: python scripts/patch_meta_schema_bmw.py
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
APP = ROOT / "src" / "app"

SCHEMA_IMPORT = ('import JsonLd from "@/components/shared/JsonLd";\n'
                  'import { serviceSchema, faqSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";\n')


def detect_type(text):
    if 'from "@/components/model/ModelHeroSec1"' in text:
        return "model"
    if 'from "@/components/variant/VariantHeroSec1"' in text:
        return "variant"
    if 'from "@/components/engine-family/HeroSec1"' in text:
        return "engine"
    return None


def last_sec_num(text, kind):
    if kind == "model":
        nums = [int(n) for n in re.findall(r'from "@/data/model/\w+Sec(\d+)\.json"', text)]
    elif kind == "variant":
        nums = [int(n) for n in re.findall(r'from "@/data/variant/\w+Sec(\d+)\.json"', text)]
    else:
        nums = [int(n) for n in re.findall(r'from "@/data/engine-family/\w+Sec(\d+)\.json"', text)]
    return max(nums) if nums else None


def patch_one(path):
    slug = path.parent.name
    text = path.read_text(encoding="utf-8")
    kind = detect_type(text)
    if not kind:
        return None  # not a model/variant/engine page (authority/core/etc.)
    if "JsonLd" in text:
        return "already patched"

    count = last_sec_num(text, kind)
    if not count:
        return "no Sec imports found"

    if kind == "model":
        data1, faqvar = "modelSec1", f"modelSec{count}"
        name_expr = 'modelSec1.h1?.replaceAll("|", " ")'
        price_expr = "modelSec1.priceCta?.price"
        crumb_label, crumb_path = "Models", "/models"
    elif kind == "variant":
        data1, faqvar = "variantSec1", f"variantSec{count}"
        name_expr = 'variantSec1.h1?.replaceAll("|", " ")'
        price_expr = "(variantSec1.priceCta?.kicker || variantSec1.h1)"
        crumb_label, crumb_path = "Variants", "/variants"
    else:
        data1, faqvar = "sec1", f"sec{count}"
        name_expr = '[sec1.titlePre, sec1.titleHighlight, sec1.titleLine2].filter(Boolean).join(" ")'
        price_expr = "(sec1.priceCta?.label || sec1.priceCta?.kicker)"
        crumb_label, crumb_path = "Engines", "/engines"

    # FAQ location differs: model/variant have faqLeft/faqRight directly on the
    # last section; engine nests it under .faq (matches Mercedes' m139 shape).
    if kind == "engine":
        faq_expr = f'[...({faqvar}.faq?.faqLeft || []), ...({faqvar}.faq?.faqRight || [])]'
    else:
        faq_expr = f'[...({faqvar}.faqLeft || []), ...({faqvar}.faqRight || [])]'

    subhead_expr = f"{data1}.subhead" if kind != "engine" else "sec1.subhead"

    # 1) insert schema import block right before "export const metadata"
    consts = (
        f'\nconst PATH = "/{slug}";\n'
        f'const NAME = {name_expr};\n'
        f'const FAQ = {faq_expr};\n'
    )
    new_text, n = re.subn(
        r'\n(export const metadata = \{)',
        SCHEMA_IMPORT + consts + r'\n\1',
        text, count=1,
    )
    if n != 1:
        return "metadata block not found"
    text = new_text

    # 2) add canonical into the metadata object if not present
    if "alternates:" not in text:
        text = re.sub(
            r'(export const metadata = \{\n(?:.*\n)*?\s*description:.*?,\n)(\};)',
            r'\1  alternates: { canonical: PATH },\n\2',
            text, count=1,
        )
        # metadata description sometimes spans two lines ("description:\n    \"...\",")
        if "alternates:" not in text:
            text = re.sub(r'(\};\n\nexport default function)', r'  alternates: { canonical: PATH },\n\1', text, count=1)

    # 3) wrap the JSX return in a fragment with <JsonLd /> first
    jsonld = (
        '\n      <JsonLd\n        data={graphDoc([\n'
        f'          serviceSchema({{ name: NAME, description: {subhead_expr}, path: PATH, price: {price_expr} }}),\n'
        '          faqSchema(FAQ, PATH),\n'
        f'          breadcrumbSchema([{{ name: "Home", path: "/" }}, {{ name: "{crumb_label}", path: "{crumb_path}" }}, {{ name: NAME, path: PATH }}], PATH),\n'
        '        ])}\n      />')

    if not re.search(r'return \(\s*\n\s*<>', text):
        return "no fragment-wrapped return( found"
    text = re.sub(r'(return \(\s*\n\s*<>)', r'\1' + jsonld, text, count=1)

    path.write_text(text, encoding="utf-8")
    return "patched"


def main():
    results = {}
    for pj in sorted(APP.glob("*/page.js")):
        r = patch_one(pj)
        if r is None:
            continue
        results.setdefault(r, []).append(pj.parent.name)
    for k, v in results.items():
        print(f"{k}: {len(v)}")
        if k not in ("patched", "already patched"):
            print("   ", v[:10])


if __name__ == "__main__":
    main()
