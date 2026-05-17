import { ViewSwitcher } from "@/components/pages/ViewSwitcher";
import { StackPage } from "@/components/pages/StackPage";
import { StackSource } from "@/components/pages/StackSource";
import { ThemeHint } from "@/components/overlays/ThemeHint";
import { pageMetadata } from "@/lib/metadata";

import type { Metadata } from "next";
export const metadata: Metadata = pageMetadata({
  title: "Stack",
  description: "Technologies G Sriram works with — Vue, React, Node, NestJS, TypeScript, and more.",
  path: "/stack",
  ogParams: { title: "Stack", sub: "Vue · React · Node · NestJS · TypeScript" },
});

export default function StackPageRoute() {
  return (
    <>
      <ThemeHint />
      <ViewSwitcher
        source={<StackSource />}
        preview={<StackPage />}
      />
    </>
  );
}
