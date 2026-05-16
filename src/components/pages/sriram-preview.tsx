import Link from "next/link";
import { ArrowRight, ArrowUp } from "lucide-react";
import { type ReactNode } from "react";
import { SRIRAM } from "@/data/sriram";
import { CONTACT } from "@/data/contact";
import { EXPERIENCE } from "@/data/experience";
import { featuredProjects, pathForProject } from "@/lib/projects";
import type { ProjectEntry } from "@/data/types";

const PREV_COMPANIES = EXPERIENCE.filter((c) => c.slug !== "highlevel");

function badgeForCard(p: ProjectEntry): string {
  if (p.type === "work-product" && p.company) {
    return EXPERIENCE.find((c) => c.slug === p.company)?.companyName ?? p.company;
  }
  if (p.type === "client") return "Client";
  if (p.type === "oss") return "Open Source";
  return "";
}

// Homepage social row labels — curated display strings for CONTACT URLs.
// Lives here (not in CONTACT) because labels are a render concern, not data.
const HOMEPAGE_SOCIALS = [
  { label: "github/gsriram24",   url: CONTACT.github },
  { label: "linkedin/gsriram24", url: CONTACT.linkedin },
  { label: "npm/@gsriram24",     url: CONTACT.npm },
];

// Preview view per gsriram.dev Handoff.html:149-270 (HomepagePreview).
// Colors via tokens (text-X / bg-X / border-X compile from --color-X in @theme).
// Font sizes via the responsive type scale (--text-* with sm/md/xl breakpoints).
// A few handoff-specific oddball sizes (9, 10, 10.5, 12, 13.5px) stay arbitrary.
//
// Deviations from handoff (deliberate UX improvements, approved):
// - All social links: default `text-dim`, hover → `text-accent` (handoff has email
//   in accent by default, but blue should signal hover, not rest state).
// - Prev-company chips: clickable, same hover treatment as featured cards
//   (border accent + bg side-hi, transition fast).
// - Featured cards: each link to /projects/{slug}.
// - Outer max-width 1920px, left-aligned (VSCode metaphor — editor content is
//   never centered). Cap only kicks in on 1440p+ ultrawides; 1080p fills natively.
//
// Interaction states (per gsriram.dev Handoff.html:367-419):
// - Featured card: hover → border accent + bg sideHi, transition fast
// - Primary CTA:   hover → opacity 0.85, active → opacity 0.7
// - Ghost CTA:     hover → border dim + color fgHi, transition fast
export function SriramPreview() {
  return (
    <>
      {/* 1. Status badge — pulsing dot + "SHIPPING AT HIGHLEVEL" */}
        <div className="flex items-center gap-2 mb-6 font-code text-[10.5px] text-dim uppercase tracking-[0.12em] whitespace-nowrap">
          <span className="w-1.75 h-1.75 rounded-full inline-block shrink-0 bg-shipping animate-[hl-pulse_2.4s_ease-in-out_infinite]" />
          SHIPPING AT
          <span className="ml-1.25 text-shipping">{SRIRAM.company.toUpperCase()}</span>
        </div>

        {/* 2. Name */}
        <h1 className="font-ui text-display font-bold text-fg-hi m-0 tracking-[-0.03em] leading-none">
          {SRIRAM.author} <span className="text-func">—</span>
        </h1>

        {/* 3. Role sub */}
        <div className="font-ui text-body text-func mt-2.5 tracking-[-0.005em]">
          {SRIRAM.role} · {SRIRAM.company} · {SRIRAM.location}
        </div>

        {/* 4. Bio */}
        <p className="font-ui text-body leading-[1.65] text-fg mt-6 max-w-[64ch]">{SRIRAM.bio}</p>

        {/* 5. Meta list */}
        <div className="mt-6 flex flex-col gap-2 font-ui text-ui text-fg">
          <MetaRow
            text={`${SRIRAM.role} · ${SRIRAM.company} · since ${SRIRAM.companySince}`}
            note={
              <>
                <ArrowUp size={11} strokeWidth={2.25} aria-hidden className="inline-block -mt-px" />
                {` promoted ${SRIRAM.promotedAt}`}
              </>
            }
          />
          <MetaRow text={`Skills: ${SRIRAM.skills.join(" · ")}`} />
          <MetaRow text={`${SRIRAM.location}, IN · open to ${SRIRAM.open}`} />
        </div>

        {/* 6. Featured work */}
        <section className="mt-9">
          <h2 className="font-code text-[10px] text-accent uppercase tracking-[0.08em] mb-3">
            Featured work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {featuredProjects().map((card) => (
              <FeaturedCard key={card.slug} card={card} />
            ))}
          </div>
        </section>

        {/* 7. CTAs + prev companies */}
        <div className="mt-8 flex flex-wrap gap-2.5 items-center">
          <Link
            href="/experience/highlevel"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-sm font-ui font-semibold text-[13.5px] tracking-[-0.01em] cursor-pointer border-0 bg-func text-bg no-underline transition-opacity duration-(--duration-fast) ease-vscode hover:opacity-85 active:opacity-70"
          >
            View more
            <ArrowRight size={14} strokeWidth={2.25} aria-hidden />
          </Link>
          <a
            href={SRIRAM.links.resume}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-sm font-ui text-[13.5px] cursor-pointer bg-transparent text-fg border border-muted no-underline transition-colors duration-(--duration-fast) ease-vscode hover:border-dim hover:text-fg-hi"
          >
            Resume
          </a>
          <div className="ml-auto flex items-center gap-2 font-code text-[10.5px] text-dim">
            prev:
            {PREV_COMPANIES.map((c) => (
              <Link
                key={c.slug}
                href={`/experience/${c.slug}`}
                prefetch={false}
                className="px-2 py-0.75 rounded-[3px] bg-side border border-border transition-colors duration-(--duration-fast) ease-vscode hover:border-accent hover:bg-side-hi"
              >
                {c.companyName}
              </Link>
            ))}
          </div>
        </div>

        {/* 8. Social links — default dim, hover → accent (blue = hover signal, not rest) */}
        <nav className="mt-5 flex gap-5 flex-wrap font-code text-[12px]">
          <a
            href={`mailto:${CONTACT.email}`}
            className="no-underline text-dim transition-colors duration-(--duration-fast) ease-vscode hover:text-accent"
          >
            {CONTACT.email}
          </a>
          {HOMEPAGE_SOCIALS.map((l) => (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              className="no-underline text-dim transition-colors duration-(--duration-fast) ease-vscode hover:text-accent"
            >
              {l.label}
            </a>
          ))}
        </nav>
    </>
  );
}

function MetaRow({ text, note }: { text: string; note?: ReactNode }) {
  return (
    <div className="flex items-baseline gap-2.5">
      <span className="text-[9px] shrink-0 text-type">●</span>
      <span>{text}</span>
      {note && <span className="font-code text-meta text-dim">{note}</span>}
    </div>
  );
}

function FeaturedCard({ card }: { card: ProjectEntry }) {
  // All featured projects are .tsx — color matches the file extension token.
  return (
    <Link
      href={pathForProject(card)}
      prefetch={false}
      className="block p-4 bg-side border border-border rounded-sm transition-colors duration-(--duration-fast) ease-vscode hover:border-accent hover:bg-side-hi"
    >
      <article className="flex flex-col gap-1.75">
        <header className="flex items-center justify-between">
          <span className="font-code text-[10px] text-func">
            ● {card.slug}.tsx
          </span>
          <span className="font-code text-[9px] text-dim bg-muted px-1.5 py-0.5 rounded-xs">
            {badgeForCard(card)}
          </span>
        </header>
        <h3 className="font-ui text-ui font-semibold text-fg-hi m-0">{card.title}</h3>
        <p className="font-code text-[10.5px] text-dim m-0">{card.meta}</p>
      </article>
    </Link>
  );
}
