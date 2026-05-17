import type { MetadataRoute } from "next";
import { EXPERIENCE } from "@/data/experience";
import { PROJECTS } from "@/data/projects";
import { TALKS } from "@/data/talks";
import { isUpcoming } from "@/lib/talks";
import { listingProjects } from "@/lib/projects";

const BASE = "https://gsriram.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/stack`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/talks`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const experienceRoutes: MetadataRoute.Sitemap = EXPERIENCE.map((c) => ({
    url: `${BASE}/experience/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const workProductRoutes: MetadataRoute.Sitemap = PROJECTS
    .filter((p) => p.type === "work-product" && p.hasDetailPage !== false)
    .map((p) => ({
      url: `${BASE}/experience/${p.company}/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const projectRoutes: MetadataRoute.Sitemap = listingProjects().map((p) => ({
    url: `${BASE}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const talkRoutes: MetadataRoute.Sitemap = TALKS
    .filter((t) => !isUpcoming(t))
    .map((t) => ({
      url: `${BASE}/talks/${t.slug}`,
      lastModified: now,
      changeFrequency: "never",
      priority: 0.6,
    }));

  return [
    ...staticRoutes,
    ...experienceRoutes,
    ...workProductRoutes,
    ...projectRoutes,
    ...talkRoutes,
  ];
}
