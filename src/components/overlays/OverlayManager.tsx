"use client";

import { useChromeStore } from "@/lib/store";

export function OverlayManager() {
  const overlay = useChromeStore((s) => s.overlay);
  if (!overlay) return null;
  return null;
}
