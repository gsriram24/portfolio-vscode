"use client";

import { type ReactNode } from "react";
import { useChromeStore } from "@/lib/store";

// Reads viewMode for "Sriram.tsx" tab and renders source / split / preview.
// Both children are server-rendered; this client wrapper just chooses which to show.
// Default mode is "preview" (see store.ts), so SSG output matches first paint.
export function HomeViewSwitcher({
  source,
  preview,
}: {
  source: ReactNode;
  preview: ReactNode;
}) {
  const mode = useChromeStore((s) => s.getViewMode("Sriram.tsx"));

  if (mode === "source") return <>{source}</>;

  if (mode === "split") {
    // Split is desktop-only: tablet's TabBar toggle and mobile's HintBar
    // toggle both use twoWay (Source/Preview only). If a user sets split on
    // desktop then resizes below xl (1280px), fall back to preview-only —
    // two cramped columns at narrower widths is unreadable. The source pane
    // is hidden via CSS, preview spans the row.
    return (
      <div className="h-full grid grid-cols-1 xl:grid-cols-2 xl:divide-x xl:divide-border">
        <div className="hidden xl:block overflow-auto min-w-0">{source}</div>
        <div className="overflow-auto min-w-0">{preview}</div>
      </div>
    );
  }

  return <>{preview}</>;
}
