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
    <div className="py-2 overflow-x-auto font-code">
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
  );
}
