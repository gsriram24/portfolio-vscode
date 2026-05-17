"use client";

import { Menu, Search, Settings } from "lucide-react";
import { useChromeStore } from "@/lib/store";

export function BottomNav() {
  const navOpen = useChromeStore((s) => s.navOpen);
  const setNavOpen = useChromeStore((s) => s.setNavOpen);
  const setMobileSheet = useChromeStore((s) => s.setMobileSheet);

  const items = [
    { label: "Menu", Icon: Menu, onClick: () => setNavOpen(!navOpen), active: navOpen },
    { label: "Search", Icon: Search, onClick: () => setMobileSheet("search"), active: false },
    { label: "Settings", Icon: Settings, onClick: () => setMobileSheet("settings"), active: false },
  ] as const;

  return (
    <div className="h-16 bg-bg-elev border-t border-border flex shrink-0">
      {items.map(({ label, Icon, onClick, active }, i) => (
        <button
          key={label}
          onClick={onClick}
          className={`flex-1 flex flex-col items-center justify-center gap-1 font-code bg-transparent cursor-pointer ${
            i > 0 ? "border-l border-border" : ""
          } ${active ? "bg-side-hi" : ""}`}
        >
          <Icon size={20} className={active ? "text-fg-hi" : "text-activity-inactive"} />
          <span className={`text-[9px] tracking-wider ${active ? "text-accent" : "text-activity-inactive"}`}>
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}
