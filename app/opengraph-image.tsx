import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(200,255,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Logo mark */}
        <svg
          width="90"
          height="90"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginBottom: 24 }}
        >
          <circle cx="50" cy="14" r="5.5" fill="#C8FF00" />
          <circle cx="24" cy="38" r="4.5" fill="#C8FF00" />
          <circle cx="76" cy="38" r="4.5" fill="#C8FF00" />
          <circle cx="30" cy="68" r="4" fill="#C8FF00" />
          <circle cx="70" cy="68" r="4" fill="#C8FF00" />
          <circle cx="50" cy="88" r="5" fill="#C8FF00" />
          <line x1="50" y1="19" x2="27" y2="35" stroke="#C8FF00" strokeWidth="1.5" strokeOpacity="0.5" />
          <line x1="50" y1="19" x2="73" y2="35" stroke="#C8FF00" strokeWidth="1.5" strokeOpacity="0.5" />
          <line x1="27" y1="41" x2="33" y2="65" stroke="#C8FF00" strokeWidth="1.2" strokeOpacity="0.4" />
          <line x1="73" y1="41" x2="67" y2="65" stroke="#C8FF00" strokeWidth="1.2" strokeOpacity="0.4" />
          <line x1="33" y1="70" x2="50" y2="84" stroke="#C8FF00" strokeWidth="1.2" strokeOpacity="0.45" />
          <line x1="67" y1="70" x2="50" y2="84" stroke="#C8FF00" strokeWidth="1.2" strokeOpacity="0.45" />
          <line x1="27" y1="41" x2="67" y2="65" stroke="#C8FF00" strokeWidth="0.8" strokeOpacity="0.2" />
          <line x1="73" y1="41" x2="33" y2="65" stroke="#C8FF00" strokeWidth="0.8" strokeOpacity="0.2" />
          <line x1="50" y1="19" x2="50" y2="84" stroke="#C8FF00" strokeWidth="0.6" strokeOpacity="0.12" />
        </svg>

        {/* Wordmark */}
        <div
          style={{
            color: "#FAFAFA",
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "-2px",
            lineHeight: 1,
            marginBottom: 16,
          }}
        >
          CORTEX
        </div>

        {/* Tagline */}
        <div
          style={{
            color: "#C8FF00",
            fontSize: 22,
            fontWeight: 400,
            letterSpacing: "4px",
            textTransform: "uppercase",
          }}
        >
          AI Solutions Agency
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "#C8FF00",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
