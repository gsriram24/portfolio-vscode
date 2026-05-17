import { ViewSwitcher } from "@/components/pages/ViewSwitcher";
import { ContactPage } from "@/components/pages/ContactPage";
import { ContactSource } from "@/components/pages/ContactSource";
import { pageMetadata } from "@/lib/metadata";

import type { Metadata } from "next";
export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Get in touch with G Sriram — email, GitHub, LinkedIn, or WhatsApp.",
  path: "/contact",
  ogParams: { title: "Contact", sub: "gsriram2403@gmail.com · gsriram.dev" },
});

export default function ContactPageRoute() {
  return (
    <ViewSwitcher
      source={<ContactSource />}
      preview={<ContactPage />}
    />
  );
}
