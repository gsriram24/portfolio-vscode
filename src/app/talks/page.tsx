import { ViewSwitcher } from "@/components/pages/ViewSwitcher";
import { TalksGrid } from "@/components/pages/TalksGrid";
import { PlaceholderPage } from "@/components/pages/PlaceholderPage";

export const metadata = { title: "talks — gsriram.dev" };

export default function TalksIndexPage() {
  return (
    <ViewSwitcher
      source={<PlaceholderPage tabId="talks/index.ts" />}
      preview={<TalksGrid />}
    />
  );
}
