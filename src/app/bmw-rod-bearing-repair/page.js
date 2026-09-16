import AuthorityPage from "@/components/shared/AuthorityPage";
import JsonLd from "@/components/shared/JsonLd";
import { serviceSchema, faqSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";
import data from "@/data/authority/bmw-rod-bearing-repair.json";

const PATH = "/bmw-rod-bearing-repair";
const FAQ = (data.sections || []).filter((s) => s.kind === "faq").flatMap((s) => s.items || []);

export const metadata = {
  title: "BMW M-Car Rod Bearing Repair (S54/S85) | BMW Garage",
  description: "Specialist BMW rod bearing repair for S54 (E46 M3, Z4 M) and S85 (E60 M5, E63/E64 M6) engines. Precision replacement with plastigauge measurement and OEM torque specifications.",
  alternates: { canonical: PATH },
};

export default function BmwRodBearingRepairPage() {
  return (
    <>
      <JsonLd
        data={graphDoc([
          serviceSchema({ name: data.h1, description: data.metaDescription, path: PATH }),
          faqSchema(FAQ, PATH),
          breadcrumbSchema(
            [{ name: "Home", path: "/" }, { name: "Guides", path: "/bmw-engine-rebuild" }, { name: data.h1, path: PATH }],
            PATH
          ),
        ])}
      />
      <AuthorityPage data={data} />
    </>
  );
}
