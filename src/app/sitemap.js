import siteRoutes from "@/data/shared/siteRoutes.json";

const SITE_URL = "https://bmwgarage.uk";

// The 3 hand-built reference pages predate the generation manifest and are
// never written into it (migrate_bmw_content.py always skips them), so they
// are listed explicitly here alongside the generated routes.
const REFERENCE_ROUTES = [
  { slug: "bmw-3-series-engines" },
  { slug: "bmw-320d-engines" },
  { slug: "bmw-b58-engine" },
];

export default function sitemap() {
  const staticRoutes = [{ url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 }];

  const generatedRoutes = [...REFERENCE_ROUTES, ...siteRoutes].map(({ slug }) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...generatedRoutes];
}
