"use client";

import { useEffect } from "react";
import { useChromeStore } from "./store";

export function useGlobalKeyboard() {
  const setOverlay = useChromeStore((s) => s.setOverlay);
  const setMobileSheet = useChromeStore((s) => s.setMobileSheet);
  const overlay = useChromeStore((s) => s.overlay);
  const mobileSheet = useChromeStore((s) => s.mobileSheet);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (overlay !== null || mobileSheet !== null) {
          e.preventDefault();
          setOverlay(null);
          setMobileSheet(null);
        }
        return;
      }

      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) return;

      if (e.ctrlKey && e.shiftKey && e.key === "P") {
        e.preventDefault();
        setOverlay("palette-commands");
        return;
      }

      if (e.ctrlKey && !e.shiftKey && e.key === "p") {
        e.preventDefault();
        setOverlay("palette-search");
        return;
      }

      if (e.ctrlKey && e.key === "t") {
        e.preventDefault();
        setOverlay("theme");
        return;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [overlay, mobileSheet, setOverlay, setMobileSheet]);
}
