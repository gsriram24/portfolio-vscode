import { notFound } from "next/navigation";
import { ViewSwitcher } from "@/components/pages/ViewSwitcher";
import { TalkEntryPreview } from "@/components/pages/TalkEntryPreview";
import { PlaceholderPage } from "@/components/pages/PlaceholderPage";
import { TALKS } from "@/data/talks";
import { findTalk, isUpcoming } from "@/lib/talks";

export function generateStaticParams() {
  return TALKS.filter((t) => !isUpcoming(t)).map((t) => ({ slug: t.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const talk = findTalk(slug);
  return { title: `${talk?.event ?? slug} — gsriram.dev` };
}

export default async function TalkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const talk = findTalk(slug);
  if (!talk || isUpcoming(talk)) notFound();

  return (
    <ViewSwitcher
      source={<PlaceholderPage tabId={`talks/${slug}.tsx`} />}
      preview={<TalkEntryPreview talk={talk} />}
    />
  );
}
