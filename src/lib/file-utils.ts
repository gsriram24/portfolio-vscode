import { type FileExt } from "@/data/files";

export function fileExt(path: string): FileExt {
  return (path.split(".").pop() ?? "ts") as FileExt;
}

export function fileLabel(path: string): string {
  const parts = path.split("/");
  const leaf = parts[parts.length - 1] ?? path;
  if (/^index\.[a-z]+$/i.test(leaf) && parts.length >= 2) {
    return `${parts[parts.length - 2]}/${leaf}`;
  }
  return leaf;
}
