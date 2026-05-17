"use client";

import { useEffect, useRef } from "react";
import { Command } from "cmdk";
import { useChromeStore } from "@/lib/store";
import { setTheme, THEME_IDS, THEME_LABELS, THEME_SWATCHES, THEME_CATEGORIES, type ThemeId } from "@/lib/theme";

export function ThemeSwitcher() {
  const setOverlay = useChromeStore((s) => s.setOverlay);
  const activeTheme = useChromeStore((s) => s.activeTheme);
  const setActiveTheme = useChromeStore((s) => s.setActiveTheme);

  const snapshot = useRef<ThemeId>(activeTheme);
  const confirmed = useRef(false);

  useEffect(() => {
    snapshot.current = activeTheme;
    confirmed.current = false;
    return () => {
      if (!confirmed.current) {
        setTheme(snapshot.current);
        setActiveTheme(snapshot.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSelect(id: ThemeId) {
    confirmed.current = true;
    setTheme(id);
    setActiveTheme(id);
    setOverlay(null);
  }

  function handleHighlight(id: ThemeId) {
    setTheme(id);
    setActiveTheme(id);
  }

  const isMac = typeof navigator !== "undefined" && /Mac/i.test(navigator.platform);
  const mod = isMac ? "⌘" : "Ctrl";

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center pt-11 bg-[rgba(0,0,0,0.44)]">
      <Command
        className="w-[700px] bg-bg-elev border border-border rounded-md shadow-[0_16px_56px_rgba(0,0,0,0.72)] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Select Color Theme"
        onValueChange={(v) => handleHighlight(v as ThemeId)}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-border font-code text-meta text-dim">
          Select Color Theme &nbsp;·&nbsp;{" "}
          <span className="text-fg">{mod} ⇧ Y</span>
          &nbsp;·&nbsp; Up/Down to preview &nbsp;·&nbsp; Enter to apply
        </div>

        {/* Theme list */}
        <Command.List>
          {THEME_IDS.map((id) => (
            <Command.Item
              key={id}
              value={id}
              onSelect={() => handleSelect(id)}
              onMouseEnter={() => handleHighlight(id)}
              className="group flex items-center gap-3 px-4 py-2.5 cursor-pointer not-last:border-b border-border border-l-2 border-l-transparent data-[selected=true]:bg-side-hi data-[selected=true]:border-l-accent"
            >
              <span className={`w-4 font-code text-meta text-center ${activeTheme === id ? "text-accent" : "text-transparent"}`}>
                ✓
              </span>

              <span className="flex-1 font-ui text-ui text-fg group-data-[selected=true]:text-fg-hi">{THEME_LABELS[id]}</span>

              <div className="flex gap-0.5 shrink-0">
                {THEME_SWATCHES[id].map((color, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-[2px] border border-white/[0.07]"
                    style={{ background: color }}
                  />
                ))}
              </div>

              <span className="font-code text-meta text-dim bg-muted px-1.75 py-px rounded-xs shrink-0 min-w-8.5 text-center">
                {THEME_CATEGORIES[id]}
              </span>
            </Command.Item>
          ))}
        </Command.List>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-border font-code text-meta text-dim flex">
          <span>Swatches: bg · bgElev · keyword · func · type · string · comment · accent</span>
          <span className="ml-auto">{mod} ⇧ Y</span>
        </div>
      </Command>
    </div>
  );
}
