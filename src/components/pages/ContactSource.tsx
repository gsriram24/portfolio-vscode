import { CodeBlock, A, C, Fn, K, P, S, T, V, type CodeBlockLine } from "@/components/code";
import { CONTACT } from "@/data/contact";

export function ContactSource() {
  const lines: CodeBlockLine[] = [];

  lines.push({
    content: (
      <>
        <K>import type </K>
        <P>{"{ "}</P>
        <T>ContactInfo</T>
        <P>{" }"}</P>
        <K> from </K>
        <S>&quot;./types&quot;</S>
        <P>;</P>
      </>
    ),
  });
  lines.push({ content: " " });
  lines.push({ wrap: true, content: <C>// contact.ts — available for Senior IC · Staff roles · freelance enquiries welcome</C> });
  lines.push({ content: " " });

  lines.push({
    content: (
      <>
        <K>export const </K>
        <V>contact</V>
        <P>: </P>
        <T>ContactInfo</T>
        <P>{" = {"}</P>
      </>
    ),
  });
  lines.push({ indent: 1, content: <><A>email</A><P>:    </P><S>&quot;{CONTACT.email}&quot;</S><P>,</P></> });
  lines.push({ indent: 1, content: <><A>github</A><P>:   </P><S>&quot;{CONTACT.github}&quot;</S><P>,</P></> });
  lines.push({ indent: 1, content: <><A>linkedin</A><P>: </P><S>&quot;{CONTACT.linkedin}&quot;</S><P>,</P></> });
  lines.push({ indent: 1, content: <><A>npm</A><P>:      </P><S>&quot;{CONTACT.npm}&quot;</S><P>,</P></> });
  lines.push({ indent: 1, content: <><A>whatsapp</A><P>: </P><S>&quot;{CONTACT.whatsapp}&quot;</S><P>,</P></> });
  lines.push({ content: <P>{"}"}</P> });
  lines.push({ content: " " });

  lines.push({ content: <C>// message form → POST /api/contact</C> });
  lines.push({ content: " " });

  lines.push({
    content: (
      <>
        <K>export const </K>
        <Fn>sendMessage</Fn>
        <P>{" = "}</P>
        <K>async </K>
        <P>{"({ "}</P>
        <A>name</A>
        <P>{", "}</P>
        <A>email</A>
        <P>{", "}</P>
        <A>message</A>
        <P>{" }) => {"}</P>
      </>
    ),
  });
  lines.push({ indent: 1, content: <C>{`// sends to ${CONTACT.email}`}</C> });
  lines.push({
    indent: 1,
    content: (
      <>
        <K>await </K>
        <Fn>fetch</Fn>
        <P>{"("}</P>
        <S>&quot;/api/contact&quot;</S>
        <P>{", {"}</P>
      </>
    ),
  });
  lines.push({ indent: 2, content: <><A>method</A><P>: </P><S>&quot;POST&quot;</S><P>,</P></> });
  lines.push({
    indent: 2,
    wrap: true,
    content: (
      <>
        <A>body</A>
        <P>: </P>
        <T>JSON</T>
        <P>.</P>
        <Fn>stringify</Fn>
        <P>{"({ "}</P>
        <A>name</A>
        <P>{", "}</P>
        <A>email</A>
        <P>{", "}</P>
        <A>message</A>
        <P>{" }),"}</P>
      </>
    ),
  });
  lines.push({ indent: 1, content: <P>{"})"}</P> });
  lines.push({ content: <P>{"}"}</P> });

  return <CodeBlock lines={lines} initialCurrent={4} />;
}
