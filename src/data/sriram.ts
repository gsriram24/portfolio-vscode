// SSOT for the homepage (Sriram.tsx).
// Consumed by both SriramSource (renders as code) and SriramPreview (renders as bio card).
// Values cross-referenced from homepages4.jsx SriramTsxBody and Handoff.html HomepagePreview.
export const SRIRAM = {
  author: "G. Sriram",
  since: 2019,
  role: "SDE-III",
  open: "senior · staff IC",
  reach: "hi@gsriram.dev",
  company: "HighLevel",
  companySince: "Dec '23",
  promotedAt: "Jun '25",
  prevCompanies: ["BETSOL", "Dhiyo"],
  location: "Bengaluru",
  stack: ["vue", "nuxt", "nest", "node", "claude"],
  skills: ["Vue", "Nuxt", "React", "Nest", "Node", "TypeScript", "Claude"],
  bio: "Fullstack engineer at GoHighLevel, building large-scale SaaS features across the Funnels & Websites platform — ecommerce, AI-powered page builders, and SEO tooling. Vue · Nuxt · NestJS · Node. I care about ownership and shipping things that actually move the needle.",
  shipping: ["schema-markup", "page-builder-ai-copilot", "funnels-and-websites"],
  featured: [
    { file: "schema-markup.tsx", label: "Schema Markup",   meta: "34,900+ schemas · AI-driven",  badge: "HighLevel", ext: "tsx" },
    { file: "ask-ai.tsx",        label: "Page Builder AI", meta: "157K funnels · 61K customers", badge: "HighLevel", ext: "tsx" },
    { file: "postbox28.tsx",     label: "Postbox28",       meta: "React · GSAP · Contentful",    badge: "Client",    ext: "tsx" },
  ],
  links: {
    email:    "hi@gsriram.dev",
    github:   { label: "github/gsriram24",   url: "https://github.com/gsriram24" },
    linkedin: { label: "linkedin/gsriram24", url: "https://linkedin.com/in/gsriram24" },
    npm:      { label: "npm/@gsriram24",     url: "https://npmjs.com/~gsriram24" },
  },
} as const;
