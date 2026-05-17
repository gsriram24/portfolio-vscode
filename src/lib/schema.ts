// src/lib/schema.ts
import { SITE_URL } from "./metadata";

export const personSchema = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "G Sriram",
  alternateName: "gsriram24",
  url: SITE_URL,
  jobTitle: "Software Development Engineer III",
  description:
    "SDE-III at HighLevel. Building large-scale SaaS products, AI-powered features, and SEO tooling on the Funnels & Websites platform.",
  image: `${SITE_URL}/sriram-og.jpg`,
  worksFor: {
    "@type": "Organization",
    "@id": "https://www.gohighlevel.com/#organization",
    name: "HighLevel",
    url: "https://www.gohighlevel.com",
  },
  alumniOf: [
    { "@type": "Organization", name: "BETSOL", url: "https://www.betsol.com" },
    { "@type": "Organization", name: "Dhiyo" },
  ],
  knowsAbout: [
    "Vue.js", "Nuxt.js", "React", "Next.js", "Node.js", "NestJS",
    "TypeScript", "SaaS", "Schema Markup", "AI-assisted development",
    "LangChain", "OpenAI", "Playwright", "Vitest", "Tailwind CSS",
  ],
  sameAs: [
    "https://github.com/gsriram24",
    "https://linkedin.com/in/gsriram24",
    "https://npmjs.com/~gsriram24",
  ],
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "G Sriram | Software Engineer",
  publisher: { "@id": `${SITE_URL}/#person` },
  inLanguage: "en-US",
};

export function jsonLd(...graphs: object[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [personSchema, websiteSchema, ...graphs],
  });
}

export function breadcrumbs(
  items: { name: string; path: string }[]
): object {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        item: `${SITE_URL}${item.path}`,
      })),
    ],
  };
}
