import { ViewSwitcher } from "@/components/pages/ViewSwitcher";
import { StackPage } from "@/components/pages/StackPage";
import { PlaceholderPage } from "@/components/pages/PlaceholderPage";

export const metadata = { title: "stack.ts — gsriram.dev" };

export default function StackPageRoute() {
  return (
    <ViewSwitcher
      source={<PlaceholderPage tabId="stack.ts" />}
      preview={<StackPage />}
    />
  );
}
