import LegalPage from "@/components/shared/LegalPage";
import JsonLd from "@/components/shared/JsonLd";
import { webPageSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";
import data from "@/data/core/about.json";

const PATH = "/about";

export const metadata = {
  title: "About BMW Garage | Independent BMW Engine Rebuild Specialists",
  description: "Independent BMW engine rebuild specialists based in Billericay, Essex. 15+ years of hands-on industry experience. Honest pricing, 12-month warranty, nationwide service.",
  alternates: { canonical: PATH },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={graphDoc([
          webPageSchema({ name: "About BMW Garage | Independent BMW Engine Rebuild Specialists", description: "Independent BMW engine rebuild specialists based in Billericay, Essex. 15+ years of hands-on industry experience. Honest pricing, 12-month warranty, nationwide service.", path: PATH, type: "AboutPage" }),
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About BMW Garage", path: PATH }], PATH),
        ])}
      />
      <LegalPage data={data} />
    </>
  );
}
