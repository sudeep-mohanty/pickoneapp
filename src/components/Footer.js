"use client";
import { useState } from "react";

export default function Footer() {
  const [hovered, setHovered] = useState(false);

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
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          color: hovered ? "var(--text)" : "var(--muted)",
          fontSize: 13,
          fontWeight: 500,
          textDecoration: "none",
          padding: "8px 18px",
          borderRadius: "var(--radius-pill)",
          background: hovered ? "var(--elevated)" : "transparent",
          border: `1px solid ${hovered ? "var(--border-hover)" : "var(--border)"}`,
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
      }}>
        made with &#9996;&#65039;
      </div>
    </footer>
  );
}
