import { TALKS } from "@/data/talks";
import { isUpcoming } from "@/lib/talks";
import { PlaceholderPage } from "@/components/pages/PlaceholderPage";

export function generateStaticParams() {
  return TALKS.filter((t) => !isUpcoming(t)).map((t) => ({ slug: t.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: `${slug}.tsx — gsriram.dev` };
}

export default async function TalkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PlaceholderPage tabId={`talks/${slug}.tsx`} />;
}
