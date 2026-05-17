import { ViewSwitcher } from "@/components/pages/ViewSwitcher";
import { TalksGrid } from "@/components/pages/TalksGrid";
import { TalksIndexSource } from "@/components/pages/TalksIndexSource";
import { pageMetadata } from "@/lib/metadata";

import type { Metadata } from "next";
export const metadata: Metadata = pageMetadata({
  title: "Talks",
  description: "Conference talks and meetup presentations by G Sriram.",
  path: "/talks",
  ogParams: { title: "Talks", sub: "Conference talks · Meetups" },
});

export default function TalksIndexPage() {
  return (
    <ViewSwitcher
      source={<TalksIndexSource />}
      preview={<TalksGrid />}
    />
  );
}
