"use client";

import { Menu, Search, Settings, type LucideIcon } from "lucide-react";
import { useChromeStore, type PanelId } from "@/lib/store";

const NAV_ITEMS: { id: PanelId; Icon: LucideIcon; label: string }[] = [
  { id: "explorer", Icon: Menu, label: "Menu" },
  { id: "search", Icon: Search, label: "Search" },
  { id: "settings", Icon: Settings, label: "Settings" },
];

// Only Menu has a working overlay in Phase 3. Search + Settings overlays come in Phase 7.
const WIRED_PANELS: ReadonlySet<PanelId> = new Set(["explorer"]);

export function BottomNav() {
  const navOpen = useChromeStore((s) => s.navOpen);
  const setNavOpen = useChromeStore((s) => s.setNavOpen);

  return (
    <div className="h-16 bg-bg-elev border-t border-border flex shrink-0">
      {NAV_ITEMS.map(({ id, Icon, label }, i) => {
        const wired = WIRED_PANELS.has(id);
        const active = id === "explorer" && navOpen;
        return (
          <button
            key={id}
            onClick={wired ? () => setNavOpen(!navOpen) : undefined}
            disabled={!wired}
            className={`flex-1 flex flex-col items-center justify-center gap-1 font-code bg-transparent ${
              i > 0 ? "border-l border-border" : ""
            } ${wired ? "cursor-pointer" : "cursor-not-allowed opacity-50"} ${
              active ? "bg-side-hi" : ""
            }`}
          >
            <Icon size={20} className={active ? "text-fg-hi" : "text-activity-inactive"} />
            <span
              className={`text-[9px] tracking-wider ${
                active ? "text-accent" : "text-activity-inactive"
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
