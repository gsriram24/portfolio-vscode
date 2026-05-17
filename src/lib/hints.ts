const STORAGE_KEY = "gsriram-hints-seen";

function getSeenHints(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

export function hasSeenHint(id: string): boolean {
  return getSeenHints().includes(id);
}

export function markHintSeen(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const seen = getSeenHints();
    if (!seen.includes(id)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...seen, id]));
    }
  } catch {}
}
