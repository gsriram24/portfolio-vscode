"use client";

import { useChromeStore } from "@/lib/store";
import { KeyboardShortcuts } from "./KeyboardShortcuts";

export function OverlayManager() {
  const overlay = useChromeStore((s) => s.overlay);
  if (!overlay) return null;
  if (overlay === "shortcuts") return <KeyboardShortcuts />;
  return null;
}
