import { ViewSwitcher } from "@/components/pages/ViewSwitcher";
import { TalksGrid } from "@/components/pages/TalksGrid";
import { TalksIndexSource } from "@/components/pages/TalksIndexSource";

export const metadata = { title: "talks — gsriram.dev" };

export default function TalksIndexPage() {
  return (
    <ViewSwitcher
      source={<TalksIndexSource />}
      preview={<TalksGrid />}
    />
  );
}
