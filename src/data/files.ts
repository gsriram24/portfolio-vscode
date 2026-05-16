import { PROJECTS } from "./projects";
import { EXPERIENCE } from "./experience";

export type FileExt = "tsx" | "ts" | "md" | "json";

export interface FileNode {
  name: string;
  ext: FileExt;
  path: string;
}

export interface DirNode {
  name: string;
  children: TreeNode[];
}

export type TreeNode = FileNode | DirNode;

export function isDir(node: TreeNode): node is DirNode {
  return "children" in node;
}

export const EXT_COLORS: Record<FileExt, string> = {
  tsx: "#DCDCAA",
  ts: "#4EC9B0",
  md: "#007ACC",
  json: "#CE9178",
};

export function buildFileTree(): TreeNode[] {
  return [
    { name: "Sriram.tsx", ext: "tsx", path: "Sriram.tsx" },
    {
      name: "projects",
      children: [
        { name: "index.ts", ext: "ts", path: "projects/index.ts" },
        ...PROJECTS.map((p) => ({
          name: `${p.slug}.tsx`,
          ext: "tsx" as FileExt,
          path: `projects/${p.slug}.tsx`,
        })),
      ],
    },
    {
      name: "experience",
      children: EXPERIENCE.map((c) => ({
        name: c.slug,
        children: [
          {
            name: "index.ts",
            ext: "ts" as FileExt,
            path: `experience/${c.slug}/index.ts`,
          },
        ],
      })),
    },
    { name: "stack.ts", ext: "ts", path: "stack.ts" },
    { name: "contact.ts", ext: "ts", path: "contact.ts" },
    {
      name: "talks",
      children: [
        { name: "index.ts", ext: "ts", path: "talks/index.ts" },
      ],
    },
  ];
}
