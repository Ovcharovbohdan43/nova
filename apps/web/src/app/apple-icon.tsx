import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          borderRadius: "50%",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 600,
            color: "#ffffff",
            fontFamily: "system-ui, sans-serif",
            letterSpacing: "-0.05em",
            marginTop: -4,
          }}
        >
          N
        </div>
      </div>
    ),
    { ...size },
  );
}
