import { buildFileTree, isDir, type TreeNode } from "@/data/files";

// Bidirectional map between chrome tab IDs (file paths) and URL paths.
// Tab IDs come from src/data/files.ts (e.g. "projects/schema-markup.tsx").
//
// Rule (single, applies to every leaf in the tree):
//   1. Strip the `.<ext>` suffix.
//   2. If the basename is "index", strip that too (folder route).
//   3. Special-case: the home file "Sriram.tsx" maps to "/".
//   4. Empty result → "/".
//
// Both maps are built once at module load by walking buildFileTree(),
// so adding/renaming/removing entries in files.ts auto-updates routes.
// No per-folder hardcoding — works for future categories like "writing/"
// or new leaf files like "blog.tsx" without code changes here.

const HOME_TAB_ID = "Sriram.tsx";
const HOME_PATH = "/";

function tabIdToPath(tabId: string): string {
  if (tabId === HOME_TAB_ID) return HOME_PATH;
  const withoutExt = tabId.replace(/\.[a-z0-9]+$/i, "");
  const withoutIndex = withoutExt.replace(/\/index$/, "");
  return withoutIndex ? `/${withoutIndex}` : HOME_PATH;
}

function collectLeafTabIds(nodes: TreeNode[], out: string[] = []): string[] {
  for (const node of nodes) {
    if (isDir(node)) collectLeafTabIds(node.children, out);
    else out.push(node.path);
  }
  return out;
}

const TAB_TO_PATH = new Map<string, string>();
const PATH_TO_TAB = new Map<string, string>();

for (const tabId of collectLeafTabIds(buildFileTree())) {
  const path = tabIdToPath(tabId);
  TAB_TO_PATH.set(tabId, path);
  PATH_TO_TAB.set(path, tabId);
}

export function pathFor(tabId: string): string {
  return TAB_TO_PATH.get(tabId) ?? HOME_PATH;
}

export function pathToTabId(pathname: string): string | null {
  const normalized = pathname.replace(/\/+$/, "") || HOME_PATH;
  return PATH_TO_TAB.get(normalized) ?? null;
}

export function allRoutes(): string[] {
  return Array.from(PATH_TO_TAB.keys());
}
