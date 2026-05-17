import { PROJECTS } from "./projects";
import { EXPERIENCE } from "./experience";
import { TALKS } from "./talks";
import { isUpcoming } from "@/lib/talks";

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

// Sidebar tree, derived from PROJECTS + EXPERIENCE + TALKS.
//
// Order matches the IA in handoff/README.md:
//   Sriram.tsx · experience/ · projects/ · talks/ · stack.ts · contact.ts
//
// Per-folder rules:
//   experience/<co>/  →  index.ts + each work-product where
//                        company === <co> AND hasDetailPage !== false.
//                        Thin work-products (hasDetailPage:false, e.g. all
//                        Dhiyo projects) are inline-only on the company
//                        page — no sidebar file, no detail page.
//   projects/         →  index.ts + every project where type !== "work-product"
//                        (client + oss + personal — 12 total).
//   talks/            →  index.ts + past talks only. Upcoming talks have
//                        no detail page and no sidebar entry.
export function buildFileTree(): TreeNode[] {
  return [
    { name: "Sriram.tsx", ext: "tsx", path: "Sriram.tsx" },

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
          ...PROJECTS.filter(
            (p) =>
              p.type === "work-product" &&
              p.company === c.slug &&
              p.hasDetailPage !== false,
          ).map((p) => ({
            name: `${p.slug}.tsx`,
            ext: "tsx" as FileExt,
            path: `experience/${c.slug}/${p.slug}.tsx`,
          })),
        ],
      })),
    },

    {
      name: "projects",
      children: [
        { name: "index.ts", ext: "ts", path: "projects/index.ts" },
        ...PROJECTS.filter((p) => p.type !== "work-product").map((p) => ({
          name: `${p.slug}.tsx`,
          ext: "tsx" as FileExt,
          path: `projects/${p.slug}.tsx`,
        })),
      ],
    },

    {
      name: "talks",
      children: [
        { name: "index.ts", ext: "ts", path: "talks/index.ts" },
        // Talk leaves use .tsx (not .ts as in the README IA) — deliberate
        // override for sidebar color consistency. Leaf pages all render
        // yellow (text-func) dots; data-only files render teal. The README
        // listed .ts because each file is "just a data export", but the
        // visual cost outweighs the principle.
        ...TALKS.filter((t) => !isUpcoming(t)).map((t) => ({
          name: `${t.slug}.tsx`,
          ext: "tsx" as FileExt,
          path: `talks/${t.slug}.tsx`,
        })),
      ],
    },

    { name: "stack.ts", ext: "ts", path: "stack.ts" },
    { name: "contact.ts", ext: "ts", path: "contact.ts" },
  ];
}
