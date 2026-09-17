import type { MetadataRoute } from "next";

import { site } from "@/data/site";
import { caseStudies } from "@/data/work";
import { posts } from "@/data/writing";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: site.url, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/work`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...caseStudies.map((c) => ({
      url: `${site.url}/work/${c.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    { url: `${site.url}/writing`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    ...posts.map((p) => ({
      url: `${site.url}/writing/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
