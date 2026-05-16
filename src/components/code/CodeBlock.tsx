"use client";

import { useState, type ReactNode } from "react";
import { CodeLine } from "./CodeLine";

export interface CodeBlockLine {
  /** The line's rendered content (syntax-tagged JSX). */
  content: ReactNode;
  /** Optional git-blame slot, pushed to the right edge of the row. */
  blame?: string;
  /** Indent level (0 = none; each level = 2 monospace chars). */
  indent?: number;
}

export function CodeBlock({
  lines,
  initialCurrent,
}: {
  lines: CodeBlockLine[];
  /** 1-based line number to mark as current on first render. */
  initialCurrent?: number;
}) {
  const [currentLine, setCurrentLine] = useState<number | null>(initialCurrent ?? null);

  return (
    <div className="h-full overflow-auto py-2 font-code">
      {/* Inner is sized to the widest line (max-content) but at least viewport (min-w-full).
          All rows inherit this same width → uniform highlight extent across the whole block. */}
      <div className="w-max min-w-full">
        {lines.map((line, i) => {
          const n = i + 1;
          return (
            <CodeLine
              key={n}
              n={n}
              current={n === currentLine}
              indent={line.indent}
              blame={line.blame}
              onClick={() => setCurrentLine(n)}
            >
              {line.content}
            </CodeLine>
          );
        })}
      </div>
    </div>
  );
}
