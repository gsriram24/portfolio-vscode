import Link from "next/link";
import { ExternalLink, Play } from "lucide-react";
import { TALKS } from "@/data/talks";
import type { TalkEntry } from "@/data/types";
import { isUpcoming, formatTalkDate, pathForTalk } from "@/lib/talks";

export function TalksGrid() {
  const upcomingCount = TALKS.filter(isUpcoming).length;
  const pastCount = TALKS.length - upcomingCount;

  return (
    <div className="flex flex-col gap-5 md:gap-6">
      {/* Header */}
      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <h1 className="font-ui text-h2 font-bold text-fg-hi m-0 tracking-tight leading-none">
          talks/
        </h1>
        <span className="font-code text-meta text-dim shrink-0">
          {TALKS.length} talks · <span className="text-func">{upcomingCount} upcoming</span> ·{" "}
          {pastCount} past
        </span>
      </div>

      {/* Grid — 1 col mobile, 2 col lg+ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {TALKS.map((t) => (
          <TalkCard key={t.slug} talk={t} />
        ))}
      </div>
    </div>
  );
}

function TalkCard({ talk: t }: { talk: TalkEntry }) {
  const upcoming = isUpcoming(t);
  const date = formatTalkDate(t);

  const meetup = t.links?.find((l) => l.label.toLowerCase().includes("meetup"));

  return (
    <div
      className={`relative flex flex-col gap-2.25 py-4.5 px-5 bg-side rounded-sm overflow-hidden ${
        upcoming
          ? "border border-func/40"
          : "border border-border transition-[border-color,background] duration-(--duration-fast) ease-vscode hover:border-accent hover:bg-side-hi"
      }`}
    >
      {/* Upcoming accent bar */}
      {upcoming && <div className="absolute top-0 left-0 bottom-0 w-0.75 bg-func" />}

      {/* Content — indent if upcoming */}
      <div className={`flex flex-col gap-2.25 ${upcoming ? "pl-2" : ""}`}>
        {/* Slug + status badge */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-code text-meta" style={{ color: t.color }}>
            ● {t.slug}.tsx
          </span>
          <span
            className={`font-code text-meta px-1.75 py-0.5 rounded-xs ml-auto shrink-0 ${
              upcoming ? "text-func bg-func/10 border border-func/25" : "text-dim bg-muted"
            }`}
          >
            {upcoming ? "⏳ upcoming" : "✓ past"}
          </span>
        </div>

        {/* Event name */}
        <div className="font-code text-meta text-dim">{t.event}</div>

        {/* Title */}
        <div className="font-ui text-body font-semibold text-fg-hi leading-[1.35]">{t.title}</div>

        {/* Date + location */}
        <div className="flex gap-3 font-code text-meta text-dim flex-wrap">
          <span>📅 {date}</span>
          <span>📍 {t.location}</span>
        </div>

        {/* Links */}
        <div className="relative z-10 flex gap-3 flex-wrap">
          {meetup && (
            <a
              href={meetup.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-code text-meta text-accent no-underline hover:opacity-80 transition-opacity duration-(--duration-fast) leading-none py-2"
            >
              <ExternalLink size={10} strokeWidth={2} aria-hidden /> meetup
            </a>
          )}
          {t.slidesUrl && (
            <a
              href={t.slidesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-code text-meta text-accent no-underline hover:opacity-80 transition-opacity duration-(--duration-fast) leading-none py-2"
            >
              <ExternalLink size={10} strokeWidth={2} aria-hidden /> slides
            </a>
          )}
          {t.recordingUrl && (
            <a
              href={t.recordingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-code text-meta text-accent no-underline hover:opacity-80 transition-opacity duration-(--duration-fast) leading-none py-2"
            >
              <Play size={10} strokeWidth={2} fill="currentColor" aria-hidden /> recording
            </a>
          )}
          {!meetup && !t.slidesUrl && !t.recordingUrl && (
            <span className="font-code text-meta text-muted">
              {upcoming ? "// links TBA" : "// no recording"}
            </span>
          )}
        </div>
      </div>

      {/* Stretched link — past talks only */}
      {!upcoming && <Link href={pathForTalk(t)} className="absolute inset-0" aria-label={t.title} />}
    </div>
  );
}
