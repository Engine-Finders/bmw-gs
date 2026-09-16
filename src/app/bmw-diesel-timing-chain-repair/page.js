import AuthorityPage from "@/components/shared/AuthorityPage";
import JsonLd from "@/components/shared/JsonLd";
import { serviceSchema, faqSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";
import data from "@/data/authority/bmw-diesel-timing-chain-repair.json";

const PATH = "/bmw-diesel-timing-chain-repair";
const FAQ = (data.sections || []).filter((s) => s.kind === "faq").flatMap((s) => s.items || []);

export const metadata = {
  title: "BMW Diesel Timing Chain Repair (N47/B47) | BMW Garage",
  description: "BMW diesel timing chain repair for N47 and B47 engines. Engine-out replacement with new chain, guides, and tensioners. Fixed-price rebuilds from £1,900.",
  alternates: { canonical: PATH },
};

export default function BmwDieselTimingChainRepairPage() {
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
