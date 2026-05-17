import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ViewSwitcher } from "@/components/pages/ViewSwitcher";
import { TalkEntryPreview } from "@/components/pages/TalkEntryPreview";
import { TalkEntrySource } from "@/components/pages/TalkEntrySource";
import { TALKS } from "@/data/talks";
import { findTalk, isUpcoming } from "@/lib/talks";
import { pageMetadata, SITE_URL } from "@/lib/metadata";
import { jsonLd, breadcrumbs } from "@/lib/schema";

export function generateStaticParams() {
  return TALKS.filter((t) => !isUpcoming(t)).map((t) => ({ slug: t.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const talk = findTalk(slug);
  if (!talk) return {};
  return pageMetadata({
    title: talk.title,
    description: talk.description ?? `Talk at ${talk.event} — ${talk.title}`,
    path: `/talks/${slug}`,
    ogParams: {
      title: talk.title,
      sub: `${talk.event} · ${talk.date.getFullYear()}`,
    },
  });
}

export default async function TalkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const talk = findTalk(slug);
  if (!talk || isUpcoming(talk)) notFound();

  const schema = jsonLd(
    breadcrumbs([
      { name: "Talks", path: "/talks" },
      { name: talk.title, path: `/talks/${slug}` },
    ]),
    {
      "@type": "Event",
      "@id": `${SITE_URL}/talks/${slug}/#event`,
      name: talk.title,
      description: talk.description ?? `Talk at ${talk.event}`,
      startDate: talk.date.toISOString(),
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: talk.location,
        address: talk.location,
      },
      performer: { "@id": `${SITE_URL}/#person` },
      organizer: { "@type": "Organization", name: talk.event },
      url: `${SITE_URL}/talks/${slug}/`,
      ...(talk.photo ? { image: `${SITE_URL}${talk.photo}` } : {}),
      ...(talk.recordingUrl
        ? {
            recordingUrl: talk.recordingUrl,
            subjectOf: {
              "@type": "VideoObject",
              name: talk.title,
              embedUrl: talk.recordingUrl.replace("watch?v=", "embed/"),
            },
          }
        : {}),
    }
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      <ViewSwitcher
        source={<TalkEntrySource talk={talk} />}
        preview={<TalkEntryPreview talk={talk} />}
      />
    </>
  );
}
