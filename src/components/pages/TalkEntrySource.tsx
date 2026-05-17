import { CodeBlock, A, C, K, P, S, T, V, type CodeBlockLine } from "@/components/code";
import type { TalkEntry } from "@/data/types";
import { isUpcoming, formatTalkDate } from "@/lib/talks";

export function TalkEntrySource({ talk: t }: { talk: TalkEntry }) {
  const upcoming = isUpcoming(t);
  const meetup = t.links?.find((l) => l.label.toLowerCase().includes("meetup"));
  const lines: CodeBlockLine[] = [];

  lines.push({
    content: (
      <>
        <K>import type </K>
        <P>{"{ "}</P>
        <T>Talk</T>
        <P>{" }"}</P>
        <K> from </K>
        <S>&quot;../types&quot;</S>
        <P>;</P>
      </>
    ),
  });
  lines.push({ content: " " });
  lines.push({ content: <C>{`// talks/${t.slug}.ts · individual talk page`}</C> });
  lines.push({ content: <C>// all fields optional except slug, event, title, date</C> });
  lines.push({ content: " " });

  lines.push({
    content: (
      <>
        <K>export const </K>
        <V>talk</V>
        <P>: </P>
        <T>Talk</T>
        <P>{" = {"}</P>
      </>
    ),
  });
  lines.push({ indent: 1, content: <><A>slug</A><P>:      </P><S>&quot;{t.slug}&quot;</S><P>,</P></> });
  lines.push({ indent: 1, content: <><A>status</A><P>:    </P><S>&quot;{upcoming ? "upcoming" : "past"}&quot;</S><P>,</P></> });
  lines.push({ indent: 1, content: <><A>event</A><P>:     </P><S>&quot;{t.event}&quot;</S><P>,</P></> });
  lines.push({ indent: 1, content: <><A>title</A><P>:     </P><S>&quot;{t.title}&quot;</S><P>,</P></> });
  lines.push({ indent: 1, content: <><A>date</A><P>:      </P><S>&quot;{formatTalkDate(t)}&quot;</S><P>,</P></> });
  lines.push({ indent: 1, content: <><A>location</A><P>:  </P><S>&quot;{t.location}&quot;</S><P>,</P></> });
  lines.push({ content: " " });

  if (t.description) {
    lines.push({ indent: 1, content: <><A>description</A><P>:</P></> });
    lines.push({ indent: 2, wrap: true, content: <><S>&quot;{t.description}&quot;</S><P>,</P></> });
    lines.push({ content: " " });
  }

  if (t.photo) {
    lines.push({ indent: 1, content: <><A>photo</A><P>:     </P><S>&quot;{t.photo}&quot;</S><P>,</P></> });
  }
  if (meetup) {
    lines.push({ indent: 1, content: <><A>meetup</A><P>:    </P><S>&quot;{meetup.href}&quot;</S><P>,</P></> });
  }

  if (t.slidesUrl) {
    lines.push({ indent: 1, content: <><A>slides</A><P>:    </P><S>&quot;{t.slidesUrl}&quot;</S><P>,</P></> });
  } else {
    lines.push({ indent: 1, content: <><A>slides</A><P>:    </P><K>null</K><P>,</P><C>  // ← null → no slides section</C></> });
  }

  if (t.recordingUrl) {
    lines.push({ indent: 1, content: <><A>recording</A><P>: </P><S>&quot;{t.recordingUrl}&quot;</S><P>,</P></> });
  } else {
    lines.push({ indent: 1, content: <><A>recording</A><P>: </P><K>null</K><P>,</P><C>  // ← null → no recording embed</C></> });
  }

  lines.push({ content: <P>{"}"}</P> });

  return <CodeBlock lines={lines} initialCurrent={5} />;
}
