"use client";

import { GitBranch } from "lucide-react";
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

  return (
    <div
      className="h-6 flex items-center justify-between px-2 shrink-0 font-code text-[11.5px] text-white gap-2"
      style={{ background: "#007ACC" }}
    >
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1">
          <GitBranch size={12} />
          main
        </span>
        <span>↑0 ↓0</span>
      </div>
      <div className="flex items-center gap-3">
        <span>{lang}</span>
        <span className="px-2 rounded-[3px]" style={{ background: "rgba(255,255,255,0.16)" }}>
          ● G. Sriram
        </span>
      </div>
    </div>
  );
}
