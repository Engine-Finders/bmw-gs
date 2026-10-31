// src/lib/blog.config.js
/**
 * Site-specific configuration for Headless CMS Blog & Lead Quote integration.
 * Tailored for BMW Garage UK.
 */

export const blogConfig = {
  // 1. Site Identity
  siteName: "BMW Garage UK",
  siteSlug: process.env.CMS_SITE_SLUG || "bmwgarage",
  siteDomain: "bmwgarage.co.uk",
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || "https://bmwgarage.co.uk").replace(/\/$/, ""),
  defaultAuthor: "BMW Master Technician",

  // 2. Headings & UI Copy
  copy: {
    metaTitle: "BMW Garage UK | Guides & Diagnostic Advice",
    metaDescription: "Specialist BMW servicing, repair walkthroughs, diagnostic fault codes, and independent garage guidance.",
    blogTitlePrefix: "BMW Garage UK",
    blogTitleAccent: "Service Guides & Insights",
    blogSubtitle: "Specialist BMW servicing, repair walkthroughs, diagnostic fault codes, and independent garage guidance.",
    emptyTitle: "No guides published yet",
    emptySubtitle: "BMW Garage UK technical articles and diagnostic guides published from the CMS will appear here.",
    readMoreText: "Read Guide",
    widgetTitle: "Instant BMW Service & Repair Quote",
    widgetSubtitle: "Enter your registration for fast pricing from approved BMW garage specialists.",
    widgetSubmitText: "Request Free Quote",
    widgetSuccessTitle: "Quote Request Received!",
    widgetSuccessSubtitle: "Our BMW Garage UK specialists will check stock and contact you shortly with the best pricing.",
    recentGuidesTitle: "Recent Guides",
    relatedGuidesTitle: "Related Guides",
    bottomCta: {
      enabled: true,
      badge: "BMW Garage Network",
      title: "Looking for an Approved BMW Garage?",
      subtitle: "Book professional diagnostics, servicing, or engine repairs with verified UK BMW specialists.",
      buttonText: "Get Free BMW Garage Quote »",
      buttonHref: "#sidebar-reg-input",
    },
  },

  // 3. Theme Colors
  theme: {
    fontFamily: "Arial, Helvetica, sans-serif",
    primaryColor: "#007ff8",
    primaryHover: "#0062c4",
    accentColor: "#007ff8",
    accentHover: "#0062c4",
    widgetBg: "#002244",
    widgetBorder: "#003366",
    widgetButtonBg: "#007ff8",
    widgetButtonHover: "#0062c4",
    ukBadgeBg: "#003399",
    fallbackThumbnail: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80",
  },
};
