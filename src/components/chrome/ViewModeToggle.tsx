"use client";

import { Code2, Columns2, PanelRight, type LucideIcon } from "lucide-react";
import { useChromeStore, type ViewMode } from "@/lib/store";

const MODES_3: { id: ViewMode; Icon: LucideIcon; label: string }[] = [
  { id: "source", Icon: Code2, label: "Source" },
  { id: "split", Icon: Columns2, label: "Split" },
  { id: "preview", Icon: PanelRight, label: "Preview" },
];

const MODES_2: { id: ViewMode; Icon: LucideIcon; label: string }[] = [
  { id: "source", Icon: Code2, label: "Source" },
  { id: "preview", Icon: PanelRight, label: "Preview" },
];

export function ViewModeToggle({ twoWay = false }: { twoWay?: boolean }) {
  const activeTab = useChromeStore((s) => s.activeTab);
  const getViewMode = useChromeStore((s) => s.getViewMode);
  const setViewMode = useChromeStore((s) => s.setViewMode);
  const viewMode = getViewMode(activeTab);
  const modes = twoWay ? MODES_2 : MODES_3;

  return (
    <div className="flex border border-border rounded-[3px] overflow-hidden shrink-0">
      {modes.map(({ id, Icon, label }) => {
        const active = viewMode === id;
        return (
          <button
            key={id}
            title={label}
            onClick={() => setViewMode(activeTab, id)}
            className={`flex items-center justify-center px-[7px] py-[3px] cursor-pointer ${
              active ? "bg-side-hi text-fg-hi" : "bg-transparent text-dim"
            }`}
          >
            <Icon size={13} />
          </button>
        );
      })}
    </div>
  );
}
