import Fuse from "fuse.js";
import { SEARCH_INDEX, type SearchEntry } from "@/data/search-index";

export const fuse = new Fuse<SearchEntry>(SEARCH_INDEX, {
  keys: ["name", "tags"],
  threshold: 0.4,
  includeScore: true,
});

export type { SearchEntry };

export function paletteFilter(value: string, search: string, keywords?: string[]): number {
  if (!search) return 1;
  if (keywords?.length) {
    const q = search.toLowerCase();
    return keywords.some((k) => k.toLowerCase().includes(q)) ? 1 : 0;
  }
  const results = fuse.search(search);
  const match = results.find((r) => r.item.path === value || r.item.name === value);
  return match ? 1 - (match.score ?? 0) : 0;
}
