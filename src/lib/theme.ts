export const THEME_IDS = [
  "dark-plus",
  "tomorrow",
  "monokai",
  "solarized-dark",
  "light-plus",
  "solarized-light",
] as const;

export type ThemeId = (typeof THEME_IDS)[number];

export const THEME_LABELS: Record<ThemeId, string> = {
  "dark-plus": "Dark+ (Default)",
  "tomorrow": "Tomorrow Night Blue",
  monokai: "Monokai",
  "solarized-dark": "Solarized Dark",
  "light-plus": "Light+ (Default)",
  "solarized-light": "Solarized Light",
};

const STORAGE_KEY = "gsriram-theme";

export function setTheme(id: ThemeId): void {
  document.documentElement.setAttribute("data-theme", id);
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {}
}

// Swatch order: bg · bgElev · keyword · func · type · string · comment · accent
// Colors sourced directly from src/styles/globals.css theme blocks.
export const THEME_SWATCHES: Record<ThemeId, string[]> = {
  "dark-plus":       ["#1E1E1E","#252526","#569CD6","#DCDCAA","#4EC9B0","#CE9178","#6A9955","#007ACC"],
  tomorrow:          ["#002451","#00346E","#EBBBFF","#BBDAFF","#FFEEAD","#D1F1A9","#7285B7","#007ACC"],
  monokai:           ["#272822","#1E1F1C","#F92672","#A6E22E","#66D9EF","#E6DB74","#75715E","#FD971F"],
  "solarized-dark":  ["#002B36","#073642","#859900","#268BD2","#B58900","#2AA198","#586E75","#268BD2"],
  "light-plus":      ["#FFFFFF","#F3F3F3","#0000FF","#795E26","#267F99","#A31515","#008000","#0066B8"],
  "solarized-light": ["#FDF6E3","#EEE8D5","#859900","#268BD2","#B58900","#2AA198","#93A1A1","#268BD2"],
};

export const THEME_CATEGORIES: Record<ThemeId, "dark" | "light"> = {
  "dark-plus":       "dark",
  tomorrow:          "dark",
  monokai:           "dark",
  "solarized-dark":  "dark",
  "light-plus":      "light",
  "solarized-light": "light",
};

export function getTheme(): ThemeId {
  if (typeof window === "undefined") return "dark-plus";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return (THEME_IDS as readonly string[]).includes(stored ?? "")
      ? (stored as ThemeId)
      : "dark-plus";
  } catch {
    return "dark-plus";
  }
}
