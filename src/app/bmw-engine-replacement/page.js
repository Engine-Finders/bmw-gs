import AuthorityPage from "@/components/shared/AuthorityPage";
import JsonLd from "@/components/shared/JsonLd";
import { serviceSchema, faqSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";
import data from "@/data/authority/bmw-engine-replacement.json";

const PATH = "/bmw-engine-replacement";
const FAQ = (data.sections || []).filter((s) => s.kind === "faq").flatMap((s) => s.items || []);

export const metadata = {
  title: "BMW Engine Replacement & Fitting | BMW Garage",
  description: "Professional BMW engine replacement and fitting service. Used, rebuilt, or remanufactured engines installed by BMW specialists. 12-month unlimited mileage warranty.",
  alternates: { canonical: PATH },
};

export default function BmwEngineReplacementPage() {
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
