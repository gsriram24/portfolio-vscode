"use client";

import { Command } from "cmdk";
import { Search as SearchIcon, ChevronRight, Command as CommandIcon, Mail, ExternalLink } from "lucide-react";
import { useChromeStore } from "@/lib/store";
import { paletteFilter } from "@/lib/search";
import { SEARCH_INDEX, type SearchEntry } from "@/data/search-index";
import { EXT_COLORS } from "@/data/files";
import { SRIRAM } from "@/data/sriram";
import { CONTACT } from "@/data/contact";
import { fileExt, fileLabel } from "@/lib/file-utils";
import { useNavigateTo } from "@/lib/useNavigateTo";

export function MobileSearch() {
  const setMobileSheet = useChromeStore((s) => s.setMobileSheet);
  const recentTabs = useChromeStore((s) => s.recentTabs);

  const recent = recentTabs.slice(-3).reverse();
  const recentPaths = new Set(recent);
  const allEntries: SearchEntry[] = SEARCH_INDEX.filter((e) => !recentPaths.has(e.path));
  const navigateTo = useNavigateTo(() => setMobileSheet(null));

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div
        className="absolute inset-0 bg-[rgba(0,0,0,0.46)]"
        onClick={() => setMobileSheet(null)}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-bg-elev rounded-t-[14px] border-t border-border flex flex-col max-h-[76vh]">
        <div className="flex justify-center pt-2.5 pb-1 shrink-0">
          <div className="w-8.5 h-1 rounded-full bg-muted" />
        </div>

        <Command
          className="flex flex-col min-h-0 overflow-hidden"
          filter={paletteFilter}
        >
          <div className="mx-3.5 mt-2 mb-2.5 flex items-center gap-2.5 px-3 py-2.5 bg-bg border border-accent rounded-md shrink-0">
            <SearchIcon size={16} className="text-dim shrink-0" />
            <Command.Input
              autoFocus
              placeholder="Search files and commands…"
              className="flex-1 bg-transparent font-code text-ui text-fg-hi outline-none placeholder:text-dim"
            />
          </div>

          <Command.List className="flex-1 overflow-y-auto pb-5">
            <Command.Empty className="px-4 py-8 text-center font-code text-meta text-dim">
              No results.
            </Command.Empty>

            {recent.length > 0 && (
              <Command.Group heading="Recently Opened">
                {recent.map((path) => {
                  const ext = fileExt(path);
                  const dotColor = EXT_COLORS[ext] ?? "var(--color-dim)";
                  return (
                    <Command.Item
                      key={path}
                      value={path}
                      onSelect={() => navigateTo(path)}
                      className="flex items-center gap-3 px-4 py-3 cursor-pointer border-l-2 border-l-transparent data-[selected=true]:bg-side-hi data-[selected=true]:border-l-accent"
                    >
                      <span className="w-3 shrink-0 font-code text-meta text-center" style={{ color: dotColor }}>●</span>
                      <span className="flex-1 font-ui text-ui text-fg">{fileLabel(path)}</span>
                      <span className="font-code text-meta text-dim shrink-0">
                        {path.includes("/") ? path.split("/").slice(0, -1).join("/") + "/" : "root"}
                      </span>
                    </Command.Item>
                  );
                })}
              </Command.Group>
            )}

            <Command.Group heading="Commands">
              <Command.Item
                value="change-color-theme"
                keywords={["change color theme", "theme", "appearance", "color", "dark", "light"]}
                onSelect={() => setMobileSheet("settings")}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer border-l-2 border-l-transparent data-[selected=true]:bg-side-hi data-[selected=true]:border-l-accent"
              >
                <CommandIcon size={13} className="shrink-0 text-keyword" />
                <span className="flex-1 font-ui text-ui text-fg">Change Color Theme</span>
              </Command.Item>
              <Command.Item
                value="copy-email"
                keywords={["copy email", "email", "contact", "clipboard", "mail"]}
                onSelect={() => { navigator.clipboard.writeText(CONTACT.email).catch(() => {}); setMobileSheet(null); }}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer border-l-2 border-l-transparent data-[selected=true]:bg-side-hi data-[selected=true]:border-l-accent"
              >
                <Mail size={13} className="shrink-0 text-string" />
                <span className="flex-1 font-ui text-ui text-fg">Copy email — {CONTACT.email}</span>
              </Command.Item>
              <Command.Item
                value="view-resume"
                keywords={["view resume", "resume", "cv", "download"]}
                onSelect={() => { window.open(SRIRAM.links.resume, "_blank", "noopener,noreferrer"); setMobileSheet(null); }}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer border-l-2 border-l-transparent data-[selected=true]:bg-side-hi data-[selected=true]:border-l-accent"
              >
                <ExternalLink size={13} className="shrink-0 text-number" />
                <span className="flex-1 font-ui text-ui text-fg">View Resume</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Navigate">
              {allEntries.map((entry) => {
                const ext = fileExt(entry.path);
                const dotColor = EXT_COLORS[ext] ?? "var(--color-dim)";
                return (
                  <Command.Item
                    key={entry.path}
                    value={entry.path}
                    onSelect={() => navigateTo(entry.path)}
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer border-l-2 border-l-transparent data-[selected=true]:bg-side-hi data-[selected=true]:border-l-accent"
                  >
                    <ChevronRight size={13} className="shrink-0 text-dim" />
                    <span className="flex-1 font-ui text-ui text-fg">{entry.name}</span>
                    <span className="font-code text-meta shrink-0" style={{ color: dotColor }}>●</span>
                  </Command.Item>
                );
              })}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
