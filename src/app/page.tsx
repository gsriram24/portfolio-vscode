import { HomeViewSwitcher } from "@/components/pages/HomeViewSwitcher";
import { SriramPreview } from "@/components/pages/sriram-preview";
import { SriramSource } from "@/components/pages/sriram-source";

export default function HomePage() {
  return <HomeViewSwitcher source={<SriramSource />} preview={<SriramPreview />} />;
}
