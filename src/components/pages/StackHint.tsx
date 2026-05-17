"use client";
import { useHint } from "@/lib/useHint";
export function StackHint() {
  useHint("hint-stack", "Try Ctrl T to switch between 6 colour themes including light mode.", ["Ctrl", "T"]);
  return null;
}
