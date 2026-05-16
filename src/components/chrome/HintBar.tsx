"use client";

import { useChromeStore } from "@/lib/store";
import { EXT_COLORS, type FileExt } from "@/data/files";
import { ViewModeToggle } from "./ViewModeToggle";

// "index.ts" alone is ambiguous (4 different index files in the tree).
// When the leaf is index.*, prepend the parent folder so the user knows
// which one: experience/highlevel/index.ts → "highlevel/index.ts".
function labelForTab(tabId: string): string {
  const parts = tabId.split("/");
  const leaf = parts[parts.length - 1] ?? tabId;
  if (/^index\.[a-z]+$/i.test(leaf) && parts.length >= 2) {
    return `${parts[parts.length - 2]}/${leaf}`;
  }
  return leaf;
}

export function HintBar() {
  const activeTab = useChromeStore((s) => s.activeTab);
  const label = labelForTab(activeTab);
  const fileName = label.split("/").pop() ?? label;
  const ext = fileName.split(".").pop() ?? "";
  const dotColor = EXT_COLORS[ext as FileExt] ?? "var(--color-dim)";

  return (
    <div className="h-12 bg-title-bar border-b border-border flex items-center justify-between px-4 shrink-0 gap-2">
      <span className="flex items-center gap-2 font-code text-code text-title-text overflow-hidden">
        <span className="text-meta shrink-0" style={{ color: dotColor }}>●</span>
        <span className="overflow-hidden text-ellipsis whitespace-nowrap">{label}</span>
      </span>
      <ViewModeToggle twoWay size="mobile" />
    </div>
  );
}
