const MONTHS: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

/** Parse the start date from a duration string like "Dec 2023 – present" or "Jul 2021 – Nov 2023". */
export function parseDurationStart(duration: string): Date {
  const match = duration.match(/^(\w{3})\s+(\d{4})/);
  if (!match) return new Date();
  return new Date(parseInt(match[2]), MONTHS[match[1]] ?? 0, 1);
}

/** Render a git-blame-style "Sriram · X ago" string from a past date. */
export function timeAgo(date: Date, suffix?: string): string {
  const diffMs = Date.now() - date.getTime();
  if (diffMs < 0) return suffix ? `Sriram · upcoming · ${suffix}` : "Sriram · upcoming";

  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  let rel: string;
  if (diffDays < 1) {
    const h = Math.floor(diffMs / (1000 * 60 * 60));
    rel = h < 1 ? "just now" : `${h}h ago`;
  } else if (diffDays < 14) {
    rel = `${Math.round(diffDays)}d ago`;
  } else if (diffDays < 60) {
    rel = `${Math.round(diffDays / 7)}w ago`;
  } else if (diffDays < 365) {
    rel = `${Math.round(diffDays / 30.5)}mo ago`;
  } else {
    rel = `${Math.floor(diffDays / 365)}y ago`;
  }

  return suffix ? `Sriram · ${rel} · ${suffix}` : `Sriram · ${rel}`;
}
