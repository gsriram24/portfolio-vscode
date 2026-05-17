import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROJECTS } from "@/data/projects";
import { EXPERIENCE } from "@/data/experience";
import { findProject } from "@/lib/projects";
import { ProjectEntryPreview } from "@/components/pages/ProjectEntryPreview";
import { ProjectEntrySource } from "@/components/pages/ProjectEntrySource";
import { ViewSwitcher } from "@/components/pages/ViewSwitcher";
import { pageMetadata, SITE_URL } from "@/lib/metadata";
import { jsonLd, breadcrumbs } from "@/lib/schema";

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
}): Promise<Metadata> {
  const { slug, project: projectSlug } = await params;
  const project = findProject(projectSlug);
  const company = EXPERIENCE.find((c) => c.slug === slug);
  if (!project || !company) return {};
  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/experience/${slug}/${projectSlug}`,
    ogParams: {
      title: project.title,
      sub: `${company.companyName} · ${company.duration}`,
    },
  });
}

export default async function WorkProductPage({
  params,
}: {
  params: Promise<{ slug: string; project: string }>;
}) {
  const { slug, project: projectSlug } = await params;
  const project = findProject(projectSlug);
  const company = EXPERIENCE.find((c) => c.slug === slug);
  if (!project) notFound();

  const schema = jsonLd(
    breadcrumbs([
      { name: "Experience", path: "/experience" },
      { name: company?.companyName ?? slug, path: `/experience/${slug}` },
      { name: project.title, path: `/experience/${slug}/${projectSlug}` },
    ]),
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/experience/${slug}/${projectSlug}/#webpage`,
      url: `${SITE_URL}/experience/${slug}/${projectSlug}/`,
      name: `${project.title} · G Sriram`,
      description: project.summary,
      about: { "@id": `${SITE_URL}/#person` },
      ...(project.stack?.length ? { keywords: project.stack.join(", ") } : {}),
    }
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      <ViewSwitcher
        source={<ProjectEntrySource project={project} />}
        preview={<ProjectEntryPreview project={project} />}
      />
    </>
  );
}
