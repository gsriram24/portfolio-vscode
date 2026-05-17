"use client";
import { useHint } from "@/lib/useHint";
export function ProjectsHint() {
  useHint("hint-projects", "Press Ctrl P to jump to any project or file by name.", ["Ctrl", "P"]);
  return null;
}
