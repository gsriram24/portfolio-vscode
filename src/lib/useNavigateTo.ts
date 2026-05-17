"use client";

import { useRouter } from "next/navigation";
import { useChromeStore } from "@/lib/store";
import { pathFor } from "@/lib/routes";

export function useNavigateTo(onDone: () => void) {
  const router = useRouter();
  const openTab = useChromeStore((s) => s.openTab);
  const setActiveTab = useChromeStore((s) => s.setActiveTab);

  return function navigateTo(path: string) {
    openTab(path);
    setActiveTab(path);
    router.push(pathFor(path));
    onDone();
  };
}
