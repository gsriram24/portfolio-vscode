import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { CodeLine } from "./CodeLine";

export function CodeBlock({ children }: { children: ReactNode }) {
  // Auto-inject n={1,2,3,...} into each <CodeLine> child by position.
  // Non-CodeLine elements pass through unchanged and don't bump the counter.
  // Pure reduce — no in-render mutation, React Compiler friendly.
  const numbered = Children.toArray(children).reduce<{ items: ReactNode[]; count: number }>(
    ({ items, count }, child) => {
      if (isValidElement(child) && child.type === CodeLine) {
        const next = count + 1;
        return {
          items: [...items, cloneElement(child as ReactElement<{ n?: number }>, { n: next })],
          count: next,
        };
      }
      return { items: [...items, child], count };
    },
    { items: [], count: 0 },
  ).items;

  return (
    <div className="py-2 overflow-x-auto font-code">
      {numbered}
    </div>
  );
}
