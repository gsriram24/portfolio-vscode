import { ViewSwitcher } from "@/components/pages/ViewSwitcher";
import { ProjectsGrid } from "@/components/pages/ProjectsGrid";
import { ProjectsIndexSource } from "@/components/pages/ProjectsIndexSource";
import { ProjectsHint } from "@/components/pages/ProjectsHint";

export const metadata = { title: "projects — gsriram.dev" };

export default function ProjectsIndexPage() {
  return (
    <>
      <ProjectsHint />
      <ViewSwitcher
        source={<ProjectsIndexSource />}
        preview={<ProjectsGrid />}
      />
    </>
  );
}
