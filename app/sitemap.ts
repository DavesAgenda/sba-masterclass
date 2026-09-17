import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-config";
import { informationPages } from "@/content/information";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    ...informationPages.map((page) => ({
      url: siteUrl + "/" + page.slug,
      changeFrequency: "monthly" as const,
      priority: page.slug === "agents" ? 0.3 : 0.7,
    })),
  ];
}
