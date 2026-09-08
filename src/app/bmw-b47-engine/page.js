import HeroSec1 from "@/components/engine-family/HeroSec1";
import Sec2 from "@/components/engine-family/Sec2";
import Sec3 from "@/components/engine-family/Sec3";
import Sec4 from "@/components/engine-family/Sec4";
import Sec5 from "@/components/engine-family/Sec5";
import Sec6 from "@/components/engine-family/Sec6";
import Sec7 from "@/components/engine-family/Sec7";
import Sec8 from "@/components/engine-family/Sec8";
import Sec9 from "@/components/engine-family/Sec9";
import Sec10 from "@/components/engine-family/Sec10";
import Sec11 from "@/components/engine-family/Sec11";

import sec1 from "@/data/engine-family/b47Sec1.json";
import sec2 from "@/data/engine-family/b47Sec2.json";
import sec3 from "@/data/engine-family/b47Sec3.json";
import sec4 from "@/data/engine-family/b47Sec4.json";
import sec5 from "@/data/engine-family/b47Sec5.json";
import sec6 from "@/data/engine-family/b47Sec6.json";
import sec7 from "@/data/engine-family/b47Sec7.json";
import sec8 from "@/data/engine-family/b47Sec8.json";
import sec9 from "@/data/engine-family/b47Sec9.json";
import sec10 from "@/data/engine-family/b47Sec10.json";
import sec11 from "@/data/engine-family/b47Sec11.json";

export const metadata = {
  title: sec1.h1?.replaceAll("|", " ") || "bmw-b47-engine",
  description: sec1.subhead || "",
};

export default function BmwB47EnginePage() {
  return (
    <>
      <HeroSec1 data={sec1} />
      <Sec2 data={sec2} />
      <Sec3 data={sec3} />
      <Sec4 data={sec4} />
      <Sec5 data={sec5} />
      <Sec6 data={sec6} />
      <Sec7 data={sec7} />
      <Sec8 data={sec8} />
      <Sec9 data={sec9} />
      <Sec10 data={sec10} />
      <Sec11 data={sec11} />
    </>
  );
}
