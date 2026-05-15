"use client";

import { Menu, Search, Settings, type LucideIcon } from "lucide-react";
import { useChromeStore, type PanelId } from "@/lib/store";

const NAV_ITEMS: { id: PanelId; Icon: LucideIcon; label: string }[] = [
  { id: "explorer", Icon: Menu, label: "Menu" },
  { id: "search", Icon: Search, label: "Search" },
  { id: "settings", Icon: Settings, label: "Settings" },
];

export function BottomNav() {
  const activePanel = useChromeStore((s) => s.activePanel);
  const setActivePanel = useChromeStore((s) => s.setActivePanel);

  return (
    <div className="h-16 bg-bg-elev border-t border-border flex shrink-0">
      {NAV_ITEMS.map(({ id, Icon, label }, i) => {
        const active = activePanel === id;
        return (
          <button
            key={id}
            onClick={() => setActivePanel(active ? null : id)}
            className={`flex-1 flex flex-col items-center justify-center gap-1 cursor-pointer font-ui text-meta ${
              i > 0 ? "border-l border-border" : ""
            } ${active ? "bg-side-hi text-fg-hi" : "bg-transparent text-dim"}`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
