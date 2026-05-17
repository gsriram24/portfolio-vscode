import { CodeBlock, C, K, P, S, T, V, type CodeBlockLine } from "@/components/code";
import { STACK } from "@/data/stack";

export function StackSource() {
  const lines: CodeBlockLine[] = [];

  lines.push({
    content: (
      <>
        <K>import type </K>
        <P>{"{ "}</P>
        <T>Tech</T>
        <P>{" }"}</P>
        <K> from </K>
        <S>&quot;./types&quot;</S>
        <P>;</P>
      </>
    ),
  });
  lines.push({ content: " " });
  lines.push({ content: <C>// stack.ts — tech stack by category</C> });
  lines.push({ content: " " });

  STACK.forEach((cat, i) => {
    lines.push({
      content: (
        <>
          <K>export const </K>
          <V>{cat.id}</V>
          <P>: </P>
          <T>Tech</T>
          <P>{"[] = ["}</P>
          {cat.note && <C>{`  // ${cat.note}`}</C>}
        </>
      ),
    });
    cat.items.forEach((item) => {
      lines.push({ indent: 1, content: <><S>&quot;{item}&quot;</S><P>,</P></> });
    });
    lines.push({ content: <P>{"]"}</P> });
    if (i < STACK.length - 1) lines.push({ content: " " });
  });

  return <CodeBlock lines={lines} initialCurrent={3} />;
}
