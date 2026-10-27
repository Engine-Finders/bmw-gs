import AuthorityPage from "@/components/shared/AuthorityPage";
import JsonLd from "@/components/shared/JsonLd";
import { serviceSchema, faqSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";
import data from "@/data/authority/bmw-turbo-ancillary-repair.json";

const PATH = "/bmw-turbo-ancillary-repair";
const FAQ = (data.sections || []).filter((s) => s.kind === "faq").flatMap((s) => s.items || []);

export const metadata = {
  title: "BMW Turbo & Ancillary Repair | BMW Garage",
  description: "Expert BMW turbocharger repair and replacement - 4-cyl, 6-cyl, V8, and M-performance engines. Wastegate actuators, oil lines, hot-vee turbo access. Book today.",
  alternates: { canonical: PATH },
};

export default function BmwTurboAncillaryRepairPage() {
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
