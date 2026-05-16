// SSOT for the homepage (Sriram.tsx).
// Consumed by both SriramSource (renders as code) and SriramPreview (renders as bio card).
// Values cross-referenced from homepages4.jsx SriramTsxBody and Handoff.html HomepagePreview.
export const SRIRAM = {
  author: "G. Sriram",
  since: 2021,
  role: "SDE-III",
  open: "senior · staff IC opportunities",
  reach: "gsriram2403@gmail.com",
  company: "HighLevel",
  companySince: "Dec '23",
  promotedAt: "Jun '25",
  prevCompanies: [
    { name: "BETSOL", slug: "betsol" },
    { name: "Dhiyo", slug: "dhiyo" },
  ],
  location: "Bengaluru",
  stack: ["vue", "nuxt", "nest", "node", "claude"],
  skills: ["Vue", "Nuxt", "React", "Nest", "Node", "TypeScript", "Claude"],
  bio: "Working on HighLevel's Funnels & Websites platform — 100K+ daily users, 500K+ weekly visitors. I tend to take features end-to-end: architected Schema Markup from scratch to 34K+ live schemas, led frontend on Page Builder AI through 157K+ AI-generated funnels, and stood up TDD-first E2E coverage for 19 schema families. I care about ownership and shipping things that actually move the needle.",
  shipping: ["schema-markup", "page-builder-ai-copilot", "funnels-and-websites"],
  featured: [
    { slug: "schema-markup", file: "schema-markup.tsx", label: "Schema Markup",   meta: "34,900+ schemas · AI-driven",          badge: "HighLevel", ext: "tsx" },
    { slug: "ask-ai",        file: "ask-ai.tsx",        label: "Page Builder AI", meta: "157K funnels · 61K customers",         badge: "HighLevel", ext: "tsx" },
    { slug: "postbox28",     file: "postbox28.tsx",     label: "Postbox28",       meta: "React · Tailwind · GSAP · Contentful", badge: "Client",    ext: "tsx" },
  ],
  links: {
    email:    "gsriram2403@gmail.com",
    resume:   "https://drive.google.com/file/d/12edOMqi3L_D1poXKup5NYzqL1_DgFxcM/view?usp=drive_link",
    github:   { label: "github/gsriram24",   url: "https://github.com/gsriram24" },
    linkedin: { label: "linkedin/gsriram24", url: "https://linkedin.com/in/gsriram24" },
    npm:      { label: "npm/@gsriram24",     url: "https://npmjs.com/~gsriram24" },
  },
} as const;
