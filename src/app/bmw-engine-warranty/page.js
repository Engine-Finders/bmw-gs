import AuthorityPage from "@/components/shared/AuthorityPage";
import JsonLd from "@/components/shared/JsonLd";
import { serviceSchema, faqSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";
import data from "@/data/authority/bmw-engine-warranty.json";

const PATH = "/bmw-engine-warranty";
const FAQ = (data.sections || []).filter((s) => s.kind === "faq").flatMap((s) => s.items || []);

export const metadata = {
  title: "BMW Engine Rebuild Warranty Explained | BMW Garage",
  description: "What a BMW engine rebuild warranty covers, typical terms, exclusions and BMW-specific requirements. 12-month unlimited-mileage guarantee included with every rebuild from BMW Garage.",
  alternates: { canonical: PATH },
};

export default function BmwEngineWarrantyPage() {
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
