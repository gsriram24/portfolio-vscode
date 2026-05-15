import { IBM_Plex_Sans, Cascadia_Code, Newsreader } from "next/font/google";

export const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

export const cascadiaCode = Cascadia_Code({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cascadia-code",
  display: "swap",
});

export const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});
