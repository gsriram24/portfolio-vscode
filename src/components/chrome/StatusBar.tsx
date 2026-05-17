"use client";

import { useChromeStore } from "@/lib/store";

const EXT_LANG: Record<string, string> = {
  tsx: "TypeScript JSX",
  ts: "TypeScript",
  md: "Markdown",
  json: "JSON",
};

export function StatusBar() {
  const activeTab = useChromeStore((s) => s.activeTab);
  const ext = activeTab.split(".").pop() ?? "";
  const lang = EXT_LANG[ext] ?? "Plain Text";

  // Design: padding 0 12px · gap 14 · ⎇ symbol (not icon) · left items then auto-margin pushes right items
  return (
    <div
      className="h-6 flex items-center px-3 shrink-0 font-code text-[11.5px] text-status-bar-text bg-status-bar gap-3.5"
    >
      <span>⎇ main</span>
      <span>↑0 ↓0</span>
      <span className="ml-auto">{lang}</span>
      <span className="px-2 rounded-[3px] bg-white/30">
        ● G. Sriram
      </span>
    </div>
  );
}
