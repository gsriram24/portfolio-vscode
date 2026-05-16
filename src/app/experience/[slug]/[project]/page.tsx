import { PROJECTS } from "@/data/projects";
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
  const { slug, project } = await params;
  return <PlaceholderPage tabId={`experience/${slug}/${project}.tsx`} />;
}
