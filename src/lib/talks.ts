import { TALKS } from "@/data/talks";
import type { TalkEntry } from "@/data/types";

export function isUpcoming(t: TalkEntry): boolean {
  return t.date >= new Date();
}

export function formatTalkDate(t: TalkEntry): string {
  return t.date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function findTalk(slug: string): TalkEntry | undefined {
  return TALKS.find((t) => t.slug === slug);
}

export function pathForTalk(t: TalkEntry): string {
  return `/talks/${t.slug}`;
}

export function getYouTubeEmbedUrl(url: string): string | null {
  const watchMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  const liveMatch = url.match(/youtube\.com\/live\/([^?]+)/);
  if (liveMatch) {
    const tMatch = url.match(/[?&]t=(\d+)/);
    return `https://www.youtube.com/embed/${liveMatch[1]}${tMatch ? `?start=${tMatch[1]}` : ""}`;
  }
  return null;
}
