// src/app/sitemap.ts
import type { MetadataRoute } from "next";
// Optional later: include project pages
// import { projects } from "../data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://victordigitalmedia.com";
  const now = new Date();

  const urls: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/thanks`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // When you publish /work/[slug] pages, uncomment:
  // for (const p of projects) {
  //   urls.push({
  //     url: `${base}/work/${p.slug}`,
  //     lastModified: now,
  //     changeFrequency: "monthly",
  //     priority: 0.7,
  //   });
  // }

  return urls;
}
