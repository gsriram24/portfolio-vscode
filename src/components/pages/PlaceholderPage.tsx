import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { type FileExt } from "@/data/files";

// Stub rendered by every non-home route until Phase 6 ships the real page
// templates. Mirrors the sidebar's visual language: extension-colored dot +
// filename in mono. Centered in the editor area.
const EXT_DOT_CLASS: Record<FileExt, string> = {
  tsx: "text-func",
  ts: "text-type",
  md: "text-accent",
  json: "text-string",
};

function extensionOf(tabId: string): FileExt {
  const match = tabId.match(/\.([a-z]+)$/i);
  return ((match?.[1] ?? "ts") as FileExt);
}

export function PlaceholderPage({ tabId }: { tabId: string }) {
  const fileName = tabId.split("/").pop() ?? tabId;
  const ext = extensionOf(tabId);
  const dotClass = EXT_DOT_CLASS[ext] ?? "text-dim";

  return (
    <div className="h-full flex items-center justify-center bg-bg px-6">
      <div className="flex flex-col items-center gap-5 text-center max-w-md">
        <div className="font-code text-ui text-fg-hi">
          <span className={dotClass}>●</span> {fileName}
        </div>
        <p className="font-ui text-body text-dim m-0">
          Coming in Phase 6 — Page Templates.
        </p>
        <Link
          href="/"
          prefetch={false}
          className="inline-flex items-center gap-1.5 font-code text-code text-dim no-underline transition-colors duration-(--duration-fast) ease-vscode hover:text-accent"
        >
          <ArrowLeft size={12} strokeWidth={2.25} aria-hidden />
          back to Sriram.tsx
        </Link>
      </div>
    </div>
  );
}
