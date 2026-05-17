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
