import DirectoryPage from "@/components/shared/DirectoryPage";
import JsonLd from "@/components/shared/JsonLd";
import { webPageSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";
import data from "@/data/core/models.json";

const PATH = "/models";

export const metadata = {
  title: "BMW Models | BMW Garage",
  description: "Engine rebuild and replacement coverage for every BMW model line.",
  alternates: { canonical: PATH },
};

export default function ModelsPage() {
  return (
    <>
      <JsonLd
        data={graphDoc([
          webPageSchema({ name: "BMW Models | BMW Garage", description: "Engine rebuild and replacement coverage for every BMW model line.", path: PATH, type: "CollectionPage" }),
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "BMW Models", path: PATH }], PATH),
        ])}
      />
      <DirectoryPage data={data} />
    </>
  );
}
