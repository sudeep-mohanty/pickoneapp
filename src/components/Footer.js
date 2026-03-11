"use client";

export default function Footer() {
  return (
    <footer style={{
      textAlign: "center",
      marginTop: 60,
      paddingBottom: 24,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
    }}>
      <a
        href="https://ko-fi.com/pickoneapp"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "#888",
          fontSize: 12,
          textDecoration: "none",
          fontFamily: "'Space Mono', monospace",
          padding: "6px 14px",
          borderRadius: 20,
          border: "1px solid #333",
          transition: "all 0.3s",
        }}
        onMouseEnter={(e) => {
          e.target.style.borderColor = "#FF5733";
          e.target.style.color = "#FAFAFA";
        }}
        onMouseLeave={(e) => {
          e.target.style.borderColor = "#333";
          e.target.style.color = "#888";
        }}
      >
        ☕ Support this app
      </a>
      <div style={{
        color: "#333",
        fontFamily: "'Space Mono', monospace",
        fontSize: 10,
        letterSpacing: 1,
      }}>
        made with ✌️
      </div>
    </footer>
  );
}
