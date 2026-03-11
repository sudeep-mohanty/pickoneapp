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

  const vibrate = () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(30);
    }
  };

  return (
    <div style={{ position: "relative", width: 280, margin: "0 auto", userSelect: "none" }}>
      {/* The emoji hand */}
      <div style={{
        position: "relative",
        fontSize: 180,
        lineHeight: 1,
        textAlign: "center",
        filter: revealedSide
          ? "drop-shadow(0 0 40px rgba(255,215,0,0.4))"
          : interactive
            ? "drop-shadow(0 8px 24px rgba(0,0,0,0.4))"
            : "none",
        transition: "filter 0.3s",
      }}>
        {/* Clickable zones overlaid on the emoji */}
        {interactive && (
          <>
            {/* Left finger tap zone */}
            <div
              onClick={() => { vibrate(); onPickLeft?.(); }}
              onMouseEnter={() => setHovered("left")}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: "absolute",
                left: "18%",
                top: "0%",
                width: "30%",
                height: "55%",
                cursor: "pointer",
                zIndex: 2,
                borderRadius: 20,
                background: hovered === "left" ? "rgba(255,87,51,0.15)" : "transparent",
                border: hovered === "left" ? "2px solid rgba(255,87,51,0.4)" : "2px solid transparent",
                transition: "all 0.2s",
              }}
            >
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#FF5733",
                fontSize: 28,
                fontWeight: 900,
                fontFamily: "'Space Mono', monospace",
                textShadow: "0 0 15px rgba(255,87,51,0.5)",
                opacity: hovered === "left" ? 1 : 0.7,
                transition: "opacity 0.2s",
              }}>
                ?
              </div>
            </div>
            {/* Right finger tap zone */}
            <div
              onClick={() => { vibrate(); onPickRight?.(); }}
              onMouseEnter={() => setHovered("right")}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: "absolute",
                right: "18%",
                top: "0%",
                width: "30%",
                height: "55%",
                cursor: "pointer",
                zIndex: 2,
                borderRadius: 20,
                background: hovered === "right" ? "rgba(255,87,51,0.15)" : "transparent",
                border: hovered === "right" ? "2px solid rgba(255,87,51,0.4)" : "2px solid transparent",
                transition: "all 0.2s",
              }}
            >
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#FF5733",
                fontSize: 28,
                fontWeight: 900,
                fontFamily: "'Space Mono', monospace",
                textShadow: "0 0 15px rgba(255,87,51,0.5)",
                opacity: hovered === "right" ? 1 : 0.7,
                transition: "opacity 0.2s",
              }}>
                ?
              </div>
            </div>
          </>
        )}

        {/* The actual emoji — changes on reveal */}
        <span style={{
          display: "block",
          animation: revealedSide
            ? "popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            : "none",
        }}>
          {revealedSide === "left" ? "🖕" : revealedSide === "right" ? "☝️" : "✌️"}
        </span>
      </div>

      {/* Labels shown side by side after reveal */}
      {revealedSide && (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
          marginTop: 12,
        }}>
          <div style={{
            background: revealedSide === "left" ? "#FF5733" : "#1A1A1A",
            color: "#FAFAFA",
            padding: "8px 16px", borderRadius: 20,
            fontSize: 15, fontWeight: 700,
            fontFamily: "'Space Mono', monospace",
            border: revealedSide === "left" ? "2px solid #FFD700" : "1px solid #888",
            whiteSpace: "nowrap",
            boxShadow: revealedSide === "left" ? "0 0 20px rgba(255,87,51,0.5)" : "none",
            animation: "popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          }}>
            {leftLabel}
          </div>
          <div style={{
            color: "#555", fontSize: 13,
            fontFamily: "'Space Mono', monospace",
          }}>
            vs
          </div>
          <div style={{
            background: revealedSide === "right" ? "#FF5733" : "#1A1A1A",
            color: "#FAFAFA",
            padding: "8px 16px", borderRadius: 20,
            fontSize: 15, fontWeight: 700,
            fontFamily: "'Space Mono', monospace",
            border: revealedSide === "right" ? "2px solid #FFD700" : "1px solid #888",
            whiteSpace: "nowrap",
            boxShadow: revealedSide === "right" ? "0 0 20px rgba(255,87,51,0.5)" : "none",
            animation: "popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.1s both",
          }}>
            {rightLabel}
          </div>
        </div>
      )}

      {/* Hover hints */}
      {interactive && !revealedSide && (
        <div style={{
          display: "flex", justifyContent: "center", gap: 40,
          marginTop: 12, marginBottom: 20,
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
