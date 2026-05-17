import { CodeBlock, A, C, Fn, J, K, P, S, T, V, type CodeBlockLine } from "@/components/code";
import type { Company } from "@/data/types";
import { projectsOfCompany } from "@/lib/projects";
import { timeAgo, parseDurationStart } from "@/lib/blame";

export function CompanyEntrySource({ company }: { company: Company }) {
  const projects = projectsOfCompany(company.slug);
  const promotedRole = company.roles.find((r) => r.promoted);
  const exportBlame = timeAgo(parseDurationStart(company.duration));
  const promotedBlame = promotedRole ? timeAgo(parseDurationStart(promotedRole.duration)) : undefined;
  const stackBlame = company.slug === "highlevel"
    ? timeAgo(parseDurationStart(promotedRole!.duration), "added claude")
    : undefined;
  const lines: CodeBlockLine[] = [];

  // ── JSDoc ─────────────────────────────────────────────────────────────
  lines.push({ content: <J>{"/**"}</J> });
  lines.push({
    content: (
      <>
        <J>{" * "}</J>
        <K>@file</K>
        <J>{`    ${company.slug}/index.ts`}</J>
      </>
    ),
  });
  lines.push({
    content: (
      <>
        <J>{" * "}</J>
        <K>@company</K>
        <J>{` ${company.companyName}`}</J>
      </>
    ),
  });
  lines.push({
    content: (
      <>
        <J>{" * "}</J>
        <K>@period</K>
        <J>{`  ${company.duration}`}</J>
      </>
    ),
  });
  lines.push({ content: <J>{" */"}</J> });
  lines.push({ content: " " });

  // ── Import ────────────────────────────────────────────────────────────
  lines.push({
    content: (
      <>
        <K>import type </K>
        <P>{"{ "}</P>
        <T>CompanyEntry</T>
        <P>{" }"}</P>
        <K> from </K>
        <S>&quot;@portfolio/types&quot;</S>
        <P>;</P>
      </>
    ),
  });
  lines.push({ content: " " });

  // ── export const ──────────────────────────────────────────────────────
  lines.push({
    blame: exportBlame,
    content: (
      <>
        <K>export const </K>
        <V>{company.slug}</V>
        <P>: </P>
        <T>CompanyEntry</T>
        <P>{" = {"}</P>
      </>
    ),
  });

  // companyName
  lines.push({
    indent: 1,
    content: (
      <>
        <A>companyName</A>
        <P>: </P>
        <S>&quot;{company.companyName}&quot;</S>
        <P>,</P>
      </>
    ),
  });

  // duration
  lines.push({
    indent: 1,
    content: (
      <>
        <A>duration</A>
        <P>: </P>
        <S>&quot;{company.duration}&quot;</S>
        <P>,</P>
      </>
    ),
  });

  // description
  lines.push({
    indent: 1,
    content: (
      <>
        <A>description</A>
        <P>:</P>
      </>
    ),
  });
  lines.push({
    indent: 2,
    wrap: true,
    content: (
      <>
        <S>&quot;{company.description}&quot;</S>
        <P>,</P>
      </>
    ),
  });
  lines.push({ content: " " });
  // ── roles ─────────────────────────────────────────────────────────────
  lines.push({
    indent: 1,
    content: (
      <>
        <A>roles</A>
        <P>: [</P>
        <C> // newest first</C>
      </>
    ),
  });
  company.roles.forEach((role, i) => {
    const isLast = i === company.roles.length - 1;
    lines.push({ indent: 2, content: <P>{"{"}</P> });
    lines.push({
      indent: 3,
      content: (
        <>
          <A>title</A>
          <P>: </P>
          <S>&quot;{role.title}&quot;</S>
          <P>,</P>
        </>
      ),
    });
    lines.push({
      indent: 3,
      content: (
        <>
          <A>duration</A>
          <P>: </P>
          <S>&quot;{role.duration}&quot;</S>
          <P>,</P>
        </>
      ),
    });
    if (role.promoted) {
      lines.push({
        indent: 3,
        blame: i === 0 ? promotedBlame : undefined,
        content: (
          <>
            <A>promoted</A>
            <P>: </P>
            <K>true</K>
            <P>,</P>
          </>
        ),
      });
    }
    lines.push({ indent: 2, content: isLast ? <P>{"}"}</P> : <P>{"}, "}</P> });
  });
  lines.push({ indent: 1, content: <P>{"],"}</P> });
  lines.push({ content: " " });

  // ── stack ─────────────────────────────────────────────────────────────
  lines.push({
    indent: 1,
    blame: stackBlame,
    content: (
      <>
        <A>stack</A>
        <P>: [</P>
      </>
    ),
  });
  company.stack.forEach((s) => {
    lines.push({
      indent: 2,
      content: (
        <>
          <S>&quot;{s}&quot;</S>
          <P>,</P>
        </>
      ),
    });
  });
  lines.push({ indent: 1, content: <P>{"],"}</P> });

  // ── projects ──────────────────────────────────────────────────────────
  if (projects.length > 0) {
    lines.push({ content: " " });
    lines.push({
      indent: 1,
      content: (
        <>
          <A>projects</A>
          <P>: [</P>
        </>
      ),
    });
    projects.forEach((p) => {
      lines.push({
        indent: 2,
        content: (
          <>
            <P>{"{ "}</P>
            <A>slug</A>
            <P>: </P>
            <S>&quot;{p.slug}&quot;</S>
            <P>, </P>
            <A>title</A>
            <P>: </P>
            <S>&quot;{p.title}&quot;</S>
            <P>{" },"}</P>
          </>
        ),
      });
    });
    lines.push({ indent: 1, content: <P>{"],"}</P> });
  }

  // ── awards (conditional) ──────────────────────────────────────────────
  if (company.awards?.length) {
    lines.push({ content: " " });
    lines.push({
      indent: 1,
      content: (
        <>
          <A>awards</A>
          <P>: [</P>
        </>
      ),
    });
    company.awards.forEach((award, i) => {
      const isLast = i === company.awards!.length - 1;
      lines.push({ indent: 2, content: <P>{"{"}</P> });
      lines.push({
        indent: 3,
        content: (
          <>
            <A>title</A>
            <P>: </P>
            <S>&quot;{award.title}&quot;</S>
            <P>,</P>
          </>
        ),
      });
      lines.push({
        indent: 3,
        content: (
          <>
            <A>date</A>
            <P>: </P>
            <S>&quot;{award.date}&quot;</S>
            <P>,</P>
          </>
        ),
      });
      lines.push({ indent: 2, content: isLast ? <P>{"}"}</P> : <P>{"}, "}</P> });
    });
    lines.push({ indent: 1, content: <P>{"],"}</P> });
  }

  // ── responsibilities (conditional) ────────────────────────────────────
  if (company.responsibilities?.length) {
    lines.push({ content: " " });
    lines.push({
      indent: 1,
      content: (
        <>
          <A>responsibilities</A>
          <P>: [</P>
        </>
      ),
    });
    company.responsibilities.forEach((r, i) => {
      const isLast = i === company.responsibilities!.length - 1;
      lines.push({ indent: 2, content: <P>{"{"}</P> });
      lines.push({
        indent: 3,
        content: (
          <>
            <A>title</A>
            <P>: </P>
            <S>&quot;{r.title}&quot;</S>
            <P>,</P>
          </>
        ),
      });
      lines.push({
        indent: 3,
        content: (
          <>
            <A>duration</A>
            <P>: </P>
            <S>&quot;{r.duration}&quot;</S>
            <P>,</P>
          </>
        ),
      });
      lines.push({ indent: 2, content: isLast ? <P>{"}"}</P> : <P>{"}, "}</P> });
    });
    lines.push({ indent: 1, content: <P>{"],"}</P> });
  }

  // ── close object ──────────────────────────────────────────────────────
  lines.push({ content: <P>{"}"}</P> });
  lines.push({ content: " " });

  // ── export default function ───────────────────────────────────────────
  lines.push({
    content: (
      <>
        <K>export default function </K>
        <Fn>{company.companyName}</Fn>
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
        <T>CompanyProfile</T>
        <P> </P>
        <A>data</A>
        <P>{"={"}</P>
        <V>{company.slug}</V>
        <P>{"} />;"}</P>
      </>
    ),
  });
  lines.push({ content: <P>{"}"}</P> });

  return <CodeBlock lines={lines} initialCurrent={9} />;
}
