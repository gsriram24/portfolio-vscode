import { CodeBlock, A, C, Fn, J, K, P, S, T, V, type CodeBlockLine } from "@/components/code";
import type { ProjectEntry } from "@/data/types";
import { EXPERIENCE } from "@/data/experience";

const TYPE_LABEL: Record<string, string> = {
  "work-product": "Work",
  client: "Client",
  oss: "Open Source",
  personal: "Personal",
};

function toCamelCase(slug: string) {
  return slug.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}

export function ProjectEntrySource({ project: p }: { project: ProjectEntry }) {
  const lines: CodeBlockLine[] = [];
  const fnName = toCamelCase(p.slug);
  const isWorkProduct = p.type === "work-product";
  const company = isWorkProduct ? EXPERIENCE.find((e) => e.slug === p.company) : undefined;
  const filePath = isWorkProduct
    ? `experience/${p.company}/${p.slug}.tsx`
    : `projects/${p.slug}.tsx`;

  // ── JSDoc ─────────────────────────────────────────────────────────────
  lines.push({ content: <J>{"/**"}</J> });
  lines.push({ content: <><J>{" * "}</J><K>@file</K><J>{`    ${filePath}`}</J></> });
  if (company) {
    lines.push({ content: <><J>{" * "}</J><K>@client</K><J>{`  ${company.companyName}`}</J></> });
  }
  if (p.tags?.length) {
    lines.push({ content: <><J>{" * "}</J><K>@scope</K><J>{`   ${p.tags.join(" · ")}`}</J></> });
  }
  lines.push({ content: <J>{" */"}</J> });

  lines.push({
    content: (
      <>
        <K>import type </K>
        <P>{"{ "}</P>
        <T>ProjectEntry</T>
        <P>{", "}</P>
        <T>ProjectLink</T>
        <P>{" }"}</P>
        <K> from </K>
        <S>&quot;@portfolio/types&quot;</S>
        <P>;</P>
      </>
    ),
  });
  lines.push({ content: " " });

  lines.push({
    content: (
      <>
        <K>export const </K>
        <V>{p.slug}</V>
        <P>: </P>
        <T>ProjectEntry</T>
        <P>{" = {"}</P>
      </>
    ),
  });

  lines.push({ indent: 1, content: <><A>title</A><P>:    </P><S>&quot;{p.title}&quot;</S><P>,</P></> });
  lines.push({ indent: 1, content: <><A>badge</A><P>:    </P><S>&quot;{TYPE_LABEL[p.type] ?? p.type}&quot;</S><P>,</P></> });
  if (p.duration) {
    lines.push({ indent: 1, content: <><A>duration</A><P>: </P><S>&quot;{p.duration}&quot;</S><P>,</P></> });
  }
  if (p.tags?.length) {
    lines.push({ indent: 1, content: <><A>scope</A><P>:    </P><S>&quot;{p.tags.join(" · ")}&quot;</S><P>,</P></> });
  }
  lines.push({ content: " " });

  if (p.impact?.length) {
    lines.push({ indent: 1, content: <><A>impact</A><P>: [</P><C>  // shown as stat cards</C></> });
    p.impact.forEach((m, i) => {
      const isLast = i === p.impact!.length - 1;
      lines.push({ indent: 2, content: <P>{"{"}</P> });
      lines.push({ indent: 3, content: <><A>value</A><P>: </P><S>&quot;{m.value}&quot;</S><P>,</P></> });
      lines.push({ indent: 3, content: <><A>label</A><P>: </P><S>&quot;{m.label}&quot;</S><P>,</P></> });
      lines.push({ indent: 2, content: isLast ? <P>{"}"}</P> : <P>{"}, "}</P> });
    });
    lines.push({ indent: 1, content: <P>{"],"}</P> });
    lines.push({ content: " " });
  }

  lines.push({ indent: 1, content: <><A>description</A><P>:</P></> });
  lines.push({ indent: 2, wrap: true, content: <><S>&quot;{p.description}&quot;</S><P>,</P></> });
  lines.push({ content: " " });

  if (p.highlights?.length) {
    lines.push({ indent: 1, content: <><A>highlights</A><P>: [</P></> });
    p.highlights.forEach((h) => {
      lines.push({ indent: 2, content: <><S>&quot;{h}&quot;</S><P>,</P></> });
    });
    lines.push({ indent: 1, content: <P>{"],"}</P> });
    lines.push({ content: " " });
  }

  if (p.images?.length) {
    lines.push({ indent: 1, content: <><A>images</A><P>: [</P></> });
    p.images.forEach((img) => {
      lines.push({ indent: 2, content: <><S>&quot;{img}&quot;</S><P>,</P></> });
    });
    lines.push({ indent: 1, content: <P>{"],"}</P> });
    lines.push({ content: " " });
  }

  if (p.testimonial) {
    lines.push({ indent: 1, content: <><A>testimonial</A><P>: {"{"}</P></> });
    lines.push({ indent: 2, wrap: true, content: <><A>quote</A><P>:  </P><S>&quot;{p.testimonial.quote}&quot;</S><P>,</P></> });
    lines.push({ indent: 2, content: <><A>author</A><P>: </P><S>&quot;{p.testimonial.author}&quot;</S><P>,</P></> });
    lines.push({ indent: 2, content: <><A>role</A><P>:   </P><S>&quot;{p.testimonial.role}&quot;</S><P>,</P></> });
    lines.push({ indent: 1, content: <P>{"  },"}</P> });
    lines.push({ content: " " });
  }

  if (p.stack?.length) {
    lines.push({ indent: 1, content: <><A>stack</A><P>: [</P></> });
    p.stack.forEach((s) => {
      lines.push({ indent: 2, content: <><S>&quot;{s}&quot;</S><P>,</P></> });
    });
    lines.push({ indent: 1, content: <P>{"],"}</P> });
    lines.push({ content: " " });
  }

  if (p.links?.length) {
    lines.push({ indent: 1, content: <><A>links</A><P>: [</P><C>  // primary: true → filled CTA</C></> });
    p.links.forEach((l, i) => {
      const isLast = i === p.links!.length - 1;
      lines.push({ indent: 2, content: <P>{"{"}</P> });
      lines.push({ indent: 3, content: <><A>label</A><P>: </P><S>&quot;{l.label}&quot;</S><P>,</P></> });
      lines.push({ indent: 3, content: <><A>href</A><P>:  </P><S>&quot;{l.href}&quot;</S><P>,</P></> });
      if (l.primary) {
        lines.push({ indent: 3, content: <><A>primary</A><P>: </P><K>true</K><P>,</P></> });
      }
      lines.push({ indent: 2, content: isLast ? <P>{"}"}</P> : <P>{"}, "}</P> });
    });
    lines.push({ indent: 1, content: <P>{"],"}</P> });
  }

  lines.push({ content: <><P>{"}"}</P><P>{";"}</P></> });
  lines.push({ content: " " });

  lines.push({
    content: (
      <>
        <K>export default function </K>
        <Fn>{fnName}</Fn>
        <P>{"() {"}</P>
      </>
    ),
  });
  lines.push({
    indent: 1,
    content: (
      <>
        <K>return </K>
        <P>{"<"}</P>
        <T>ProjectEntry</T>
        <P> </P>
        <A>data</A>
        <P>{"={"}</P>
        <V>{p.slug}</V>
        <P>{"} />;"}</P>
      </>
    ),
  });
  lines.push({ content: <P>{"}"}</P> });

  return <CodeBlock lines={lines} initialCurrent={2} />;
}
