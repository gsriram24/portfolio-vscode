import { create } from "zustand";

export type ViewMode = "source" | "split" | "preview";
export type PanelId = "explorer" | "search" | "settings";

const PINNED_TABS = ["Sriram.tsx"];

interface ChromeStore {
  tabs: string[];
  viewModes: Record<string, ViewMode>;
  activePanel: PanelId | null;
  activeTab: string;
  collapsedFolders: ReadonlySet<string>;
  openTab: (id: string) => void;
  closeTab: (id: string) => void;
  setViewMode: (id: string, mode: ViewMode) => void;
  getViewMode: (id: string) => ViewMode;
  setActivePanel: (panel: PanelId | null) => void;
  setActiveTab: (id: string) => void;
  toggleFolder: (path: string) => void;
}

// Returns the set of ancestor folder paths for a file path.
// e.g. "experience/highlevel/index.ts" → ["experience", "experience/highlevel"]
function ancestorsOf(filePath: string): string[] {
  const parts = filePath.split("/");
  const out: string[] = [];
  for (let i = 1; i < parts.length; i++) out.push(parts.slice(0, i).join("/"));
  return out;
}

export const useChromeStore = create<ChromeStore>((set, get) => ({
  tabs: PINNED_TABS,
  viewModes: {},
  activePanel: "explorer",
  activeTab: PINNED_TABS[0],
  collapsedFolders: new Set(),
  openTab: (id) =>
    set((s) => ({ tabs: s.tabs.includes(id) ? s.tabs : [...s.tabs, id] })),
  closeTab: (id) =>
    set((s) => {
      const nextTabs = s.tabs.filter((t) => t !== id);
      return {
        tabs: nextTabs,
        activeTab:
          s.activeTab === id
            ? (nextTabs.find((t) => t !== id) ?? nextTabs[0] ?? "")
            : s.activeTab,
      };
    }),
  setViewMode: (id, mode) =>
    set((s) => ({ viewModes: { ...s.viewModes, [id]: mode } })),
  getViewMode: (id) => get().viewModes[id] ?? "preview",
  setActivePanel: (panel) => set({ activePanel: panel }),
  setActiveTab: (id) =>
    set((s) => {
      // Auto-expand every ancestor folder of the new active file
      const ancestors = ancestorsOf(id);
      if (ancestors.every((a) => !s.collapsedFolders.has(a))) {
        return { activeTab: id };
      }
      const next = new Set(s.collapsedFolders);
      ancestors.forEach((a) => next.delete(a));
      return { activeTab: id, collapsedFolders: next };
    }),
  toggleFolder: (path) =>
    set((s) => {
      const next = new Set(s.collapsedFolders);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return { collapsedFolders: next };
    }),
}));
