"use client";

import { type ReactNode } from "react";
import { useChromeStore } from "@/lib/store";

// Reads viewMode for the given tabId and renders source / split / preview.
// Both children are server-rendered; this client wrapper just chooses which
// to show. Default mode is "preview" (see store.ts).
//
// The preview slot is wrapped in the shared layout (max-w-480, asymmetric
// padding, bg-bg). At ultrawide viewports (≥ 2100px), the layout centers
// itself via `mx-auto` so the editor pane doesn't read as unbalanced on
// wide monitors. Below 2100, content stays left-anchored per the
// VSCode metaphor.

const PREVIEW_LAYOUT =
  "max-w-480 pl-5 pr-5 pt-6 pb-7 md:pl-12 md:pr-8 md:pt-10 md:pb-14 xl:pl-12 xl:pr-12 xl:pt-10 xl:pb-14 min-[2100px]:mx-auto flex flex-col";

function PreviewSlot({ children }: { children: ReactNode }) {
  return (
    <div className="bg-bg min-h-full">
      <div className={PREVIEW_LAYOUT}>{children}</div>
    </div>
  );
}

export function ViewSwitcher({
  source,
  preview,
}: {
  source: ReactNode;
  preview: ReactNode;
}) {
  const mode = useChromeStore((s) => s.viewMode);

  if (mode === "source") return <>{source}</>;

  if (mode === "split") {
    return (
      <div className="h-full grid grid-cols-1 xl:grid-cols-2 xl:divide-x xl:divide-border">
        <div className="hidden xl:block overflow-auto min-w-0">{source}</div>
        <div className="overflow-auto min-w-0">
          <PreviewSlot>{preview}</PreviewSlot>
        </div>
      </div>
    );
  }

  return <PreviewSlot>{preview}</PreviewSlot>;
}
