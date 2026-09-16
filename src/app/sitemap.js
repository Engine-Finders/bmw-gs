import siteRoutes from "@/data/shared/siteRoutes.json";
import { SITE_URL } from "./layout";

// The 3 hand-built reference pages predate the generation manifest and are
// never written into it (migrate_bmw_content.py always skips them), so they
// are listed explicitly here alongside the generated routes.
const REFERENCE_ROUTES = [
  { type: "model", slug: "bmw-3-series-engines" },
  { type: "variant", slug: "bmw-320d-engines" },
  { type: "engine", slug: "bmw-b58-engine" },
];

const PRIORITY = { model: 0.8, engine: 0.8, variant: 0.6, authority: 0.7, core: 0.4, directory: 0.5 };

export default function sitemap() {
  const now = new Date();
  const home = [{ url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 }];

  const generated = [...REFERENCE_ROUTES, ...siteRoutes].map(({ slug, type }) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: now,
    changeFrequency: type === "core" ? "yearly" : "monthly",
    priority: PRIORITY[type] ?? 0.6,
  }));

  return [...home, ...generated];
}
