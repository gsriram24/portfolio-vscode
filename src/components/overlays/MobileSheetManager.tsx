"use client";

import { useChromeStore } from "@/lib/store";
import { MobileSearch } from "./MobileSearch";
import { MobileSettings } from "./MobileSettings";

export function MobileSheetManager() {
  const mobileSheet = useChromeStore((s) => s.mobileSheet);
  if (!mobileSheet) return null;
  if (mobileSheet === "search") return <MobileSearch />;
  if (mobileSheet === "settings") return <MobileSettings />;
  return null;
}
