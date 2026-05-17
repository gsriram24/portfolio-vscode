import Fuse from "fuse.js";
import { SEARCH_INDEX, type SearchEntry } from "@/data/search-index";

export const fuse = new Fuse<SearchEntry>(SEARCH_INDEX, {
  keys: ["name", "tags"],
  threshold: 0.4,
  includeScore: true,
});

export type { SearchEntry };
