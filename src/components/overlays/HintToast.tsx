"use client";

import { useEffect } from "react";
import { Info, X } from "lucide-react";
import { toast } from "sonner";
import { hasSeenHint, markHintSeen } from "@/lib/hints";

interface HintToastProps {
  toastId: string | number;
  text: string;
  kbd?: string[];
  dim?: string;
}

export function HintToast({ toastId, text, kbd, dim }: HintToastProps) {
  return (
    <div className="flex items-start gap-2.5 w-95 bg-bg-elev border border-border border-l-[3px] border-l-accent rounded-sm px-3.5 py-2.5 shadow-[0_6px_24px_rgba(0,0,0,0.55)]">
      <Info size={13} className="text-accent shrink-0 mt-0.5" />
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
      {dim && (
        <span className="font-code text-[9px] text-muted shrink-0 mt-0.5">{dim}</span>
      )}
      <button
        onClick={() => toast.dismiss(toastId)}
        aria-label="Dismiss hint"
        className="shrink-0 text-dim cursor-pointer bg-transparent border-0 p-0 flex items-center mt-0.5 hover:text-fg transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  );
}

// ── WelcomeHint ──────────────────────────────────────────────────
// Placed in this file so HintToast is in scope without a circular import.

export function WelcomeHint() {
  useEffect(() => {
    if (hasSeenHint("welcome")) return;
    markHintSeen("welcome");
    toast.custom(
      (id) => (
        <HintToast
          toastId={id}
          text="New here? The command palette is the fastest way to navigate."
          kbd={["Ctrl", "⇧", "P"]}
          dim="first visit only"
        />
      ),
      { duration: 8000 }
    );
  }, []);
  return null;
}

// ── ThemeHint ─────────────────────────────────────────────────────

export function ThemeHint() {
  useEffect(() => {
    if (hasSeenHint("theme-shortcut")) return;
    const timer = setTimeout(() => {
      markHintSeen("theme-shortcut");
      const isMac = /Mac/i.test(navigator.platform);
      const mod = isMac ? "⌘" : "Ctrl";
      toast.custom(
        (id) => (
          <HintToast
            toastId={id}
            text="Press to change the color theme."
            kbd={[mod, "⇧", "Y"]}
          />
        ),
        { duration: 8000 }
      );
    }, 15000);
    return () => clearTimeout(timer);
  }, []);
  return null;
}
