import { ViewSwitcher } from "@/components/pages/ViewSwitcher";
import { SriramPreview } from "@/components/pages/sriram-preview";
import { SriramSource } from "@/components/pages/sriram-source";
import { HomeHint } from "@/components/pages/HomeHint";

export default function HomePage() {
  return (
    <>
      <HomeHint />
      <ViewSwitcher source={<SriramSource />} preview={<SriramPreview />} />
    </>
  );
}
