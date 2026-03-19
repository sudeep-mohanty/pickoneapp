"use client";
import { useState } from "react";

export default function Footer() {
  const [kofiHovered, setKofiHovered] = useState(false);
  const [easterEggHovered, setEasterEggHovered] = useState(false);

  return (
    <footer style={{
      textAlign: "center",
      marginTop: 56,
      paddingBottom: 28,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
    }}>
      <a
        href="https://ko-fi.com/sudeepmohanty"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setKofiHovered(true)}
        onMouseLeave={() => setKofiHovered(false)}
        style={{
          color: kofiHovered ? "var(--text)" : "var(--muted)",
          fontSize: 13,
          fontWeight: 500,
          textDecoration: "none",
          padding: "8px 18px",
          borderRadius: "var(--radius-pill)",
          background: kofiHovered ? "var(--elevated)" : "transparent",
          border: `1px solid ${kofiHovered ? "var(--border-hover)" : "var(--border)"}`,
          transition: "var(--transition-medium)",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span style={{ fontSize: 14 }}>&#9749;</span>
        Support this app
      </a>
      <div style={{
        color: "var(--border)",
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: 0.5,
        position: "relative",
        display: "inline-block",
      }}>
        made with{" "}
        <a
          href="https://github.com/sudeep-mohanty/pickoneapp"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setEasterEggHovered(true)}
          onMouseLeave={() => setEasterEggHovered(false)}
          style={{
            textDecoration: "none",
            cursor: "pointer",
            position: "relative",
            display: "inline-block",
          }}
        >
          <span style={{
            fontSize: 14,
            filter: easterEggHovered ? "brightness(1.4)" : "brightness(1)",
            transition: "filter 0.2s ease",
            display: "inline-block",
          }}>
            &#9996;&#65039;
          </span>
          {easterEggHovered && (
            <span style={{
              position: "absolute",
              bottom: "calc(100% + 6px)",
              left: "50%",
              transform: "translateX(-50%)",
              background: "var(--elevated)",
              border: "1px solid var(--border-hover)",
              color: "var(--muted)",
              fontSize: 10,
              fontWeight: 500,
              padding: "4px 8px",
              borderRadius: 6,
              whiteSpace: "nowrap",
              pointerEvents: "none",
            }}>
              view source ↗
            </span>
          )}
        </a>
      </div>
    </footer>
  );
}
