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
      position: "fixed",
      bottom: 32,
      left: "50%",
      transform: "translateX(-50%)",
      background: "var(--green)",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "var(--radius-pill)",
      fontSize: 14,
      fontWeight: 600,
      zIndex: 1000,
      animation: "toastIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      boxShadow: "0 8px 24px rgba(16,185,129,0.25)",
      display: "flex",
      alignItems: "center",
      gap: 6,
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      Copied!
    </div>
  );
}

// ── WAITING SCREEN ──
function WaitingScreen({ session, shareUrl, onPick }) {
  const [toast, setToast] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [shareHovered, setShareHovered] = useState(false);

  const handleShare = async () => {
    const text = `I set a choice for you \u2014 pick a finger! \u270C\uFE0F`;
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
      <div style={{
        fontSize: 52,
        marginBottom: 12,
        animation: "float 3s ease-in-out infinite",
      }}>
        &#9996;&#65039;
      </div>
      <h2 style={{
        fontFamily: "'Dela Gothic One', cursive",
        fontSize: 28,
        color: "var(--text)",
        margin: "0 0 12px",
        letterSpacing: -0.5,
      }}>
        Locked in!
      </h2>

      {/* Options pill */}
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 18px",
        background: "var(--surface)",
        borderRadius: "var(--radius-pill)",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-xs)",
        marginBottom: 8,
      }}>
        <span style={{ color: "var(--text)", fontSize: 14, fontWeight: 500 }}>
          {session.opt1}
        </span>
        <span style={{ color: "var(--accent)", fontSize: 12, fontWeight: 700 }}>vs</span>
        <span style={{ color: "var(--text)", fontSize: 14, fontWeight: 500 }}>
          {session.opt2}
        </span>
      </div>

      <p style={{
        color: "var(--text-secondary)",
        fontSize: 14,
        marginBottom: 28,
        fontWeight: 400,
      }}>
        Ask someone to pick one!
      </p>

      <Hand
        interactive={true}
        onPickLeft={() => onPick("left")}
        onPickRight={() => onPick("right")}
      />

      {/* Divider */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "28px 0" }}>
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        <span style={{
          color: "var(--muted)",
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: 2,
        }}>or share</span>
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
      </div>

      {/* Link display */}
      <div
        onClick={async () => {
          await navigator.clipboard.writeText(shareUrl);
          setToast(true);
          setTimeout(() => setToast(false), 2000);
        }}
        onMouseEnter={() => setLinkHovered(true)}
        onMouseLeave={() => setLinkHovered(false)}
        style={{
          background: "var(--surface)",
          border: `1px solid ${linkHovered ? "var(--accent)" : "var(--border)"}`,
          borderRadius: "var(--radius-md)",
          padding: "14px 16px",
          fontSize: 14,
          fontWeight: 500,
          color: "var(--accent)",
          wordBreak: "break-all",
          marginBottom: 12,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 12,
          transition: "var(--transition-fast)",
          boxShadow: linkHovered ? "var(--shadow-glow)" : "var(--shadow-xs)",
        }}
      >
        <span style={{ flex: 1, lineHeight: 1.4 }}>{shareUrl}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      </div>

      <button
        onClick={handleShare}
        onMouseEnter={() => setShareHovered(true)}
        onMouseLeave={() => setShareHovered(false)}
        style={{
          width: "100%",
          padding: "14px 24px",
          fontSize: 15,
          fontWeight: 600,
          background: shareHovered ? "var(--elevated)" : "var(--surface)",
          color: "var(--text)",
          border: `1px solid ${shareHovered ? "var(--border-hover)" : "var(--border)"}`,
          borderRadius: "var(--radius-sm)",
          cursor: "pointer",
          transition: "var(--transition-medium)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
        Send to someone
      </button>

      <ShareToast visible={toast} />
    </div>
  );
}

// ── CHOOSER SCREEN ──
function ChooserScreen({ session, onPick }) {
  return (
    <div className="fade-up" style={{ textAlign: "center" }}>
      <p style={{
        color: "var(--text-secondary)",
        fontSize: 14,
        marginBottom: 6,
        fontWeight: 400,
      }}>
        Someone has a choice for you
      </p>
      <h2 style={{
        fontFamily: "'Dela Gothic One', cursive",
        fontSize: 32,
        color: "var(--text)",
        margin: "0 0 8px",
        letterSpacing: -0.5,
      }}>
        Pick a finger
      </h2>
      <p style={{
        color: "var(--accent-soft)",
        fontSize: 14,
        fontWeight: 500,
        marginBottom: 32,
      }}>
        Tap to reveal what&apos;s behind it
      </p>

      <Hand
        interactive={true}
        onPickLeft={() => onPick("left")}
        onPickRight={() => onPick("right")}
      />
    </div>
  );
}

// ── REVEAL SCREEN ──
function RevealScreen({ session }) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [toast, setToast] = useState(false);
  const [shareHovered, setShareHovered] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);

  const chosen = session.picked === "left" ? session.opt1 : session.opt2;
  const shareText = `The finger has spoken: "${chosen}"!\n\n"${session.opt1}" vs "${session.opt2}" \u2014 settled in one tap.`;
  const shareUrl = BASE_URL;

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(t);
  }, []);

  const handleShare = async () => {
    const text = `${shareText}\n\nTry it \u2192 ${shareUrl}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Pick One", text, url: shareUrl });
        return;
      } catch { /* cancelled */ }
    }
    await navigator.clipboard.writeText(text);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  return (
    <div className="fade-up" style={{ textAlign: "center" }}>
      <Confetti active={showConfetti} />

      <div style={{
        fontSize: 14,
        color: "var(--text-secondary)",
        fontWeight: 500,
        marginBottom: 6,
      }}>
        The finger has spoken
      </div>

      <h2 style={{
        fontFamily: "'Dela Gothic One', cursive",
        fontSize: 26,
        color: "var(--accent)",
        margin: "0 0 24px",
        letterSpacing: -0.5,
        animation: "popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      }}>
        It&apos;s decided!
      </h2>

      <Hand
        interactive={false}
        revealedSide={session.picked}
        leftLabel={session.opt1}
        rightLabel={session.opt2}
      />

      {/* Result card */}
      <div style={{
        marginTop: 32,
        padding: "24px",
        background: "var(--accent-bg)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid rgba(255,87,51,0.2)",
        animation: "popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s both",
        boxShadow: "var(--shadow-md)",
      }}>
        <div style={{
          color: "var(--text-secondary)",
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: 2,
          marginBottom: 8,
        }}>
          The choice is
        </div>
        <div style={{
          fontFamily: "'Dela Gothic One', cursive",
          fontSize: chosen.length > 20 ? 22 : 30,
          color: "var(--text)",
          wordBreak: "break-word",
          lineHeight: 1.2,
        }}>
          {chosen}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 24 }}>
        <button
          onClick={handleShare}
          onMouseEnter={() => setShareHovered(true)}
          onMouseLeave={() => setShareHovered(false)}
          style={{
            width: "100%",
            padding: "14px 24px",
            fontSize: 15,
            fontWeight: 600,
            background: shareHovered ? "var(--elevated)" : "var(--surface)",
            color: "var(--text)",
            border: `1px solid ${shareHovered ? "var(--border-hover)" : "var(--border)"}`,
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
            transition: "var(--transition-medium)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
          Share the verdict
        </button>

        <a
          href="/"
          onMouseEnter={() => setCtaHovered(true)}
          onMouseLeave={() => setCtaHovered(false)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            width: "100%",
            padding: "14px 24px",
            fontSize: 15,
            fontWeight: 700,
            background: "var(--accent)",
            color: "#fff",
            border: "none",
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
            textDecoration: "none",
            textAlign: "center",
            transition: "var(--transition-medium)",
            boxShadow: ctaHovered
              ? "0 6px 20px rgba(255,87,51,0.35)"
              : "0 4px 14px rgba(255,87,51,0.2)",
            transform: ctaHovered ? "translateY(-1px)" : "translateY(0)",
          }}
        >
          &#9996;&#65039; Make your own
        </a>
      </div>

      <ShareToast visible={toast} />
    </div>
  );
}

// ── LOADING SCREEN ──
function LoadingScreen() {
  return (
    <div style={{
      textAlign: "center",
      padding: "80px 0",
      animation: "fadeIn 0.3s ease",
    }}>
      <div style={{
        fontSize: 52,
        marginBottom: 20,
        animation: "float 2s ease-in-out infinite",
      }}>
        &#9996;&#65039;
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--muted)",
            animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
          }} />
        ))}
      </div>
    </div>
  );
}

// ── NOT FOUND ──
function NotFoundScreen() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fade-up" style={{ textAlign: "center", padding: "80px 0" }}>
      <div style={{ fontSize: 52, marginBottom: 20 }}>&#129335;</div>
      <h2 style={{
        fontFamily: "'Dela Gothic One', cursive",
        fontSize: 26,
        color: "var(--text)",
        margin: "0 0 10px",
        letterSpacing: -0.5,
      }}>
        Not found
      </h2>
      <p style={{
        color: "var(--text-secondary)",
        fontSize: 14,
        fontWeight: 400,
        marginBottom: 28,
        lineHeight: 1.5,
      }}>
        This link may have expired or doesn&apos;t exist.
      </p>
      <a
        href="/"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "14px 28px",
          fontSize: 15,
          fontWeight: 700,
          background: "var(--accent)",
          color: "#fff",
          borderRadius: "var(--radius-sm)",
          textDecoration: "none",
          transition: "var(--transition-medium)",
          boxShadow: hovered
            ? "0 6px 20px rgba(255,87,51,0.35)"
            : "0 4px 14px rgba(255,87,51,0.2)",
          transform: hovered ? "translateY(-1px)" : "translateY(0)",
        }}
      >
        Create your own &#9996;&#65039;
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
  const [status, setStatus] = useState("loading");
  const [picking, setPicking] = useState(false);

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
        unsubscribe = onSessionUpdate(id, (updated) => {
          setSession(updated);
        });
      } catch (err) {
        console.error("Failed to load session:", err);
        setStatus("notfound");
      }
    };

    init();
    return () => { if (unsubscribe) unsubscribe(); };
  }, [id]);

  const handlePick = useCallback(async (side) => {
    if (picking) return;
    setPicking(true);
    try {
      await pickFinger(id, side);
    } catch (err) {
      console.error("Failed to pick:", err);
      setPicking(false);
    }
  }, [id, picking]);

  const renderContent = () => {
    if (status === "loading") return <LoadingScreen />;
    if (status === "notfound") return <NotFoundScreen />;

    const picked = session?.picked;
    const shareUrl = `${BASE_URL}/${id}`;

    if (picked) {
      return (
        <>
          <ProgressBar step="result" />
          <RevealScreen session={session} />
        </>
      );
    }

    if (isCreator) {
      return (
        <>
          <ProgressBar step="waiting" />
          <WaitingScreen session={session} shareUrl={shareUrl} onPick={handlePick} />
        </>
      );
    }

    return (
      <>
        <ProgressBar step="pick" />
        <ChooserScreen session={session} onPick={handlePick} />
      </>
    );
  };

  return (
    <main style={{
      minHeight: "100dvh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 20px",
    }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        {renderContent()}
        <Footer />
      </div>
    </main>
  );
}
