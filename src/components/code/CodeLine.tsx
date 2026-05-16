import { type ReactNode } from "react";

// Design (homepages4.jsx:63-85):
//   row min-height 22 · current-line bg rgba(99,109,130,0.10) + 2px left border accent
//   gutter 36px right-aligned, dim, fontSize 12.5
//   content paddingLeft 18 (base) + indent * 2ch (each indent level = 2 monospace chars)
//   fontSize 13.5, lineHeight 1.65, fg color, white-space pre
//   blame slot pushed right via margin-left auto, gitBlame color, italic, fontSize 11
//
// Deviation from handoff: `current` is driven by click via CodeBlock state.
// Indentation is a semantic `indent` prop (multiplied by 2 monospace chars) instead
// of literal whitespace strings inside the content.
export function CodeLine({
  n,
  blame,
  current,
  indent = 0,
  onClick,
  children,
}: {
  n?: number; // injected by CodeBlock
  blame?: string;
  current?: boolean;
  indent?: number; // 0 = no indent; 1 = 2 monospace chars; 2 = 4 chars; etc.
  onClick?: () => void; // injected by CodeBlock
  children: ReactNode;
}) {
  return (
    <div
      onClick={onClick}
      className={`flex items-baseline min-h-5.5 border-l-2 ${onClick ? "cursor-text" : ""} ${
        current ? "bg-[rgba(99,109,130,0.10)] border-accent" : "border-transparent"
      }`}
    >
      <span className="w-9 shrink-0 text-right font-code text-[12.5px] text-dim select-none">
        {n}
      </span>
      <span
        className="font-code text-[13.5px] leading-[1.65] text-fg whitespace-pre"
        style={{ paddingLeft: `calc(18px + ${indent * 2}ch)` }}
      >
        {children}
      </span>
      {blame && (
        <span
          className="ml-auto pl-4 pr-4 font-code text-meta italic shrink-0"
          style={{ color: "var(--color-git-blame)" }}
        >
          {blame}
        </span>
      )}
    </div>
  );
}
