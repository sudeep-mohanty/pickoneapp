"use client";

const STEPS = ["create", "pick", "result"];
const LABELS = { create: "Create", pick: "Pick", result: "Result", waiting: "Waiting" };

export default function ProgressBar({ step }) {
  const idx = STEPS.indexOf(step);

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 32,
      padding: "0 2px",
    }}>
      <div style={{
        fontSize: 12,
        fontWeight: 600,
        color: "var(--text-secondary)",
        letterSpacing: 1,
        textTransform: "uppercase",
      }}>
        {LABELS[step] || step}
      </div>
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
        {STEPS.map((s, i) => (
          <div key={s} style={{
            width: idx >= i ? 28 : 18,
            height: 4,
            borderRadius: 100,
            background: idx >= i ? "var(--accent)" : "var(--border)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }} />
        ))}
      </div>
    </div>
  );
}
