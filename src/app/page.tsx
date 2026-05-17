import { ViewSwitcher } from "@/components/pages/ViewSwitcher";
import { SriramPreview } from "@/components/pages/sriram-preview";
import { SriramSource } from "@/components/pages/sriram-source";
import { Hint } from "@/components/overlays/Hint";
import type { Metadata } from "next";
import { pageMetadata, SITE_URL } from "@/lib/metadata";
import { jsonLd } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  ogParams: { title: "G Sriram", sub: "SDE-III · HighLevel · Bengaluru" },
});

export default function HomePage() {
  const schema = jsonLd({
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profilepage`,
    url: SITE_URL,
    name: "G Sriram | Software Engineer",
    dateCreated: "2021-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    inLanguage: "en",
    mainEntity: { "@id": `${SITE_URL}/#person` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schema }}
      />
      <Hint id="hint-home" text="Hit </> to see this page as a TypeScript file." />
      <ViewSwitcher source={<SriramSource />} preview={<SriramPreview />} />
    </>
  );
}
