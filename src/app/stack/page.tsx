import { ViewSwitcher } from "@/components/pages/ViewSwitcher";
import { StackPage } from "@/components/pages/StackPage";
import { StackSource } from "@/components/pages/StackSource";
import { StackHint } from "@/components/pages/StackHint";

export const metadata = { title: "stack.ts — gsriram.dev" };

export default function StackPageRoute() {
  return (
    <>
      <StackHint />
      <ViewSwitcher
        source={<StackSource />}
        preview={<StackPage />}
      />
    </>
  );
}
