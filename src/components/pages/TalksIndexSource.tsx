import { CodeBlock, A, C, K, P, S, T, V, type CodeBlockLine } from "@/components/code";
import { TALKS } from "@/data/talks";
import { isUpcoming, formatTalkDate } from "@/lib/talks";
import { timeAgo } from "@/lib/blame";

export function TalksIndexSource() {
  const upcomingCount = TALKS.filter(isUpcoming).length;
  const lines: CodeBlockLine[] = [];

  lines.push({
    content: (
      <>
        <K>import type </K>
        <P>{"{ "}</P>
        <T>Talk</T>
        <P>{" }"}</P>
        <K> from </K>
        <S>&quot;./types&quot;</S>
        <P>;</P>
      </>
    ),
  });
  lines.push({ content: " " });
  lines.push({
    content: <C>{`// talks/index.ts · ${TALKS.length} talks · ${upcomingCount} upcoming · conference + meetup`}</C>,
  });
  lines.push({ content: " " });

  lines.push({
    content: (
      <>
        <K>export const </K>
        <V>talks</V>
        <P>: </P>
        <T>Talk</T>
        <P>{"[] = ["}</P>
      </>
    ),
  });
  TALKS.forEach((t, i) => {
    const isLast = i === TALKS.length - 1;
    const upcoming = isUpcoming(t);
    const meetup = t.links?.find((l) => l.label.toLowerCase().includes("meetup"));

    lines.push({ indent: 1, blame: upcoming ? undefined : timeAgo(t.date), content: <P>{"{"}</P> });
    lines.push({
      indent: 2,
      content: (
        <>
          <A>slug</A>
          <P>: </P>
          <S>&quot;{t.slug}&quot;</S>
          <P>,</P>
        </>
      ),
    });
    lines.push({
      indent: 2,
      content: (
        <>
          <A>status</A>
          <P>: </P>
          <S>&quot;{upcoming ? "upcoming" : "past"}&quot;</S>
          <P>,</P>
        </>
      ),
    });
    lines.push({
      indent: 2,
      content: (
        <>
          <A>event</A>
          <P>: </P>
          <S>&quot;{t.event}&quot;</S>
          <P>,</P>
        </>
      ),
    });
    lines.push({
      indent: 2,
      content: (
        <>
          <A>date</A>
          <P>: </P>
          <S>&quot;{formatTalkDate(t)}&quot;</S>
          <P>,</P>
        </>
      ),
    });
    lines.push({
      indent: 2,
      wrap: true,
      content: (
        <>
          <A>title</A>
          <P>: </P>
          <S>&quot;{t.title}&quot;</S>
          <P>,</P>
        </>
      ),
    });
    if (meetup) {
      lines.push({
        indent: 2,
        content: (
          <>
            <A>meetup</A>
            <P>: </P>
            <S>&quot;{meetup.href}&quot;</S>
            <P>,</P>
          </>
        ),
      });
    }
    lines.push({ indent: 1, content: isLast ? <P>{"}"}</P> : <P>{"}, "}</P> });
  });
  lines.push({ content: <P>{"]"}</P> });

  return <CodeBlock lines={lines} initialCurrent={4} />;
}
