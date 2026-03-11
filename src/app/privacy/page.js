export const metadata = {
  title: "Privacy Policy — Pick One",
};

export default function PrivacyPage() {
  const s = {
    page: {
      minHeight: "100vh", padding: "40px 20px",
      display: "flex", justifyContent: "center",
    },
    container: {
      maxWidth: 600, width: "100%",
      fontFamily: "'Space Mono', monospace", color: "#FAFAFA",
    },
    h1: {
      fontFamily: "'Dela Gothic One', cursive",
      fontSize: 28, marginBottom: 24,
    },
    h2: { fontSize: 16, color: "#FF5733", marginTop: 24, marginBottom: 8 },
    p: { fontSize: 13, color: "#aaa", lineHeight: 1.8, marginBottom: 12 },
    link: { color: "#FF5733", textDecoration: "none" },
  };

  return (
    <main style={s.page}>
      <div style={s.container}>
        <h1 style={s.h1}>Privacy Policy</h1>
        <p style={s.p}>Last updated: March 2026</p>

        <h2 style={s.h2}>What We Collect</h2>
        <p style={s.p}>
          Almost nothing. When you create a session, we store the two option texts
          you enter and which finger was picked. That's it. No names, no emails,
          no accounts, no tracking cookies.
        </p>

        <h2 style={s.h2}>How Data Is Stored</h2>
        <p style={s.p}>
          Session data is stored in Google Firebase (Firestore) and is
          automatically deleted after 24 hours. We don't retain any data
          beyond what's needed for the app to function.
        </p>

        <h2 style={s.h2}>Analytics</h2>
        <p style={s.p}>
          We use Firebase Analytics to understand basic usage patterns
          (page views, session counts). This data is anonymous and aggregated.
          No personal information is collected.
        </p>

        <h2 style={s.h2}>Third-Party Services</h2>
        <p style={s.p}>
          We use Google Firebase for data storage and analytics. Their privacy
          policy applies to data processed by their services.
        </p>

        <h2 style={s.h2}>Contact</h2>
        <p style={s.p}>
          Questions? Reach out at privacy@pickoneapp.fun
        </p>

        <div style={{ marginTop: 40 }}>
          <a href="/" style={s.link}>← Back to Pick One</a>
        </div>
      </div>
    </main>
  );
}
