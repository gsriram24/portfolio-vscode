"use client";

import { useChromeStore } from "@/lib/store";
import { EXT_COLORS, type FileExt } from "@/data/files";
import { ViewModeToggle } from "./ViewModeToggle";

// Design (handoff):
//   tablet  — padding 0 12 · gap 6 · fontSize 12   · dot 10 · × 13   (contact.jsx ContactTabletArtboard)
//   desktop — padding 0 14 · gap 8 · fontSize 12.5 · dot 11 · × 14   (homepages4.jsx Tabs)
function TabItem({ id, active }: { id: string; active: boolean }) {
  const setActiveTab = useChromeStore((s) => s.setActiveTab);
  const closeTab = useChromeStore((s) => s.closeTab);
  const fileName = id.split("/").pop() ?? id;
  const ext = fileName.split(".").pop() ?? "";
  const dotColor = EXT_COLORS[ext as FileExt] ?? "var(--color-dim)";

  return (
    <div
      onMouseDown={(e) => {
        if (e.button === 1) {
          e.preventDefault();
          closeTab(id);
        }
      }}
      className={`flex items-center gap-1.5 xl:gap-2 px-3 xl:px-3.5 h-full font-code text-[12px] xl:text-[12.5px] border-r border-border shrink-0 whitespace-nowrap select-none border-t ${
        active ? "bg-bg text-fg-hi border-t-accent" : "bg-transparent text-dim border-t-transparent"
      }`}
    >
      <button
        onClick={() => setActiveTab(id)}
        className="flex items-center gap-1.5 xl:gap-2 cursor-pointer bg-transparent text-inherit"
      >
        <span className="text-[10px] xl:text-meta" style={{ color: dotColor }}>
          ●
        </span>
        {fileName}
      </button>
      <button
        onClick={() => closeTab(id)}
        className="flex items-center justify-center cursor-pointer bg-transparent text-muted text-code xl:text-sm leading-none"
        title={`Close ${fileName}`}
      >
        ×
      </button>
    </div>
  );
}

export function TabBar() {
  const tabs = useChromeStore((s) => s.tabs);
  const activeTab = useChromeStore((s) => s.activeTab);

  return (
    <div className="h-8.5 bg-bg-elev border-b border-border flex items-stretch shrink-0">
      <div className="flex flex-1 overflow-x-auto items-stretch scrollbar-none">
        {tabs.map((id) => (
          <TabItem key={id} id={id} active={id === activeTab} />
        ))}
      </div>

      {/* View mode toggle — tablet only (twoWay; Split is desktop-only) */}
      <div className="hidden md:flex xl:hidden items-center px-2 border-l border-border">
        <ViewModeToggle size="tablet" twoWay />
      </div>
    </div>
  );
}
