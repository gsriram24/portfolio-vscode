import { ViewSwitcher } from "@/components/pages/ViewSwitcher";
import { ProjectsGrid } from "@/components/pages/ProjectsGrid";
import { ProjectsIndexSource } from "@/components/pages/ProjectsIndexSource";

export const metadata = { title: "projects — gsriram.dev" };

export default function ProjectsIndexPage() {
  return (
    <ViewSwitcher
      source={<ProjectsIndexSource />}
      preview={<ProjectsGrid />}
    />
  );
}
