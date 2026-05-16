"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useChromeStore } from "@/lib/store";
import { pathToTabId } from "@/lib/routes";

// Mirrors the URL into Zustand on every navigation.
//
// URL is the source of truth: we never push from Zustand to the router.
// Sidebar/TabBar use <Link>, which changes the pathname; this effect
// translates pathname → tab ID and syncs the chrome state.
//
// setActiveTab already auto-expands ancestor folders and closes the
// mobile slide-in overlay, so deep-link UX works without extra code here.
//
// Returns null — this is an effect-only mount; renders no DOM.
export function RouteSync() {
  const pathname = usePathname();
  const openTab = useChromeStore((s) => s.openTab);
  const setActiveTab = useChromeStore((s) => s.setActiveTab);

  useEffect(() => {
    const tabId = pathToTabId(pathname ?? "/");
    if (!tabId) return; // unknown path — Next.js renders _not-found, leave chrome alone
    openTab(tabId);
    setActiveTab(tabId);
  }, [pathname, openTab, setActiveTab]);

  return null;
}
