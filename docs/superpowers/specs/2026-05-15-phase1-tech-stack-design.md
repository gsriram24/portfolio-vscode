# Phase 1 — Tech Stack Design: gsriram.dev

## Hard Constraints

- **99+ Lighthouse score** on every page, every deploy. Every decision below is evaluated against this.
- **SSG only** — no SSR, no ISR. Content lives in TypeScript files baked at build time.
- **No tests for now** — TypeScript is the compile-time quality gate. Revisit in a later phase.

---

## Core

| Decision | Choice | Reason |
|---|---|---|
| Framework | Next.js 15 (App Router) | File-based routing matches the IA exactly. SSG-first. Industry standard for React. |
| Language | TypeScript (strict mode) | Compile-time validation of all data files and components. |
| Package manager | pnpm | Faster installs, efficient disk usage. |

### Routing

App Router file structure maps directly to the portfolio IA:

```
app/
├── page.tsx                                    → /
├── experience/[company]/page.tsx               → /experience/highlevel
├── experience/[company]/[project]/page.tsx     → /experience/highlevel/schema-markup
├── projects/page.tsx                           → /projects
├── projects/[slug]/page.tsx                    → /projects/postbox28
├── talks/page.tsx                              → /talks
├── talks/[slug]/page.tsx                       → /talks/react-nexus-2026
├── stack/page.tsx                              → /stack
├── contact/page.tsx                            → /contact
└── api/contact/route.ts                        → POST /api/contact
```

All pages use `generateStaticParams()` to pre-render every slug at build time.

### Shared page templates

Route files are distinct (URLs differ) but the underlying components are shared:

| Route file | Component used |
|---|---|
| `experience/[company]/[project]/page.tsx` | `ProjectEntry` — shared ↓ |
| `projects/[slug]/page.tsx` | `ProjectEntry` — shared ↑ |
| `experience/[company]/page.tsx` | `CompanyEntry` — unique |
| `talks/[slug]/page.tsx` | `TalkEntry` — unique |

`ProjectEntry` renders identically for both company-nested projects and standalone projects. All sections are conditional on data presence — the component doesn't know or care which route it came from.

---

## Styling & Theming

| Decision | Choice |
|---|---|
| CSS framework | Tailwind CSS v4 |
| Theming mechanism | CSS custom properties on `[data-theme="..."]` on `<html>` |
| Theme persistence | `localStorage` — read before first paint, no flash |

### How theming works

Base theme tokens defined via Tailwind v4's `@theme` directive — this simultaneously creates CSS custom properties and generates utility classes (`bg-bg`, `text-accent`, etc.):

```css
@theme {
  --color-bg: #1E1E1E;
  --color-accent: #007ACC;
  /* ... all Dark+ tokens */
}
```

Each of the 6 themes overrides those vars under a data-attribute selector:

```css
[data-theme="monokai"] {
  --color-bg: #272822;
  --color-accent: #FD971F;
}
[data-theme="solarized-dark"] { ... }
[data-theme="light-plus"] { ... }
/* etc. */
```

Theme switch = `document.documentElement.dataset.theme = 'monokai'` + write to `localStorage`. Zero React re-renders. Zero JS on the CSS side.

Signal tokens (`accent`, `shipping`, `drift`, `error`) are constant across all themes and defined only in `@theme` — never overridden per-theme.

---

## Fonts

| Font | Use | Source |
|---|---|---|
| IBM Plex Sans | All preview surfaces, UI | `next/font/google` |
| Cascadia Code | Source views, chrome labels, breadcrumb, status bar | `next/font/google` |
| Newsreader | Writing page (future) | `next/font/google` |

All fonts downloaded at build time and self-hosted by Next.js. Zero external font requests at runtime. Zero layout shift (next/font injects `font-display: swap` and reserves space).

---

## Chrome Architecture

The VSCode chrome (title bar, activity bar, sidebar, tab bar, breadcrumb, status bar) wraps all pages via a single root layout component.

### Layout structure

```
RootLayout (app/layout.tsx)
└── ChromeShell
    ├── TitleBar         (30px, fixed top)
    ├── WorkbenchRow     (flex row, fills remaining height)
    │   ├── ActivityBar  (48px wide)
    │   ├── Sidebar      (240px wide, hidden on tablet/mobile)
    │   └── EditorArea   (flex-grow)
    │       ├── TabBar   (34px)
    │       ├── Breadcrumb (24px)
    │       └── {children} (page content)
    └── StatusBar        (24px, fixed bottom)
```

Sidebar visibility is driven by a CSS class on the root shell (`data-sidebar-hidden`), not inline styles — mirrors VSCode's `nosidebar` class pattern. CSS handles the hide/show, JS only toggles the attribute.

### State management

| State | Mechanism | Why |
|---|---|---|
| Active file / route | `usePathname()` | URL is already the source of truth |
| Open tabs + per-tab view mode | Zustand (~1KB) | Survives navigation, readable from any component, no prop drilling |
| Current theme | `localStorage` + `data-theme` on `<html>` | Zero React state, pure CSS, no re-renders |
| Command palette open/closed | Local `useState` | Transient, component-local |
| Active hint | Local `useState` | Transient, component-local |

### Overlays

All overlays (command palette, theme switcher, mobile bottom sheets) are built from scratch visually but use **Radix UI unstyled primitives** for:
- Portal rendering to `document.body`
- Focus trap (Tab stays inside overlay)
- `Escape` to close
- ARIA attributes (`role="dialog"`, `aria-modal`)

Only individual Radix primitives are imported (tree-shaken). No Radix component library.

### Z-index scale (mirrors VSCode)

```
10   — sidebar, activity bar
20   — tab bar, breadcrumb
50   — status bar
100  — toasts / hints
2000 — command palette, theme switcher
2600 — mobile bottom sheets (backdrop at 2599)
```

---

## Content & Data

All portfolio content lives in TypeScript files in `src/data/`. No CMS. No external API at runtime.

- TypeScript interfaces define the shape of every content model
- Data files are the single source of truth — pages are pure templates
- TypeScript strict mode catches missing or malformed data at compile time
- Updating content = edit file + deploy. Two minutes, no CMS dashboard needed.

---

## Contact Form

- **Frontend**: form in the Contact page preview view
- **API route**: `app/api/contact/route.ts` — validates input, calls Resend API
- **Email provider**: Resend (3,000 free emails/month, modern API)
- **Success**: toast notification — `"Message sent · I'll reply within 48h"`

---

## Deployment

| Decision | Choice |
|---|---|
| Platform | Vercel |
| Deploy trigger | Push to `main` |
| Preview URLs | Automatic per branch/PR |
| Domain | `gsriram.dev` — configured via Vercel DNS |

---

## Tooling

- **ESLint** — Next.js default config + TypeScript rules
- **Prettier** — consistent formatting
- **No test suite** — revisit in a later phase. TypeScript + Lighthouse CI serve as quality gates.

---

## Performance Checklist (99+ Lighthouse)

Every phase is evaluated against these:

- [ ] All images via `next/image` (automatic optimization, lazy load, explicit dimensions)
- [ ] All fonts via `next/font` (self-hosted, no layout shift)
- [ ] SSG for all pages (CDN-edge delivery, best TTFB)
- [ ] No synchronous third-party scripts
- [ ] Tailwind v4 purges unused CSS at build time
- [ ] Radix UI: only import used primitives
- [ ] Zustand: ~1KB, no concern
- [ ] Code-split by route (Next.js does this automatically)
