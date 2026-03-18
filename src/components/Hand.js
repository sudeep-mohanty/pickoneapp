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
  const [pressed, setPressed] = useState(null);

  const vibrate = () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(30);
    }
  };

  const tapZoneStyle = (side) => {
    const isHovered = hovered === side;
    const isPressed = pressed === side;
    return {
      position: "absolute",
      ...(side === "left" ? { left: "18%" } : { right: "18%" }),
      top: "0%",
      width: "30%",
      height: "55%",
      cursor: "pointer",
      zIndex: 2,
      borderRadius: 14,
      background: isHovered ? "rgba(255,87,51,0.08)" : "transparent",
      border: isHovered ? "1.5px solid rgba(255,87,51,0.2)" : "1.5px solid transparent",
      transition: "var(--transition-fast)",
      transform: isPressed ? "scale(0.95)" : "scale(1)",
    };
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      maxWidth: 280,
      margin: "0 auto",
      userSelect: "none",
      WebkitTapHighlightColor: "transparent",
    }}>
      <div style={{
        position: "relative",
        fontSize: revealedSide ? 100 : 130,
        lineHeight: 1,
        textAlign: "center",
        filter: revealedSide
          ? "drop-shadow(0 4px 20px rgba(255,87,51,0.15))"
          : interactive
            ? "drop-shadow(0 4px 12px rgba(0,0,0,0.08))"
            : "none",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}>
        {interactive && (
          <>
            <div
              onClick={() => { vibrate(); onPickRight?.(); }}
              onMouseEnter={() => setHovered("left")}
              onMouseLeave={() => { setHovered(null); setPressed(null); }}
              onMouseDown={() => setPressed("left")}
              onMouseUp={() => setPressed(null)}
              onTouchStart={() => { setHovered("left"); setPressed("left"); }}
              onTouchEnd={() => { setHovered(null); setPressed(null); }}
              style={tapZoneStyle("left")}
              role="button"
              aria-label="Pick ring finger"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && onPickRight?.()}
            >
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: hovered === "left" ? "rgba(255,87,51,0.1)" : "rgba(0,0,0,0.03)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "var(--transition-fast)",
              }}>
                <span style={{
                  color: "var(--accent)",
                  fontSize: 16,
                  fontWeight: 700,
                  opacity: hovered === "left" ? 1 : 0.4,
                  transition: "var(--transition-fast)",
                }}>?</span>
              </div>
            </div>
            <div
              onClick={() => { vibrate(); onPickLeft?.(); }}
              onMouseEnter={() => setHovered("right")}
              onMouseLeave={() => { setHovered(null); setPressed(null); }}
              onMouseDown={() => setPressed("right")}
              onMouseUp={() => setPressed(null)}
              onTouchStart={() => { setHovered("right"); setPressed("right"); }}
              onTouchEnd={() => { setHovered(null); setPressed(null); }}
              style={tapZoneStyle("right")}
              role="button"
              aria-label="Pick index finger"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && onPickLeft?.()}
            >
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: hovered === "right" ? "rgba(255,87,51,0.1)" : "rgba(0,0,0,0.03)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "var(--transition-fast)",
              }}>
                <span style={{
                  color: "var(--accent)",
                  fontSize: 16,
                  fontWeight: 700,
                  opacity: hovered === "right" ? 1 : 0.4,
                  transition: "var(--transition-fast)",
                }}>?</span>
              </div>
            </div>
          </>
        )}

        <span style={{
          display: "block",
          animation: revealedSide
            ? "popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            : "none",
        }}>
          {revealedSide === "left" ? "\u261D\uFE0F" : revealedSide === "right" ? "\uD83D\uDD95" : "\u270C\uFE0F"}
        </span>
      </div>

      {/* Labels after reveal */}
      {revealedSide && (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
          marginTop: 16,
        }}>
          <div style={{
            background: revealedSide === "left" ? "var(--accent)" : "var(--surface)",
            color: revealedSide === "left" ? "#fff" : "var(--text-secondary)",
            padding: "10px 16px",
            borderRadius: "var(--radius-sm)",
            fontSize: 14,
            fontWeight: 600,
            border: revealedSide === "left" ? "none" : "1px solid var(--border)",
            wordBreak: "break-word",
            textAlign: "center",
            flex: 1,
            minWidth: 0,
            boxShadow: revealedSide === "left" ? "0 4px 14px rgba(255,87,51,0.2)" : "var(--shadow-xs)",
            animation: "popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          }}>
            {leftLabel}
          </div>
          <div style={{
            color: "var(--muted)",
            fontSize: 12,
            fontWeight: 600,
            flexShrink: 0,
            letterSpacing: 1,
          }}>
            vs
          </div>
          <div style={{
            background: revealedSide === "right" ? "var(--accent)" : "var(--surface)",
            color: revealedSide === "right" ? "#fff" : "var(--text-secondary)",
            padding: "10px 16px",
            borderRadius: "var(--radius-sm)",
            fontSize: 14,
            fontWeight: 600,
            border: revealedSide === "right" ? "none" : "1px solid var(--border)",
            wordBreak: "break-word",
            textAlign: "center",
            flex: 1,
            minWidth: 0,
            boxShadow: revealedSide === "right" ? "0 4px 14px rgba(255,87,51,0.2)" : "var(--shadow-xs)",
            animation: "popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.1s both",
          }}>
            {rightLabel}
          </div>
        </div>
      )}

      {/* Tap hints */}
      {interactive && !revealedSide && (
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: 48,
          marginTop: 16,
          marginBottom: 20,
        }}>
          <span style={{
            color: hovered === "left" ? "var(--accent)" : "var(--muted)",
            fontSize: 13,
            fontWeight: 600,
            transition: "var(--transition-fast)",
          }}>
            &#8592; this one?
          </span>
          <span style={{
            color: hovered === "right" ? "var(--accent)" : "var(--muted)",
            fontSize: 13,
            fontWeight: 600,
            transition: "var(--transition-fast)",
          }}>
            or this? &#8594;
          </span>
        </div>
      )}
    </div>
  );
}
