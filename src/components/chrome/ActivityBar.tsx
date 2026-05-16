"use client";

import { Files, Search, Settings, type LucideIcon } from "lucide-react";
import { useChromeStore, type PanelId } from "@/lib/store";

const TOP_ICONS: { id: PanelId; Icon: LucideIcon; label: string }[] = [
  { id: "explorer", Icon: Files, label: "Explorer" },
  { id: "search", Icon: Search, label: "Search" },
];

const BOTTOM_ICON: { id: PanelId; Icon: LucideIcon; label: string } = {
  id: "settings",
  Icon: Settings,
  label: "Settings",
};

function ActivityIcon({ id, Icon, label }: { id: PanelId; Icon: LucideIcon; label: string }) {
  const activePanel = useChromeStore((s) => s.activePanel);
  const setActivePanel = useChromeStore((s) => s.setActivePanel);
  const active = activePanel === id;

  return (
    <button
      title={label}
      onClick={() => setActivePanel(active ? null : id)}
      className={`w-full h-9 flex items-center justify-center cursor-pointer shrink-0 bg-transparent border-l-2 ${
        active ? "text-fg-hi border-fg-hi" : "text-activity-inactive border-transparent"
      }`}
    >
      <Icon size={17} />
    </button>
  );
}

export function ActivityBar() {
  return (
    <div className="w-12 bg-activity border-r border-border shrink-0 flex flex-col pt-2 pb-2">
      <div className="flex flex-col gap-1 flex-1">
        {TOP_ICONS.map((item) => (
          <ActivityIcon key={item.id} id={item.id} Icon={item.Icon} label={item.label} />
        ))}
      </div>
      <ActivityIcon id={BOTTOM_ICON.id} Icon={BOTTOM_ICON.Icon} label={BOTTOM_ICON.label} />
    </div>
  );
}
