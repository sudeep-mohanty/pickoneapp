"use client";
import { useState } from "react";

export default function Hand({
  interactive = false,
  onPickLeft,
  onPickRight,
  revealedSide = null,
  leftLabel = "",
  rightLabel = "",
}) {
  const [hovered, setHovered] = useState(null);

  const fingerGlow = (side) => {
    if (revealedSide === side) return "drop-shadow(0 0 20px #FFD700)";
    if (hovered === side) return "drop-shadow(0 0 12px #FF5733)";
    return "none";
  };

  const vibrate = () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(30);
    }
  };

  return (
    <div style={{ position: "relative", width: 280, height: 340, margin: "0 auto" }}>
      <svg viewBox="0 0 280 340" width="280" height="340" xmlns="http://www.w3.org/2000/svg">
        {/* Palm */}
        <ellipse cx="140" cy="230" rx="75" ry="85" fill="#F5D0A9" stroke="#D4A574" strokeWidth="2" />

        {/* Folded thumb */}
        <ellipse cx="78" cy="195" rx="20" ry="16" fill="#F5D0A9" stroke="#D4A574" strokeWidth="1.5"
          transform="rotate(-20 78 195)" />

        {/* Folded middle finger */}
        <rect x="122" y="148" width="36" height="30" rx="18" fill="#E8C49A" stroke="#D4A574" strokeWidth="1.5" />

        {/* Folded pinky */}
        <rect x="175" y="170" width="28" height="26" rx="14" fill="#E8C49A" stroke="#D4A574" strokeWidth="1.5"
          transform="rotate(15 189 183)" />

        {/* Index finger (LEFT option) */}
        <g
          style={{
            cursor: interactive ? "pointer" : "default",
            filter: fingerGlow("left"),
            transition: "filter 0.3s",
          }}
          onClick={() => {
            if (!interactive) return;
            vibrate();
            onPickLeft?.();
          }}
          onMouseEnter={() => interactive && setHovered("left")}
          onMouseLeave={() => setHovered(null)}
        >
          <rect x="82" y="40" width="38" height="120" rx="19" fill="#F5D0A9" stroke="#D4A574" strokeWidth="2" />
          <ellipse cx="101" cy="42" rx="17" ry="6" fill="#F0C89A" />
          <rect x="88" y="36" width="26" height="14" rx="10" fill="#FCEADE" stroke="#E8C49A" strokeWidth="1" />
          {interactive && (
            <text x="101" y="105" textAnchor="middle" fill="#FF5733" fontWeight="900"
              fontSize="20" fontFamily="monospace">?</text>
          )}
        </g>

        {/* Ring finger (RIGHT option) */}
        <g
          style={{
            cursor: interactive ? "pointer" : "default",
            filter: fingerGlow("right"),
            transition: "filter 0.3s",
          }}
          onClick={() => {
            if (!interactive) return;
            vibrate();
            onPickRight?.();
          }}
          onMouseEnter={() => interactive && setHovered("right")}
          onMouseLeave={() => setHovered(null)}
        >
          <rect x="160" y="50" width="38" height="110" rx="19" fill="#F5D0A9" stroke="#D4A574" strokeWidth="2"
            transform="rotate(8 179 105)" />
          <ellipse cx="180" cy="50" rx="17" ry="6" fill="#F0C89A" transform="rotate(8 180 50)" />
          <rect x="167" y="45" width="26" height="14" rx="10" fill="#FCEADE" stroke="#E8C49A" strokeWidth="1"
            transform="rotate(8 180 52)" />
          {interactive && (
            <text x="182" y="112" textAnchor="middle" fill="#FF5733" fontWeight="900"
              fontSize="20" fontFamily="monospace" transform="rotate(8 182 112)">?</text>
          )}
        </g>

        {/* Wrist */}
        <rect x="100" y="295" width="80" height="45" rx="10" fill="#F5D0A9" stroke="#D4A574" strokeWidth="1.5" />
      </svg>

      {/* Floating labels after reveal */}
      {revealedSide && (
        <>
          <div style={{
            position: "absolute", left: -10, top: 20,
            background: revealedSide === "left" ? "#FF5733" : "#1A1A1A",
            color: "#FAFAFA",
            padding: "6px 14px", borderRadius: 20,
            fontSize: 14, fontWeight: 700,
            fontFamily: "'Space Mono', monospace",
            border: revealedSide === "left" ? "2px solid #FFD700" : "1px solid #888",
            whiteSpace: "nowrap",
            boxShadow: revealedSide === "left" ? "0 0 20px rgba(255,87,51,0.5)" : "none",
            animation: "popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          }}>
            {leftLabel}
          </div>
          <div style={{
            position: "absolute", right: -10, top: 30,
            background: revealedSide === "right" ? "#FF5733" : "#1A1A1A",
            color: "#FAFAFA",
            padding: "6px 14px", borderRadius: 20,
            fontSize: 14, fontWeight: 700,
            fontFamily: "'Space Mono', monospace",
            border: revealedSide === "right" ? "2px solid #FFD700" : "1px solid #888",
            whiteSpace: "nowrap",
            boxShadow: revealedSide === "right" ? "0 0 20px rgba(255,87,51,0.5)" : "none",
            animation: "popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.1s both",
          }}>
            {rightLabel}
          </div>
        </>
      )}

      {/* Hover hints */}
      {interactive && !revealedSide && (
        <div style={{
          display: "flex", justifyContent: "center", gap: 60,
          marginTop: 10,
        }}>
          <span style={{
            color: hovered === "left" ? "#FF5733" : "#888",
            fontSize: 13, transition: "color 0.3s",
          }}>← this one?</span>
          <span style={{
            color: hovered === "right" ? "#FF5733" : "#888",
            fontSize: 13, transition: "color 0.3s",
          }}>or this? →</span>
        </div>
      )}
    </div>
  );
}
