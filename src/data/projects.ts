import type { ProjectEntry } from "./types";

// Single source of truth for every project.
//
// type: "work-product"  → built at a company; appears under /experience/<company>/<slug>
//                         hidden from /projects listing.
// type: "client" | "oss" | "personal" → appears on /projects listing at /projects/<slug>.
//
// Content sources (all faithful — no inventions):
//   - portfolio-new/src/data/projects.json    (personal + client)
//   - portfolio-new/src/data/workExperience.json (work-products)
//   - Resume (resume.tex / Resume.pdf)
//   - github.com/gsriram24/FrostCenter README
//
// `meta` is the homepage featured card subtitle (short stat, optional).
// `summary` is the listing/inline subtitle (1-2 sentences).
// `description` is the detail-page prose.
// `highlights` are detail-page bullets.
// `impact` are detail-page stat cards.
//
// Image paths resolve from /public/images/projects/<slug>/.

export const PROJECTS: ProjectEntry[] = [
  // ─── HIGHLEVEL — Work products ──────────────────────────────────────
  {
    slug: "schema-markup",
    title: "Schema Markup",
    type: "work-product",
    company: "highlevel",
    duration: "Dec 2025 – present",
    tags: ["Frontend", "SEO", "AI"],
    featured: true,
    summary:
      "Native SEO product enabling JSON-LD structured data publishing inside Funnels & Websites. AI flow drives ~50% of all schemas at 95%+ success.",
    meta: "34,900+ schemas · AI-driven",
    description:
      "Architected and built HighLevel's Schema Markup product end-to-end — a native SEO tool that enables users to create, validate, and publish structured data (JSON-LD) directly within the Funnels & Websites builder, with an AI flow that auto-populates fields from page content.",
    highlights: [
      "Built the full foundational architecture: form + JSON dual view, field-renderer pattern, JSON-LD transformer, and nested field handling — supporting 140+ schema types across 19 parent categories (LocalBusiness, Product, Article, FAQPage, HowTo, VideoObject, and more).",
      "Authored the HLD and LLD for both the main Schema Markup feature and the Schema Markup Bulk Management system.",
      "Owned two features through the full PRD → Dev → QA cycle as part of the Full Stack Builder initiative: JSON View enhancements and Nested Fields error handling.",
      "AI flow reads page content, identifies the best schema types, and auto-populates fields — reducing schema creation time from 20–30 minutes to under 2 minutes per page.",
      "Published @gsriram24/structured-data-validator as an open source npm package — extended Adobe's structured-data-validator with fieldNames in errors, 6 new schema type validators, and subtype inheritance for 100+ Schema.org types; contributed features upstream via PRs to the Adobe repository.",
    ],
    impact: [
      { value: "34,900+", label: "schemas created" },
      { value: "5,590+", label: "active customers" },
      { value: "95%+", label: "AI success rate" },
    ],
    stack: ["Vue.js", "Nuxt.js", "NestJS", "Node.js", "TypeScript", "LangChain.js", "OpenAI"],
    links: [
      {
        label: "View product ↗",
        href: "https://help.gohighlevel.com/support/solutions/articles/155000007406-how-to-manually-add-schema-markups-in-funnels-websites",
        primary: true,
      },
      {
        label: "npm: structured-data-validator ↗",
        href: "https://www.npmjs.com/package/@gsriram24/structured-data-validator",
      },
    ],
  },

  {
    slug: "ask-ai",
    title: "Page Builder AI Copilot",
    type: "work-product",
    company: "highlevel",
    duration: "Jul 2025 – Dec 2025",
    tags: ["Frontend", "AI", "Fullstack"],
    featured: true,
    summary:
      "Primary frontend contributor on HighLevel's Page Builder AI (Ask AI) — an embedded AI assistant generating funnels, websites, and sections from natural language prompts.",
    meta: "157K funnels · 61K customers",
    description:
      "Primary frontend contributor on HighLevel's Page Builder AI Copilot (\"Ask AI\") — an AI assistant embedded in the Funnels & Websites builder that generates complete funnels, websites, and page sections from natural language prompts, taking users from idea to a live, conversion-ready funnel in under a minute.",
    highlights: [
      "Built and owned the core UI experiences: assist-mode UX, drag-and-drop interactions, image styles, rate-limit modal, restore flow, error recovery, content filtering, and auto-naming.",
      "Worked on the element insertion agent, enabling AI to intelligently insert and configure individual builder elements within existing pages.",
      "The product supports three modes — Assist (guided generation), Build (prompt-to-funnel), and Chat (conversational refinement).",
    ],
    impact: [
      { value: "157K+", label: "funnels generated" },
      { value: "61K+", label: "customers" },
      { value: "3.5x", label: "monthly active growth" },
    ],
    stack: ["Vue.js", "Nuxt.js", "NestJS", "LangChain.js", "OpenAI", "TypeScript"],
    links: [
      {
        label: "View product ↗",
        href: "https://help.gohighlevel.com/support/solutions/articles/155000006713-funnels-websites-ai",
        primary: true,
      },
    ],
  },

  {
    slug: "funnels-core",
    title: "Funnels & Websites Builder — Core",
    type: "work-product",
    company: "highlevel",
    duration: "Dec 2023 – present",
    tags: ["Fullstack"],
    summary:
      "Core builder platform powering HighLevel's Funnels & Websites — usability, performance, and extensibility improvements across the editor surface.",
    description:
      "Long-running contributions to the core Funnels & Websites Builder platform — the editor surface used daily by 100K+ creators. Work spans new elements, design system integration, SEO automation, and platform stability across frontend and backend.",
    highlights: [
      "Integrated a template library for webinars to broaden prebuilt content options.",
      "Revamped the builder's sidebar to improve navigation and editing workflows.",
      "Led the integration of modern design system components across the builder for visual consistency.",
      "Introduced advanced elements like Multi-Popup, Flexbox container, and Block Editor to enhance design flexibility.",
      "Implemented automated SEO enhancements integrated with the new SEO product to improve visibility for published sites.",
      "Regularly resolved support tickets and platform bugs to maintain builder stability at scale.",
    ],
    impact: [
      { value: "100K+", label: "daily active users" },
      { value: "500K+", label: "weekly visitors" },
      { value: "90%+", label: "retention rate" },
    ],
    stack: ["Vue.js", "Nuxt.js", "NestJS", "Node.js", "TypeScript", "Tailwind CSS"],
    links: [
      {
        label: "Visit product page ↗",
        href: "https://www.gohighlevel.com/no-code-website-builder",
        primary: true,
      },
    ],
  },

  {
    slug: "ecommerce",
    title: "Funnels & Websites — Ecommerce",
    type: "work-product",
    company: "highlevel",
    duration: "Dec 2023 – Mar 2025",
    tags: ["Frontend", "Fullstack", "E-commerce"],
    summary:
      "Built HighLevel's Ecommerce suite end-to-end — inventory, shipping, tax, payments, wishlist, search, and account management — for 7K+ live stores.",
    description:
      "Specialised in enhancing the Funnels & Websites builder with advanced Ecommerce functionality — building everything from inventory to checkout for storefronts running on the HighLevel platform.",
    highlights: [
      "Built a robust inventory management system to track stock levels and manage product details.",
      "Integrated multiple shipping carriers and methods for logistical flexibility.",
      "Developed secure payment processing supporting multiple gateways.",
      "Implemented tax integrations to automate calculations and ensure regional compliance.",
      "Built customer engagement features: wishlist, product search, featured products, and full customer account management with login.",
      "Optimised Ecommerce page performance for load times and conversion rates.",
    ],
    impact: [
      { value: "7,000+", label: "live stores" },
      { value: "15,000+", label: "monthly orders" },
    ],
    stack: ["Vue.js", "Nuxt.js", "NestJS", "Node.js", "TypeScript"],
    links: [
      {
        label: "Visit ecommerce docs ↗",
        href: "https://help.gohighlevel.com/support/solutions/articles/155000001157-how-to-set-up-an-e-commerce-online-store-websites-",
        primary: true,
      },
    ],
  },

  // ─── BETSOL — Work products ──────────────────────────────────────────
  {
    slug: "sentinel",
    title: "Sentinel",
    type: "work-product",
    company: "betsol",
    duration: "Aug 2022 – Nov 2023",
    tags: ["Frontend", "SaaS"],
    summary:
      "BETSOL's new SaaS platform for backup subscription management. Owned features end-to-end through R&D, development, and payment compliance.",
    description:
      "Sentinel is BETSOL's SaaS platform for creating, managing, and notifying subscriptions — enabling users to view, back up, and restore data from all their devices in one place. Joined at project inception, contributing across R&D, architecture, and feature ownership.",
    highlights: [
      "Researched, documented, and built POCs for subscription and user management services (Auth0, Keycloak, Zitadel, Chargebee).",
      "Set up the initial codebase: folder structure, Material UI global theme, Sonarqube integration.",
      "Owned end-to-end implementation of multiple features under strict design + code-quality guidelines.",
      "Built payment-related features using hosted gateway components while following PCI guidelines.",
      "Implemented role-based access control and sectioning + routing logic for the entire frontend.",
      "Actively contributed to product design and wireframing sessions.",
    ],
    stack: ["React", "Redux", "Node.js", "Material UI", "Auth0"],
    links: [
      {
        label: "Visit Sentinel ↗",
        href: "https://sentinel.zmanda.com/",
        primary: true,
      },
    ],
  },

  // ─── DHIYO — Work products ───────────────────────────────────────────
  {
    slug: "company-website",
    title: "Dhiyo Company Website",
    type: "work-product",
    company: "dhiyo",
    duration: "Dec 2020 – Mar 2021",
    tags: ["Frontend"],
    summary:
      "Rebuilt Dhiyo.ai's company website from scratch — multilingual job-search platform with city pages, search, job detail, and blog. Serverless captcha + form handling, full deployment with domain setup.",
    description:
      "Designed and built a brand-new website for Dhiyo, a multilingual conversational AI platform connecting blue-collar workers with jobs across India. End-to-end ownership: codebase setup, design implementation, server-side rendering, location-aware job pages, blog system, and production deployment. The company is no longer operating, but the site remains as a snapshot of the work.",
    highlights: [
      "Set up the codebase with required plugins and CSS libraries.",
      "Developed all screens with functionality, faithful to the provided design — home, search, job detail, blog, location-specific pages for 20+ cities.",
      "Implemented serverless functions for captcha and contact-form handling.",
      "Integrated feedback flows and deployed the website with custom domain setup.",
    ],
    images: [
      "/images/projects/company-website/01-home.png",
      "/images/projects/company-website/02-search-jobs.png",
      "/images/projects/company-website/03-job-detail.png",
      "/images/projects/company-website/04-blog.png",
    ],
    stack: ["Gatsby", "React", "Node.js", "Tailwind CSS"],
  },

  {
    slug: "jio-phone-app",
    title: "Dhiyo Jio Phone App",
    type: "work-product",
    company: "dhiyo",
    duration: "Mar 2021",
    tags: ["Frontend", "Mobile"],
    hasDetailPage: false,
    summary:
      "Frontend for a Jio Phone version of Dhiyo's platform — minimal feature set adapted for keypad-phone constraints, tested and shipped to Jio for publishing.",
    description:
      "Built the frontend of a Jio Phone application for Dhiyo, distilling the platform's essence into a minimal feature set suitable for the limited screen size and keypad-only input of a Jio feature phone. Tested on-device and submitted to the Jio team for publishing.",
    stack: ["KaiOS", "JavaScript"],
  },

  {
    slug: "job-fair-platform",
    title: "Dhiyo Job Fair Platform",
    type: "work-product",
    company: "dhiyo",
    duration: "Mar 2021",
    tags: ["Frontend"],
    hasDetailPage: false,
    summary:
      "Web platform for job fair registration + resume submission — designed for offline persistence and low-bandwidth conditions of crowded venues.",
    description:
      "Built the frontend of a Job Fair web platform for Dhiyo, enabling attendees to register and apply to jobs with their resumes during in-person fairs. Designed with offline persistence and network-resilient behaviour to handle the limited connectivity typical of crowded venues.",
    stack: ["React", "JavaScript"],
  },

  // ─── OPEN SOURCE ─────────────────────────────────────────────────────
  {
    slug: "structured-data-validator",
    title: "@gsriram24/structured-data-validator",
    type: "oss",
    duration: "2026",
    tags: ["Open Source", "Backend"],
    summary:
      "Fork of Adobe's Schema.org validator — fieldName-aware errors, 6 new schema type validators, automatic subtype inheritance for 100+ types. Upstream PRs submitted.",
    description:
      "An open-source extension of Adobe's structured-data-validator npm package — improves developer experience around Schema.org validation by surfacing field names in error messages, adding new schema type validators, and inheriting validation rules across the Schema.org type hierarchy. Several features contributed upstream via PRs.",
    highlights: [
      "Added fieldNames in error messages — makes Schema.org validation errors actionable instead of cryptic.",
      "Added 6 new schema type validators on top of Adobe's base set.",
      "Implemented subtype inheritance covering 100+ Schema.org types — child types automatically inherit parent validation rules.",
      "Contributed features upstream via PRs to the Adobe repository.",
    ],
    impact: [
      { value: "179", label: "monthly downloads" },
      { value: "100+", label: "Schema.org types" },
      { value: "1.7.3", label: "current version" },
    ],
    stack: ["JavaScript", "Node.js", "Schema.org"],
    links: [
      {
        label: "View on npm ↗",
        href: "https://www.npmjs.com/package/@gsriram24/structured-data-validator",
        primary: true,
      },
      {
        label: "Adobe upstream ↗",
        href: "https://github.com/adobe/structured-data-validator",
      },
    ],
  },

  {
    slug: "frost-center",
    title: "FrostCenter",
    type: "oss",
    duration: "2026",
    tags: ["Open Source", "Linux", "Python"],
    summary:
      "GTK3 desktop app for MSI laptop fan control on Linux. Real-time temperature graphs, interactive fan curve editor, cooler boost, and battery threshold control. 130+ MSI models auto-detected.",
    description:
      "FrostCenter enables MSI laptop users on Linux to monitor CPU/GPU temperatures and control fan profiles without Windows. Built with Python and GTK3, it communicates directly with the laptop's Embedded Controller through /dev/port using the ACPI EC protocol, supporting 130+ MSI models across 21 configuration groups.",
    highlights: [
      "Live temperature and RPM monitoring with rolling 60-second graphs.",
      "Interactive fan curve editor with four profiles: Auto, Silent, Basic, Advanced.",
      "Battery charge threshold control (50–100%) to extend battery lifespan.",
      "One-click Cooler Boost toggle for maximum fan speeds.",
      "Auto-detects 130+ MSI models from board name.",
      "Read-only monitoring mode for temperature verification on untested hardware.",
    ],
    impact: [
      { value: "58", label: "clones · last 2 weeks" },
      { value: "7", label: "GitHub stars" },
      { value: "130+", label: "MSI models" },
    ],
    stack: ["Python 3.8+", "GTK3", "PyGObject", "Cairo"],
    links: [
      {
        label: "View on GitHub ↗",
        href: "https://github.com/gsriram24/FrostCenter",
        primary: true,
      },
    ],
  },

  // ─── CLIENT ──────────────────────────────────────────────────────────
  {
    slug: "postbox28",
    title: "Company Portfolio · Postbox28",
    type: "client",
    duration: "2022",
    tags: ["Frontend", "Animation"],
    featured: true,
    summary:
      "Graphic-intensive, animation-heavy website for a post-production studio in Mumbai. React + GSAP + Contentful CMS.",
    meta: "React · Tailwind · GSAP · Contentful",
    description:
      "A graphic-intensive, animation-heavy website using React, GSAP, and TailwindCSS for Postbox28, a post-production studio based in Mumbai. Contentful CMS powers their portfolio with YouTube video embeds — every detail considered for an immersive user experience.",
    images: [
      "/images/projects/postbox28/postbox1.png",
      "/images/projects/postbox28/postbox2.png",
      "/images/projects/postbox28/postbox3.png",
      "/images/projects/postbox28/postbox4.png",
      "/images/projects/postbox28/postbox5.png",
    ],
    stack: ["React", "Tailwind CSS", "GSAP", "Contentful"],
    links: [
      {
        label: "View live site ↗",
        href: "https://www.postbox28.com/",
        primary: true,
      },
    ],
  },

  {
    slug: "ppresports",
    title: "League Registration Portal · PPR Esports",
    type: "client",
    duration: "Mar 2021",
    tags: ["Fullstack"],
    summary:
      "Full-stack app for hosting online sim-racing tournaments — Discord auth, admin panel, thousands of user registrations.",
    description:
      "A full-stack application for PPR Esports, a Sim Racing organization, enabling them to host hundreds of online tournaments and onboard thousands of users. Includes an admin panel for managing users and leagues, Discord-based authentication, and MongoDB persistence.",
    images: [
      "/images/projects/ppresports/PPR1.png",
      "/images/projects/ppresports/PPR2.png",
      "/images/projects/ppresports/PPR3.png",
      "/images/projects/ppresports/PPR4.png",
      "/images/projects/ppresports/PPR5.png",
    ],
    impact: [
      { value: "1,000+", label: "users onboarded" },
      { value: "100+", label: "events organised" },
    ],
    testimonial: {
      quote:
        "Working with G. Sriram on this site was a pleasure. We gave him a challenging task, with plenty of live functionality requirements, and the implementation of functions that he was unfamiliar with but learned. The work was done in a timely manner and was professional the whole time.",
      author: "James Warren",
      role: "Owner, PPR Esports",
    },
    stack: ["React", "Redux", "Tailwind CSS", "Node.js", "MongoDB"],
    links: [
      {
        label: "View live site ↗",
        href: "https://ppresports.com/",
        primary: true,
      },
    ],
  },

  {
    slug: "karan-kowshik",
    title: "Portfolio · Karan Kowshik",
    type: "client",
    duration: "May 2024",
    tags: ["Frontend"],
    summary:
      "Gatsby portfolio for a UI/UX designer — dynamic page generation, Framer Motion animations, 95+ Lighthouse across all metrics.",
    description:
      "A highly responsive portfolio website for Karan Kowshik, a UI/UX and Web Designer. Built with Gatsby for dynamic page generation, TailwindCSS for layout, and Framer Motion for animation. Achieved 95+ Lighthouse scores across all metrics, with instant load times.",
    images: [
      "/images/projects/karan-kowshik/karan1.png",
      "/images/projects/karan-kowshik/karan2.png",
      "/images/projects/karan-kowshik/karan3.png",
      "/images/projects/karan-kowshik/karan4.png",
    ],
    impact: [{ value: "95+", label: "Lighthouse score" }],
    testimonial: {
      quote:
        "It was amazing working with Sriram on my portfolio. Being a UI/UX designer I had specific requirements in terms of pixel perfection and smooth complex animations. Sriram took on these challenges brilliantly, delivering exactly what I was looking for.",
      author: "Karan Kowshik",
      role: "UI/UX & Web Designer",
    },
    stack: ["Gatsby", "Tailwind CSS", "Framer Motion"],
    links: [
      {
        label: "View live site ↗",
        href: "https://karankowshik.com",
        primary: true,
      },
    ],
  },

  // ─── PERSONAL ────────────────────────────────────────────────────────
  {
    slug: "attendance-system",
    title: "Automated Attendance via Face Recognition",
    type: "personal",
    duration: "2020",
    tags: ["Deep Learning", "Fullstack"],
    summary:
      "University attendance system — Flask Face Recognition API, Flutter professor app, React + Redux admin panel.",
    description:
      "A digitised attendance system for schools and universities, powered by a Face Recognition REST API built with Flask and the face_recognition library. Includes a Flutter app for professors to record attendance and a React + Redux admin panel for managing students, teachers, and classes. Node.js + MongoDB backend; student photos stored in Firebase Cloud Storage.",
    images: [
      "/images/projects/attendance-system/Attendance1.png",
      "/images/projects/attendance-system/Attendance2.png",
      "/images/projects/attendance-system/Attendance3.png",
    ],
    stack: ["Flutter", "Flask", "React", "Redux", "Node.js", "MongoDB", "Firebase"],
    links: [
      {
        label: "View on GitHub ↗",
        href: "https://github.com/gsriram24/attendance_system_face_recognition_api",
        primary: true,
      },
    ],
  },

  {
    slug: "crowdrepel",
    title: "CrowdRepel",
    type: "personal",
    duration: "2020",
    tags: ["Deep Learning", "Fullstack"],
    summary:
      "Deep Learning + GeoLocation service detecting social distancing violations from CCTV using PyTorch and OpenCV.",
    description:
      "A solution leveraging Deep Learning and GeoLocation technologies to detect social distancing violations in crowded environments. Uses a PyTorch object detection model (IterDet) for crowd density, and Perspective Transformation algorithms to flag violations. The MERN-stack end-user app provides Crowd Density Analytics.",
    images: [
      "/images/projects/crowdrepel/CrowdRepel1.png",
      "/images/projects/crowdrepel/CrowdRepel2.png",
      "/images/projects/crowdrepel/CrowdRepel3.png",
      "/images/projects/crowdrepel/CrowdRepel4.png",
    ],
    stack: ["React", "PyTorch", "OpenCV", "Node.js", "MongoDB", "Leaflet"],
    links: [
      {
        label: "View on GitHub ↗",
        href: "https://github.com/gsriram24/crowd-repel-react",
        primary: true,
      },
    ],
  },

  {
    slug: "seefood",
    title: "SeeFood",
    type: "personal",
    duration: "2020",
    tags: ["Deep Learning", "Mobile"],
    summary:
      "Flutter app powered by TensorFlow Lite — identifies 10 food classes and serves matching recipes, fully offline.",
    description:
      "Inspired by the show Silicon Valley, SeeFood identifies and classifies 10 distinct food types and provides matching recipes. Uses a Mobilenet V2 image classification model trained with TensorFlow and Keras, converted to TensorFlow Lite for offline on-device inference inside a Flutter app.",
    images: [
      "/images/projects/seefood/SeeFood2.png",
      "/images/projects/seefood/SeeFood1.png",
    ],
    stack: ["Flutter", "TensorFlow", "Keras"],
    links: [
      {
        label: "View on GitHub ↗",
        href: "https://github.com/gsriram24/see_food",
        primary: true,
      },
    ],
  },

  {
    slug: "easytravel",
    title: "EasyTravel",
    type: "personal",
    duration: "2020",
    tags: ["Mobile", "Backend"],
    summary:
      "React Native cashless ticketing for public transport — scan QR, select route, pay without cash.",
    description:
      "A mobile application enabling daily commuters to buy bus tickets cashlessly. Users scan a QR code on the bus, select journey details, and generate a ticket charged digitally — removing the friction of cash handling and exact-change problems.",
    images: [
      "/images/projects/easytravel/easytravel1.png",
      "/images/projects/easytravel/easytravel2.png",
    ],
    stack: ["React Native", "Node.js", "MongoDB"],
    links: [
      {
        label: "View on GitHub ↗",
        href: "https://github.com/gsriram24/EasyBMTC",
        primary: true,
      },
    ],
  },

  {
    slug: "hobbyit",
    title: "HobbyIt",
    type: "personal",
    duration: "2020",
    tags: ["Mobile"],
    summary:
      "Mobile social app connecting people with shared interests — Firebase Firestore + Auth backend.",
    description:
      "A React Native app that connects individuals with similar interests, fostering community around shared hobbies. Backed by Firebase Firestore for data, Firebase Auth for identity, and Firebase Cloud Storage for media — enabling users to discover and interact with like-minded people.",
    images: [
      "/images/projects/hobbyit/hobbyit1.png",
      "/images/projects/hobbyit/hobbyit2.png",
      "/images/projects/hobbyit/hobbyit3.png",
      "/images/projects/hobbyit/hobbyit4.png",
    ],
    stack: ["React Native", "Firebase"],
    links: [
      {
        label: "View on GitHub ↗",
        href: "https://github.com/gsriram24/hobbyit",
        primary: true,
      },
    ],
  },

  {
    slug: "substitute-teacher",
    title: "Substitute Teacher Management",
    type: "personal",
    duration: "2020",
    tags: ["Mobile"],
    summary:
      "Flutter app for school admins to locate, select, and notify substitute teachers via email.",
    description:
      "A Flutter mobile application that empowers school administrators to manage teacher absences. The matching algorithm produces a list of qualified substitutes based on configurable criteria; administrators can pick a candidate and notify them via integrated email, keeping the academic calendar running smoothly.",
    images: [
      "/images/projects/substitute-teacher/Substitute1.png",
      "/images/projects/substitute-teacher/Substitute2.png",
    ],
    stack: ["Flutter", "Firebase"],
    links: [
      {
        label: "View on GitHub ↗",
        href: "https://github.com/gsriram24/substitute_teacher_management",
        primary: true,
      },
    ],
  },

  {
    slug: "iclog",
    title: "ICLog",
    type: "personal",
    duration: "2019",
    tags: ["Python"],
    summary:
      "PyQT5 desktop app for managing lab component inventory — student request panel, admin approval panel, MySQL backed.",
    description:
      "A desktop application built with PyQT5 to simplify lab component management. The student panel lets students request components from available stock; the admin panel lets in-charges approve or reject requests, view transaction history, and track pending transactions. All user, component, and transaction data is stored in MySQL.",
    images: [
      "/images/projects/iclog/ICLog3.png",
      "/images/projects/iclog/ICLog2.png",
      "/images/projects/iclog/ICLog1.png",
    ],
    stack: ["Python 3", "PyQT5", "MySQL"],
    links: [
      {
        label: "View on GitHub ↗",
        href: "https://github.com/gsriram24/ic-log",
        primary: true,
      },
    ],
  },
];
