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

import variantSec1 from "@/data/variant/bmwX330dSec1.json";
import variantSec2 from "@/data/variant/bmwX330dSec2.json";
import variantSec3 from "@/data/variant/bmwX330dSec3.json";
import variantSec4 from "@/data/variant/bmwX330dSec4.json";
import variantSec5 from "@/data/variant/bmwX330dSec5.json";
import variantSec6 from "@/data/variant/bmwX330dSec6.json";
import variantSec7 from "@/data/variant/bmwX330dSec7.json";
import variantSec8 from "@/data/variant/bmwX330dSec8.json";
import variantSec9 from "@/data/variant/bmwX330dSec9.json";
import variantSec10 from "@/data/variant/bmwX330dSec10.json";
import variantSec11 from "@/data/variant/bmwX330dSec11.json";
import variantSec12 from "@/data/variant/bmwX330dSec12.json";
import variantSec13 from "@/data/variant/bmwX330dSec13.json";

export const metadata = {
  title: variantSec1.h1?.replaceAll("|", " ") || "bmw-x3-30d-engines",
  description: variantSec1.subhead || "",
};

export default function BmwX330dEnginesPage() {
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
