import "./globals.css";

export const metadata = {
  title: "Pick One — The Two-Finger Decision Maker",
  description:
    "Set two options. Share the link. Let fate decide. The simplest way to make a choice together.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://pickoneapp.fun"),
  openGraph: {
    title: "Pick One",
    description: "Set two options. Share the link. Let fate decide.",
    url: "/",
    siteName: "Pick One",
    type: "website",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Pick One — The Two-Finger Decision Maker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pick One",
    description: "Set two options. Share the link. Let fate decide.",
    images: ["/og-default.png"],
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/icon-192.svg",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAFAFA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
