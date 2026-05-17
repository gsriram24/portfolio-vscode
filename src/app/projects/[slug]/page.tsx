import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { listingProjects, findProject } from "@/lib/projects";
import { ProjectEntryPreview } from "@/components/pages/ProjectEntryPreview";
import { ProjectEntrySource } from "@/components/pages/ProjectEntrySource";
import { ViewSwitcher } from "@/components/pages/ViewSwitcher";
import { pageMetadata, SITE_URL } from "@/lib/metadata";
import { jsonLd, breadcrumbs } from "@/lib/schema";

export function generateStaticParams() {
  return listingProjects().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${slug}`,
    ogParams: {
      title: project.title,
      sub: project.type === "oss" ? "Open Source · gsriram.dev" : "Client Project · gsriram.dev",
    },
  });
}

export default async function ProjectSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  const isOss = project.type === "oss";
  const repoLink = project.links?.find((l) => l.href.includes("github.com"))?.href;

  const projectSchema = isOss
    ? {
        "@type": "SoftwareSourceCode",
        "@id": `${SITE_URL}/projects/${slug}/#sourcecode`,
        name: project.title,
        description: project.summary,
        author: { "@id": `${SITE_URL}/#person` },
        url: `${SITE_URL}/projects/${slug}/`,
        ...(repoLink ? { codeRepository: repoLink, sameAs: repoLink } : {}),
        ...(project.stack?.[0] ? { programmingLanguage: { "@type": "ComputerLanguage", name: project.stack[0] } } : {}),
        ...(project.stack?.length ? { keywords: project.stack.join(", ") } : {}),
      }
    : {
        "@type": "CreativeWork",
        "@id": `${SITE_URL}/projects/${slug}/#work`,
        name: project.title,
        description: project.summary,
        creator: { "@id": `${SITE_URL}/#person` },
        author: { "@id": `${SITE_URL}/#person` },
        url: `${SITE_URL}/projects/${slug}/`,
        ...(project.stack?.length ? { keywords: project.stack.join(", ") } : {}),
      };

  const schema = jsonLd(
    breadcrumbs([
      { name: "Projects", path: "/projects" },
      { name: project.title, path: `/projects/${slug}` },
    ]),
    projectSchema
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
