"use client";
import { useState } from "react";

export default function FeedbackForm() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.trim(), email: email.trim() || null }),
      });
      if (!res.ok) throw new Error("Send failed");
      setStatus("sent");
      setMessage("");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div style={{
        padding: "16px 20px",
        background: "var(--green-bg)",
        borderRadius: "var(--radius-sm)",
        border: "1px solid var(--green)",
        color: "var(--green)",
        fontSize: 14,
        fontWeight: 500,
      }}>
        Thanks for your message! We'll look into it.
      </div>
    );
  }

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    fontSize: 14,
    fontFamily: "'Inter', -apple-system, sans-serif",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-sm)",
    background: "var(--surface)",
    color: "var(--text)",
    outline: "none",
    transition: "var(--transition-fast)",
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Your question or feedback..."
        maxLength={500}
        required
        rows={3}
        style={{ ...inputStyle, resize: "vertical", minHeight: 80 }}
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email (optional — only if you want a reply)"
        maxLength={100}
        style={inputStyle}
      />
      <button
        type="submit"
        disabled={!message.trim() || status === "sending"}
        style={{
          alignSelf: "flex-start",
          padding: "10px 24px",
          fontSize: 14,
          fontWeight: 600,
          fontFamily: "'Inter', -apple-system, sans-serif",
          color: "#fff",
          background: !message.trim() || status === "sending" ? "var(--muted)" : "var(--accent)",
          border: "none",
          borderRadius: "var(--radius-pill)",
          cursor: !message.trim() || status === "sending" ? "default" : "pointer",
          transition: "var(--transition-fast)",
        }}
      >
        {status === "sending" ? "Sending..." : "Send"}
      </button>
      {status === "error" && (
        <p style={{ color: "var(--pink)", fontSize: 13 }}>
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
