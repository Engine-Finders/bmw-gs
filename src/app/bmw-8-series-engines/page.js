import ModelHeroSec1 from "@/components/model/ModelHeroSec1";
import ModelSec2 from "@/components/model/ModelSec2";
import ModelSec3 from "@/components/model/ModelSec3";
import ModelSec4 from "@/components/model/ModelSec4";
import ModelSec5 from "@/components/model/ModelSec5";
import ModelSec6 from "@/components/model/ModelSec6";
import ModelSec7 from "@/components/model/ModelSec7";
import ModelSec8 from "@/components/model/ModelSec8";
import ModelSec9 from "@/components/model/ModelSec9";
import ModelSec10 from "@/components/model/ModelSec10";
import ModelSec11 from "@/components/model/ModelSec11";
import ModelSec12 from "@/components/model/ModelSec12";
import ModelSec13 from "@/components/model/ModelSec13";
import ModelSec14 from "@/components/model/ModelSec14";
import ModelSec15 from "@/components/model/ModelSec15";
import ModelSec16 from "@/components/model/ModelSec16";
import ModelSec17 from "@/components/model/ModelSec17";
import ModelSec18 from "@/components/model/ModelSec18";

import modelSec1 from "@/data/model/bmw8SeriesSec1.json";
import modelSec2 from "@/data/model/bmw8SeriesSec2.json";
import modelSec3 from "@/data/model/bmw8SeriesSec3.json";
import modelSec4 from "@/data/model/bmw8SeriesSec4.json";
import modelSec5 from "@/data/model/bmw8SeriesSec5.json";
import modelSec6 from "@/data/model/bmw8SeriesSec6.json";
import modelSec7 from "@/data/model/bmw8SeriesSec7.json";
import modelSec8 from "@/data/model/bmw8SeriesSec8.json";
import modelSec9 from "@/data/model/bmw8SeriesSec9.json";
import modelSec10 from "@/data/model/bmw8SeriesSec10.json";
import modelSec11 from "@/data/model/bmw8SeriesSec11.json";
import modelSec12 from "@/data/model/bmw8SeriesSec12.json";
import modelSec13 from "@/data/model/bmw8SeriesSec13.json";
import modelSec14 from "@/data/model/bmw8SeriesSec14.json";
import modelSec15 from "@/data/model/bmw8SeriesSec15.json";
import modelSec16 from "@/data/model/bmw8SeriesSec16.json";
import modelSec17 from "@/data/model/bmw8SeriesSec17.json";
import modelSec18 from "@/data/model/bmw8SeriesSec18.json";

export const metadata = {
  title: modelSec1.h1?.replaceAll("|", " ") || "bmw-8-series-engines",
  description: modelSec1.subhead || "",
};

export default function Bmw8SeriesEnginesPage() {
  return (
    <>
      <ModelHeroSec1 data={modelSec1} />
      <ModelSec2 data={modelSec2} />
      <ModelSec3 data={modelSec3} />
      <ModelSec4 data={modelSec4} />
      <ModelSec5 data={modelSec5} />
      <ModelSec6 data={modelSec6} />
      <ModelSec7 data={modelSec7} />
      <ModelSec8 data={modelSec8} />
      <ModelSec9 data={modelSec9} />
      <ModelSec10 data={modelSec10} />
      <ModelSec11 data={modelSec11} />
      <ModelSec12 data={modelSec12} />
      <ModelSec13 data={modelSec13} />
      <ModelSec14 data={modelSec14} />
      <ModelSec15 data={modelSec15} />
      <ModelSec16 data={modelSec16} />
      <ModelSec17 data={modelSec17} />
      <ModelSec18 data={modelSec18} />
    </>
  );
}
