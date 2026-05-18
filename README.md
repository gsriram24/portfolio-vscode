# gsriram.dev

Personal portfolio built as a VS Code clone — file explorer, tabs, command palette, theme switcher, and all. Live at [www.gsriram.dev](https://www.gsriram.dev).

## Stack

- **Framework** — Next.js 16 (App Router, fully SSG)
- **Styling** — Tailwind CSS v4
- **State** — Zustand v5
- **Search** — cmdk + Fuse.js
- **Email** — Resend
- **Fonts** — Cascadia Code, Geist

## Features

- VS Code chrome — activity bar, sidebar, tabs, breadcrumb, status bar
- Command palette (`Ctrl/⌘ Shift P`) and search (`Ctrl/⌘ K`)
- 6 colour themes including light mode (`Ctrl/⌘ Shift Y`)
- Source / Split / Preview view modes
- Mobile-responsive with bottom nav and sheet overlays
- OG image generation via `next/og` (edge runtime)
- JSON-LD schemas, sitemap, robots.txt

## Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/          # Next.js routes and API
├── components/
│   ├── chrome/   # VS Code shell (tabs, sidebar, status bar)
│   ├── overlays/ # Command palette, theme switcher, hints
│   └── pages/    # Page content components
├── data/         # Content — experience, projects, talks, stack
└── lib/          # Utilities, store, theme, metadata
```

## Content

All content lives in `src/data/` as TypeScript files — no CMS, no database.

## Deploy

Deployed on Vercel. Push to `main` triggers a production deploy.
