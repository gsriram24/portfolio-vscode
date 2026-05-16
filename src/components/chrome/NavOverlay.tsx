"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { useChromeStore } from "@/lib/store";
import { ExplorerPanel } from "./Sidebar";

export function NavOverlay() {
  const navOpen = useChromeStore((s) => s.navOpen);
  const setNavOpen = useChromeStore((s) => s.setNavOpen);

  useEffect(() => {
    if (!navOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNavOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navOpen, setNavOpen]);

  if (!navOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <button
        type="button"
        aria-label="Close navigation"
        onClick={() => setNavOpen(false)}
        className="absolute inset-0 bg-[rgba(0,0,0,0.52)] cursor-default"
      />
      <aside className="absolute top-0 left-0 bottom-0 w-[282px] bg-side border-r border-border flex flex-col overflow-hidden">
        <header className="px-4 py-3 border-b border-border flex items-center justify-between shrink-0">
          <span className="font-code text-meta text-dim uppercase font-semibold tracking-[0.06em]">
            G-SRIRAM
          </span>
          <button
            onClick={() => setNavOpen(false)}
            aria-label="Close"
            className="text-dim cursor-pointer flex items-center justify-center bg-transparent"
          >
            <X size={17} />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto">
          <ExplorerPanel />
        </div>
      </aside>
    </div>
  );
}
