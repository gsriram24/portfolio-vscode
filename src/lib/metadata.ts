// src/lib/metadata.ts
import type { Metadata } from "next";

export const SITE_URL = "https://gsriram.dev";
export const SITE_NAME = "G Sriram";
export const DEFAULT_TITLE = "G Sriram — Software Engineer";
export const DEFAULT_DESCRIPTION =
  "Portfolio of G Sriram — SDE-III at HighLevel. Building large-scale SaaS products, AI-powered features, and SEO tooling.";

export function ogUrl(params?: Record<string, string>): string {
  const url = new URL(`${SITE_URL}/og`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  return url.toString();
}

export function pageMetadata({
  title,
  description,
  path,
  ogParams,
}: {
  title?: string;
  description?: string;
  path?: string;
  ogParams?: Record<string, string>;
}): Metadata {
  const metaTitle = title ? `${title} · G Sriram` : DEFAULT_TITLE;
  const metaDesc = description ?? DEFAULT_DESCRIPTION;
  const metaUrl = path ? `${SITE_URL}${path}` : SITE_URL;
  const image = ogUrl(ogParams);

  return {
    title: metaTitle,
    description: metaDesc,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: metaUrl },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: metaUrl,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: metaTitle }],
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDesc,
      images: [image],
      creator: "@gsriram24",
    },
  };
}
