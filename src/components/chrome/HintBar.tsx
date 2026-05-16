"use client";

import { useChromeStore } from "@/lib/store";
import { EXT_COLORS, type FileExt } from "@/data/files";
import { ViewModeToggle } from "./ViewModeToggle";

export function HintBar() {
  const activeTab = useChromeStore((s) => s.activeTab);
  const fileName = activeTab.split("/").pop() ?? activeTab;
  const ext = fileName.split(".").pop() ?? "";
  const dotColor = EXT_COLORS[ext as FileExt] ?? "var(--color-dim)";

  return (
    <div className="h-12 bg-title-bar border-b border-border flex items-center justify-between px-4 shrink-0 gap-2">
      <span className="flex items-center gap-2 font-code text-code text-title-text overflow-hidden">
        <span className="text-meta shrink-0" style={{ color: dotColor }}>●</span>
        <span className="overflow-hidden text-ellipsis whitespace-nowrap">{fileName}</span>
      </span>
      <ViewModeToggle twoWay size="mobile" />
    </div>
  );
}
