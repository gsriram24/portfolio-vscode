// src/app/manifest.ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "G Sriram — Software Engineer",
    short_name: "G Sriram",
    description: "Portfolio of G Sriram, SDE-III at HighLevel. Building large-scale SaaS products and AI-powered features.",
    start_url: "/",
    display: "standalone",
    background_color: "#1e1e1e",
    theme_color: "#007acc",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
