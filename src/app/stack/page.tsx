import { ViewSwitcher } from "@/components/pages/ViewSwitcher";
import { StackPage } from "@/components/pages/StackPage";
import { StackSource } from "@/components/pages/StackSource";
import { Hint } from "@/components/overlays/Hint";
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
      <Hint
        id="hint-stack"
        text="Switch between 6 colour themes including light mode."
        mobileText="Tap Settings to switch between 6 colour themes including light mode."
        kbd={["Ctrl", "⇧", "Y"]}
      />
      <ViewSwitcher
        source={<StackSource />}
        preview={<StackPage />}
      />
    </>
  );
}
