import AuthorityPage from "@/components/shared/AuthorityPage";
import JsonLd from "@/components/shared/JsonLd";
import { serviceSchema, faqSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";
import data from "@/data/authority/bmw-hot-vee-v8-repair.json";

const PATH = "/bmw-hot-vee-v8-repair";
const FAQ = (data.sections || []).filter((s) => s.kind === "faq").flatMap((s) => s.items || []);

export const metadata = {
  title: "BMW V8 Hot-Vee Engine Repair (N63/S63) | BMW Garage",
  description: "Specialist BMW hot-vee V8 engine repair for N63 and S63 twin-turbo engines. Rod bearings, turbos, valve seals and cooling system work. Rebuilds start from £4,500.",
  alternates: { canonical: PATH },
};

export default function BmwHotVeeV8RepairPage() {
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
