import { notFound } from "next/navigation";
import { listingProjects, findProject } from "@/lib/projects";
import { ProjectEntryPreview } from "@/components/pages/ProjectEntryPreview";
import { ViewSwitcher } from "@/components/pages/ViewSwitcher";
import { PlaceholderPage } from "@/components/pages/PlaceholderPage";

// Only non-work-product projects render at /projects/[slug]. Work-products
// live under /experience/[co]/[project].
export function generateStaticParams() {
  return listingProjects().map((p) => ({ slug: p.slug }));
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
  const project = findProject(slug);
  if (!project) notFound();
  return (
    <ViewSwitcher
      source={<PlaceholderPage tabId={`projects/${slug}.tsx`} />}
      preview={<ProjectEntryPreview project={project} />}
    />
  );
}
