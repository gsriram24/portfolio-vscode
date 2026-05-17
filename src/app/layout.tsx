import { type ReactNode } from "react";
import type { Metadata } from "next";
import { ibmPlexSans, cascadiaCode } from "@/lib/fonts";
import { ChromeShell } from "@/components/chrome/ChromeShell";
import { ThemeInit } from "@/components/chrome/ThemeInit";
import { Toaster } from "sonner";
import { WelcomeHint, ThemeHint } from "@/components/overlays/HintToast";
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION, SITE_URL, SITE_NAME } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "G Sriram", "gsriram24", "fullstack engineer", "software engineer",
    "SDE-III", "GoHighLevel", "HighLevel", "Vue.js", "React", "NestJS",
    "Node.js", "Nuxt.js", "TypeScript", "SaaS", "AI features",
    "schema markup", "page builder", "ecommerce",
  ],
  authors: [{ name: "G Sriram", url: SITE_URL }],
  creator: "G Sriram",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@gsriram24",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
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
        <Toaster position="bottom-right" expand offset={32} />
        <WelcomeHint />
        <ThemeHint />
        <ThemeInit />
        <ChromeShell>{children}</ChromeShell>
      </body>
    </html>
  );
}
