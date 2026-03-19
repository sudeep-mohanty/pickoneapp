"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createSession } from "@/lib/firebase";
import ProgressBar from "@/components/ProgressBar";
import Footer from "@/components/Footer";

const PLACEHOLDER_PAIRS = [
  ["Trump", "Putin"],
  ["Netflix", "Chill"],
  ["Gym bro", "Couch potato"],
  ["Oat milk", "Real milk"],
  ["Reply to ex", "Block the ex"],
  ["Doomscroll", "Touch grass"],
  ["Side hustle", "Quiet quit"],
  ["Therapy", "Retail therapy"],
  ["Ozempic", "Gym membership"],
  ["Work from home", "Pretend to work"],
  ["Bitcoin", "Beanie Babies"],
  ["Eras Tour", "Stay home crying"],
  ["Hot take", "Delete the tweet"],
  ["Move to Europe", "Fix America"],
  ["AI takes my job", "I become AI"],
  ["Couples therapy", "Reddit advice"],
  ["Aperol Spritz", "Espresso Martini"],
  ["Duolingo streak", "Accept defeat"],
  ["Send the risky text", "Screenshot it"],
  ["Adopt a cat", "Adopt three cats"],
  ["Sobbing in car", "Sobbing at desk"],
  ["Raw dog the flight", "Bring 4 screens"],
  ["Situationship", "Die alone"],
  ["Be delulu", "Face reality"],
  ["Roman Empire", "Her Roman Empire"],
  ["Bare minimum", "Grand gesture"],
  ["Tech bro", "Crypto bro"],
  ["Pizza tonight", "Sushi tonight"],
  ["Beach day", "Mountains day"],
  ["Call mom", "Text mom"],
  ["Left door", "Right door"],
  ["Cat video", "Dog video"],
  ["Coffee", "Chai"],
  ["Movie night", "Game night"],
  ["Cook dinner", "Order in"],
  ["Gym today", "Rest day"],
  ["Read a book", "Watch Netflix"],
  // personality & lifestyle
  ["Morning person", "Night owl"],
  ["Introvert recharge", "Extrovert chaos"],
  ["Overthinks texts", "Sends without reading"],
  ["Cats", "Dogs"],
  ["City life", "Country living"],
  ["Remote work", "Office hustle"],
  ["Pancakes", "Waffles"],
  ["Socks with sandals", "Crocs with socks"],
  ["Rich but lonely", "Broke with besties"],
  ["Unlimited money", "Unlimited time"],
  // pop culture & entertainment
  ["Star Wars", "Star Trek"],
  ["Harry Potter", "Lord of the Rings"],
  ["Batman", "Superman"],
  ["Friends", "Seinfeld"],
  ["Naruto", "One Piece"],
  ["Subbed anime", "Dubbed anime"],
  ["E-book", "Paperback"],
  ["Spotify playlist", "YouTube rabbit hole"],
  // food & drink
  ["Dark chocolate", "Milk chocolate"],
  ["Pineapple on pizza", "Ketchup on pizza"],
  ["Sushi", "Tacos"],
  ["Sweet tooth", "Savory soul"],
  ["Baguette", "Croissant"],
  ["Aperol Spritz", "Margarita"],
  // deep & spicy
  ["Destiny", "Free will"],
  ["Win the lottery", "Find true love"],
  ["Be famous", "Be powerful"],
  ["Forgive them", "Forget them"],
  ["Passion project", "Stable paycheck"],
  ["Teleportation", "Invisibility"],
  ["Time travel to past", "Time travel to future"],
  ["Talk to animals", "Speak every language"],
  ["Pet dinosaur", "Pet dragon"],
  // chronically online
  ["Main character energy", "NPC vibes"],
  ["Post the thirst trap", "Keep it mysterious"],
  ["Soft launch", "Hard launch"],
  ["Green flag collector", "Red flag ignorer"],
  ["13% battery left", "No WiFi"],
  // politics & world leaders
  ["Elon tweets", "Zuck threads"],
  ["Move to Mars", "Fix Earth first"],
  ["Obama era", "Trump era"],
  // Hollywood & celebs
  ["Team Aniston", "Team Jolie"],
  ["Leo DiCaprio", "Brad Pitt"],
  ["Margot Robbie", "Ana de Armas"],
  ["Timothee Chalamet", "Austin Butler"],
  ["Zendaya", "Sydney Sweeney"],
  ["Pedro Pascal", "Oscar Isaac"],
  ["Keanu Reeves", "Ryan Gosling"],
  ["Chris Hemsworth", "Henry Cavill"],
  ["Jennifer Lawrence", "Florence Pugh"],
  // music & artists
  ["Drake", "Kendrick"],
  ["Taylor Swift", "Beyonce"],
  ["Nicki Minaj", "Megan Thee Stallion"],
  ["The Weeknd", "Frank Ocean"],
  ["Billie Eilish", "Olivia Rodrigo"],
  ["Dua Lipa", "Doja Cat"],
  ["Chappell Roan", "Sabrina Carpenter"],
  ["Bad Bunny", "J Balvin"],
  ["Coldplay", "Radiohead"],
  ["Beatles", "Rolling Stones"],
  // football
  ["Ronaldo", "Messi"],
  ["Real Madrid", "Barcelona"],
  ["Haaland", "Mbappe"],
  ["Premier League", "La Liga"],
  ["Man United", "Man City"],
  ["Liverpool", "Arsenal"],
  // F1
  ["Verstappen", "Norris"],
  ["Hamilton", "Leclerc"],
  ["Ferrari", "McLaren"],
  ["Senna", "Prost"],
  // tennis
  ["Djokovic", "Nadal"],
  ["Federer", "Nadal"],
  ["Sinner", "Alcaraz"],
  // basketball & american sports
  ["LeBron", "Jordan"],
  ["Lakers", "Celtics"],
  ["Brady", "Manning"],
  // combat sports
  ["Mike Tyson", "Muhammad Ali"],
  ["Conor McGregor", "Khabib"],
  // cricket
  ["Kohli", "Rohit"],
  ["Sachin", "Lara"],
  // AI & tech CEOs
  ["Sam Altman", "Dario Amodei"],
  ["OpenAI", "Anthropic"],
  ["ChatGPT", "Claude"],
  ["Sundar Pichai", "Satya Nadella"],
  ["Google", "Microsoft"],
  ["Gemini", "Copilot"],
  ["Elon Musk", "Sam Altman"],
  ["Grok", "ChatGPT"],
  ["Jensen Huang", "Lisa Su"],
  ["NVIDIA", "AMD"],
  ["Mark Zuckerberg", "Tim Cook"],
  ["Meta AI", "Apple Intelligence"],
  ["Open source AI", "Closed source AI"],
  ["AGI doomer", "AGI accelerationist"],
];

function getRandomPair() {
  return PLACEHOLDER_PAIRS[Math.floor(Math.random() * PLACEHOLDER_PAIRS.length)];
}

export default function HomePage() {
  const router = useRouter();
  const [opt1, setOpt1] = useState("");
  const [opt2, setOpt2] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);
  const [placeholders, setPlaceholders] = useState(["Option A", "Option B"]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setPlaceholders(getRandomPair());
    setMounted(true);
  }, []);

  const canSubmit = opt1.trim() && opt2.trim() && !loading;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    try {
      const id = await createSession(opt1.trim(), opt2.trim());
      window.location.href = `/${id}?role=creator`;
    } catch (err) {
      console.error("Failed to create session:", err);
      setLoading(false);
    }
  };

  return (
    <main style={{
      minHeight: "100dvh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 20px",
    }}>
      <div style={{
        width: "100%",
        maxWidth: 420,
        opacity: mounted ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}>
        <ProgressBar step="create" />

        {/* Hero */}
        <div className="fade-up" style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            fontSize: 56,
            marginBottom: 12,
            animation: "float 3s ease-in-out infinite",
          }}>
            &#9996;&#65039;
          </div>
          <h1 style={{
            fontFamily: "'Dela Gothic One', cursive",
            fontSize: 38,
            color: "var(--text)",
            margin: 0,
            letterSpacing: -1.5,
            lineHeight: 1.1,
          }}>
            Pick One
          </h1>
          <p style={{
            color: "var(--text-secondary)",
            fontSize: 15,
            marginTop: 10,
            fontWeight: 400,
            lineHeight: 1.6,
          }}>
            Set two options. Ask someone to choose. Let fate decide.
          </p>
        </div>

        {/* Card */}
        <div className="fade-up" style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: "28px 24px",
          boxShadow: "var(--shadow-lg)",
          animationDelay: "0.1s",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Index Finger input */}
            <div>
              <label style={{
                color: "var(--accent)",
                fontSize: 12,
                fontWeight: 700,
                marginBottom: 8,
                display: "flex",
                alignItems: "center",
                gap: 6,
                textTransform: "uppercase",
                letterSpacing: 1.5,
              }}>
                <span style={{ fontSize: 18 }}>&#9757;&#65039;</span> Index finger
              </label>
              <input
                value={opt1}
                onChange={(e) => setOpt1(e.target.value)}
                onFocus={() => setFocused(1)}
                onBlur={() => setFocused(null)}
                placeholder={placeholders[0]}
                maxLength={50}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  fontSize: 16,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  background: focused === 1 ? "var(--accent-bg)" : "var(--elevated)",
                  color: "var(--text)",
                  border: focused === 1 ? "2px solid var(--accent)" : "2px solid transparent",
                  borderRadius: "var(--radius-sm)",
                  outline: "none",
                  transition: "var(--transition-fast)",
                  caretColor: "var(--accent)",
                }}
                onKeyDown={(e) => e.key === "Enter" && document.getElementById("opt2-input")?.focus()}
              />
            </div>

            {/* VS divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
              <span style={{
                color: "var(--muted)",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 2,
              }}>vs</span>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            </div>

            {/* Ring Finger input */}
            <div>
              <label style={{
                color: "var(--accent2)",
                fontSize: 12,
                fontWeight: 700,
                marginBottom: 8,
                display: "flex",
                alignItems: "center",
                gap: 6,
                textTransform: "uppercase",
                letterSpacing: 1.5,
              }}>
                <span style={{ fontSize: 18 }}>&#128405;</span> Ring finger
              </label>
              <input
                id="opt2-input"
                value={opt2}
                onChange={(e) => setOpt2(e.target.value)}
                onFocus={() => setFocused(2)}
                onBlur={() => setFocused(null)}
                placeholder={placeholders[1]}
                maxLength={50}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  fontSize: 16,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  background: focused === 2 ? "var(--accent2-bg)" : "var(--elevated)",
                  color: "var(--text)",
                  border: focused === 2 ? "2px solid var(--accent2)" : "2px solid transparent",
                  borderRadius: "var(--radius-sm)",
                  outline: "none",
                  transition: "var(--transition-fast)",
                  caretColor: "var(--accent2)",
                }}
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
              padding: "16px 24px",
              marginTop: 28,
              fontSize: 16,
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              background: canSubmit ? "var(--accent)" : "var(--border)",
              color: canSubmit ? "#fff" : "var(--muted)",
              border: "none",
              borderRadius: "var(--radius-sm)",
              cursor: canSubmit ? "pointer" : "not-allowed",
              transition: "var(--transition-medium)",
              letterSpacing: 0.3,
              boxShadow: canSubmit ? "0 4px 14px rgba(255,87,51,0.25)" : "none",
            }}
            onMouseEnter={(e) => {
              if (canSubmit) {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(255,87,51,0.35)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              if (canSubmit) {
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(255,87,51,0.25)";
              }
            }}
          >
            {loading ? (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span style={{
                  width: 16, height: 16,
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTopColor: "#fff",
                  borderRadius: "50%",
                  animation: "spin 0.6s linear infinite",
                }} />
                Creating...
              </span>
            ) : "Lock it in"}
          </button>
        </div>

        {/* Hint */}
        {!canSubmit && !loading && (
          <p style={{
            color: "var(--muted)",
            fontSize: 13,
            textAlign: "center",
            marginTop: 16,
            animation: "fadeIn 0.3s ease",
          }}>
            Fill in both options to continue
          </p>
        )}

        <Footer />
      </div>
    </main>
  );
}
