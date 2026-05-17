import { ViewSwitcher } from "@/components/pages/ViewSwitcher";
import { StackPage } from "@/components/pages/StackPage";
import { StackSource } from "@/components/pages/StackSource";

export const metadata = { title: "stack.ts — gsriram.dev" };

export default function StackPageRoute() {
  return (
    <ViewSwitcher
      source={<StackSource />}
      preview={<StackPage />}
    />
  );
}
