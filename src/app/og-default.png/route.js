import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 120, marginBottom: 20 }}>✌️</div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#FAFAFA",
            marginBottom: 16,
          }}
        >
          Pick One
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#888888",
            fontFamily: "monospace",
            marginBottom: 40,
          }}
        >
          set two options. share the link. let fate decide.
        </div>
        <div
          style={{
            width: 240,
            height: 3,
            background: "linear-gradient(90deg, #FF5733, #FFD700)",
            borderRadius: 2,
            marginBottom: 40,
          }}
        />
        <div
          style={{
            fontSize: 20,
            color: "#FF5733",
            fontFamily: "monospace",
          }}
        >
          pickoneapp.fun
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
