"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { getSession, pickFinger, onSessionUpdate } from "@/lib/firebase";
import Hand from "@/components/Hand";
import Confetti from "@/components/Confetti";
import ProgressBar from "@/components/ProgressBar";
import Footer from "@/components/Footer";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://pickoneapp.fun";

function ShareToast({ visible }) {
  if (!visible) return null;
  return (
    <div style={{
      position: "fixed", bottom: 30, left: "50%",
      transform: "translateX(-50%)",
      background: "#00E676", color: "#000",
      padding: "12px 24px", borderRadius: 30,
      fontFamily: "'Space Mono', monospace",
      fontSize: 14, fontWeight: 700, zIndex: 1000,
      animation: "popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      boxShadow: "0 4px 20px rgba(0,230,118,0.4)",
    }}>
      ✓ Copied!
    </div>
  );
}

// ── WAITING SCREEN (Creator sees this after creating) ──
function WaitingScreen({ session, shareUrl }) {
  const [toast, setToast] = useState(false);

  const handleShare = async () => {
    const text = `I set a choice for you — pick a finger! ✌️`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Pick One", text, url: shareUrl });
        return;
      } catch { /* user cancelled */ }
    }
    await navigator.clipboard.writeText(shareUrl);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  return (
    <div className="fade-up" style={{ textAlign: "center" }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>✌️</div>
      <h2 style={{
        fontFamily: "'Dela Gothic One', cursive",
        fontSize: 24, color: "#FAFAFA", margin: "0 0 8px",
      }}>
        Locked in!
      </h2>
      <p style={{
        color: "#888", fontFamily: "'Space Mono', monospace",
        fontSize: 13, marginBottom: 30,
      }}>
        Share this link. When they pick, you'll see it here.
      </p>

      {/* Link display with copy icon */}
      <div
        onClick={async () => {
          await navigator.clipboard.writeText(shareUrl);
          setToast(true);
          setTimeout(() => setToast(false), 2000);
        }}
        style={{
          background: "#1A1A1A",
          border: "2px solid #333",
          borderRadius: 14,
          padding: "14px 18px",
          fontFamily: "'Space Mono', monospace",
          fontSize: 14,
          color: "#FFD700",
          wordBreak: "break-all",
          marginBottom: 20,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 10,
          transition: "border-color 0.2s",
        }}
      >
        <span style={{ flex: 1 }}>{shareUrl}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      </div>

      <button
        onClick={handleShare}
        style={{
          width: "100%", padding: 18, fontSize: 16,
          fontFamily: "'Dela Gothic One', cursive",
          fontWeight: 700,
          background: "linear-gradient(135deg, #40C4FF, #FF4081)",
          color: "#000", border: "none", borderRadius: 16,
          cursor: "pointer", letterSpacing: 1,
          textTransform: "uppercase",
        }}
      >
        📤 Share Link
      </button>

      {/* Waiting animation */}
      <div style={{
        marginTop: 40, color: "#888",
        fontFamily: "'Space Mono', monospace",
        fontSize: 13,
      }}>
        <div style={{ animation: "pulse 2s ease-in-out infinite" }}>
          waiting for them to pick...
        </div>
      </div>

      <ShareToast visible={toast} />
    </div>
  );
}

// ── CHOOSER SCREEN (The other person sees this) ──
function ChooserScreen({ session, onPick }) {
  return (
    <div className="fade-up" style={{ textAlign: "center" }}>
      <p style={{
        color: "#888", fontFamily: "'Space Mono', monospace",
        fontSize: 13, marginBottom: 4,
      }}>
        Someone has a choice for you
      </p>
      <h2 style={{
        fontFamily: "'Dela Gothic One', cursive",
        fontSize: 28, color: "#FAFAFA", margin: "0 0 8px",
      }}>
        Pick a finger
      </h2>
      <p style={{
        color: "#FF5733",
        fontFamily: "'Space Mono', monospace",
        fontSize: 12, marginBottom: 30,
      }}>
        tap to reveal what's behind it
      </p>

      <Hand
        interactive={true}
        onPickLeft={() => onPick("left")}
        onPickRight={() => onPick("right")}
      />
    </div>
  );
}

// ── REVEAL SCREEN (Both see this) ──
function RevealScreen({ session }) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [toast, setToast] = useState(false);

  const chosen = session.picked === "left" ? session.opt1 : session.opt2;
  const shareText = `🖕 The finger has spoken: "${chosen}"!\n\n"${session.opt1}" vs "${session.opt2}" — settled in one tap.`;
  const shareUrl = BASE_URL;
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(shareUrl);

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(t);
  }, []);

  const handleCopy = async () => {
    const text = `${shareText}\n\nTry it → ${shareUrl}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Pick One", text });
        return;
      } catch { /* cancelled */ }
    }
    await navigator.clipboard.writeText(text);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  const socialBtnStyle = {
    flex: 1, padding: "12px 8px", fontSize: 13,
    fontFamily: "'Space Mono', monospace", fontWeight: 700,
    border: "none", borderRadius: 12, cursor: "pointer",
    textDecoration: "none", textAlign: "center",
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: 6,
  };

  return (
    <div className="fade-up" style={{ textAlign: "center" }}>
      <Confetti active={showConfetti} />

      <div style={{
        fontSize: 14, color: "#888",
        fontFamily: "'Space Mono', monospace", marginBottom: 8,
      }}>
        the finger has spoken
      </div>

      <h2 style={{
        fontFamily: "'Dela Gothic One', cursive",
        fontSize: 22, color: "#FFD700",
        margin: "0 0 24px",
        animation: "popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      }}>
        It's decided!
      </h2>

      <Hand
        interactive={false}
        revealedSide={session.picked}
        leftLabel={session.opt1}
        rightLabel={session.opt2}
      />

      {/* The big result */}
      <div style={{
        marginTop: 30,
        padding: "20px 24px",
        background: "linear-gradient(135deg, rgba(255,87,51,0.15), rgba(255,215,0,0.15))",
        borderRadius: 20,
        border: "2px solid #FF5733",
        animation: "popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s both",
      }}>
        <div style={{
          color: "#888",
          fontFamily: "'Space Mono', monospace",
          fontSize: 11, textTransform: "uppercase",
          letterSpacing: 2, marginBottom: 6,
        }}>
          The choice is
        </div>
        <div style={{
          fontFamily: "'Dela Gothic One', cursive",
          fontSize: 28, color: "#FAFAFA",
        }}>
          {chosen}
        </div>
      </div>

      {/* Social share buttons */}
      <div style={{
        marginTop: 24, marginBottom: 8,
        color: "#555", fontFamily: "'Space Mono', monospace",
        fontSize: 11, textTransform: "uppercase", letterSpacing: 2,
      }}>
        Share the verdict
      </div>
      {/* Row 1: Main platforms */}
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <a
          href={`https://wa.me/?text=${encodedText}%0A%0ATry%20it%20→%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...socialBtnStyle, background: "#25D366", color: "#fff" }}
        >
          WhatsApp
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...socialBtnStyle, background: "#000", color: "#FAFAFA", border: "2px solid #333" }}
        >
          𝕏 Post
        </a>
        <a
          href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...socialBtnStyle, background: "#0088cc", color: "#fff" }}
        >
          Telegram
        </a>
      </div>
      {/* Row 2: More platforms + copy */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...socialBtnStyle, background: "#1877F2", color: "#fff" }}
        >
          Facebook
        </a>
        <a
          href={`https://www.reddit.com/submit?url=${encodedUrl}&title=${encodeURIComponent(`The finger has spoken: "${chosen}"!`)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...socialBtnStyle, background: "#FF4500", color: "#fff" }}
        >
          Reddit
        </a>
        <button
          onClick={handleCopy}
          style={{ ...socialBtnStyle, background: "linear-gradient(135deg, #40C4FF, #FF4081)", color: "#000" }}
        >
          📤 Copy
        </button>
      </div>

      {/* CTA: Make your own */}
      <a
        href="/"
        style={{
          display: "block", width: "100%", padding: 16, fontSize: 15,
          fontFamily: "'Dela Gothic One', cursive", fontWeight: 700,
          background: "linear-gradient(135deg, #FF5733, #FFD700)",
          color: "#000", border: "none", borderRadius: 14,
          cursor: "pointer", textDecoration: "none",
          textAlign: "center", letterSpacing: 1,
          textTransform: "uppercase",
        }}
      >
        ✌️ Make your own
      </a>

      <ShareToast visible={toast} />
    </div>
  );
}

// ── LOADING SCREEN ──
function LoadingScreen() {
  return (
    <div style={{ textAlign: "center", padding: "80px 0" }}>
      <div style={{ fontSize: 48, marginBottom: 16, animation: "pulse 1.5s ease-in-out infinite" }}>✌️</div>
      <div style={{
        color: "#888", fontFamily: "'Space Mono', monospace", fontSize: 13,
      }}>
        loading...
      </div>
    </div>
  );
}

// ── NOT FOUND ──
function NotFoundScreen() {
  return (
    <div className="fade-up" style={{ textAlign: "center", padding: "80px 0" }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🤷</div>
      <h2 style={{
        fontFamily: "'Dela Gothic One', cursive",
        fontSize: 24, color: "#FAFAFA", margin: "0 0 8px",
      }}>
        Not found
      </h2>
      <p style={{
        color: "#888", fontFamily: "'Space Mono', monospace",
        fontSize: 13, marginBottom: 24,
      }}>
        This link may have expired or doesn't exist.
      </p>
      <a
        href="/"
        style={{
          display: "inline-block",
          padding: "14px 28px", fontSize: 14,
          fontFamily: "'Dela Gothic One', cursive",
          background: "linear-gradient(135deg, #FF5733, #FFD700)",
          color: "#000", borderRadius: 14,
          textDecoration: "none", fontWeight: 700,
        }}
      >
        Create your own ✌️
      </a>
    </div>
  );
}

// ── MAIN SESSION PAGE ──
export default function SessionPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id;
  const isCreator = searchParams.get("role") === "creator";

  const [session, setSession] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | notfound | ready
  const [picking, setPicking] = useState(false);

  // Load session + subscribe to real-time updates
  useEffect(() => {
    if (!id) return;

    let unsubscribe;

    const init = async () => {
      try {
        const data = await getSession(id);
        if (!data) {
          setStatus("notfound");
          return;
        }
        setSession(data);
        setStatus("ready");

        // Subscribe to real-time updates (for creator waiting for pick)
        unsubscribe = onSessionUpdate(id, (updated) => {
          setSession(updated);
        });
      } catch (err) {
        console.error("Failed to load session:", err);
        setStatus("notfound");
      }
    };

    init();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [id]);

  const handlePick = useCallback(async (side) => {
    if (picking) return;
    setPicking(true);
    try {
      await pickFinger(id, side);
      // Real-time listener will update the session
    } catch (err) {
      console.error("Failed to pick:", err);
      setPicking(false);
    }
  }, [id, picking]);

  // Determine which screen to show
  const renderContent = () => {
    if (status === "loading") return <LoadingScreen />;
    if (status === "notfound") return <NotFoundScreen />;

    const picked = session?.picked;
    const shareUrl = `${BASE_URL}/${id}`;

    // Already picked → show reveal
    if (picked) {
      return (
        <>
          <ProgressBar step="result" />
          <RevealScreen session={session} />
        </>
      );
    }

    // Creator waiting for pick
    if (isCreator) {
      return (
        <>
          <ProgressBar step="waiting" />
          <WaitingScreen session={session} shareUrl={shareUrl} />
        </>
      );
    }

    // Chooser's turn
    return (
      <>
        <ProgressBar step="pick" />
        <ChooserScreen session={session} onPick={handlePick} />
      </>
    );
  };

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    }}>
      <div style={{ width: "100%", maxWidth: 380 }}>
        {renderContent()}
        <Footer />
      </div>
    </main>
  );
}
