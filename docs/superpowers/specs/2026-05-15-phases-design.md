# gsriram.dev — Implementation Phases

## Overview

Portfolio site built as a VSCode workspace metaphor. Full design handoff exists
(`gsriram.dev Handoff.html`). This document defines the high-level implementation
phases. Each phase is brainstormed separately to produce its own set of tiny subtasks.

## Constraints

- **Responsiveness is not a phase** — it is a requirement on every phase. Anything
  built in any phase must be responsive across all three breakpoints before the phase
  is considered done. No separate mobile/desktop domains.
- **Breakpoints:** ≥1280px (full) · 768–1279px (tablet) · <768px (mobile)
- **No separate `/design-system` or dev-only pages** — only real portfolio pages ship.
- **Easy debugging and testing over speed** — phases are structured horizontally
  (layer by layer) so each layer is stable and verifiable before the next builds on it.

## Phases

### Phase 1 — Tech Stack Brainstorm
Decide all technical foundations before a single line of code is written.
Output is documented decisions, no implementation.

Decisions to make:
- Framework (Nuxt 3 is the design handoff recommendation)
- Styling approach (Tailwind + CSS custom properties vs pure CSS vars)
- Font loading strategy (Google Fonts vs self-hosted)
- Theming mechanism (CSS vars on `<html data-theme>`)
- File-based routing conventions matching the IA
- Content/data layer (TypeScript data files)
- Contact form backend (Netlify Forms vs Resend API)
- Deployment target and hosting platform

---

### Phase 2 — Project Setup & Design System
Scaffold the project and implement the full design token system.

Covers:
- Project scaffolding with chosen stack
- Tooling configuration (linting, formatting, TS config)
- All 6 theme CSS custom property sets on `<html data-theme>`
- Font loading (IBM Plex Sans · Cascadia Code · Newsreader)
- Spacing scale, border radius, motion tokens
- Type scale
- Signal tokens constant across all themes (accent, shipping, drift, error)

Verified via browser devtools — no dedicated portfolio page needed.

---

### Phase 3 — Chrome Shell
Build the full VSCode editor chrome as isolated, composable components. Placeholder
content only — no real portfolio pages yet.

Covers:
- TitleBar (30px) — traffic lights, active file name, border
- ActivityBar (48px) — Explorer, Search, Settings icons; all functional
- Sidebar (240px) — file tree, folder expand/collapse, active highlight, file dot colors
- TabBar (34px) — open/close tabs, active tab accent border, source/preview toggle widget
- Breadcrumb (24px) — dynamic path segments
- StatusBar (24px) — always `#007ACC`, branch, language mode, theme name, author pill

All chrome responsive:
- Desktop: activity bar + sidebar + editor
- Tablet: activity bar + editor (sidebar hidden)
- Mobile: hint bar + bottom nav (Menu · Search · Settings)

---

### Phase 4 — Routing & Tab Management
Wire up file-based routing to the chrome shell with real navigation state.

Covers:
- Routes matching the full IA (all slugs defined, placeholder page components)
- Tab open/close/switch logic
- Pinned tabs on first load (`Sriram.tsx`, `schema-markup.tsx`, `ask-ai.tsx`)
- Active file state flowing through: sidebar highlight → tab → breadcrumb → title bar
- URL ↔ active file sync (deep-link to any route and chrome reflects it)

Verified by navigating between routes and confirming all chrome state updates correctly
across all breakpoints.

---

### Phase 5 — Data Layer
Define and implement the TypeScript data structures and content files that drive every
page. No UI — this phase is purely about the shape and content of the data.

Covers:
- TypeScript types/interfaces for every content model (Company, Project, Talk, StackCategory, ContactInfo)
- Data files for all experience entries (HighLevel, Betsol, Dhiyo) including roles, stack, projects, awards
- Data files for all projects (featured + archive) including stats, highlights, stack, links, testimonials
- Data files for all talks including status, links, slides, recording
- Data file for stack (5 categories with chips)
- Data file for contact info and availability
- File tree data (sidebar IA) derived from the above — single source of truth

Verified by TypeScript compilation with no errors — no browser needed.

---

### Phase 6 — Page Templates
Build all page template components that read from the data layer and render in both
source view and preview view. Each template is built responsive before moving on.

Templates (not hardcoded content — each reads from data):
- Homepage — source: JSX bio component · preview: name, role, bio, featured work grid, CTAs
- Company Entry — role/promotion timeline, stack chips, inline project links, awards
- Project Entry — impact stats, description, highlights, image carousel, testimonial, stack, links
- Projects Grid — dynamic grid from all project data
- Talks Grid — dynamic grid from all talk data
- Talk Entry — header, photo, description, slides embed, recording embed
- Stack Page — source: typed arrays · preview: 5 category blocks
- Contact Page — source: typed export + async fn · preview: 2-panel links + message form

---

### Phase 7 — Interactive Features
All interaction layers on top of the fully-built chrome and pages.

Covers:
- Command palette (`Ctrl⇧P` / `Ctrl P`) — fuzzy file search, keyboard nav, open file
- Source/preview toggle (`</>` · `⊞` · `◧`) — per-tab state
- Theme switcher (`Ctrl T`) — 6 themes, CSS var swap on `<html>`
- Full keyboard shortcut set (`Ctrl⇧P`, `Ctrl P`, `Ctrl T`, `Esc`, `↑↓`, `↵`)
- Hint system — first-visit toast (localStorage-gated) + contextual per-page hints,
  max 1 visible, auto-dismiss 6–8s, never repeat
- Toast notifications (success, info) — contact form submit, etc.
- Mobile equivalents: bottom sheet for Search (command palette) and Settings (theme)

---

### Phase 8 — Deployment & Launch
Ship the site.

Covers:
- Hosting setup on chosen platform
- Domain configuration for `gsriram.dev`
- Performance pass (font subsetting, image optimization, bundle analysis)
- Meta tags and Open Graph tags for all pages
- Final QA across all 6 themes, all breakpoints, all routes

---

## Phase Brainstorming Order

Each phase above will be brainstormed separately using `/superpowers:brainstorm`
to produce its own set of tiny, actionable subtasks before any implementation begins.
