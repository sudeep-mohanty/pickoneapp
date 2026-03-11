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
    if (revealedSide === side) return "drop-shadow(0 0 24px #FFD700)";
    if (hovered === side) return "drop-shadow(0 0 16px #FF5733)";
    return "none";
  };

  const vibrate = () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(30);
    }
  };

  return (
    <div style={{ position: "relative", width: 260, height: 340, margin: "0 auto" }}>
      <svg viewBox="0 0 260 360" width="260" height="360" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Skin gradient for depth */}
          <linearGradient id="skinGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FDCFAB" />
            <stop offset="50%" stopColor="#F5BF94" />
            <stop offset="100%" stopColor="#E8A878" />
          </linearGradient>
          <linearGradient id="fingerGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDCFAB" />
            <stop offset="100%" stopColor="#F0B888" />
          </linearGradient>
          <radialGradient id="palmShadow" cx="0.5" cy="0.4" r="0.6">
            <stop offset="0%" stopColor="#F5BF94" />
            <stop offset="100%" stopColor="#D4976B" />
          </radialGradient>
          <linearGradient id="nailGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFE8E0" />
            <stop offset="100%" stopColor="#F5D0C0" />
          </linearGradient>
        </defs>

        {/* Wrist */}
        <path d="M95,310 Q95,295 105,290 L155,290 Q165,295 165,310 L165,350 Q165,358 155,358 L105,358 Q95,358 95,350 Z"
          fill="url(#skinGrad)" stroke="#D4976B" strokeWidth="1.5" />
        {/* Wrist line */}
        <path d="M105,295 Q130,300 155,295" fill="none" stroke="#D4976B" strokeWidth="1" opacity="0.5" />

        {/* Palm - organic shape */}
        <path d="M72,200 Q65,180 75,155 Q80,145 95,145 L165,145 Q180,145 185,155 Q195,180 188,200 Q192,230 185,260 Q180,280 170,290 L90,290 Q80,280 75,260 Q68,230 72,200 Z"
          fill="url(#palmShadow)" stroke="#D4976B" strokeWidth="1.5" />

        {/* Palm crease lines */}
        <path d="M95,195 Q120,185 155,200" fill="none" stroke="#C4875B" strokeWidth="1" opacity="0.4" />
        <path d="M90,220 Q115,210 160,218" fill="none" stroke="#C4875B" strokeWidth="1" opacity="0.3" />

        {/* Thumb - curled naturally */}
        <path d="M72,195 Q55,190 48,175 Q42,160 50,152 Q58,144 68,150 Q75,155 78,168 Z"
          fill="url(#fingerGrad)" stroke="#D4976B" strokeWidth="1.5" />

        {/* Middle finger - folded over palm */}
        <ellipse cx="130" cy="148" rx="16" ry="12" fill="#F0B888" stroke="#D4976B" strokeWidth="1" />

        {/* Pinky - folded */}
        <ellipse cx="172" cy="162" rx="14" ry="11" fill="#F0B888" stroke="#D4976B" strokeWidth="1"
          transform="rotate(15 172 162)" />

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
          {/* Finger body - tapered shape */}
          <path d="M85,145 Q83,140 84,50 Q84,30 100,30 Q116,30 116,50 Q117,140 115,145 Z"
            fill="url(#fingerGrad)" stroke="#D4976B" strokeWidth="1.5" />
          {/* Knuckle lines */}
          <path d="M88,105 Q100,102 112,105" fill="none" stroke="#D4976B" strokeWidth="0.8" opacity="0.4" />
          <path d="M87,85 Q100,82 113,85" fill="none" stroke="#D4976B" strokeWidth="0.8" opacity="0.3" />
          {/* Fingernail */}
          <path d="M90,38 Q90,28 100,28 Q110,28 110,38 Q110,45 100,46 Q90,45 90,38 Z"
            fill="url(#nailGrad)" stroke="#E0B8A8" strokeWidth="1" />
          {/* Question mark */}
          {interactive && (
            <text x="100" y="78" textAnchor="middle" fill="#FF5733" fontWeight="900"
              fontSize="22" fontFamily="'Space Mono', monospace">?</text>
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
          {/* Finger body - slightly angled, tapered */}
          <path d="M148,150 Q145,142 150,60 Q151,38 165,38 Q179,38 180,60 Q182,142 180,150 Z"
            fill="url(#fingerGrad)" stroke="#D4976B" strokeWidth="1.5"
            transform="rotate(5 165 95)" />
          {/* Knuckle lines */}
          <path d="M153,112 Q165,109 177,112" fill="none" stroke="#D4976B" strokeWidth="0.8" opacity="0.4"
            transform="rotate(5 165 112)" />
          <path d="M152,92 Q165,89 178,92" fill="none" stroke="#D4976B" strokeWidth="0.8" opacity="0.3"
            transform="rotate(5 165 92)" />
          {/* Fingernail */}
          <path d="M157,46 Q157,36 167,36 Q177,36 177,46 Q177,53 167,54 Q157,53 157,46 Z"
            fill="url(#nailGrad)" stroke="#E0B8A8" strokeWidth="1"
            transform="rotate(5 167 45)" />
          {/* Question mark */}
          {interactive && (
            <text x="167" y="85" textAnchor="middle" fill="#FF5733" fontWeight="900"
              fontSize="22" fontFamily="'Space Mono', monospace"
              transform="rotate(5 167 85)">?</text>
          )}
        </g>
      </svg>

      {/* Floating labels after reveal */}
      {revealedSide && (
        <>
          <div style={{
            position: "absolute", left: -10, top: 10,
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
            position: "absolute", right: -10, top: 20,
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
          marginTop: 16, marginBottom: 20,
        }}>
          <span style={{
            color: hovered === "left" ? "#FF5733" : "#888",
            fontSize: 15, transition: "color 0.3s",
            fontFamily: "'Space Mono', monospace",
            fontWeight: 700,
          }}>← this one?</span>
          <span style={{
            color: hovered === "right" ? "#FF5733" : "#888",
            fontSize: 15, transition: "color 0.3s",
            fontFamily: "'Space Mono', monospace",
            fontWeight: 700,
          }}>or this? →</span>
        </div>
      )}
    </div>
  );
}
