import AuthorityPage from "@/components/shared/AuthorityPage";
import JsonLd from "@/components/shared/JsonLd";
import { serviceSchema, faqSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";
import data from "@/data/authority/bmw-engine-components-replaced.json";

const PATH = "/bmw-engine-components-replaced";
const FAQ = (data.sections || []).filter((s) => s.kind === "faq").flatMap((s) => s.items || []);

export const metadata = {
  title: "BMW Engine Components We Replace | BMW Garage",
  description: "Detailed overview of components replaced during BMW engine rebuilds. Bottom end, top end, timing chains, bearings, gaskets, and BMW-specific considerations.",
  alternates: { canonical: PATH },
};

export default function BmwEngineComponentsReplacedPage() {
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
