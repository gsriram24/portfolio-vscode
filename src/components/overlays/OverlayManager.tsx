"use client";

import { useChromeStore } from "@/lib/store";
import { KeyboardShortcuts } from "./KeyboardShortcuts";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { CommandPalette } from "./CommandPalette";

export function OverlayManager() {
  const overlay = useChromeStore((s) => s.overlay);
  if (!overlay) return null;
  if (overlay === "shortcuts") return <KeyboardShortcuts />;
  if (overlay === "theme") return <ThemeSwitcher />;
  if (overlay === "palette-commands" || overlay === "palette-search") return <CommandPalette />;
  return null;
}
