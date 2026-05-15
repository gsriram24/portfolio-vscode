import type { Metadata } from "next";
import { ibmPlexSans, cascadiaCode, newsreader } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sriram Gopalakrishnan",
  description: "Software Engineer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${cascadiaCode.variable} ${newsreader.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            // Storage key must match STORAGE_KEY in src/lib/theme.ts
          __html: `(function(){try{var t=localStorage.getItem('gsriram-theme')||'dark-plus';document.documentElement.setAttribute('data-theme',t);}catch(e){}})()`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
