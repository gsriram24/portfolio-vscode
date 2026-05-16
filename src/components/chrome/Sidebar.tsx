"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useChromeStore } from "@/lib/store";
import { buildFileTree, EXT_COLORS, isDir, type TreeNode } from "@/data/files";

const FILE_TREE = buildFileTree();

function FileRow({
  node,
  depth,
  activePath,
}: {
  node: TreeNode;
  depth: number;
  activePath: string;
}) {
  const [expanded, setExpanded] = useState(true);
  const setActiveTab = useChromeStore((s) => s.setActiveTab);
  const openTab = useChromeStore((s) => s.openTab);
  const padLeft = depth === 0 && !isDir(node) ? 4 + 14 : 8 + depth * 14;

  if (isDir(node)) {
    return (
      <>
        <button
          onClick={() => setExpanded((v) => !v)}
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
              activePath={activePath}
            />
          ))}
      </>
    );
  }

  const active = node.path === activePath;
  const dotColor = EXT_COLORS[node.ext];

  return (
    <button
      onClick={() => {
        openTab(node.path);
        setActiveTab(node.path);
      }}
      className={`flex items-center gap-1.5 py-1 pr-2 w-full font-code text-code cursor-pointer text-left transition-colors duration-(--duration-fast) ease-vscode hover:bg-side-hi ${
        active ? "bg-side-hi text-fg-hi" : "bg-transparent text-fg"
      }`}
      style={{ paddingLeft: padLeft }}
    >
      <span className="w-3.5 shrink-0 text-meta text-center" style={{ color: dotColor }}>
        ●
      </span>
      {node.name}
    </button>
  );
}

function ExplorerPanel() {
  const activePath = useChromeStore((s) => s.activeTab);
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
          activePath={activePath}
        />
      ))}
    </div>
  );
}

function SearchPanel() {
  return (
    <div className="p-2">
      <input
        placeholder="Search"
        className="w-full px-2 py-1 font-code text-code bg-bg border border-border text-fg outline-none"
      />
    </div>
  );
}

function SettingsPanel() {
  return <div className="px-4 py-3 font-ui text-code text-dim">Color Theme</div>;
}

export function Sidebar() {
  const activePanel = useChromeStore((s) => s.activePanel);

  if (!activePanel) return null;

  return (
    <div className="hidden xl:flex xl:flex-col w-60 bg-side border-r border-border shrink-0 overflow-y-auto">
      {activePanel === "explorer" && <ExplorerPanel />}
      {activePanel === "search" && <SearchPanel />}
      {activePanel === "settings" && <SettingsPanel />}
    </div>
  );
}
