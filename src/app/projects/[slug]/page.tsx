import { PROJECTS } from "@/data/projects";
import { PlaceholderPage } from "@/components/pages/PlaceholderPage";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: `${slug}.tsx — gsriram.dev` };
}

export default async function ProjectSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PlaceholderPage tabId={`projects/${slug}.tsx`} />;
}
