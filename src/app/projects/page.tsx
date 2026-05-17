import { ViewSwitcher } from "@/components/pages/ViewSwitcher";
import { ProjectsGrid } from "@/components/pages/ProjectsGrid";
import { ProjectsIndexSource } from "@/components/pages/ProjectsIndexSource";
import { Hint } from "@/components/overlays/Hint";

export const metadata = { title: "projects — gsriram.dev" };

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
