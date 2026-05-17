import { PROJECTS } from "./projects";
import { EXPERIENCE } from "./experience";
import { TALKS } from "./talks";
import { SRIRAM } from "./sriram";
import { isUpcoming } from "@/lib/talks";

export interface SearchEntry {
  path: string;   // tab ID — matches keys in src/lib/routes.ts
  name: string;   // display name shown in results
  tags: string[]; // searchable terms
}

export const SEARCH_INDEX: SearchEntry[] = [
  // Home
  {
    path: "Sriram.tsx",
    name: "Sriram",
    tags: ["home", "bio", "about", "portfolio", "engineer", ...SRIRAM.skills],
  },

  // Experience — company index pages
  ...EXPERIENCE.map((co) => ({
    path: `experience/${co.slug}/index.ts`,
    name: co.companyName,
    tags: ["experience", "work", co.slug, co.companyName, ...co.stack],
  })),

  // Experience — work product detail pages
  ...PROJECTS
    .filter((p) => p.type === "work-product" && p.hasDetailPage !== false)
    .map((p) => ({
      path: `experience/${p.company}/${p.slug}.tsx`,
      name: p.title,
      tags: [
        p.slug, p.title, p.company ?? "", "work", "project",
        ...(p.stack ?? []), ...(p.tags ?? []),
      ],
    })),

  // Projects index
  {
    path: "projects/index.ts",
    name: "Projects",
    tags: ["projects", "all", "portfolio", "oss", "open source", "client", "personal"],
  },

  // Projects — individual pages
  ...PROJECTS
    .filter((p) => p.type !== "work-product")
    .map((p) => ({
      path: `projects/${p.slug}.tsx`,
      name: p.title,
      tags: [
        p.slug, p.title, p.type, "project",
        ...(p.stack ?? []), ...(p.tags ?? []),
      ],
    })),

  // Talks index
  {
    path: "talks/index.ts",
    name: "Talks",
    tags: ["talks", "speaking", "conferences", "meetups", "react", "presentations"],
  },

  // Talks — past detail pages only (upcoming have no detail page)
  ...TALKS
    .filter((t) => !isUpcoming(t))
    .map((t) => ({
      path: `talks/${t.slug}.tsx`,
      name: t.title,
      tags: [t.slug, t.event, "talk", "speaking", "react"],
    })),

  // Stack
  {
    path: "stack.ts",
    name: "Stack",
    tags: [
      "stack", "skills", "technologies", "tools",
      "vue", "nuxt", "react", "typescript", "node", "nest", "ai", "claude",
      "frontend", "backend", "languages",
    ],
  },

  // Contact
  {
    path: "contact.ts",
    name: "Contact",
    tags: ["contact", "email", "hire", "message", "reach out", "available", "opportunities"],
  },
];
