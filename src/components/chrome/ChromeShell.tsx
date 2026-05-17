"use client";

import { type ReactNode } from "react";
import { useChromeStore } from "@/lib/store";
import { useGlobalKeyboard } from "@/lib/useGlobalKeyboard";
import { TitleBar } from "./TitleBar";
import { ActivityBar } from "./ActivityBar";
import { Sidebar } from "./Sidebar";
import { TabBar } from "./TabBar";
import { Breadcrumb } from "./Breadcrumb";
import { StatusBar } from "./StatusBar";
import { HintBar } from "./HintBar";
import { BottomNav } from "./BottomNav";
import { NavOverlay } from "./NavOverlay";
import { RouteSync } from "./RouteSync";

export function ChromeShell({ children }: { children: ReactNode }) {
  const activeTab = useChromeStore((s) => s.activeTab);
  useGlobalKeyboard();

  return (
    <div className="flex flex-col h-full">
      {/* Mirrors the current URL into Zustand (openTab + setActiveTab) on every
          navigation. Renders no DOM — effect-only. Must mount inside ChromeShell
          so it has access to the store. */}
      <RouteSync />

      {/* TitleBar — tablet + desktop */}
      <div className="hidden md:block">
        <TitleBar />
      </div>

      {/* HintBar — mobile only */}
      <div className="block md:hidden">
        <HintBar />
      </div>

      {/* Main row */}
      <div className="flex flex-1 min-h-0">
        {/* ActivityBar — tablet + desktop */}
        <div className="hidden md:flex">
          <ActivityBar />
        </div>

        {/* Sidebar — desktop only, gated by activePanel inside */}
        <Sidebar />

        {/* Editor column */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* TabBar + Breadcrumb — tablet + desktop */}
          <div className="hidden md:block">
            <TabBar />
            <Breadcrumb path={activeTab} />
          </div>

          {/* Page content */}
          <main className="flex-1 overflow-auto bg-bg">
            {children}
          </main>
        </div>
      </div>

      {/* StatusBar — tablet + desktop */}
      <div className="hidden md:block">
        <StatusBar />
      </div>

      {/* BottomNav — mobile only */}
      <div className="block md:hidden">
        <BottomNav />
      </div>

      {/* Slide-in nav overlay — tablet + mobile */}
      <NavOverlay />

      {/* OverlayManager and MobileSheetManager added in Task 6 and Task 13 */}
    </div>
  );
}
