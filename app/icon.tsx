import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Neural mark — scaled to 32×32 canvas */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
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
      </div>
    ),
    { ...size }
  );
}
