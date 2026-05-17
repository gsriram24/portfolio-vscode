import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { EXPERIENCE } from "@/data/experience";
import { CompanyEntryPreview } from "@/components/pages/CompanyEntryPreview";
import { CompanyEntrySource } from "@/components/pages/CompanyEntrySource";
import { ViewSwitcher } from "@/components/pages/ViewSwitcher";
import { Hint } from "@/components/overlays/Hint";
import { pageMetadata, SITE_URL } from "@/lib/metadata";
import { jsonLd, breadcrumbs } from "@/lib/schema";

export function generateStaticParams() {
  return EXPERIENCE.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const company = EXPERIENCE.find((c) => c.slug === slug);
  if (!company) return {};
  return pageMetadata({
    title: company.companyName,
    description: `G Sriram's work at ${company.companyName} — ${company.roles[0]?.title ?? "Software Engineer"}.`,
    path: `/experience/${slug}`,
    ogParams: {
      title: company.companyName,
      sub: `${company.roles[0]?.title ?? "Engineer"} · ${company.duration}`,
    },
  });
}

const COMPANY_URLS: Record<string, string> = {
  highlevel: "https://www.gohighlevel.com",
  betsol: "https://www.betsol.com",
};

export default async function ExperienceSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = EXPERIENCE.find((c) => c.slug === slug);
  if (!company) notFound();

  const schema = jsonLd(
    breadcrumbs([
      { name: "Experience", path: "/experience" },
      { name: company.companyName, path: `/experience/${slug}` },
    ]),
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/experience/${slug}/#webpage`,
      url: `${SITE_URL}/experience/${slug}/`,
      name: `${company.companyName} · G Sriram`,
      about: { "@id": `${SITE_URL}/#person` },
      mentions: {
        "@type": "Organization",
        name: company.companyName,
        ...(COMPANY_URLS[slug] ? { url: COMPANY_URLS[slug] } : {}),
      },
    }
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      <Hint id="hint-experience" text="Browse work products in the sidebar — each file is a project I shipped here." />
      <ViewSwitcher
        source={<CompanyEntrySource company={company} />}
        preview={<CompanyEntryPreview company={company} />}
      />
    </>
  );
}
