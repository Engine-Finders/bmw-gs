import AuthorityPage from "@/components/shared/AuthorityPage";
import JsonLd from "@/components/shared/JsonLd";
import { serviceSchema, faqSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";
import data from "@/data/authority/bmw-trade-fleet-engine-services.json";

const PATH = "/bmw-trade-fleet-engine-services";
const FAQ = (data.sections || []).filter((s) => s.kind === "faq").flatMap((s) => s.items || []);

export const metadata = {
  title: "BMW Trade & Fleet Engine Services | BMW Garage",
  description: "Trade and fleet engine services for BMW vehicles - consistent quality, transparent quoting, technical support and fast turnaround. Rebuilds with full warranty for commercial customers.",
  alternates: { canonical: PATH },
};

export default function BmwTradeFleetEngineServicesPage() {
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
