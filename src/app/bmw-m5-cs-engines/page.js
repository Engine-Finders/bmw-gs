import VariantHeroSec1 from "@/components/variant/VariantHeroSec1";
import VariantSec2 from "@/components/variant/VariantSec2";
import VariantSec3 from "@/components/variant/VariantSec3";
import VariantSec4 from "@/components/variant/VariantSec4";
import VariantSec5 from "@/components/variant/VariantSec5";
import VariantSec6 from "@/components/variant/VariantSec6";
import VariantSec7 from "@/components/variant/VariantSec7";
import VariantSec8 from "@/components/variant/VariantSec8";
import VariantSec9 from "@/components/variant/VariantSec9";
import VariantSec10 from "@/components/variant/VariantSec10";
import VariantSec11 from "@/components/variant/VariantSec11";
import VariantSec12 from "@/components/variant/VariantSec12";
import VariantSec13 from "@/components/variant/VariantSec13";

import variantSec1 from "@/data/variant/bmwM5CsSec1.json";
import variantSec2 from "@/data/variant/bmwM5CsSec2.json";
import variantSec3 from "@/data/variant/bmwM5CsSec3.json";
import variantSec4 from "@/data/variant/bmwM5CsSec4.json";
import variantSec5 from "@/data/variant/bmwM5CsSec5.json";
import variantSec6 from "@/data/variant/bmwM5CsSec6.json";
import variantSec7 from "@/data/variant/bmwM5CsSec7.json";
import variantSec8 from "@/data/variant/bmwM5CsSec8.json";
import variantSec9 from "@/data/variant/bmwM5CsSec9.json";
import variantSec10 from "@/data/variant/bmwM5CsSec10.json";
import variantSec11 from "@/data/variant/bmwM5CsSec11.json";
import variantSec12 from "@/data/variant/bmwM5CsSec12.json";
import variantSec13 from "@/data/variant/bmwM5CsSec13.json";

export const metadata = {
  title: variantSec1.h1?.replaceAll("|", " ") || "bmw-m5-cs-engines",
  description: variantSec1.subhead || "",
};

export default function BmwM5CsEnginesPage() {
  return (
    <>
      <VariantHeroSec1 data={variantSec1} />
      <VariantSec2 data={variantSec2} />
      <VariantSec3 data={variantSec3} />
      <VariantSec4 data={variantSec4} />
      <VariantSec5 data={variantSec5} />
      <VariantSec6 data={variantSec6} />
      <VariantSec7 data={variantSec7} />
      <VariantSec8 data={variantSec8} />
      <VariantSec9 data={variantSec9} />
      <VariantSec10 data={variantSec10} />
      <VariantSec11 data={variantSec11} />
      <VariantSec12 data={variantSec12} />
      <VariantSec13 data={variantSec13} />
    </>
  );
}
