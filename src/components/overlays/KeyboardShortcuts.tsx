"use client";

import { X } from "lucide-react";
import { useChromeStore } from "@/lib/store";

const isMac = typeof navigator !== "undefined" && /Mac/i.test(navigator.platform);
const mod = isMac ? "⌘" : "Ctrl";

function sections() {
  return [
    {
      label: "Navigate",
      rows: [
        { keys: [mod, "⇧", "P"], desc: "Open command palette" },
        { keys: [mod, "P"], desc: "Search / go to file" },
        { keys: ["Esc"], desc: "Dismiss overlay / close panel" },
      ],
    },
    {
      label: "View",
      rows: [
        { keys: [mod, "⇧", "Y"], desc: "Change color theme" },
      ],
    },
    {
      label: "In any list",
      rows: [
        { keys: ["↑ ↓"], desc: "Navigate items" },
        { keys: ["↵"], desc: "Select / open item" },
      ],
    },
  ];
}

function Kbd({ k }: { k: string }) {
  return (
    <kbd className="inline-block px-1.5 py-px bg-muted border border-[#555] border-b-2 rounded-sm font-code text-meta text-fg whitespace-nowrap">
      {k}
    </kbd>
  );
}

export function KeyboardShortcuts() {
  const setOverlay = useChromeStore((s) => s.setOverlay);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center pt-11 bg-[rgba(0,0,0,0.44)]">
      <div
        className="w-175 max-h-[80vh] bg-bg-elev border border-border rounded-md shadow-[0_16px_56px_rgba(0,0,0,0.72)] flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Keyboard Shortcuts"
      >
        {/* Header */}
        <div className="flex items-center px-6 py-3.5 border-b border-border shrink-0">
          <span className="font-code text-meta text-accent uppercase tracking-[0.08em]">
            Keyboard Shortcuts
          </span>
          <button
            onClick={() => setOverlay(null)}
            aria-label="Close"
            className="text-dim cursor-pointer bg-transparent border-0 p-0 flex items-center"
          >
            <X size={15} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto px-6 pb-5">
          {sections().map((section) => (
            <div key={section.label}>
              <div className="font-code text-meta text-accent uppercase tracking-[0.08em] pt-3.5 pb-1 border-b border-border">
                {section.label}
              </div>
              {section.rows.map((row) => (
                <div
                  key={row.desc}
                  className="flex items-center gap-4 py-2 border-b border-border"
                >
                  <div className="flex gap-1 min-w-42.5 shrink-0">
                    {row.keys.map((k) => (
                      <Kbd key={k} k={k} />
                    ))}
                  </div>
                  <span className="font-ui text-ui text-fg">{row.desc}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
