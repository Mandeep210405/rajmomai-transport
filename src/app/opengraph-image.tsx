import { ImageResponse } from "next/og";

export const alt = "Rajmomai Transport – Moving Materials. Connecting Industries. Delivering Trust.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg,#101010 0%,#191919 60%,#2a2210 100%)",
          color: "#F5F3EF",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 10, color: "#D4AF37" }}>BHAVNAGAR · GUJARAT · INDIA</div>
        <div style={{ display: "flex", fontSize: 108, fontWeight: 800, letterSpacing: 6, marginTop: 24 }}>RAJMOMAI</div>
        <div style={{ display: "flex", fontSize: 44, letterSpacing: 18, color: "#D4AF37", marginTop: 4 }}>TRANSPORT</div>
        <div style={{ display: "flex", fontSize: 30, marginTop: 48, color: "#A3A3A3" }}>Moving Materials. Connecting Industries. Delivering Trust.</div>
      </div>
    ),
    size,
  );
}
