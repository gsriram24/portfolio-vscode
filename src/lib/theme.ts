export const THEME_IDS = [
  "dark-plus",
  "dark-modern",
  "monokai",
  "solarized-dark",
  "light-plus",
  "solarized-light",
] as const;

export type ThemeId = (typeof THEME_IDS)[number];

export const THEME_LABELS: Record<ThemeId, string> = {
  "dark-plus": "Dark+ (Default)",
  "dark-modern": "Dark Modern",
  monokai: "Monokai",
  "solarized-dark": "Solarized Dark",
  "light-plus": "Light+ (Default)",
  "solarized-light": "Solarized Light",
};

const STORAGE_KEY = "gsriram-theme";

export function setTheme(id: ThemeId): void {
  document.documentElement.setAttribute("data-theme", id);
  localStorage.setItem(STORAGE_KEY, id);
}

export function getTheme(): ThemeId {
  if (typeof window === "undefined") return "dark-plus";
  return (localStorage.getItem(STORAGE_KEY) as ThemeId) ?? "dark-plus";
}
