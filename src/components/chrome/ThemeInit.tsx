"use client";

import { useEffect } from "react";
import { useChromeStore } from "@/lib/store";
import { getTheme } from "@/lib/theme";

export function ThemeInit() {
  const setActiveTheme = useChromeStore((s) => s.setActiveTheme);
  useEffect(() => {
    setActiveTheme(getTheme());
  }, [setActiveTheme]);
  return null;
}
