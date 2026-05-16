import type { StackCategory } from "./types";

// /stack page data.
//
// 5 categories per design's stack-skills.jsx STACK shape — Frontend, AI,
// Backend, Languages, Tools. Each has a color used in the heading dot +
// skill chip dots (5 visually-coded sections).
//
// Items pulled from:
//   - Resume (Languages, Frameworks & Libraries, Tools rows)
//   - portfolio-new/src/data/skills.json
//   - Real-world tech surface area
//
// Notes are short descriptors below the category label.

export const STACK: StackCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    note: "production-ready since 2021",
    color: "var(--color-type)",
    items: [
      "Vue 3",
      "Nuxt 3",
      "React",
      "Next.js",
      "Gatsby",
      "Tailwind CSS",
      "GSAP",
      "Framer Motion",
      "Redux",
    ],
  },
  {
    id: "ai",
    label: "AI",
    note: "LLM + AI-assisted dev — used in production",
    color: "var(--color-accent)",
    items: [
      "Claude API",
      "OpenAI API",
      "LangChain.js",
      "Cursor",
      "Claude Code",
    ],
  },
  {
    id: "backend",
    label: "Backend",
    note: "APIs, data, infrastructure",
    color: "var(--color-keyword)",
    items: [
      "NestJS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "GraphQL",
    ],
  },
  {
    id: "languages",
    label: "Languages",
    note: "in order of fluency",
    color: "var(--color-string)",
    items: ["TypeScript", "JavaScript", "Python", "HTML", "CSS", "SQL"],
  },
  {
    id: "tools",
    label: "Tools",
    note: "environment + ecosystem",
    color: "var(--color-comment)",
    items: [
      "Git",
      "Jenkins",
      "GCP",
      "Playwright",
      "Vitest",
      "Grafana",
      "Figma",
      "npm / pnpm",
    ],
  },
];
