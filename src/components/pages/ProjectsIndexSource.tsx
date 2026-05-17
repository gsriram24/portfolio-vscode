import { CodeBlock, C, Fn, K, P, S, T, V, type CodeBlockLine } from "@/components/code";
import { PROJECTS } from "@/data/projects";

export function ProjectsIndexSource() {
  const count = PROJECTS.length;
  const lines: CodeBlockLine[] = [];

  lines.push({
    content: (
      <>
        <K>import type </K>
        <P>{"{ "}</P>
        <T>FC</T>
        <P>{" }"}</P>
        <K> from </K>
        <S>&quot;react&quot;</S>
        <P>;</P>
      </>
    ),
  });
  lines.push({
    content: (
      <>
        <K>import </K>
        <P>{"{ "}</P>
        <V>PROJECTS</V>
        <P>{" }"}</P>
        <K> from </K>
        <S>&quot;./data&quot;</S>
        <P>;</P>
      </>
    ),
  });
  lines.push({
    content: (
      <>
        <K>import type </K>
        <P>{"{ "}</P>
        <T>Project</T>
        <P>{" }"}</P>
        <K> from </K>
        <S>&quot;./types&quot;</S>
        <P>;</P>
      </>
    ),
  });
  lines.push({ content: " " });
  lines.push({ content: <C>{`// projects/index.tsx · ${count} projects`}</C> });
  lines.push({ content: " " });

  lines.push({
    content: (
      <>
        <K>const </K>
        <Fn>ProjectsPage</Fn>
        <P>: </P>
        <T>FC</T>
        <P>{" = () => ("}</P>
      </>
    ),
  });
  lines.push({ indent: 1, content: <><P>{"<"}</P><T>Layout</T><P>{">"}</P></> });
  lines.push({ content: " " });
  lines.push({
    indent: 2,
    content: (
      <>
        <P>{"<"}</P>
        <T>ProjectGrid</T>
        <P> </P>
        <V>cols</V>
        <P>{"={3}"}</P>
        <C>{"  // 3-col · desktop"}</C>
        <P>{">"}</P>
      </>
    ),
  });
  lines.push({
    indent: 3,
    content: (
      <>
        <P>{"{"}</P>
        <V>PROJECTS</V>
        <P>.</P>
        <Fn>map</Fn>
        <P>{"(p => ("}</P>
      </>
    ),
  });
  lines.push({
    indent: 4,
    content: (
      <>
        <P>{"<"}</P>
        <T>ProjectCard</T>
        <P> </P>
        <V>key</V>
        <P>{"={p."}</P>
        <V>slug</V>
        <P>{"} "}</P>
        <V>slug</V>
        <P>{"={p."}</P>
        <V>slug</V>
        <P>{"} "}</P>
        <V>name</V>
        <P>{"={p."}</P>
        <V>title</V>
        <P>{"} />"}</P>
      </>
    ),
  });
  lines.push({ indent: 3, content: <P>{"))"}</P> });
  lines.push({ indent: 2, content: <><P>{"</"}</P><T>ProjectGrid</T><P>{">"}</P></> });
  lines.push({ content: " " });
  lines.push({ indent: 1, content: <><P>{"</"}</P><T>Layout</T><P>{">"}</P></> });
  lines.push({ content: <P>{")"}</P> });
  lines.push({ content: " " });
  lines.push({ content: <><K>export default </K><Fn>ProjectsPage</Fn></> });

  return <CodeBlock lines={lines} initialCurrent={3} />;
}
