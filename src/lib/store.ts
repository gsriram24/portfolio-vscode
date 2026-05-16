import { create } from "zustand";

export type ViewMode = "source" | "split" | "preview";
export type PanelId = "explorer" | "search" | "settings";

// Pinned tabs open on first load per the handoff IA (README.md line 76):
//   Sriram.tsx
//   experience/highlevel/schema-markup.tsx
//   experience/highlevel/ask-ai.tsx
const PINNED_TABS = [
  "Sriram.tsx",
  "experience/highlevel/schema-markup.tsx",
  "experience/highlevel/ask-ai.tsx",
];

interface ChromeStore {
  tabs: string[];
  // LRU tab focus history (oldest → most-recent). Used by close-tab logic
  // to navigate back to the most-recently-active tab, matching VSCode.
  recentTabs: string[];
  // Global view mode — one preference across every page. Toggling on any
  // page applies to all. Per-tab mode was the original design but added
  // complexity for no real UX win (users expect a global preference like
  // theme).
  viewMode: ViewMode;
  activePanel: PanelId | null;
  activeTab: string;
  collapsedFolders: ReadonlySet<string>;
  navOpen: boolean;
  openTab: (id: string) => void;
  closeTab: (id: string) => void;
  setViewMode: (mode: ViewMode) => void;
  setActivePanel: (panel: PanelId | null) => void;
  setActiveTab: (id: string) => void;
  toggleFolder: (path: string) => void;
  setNavOpen: (v: boolean) => void;
}

// Returns the set of ancestor folder paths for a file path.
// e.g. "experience/highlevel/index.ts" → ["experience", "experience/highlevel"]
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
  openTab: (id) =>
    set((s) => ({ tabs: s.tabs.includes(id) ? s.tabs : [...s.tabs, id] })),
  closeTab: (id) =>
    set((s) => {
      const nextTabs = s.tabs.filter((t) => t !== id);
      // Drop the closed tab from history so it can't be picked as "next."
      const nextRecent = s.recentTabs.filter((t) => t !== id);
      // If the active tab is being closed, switch to the most-recently-active
      // tab that is still open (VSCode-style). Falls back to the leftmost
      // remaining tab if history is empty.
      const nextActive =
        s.activeTab === id
          ? (nextRecent[nextRecent.length - 1] ?? nextTabs[0] ?? "")
          : s.activeTab;
      return {
        tabs: nextTabs,
        recentTabs: nextRecent,
        activeTab: nextActive,
      };
    }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setActivePanel: (panel) => set({ activePanel: panel }),
  setActiveTab: (id) =>
    set((s) => {
      // Auto-expand every ancestor folder of the new active file, and close
      // any mobile/tablet slide-in nav overlay so the chosen file is visible.
      const ancestors = ancestorsOf(id);
      const needsExpand = ancestors.some((a) => s.collapsedFolders.has(a));
      // Move id to the end of recentTabs (dedupe + move-to-end).
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
}));
