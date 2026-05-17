"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronRight, Search as SearchIcon } from "lucide-react";
import { useChromeStore } from "@/lib/store";
import { buildFileTree, EXT_COLORS, isDir, type TreeNode, type FileExt } from "@/data/files";
import { pathFor } from "@/lib/routes";
import { fuse } from "@/lib/search";
import { SEARCH_INDEX, type SearchEntry } from "@/data/search-index";
import { THEME_LABELS } from "@/lib/theme";

const FILE_TREE = buildFileTree();

function FileRow({
  node,
  depth,
  parentPath = "",
}: {
  node: TreeNode;
  depth: number;
  parentPath?: string;
}) {
  const toggleFolder = useChromeStore((s) => s.toggleFolder);
  const dir = isDir(node);
  const folderPath = dir ? (parentPath ? `${parentPath}/${node.name}` : node.name) : "";
  const expanded = useChromeStore((s) => !s.collapsedFolders.has(folderPath));
  const active = useChromeStore((s) => !dir && s.activeTab === (node as { path?: string }).path);
  const padLeft = depth === 0 && !dir ? 4 + 14 : 8 + depth * 14;

  if (dir) {
    return (
      <>
        <button
          onClick={() => toggleFolder(folderPath)}
          className="flex items-center gap-1.5 py-1 pr-2 w-full font-code text-code text-fg cursor-pointer select-none bg-transparent text-left transition-colors duration-(--duration-fast) ease-vscode hover:bg-side-hi"
          style={{ paddingLeft: padLeft }}
        >
          {expanded ? (
            <ChevronDown size={14} className="shrink-0" />
          ) : (
            <ChevronRight size={14} className="shrink-0" />
          )}
          {node.name}
        </button>
        {expanded &&
          node.children.map((child) => (
            <FileRow
              key={isDir(child) ? child.name : child.path}
              node={child}
              depth={depth + 1}
              parentPath={folderPath}
            />
          ))}
      </>
    );
  }

  const dotColor = EXT_COLORS[node.ext];

  // <Link> drives navigation. The pathname change is picked up by RouteSync,
  // which updates Zustand (openTab + setActiveTab) — see RouteSync.tsx.
  return (
    <Link
      href={pathFor(node.path)}
      className={`flex items-center gap-1.5 py-1 pr-2 w-full font-code text-code cursor-pointer text-left no-underline transition-colors duration-(--duration-fast) ease-vscode hover:bg-side-hi ${
        active ? "bg-side-hi text-fg-hi" : "bg-transparent text-fg"
      }`}
      style={{ paddingLeft: padLeft }}
    >
      <span className="w-3.5 shrink-0 text-meta text-center" style={{ color: dotColor }}>
        ●
      </span>
      {node.name}
    </Link>
  );
}

export function ExplorerPanel() {
  return (
    <div>
      {/* Design: padding 10px 16px 6px · fontSize 11 · letterSpacing 0.06em · uppercase · fontWeight 600 */}
      <div className="font-code text-meta text-dim uppercase font-semibold pt-2.5 px-4 pb-1.5 tracking-[0.06em]">
        Explorer
      </div>
      {FILE_TREE.map((node) => (
        <FileRow
          key={isDir(node) ? node.name : node.path}
          node={node}
          depth={0}
        />
      ))}
    </div>
  );
}

function SearchPanel() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const setActiveTab = useChromeStore((s) => s.setActiveTab);
  const openTab = useChromeStore((s) => s.openTab);
  const setActivePanel = useChromeStore((s) => s.setActivePanel);

  const results: SearchEntry[] = query
    ? fuse.search(query).map((r) => r.item)
    : SEARCH_INDEX;

  function navigateTo(path: string) {
    openTab(path);
    setActiveTab(path);
    router.push(pathFor(path));
    setActivePanel(null);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="font-code text-meta text-dim uppercase font-semibold pt-2.5 px-4 pb-1.5 tracking-[0.06em]">
        Search
      </div>

      <div className="mx-2 mb-2 flex items-center gap-2 px-2 py-1.5 bg-bg border border-border rounded-[3px] focus-within:border-accent transition-colors duration-(--duration-fast)">
        <SearchIcon size={12} className="text-dim shrink-0" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search files…"
          className="flex-1 bg-transparent font-code text-code text-fg outline-none placeholder:text-dim min-w-0"
        />
      </div>

      <div className="px-3 pb-1 font-code text-meta text-dim">
        {results.length} result{results.length !== 1 ? "s" : ""}
      </div>

      <div className="flex-1 overflow-y-auto">
        {results.map((entry) => {
          const ext = (entry.path.split(".").pop() ?? "ts") as FileExt;
          const dotColor = EXT_COLORS[ext] ?? "var(--color-dim)";
          return (
            <button
              key={entry.path}
              onClick={() => navigateTo(entry.path)}
              className="w-full text-left px-3 py-1.5 hover:bg-side-hi cursor-pointer bg-transparent border-0 flex flex-col gap-0.5"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-3 shrink-0 font-code text-meta text-center" style={{ color: dotColor }}>●</span>
                <span className="font-code text-code text-fg-hi truncate">{entry.name}</span>
              </div>
              <div className="font-code text-meta text-dim pl-4.5 truncate">{entry.path}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SettingsPanel() {
  const setOverlay = useChromeStore((s) => s.setOverlay);
  const activeTheme = useChromeStore((s) => s.activeTheme);

  return (
    <div className="flex flex-col">
      <div className="font-code text-meta text-dim uppercase font-semibold pt-2.5 px-4 pb-1.5 tracking-[0.06em]">
        Settings
      </div>
      <div className="px-4 py-3 border-b border-border">
        <div className="font-ui text-code font-semibold text-fg-hi mb-1">Color theme</div>
        <button
          onClick={() => setOverlay("theme")}
          className="w-full text-left px-2 py-1.5 bg-side-hi border border-accent rounded-[3px] font-code text-code text-fg-hi cursor-pointer hover:opacity-90 transition-opacity duration-(--duration-fast)"
        >
          {THEME_LABELS[activeTheme]}
        </button>
      </div>
    </div>
  );
}

export function Sidebar() {
  const activePanel = useChromeStore((s) => s.activePanel);

  if (!activePanel) return null;

  return (
    <div className="hidden md:flex md:flex-col w-60 bg-side border-r border-border shrink-0 overflow-y-auto">
      {activePanel === "explorer" && <ExplorerPanel />}
      {activePanel === "search" && <SearchPanel />}
      {activePanel === "settings" && <SettingsPanel />}
    </div>
  );
}
