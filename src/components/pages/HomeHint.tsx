"use client";
import { useHint } from "@/lib/useHint";
export function HomeHint() {
  useHint("hint-home", "Hit </> to see this page as a TypeScript file.");
  return null;
}
