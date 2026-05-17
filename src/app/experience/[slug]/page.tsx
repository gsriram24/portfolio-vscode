import { notFound } from "next/navigation";
import { EXPERIENCE } from "@/data/experience";
import { CompanyEntryPreview } from "@/components/pages/CompanyEntryPreview";
import { CompanyEntrySource } from "@/components/pages/CompanyEntrySource";
import { ViewSwitcher } from "@/components/pages/ViewSwitcher";
import { Hint } from "@/components/overlays/Hint";

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
      <Hint id="hint-experience" text="Browse work products in the sidebar — each file is a project I shipped here." />
      <ViewSwitcher
        source={<CompanyEntrySource company={company} />}
        preview={<CompanyEntryPreview company={company} />}
      />
    </>
  );
}
