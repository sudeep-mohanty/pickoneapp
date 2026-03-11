"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSession } from "@/lib/firebase";
import ProgressBar from "@/components/ProgressBar";
import Footer from "@/components/Footer";

export default function HomePage() {
  const router = useRouter();
  const [opt1, setOpt1] = useState("");
  const [opt2, setOpt2] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);

  const canSubmit = opt1.trim() && opt2.trim() && !loading;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);

    try {
      const id = await createSession(opt1.trim(), opt2.trim());
      // Navigate to the session page in "creator" mode
      router.push(`/${id}?role=creator`);
    } catch (err) {
      console.error("Failed to create session:", err);
      setLoading(false);
    }
  };

  const inputStyle = (isFocused) => ({
    width: "100%",
    padding: "16px 20px",
    fontSize: 18,
    fontFamily: "'Space Mono', monospace",
    background: isFocused ? "#222" : "#1A1A1A",
    color: "#FAFAFA",
    border: isFocused ? "2px solid #FF5733" : "2px solid #333",
    borderRadius: 14,
    outline: "none",
    transition: "all 0.3s",
  });

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    }}>
      <div style={{ width: "100%", maxWidth: 380 }}>
        <ProgressBar step="create" />

        <div className="fade-up">
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>✌️</div>
            <h1 style={{
              fontFamily: "'Dela Gothic One', cursive",
              fontSize: 36,
              color: "#FAFAFA",
              margin: 0,
              letterSpacing: -1,
            }}>
              Pick One
            </h1>
            <p style={{
              color: "#888",
              fontFamily: "'Space Mono', monospace",
              fontSize: 13,
              marginTop: 8,
            }}>
              set two options. share the link. let fate decide.
            </p>
          </div>

          {/* Inputs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
            <div>
              <label style={{
                color: "#FF5733",
                fontFamily: "'Space Mono', monospace",
                fontSize: 12, fontWeight: 700,
                marginBottom: 6, display: "block",
                textTransform: "uppercase", letterSpacing: 2,
              }}>
                <span style={{ fontSize: 22, verticalAlign: "middle" }}>☝️</span> Index finger
              </label>
              <input
                value={opt1}
                onChange={(e) => setOpt1(e.target.value)}
                onFocus={() => setFocused(1)}
                onBlur={() => setFocused(null)}
                placeholder="Pizza tonight"
                maxLength={50}
                style={inputStyle(focused === 1)}
                onKeyDown={(e) => e.key === "Enter" && document.getElementById("opt2-input")?.focus()}
              />
            </div>
            <div>
              <label style={{
                color: "#FFD700",
                fontFamily: "'Space Mono', monospace",
                fontSize: 12, fontWeight: 700,
                marginBottom: 6, display: "block",
                textTransform: "uppercase", letterSpacing: 2,
              }}>
                <span style={{ fontSize: 22, verticalAlign: "middle" }}>🖕</span> Ring finger
              </label>
              <input
                id="opt2-input"
                value={opt2}
                onChange={(e) => setOpt2(e.target.value)}
                onFocus={() => setFocused(2)}
                onBlur={() => setFocused(null)}
                placeholder="Sushi tonight"
                maxLength={50}
                style={inputStyle(focused === 2)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            style={{
              width: "100%",
              padding: 18,
              fontSize: 18,
              fontFamily: "'Dela Gothic One', cursive",
              fontWeight: 700,
              background: canSubmit
                ? "linear-gradient(135deg, #FF5733, #FFD700)"
                : "#333",
              color: canSubmit ? "#000" : "#666",
              border: "none",
              borderRadius: 16,
              cursor: canSubmit ? "pointer" : "not-allowed",
              transition: "all 0.3s",
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {loading ? "Creating..." : "Lock it in 🔒"}
          </button>
        </div>

        <Footer />
      </div>
    </main>
  );
}
