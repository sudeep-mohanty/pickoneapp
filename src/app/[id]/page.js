import { Suspense } from "react";
import { getSessionServer } from "@/lib/firebase-server";
import SessionClient from "@/components/SessionClient";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://pickoneapp.fun";

// Dynamic OG tags — this is what WhatsApp/iMessage/Twitter show as a preview
export async function generateMetadata({ params }) {
  const { id } = await params;
  const session = await getSessionServer(id);

  if (!session) {
    return {
      title: "Pick One ✌️",
      description: "This link may have expired.",
    };
  }

  // If already picked, show the result in the preview
  if (session.picked) {
    const chosen = session.picked === "left" ? session.opt1 : session.opt2;
    return {
      title: `The choice was: ${chosen}! 🎉`,
      description: `"${session.opt1}" vs "${session.opt2}" — Pick One decided!`,
      openGraph: {
        title: `The choice was: ${chosen}! 🎉`,
        description: `"${session.opt1}" vs "${session.opt2}" — Pick One decided!`,
        url: `${BASE_URL}/${id}`,
        images: [{ url: `${BASE_URL}/og-default.png`, width: 1200, height: 630 }],
      },
      twitter: {
        card: "summary_large_image",
        title: `The choice was: ${chosen}! 🎉`,
        description: `"${session.opt1}" vs "${session.opt2}" — Pick One decided!`,
        images: [`${BASE_URL}/og-default.png`],
      },
    };
  }

  // Not yet picked — enticing preview for the chooser
  return {
    title: "Someone has a choice for you 👆",
    description: "Tap a finger to reveal what's behind it ✌️",
    openGraph: {
      title: "Someone has a choice for you 👆",
      description: "Tap a finger to reveal what's behind it ✌️",
      url: `${BASE_URL}/${id}`,
      images: [{ url: `${BASE_URL}/og-default.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Someone has a choice for you 👆",
      description: "Tap a finger to reveal what's behind it ✌️",
      images: [`${BASE_URL}/og-default.png`],
    },
  };
}

export default function SessionPage() {
  return (
    <Suspense fallback={
      <main style={{
        minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "#0D0D0D",
      }}>
        <div style={{
          fontSize: 48,
          animation: "pulse 1.5s ease-in-out infinite",
        }}>✌️</div>
      </main>
    }>
      <SessionClient />
    </Suspense>
  );
}
