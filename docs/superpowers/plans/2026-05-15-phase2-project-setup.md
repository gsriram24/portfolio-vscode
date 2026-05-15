# Phase 2 — Project Setup & Design System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold the gsriram.dev Next.js project with complete tooling configuration and implement the full two-tier design token system — 6 VSCode themes, type scale, motion tokens, and 3 self-hosted fonts via next/font.

**Architecture:** Next.js 15 App Router (SSG-first). Design tokens use a two-tier CSS custom property system: Tier 1 primitives defined in `@theme` (one full set per theme), Tier 2 derived tokens computed in `:root` via CSS `color-mix()` (defined once, auto-update when any Tier 1 token changes). No portfolio pages or chrome components in this phase — verification done via browser devtools.

**Tech Stack:** Next.js 15, TypeScript 5 (strict), Tailwind CSS v4, Zustand, pnpm, next/font/google

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/styles/globals.css` | Create | Full design token CSS: Tailwind import, @theme Tier 1, :root Tier 2, 5 theme overrides, resets |
| `src/app/globals.css` | Replace | Single `@import` pointing to styles/globals.css |
| `src/app/layout.tsx` | Replace | Root layout: font class names, inline theme init script, html/body |
| `src/app/page.tsx` | Replace | Homepage placeholder |
| `src/lib/fonts.ts` | Create | next/font/google: ibmPlexSans, cascadiaCode, newsreader |
| `src/lib/theme.ts` | Create | THEME_IDS, ThemeId, THEME_LABELS, setTheme(), getTheme() |
| `src/lib/store.ts` | Create | Zustand ChromeStore: tabs, viewModes, openTab, closeTab, setViewMode, getViewMode |
| `.prettierrc` | Create | Formatting: double quotes, semi on, trailing commas |
| `tsconfig.json` | Verify | Strict mode + @/* → src/* path alias |
| `postcss.config.mjs` | Update | Switch to @tailwindcss/postcss for v4 |

---

### Task 1: Scaffold the Next.js project

**Files:**
- Create: all project files (via create-next-app)

- [ ] **Step 1: Run create-next-app in the portfolio-vscode directory**

```bash
cd "/run/media/sriram/Sriram/Programming/Web Development/portfolio-vscode" && pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
```

Expected: Files created, `pnpm install` runs automatically, ends with "Success! Created ..."

- [ ] **Step 2: Verify TypeScript compiles**

```bash
pnpm tsc --noEmit
```

Expected: No output (exit code 0 = no errors)

- [ ] **Step 3: Commit the scaffold**

```bash
git add -A && git commit -m "chore: scaffold Next.js 15 project"
```

---

### Task 2: Set up Tailwind CSS v4

create-next-app may scaffold Tailwind v3. This task ensures v4 is in place.

**Files:**
- Modify: `postcss.config.mjs`
- Delete: `tailwind.config.ts` (not used in v4 — configuration moves to CSS `@theme`)

- [ ] **Step 1: Install Tailwind v4 packages**

```bash
pnpm add tailwindcss@latest @tailwindcss/postcss@latest
```

Expected: tailwindcss 4.x.x installed

- [ ] **Step 2: Update postcss.config.mjs**

Replace the entire file:

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

- [ ] **Step 3: Remove tailwind.config.ts**

```bash
rm -f tailwind.config.ts && echo "removed (or already absent)"
```

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "chore: upgrade to Tailwind CSS v4"
```

---

### Task 3: Install Zustand

**Files:**
- `package.json` (modified by pnpm add)

- [ ] **Step 1: Install zustand**

```bash
pnpm add zustand
```

Expected: zustand@5.x.x installed (~1 KB gzipped — well within Lighthouse budget)

- [ ] **Step 2: Commit**

```bash
git add package.json pnpm-lock.yaml && git commit -m "chore: add zustand for chrome state"
```

---

### Task 4: Configure Prettier

**Files:**
- Create: `.prettierrc`

- [ ] **Step 1: Create .prettierrc**

```json
{
  "singleQuote": false,
  "trailingComma": "all",
  "semi": true,
  "tabWidth": 2,
  "printWidth": 100
}
```

- [ ] **Step 2: Verify Prettier runs**

```bash
pnpm prettier --check "src/**/*.{ts,tsx,css}" 2>&1 | head -5
```

Expected: Either "All matched files use Prettier code style!" or a list of files needing formatting. Either is fine — just verify the tool runs without crashing.

- [ ] **Step 3: Commit**

```bash
git add .prettierrc && git commit -m "chore: add Prettier config (double quotes, semi on, trailing commas)"
```

---

### Task 5: Verify TypeScript configuration

create-next-app should already configure strict mode and `@/*` alias. Confirm and fix if needed.

**Files:**
- Verify/update: `tsconfig.json`

- [ ] **Step 1: Open tsconfig.json and confirm these keys exist under `compilerOptions`**

- `"strict": true`
- `"paths": { "@/*": ["./src/*"] }`

If either is missing, update the full `compilerOptions` block to:

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

- [ ] **Step 2: Verify TypeScript with strict mode**

```bash
pnpm tsc --noEmit
```

Expected: No output (exit code 0)

- [ ] **Step 3: Commit if tsconfig changed**

```bash
git diff --quiet tsconfig.json || git add tsconfig.json && git commit -m "chore: ensure TypeScript strict mode and @/* alias"
```

---

### Task 6: Create folder structure

**Files:**
- Create directories: `src/components/chrome/`, `src/components/overlays/`, `src/components/pages/`, `src/components/ui/`, `src/styles/`, `src/data/`

- [ ] **Step 1: Create directories with .gitkeep so they're tracked**

```bash
mkdir -p src/components/chrome src/components/overlays src/components/pages src/components/ui src/styles src/data
touch src/components/chrome/.gitkeep src/components/overlays/.gitkeep src/components/pages/.gitkeep src/components/ui/.gitkeep src/data/.gitkeep
```

- [ ] **Step 2: Commit**

```bash
git add src/components src/data src/styles && git commit -m "chore: create component and data directory structure"
```

---

### Task 7: Write the design system CSS

The core of Phase 2. All token values come verbatim from the design-system.jsx handoff.

**Files:**
- Create: `src/styles/globals.css`

- [ ] **Step 1: Create src/styles/globals.css**

```css
@import "tailwindcss";

/* ════════════════════════════════════════════════════════════════
   TIER 1 — Primitive tokens (Dark+ as default)
   These are the only values that differ between themes.
   ════════════════════════════════════════════════════════════════ */
@theme {
  /* ── Surface ── */
  --color-bg:       #1E1E1E;
  --color-bg-elev:  #252526;
  --color-side:     #252526;
  --color-border:   #2D2D30;
  --color-fg:       #D4D4D4;
  --color-fg-hi:    #FFFFFF;
  --color-dim:      #858585;

  /* ── Accent (per-theme — see override blocks below) ── */
  --color-accent:   #007ACC;

  /* ── Signal — constant across ALL themes, NEVER in override blocks ── */
  --color-shipping: #6A9955;
  --color-drift:    #CE9178;
  --color-error:    #F48771;

  /* ── Syntax ── */
  --color-keyword:  #569CD6;
  --color-string:   #CE9178;
  --color-number:   #B5CEA8;
  --color-func:     #DCDCAA;
  --color-type:     #4EC9B0;
  --color-variable: #9CDCFE;
  --color-comment:  #6A9955;
  --color-attr:     #9CDCFE;

  /* ── Motion — used as: transition: background var(--duration-fast) var(--ease-vscode) ── */
  --ease-vscode:    cubic-bezier(0.2, 0.7, 0.1, 1);
  --duration-fast:  120ms;
  --duration-med:   200ms;
  --duration-slow:  320ms;

  /* ── Type scale — generates text-display, text-h1 … text-meta utilities ── */
  --font-size-display: 64px;
  --font-size-h1:      48px;
  --font-size-h2:      32px;
  --font-size-h3:      24px;
  --font-size-lead:    18px;
  --font-size-body:    16px;
  --font-size-code:    13px;
  --font-size-meta:    11px;

  /* ── Fonts (next/font injects these CSS vars onto <html>) ── */
  --font-ui:    var(--font-ibm-plex-sans), sans-serif;
  --font-code:  var(--font-cascadia-code), monospace;
  --font-prose: var(--font-newsreader), serif;
}

/* ════════════════════════════════════════════════════════════════
   TIER 2 — Derived tokens
   Computed from Tier 1 via color-mix(). Defined ONCE here.
   Auto-update when any Tier 1 token changes.
   Never override per-theme — Tier 2 follows Tier 1 automatically.
   Adding a new derived token = one line here, works across all 6 themes.
   ════════════════════════════════════════════════════════════════ */
:root {
  /* ── Derived surface ── */
  --color-side-hi:   color-mix(in srgb, var(--color-side) 83%, var(--color-fg-hi));
  --color-muted:     color-mix(in srgb, var(--color-side) 80%, var(--color-fg));
  --color-activity:  color-mix(in srgb, var(--color-side) 70%, var(--color-bg-elev));
  --color-title-bar: color-mix(in srgb, var(--color-bg-elev) 60%, var(--color-fg) 40%);

  /* ── Derived syntax ── */
  --color-control:   color-mix(in srgb, var(--color-keyword) 40%, var(--color-variable));
  --color-punct:     var(--color-fg);
  --color-jsdoc:     color-mix(in srgb, var(--color-comment) 80%, var(--color-dim));

  /* ── Derived interactive ── */
  --color-selection: color-mix(in srgb, var(--color-accent) 30%, transparent);
  --color-git-blame: color-mix(in srgb, var(--color-bg) 40%, var(--color-dim));
}

/* ════════════════════════════════════════════════════════════════
   THEME OVERRIDES — Tier 1 primitives only
   Tier 2 derived tokens update automatically from these.
   ════════════════════════════════════════════════════════════════ */

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

/* ════════════════════════════════════════════════════════════════
   BASE RESETS
   ════════════════════════════════════════════════════════════════ */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family: var(--font-ui);
  background-color: var(--color-bg);
  color: var(--color-fg);
  height: 100%;
}

/* overflow: hidden intentional — chrome manages its own scroll regions */
body {
  height: 100%;
  overflow: hidden;
}

code,
pre,
kbd {
  font-family: var(--font-code);
  font-size: 13px;
}

::selection {
  background: var(--color-selection);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/globals.css && git commit -m "feat: add two-tier design token system (6 VSCode themes)"
```

---

### Task 8: Wire CSS imports

Replace create-next-app's default globals.css content with a single import.

**Files:**
- Replace: `src/app/globals.css`

- [ ] **Step 1: Replace src/app/globals.css**

Delete all existing content and replace with:

```css
@import "../styles/globals.css";
```

- [ ] **Step 2: Commit**

```bash
git add src/app/globals.css && git commit -m "chore: wire app/globals.css to styles/globals.css"
```

---

### Task 9: Create font helpers

**Files:**
- Create: `src/lib/fonts.ts`

- [ ] **Step 1: Create src/lib/fonts.ts**

```ts
import { IBM_Plex_Sans, Cascadia_Code, Newsreader } from "next/font/google";

export const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

export const cascadiaCode = Cascadia_Code({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cascadia-code",
  display: "swap",
});

export const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});
```

- [ ] **Step 2: Verify TypeScript**

```bash
pnpm tsc --noEmit
```

Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/lib/fonts.ts && git commit -m "feat: add next/font/google config for IBM Plex Sans, Cascadia Code, Newsreader"
```

---

### Task 10: Create theme helpers

**Files:**
- Create: `src/lib/theme.ts`

- [ ] **Step 1: Create src/lib/theme.ts**

```ts
export const THEME_IDS = [
  "dark-plus",
  "dark-modern",
  "monokai",
  "solarized-dark",
  "light-plus",
  "solarized-light",
] as const;

export type ThemeId = (typeof THEME_IDS)[number];

export const THEME_LABELS: Record<ThemeId, string> = {
  "dark-plus": "Dark+ (Default)",
  "dark-modern": "Dark Modern",
  monokai: "Monokai",
  "solarized-dark": "Solarized Dark",
  "light-plus": "Light+ (Default)",
  "solarized-light": "Solarized Light",
};

const STORAGE_KEY = "gsriram-theme";

export function setTheme(id: ThemeId): void {
  document.documentElement.setAttribute("data-theme", id);
  localStorage.setItem(STORAGE_KEY, id);
}

export function getTheme(): ThemeId {
  if (typeof window === "undefined") return "dark-plus";
  return (localStorage.getItem(STORAGE_KEY) as ThemeId) ?? "dark-plus";
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
pnpm tsc --noEmit
```

Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/lib/theme.ts && git commit -m "feat: add theme helpers (THEME_IDS, setTheme, getTheme)"
```

---

### Task 11: Create Zustand store

**Files:**
- Create: `src/lib/store.ts`

- [ ] **Step 1: Create src/lib/store.ts**

```ts
import { create } from "zustand";

export type ViewMode = "source" | "split" | "preview";

const PINNED_TABS = [
  "Sriram.tsx",
  "experience/highlevel/schema-markup.tsx",
  "experience/highlevel/ask-ai.tsx",
];

interface ChromeStore {
  tabs: string[];
  viewModes: Record<string, ViewMode>;
  openTab: (id: string) => void;
  closeTab: (id: string) => void;
  setViewMode: (id: string, mode: ViewMode) => void;
  getViewMode: (id: string) => ViewMode;
}

export const useChromeStore = create<ChromeStore>((set, get) => ({
  tabs: PINNED_TABS,
  viewModes: {},
  openTab: (id) =>
    set((s) => ({ tabs: s.tabs.includes(id) ? s.tabs : [...s.tabs, id] })),
  closeTab: (id) => set((s) => ({ tabs: s.tabs.filter((t) => t !== id) })),
  setViewMode: (id, mode) =>
    set((s) => ({ viewModes: { ...s.viewModes, [id]: mode } })),
  getViewMode: (id) => get().viewModes[id] ?? "preview",
}));
```

- [ ] **Step 2: Verify TypeScript**

```bash
pnpm tsc --noEmit
```

Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/lib/store.ts && git commit -m "feat: add Zustand chrome store (tabs, view modes)"
```

---

### Task 12: Update root layout

Wire fonts and theme init script into the HTML shell. The inline `<script>` runs before first paint to set `data-theme` from localStorage — prevents any flash of wrong theme.

**Files:**
- Replace: `src/app/layout.tsx`

- [ ] **Step 1: Replace src/app/layout.tsx**

```tsx
import type { Metadata } from "next";
import { ibmPlexSans, cascadiaCode, newsreader } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sriram Gopalakrishnan",
  description: "Software Engineer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${cascadiaCode.variable} ${newsreader.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('gsriram-theme')||'dark-plus';document.documentElement.setAttribute('data-theme',t);})()`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
pnpm tsc --noEmit
```

Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx && git commit -m "feat: wire fonts and no-flash theme init into root layout"
```

---

### Task 13: Clean up homepage placeholder

Replace create-next-app's default page content with a minimal placeholder that uses design system tokens (proves the CSS is wired correctly).

**Files:**
- Replace: `src/app/page.tsx`

- [ ] **Step 1: Replace src/app/page.tsx**

```tsx
export default function HomePage() {
  return (
    <main className="flex items-center justify-center h-screen font-code text-meta text-dim">
      gsriram.dev — Phase 2 scaffold complete
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/page.tsx && git commit -m "chore: replace default homepage with phase 2 placeholder"
```

---

### Task 14: Final verification

**Files:** None modified

- [ ] **Step 1: Run ESLint**

```bash
pnpm lint
```

Expected: No errors (warnings are acceptable)

- [ ] **Step 2: Run TypeScript check**

```bash
pnpm tsc --noEmit
```

Expected: No output (exit code 0)

- [ ] **Step 3: Start dev server and open browser**

```bash
pnpm dev
```

Open http://localhost:3000. Expected: Dark background (#1E1E1E), small dimmed text "gsriram.dev — Phase 2 scaffold complete" centered in Cascadia Code font.

- [ ] **Step 4: Verify Tier 1 tokens in devtools**

Open DevTools → Elements → `<html>` selected → Computed → search `--color-bg`.
Expected: `#1e1e1e` (Dark+ default)

- [ ] **Step 5: Verify theme switching (Tier 1 + Tier 2)**

In Elements panel, add attribute `data-theme="monokai"` to `<html>`. Then in Computed tab verify:
- `--color-bg` → `#272822`
- `--color-accent` → `#fd971f`
- `--color-selection` (Tier 2 derived) → some `color-mix(...)` result with the new accent

Then try `data-theme="light-plus"`:
- `--color-bg` → `#ffffff`
- `--color-fg` → `#000000`

Remove the override — back to Dark+ defaults.

- [ ] **Step 6: Verify fonts loaded**

DevTools → Network → filter "Font" → reload page.
Expected: 3+ font files served from `/_next/static/media/` (self-hosted, zero external requests).

- [ ] **Step 7: Verify no flash of wrong theme**

In browser console: `localStorage.setItem('gsriram-theme', 'monokai')`. Hard-reload (Ctrl+Shift+R).
Expected: Page loads with Monokai background immediately — no flash of Dark+ first.

Phase 2 is complete when all 7 verification steps pass.
