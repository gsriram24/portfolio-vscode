"use client";

import { useChromeStore } from "@/lib/store";
import { buildFileTree, EXT_COLORS, isDir, type TreeNode } from "@/data/files";

const FILE_TREE = buildFileTree();

function FileRow({ node, depth, activePath }: { node: TreeNode; depth: number; activePath: string }) {
  const setActiveTab = useChromeStore((s) => s.setActiveTab);
  const openTab = useChromeStore((s) => s.openTab);

  if (isDir(node)) {
    return (
      <>
        <div
          className="text-dim font-code text-code select-none py-[3px] pr-2"
          style={{ paddingLeft: 10 + depth * 14 }}
        >
          ▸ {node.name}
        </div>
        {node.children.map((child) => (
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

  return (
    <button
      onClick={() => { openTab(node.path); setActiveTab(node.path); }}
      className={`flex items-center gap-1.5 w-full py-[3px] pr-2 font-code text-code cursor-pointer text-left border-l-2 ${
        active
          ? "bg-side-hi text-fg-hi border-accent"
          : "bg-transparent text-fg border-transparent"
      }`}
      style={{ paddingLeft: 10 + depth * 14 }}
    >
      <span style={{ color: EXT_COLORS[node.ext], fontSize: 9 }}>●</span>
      {node.name}
    </button>
  );
}

function ExplorerPanel() {
  const activePath = useChromeStore((s) => s.activeTab);
  return (
    <div className="py-1">
      <div className="px-2 pt-1.5 pb-1 text-meta font-ui text-dim uppercase tracking-[0.08em]">
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
  return (
    <div className="px-3 py-2 font-ui text-code text-dim">
      Color Theme
    </div>
  );
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
