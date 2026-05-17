"use client";

import { useHint } from "@/lib/useHint";

export function Hint({ id, text, kbd }: { id: string; text: string; kbd?: string[] }) {
  useHint(id, text, kbd);
  return null;
}
