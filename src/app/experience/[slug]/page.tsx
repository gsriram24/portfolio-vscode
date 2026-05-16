import { EXPERIENCE } from "@/data/experience";
import { PlaceholderPage } from "@/components/pages/PlaceholderPage";

export function generateStaticParams() {
  return EXPERIENCE.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: `${slug}/index.ts — gsriram.dev` };
}

export default async function ExperienceSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PlaceholderPage tabId={`experience/${slug}/index.ts`} />;
}
