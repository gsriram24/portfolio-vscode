"use client";

import { Command } from "cmdk";
import {
  Command as CommandIcon,
  Search,
  Mail,
  ExternalLink,
  Keyboard,
  ChevronRight,
} from "lucide-react";
import { useChromeStore } from "@/lib/store";
import { paletteFilter } from "@/lib/search";
import { SEARCH_INDEX, type SearchEntry } from "@/data/search-index";
import { EXT_COLORS } from "@/data/files";
import { SRIRAM } from "@/data/sriram";
import { CONTACT } from "@/data/contact";
import { fileExt, fileLabel } from "@/lib/file-utils";
import { useNavigateTo } from "@/lib/useNavigateTo";

export function CommandPalette() {
  const overlay = useChromeStore((s) => s.overlay);
  const setOverlay = useChromeStore((s) => s.setOverlay);
  const recentTabs = useChromeStore((s) => s.recentTabs);
  const isCommandsMode = overlay === "palette-commands";

  const recent = recentTabs.slice(-3).reverse();
  const navigateTo = useNavigateTo(() => setOverlay(null));

  function copyEmail() {
    navigator.clipboard.writeText(CONTACT.email).catch(() => {});
    setOverlay(null);
  }

  function openResume() {
    window.open(SRIRAM.links.resume, "_blank", "noopener,noreferrer");
    setOverlay(null);
  }

  const recentPaths = new Set(recent);
  const allEntries: SearchEntry[] = SEARCH_INDEX.filter(
    (e) => !recentPaths.has(e.path)
  );

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center pt-11 bg-[rgba(0,0,0,0.44)]"
      onClick={() => setOverlay(null)}
    >
      <Command
        className="w-[632px] bg-bg-elev border border-border rounded-md shadow-[0_16px_56px_rgba(0,0,0,0.72)] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
        onClick={(e) => e.stopPropagation()}
        filter={paletteFilter}
      >
        {/* Input row */}
        <div className="flex items-center gap-2.5 border-b border-border px-4">
          {isCommandsMode && (
            <span className="font-code text-ui text-dim shrink-0">{">"}</span>
          )}
          <Command.Input
            autoFocus
            placeholder={isCommandsMode ? "Type a command or search…" : "Go to file…"}
            className="flex-1 font-code text-ui text-fg-hi bg-transparent border-0 outline-none py-3.5 placeholder:text-dim"
          />
          <span className="font-code text-meta text-dim whitespace-nowrap shrink-0">
            ↑↓ navigate · ↵ select · Esc dismiss
          </span>
        </div>

        {/* Results */}
        <Command.List className="max-h-[420px] overflow-y-auto">
          <Command.Empty className="px-4 py-8 text-center font-code text-meta text-dim">
            No results found.
          </Command.Empty>

          {/* Recently Opened */}
          {recent.length > 0 && (
            <Command.Group heading="Recently Opened">
              {recent.map((path) => {
                const ext = fileExt(path);
                const dotColor = EXT_COLORS[ext] ?? "var(--color-dim)";
                const label = fileLabel(path);
                const folder = path.includes("/") ? path.split("/").slice(0, -1).join("/") : "root";
                return (
                  <Command.Item
                    key={path}
                    value={path}
                    onSelect={() => navigateTo(path)}
                    className="flex items-center gap-2.5 px-4 py-[7px] cursor-pointer border-l-2 border-l-transparent data-[selected=true]:bg-side-hi data-[selected=true]:border-l-accent"
                  >
                    <span className="w-3.5 shrink-0 font-code text-meta text-center" style={{ color: dotColor }}>●</span>
                    <span className="flex-1 font-ui text-ui text-fg truncate">{label}</span>
                    <span className="font-code text-meta text-dim shrink-0">{folder}</span>
                  </Command.Item>
                );
              })}
            </Command.Group>
          )}

          {/* Commands — shown only in palette-commands mode */}
          {isCommandsMode && (
            <Command.Group heading="Commands">
              <Command.Item
                value="change-color-theme"
                keywords={["change color theme", "theme", "appearance", "color", "dark", "light"]}
                onSelect={() => setOverlay("theme")}
                className="flex items-center gap-2.5 px-4 py-[7px] cursor-pointer border-l-2 border-l-transparent data-[selected=true]:bg-side-hi data-[selected=true]:border-l-accent"
              >
                <CommandIcon size={12} className="shrink-0 text-keyword" />
                <span className="flex-1 font-ui text-ui text-fg">Change Color Theme</span>
                <span className="font-code text-meta text-dim">Ctrl ⇧ Y</span>
              </Command.Item>

              <Command.Item
                value="search-files"
                keywords={["search files", "search", "go to file", "navigate", "open"]}
                onSelect={() => setOverlay("palette-search")}
                className="flex items-center gap-2.5 px-4 py-[7px] cursor-pointer border-l-2 border-l-transparent data-[selected=true]:bg-side-hi data-[selected=true]:border-l-accent"
              >
                <Search size={12} className="shrink-0 text-accent" />
                <span className="flex-1 font-ui text-ui text-fg">Search / go to file</span>
                <span className="font-code text-meta text-dim">Ctrl P</span>
              </Command.Item>

              <Command.Item
                value="copy-email"
                keywords={["copy email", "email", "contact", "clipboard", "mail"]}
                onSelect={copyEmail}
                className="flex items-center gap-2.5 px-4 py-[7px] cursor-pointer border-l-2 border-l-transparent data-[selected=true]:bg-side-hi data-[selected=true]:border-l-accent"
              >
                <Mail size={12} className="shrink-0 text-string" />
                <span className="flex-1 font-ui text-ui text-fg">
                  Copy email — {CONTACT.email}
                </span>
              </Command.Item>

              <Command.Item
                value="view-resume"
                keywords={["view resume", "resume", "cv", "download"]}
                onSelect={openResume}
                className="flex items-center gap-2.5 px-4 py-[7px] cursor-pointer border-l-2 border-l-transparent data-[selected=true]:bg-side-hi data-[selected=true]:border-l-accent"
              >
                <ExternalLink size={12} className="shrink-0 text-number" />
                <span className="flex-1 font-ui text-ui text-fg">View Resume</span>
              </Command.Item>

              <Command.Item
                value="keyboard-shortcuts"
                keywords={["keyboard shortcuts", "shortcuts", "keybindings", "keys", "hotkeys"]}
                onSelect={() => setOverlay("shortcuts")}
                className="flex items-center gap-2.5 px-4 py-[7px] cursor-pointer border-l-2 border-l-transparent data-[selected=true]:bg-side-hi data-[selected=true]:border-l-accent"
              >
                <Keyboard size={12} className="shrink-0 text-dim" />
                <span className="flex-1 font-ui text-ui text-fg">Keyboard Shortcuts</span>
              </Command.Item>
            </Command.Group>
          )}

          {/* Navigate */}
          <Command.Group heading="Navigate">
            {allEntries.map((entry) => {
              const ext = fileExt(entry.path);
              const dotColor = EXT_COLORS[ext] ?? "var(--color-dim)";
              return (
                <Command.Item
                  key={entry.path}
                  value={entry.path}
                  onSelect={() => navigateTo(entry.path)}
                  className="flex items-center gap-2.5 px-4 py-[7px] cursor-pointer border-l-2 border-l-transparent data-[selected=true]:bg-side-hi data-[selected=true]:border-l-accent"
                >
                  <ChevronRight size={12} className="shrink-0 text-dim" />
                  <span className="flex-1 font-ui text-ui text-fg">{entry.name}</span>
                  <span className="font-code text-meta text-dim shrink-0" style={{ color: dotColor }}>●</span>
                </Command.Item>
              );
            })}
          </Command.Group>
        </Command.List>

        {/* Footer */}
        <div className="px-4 py-[7px] border-t border-border flex gap-4 font-code text-meta text-dim">
          <span>
            <kbd className="px-1 py-px bg-muted border border-[#555] border-b-2 rounded-xs font-code text-[9px] text-dim">Tab</kbd>
            {" "}accept
          </span>
          <span>
            <kbd className="px-1 py-px bg-muted border border-[#555] border-b-2 rounded-xs font-code text-[9px] text-dim">→</kbd>
            {" "}expand group
          </span>
          <span className="ml-auto">{SEARCH_INDEX.length} results</span>
        </div>
      </Command>
    </div>
  );
}
