"use client";

import { useChromeStore } from "@/lib/store";
import { setTheme, THEME_IDS, THEME_LABELS, THEME_SWATCHES, type ThemeId } from "@/lib/theme";

export function MobileSettings() {
  const setMobileSheet = useChromeStore((s) => s.setMobileSheet);
  const activeTheme = useChromeStore((s) => s.activeTheme);
  const setActiveTheme = useChromeStore((s) => s.setActiveTheme);

  function handleThemeSelect(id: ThemeId) {
    setTheme(id);
    setActiveTheme(id);
    setMobileSheet(null);
  }

  const activeThemeShortName = THEME_LABELS[activeTheme].split("(")[0].trim();

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div
        className="absolute inset-0 bg-[rgba(0,0,0,0.46)]"
        onClick={() => setMobileSheet(null)}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-bg-elev rounded-t-[14px] border-t border-border flex flex-col">
        {/* Drag handle */}
        <div className="flex justify-center pt-2.5 pb-0.5 shrink-0">
          <div className="w-8.5 h-1 rounded-full bg-muted" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-1 pb-3 border-b border-border shrink-0">
          <span className="font-code text-meta text-accent uppercase tracking-[0.08em]">
            Settings
          </span>
          <button
            onClick={() => setMobileSheet(null)}
            className="font-ui text-ui text-accent bg-transparent border-0 cursor-pointer p-0"
          >
            Done
          </button>
        </div>

        {/* Theme picker */}
        <div className="px-4 pt-4 pb-3.5 border-b border-border shrink-0">
          <div className="font-ui text-code text-dim mb-3">Color theme</div>
          <div className="flex gap-2.5 overflow-x-auto pb-1">
            {THEME_IDS.map((id) => {
              const bg = THEME_SWATCHES[id][0];
              const acc = THEME_SWATCHES[id][7];
              const lines = THEME_SWATCHES[id].slice(0, 3);
              const isActive = activeTheme === id;
              const shortName = id.split("-")[0];
              return (
                <button
                  key={id}
                  onClick={() => handleThemeSelect(id)}
                  className="shrink-0 flex flex-col items-center gap-1.5 bg-transparent border-0 cursor-pointer p-0"
                >
                  <div
                    className="w-12 h-12 rounded-[10px] overflow-hidden relative"
                    style={{ background: bg, border: `2px solid ${isActive ? acc : "var(--color-border)"}` }}
                  >
                    {/* Color lines */}
                    <div className="absolute top-0 left-0 right-0 p-1.25 flex flex-col gap-0.75">
                      {lines.map((color, i) => (
                        <div
                          key={i}
                          className="h-0.75 rounded-[1px]"
                          style={{
                            width: ["80%", "55%", "68%"][i],
                            background: color,
                            opacity: 0.75,
                          }}
                        />
                      ))}
                    </div>
                    {/* Accent strip */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-2.25"
                      style={{ background: acc }}
                    />
                  </div>
                  <span
                    className="font-code text-[9px] text-center max-w-12 leading-[1.3]"
                    style={{ color: isActive ? acc : "var(--color-dim)" }}
                  >
                    {shortName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>


        {/* About */}
        <div className="flex items-center justify-between px-4 pt-3.5 pb-6 shrink-0">
          <span className="font-ui text-ui text-fg">gsriram.dev</span>
          <span className="font-code text-meta text-dim">
            v1.0.0 · {activeThemeShortName}
          </span>
        </div>
      </div>
    </div>
  );
}
