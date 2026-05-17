import { ViewSwitcher } from "@/components/pages/ViewSwitcher";
import { ProjectsGrid } from "@/components/pages/ProjectsGrid";
import { PlaceholderPage } from "@/components/pages/PlaceholderPage";

export const metadata = { title: "projects — gsriram.dev" };

export default function ProjectsIndexPage() {
  return (
    <ViewSwitcher
      source={<PlaceholderPage tabId="projects/index.ts" />}
      preview={<ProjectsGrid />}
    />
  );
}
