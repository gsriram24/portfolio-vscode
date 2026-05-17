import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";
import { SRIRAM } from "@/data/sriram";

export const runtime = "edge";

const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const DEFAULT_SUB = `${SRIRAM.role} · ${SRIRAM.company} · ${SRIRAM.location}`;

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title")?.slice(0, 60) ?? "G Sriram";
  const sub = searchParams.get("sub")?.slice(0, 80) ?? DEFAULT_SUB;

  const photoSrc = `${BASE_URL}/sriram-og.jpg`;

  const image = new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "1200px",
          height: "630px",
          background: "#1e1e1e",
          alignItems: "center",
          padding: "72px",
          gap: "64px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Photo */}
        <img
          src={photoSrc}
          width={260}
          height={260}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            objectPosition: "center top",
            border: "3px solid #007acc",
            flexShrink: 0,
          }}
        />

        {/* Text */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", flex: 1 }}>
          <div
            style={{
              color: "#007acc",
              fontSize: "15px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            gsriram.dev
          </div>
          <div
            style={{
              color: "#ffffff",
              fontSize: title.length > 20 ? "42px" : "54px",
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            {title}
          </div>
          <div style={{ color: "#858585", fontSize: "22px", marginTop: "4px" }}>
            {sub}
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "#007acc",
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 }
  );

  image.headers.set("Cache-Control", "public, max-age=86400, stale-while-revalidate=604800");
  return image;
}
