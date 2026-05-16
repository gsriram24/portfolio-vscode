"use client";

import { useChromeStore } from "@/lib/store";
import { ViewModeToggle } from "./ViewModeToggle";

const TRAFFIC_LIGHTS = ["#FF5F57", "#FEBC2E", "#28C840"];

export function TitleBar() {
  const activeTab = useChromeStore((s) => s.activeTab);
  const fileName = activeTab.split("/").pop() ?? activeTab;

  return (
    <div className="h-[30px] bg-title-bar border-b border-border flex items-center px-3 gap-2 shrink-0">
      {/* Traffic lights — hardcoded, not design tokens */}
      <div className="flex gap-1.5 shrink-0">
        {TRAFFIC_LIGHTS.map((c) => (
          <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
        ))}
      </div>

      {/* Center title — #CCCCCC per design spec, not a theme token */}
      <div className="flex-1 text-center font-code text-[11.5px] overflow-hidden text-ellipsis whitespace-nowrap text-title-text">
        {fileName} — gsriram.dev
      </div>

      {/* Desktop: view mode toggle. Tablet sidebar toggles via the ActivityBar Files icon. */}
      <div className="hidden xl:flex shrink-0">
        <ViewModeToggle />
      </div>
    </div>
  );
}
