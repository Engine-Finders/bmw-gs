#!/usr/bin/env python3
"""
Image placement pass — run after migrate_bmw_content.py + inject_crosslinks.py.

Matches real vehicle photos from the two source image folders and copies
them into public/model/vehicles/ and public/variant/vehicles/ (new
subfolders so they never collide with the existing generic section-graphic
filenames like sec1.webp), for use in per-vehicle "model/variant section"
UI (e.g. the homepage model grid) — NOT the page hero background, which
stays a workshop/garage template image per the client's instruction: real
vehicle photos only belong in model/variant browsing sections, never in
hero backgrounds or other generic/workshop sections. This script therefore
does NOT write to any Sec*.json — it only populates the image files and
prints the match/gap report; wiring a specific field to one of these images
is a separate, deliberate step done per-section (see homeSec7.json).

Any model/variant with no matching source photo falls back to one shared
placeholder image per type, per the explicit instruction to use a common
image for the known gaps (XM family, i5/i7, Alpina B8) rather than leaving
them broken.

Usage: python scripts/place_images.py [--dry-run]
"""
import argparse
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
MODEL_IMG_DIR = ROOT / "BMW"
VARIANT_IMG_DIR = ROOT / "EM - BMW Vairants Images Webp"

sys.path.insert(0, str(Path(__file__).resolve().parent))
from migrate_bmw_content import (  # noqa: E402
    slugify, MODEL_MD_DIR, VARIANT_TXT_DIR, parse_model_md, parse_variant_txt,
    split_combined_variant_stem, NON_BMW_SKIP,
)

# A generic, always-available photo used for every model/variant we have no
# real source image for (XM family, i5/i7 electric, Alpina B8, etc.)
MODEL_FALLBACK_SRC = MODEL_IMG_DIR / "BMW 5 Series  copy.webp"
VARIANT_FALLBACK_SRC = VARIANT_IMG_DIR / "BMW 5 Series 520d.webp"


def normalize(name):
    name = re.sub(r"^BMW\s+", "", name, flags=re.I)
    name = re.sub(r"\bcopy\b", "", name, flags=re.I)
    name = re.sub(r"\bx[Dd]rive\b|\bs[Dd]rive\b|\bxDriv\b", "", name)
    name = re.sub(r"[^a-z0-9]+", "", name.lower())
    return name


def build_model_image_index():
    """series-only images (no chassis code) preferred for the model hero."""
    generic = {}
    all_imgs = {}
    for f in MODEL_IMG_DIR.glob("*.webp"):
        stem = f.stem.replace("  copy", "").replace(" copy", "").strip()
        key = normalize(stem)
        all_imgs.setdefault(key, f)
        # a "generic" filename has no digits (no chassis code like F30/E90)
        if not re.search(r"\d", stem.split("BMW ", 1)[-1].replace("BMW ", "")):
            generic[normalize(stem)] = f
    return generic, all_imgs


def build_variant_image_index():
    idx = {}
    for f in VARIANT_IMG_DIR.glob("*.webp"):
        idx[normalize(f.stem)] = f
    return idx


def copy_image(src, dest, dry_run):
    dest.parent.mkdir(parents=True, exist_ok=True)
    if not dry_run:
        shutil.copyfile(src, dest)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    model_generic_idx, model_all_idx = build_model_image_index()
    variant_idx = build_variant_image_index()

    copy_image(MODEL_FALLBACK_SRC, PUBLIC / "model" / "vehicles" / "_fallback.webp", args.dry_run)
    copy_image(VARIANT_FALLBACK_SRC, PUBLIC / "variant" / "vehicles" / "_fallback.webp", args.dry_run)

    matched_models, gap_models = [], []
    for f in sorted(MODEL_MD_DIR.glob("*.md")):
        p = parse_model_md(f)
        slug = p["slug"].strip("/")
        prefix = "bmw" + "".join(w.capitalize() for w in slug.replace("bmw-", "").replace("-engines", "").split("-"))
        if prefix == "bmw3Series":
            continue  # reference page — leave its hand-picked image alone
        key = normalize(p["model"])
        src = model_generic_idx.get(key) or model_all_idx.get(key)
        dest_name = f"{slugify(p['model'])}.webp"
        if src:
            copy_image(src, PUBLIC / "model" / "vehicles" / dest_name, args.dry_run)
            matched_models.append((p["model"], src.name))
        else:
            gap_models.append(p["model"])

    matched_variants, gap_variants = [], []
    for f in sorted(VARIANT_TXT_DIR.glob("*.txt")):
        if f.name.lower() in NON_BMW_SKIP:
            continue
        stem = f.stem.replace("BMW ", "").strip()
        for name in split_combined_variant_stem(stem):
            p = parse_variant_txt(f, variant_name_override=name)
            slug = slugify(name)
            prefix = "bmw" + "".join(w.capitalize() for w in slug.split("-"))
            if prefix == "bmw320d":
                continue  # reference page

            series = p.get("model", "")
            candidates = [
                f"{series} {name}",
                f"{series} {re.sub(r'^[a-zA-Z]*[Dd]rive', '', name).strip()}",
                name,
            ]
            src = None
            for cand in candidates:
                src = variant_idx.get(normalize(cand))
                if src:
                    break

            dest_name = f"{slug}.webp"
            if src:
                copy_image(src, PUBLIC / "variant" / "vehicles" / dest_name, args.dry_run)
                matched_variants.append((name, src.name))
            else:
                gap_variants.append(name)

    print(f"models:   {len(matched_models)} matched, {len(gap_models)} on fallback")
    print(f"variants: {len(matched_variants)} matched, {len(gap_variants)} on fallback")
    if gap_models:
        print("\nModel gaps (no source photo, using fallback):")
        for m in gap_models:
            print(f"  - {m}")
    if gap_variants:
        print(f"\nVariant gaps (no source photo, using fallback) — {len(gap_variants)} total:")
        for v in gap_variants[:40]:
            print(f"  - {v}")
        if len(gap_variants) > 40:
            print(f"  ...and {len(gap_variants) - 40} more")


if __name__ == "__main__":
    main()
