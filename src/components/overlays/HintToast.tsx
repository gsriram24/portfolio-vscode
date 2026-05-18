"use client";

import { Info, X } from "lucide-react";
import { toast } from "sonner";
import { useHint } from "@/lib/useHint";

interface HintToastProps {
  toastId: string | number;
  text: string;
  kbd?: string[];
  dim?: string;
}

export function HintToast({ toastId, text, kbd, dim }: HintToastProps) {
  return (
    <div className="flex items-center gap-2.5 w-95 bg-bg-elev border border-border border-l-[3px] border-l-accent rounded-sm px-3.5 py-2.5 shadow-[0_6px_24px_rgba(0,0,0,0.55)]">
      <Info size={13} className="text-accent shrink-0" />
      <div className="flex-1">
        <span className="font-ui text-ui text-fg">{text}</span>
        {kbd && kbd.length > 0 && (
          <span className="inline-flex gap-1 ml-1.5">
            {kbd.map((k) => (
              <kbd
                key={k}
                className="inline-block px-1 py-px bg-muted border border-[#555] border-b-2 rounded-xs font-code text-[9px] text-dim"
              >
                {k}
              </kbd>
            ))}
          </span>
        )}
      </div>
      {dim && <span className="font-code text-[9px] text-muted shrink-0 mt-0.5">{dim}</span>}
      <button
        onClick={() => toast.dismiss(toastId)}
        aria-label="Dismiss hint"
        className="shrink-0 text-dim cursor-pointer bg-transparent border-0 p-0 flex items-center hover:text-fg transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  );
}

// ── WelcomeHint ──────────────────────────────────────────────────
// Placed in this file so HintToast is in scope without a circular import.

export function WelcomeHint() {
  useHint(
    "welcome",
    "New here? The command palette is the fastest way to navigate.",
    ["Ctrl", "⇧", "P"],
    8000,
    "New here? Tap Search at the bottom to navigate files.",
  );
  return null;
}

// ── ThemeHint ─────────────────────────────────────────────────────

export function ThemeHint() {
  useHint(
    "theme-shortcut",
    "Press to change the color theme.",
    ["Ctrl", "⇧", "Y"],
    8000,
    "Tap Settings at the bottom to change the color theme.",
    15000,
  );
  return null;
}
