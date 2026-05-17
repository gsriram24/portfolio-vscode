import { notFound } from "next/navigation";
import { PROJECTS } from "@/data/projects";
import { findProject } from "@/lib/projects";
import { ProjectEntryPreview } from "@/components/pages/ProjectEntryPreview";
import { ViewSwitcher } from "@/components/pages/ViewSwitcher";
import { PlaceholderPage } from "@/components/pages/PlaceholderPage";

// Work-product detail page. Only generated for work-products that opted
// into a detail page (hasDetailPage !== false). Thin work-products
// (typically Dhiyo's two minor projects) stay inline on the company page.
export function generateStaticParams() {
  return PROJECTS.filter(
    (p) => p.type === "work-product" && p.hasDetailPage !== false,
  ).map((p) => ({ slug: p.company!, project: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; project: string }>;
}) {
  const { project } = await params;
  return { title: `${project}.tsx — gsriram.dev` };
}

export default async function WorkProductPage({
  params,
}: {
  params: Promise<{ slug: string; project: string }>;
}) {
  const { slug, project: projectSlug } = await params;
  const project = findProject(projectSlug);
  if (!project) notFound();
  return (
    <ViewSwitcher
      source={<PlaceholderPage tabId={`experience/${slug}/${projectSlug}.tsx`} />}
      preview={<ProjectEntryPreview project={project} />}
    />
  );
}
