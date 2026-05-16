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

// Per-viewport padding from handoff:
//   desktop TitleBar:  3px 7px   (homepages4.jsx)
//   tablet  TabBar:    3px 8px   (contact.jsx ContactTabletArtboard)
//   mobile  HintBar:   6px 12px  (interactions.jsx MobileShell)
const SIZE_PADDING: Record<"desktop" | "tablet" | "mobile", string> = {
  desktop: "px-[7px] py-[3px]",
  tablet: "px-2 py-[3px]",
  mobile: "px-3 py-1.5",
};

export function ViewModeToggle({
  twoWay = false,
  size = "desktop",
}: {
  twoWay?: boolean;
  size?: "desktop" | "tablet" | "mobile";
}) {
  // Subscribe to the value (viewModes[activeTab]) — NOT to getViewMode itself.
  // Selecting the function returns a stable ref that never triggers re-renders
  // when the value changes, so the active-highlight would stay stale.
  const activeTab = useChromeStore((s) => s.activeTab);
  const viewMode = useChromeStore((s) => s.viewModes[activeTab] ?? "preview");
  const setViewMode = useChromeStore((s) => s.setViewMode);
  const modes = twoWay ? MODES_2 : MODES_3;
  const padding = SIZE_PADDING[size];

  return (
    <div className="flex bg-bg border border-border rounded-[3px] overflow-hidden shrink-0">
      {modes.map(({ id, Icon, label }) => {
        const active = viewMode === id;
        return (
          <button
            key={id}
            title={label}
            onClick={() => setViewMode(activeTab, id)}
            className={`flex items-center justify-center ${padding} cursor-pointer ${
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
