// SSOT for the homepage (Sriram.tsx).
// Consumed by SriramSource (code view) and SriramPreview (bio card).
// Values cross-referenced from homepages4.jsx SriramTsxBody and Handoff.html.
//
// Fields removed (now derived):
//   - reach          → CONTACT.email
//   - featured       → featuredProjects() from src/lib/projects.ts
//   - prevCompanies  → EXPERIENCE.filter(c => c.slug !== "highlevel")
//
// links.resume stays here — a CV download is not a contact channel.
export const SRIRAM = {
  author: "G. Sriram",
  since: 2021,
  role: "SDE-III",
  open: "senior IC opportunities",
  company: "HighLevel",
  companySince: "Dec '23",
  promotedAt: "Jun '25",
  location: "Bengaluru",
  stack: ["vue", "nuxt", "nest", "node", "claude"],
  skills: ["Vue", "Nuxt", "React", "Nest", "Node", "TypeScript", "Claude"],
  bio: "Working on HighLevel's Funnels & Websites platform — 100K+ daily users, 500K+ weekly visitors. I tend to take features end-to-end: architected Schema Markup from scratch to 34K+ live schemas, led frontend on Page Builder AI through 157K+ AI-generated funnels, and stood up TDD-first E2E coverage for 19 schema families. I care about ownership and shipping things that actually move the needle.",
  shipping: ["schema-markup", "page-builder-ai-copilot", "funnels-and-websites"],
  links: {
    resume: "https://drive.google.com/file/d/12edOMqi3L_D1poXKup5NYzqL1_DgFxcM/view?usp=drive_link",
  },
} as const;
