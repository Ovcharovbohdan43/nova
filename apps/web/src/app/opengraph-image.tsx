import { ImageResponse } from "next/og";

import { brand } from "@/lib/brand";

export const runtime = "edge";
export const alt = `${brand.name} — ${brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#010108",
          color: "#fafafa",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            opacity: 0.35,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -120,
            left: "50%",
            transform: "translateX(-50%)",
            width: 520,
            height: 520,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 30% 30%, #3f3f46 0%, #18181b 45%, #09090b 70%)",
            boxShadow: "0 0 120px 40px rgba(161,161,170,0.12)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 80,
            width: 280,
            height: 180,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(113,113,122,0.18) 0%, transparent 70%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#000000",
              fontSize: 24,
              fontWeight: 600,
              color: "#ffffff",
              letterSpacing: "-0.05em",
            }}
          >
            N
          </div>
          <span style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em" }}>
            {brand.shortName}{" "}
            <span style={{ color: "#a1a1aa", fontWeight: 500 }}>AI Studio</span>
          </span>
        </div>

        <div style={{ maxWidth: 900 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              marginBottom: 24,
            }}
          >
            {brand.tagline}
          </div>
          <div
            style={{
              fontSize: 26,
              lineHeight: 1.45,
              color: "#a1a1aa",
              maxWidth: 820,
            }}
          >
            Cost-aware AI for indie developers. Full repo workflow. BYOK-ready.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
          }}
        >
          {["Smart routing", "Own your repo", "Join waitlist"].map((label) => (
            <div
              key={label}
              style={{
                padding: "10px 18px",
                borderRadius: 999,
                border: "1px solid rgba(250,250,250,0.12)",
                background: "rgba(250,250,250,0.05)",
                fontSize: 18,
                color: "#d4d4d8",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
