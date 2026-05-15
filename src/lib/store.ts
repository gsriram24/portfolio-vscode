import { create } from "zustand";

export type ViewMode = "source" | "split" | "preview";
export type PanelId = "explorer" | "search" | "settings";

const PINNED_TABS = ["Sriram.tsx"];

interface ChromeStore {
  tabs: string[];
  viewModes: Record<string, ViewMode>;
  activePanel: PanelId | null;
  activeTab: string;
  openTab: (id: string) => void;
  closeTab: (id: string) => void;
  setViewMode: (id: string, mode: ViewMode) => void;
  getViewMode: (id: string) => ViewMode;
  setActivePanel: (panel: PanelId | null) => void;
  setActiveTab: (id: string) => void;
}

export const useChromeStore = create<ChromeStore>((set, get) => ({
  tabs: PINNED_TABS,
  viewModes: {},
  activePanel: "explorer",
  activeTab: PINNED_TABS[0],
  openTab: (id) =>
    set((s) => ({ tabs: s.tabs.includes(id) ? s.tabs : [...s.tabs, id] })),
  closeTab: (id) =>
    set((s) => ({
      tabs: s.tabs.filter((t) => t !== id),
      activeTab:
        s.activeTab === id
          ? (s.tabs.find((t) => t !== id) ?? s.tabs[0])
          : s.activeTab,
    })),
  setViewMode: (id, mode) =>
    set((s) => ({ viewModes: { ...s.viewModes, [id]: mode } })),
  getViewMode: (id) => get().viewModes[id] ?? "preview",
  setActivePanel: (panel) => set({ activePanel: panel }),
  setActiveTab: (id) => set({ activeTab: id }),
}));
