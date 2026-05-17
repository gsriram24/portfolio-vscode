import { type ReactNode } from "react";
import type { Metadata } from "next";
import { ibmPlexSans, cascadiaCode } from "@/lib/fonts";
import { ChromeShell } from "@/components/chrome/ChromeShell";
import { ThemeInit } from "@/components/chrome/ThemeInit";
import { Toaster } from "sonner";
import { WelcomeHint } from "@/components/overlays/HintToast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sriram Gopalakrishnan",
  description: "Software Engineer",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    // suppressHydrationWarning: the inline <script> below mutates html.data-theme
    // before React hydrates (so we paint with the user's stored theme, no flash).
    // React would otherwise warn that server (no attr) ≠ client (attr set).
    <html
      lang="en"
      suppressHydrationWarning
      className={`${ibmPlexSans.variable} ${cascadiaCode.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            // Storage key must match STORAGE_KEY in src/lib/theme.ts
            __html: `(function(){try{var t=localStorage.getItem('gsriram-theme')||'dark-plus';document.documentElement.setAttribute('data-theme',t);}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <Toaster position="bottom-right" />
        <WelcomeHint />
        <ThemeInit />
        <ChromeShell>{children}</ChromeShell>
      </body>
    </html>
  );
}
