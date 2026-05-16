import { type ReactNode } from "react";

// Design (homepages4.jsx:63-85):
//   row min-height 22 · current-line bg rgba(99,109,130,0.10) + 2px left border accent
//   gutter 36px right-aligned, dim, fontSize 12.5
//   content paddingLeft 18, fontSize 13.5, lineHeight 1.65, fg color, white-space pre
//   blame slot pushed right via margin-left auto, gitBlame color, italic, fontSize 11
export function CodeLine({
  n,
  blame,
  current,
  children,
}: {
  n?: number; // injected by CodeBlock
  blame?: string;
  current?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex items-baseline min-h-[22px] border-l-2 ${
        current
          ? "bg-[rgba(99,109,130,0.10)] border-accent"
          : "border-transparent"
      }`}
    >
      <span className="w-9 shrink-0 text-right font-code text-[12.5px] text-dim select-none">
        {n}
      </span>
      <span className="pl-[18px] flex-1 font-code text-[13.5px] leading-[1.65] text-fg whitespace-pre">
        {children}
      </span>
      {blame && (
        <span
          className="ml-auto pr-4 font-code text-meta italic shrink-0"
          style={{ color: "var(--color-git-blame)" }}
        >
          {blame}
        </span>
      )}
    </div>
  );
}
