import { ViewSwitcher } from "@/components/pages/ViewSwitcher";
import { SriramPreview } from "@/components/pages/sriram-preview";
import { SriramSource } from "@/components/pages/sriram-source";

export default function HomePage() {
  return (
    <ViewSwitcher source={<SriramSource />} preview={<SriramPreview />} />
  );
}
