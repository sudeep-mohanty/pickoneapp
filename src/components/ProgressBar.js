"use client";

const STEPS = ["create", "pick", "result"];
const LABELS = { create: "CREATE", pick: "PICK", result: "RESULT", waiting: "WAITING" };

export default function ProgressBar({ step }) {
  const idx = STEPS.indexOf(step);

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 30,
      padding: "0 4px",
    }}>
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: 11,
        color: "#888",
        letterSpacing: 2,
        textTransform: "uppercase",
      }}>
        {LABELS[step] || step}
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {STEPS.map((s, i) => (
          <div key={s} style={{
            width: 24, height: 4, borderRadius: 2,
            background: idx >= i ? "#FF5733" : "#333",
            transition: "background 0.3s",
          }} />
        ))}
      </div>
    </div>
  );
}
