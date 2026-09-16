import AuthorityPage from "@/components/shared/AuthorityPage";
import JsonLd from "@/components/shared/JsonLd";
import { serviceSchema, faqSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";
import data from "@/data/authority/bmw-n54-fuel-pump-injector-repair.json";

const PATH = "/bmw-n54-fuel-pump-injector-repair";
const FAQ = (data.sections || []).filter((s) => s.kind === "faq").flatMap((s) => s.items || []);

export const metadata = {
  title: "BMW N54 Fuel Pump & Injector Repair | BMW Garage",
  description: "Specialist BMW N54 HPFP & fuel injector repair at our Essex workshop. Coding, adaptation, full system testing. 12mo warranty. Call 0203 488 4649.",
  alternates: { canonical: PATH },
};

export default function BmwN54FuelPumpInjectorRepairPage() {
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
