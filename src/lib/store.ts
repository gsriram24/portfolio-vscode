import { create } from "zustand";
import { type ThemeId } from "./theme";

export type ViewMode = "source" | "split" | "preview";
export type PanelId = "explorer" | "search" | "settings";
export type OverlayId = "palette-commands" | "palette-search" | "theme" | "shortcuts";
export type MobileSheetId = "search" | "settings";

const PINNED_TABS = [
  "Sriram.tsx",
  "experience/highlevel/schema-markup.tsx",
  "experience/highlevel/ask-ai.tsx",
];

interface ChromeStore {
  tabs: string[];
  recentTabs: string[];
  viewMode: ViewMode;
  activePanel: PanelId | null;
  activeTab: string;
  collapsedFolders: ReadonlySet<string>;
  navOpen: boolean;
  overlay: OverlayId | null;
  mobileSheet: MobileSheetId | null;
  activeTheme: ThemeId;
  openTab: (id: string) => void;
  closeTab: (id: string) => void;
  setViewMode: (mode: ViewMode) => void;
  setActivePanel: (panel: PanelId | null) => void;
  setActiveTab: (id: string) => void;
  toggleFolder: (path: string) => void;
  setNavOpen: (v: boolean) => void;
  setOverlay: (id: OverlayId | null) => void;
  setMobileSheet: (id: MobileSheetId | null) => void;
  setActiveTheme: (id: ThemeId) => void;
}

function ancestorsOf(filePath: string): string[] {
  const parts = filePath.split("/");
  const out: string[] = [];
  for (let i = 1; i < parts.length; i++) out.push(parts.slice(0, i).join("/"));
  return out;
}

export const useChromeStore = create<ChromeStore>((set) => ({
  tabs: PINNED_TABS,
  recentTabs: [PINNED_TABS[0]],
  viewMode: "preview",
  activePanel: "explorer",
  activeTab: PINNED_TABS[0],
  collapsedFolders: new Set(),
  navOpen: false,
  overlay: null,
  mobileSheet: null,
  activeTheme: "dark-plus",
  openTab: (id) =>
    set((s) => ({ tabs: s.tabs.includes(id) ? s.tabs : [...s.tabs, id] })),
  closeTab: (id) =>
    set((s) => {
      const nextTabs = s.tabs.filter((t) => t !== id);
      const nextRecent = s.recentTabs.filter((t) => t !== id);
      const nextActive =
        s.activeTab === id
          ? (nextRecent[nextRecent.length - 1] ?? nextTabs[0] ?? "")
          : s.activeTab;
      return { tabs: nextTabs, recentTabs: nextRecent, activeTab: nextActive };
    }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setActivePanel: (panel) => set({ activePanel: panel }),
  setActiveTab: (id) =>
    set((s) => {
      const ancestors = ancestorsOf(id);
      const needsExpand = ancestors.some((a) => s.collapsedFolders.has(a));
      const nextRecent = [...s.recentTabs.filter((t) => t !== id), id];
      const patch: Partial<ChromeStore> = { activeTab: id, recentTabs: nextRecent };
      if (s.navOpen) patch.navOpen = false;
      if (needsExpand) {
        const next = new Set(s.collapsedFolders);
        ancestors.forEach((a) => next.delete(a));
        patch.collapsedFolders = next;
      }
      return patch;
    }),
  toggleFolder: (path) =>
    set((s) => {
      const next = new Set(s.collapsedFolders);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return { collapsedFolders: next };
    }),
  setNavOpen: (v) => set({ navOpen: v }),
  setOverlay: (id) => set({ overlay: id }),
  setMobileSheet: (id) => set({ mobileSheet: id }),
  setActiveTheme: (id) => set({ activeTheme: id }),
}));
