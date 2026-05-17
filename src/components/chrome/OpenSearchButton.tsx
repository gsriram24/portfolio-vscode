"use client";

import { useChromeStore } from "@/lib/store";

export function OpenSearchButton() {
  const setActivePanel = useChromeStore((s) => s.setActivePanel);
  return (
    <button
      onClick={() => setActivePanel("search")}
      className="font-code text-meta text-dim bg-transparent border-0 p-0 cursor-pointer hover:text-fg transition-colors duration-(--duration-fast) ease-vscode"
    >
      · <span className="text-accent">⌕ to search</span>
    </button>
  );
}
