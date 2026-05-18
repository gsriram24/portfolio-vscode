"use client";

import { useHint } from "@/lib/useHint";

export function Hint({
  id,
  text,
  mobileText,
  kbd,
}: {
  id: string;
  text: string;
  mobileText?: string;
  kbd?: string[];
}) {
  useHint(id, text, kbd, undefined, mobileText);
  return null;
}
