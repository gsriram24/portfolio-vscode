import { ViewSwitcher } from "@/components/pages/ViewSwitcher";
import { ProjectsGrid } from "@/components/pages/ProjectsGrid";
import { ProjectsIndexSource } from "@/components/pages/ProjectsIndexSource";
import { Hint } from "@/components/overlays/Hint";
import { pageMetadata } from "@/lib/metadata";

import type { Metadata } from "next";
export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description: "Open source projects, client work, and side projects by G Sriram.",
  path: "/projects",
  ogParams: { title: "Projects", sub: "OSS · Client work · Side projects" },
});

export default function ProjectsIndexPage() {
  return (
    <>
      <Hint id="hint-projects" text="Press Ctrl P to jump to any project or file by name." kbd={["Ctrl", "P"]} />
      <ViewSwitcher
        source={<ProjectsIndexSource />}
        preview={<ProjectsGrid />}
      />
    </>
  );
}
