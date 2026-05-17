"use client";
import { useHint } from "@/lib/useHint";
export function ExperienceHint() {
  useHint(
    "hint-experience",
    "Browse work products in the sidebar — each file is a project I shipped here."
  );
  return null;
}
