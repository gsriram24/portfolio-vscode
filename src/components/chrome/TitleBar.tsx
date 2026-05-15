"use client";

import { Menu } from "lucide-react";
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

      {/* Center title */}
      <div className="flex-1 text-center font-code text-[11.5px] text-[#CCCCCC] overflow-hidden text-ellipsis whitespace-nowrap">
        {fileName} — gsriram.dev
      </div>

      {/* Desktop: view mode toggle */}
      <div className="hidden xl:flex shrink-0">
        <ViewModeToggle />
      </div>

      {/* Tablet: hamburger (Phase 7 wires the nav overlay) */}
      <div className="flex xl:hidden shrink-0 text-dim cursor-pointer">
        <Menu size={17} />
      </div>
    </div>
  );
}
