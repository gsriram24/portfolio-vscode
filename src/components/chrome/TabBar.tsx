"use client";

import { X } from "lucide-react";
import { useChromeStore } from "@/lib/store";
import { EXT_COLORS, type FileExt } from "@/data/files";
import { ViewModeToggle } from "./ViewModeToggle";

function TabItem({ id, active }: { id: string; active: boolean }) {
  const setActiveTab = useChromeStore((s) => s.setActiveTab);
  const closeTab = useChromeStore((s) => s.closeTab);
  const fileName = id.split("/").pop() ?? id;
  const ext = fileName.split(".").pop() ?? "";
  const dotColor = EXT_COLORS[ext as FileExt] ?? "var(--color-dim)";

  return (
    <div
      className={`flex items-center h-full font-code text-code border-r border-border shrink-0 whitespace-nowrap select-none border-t ${
        active
          ? "bg-bg text-fg-hi border-t-accent"
          : "bg-transparent text-dim border-t-transparent"
      }`}
    >
      <button
        onClick={() => setActiveTab(id)}
        className="flex items-center gap-1.5 pl-3 pr-1 h-full cursor-pointer bg-transparent text-inherit"
      >
        <span style={{ color: dotColor, fontSize: 9 }}>●</span>
        {fileName}
      </button>
      <button
        onClick={() => closeTab(id)}
        className="flex items-center justify-center pr-3 h-full cursor-pointer bg-transparent text-muted"
        title={`Close ${fileName}`}
      >
        <X size={13} />
      </button>
    </div>
  );
}

export function TabBar() {
  const tabs = useChromeStore((s) => s.tabs);
  const activeTab = useChromeStore((s) => s.activeTab);

  return (
    <div className="h-[34px] bg-bg-elev border-b border-border flex items-stretch shrink-0">
      <div className="flex flex-1 overflow-x-auto items-stretch [scrollbar-width:none]">
        {tabs.map((id) => (
          <TabItem key={id} id={id} active={id === activeTab} />
        ))}
      </div>

      {/* View mode toggle — tablet only */}
      <div className="hidden md:flex xl:hidden items-center px-2 border-l border-border">
        <ViewModeToggle />
      </div>
    </div>
  );
}
