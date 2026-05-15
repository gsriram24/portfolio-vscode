import { create } from "zustand";

export type ViewMode = "source" | "split" | "preview";

const PINNED_TABS = [
  "Sriram.tsx",
  "experience/highlevel/schema-markup.tsx",
  "experience/highlevel/ask-ai.tsx",
];

interface ChromeStore {
  tabs: string[];
  viewModes: Record<string, ViewMode>;
  openTab: (id: string) => void;
  closeTab: (id: string) => void;
  setViewMode: (id: string, mode: ViewMode) => void;
  getViewMode: (id: string) => ViewMode;
}

export const useChromeStore = create<ChromeStore>((set, get) => ({
  tabs: PINNED_TABS,
  viewModes: {},
  openTab: (id) =>
    set((s) => ({ tabs: s.tabs.includes(id) ? s.tabs : [...s.tabs, id] })),
  closeTab: (id) => set((s) => ({ tabs: s.tabs.filter((t) => t !== id) })),
  setViewMode: (id, mode) =>
    set((s) => ({ viewModes: { ...s.viewModes, [id]: mode } })),
  getViewMode: (id) => get().viewModes[id] ?? "preview",
}));
