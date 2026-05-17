import { ViewSwitcher } from "@/components/pages/ViewSwitcher";
import { ContactPage } from "@/components/pages/ContactPage";
import { ContactSource } from "@/components/pages/ContactSource";

export const metadata = { title: "contact.ts — gsriram.dev" };

export default function ContactPageRoute() {
  return (
    <ViewSwitcher
      source={<ContactSource />}
      preview={<ContactPage />}
    />
  );
}
