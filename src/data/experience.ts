import type { Company } from "./types";

// Single source of truth for company / experience entries.
//
// Each Company holds projectSlugs[] — references into PROJECTS where
// type === "work-product" && company === this.slug. The CompanyEntry
// page renders inline project blocks by looking up each slug.
//
// Sources:
//   - portfolio-new/src/data/workExperience.json
//   - Resume (resume.tex / Resume.pdf)
//
// Role descriptions are compressed from portfolio-new — kept tight to
// match the design's COMPANY_DATA example (~40-60 words per role).

export const EXPERIENCE: Company[] = [
  // ─── HIGHLEVEL ───────────────────────────────────────────────────────
  {
    slug: "highlevel",
    companyName: "HighLevel",
    duration: "Dec 2023 – present",
    description:
      "At HighLevel (all-in-one marketing CRM), I have contributed across the full breadth of the Funnels & Websites platform — from building the Ecommerce suite end-to-end, to architecting Schema Markup, to leading frontend on the Page Builder AI Copilot. Work spans product architecture, full-stack feature development, testing infrastructure, release management, and mentorship.",
    roles: [
      {
        title: "Software Development Engineer III",
        duration: "Jun 2025 – present",
        promoted: true,
        description:
          "Broader ownership across the Funnels & Websites platform. Architected Schema Markup end-to-end, primary frontend contributor on the Page Builder AI Copilot (Ask AI). Established the unit-testing framework, designed a TDD-first registry-driven E2E suite covering 19 schema families and 167 types. Owned Jenkins release deployments across beta and production. Mentored new joiners, delivered cross-stack knowledge transfers, and participated in the interview loop. Leveraged Cursor + Claude as force multipliers across cross-repo scope.",
      },
      {
        title: "Software Development Engineer II",
        duration: "Dec 2023 – Jun 2025",
        description:
          "Built the Ecommerce suite end-to-end — inventory, shipping, tax, payments, wishlist, product search, featured products, account management. In parallel, improved Funnels core: design system integration, SEO automation, sidebar revamp, and new elements (Multi-Popup, Flexbox container, Block Editor).",
      },
    ],
    stack: [
      "Vue.js",
      "Nuxt.js",
      "NestJS",
      "Node.js",
      "TypeScript",
      "Tailwind CSS",
      "LangChain.js",
      "OpenAI",
      "Playwright",
      "Vitest",
      "GCP",
      "Jenkins",
      "Cursor",
      "Claude",
    ],
    projectSlugs: ["schema-markup", "ask-ai", "funnels-core", "ecommerce"],
  },

  // ─── BETSOL ──────────────────────────────────────────────────────────
  {
    slug: "betsol",
    companyName: "BETSOL",
    duration: "Jul 2021 – Nov 2023",
    description:
      "At BETSOL — a data management and intelligent automation company — I worked on Sentinel, a brand-new SaaS platform for subscription management. Joined at inception, contributing across R&D (subscription + auth services), architecture, and feature ownership as a frontend developer.",
    roles: [
      {
        title: "Software Engineer",
        duration: "Jan 2023 – Nov 2023",
        promoted: true,
        description:
          "Owned features end-to-end on Sentinel — liaised with UI/UX, made design decisions, mentored junior engineers. Played a key role in PI planning and sprint grooming, breaking feature requirements into user stories and delegating tasks across the team.",
      },
      {
        title: "Associate Software Engineer",
        duration: "Jul 2021 – Jan 2023",
        description:
          "Built critical features during Sentinel's initial phase as a frontend developer. Researched, documented, and built POCs for subscription and user management services (Auth0, Keycloak, Zitadel, Chargebee).",
      },
    ],
    stack: ["React", "Redux", "Node.js", "Material UI", "Auth0", "Agile / SAFe"],
    projectSlugs: ["sentinel"],
    awards: [
      {
        title: "Above and Beyond Award",
        date: "Oct 2023",
        description:
          "Recognised for ownership across multiple Sentinel features and modules, R&D, codebase performance improvements, and mentoring of junior engineers.",
      },
      {
        title: "Best Training Award — React",
        date: "Nov 2022",
        description:
          "Nominated by the 2022 campus batch as the best training session across all subjects.",
      },
      {
        title: "Team Excellence — Campus Recruitment",
        date: "Jul 2022",
        description:
          "Part of the campus interview panel team that interviewed 10,000+ students from 160 colleges across India.",
      },
      {
        title: "Team Excellence — Sentinel",
        date: "Apr 2022",
        description:
          "Awarded to the Sentinel team for building the initial version of the SaaS platform with multiple features in a short period.",
      },
      {
        title: "Spot Award",
        date: "Feb 2022",
        description:
          "Recognised for efforts in researching new frameworks and services and building POCs during the R&D phase of Sentinel.",
      },
    ],
    responsibilities: [
      {
        title: "Campus Training — JavaScript & React",
        duration: "Jul 2022",
        description:
          "One of the trainers for the 2022 campus batch's JavaScript and React training. Finalised the syllabus, developed slides and content, designed projects and assignments, framed quiz questions. 3-day sessions with 3 code-along projects + 1 final assignment.",
      },
      {
        title: "Internship Mentoring",
        duration: "Jul 2022 – Nov 2023",
        description:
          "Mentored multiple intern batches on an in-house HR onboarding product. Assigned tasks, taught and mentored, took technical decisions based on R&D, and continuously evaluated interns on performance.",
      },
    ],
  },

  // ─── DHIYO ───────────────────────────────────────────────────────────
  {
    slug: "dhiyo",
    companyName: "Dhiyo",
    duration: "Dec 2020 – Mar 2021",
    description:
      "Interned at Dhiyo.ai — a multilingual conversational AI platform connecting blue-collar workers with jobs. Owned the rebuild of Dhiyo's company website end-to-end, and built side projects including a Jio Phone version of the platform and a job fair web platform.",
    roles: [
      {
        title: "Software Engineer Intern",
        duration: "Dec 2020 – Mar 2021",
        description:
          "Worked on overhauling Dhiyo's company website with the latest tooling, plus side projects: a Jio Phone app and a job fair platform. End-to-end ownership of frontend development across all three.",
      },
    ],
    stack: ["React", "Gatsby", "Node.js", "Material UI", "Tailwind CSS"],
    projectSlugs: ["company-website", "jio-phone-app", "job-fair-platform"],
  },
];
