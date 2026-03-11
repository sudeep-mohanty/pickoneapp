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
    if (revealedSide === side) return "drop-shadow(0 0 30px rgba(255,215,0,0.7))";
    if (hovered === side) return "drop-shadow(0 0 20px rgba(255,87,51,0.6))";
    return "none";
  };

  const vibrate = () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(30);
    }
  };

  return (
    <div style={{ position: "relative", width: 240, height: 400, margin: "0 auto" }}>
      <svg viewBox="0 0 240 420" width="240" height="400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="skin" x1="0.3" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stopColor="#F9D5C2" />
            <stop offset="40%" stopColor="#F2C0A4" />
            <stop offset="100%" stopColor="#E5A882" />
          </linearGradient>
          <linearGradient id="skinLight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDDDCA" />
            <stop offset="100%" stopColor="#F2C0A4" />
          </linearGradient>
          <linearGradient id="skinShadow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E5A882" />
            <stop offset="100%" stopColor="#D49570" />
          </linearGradient>
          <radialGradient id="palmGrad" cx="0.45" cy="0.35" r="0.55">
            <stop offset="0%" stopColor="#F5CCAE" />
            <stop offset="70%" stopColor="#EEBC98" />
            <stop offset="100%" stopColor="#D99B72" />
          </radialGradient>
          <linearGradient id="nailPink" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F9A0C8" />
            <stop offset="40%" stopColor="#F07AB0" />
            <stop offset="100%" stopColor="#E85DA0" />
          </linearGradient>
          <linearGradient id="nailShine" x1="0.3" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* ===== PALM & FOLDED FINGERS ===== */}

        {/* Palm base */}
        <path d="M68,225 Q58,200 62,170 Q65,155 80,148 L160,148 Q175,155 178,170 Q182,200 172,225 Q178,265 172,295 Q168,315 155,325 L85,325 Q72,315 68,295 Q62,265 68,225 Z"
          fill="url(#palmGrad)" />

        {/* Palm side shadow */}
        <path d="M68,225 Q58,200 62,170 Q65,155 72,150 Q66,170 66,200 Q66,240 70,270 Q72,295 80,320 L85,325 Q72,315 68,295 Q62,265 68,225 Z"
          fill="rgba(180,120,80,0.15)" />

        {/* Palm crease lines */}
        <path d="M82,200 Q110,188 155,198" fill="none" stroke="#C98A65" strokeWidth="0.8" opacity="0.5" />
        <path d="M78,225 Q108,215 158,222" fill="none" stroke="#C98A65" strokeWidth="0.7" opacity="0.35" />
        <path d="M80,248 Q110,240 156,245" fill="none" stroke="#C98A65" strokeWidth="0.6" opacity="0.25" />

        {/* Thumb - curled across palm */}
        <path d="M68,210 Q50,200 42,182 Q36,165 42,152 Q48,140 60,142 Q72,145 78,160 Q82,172 78,185 Z"
          fill="url(#skin)" />
        <path d="M48,155 Q52,148 60,148" fill="none" stroke="#C98A65" strokeWidth="0.8" opacity="0.35" />
        {/* Thumb nail */}
        <path d="M44,162 Q42,152 50,148 Q58,146 60,155 Q60,163 52,165 Q44,166 44,162 Z"
          fill="url(#nailPink)" />
        <path d="M46,157 Q47,152 52,150 Q55,150 55,154"
          fill="url(#nailShine)" opacity="0.6" />

        {/* Ring finger - curled */}
        <path d="M148,152 Q152,140 160,135 Q168,132 172,140 Q176,152 170,162 Q164,168 155,165 Z"
          fill="url(#skinShadow)" />
        <path d="M155,138 Q162,134 168,138" fill="none" stroke="#C98A65" strokeWidth="0.7" opacity="0.3" />

        {/* Pinky - curled */}
        <path d="M165,168 Q172,158 180,155 Q188,154 190,162 Q192,172 185,180 Q178,184 170,180 Z"
          fill="url(#skinShadow)" />
        <path d="M175,158 Q182,155 187,160" fill="none" stroke="#C98A65" strokeWidth="0.6" opacity="0.3" />

        {/* Wrist */}
        <path d="M85,325 Q82,330 82,340 L82,395 Q82,405 92,405 L148,405 Q158,405 158,395 L158,340 Q158,330 155,325 Z"
          fill="url(#skin)" />
        <path d="M92,330 Q120,335 148,330" fill="none" stroke="#C98A65" strokeWidth="0.7" opacity="0.3" />

        {/* ===== INDEX FINGER (LEFT) ===== */}
        <g
          style={{
            cursor: interactive ? "pointer" : "default",
            filter: fingerGlow("left"),
            transition: "filter 0.3s ease",
          }}
          onClick={() => { if (!interactive) return; vibrate(); onPickLeft?.(); }}
          onMouseEnter={() => interactive && setHovered("left")}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Finger shaft */}
          <path d="M78,148 Q76,140 77,45 Q77,22 95,20 Q113,22 113,45 Q114,140 112,148 Z"
            fill="url(#skinLight)" />
          {/* Side shadow */}
          <path d="M78,148 Q76,140 77,45 Q77,22 82,20 Q78,30 79,60 Q79,130 80,148 Z"
            fill="rgba(180,120,80,0.1)" />
          {/* Knuckle creases */}
          <path d="M82,118 Q95,115 109,118" fill="none" stroke="#C98A65" strokeWidth="0.8" opacity="0.4" />
          <path d="M81,90 Q95,87 110,90" fill="none" stroke="#C98A65" strokeWidth="0.7" opacity="0.3" />
          {/* Fingernail - pink */}
          <path d="M84,30 Q84,16 95,14 Q106,16 106,30 Q106,42 95,44 Q84,42 84,30 Z"
            fill="url(#nailPink)" />
          {/* Nail shine */}
          <path d="M88,24 Q90,18 95,17 Q98,17 99,22 Q98,30 95,32 Q90,30 88,24 Z"
            fill="url(#nailShine)" opacity="0.5" />
          {/* Question mark when interactive */}
          {interactive && (
            <text x="95" y="82" textAnchor="middle" fill="#FF5733" fontWeight="900"
              fontSize="24" fontFamily="'Space Mono', monospace"
              style={{ textShadow: "0 0 10px rgba(255,87,51,0.3)" }}>?</text>
          )}
        </g>

        {/* ===== MIDDLE FINGER (RIGHT) ===== */}
        <g
          style={{
            cursor: interactive ? "pointer" : "default",
            filter: fingerGlow("right"),
            transition: "filter 0.3s ease",
          }}
          onClick={() => { if (!interactive) return; vibrate(); onPickRight?.(); }}
          onMouseEnter={() => interactive && setHovered("right")}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Finger shaft - slightly angled outward */}
          <path d="M135,148 Q132,138 140,52 Q142,25 158,22 Q174,25 174,52 Q176,138 172,148 Z"
            fill="url(#skinLight)"
            transform="rotate(4 155 85)" />
          {/* Side shadow */}
          <path d="M135,148 Q132,138 140,52 Q142,25 146,22 Q140,32 142,60 Q143,130 137,148 Z"
            fill="rgba(180,120,80,0.1)"
            transform="rotate(4 155 85)" />
          {/* Knuckle creases */}
          <path d="M141,118 Q156,115 170,118" fill="none" stroke="#C98A65" strokeWidth="0.8" opacity="0.4"
            transform="rotate(4 155 118)" />
          <path d="M140,90 Q156,87 171,90" fill="none" stroke="#C98A65" strokeWidth="0.7" opacity="0.3"
            transform="rotate(4 155 90)" />
          {/* Fingernail - pink */}
          <path d="M148,35 Q148,20 158,18 Q168,20 168,35 Q168,47 158,49 Q148,47 148,35 Z"
            fill="url(#nailPink)"
            transform="rotate(4 158 34)" />
          {/* Nail shine */}
          <path d="M152,28 Q153,22 158,21 Q161,21 162,26 Q161,34 158,36 Q153,34 152,28 Z"
            fill="url(#nailShine)" opacity="0.5"
            transform="rotate(4 158 28)" />
          {/* Question mark when interactive */}
          {interactive && (
            <text x="158" y="85" textAnchor="middle" fill="#FF5733" fontWeight="900"
              fontSize="24" fontFamily="'Space Mono', monospace"
              transform="rotate(4 158 85)"
              style={{ textShadow: "0 0 10px rgba(255,87,51,0.3)" }}>?</text>
          )}
        </g>
      </svg>

      {/* Floating labels after reveal */}
      {revealedSide && (
        <>
          <div style={{
            position: "absolute", left: -20, top: 20,
            background: revealedSide === "left" ? "#FF5733" : "#1A1A1A",
            color: "#FAFAFA",
            padding: "8px 16px", borderRadius: 20,
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
            position: "absolute", right: -20, top: 30,
            background: revealedSide === "right" ? "#FF5733" : "#1A1A1A",
            color: "#FAFAFA",
            padding: "8px 16px", borderRadius: 20,
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
          display: "flex", justifyContent: "center", gap: 50,
          marginTop: 16, marginBottom: 20,
        }}>
          <span style={{
            color: hovered === "left" ? "#FF5733" : "#666",
            fontSize: 15, transition: "color 0.3s",
            fontFamily: "'Space Mono', monospace",
            fontWeight: 700,
          }}>← this one?</span>
          <span style={{
            color: hovered === "right" ? "#FF5733" : "#666",
            fontSize: 15, transition: "color 0.3s",
            fontFamily: "'Space Mono', monospace",
            fontWeight: 700,
          }}>or this? →</span>
        </div>
      )}
    </div>
  );
}
