import { ViewSwitcher } from "@/components/pages/ViewSwitcher";
import { SriramPreview } from "@/components/pages/sriram-preview";
import { SriramSource } from "@/components/pages/sriram-source";
import { Hint } from "@/components/overlays/Hint";

export default function HomePage() {
  return (
    <>
      <Hint id="hint-home" text="Hit </> to see this page as a TypeScript file." />
      <ViewSwitcher source={<SriramSource />} preview={<SriramPreview />} />
    </>
  );
}
