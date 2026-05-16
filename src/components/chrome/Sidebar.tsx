"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useChromeStore } from "@/lib/store";
import { buildFileTree, EXT_COLORS, isDir, type TreeNode } from "@/data/files";

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
  const setActiveTab = useChromeStore((s) => s.setActiveTab);
  const openTab = useChromeStore((s) => s.openTab);
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
    <div className="hidden md:flex md:flex-col w-60 bg-side border-r border-border shrink-0 overflow-y-auto">
      {activePanel === "explorer" && <ExplorerPanel />}
      {activePanel === "search" && <SearchPanel />}
      {activePanel === "settings" && <SettingsPanel />}
    </div>
  );
}
