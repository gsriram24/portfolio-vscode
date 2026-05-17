import { ViewSwitcher } from "@/components/pages/ViewSwitcher";
import { StackPage } from "@/components/pages/StackPage";
import { StackSource } from "@/components/pages/StackSource";
import { Hint } from "@/components/overlays/Hint";

export const metadata = { title: "stack.ts — gsriram.dev" };

export default function StackPageRoute() {
  return (
    <>
      <Hint id="hint-stack" text="Try Ctrl T to switch between 6 colour themes including light mode." kbd={["Ctrl", "T"]} />
      <ViewSwitcher
        source={<StackSource />}
        preview={<StackPage />}
      />
    </>
  );
}
