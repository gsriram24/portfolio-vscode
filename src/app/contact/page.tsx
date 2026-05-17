import { ViewSwitcher } from "@/components/pages/ViewSwitcher";
import { ContactPage } from "@/components/pages/ContactPage";
import { PlaceholderPage } from "@/components/pages/PlaceholderPage";

export const metadata = { title: "contact.ts — gsriram.dev" };

export default function ContactPageRoute() {
  return (
    <ViewSwitcher
      source={<PlaceholderPage tabId="contact.ts" />}
      preview={<ContactPage />}
    />
  );
}
