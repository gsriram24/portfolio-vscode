import { notFound } from "next/navigation";
import { EXPERIENCE } from "@/data/experience";
import { CompanyEntryPreview } from "@/components/pages/CompanyEntryPreview";
import { CompanyEntrySource } from "@/components/pages/CompanyEntrySource";
import { ViewSwitcher } from "@/components/pages/ViewSwitcher";
import { ExperienceHint } from "@/components/pages/ExperienceHint";

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
  const company = EXPERIENCE.find((c) => c.slug === slug);
  if (!company) notFound();
  return (
    <>
      <ExperienceHint />
      <ViewSwitcher
        source={<CompanyEntrySource company={company} />}
        preview={<CompanyEntryPreview company={company} />}
      />
    </>
  );
}
