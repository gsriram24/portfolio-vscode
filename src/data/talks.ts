import type { TalkEntry } from "./types";

// /talks page data.
//
// 4 talks total — 1 upcoming, 3 past. Ordered upcoming-first, then most-
// recent past.
//
// Sources:
//   - Meetup pages (titles, exact dates, venues)
//   - Talk submissions (titles, abstracts, key takeaways) — provided by user
//   - Slide decks for past talks (slidesUrl field — RevealJS or Google Slides)
//
// Status (upcoming vs past) derives from `date` at render time. Upcoming
// talks intentionally do NOT generate a detail page — listing card covers
// what's known. Past talks have detail pages (per /talks/[slug] route).

export const TALKS: TalkEntry[] = [
  // ─── UPCOMING ────────────────────────────────────────────────────────
  {
    slug: "react-nexus-2026",
    color: "var(--color-func)",
    event: "React Nexus 2026",
    title:
      "Structured Data and Schema Markup for Frontend Developers: SSR, CSR, and the AI Search Era",
    date: new Date("2026-07-02"),
    location: "Bengaluru, IN",
    description:
      "Your beautiful React app might be invisible to Google, and to Perplexity, ChatGPT Search, and every AI search engine that's eating the web's traffic. The reason is a collision between two things frontend developers rarely think about together: structured data and rendering strategy.\n\nThis talk is a practical deep-dive into schema markup for frontend developers. We'll cover what structured data is, why it matters more than ever in the AI search era, and why it silently fails in client-rendered apps. You'll see exactly what crawlers see for SPAs versus SSR versus SSG versus React Server Components, and walk away with concrete patterns that work in production.",
  },

  // ─── PAST ────────────────────────────────────────────────────────────
  {
    slug: "reactplay-april-2026",
    color: "var(--color-type)",
    event: "ReactPlay Bengaluru · April 2026",
    title: "Your Website Isn't SEO-Ready (Until You Add Schema Markup)",
    date: new Date("2026-04-18"),
    location: "Bengaluru, IN",
    photo: "/images/talks/reactplay-april-2026.jpg",
    description:
      "How frontend developers can make their sites SEO-ready by shipping structured data with JSON-LD. We walked through what Google actually sees on your page, why schema is the name tag that introduces your content to crawlers and AI search engines, the highest-ROI schema types (Organization, FAQPage, and the handful that cover 90% of real use cases), common bugs (SPAs, schema drift, duplicate schemas), a validation workflow, and five concrete next steps you can ship the same night.",
    slidesUrl: "https://schema-markup-talk.web.app/",
    links: [
      { label: "Meetup ↗", href: "https://www.meetup.com/reactplay-bengaluru/events/314034551/" },
    ],
  },

  {
    slug: "react-bangalore-84",
    color: "var(--color-string)",
    event: "React Bangalore #84",
    title: "Data Fetching in React — Why use React Query?",
    date: new Date("2024-12-14"),
    location: "Bengaluru, IN",
    photo: "/images/talks/react-bangalore-84.jpg",
    description:
      "A practical introduction to data fetching in React. We started with the obvious \"just use useEffect\" approach, then walked through the pile of complexity it actually buys: race conditions, loading and error states, empty states, manual caching. Then we introduced React Query, which collapses most of that into a single hook — and surveyed its key features: automatic caching, query invalidation, retries, background refetching, pagination + infinite scroll, optimistic updates, polling, prefetching, window-focus refetching, and dependent queries. Live demos compared a manual fetcher to the React Query equivalent, side by side.",
    slidesUrl: "https://react-query-talk.web.app/",
    recordingUrl: "https://www.youtube.com/live/KrkNC9kdJXk?t=4913",
    links: [
      { label: "Meetup ↗", href: "https://www.meetup.com/reactjs-bangalore/events/304826571/" },
    ],
  },

  {
    slug: "react-bangalore-78",
    color: "var(--color-keyword)",
    event: "React Bangalore #78",
    title: "All new React Compiler!",
    date: new Date("2024-06-01"),
    location: "Bengaluru, IN",
    photo: "/images/talks/react-bangalore-78.jpg",
    description:
      "A walkthrough of React's new compiler and how it changes the way components get rendered. We compared component output with and without the compiler across patterns from tiny renders to memoized lists — exploring opt-in vs opt-out reactivity, what the compiler optimises automatically, and what changes (or doesn't) for the code you already write.",
    slidesUrl: "https://docs.google.com/presentation/d/1B2Ac9VONZx1xSHOHkeBu6J4EBug5dQLnyCXMK5id5gc/edit?usp=sharing",
    links: [
      { label: "Meetup ↗", href: "https://www.meetup.com/reactjs-bangalore/events/300882807/" },
    ],
  },
];
