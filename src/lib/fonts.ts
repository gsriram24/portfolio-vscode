import { IBM_Plex_Sans, Cascadia_Code } from "next/font/google";

// Only the weights/styles that are actually rendered:
// - IBM Plex Sans: 400 default, 600 (font-semibold), 700 (font-bold) — no 300/500 in use.
// - Cascadia Code: 400 + italic (italic used by git-blame text in CodeLine).
// Trimming unused weights eliminates "preloaded but not used" console warnings.
export const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

export const cascadiaCode = Cascadia_Code({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-cascadia-code",
  display: "swap",
});
