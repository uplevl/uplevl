import { type MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/api/", "/dashboard/", "/_next/", "/admin/", "/private/", "/tmp/", "*.json$", "/search?*"],
      },
      {
        userAgent: "GPTBot",
        disallow: ["/"],
      },
      {
        userAgent: "Google-Extended",
        disallow: ["/"],
      },
    ],
    sitemap: "https://uplevl.ai/sitemap.xml",
    host: "https://uplevl.ai",
  };
}
