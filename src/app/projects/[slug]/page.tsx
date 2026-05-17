import { notFound } from "next/navigation";
import { listingProjects, findProject } from "@/lib/projects";
import { ProjectEntryPreview } from "@/components/pages/ProjectEntryPreview";
import { ProjectEntrySource } from "@/components/pages/ProjectEntrySource";
import { ViewSwitcher } from "@/components/pages/ViewSwitcher";

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
      source={<ProjectEntrySource project={project} />}
      preview={<ProjectEntryPreview project={project} />}
    />
  );
}
