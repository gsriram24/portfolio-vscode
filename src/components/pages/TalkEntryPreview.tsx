import Image from "next/image";
import { ExternalLink, Play } from "lucide-react";
import type { TalkEntry } from "@/data/types";
import { formatTalkDate } from "@/lib/talks";
import { Breadcrumb } from "./Breadcrumb";

function getSlidesEmbedUrl(url: string): string {
  const gsMatch = url.match(/docs\.google\.com\/presentation\/d\/([^/]+)/);
  if (gsMatch) return `https://docs.google.com/presentation/d/${gsMatch[1]}/embed`;
  return url;
}

function getYouTubeEmbedUrl(url: string): string | null {
  const watchMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  const liveMatch = url.match(/youtube\.com\/live\/([^?]+)/);
  if (liveMatch) {
    const tMatch = url.match(/[?&]t=(\d+)/);
    return `https://www.youtube.com/embed/${liveMatch[1]}${tMatch ? `?start=${tMatch[1]}` : ""}`;
  }
  return null;
}

export function TalkEntryPreview({ talk: t }: { talk: TalkEntry }) {
  const date = formatTalkDate(t);
  const meetup = t.links?.find((l) => l.label.toLowerCase().includes("meetup"));

  const slidesEmbedUrl = t.slidesUrl ? getSlidesEmbedUrl(t.slidesUrl) : null;
  const recordingEmbedUrl = t.recordingUrl ? getYouTubeEmbedUrl(t.recordingUrl) : null;

  return (
    <div className="overflow-auto h-full py-8 px-5 md:px-10 pb-12">
      <div className="max-w-[760px] mx-auto flex flex-col gap-5 md:gap-6">

        {/* Back nav */}
        <Breadcrumb href="/talks" segments={["talks", `${t.slug}.tsx`]} />

        {/* Header */}
        <div className="flex flex-col gap-2.5">
          {/* Event + status badge */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-code text-meta text-type">{t.event}</span>
            <span className="font-code text-meta px-1.75 py-0.5 rounded-xs text-dim bg-muted">
              ✓ past
            </span>
          </div>

          {/* Title */}
          <h1 className="font-ui text-h2 md:text-h1 font-bold text-fg-hi tracking-tight leading-[1.2] m-0">
            {t.title}
          </h1>

          {/* Meta row */}
          <div className="flex gap-4 flex-wrap font-code text-meta text-dim">
            <span>📅 {date}</span>
            <span>📍 {t.location}</span>
          </div>

          {/* Links row */}
          {(meetup || t.slidesUrl || t.recordingUrl) && (
            <div className="flex gap-3 flex-wrap">
              {meetup && (
                <a href={meetup.href} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-code text-meta text-accent no-underline hover:opacity-80 transition-opacity duration-(--duration-fast)">
                  <ExternalLink size={10} strokeWidth={2} aria-hidden /> meetup event
                </a>
              )}
              {t.slidesUrl && (
                <a href={t.slidesUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-code text-meta text-accent no-underline hover:opacity-80 transition-opacity duration-(--duration-fast)">
                  <ExternalLink size={10} strokeWidth={2} aria-hidden /> slides
                </a>
              )}
              {t.recordingUrl && (
                <a href={t.recordingUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-code text-meta text-accent no-underline hover:opacity-80 transition-opacity duration-(--duration-fast)">
                  <Play size={10} strokeWidth={2} fill="currentColor" aria-hidden /> recording
                </a>
              )}
            </div>
          )}
        </div>

        {/* Photo */}
        {t.photo && (
          <div className="w-full rounded-sm overflow-hidden border border-border">
            <Image
              src={t.photo}
              alt={`${t.event} — ${t.title}`}
              width={760}
              height={340}
              className="w-full h-[200px] md:h-[340px] object-cover block"
              unoptimized
            />
          </div>
        )}

        {/* Description */}
        {t.description && (
          <div className="flex flex-col gap-2">
            <div className="font-code text-meta text-accent uppercase tracking-[0.06em]">
              About this talk
            </div>
            <p className="font-ui text-body md:text-lead text-fg leading-[1.7] m-0">
              {t.description}
            </p>
          </div>
        )}

        {/* Slides embed */}
        {slidesEmbedUrl && (
          <div className="flex flex-col gap-2">
            <div className="font-code text-meta text-accent uppercase tracking-[0.06em]">
              Slides
            </div>
            <iframe
              src={slidesEmbedUrl}
              className="w-full aspect-video rounded-sm border border-border"
              allowFullScreen
            />
          </div>
        )}

        {/* Recording embed */}
        {recordingEmbedUrl && (
          <div className="flex flex-col gap-2">
            <div className="font-code text-meta text-accent uppercase tracking-[0.06em]">
              Recording
            </div>
            <iframe
              src={recordingEmbedUrl}
              className="w-full aspect-video rounded-sm border border-border"
              allowFullScreen
            />
          </div>
        )}

      </div>
    </div>
  );
}
