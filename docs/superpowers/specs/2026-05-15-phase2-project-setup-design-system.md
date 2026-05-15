# Phase 2 — Project Setup & Design System

## Goal

Scaffold the Next.js project, configure all tooling, and implement the complete design token system (6 themes, type scale, spacing, motion, fonts). No portfolio pages. No chrome components. Verified via browser devtools — computed CSS vars are correct, fonts load, theme swap works by changing `data-theme` on `<html>`.

## Hard Constraints

- **99+ Lighthouse** — every decision below is evaluated against this
- **`'use client'` only at the interactive boundary** — never higher than necessary. Page content stays Server Components. This rule applies in every future phase.
- **No flash of wrong theme** — inline script in `<head>` sets `data-theme` before first paint

---

## Folder Structure

```
portfolio-vscode/           ← project root
├── src/
│   ├── app/                ← Next.js App Router routes
│   │   ├── layout.tsx      ← root layout: fonts, theme script, html/body
│   │   ├── page.tsx        ← homepage placeholder
│   │   └── globals.css     ← @import for styles
│   ├── components/
│   │   ├── chrome/         ← TitleBar, Sidebar, TabBar, etc. (Phase 3)
│   │   ├── overlays/       ← CommandPalette, ThemeSwitcher (Phase 6)
│   │   ├── pages/          ← ProjectEntry, CompanyEntry, etc. (Phase 6)
│   │   └── ui/             ← shared primitives: Toast, Badge, Chip, CodeLine
│   ├── lib/
│   │   ├── store.ts        ← Zustand chrome store
│   │   ├── fonts.ts        ← next/font/google exports
│   │   └── theme.ts        ← setTheme(), THEMES constant, theme types
│   ├── styles/
│   │   └── globals.css     ← @theme tokens + 6 theme overrides + resets
│   └── data/               ← TypeScript content files (Phase 5)
├── public/
├── next.config.ts
├── tailwind.config.ts      ← minimal, Tailwind v4 reads @theme from CSS
├── tsconfig.json
├── .eslintrc.json
├── .prettierrc
└── pnpm-lock.yaml
```

---

## Tooling Configuration

### TypeScript (`tsconfig.json`)
Strict mode on. Path alias `@/*` → `src/*` so all imports use `@/` prefix.

```json
{
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] },
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "module": "esnext",
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Prettier (`.prettierrc`)
```json
{
  "singleQuote": false,
  "trailingComma": "all",
  "semi": true,
  "tabWidth": 2,
  "printWidth": 100
}
```

### ESLint
Next.js default config (`next/core-web-vitals`) + TypeScript rules. No additional plugins needed.

---

## Design System CSS (`src/styles/globals.css`)

### Two-Tier Token Architecture

Mirrors VSCode's color registry pattern:

- **Tier 1 — Primitive tokens:** Raw hex values from the design. Defined in `@theme` (base Dark+) and overridden per-theme. These are the only tokens that vary per theme.
- **Tier 2 — Derived tokens:** Computed from Tier 1 using CSS `color-mix()`. Defined once in `:root`. Auto-update when any Tier 1 token changes. Adding a new token in future = add one line here, works across all 6 themes for free.

### Tier 1 — Primitives via `@theme` (Dark+ as default)

```css
@import "tailwindcss";

@theme {
  /* ── Surface (Tier 1) ── */
  --color-bg:       #1E1E1E;
  --color-bg-elev:  #252526;
  --color-side:     #252526;
  --color-border:   #2D2D30;
  --color-fg:       #D4D4D4;
  --color-fg-hi:    #FFFFFF;
  --color-dim:      #858585;

  /* ── Accent (Tier 1 — per theme, see overrides) ── */
  --color-accent:   #007ACC;

  /* ── Signal — constant, NEVER in theme overrides ── */
  --color-shipping: #6A9955;
  --color-drift:    #CE9178;
  --color-error:    #F48771;

  /* ── Syntax (Tier 1) ── */
  --color-keyword:  #569CD6;
  --color-string:   #CE9178;
  --color-number:   #B5CEA8;
  --color-func:     #DCDCAA;
  --color-type:     #4EC9B0;
  --color-variable: #9CDCFE;
  --color-comment:  #6A9955;
  --color-attr:     #9CDCFE;

  /* ── Motion (custom — not in Tailwind defaults) ── */
  /* Used directly in CSS: transition: background var(--duration-fast) var(--ease-vscode) */
  --ease-vscode:    cubic-bezier(0.2, 0.7, 0.1, 1);
  --duration-fast:  120ms;
  --duration-med:   200ms;
  --duration-slow:  320ms;

  /* ── Type scale — generates text-display, text-h1 … text-meta utilities ── */
  /* Spacing + radius use Tailwind defaults (p-1=4px, p-4=16px, rounded=4px etc.) */
  --font-size-display: 64px;
  --font-size-h1:      48px;
  --font-size-h2:      32px;
  --font-size-h3:      24px;
  --font-size-lead:    18px;
  --font-size-body:    16px;
  --font-size-code:    13px;
  --font-size-meta:    11px;

  /* ── Fonts (populated by next/font CSS vars) ── */
  --font-ui:    var(--font-ibm-plex-sans), sans-serif;
  --font-code:  var(--font-cascadia-code), monospace;
  --font-prose: var(--font-newsreader), serif;
}

/* Spacing: use Tailwind defaults — p-1=4px p-2=8px p-4=16px p-6=24px p-8=32px p-12=48px p-16=64px */
/* Border radius: use Tailwind defaults — rounded-sm=2px rounded=4px rounded-lg=8px */
```

### Tier 2 — Derived tokens in `:root` (defined once, never overridden)

These compute automatically from Tier 1. Add new derived tokens here — they work across all themes with no extra work.

```css
:root {
  /* ── Derived surface ── */
  /* sidebar hover/selected row — side lightened toward fg-hi */
  --color-side-hi:   color-mix(in srgb, var(--color-side) 83%, var(--color-fg-hi));
  /* very dim chrome elements (close buttons, inactive icons) */
  --color-muted:     color-mix(in srgb, var(--color-side) 80%, var(--color-fg));
  /* activity bar — slightly distinct from sidebar */
  --color-activity:  color-mix(in srgb, var(--color-side) 70%, var(--color-bg-elev));
  /* title bar — slightly elevated above bg-elev */
  --color-title-bar: color-mix(in srgb, var(--color-bg-elev) 60%, var(--color-fg) 40%);

  /* ── Derived syntax ── */
  /* flow control keywords (if/else/for) — blend of keyword + variable */
  --color-control:   color-mix(in srgb, var(--color-keyword) 40%, var(--color-variable));
  /* punctuation — same as body text */
  --color-punct:     var(--color-fg);
  /* jsdoc comments — slightly muted relative to regular comments */
  --color-jsdoc:     color-mix(in srgb, var(--color-comment) 80%, var(--color-dim));

  /* ── Derived interactive ── */
  /* text selection highlight — accent at low opacity */
  --color-selection: color-mix(in srgb, var(--color-accent) 30%, transparent);
  /* git blame inline — very dim background element */
  --color-git-blame: color-mix(in srgb, var(--color-bg) 40%, var(--color-dim));
}
```

> **Note:** Derived values are approximations — they produce visually correct results across all themes and can be fine-tuned during implementation if any specific theme needs adjustment.

### Theme override blocks (Tier 1 only — exactly the tokens from design-system.jsx)

Each block overrides only Tier 1 primitives. Tier 2 derived tokens update automatically.

```css
[data-theme="dark-modern"] {
  --color-bg:       #1F1F1F;
  --color-bg-elev:  #181818;
  --color-side:     #181818;
  --color-border:   #2B2B2B;
  --color-fg:       #CCCCCC;
  --color-fg-hi:    #FFFFFF;
  --color-dim:      #9D9D9D;
  --color-accent:   #0078D4;
  --color-keyword:  #569CD6;
  --color-string:   #CE9178;
  --color-number:   #B5CEA8;
  --color-func:     #DCDCAA;
  --color-type:     #4EC9B0;
  --color-variable: #9CDCFE;
  --color-comment:  #6A9955;
  --color-attr:     #9CDCFE;
}

[data-theme="monokai"] {
  --color-bg:       #272822;
  --color-bg-elev:  #1E1F1C;
  --color-side:     #1E1F1C;
  --color-border:   #3E3D32;
  --color-fg:       #F8F8F2;
  --color-fg-hi:    #FFFFFF;
  --color-dim:      #75715E;
  --color-accent:   #FD971F;
  --color-keyword:  #F92672;
  --color-string:   #E6DB74;
  --color-number:   #AE81FF;
  --color-func:     #A6E22E;
  --color-type:     #66D9EF;
  --color-variable: #FD971F;
  --color-comment:  #75715E;
  --color-attr:     #A6E22E;
}

[data-theme="solarized-dark"] {
  --color-bg:       #002B36;
  --color-bg-elev:  #073642;
  --color-side:     #073642;
  --color-border:   #094350;
  --color-fg:       #839496;
  --color-fg-hi:    #FDF6E3;
  --color-dim:      #586E75;
  --color-accent:   #268BD2;
  --color-keyword:  #859900;
  --color-string:   #2AA198;
  --color-number:   #D33682;
  --color-func:     #268BD2;
  --color-type:     #B58900;
  --color-variable: #CB4B16;
  --color-comment:  #586E75;
  --color-attr:     #268BD2;
}

[data-theme="light-plus"] {
  --color-bg:       #FFFFFF;
  --color-bg-elev:  #F3F3F3;
  --color-side:     #F3F3F3;
  --color-border:   #E5E5E5;
  --color-fg:       #000000;
  --color-fg-hi:    #000000;
  --color-dim:      #616161;
  --color-accent:   #0066B8;
  --color-keyword:  #0000FF;
  --color-string:   #A31515;
  --color-number:   #098658;
  --color-func:     #795E26;
  --color-type:     #267F99;
  --color-variable: #001080;
  --color-comment:  #008000;
  --color-attr:     #001080;
}

[data-theme="solarized-light"] {
  --color-bg:       #FDF6E3;
  --color-bg-elev:  #EEE8D5;
  --color-side:     #EEE8D5;
  --color-border:   #D8D1B7;
  --color-fg:       #657B83;
  --color-fg-hi:    #073642;
  --color-dim:      #93A1A1;
  --color-accent:   #268BD2;
  --color-keyword:  #859900;
  --color-string:   #2AA198;
  --color-number:   #D33682;
  --color-func:     #268BD2;
  --color-type:     #B58900;
  --color-variable: #CB4B16;
  --color-comment:  #93A1A1;
  --color-attr:     #268BD2;
}
```

### Base HTML resets

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html {
  font-family: var(--font-ui);
  background-color: var(--color-bg);
  color: var(--color-fg);
  height: 100%;
}

/* overflow: hidden intentional — chrome manages its own scroll regions */
body { height: 100%; overflow: hidden; }

code, pre, kbd { font-family: var(--font-code); font-size: 13px; }

::selection { background: var(--color-selection); }
```

---

## Fonts (`src/lib/fonts.ts`)

```ts
import { IBM_Plex_Sans, Cascadia_Code, Newsreader } from 'next/font/google'

export const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
})

export const cascadiaCode = Cascadia_Code({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cascadia-code',
  display: 'swap',
})

export const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
})
```

Applied in `app/layout.tsx`:
```tsx
import { ibmPlexSans, cascadiaCode, newsreader } from '@/lib/fonts'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${cascadiaCode.variable} ${newsreader.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html:
          `(function(){var t=localStorage.getItem('gsriram-theme')||'dark-plus';document.documentElement.setAttribute('data-theme',t);})()`
        }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

---

## Theme Helpers (`src/lib/theme.ts`)

```ts
export const THEME_IDS = [
  'dark-plus',
  'dark-modern',
  'monokai',
  'solarized-dark',
  'light-plus',
  'solarized-light',
] as const

export type ThemeId = typeof THEME_IDS[number]

export const THEME_LABELS: Record<ThemeId, string> = {
  'dark-plus':       'Dark+ (Default)',
  'dark-modern':     'Dark Modern',
  'monokai':         'Monokai',
  'solarized-dark':  'Solarized Dark',
  'light-plus':      'Light+ (Default)',
  'solarized-light': 'Solarized Light',
}

const STORAGE_KEY = 'gsriram-theme'

export function setTheme(id: ThemeId): void {
  document.documentElement.setAttribute('data-theme', id)
  localStorage.setItem(STORAGE_KEY, id)
}

export function getTheme(): ThemeId {
  if (typeof window === 'undefined') return 'dark-plus'
  return (localStorage.getItem(STORAGE_KEY) as ThemeId) || 'dark-plus'
}
```

---

## Zustand Store (`src/lib/store.ts`)

Chrome state only. Theme is not in the store — it lives in the DOM and localStorage.

```ts
import { create } from 'zustand'

export type ViewMode = 'source' | 'split' | 'preview'

const PINNED_TABS = [
  'Sriram.tsx',
  'experience/highlevel/schema-markup.tsx',
  'experience/highlevel/ask-ai.tsx',
]

interface ChromeStore {
  tabs: string[]
  viewModes: Record<string, ViewMode>
  openTab: (id: string) => void
  closeTab: (id: string) => void
  setViewMode: (id: string, mode: ViewMode) => void
  getViewMode: (id: string) => ViewMode
}

export const useChromeStore = create<ChromeStore>((set, get) => ({
  tabs: PINNED_TABS,
  viewModes: {},
  openTab: (id) =>
    set((s) => ({ tabs: s.tabs.includes(id) ? s.tabs : [...s.tabs, id] })),
  closeTab: (id) =>
    set((s) => ({ tabs: s.tabs.filter((t) => t !== id) })),
  setViewMode: (id, mode) =>
    set((s) => ({ viewModes: { ...s.viewModes, [id]: mode } })),
  getViewMode: (id) =>
    get().viewModes[id] ?? 'preview',
}))
```

---

## Performance Notes

| Concern | Status |
|---|---|
| Theme override CSS (~8KB) | Negligible — CSS vars are native browser primitives |
| `next/font` self-hosting | Actively improves Lighthouse — eliminates external font latency |
| Inline theme script (~100 bytes) | Effectively 0ms. Required to prevent flash of wrong theme |
| Zustand (~1KB gzipped) | Client-side only, not in critical path |
| `'use client'` boundary | Not applicable in Phase 2 — no components yet. Rule documented for Phase 3+ |

---

## Verification

Phase 2 is complete when:
- `pnpm dev` starts without errors
- Browser devtools → Computed → `--color-bg` shows `#1E1E1E`
- Changing `<html data-theme="monokai">` in devtools → `--color-bg` changes to `#272822`
- All 3 fonts appear in devtools → Network → Font
- No TypeScript errors (`pnpm tsc --noEmit`)
- No ESLint errors (`pnpm lint`)
