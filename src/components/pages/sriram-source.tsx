import { CodeBlock, A, Fn, J, K, P, S, T, V, type CodeBlockLine } from "@/components/code";
import { SRIRAM } from "@/data/sriram";

// Source view = `Sriram.tsx` body per homepages4.jsx:233-269.
// - All data values flow from SRIRAM (SSOT).
// - Indentation: `indent` prop on each line (no whitespace strings).
// - Inter-token spaces: embedded *inside* the token text (e.g. <K>import </K>),
//   so JSX-whitespace collapse rules never matter.
// - Blame + initial current-line are props per line.
const LINES: CodeBlockLine[] = [
  { content: <J>{"/**"}</J> },
  {
    content: (
      <>
        <J>{" * "}</J>
        <K>@author</K>
        <J>{`  ${SRIRAM.author}`}</J>
      </>
    ),
  },
  {
    content: (
      <>
        <J>{" * "}</J>
        <K>@since</K>
        <J>{`   ${SRIRAM.since}`}</J>
      </>
    ),
  },
  {
    content: (
      <>
        <J>{" * "}</J>
        <K>@open</K>
        <J>{`    ${SRIRAM.open}`}</J>
      </>
    ),
  },
  {
    content: (
      <>
        <J>{" * "}</J>
        <K>@reach</K>
        <J>{`   ${SRIRAM.reach}`}</J>
      </>
    ),
  },
  { content: <J>{" */"}</J> },
  {
    content: (
      <>
        <K>import </K>
        <P>{"{ "}</P>
        <T>Engineer</T>
        <P>, </P>
        <K>type </K>
        <T>Role</T>
        <P>{" }"}</P>
        <K> from </K>
        <S>&quot;@portfolio/types&quot;</S>
        <P>;</P>
      </>
    ),
  },
  {
    blame: "you · 4y ago",
    content: (
      <>
        <K>import </K>
        <P>{"{ "}</P>
        <T>HighLevel</T>
        <P>, </P>
        <T>BETSOL</T>
        <P>, </P>
        <T>Dhiyo</T>
        <P>{" }"}</P>
        <K> from </K>
        <S>&quot;@/companies&quot;</S>
        <P>;</P>
      </>
    ),
  },
  {
    content: (
      <>
        <K>import </K>
        <P>{"{ "}</P>
        <T>Bengaluru</T>
        <P>{" }"}</P>
        <K> from </K>
        <S>&quot;@/places&quot;</S>
        <P>;</P>
      </>
    ),
  },
  { content: " " }, // blank line
  {
    content: (
      <>
        <K>export default function </K>
        <Fn>Sriram</Fn>
        <P>(): </P>
        <T>Engineer</T>
        <P> {"{"}</P>
      </>
    ),
  },
  {
    indent: 1,
    blame: "you · 2y ago",
    content: (
      <>
        <K>const </K>
        <V>role</V>
        <P>: </P>
        <T>Role</T>
        <P> = </P>
        <S>&quot;{SRIRAM.role}&quot;</S>
        <P>;</P>
      </>
    ),
  },
  {
    indent: 1,
    content: (
      <>
        <K>const </K>
        <V>stack</V>
        <P> = [</P>
        {SRIRAM.stack.map((s, i) => (
          <span key={s}>
            <S>&quot;{s}&quot;</S>
            {i < SRIRAM.stack.length - 1 && <P>, </P>}
          </span>
        ))}
        <P>];</P>
      </>
    ),
  },
  { content: " " },
  {
    indent: 1,
    blame: "you · 2h ago · ship v2",
    content: (
      <>
        <K>const </K>
        <P>[</P>
        <V>shipping</V>
        <P>, </P>
        <V>setShipping</V>
        <P>] = </P>
        <Fn>useState</Fn>
        <P>([</P>
      </>
    ),
  },
  ...SRIRAM.shipping.map<CodeBlockLine>((s) => ({
    indent: 2,
    content: (
      <>
        <S>&quot;{s}&quot;</S>
        <P>,</P>
      </>
    ),
  })),
  { indent: 1, content: <P>{"]);"}</P> },
  { content: " " },
  {
    indent: 1,
    content: (
      <>
        <K>return</K>
        <P> (</P>
      </>
    ),
  },
  {
    indent: 2,
    content: (
      <>
        <P>&lt;</P>
        <T>Person</T>
      </>
    ),
  },
  {
    indent: 3,
    content: (
      <>
        <A>name</A>
        <P>=</P>
        <P>{"{"}</P>
        <S>&quot;{SRIRAM.author}&quot;</S>
        <P>{"}"}</P>
      </>
    ),
  },
  {
    indent: 3,
    content: (
      <>
        <A>role</A>
        <P>=</P>
        <P>{"{"}</P>
        <V>role</V>
        <P>{"}"}</P>
      </>
    ),
  },
  {
    indent: 3,
    content: (
      <>
        <A>at</A>
        <P>=</P>
        <P>{"{"}</P>
        <T>{SRIRAM.company}</T>
        <P>{"}"}</P>
      </>
    ),
  },
  {
    indent: 3,
    content: (
      <>
        <A>shipping</A>
        <P>=</P>
        <P>{"{"}</P>
        <V>shipping</V>
        <P>{"}"}</P>
      </>
    ),
  },
  {
    indent: 3,
    content: (
      <>
        <A>reach</A>
        <P>=</P>
        <P>{"{"}</P>
        <S>&quot;{SRIRAM.reach}&quot;</S>
        <P>{"}"}</P>
      </>
    ),
  },
  { indent: 2, content: <P>/&gt;</P> },
  { indent: 1, content: <P>);</P> },
  { content: <P>{"}"}</P> },
];

export function SriramSource() {
  return <CodeBlock initialCurrent={15} lines={LINES} />;
}
