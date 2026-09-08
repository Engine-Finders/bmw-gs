#!/usr/bin/env python3
"""
One-off content fix for src/data/variant/bmwI5Edrive40*.json.

The i5 eDrive40 is a real, in-scope page (unlike the other electric i5/i7
sub-variants, which are excluded entirely — see is_out_of_scope() in
migrate_bmw_content.py), but its source .txt has no price table and no
"Applications by Generation"/"Engines by Year" tables (it's a single-config
EV, not a multi-engine-code combustion variant), so several sections that
are normally derived from those tables have nothing to derive from and keep
the 320d reference template's diesel/N47/B47 content — factually wrong on
an electric vehicle.

Run this AFTER every `migrate_bmw_content.py --type all` (it overwrites
bmwI5Edrive40Sec1.json's generated content), and before inject_crosslinks.py.
"""
import json
from pathlib import Path

DATA = Path(__file__).resolve().parent.parent / "src" / "data" / "variant"


def write(path, data):
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def main():
    p3 = DATA / "bmwI5Edrive40Sec3.json"
    d3 = json.loads(p3.read_text(encoding="utf-8"))
    d3["headline"] = "BMW i5 eDrive40 Service Price"
    d3["cards"] = [{"code": "Electric Motor", "generation": "G60 (2023–present)", "price": "£2,800"}]
    d3["notes"] = [
        {"icon": "layers", "text": "Fully electric — no combustion engine or engine code to match."},
        {"icon": "price", "text": "We advise honestly on electric motor servicing and sourcing where available."},
    ]
    d3["warning"] = {
        "bgImage": "/variant/sec3_lower_div_bg.webp",
        "titlePre": "BMW i5 eDrive40 Is ",
        "titleHighlight": "Fully Electric",
        "paragraphs": [
            "The i5 eDrive40 is fully electric with no combustion engine — our engine rebuild service is designed for petrol and diesel engines only. If you need electric motor servicing, replacement, or used motor sourcing, get in touch and we'll advise honestly on what's available.",
            "We specialise in rebuilding combustion engines, so a traditional engine rebuild simply doesn't apply to the i5 eDrive40 — but we won't leave you without options.",
        ],
        "source": "We're upfront about what we can and can't do — no fabricated claims about combustion engine issues on an electric vehicle.",
    }
    write(p3, d3)

    p10 = DATA / "bmwI5Edrive40Sec10.json"
    d10 = json.loads(p10.read_text(encoding="utf-8"))
    d10["about"]["titleHighlight"] = "BMW i5 eDrive40 MOTOR"
    d10["about"]["paragraphs"] = [
        "The i5 eDrive40 is the fully electric variant of the G60-generation 5 Series, launched in 2023. It uses an electric motor and battery pack instead of a combustion engine, so the timing chain, turbo and injector issues that affect our petrol and diesel rebuilds simply don't apply here.",
        "We specialise in rebuilding combustion engines. For the i5 eDrive40 we can advise on electric motor inspection, servicing, and sourcing used or replacement units where available — enter your registration and we'll talk you through what's genuinely possible for your car.",
    ]
    d10["about"]["boldParagraph"] = "The i5 eDrive40 has no combustion engine, so a traditional rebuild isn't applicable — but we'll always advise honestly on your options."

    d10["compatibility"]["titlePre"] = "BMW i5 eDrive40 MOTOR "
    d10["compatibility"]["intro"] = "The i5 eDrive40 uses a single electric motor and battery pack rather than a combustion engine, so there is no engine code or generation mismatch risk to worry about. Before we advise or supply anything, we confirm:"
    d10["compatibility"]["badge"] = {"title": "Electric Motor", "line1": "Confirmed by VIN", "line2": "Match Guaranteed"}
    d10["compatibility"]["points"] = [
        {"icon": "piston", "text": "Your exact model and battery specification via registration or VIN"},
        {"icon": "car", "text": "Your generation (G60)"},
        {"icon": "gears", "text": "Drivetrain and ancillary specification"},
        {"icon": "code", "text": "Any electronics or software considerations specific to your exact build"},
    ]
    d10["compatibility"]["footer"] = "This is why we always start with your registration rather than a generic i5 eDrive40 quote — it protects you from paying for parts that don't fit your actual car."

    d10["codes"]["titlePre"] = "BMW i5 eDrive40 "
    d10["codes"]["cards"] = [
        {
            "codeHighlight": "Electric Motor",
            "codeRest": "(G60, 2023–present)",
            "body": "The i5 eDrive40 is fully electric — it has no combustion engine or engine code. We don't currently rebuild electric motors, but we can advise on inspection, servicing, and sourcing used or replacement units where available.",
            "cta": "Ask About Your i5 eDrive40",
        }
    ]
    write(p10, d10)

    p11 = DATA / "bmwI5Edrive40Sec11.json"
    d11 = json.loads(p11.read_text(encoding="utf-8"))
    d11["rows"] = [
        {"year": "2023", "generation": "G60", "engineCode": "Electric", "fuel": "Electric", "service": "Advice Only"},
        {"year": "2024", "generation": "G60", "engineCode": "Electric", "fuel": "Electric", "service": "Advice Only"},
        {"year": "2025", "generation": "G60", "engineCode": "Electric", "fuel": "Electric", "service": "Advice Only"},
    ]
    write(p11, d11)

    print("i5 eDrive40 fixups applied (Sec3, Sec10, Sec11).")


if __name__ == "__main__":
    main()
