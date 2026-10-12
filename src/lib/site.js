// Live domain by default (never localhost, so a missing env var can't leak into canonicals / sitemap / JSON-LD).
// Override per environment with NEXT_PUBLIC_SITE_URL.
// Drives canonical URLs, sitemap, robots and all JSON-LD @id/url values.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://bmwgarage.uk").replace(/\/+$/, "");
