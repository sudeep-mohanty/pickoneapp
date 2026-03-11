# Pick One — pickoneapp.fun

A two-finger decision maker. Creator sets two options, shares a link, the other person taps a finger to decide.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: JavaScript (no TypeScript)
- **Database**: Firebase Firestore (europe region)
- **Hosting**: Vercel
- **Domain**: pickoneapp.fun (Namecheap DNS)
- **Styling**: Inline styles + CSS variables in globals.css (no CSS framework)
- **Fonts**: Dela Gothic One (headings), Space Mono (body/mono)
- **IDs**: nanoid v5 (7-char URL-friendly session IDs)

## Commands

```bash
npm run dev      # Start dev server on localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

## Project Structure

```
src/
├── app/
│   ├── layout.js                  # Root layout, OG metadata, font imports
│   ├── globals.css                # CSS variables, reset, keyframe animations
│   ├── page.js                    # Home — "use client", create session form
│   ├── [id]/page.js               # Session page — server component for dynamic OG metadata
│   ├── privacy/page.js            # Privacy policy (server component)
│   └── og-default.png/route.js    # Edge runtime — generates OG image via next/og ImageResponse
├── components/
│   ├── SessionClient.js           # Main session logic (waiting/chooser/reveal screens)
│   ├── Hand.js                    # Interactive SVG hand with finger tap detection
│   ├── Confetti.js                # Canvas-based confetti animation on reveal
│   ├── ProgressBar.js             # 3-step progress indicator (create → pick → result)
│   └── Footer.js                  # Ko-fi support link
└── lib/
    ├── firebase.js                # Client-side Firebase SDK — createSession, getSession, pickFinger, onSessionUpdate
    └── firebase-server.js         # Server-side Firestore REST API fetch (no SDK, for server components)
```

## Architecture & Key Patterns

### Data Flow
1. Creator enters two options on `/` (client component) → `createSession()` writes to Firestore → redirects to `/{id}?role=creator`
2. Creator sees WaitingScreen with share link. `onSessionUpdate()` subscribes to Firestore real-time listener.
3. Chooser opens `/{id}` (no `role` param) → sees ChooserScreen with interactive Hand → taps finger → `pickFinger()` updates Firestore
4. Firestore `onSnapshot` fires → both creator and chooser see RevealScreen with confetti

### Client vs Server Components
- `page.js` (home) — `"use client"` because it uses useState/useRouter
- `[id]/page.js` — **server component** that fetches session via REST API for dynamic OG metadata, then renders `<SessionClient />` (client component) inside `<Suspense>`
- `firebase-server.js` — plain fetch to Firestore REST API (`https://firestore.googleapis.com/v1/...`) with `{ next: { revalidate: 0 } }` for no caching. Used in server components to avoid importing client SDK.
- `firebase.js` — client-side Firebase SDK with `getApps()` guard against duplicate init in dev

### Firestore Schema
- Collection: `sessions`
- Document ID: 7-char nanoid
- Fields: `opt1` (string), `opt2` (string), `picked` (string|null, "left" or "right"), `createdAt` (timestamp)

### Firestore Security Rules (`firestore.rules`)
- Read: public
- Create: public
- Update: only if `picked` is currently null AND only `picked` field changes (one-time pick enforcement)
- Delete: denied

### Styling Approach
- All inline styles (no CSS modules, no Tailwind)
- CSS variables defined in `globals.css` under `:root`
- Color palette: `--bg: #0D0D0D`, `--accent: #FF5733` (orange-red), `--accent2: #FFD700` (gold), `--text: #FAFAFA`
- Keyframe animations: `fadeUp`, `popIn`, `pulse`, `shimmer`
- Max content width: 380px centered

### Role Detection
- Creator: URL has `?role=creator` query param (set during redirect after session creation)
- Chooser: no `role` param (default when opening shared link)
- Both see RevealScreen once `picked` is set

### OG Image
- Dynamic edge-rendered via `src/app/og-default.png/route.js` using `next/og` ImageResponse
- Session pages have dynamic OG metadata (shows result if already picked, teaser if not)

### PWA
- `public/manifest.json` configured for standalone mode
- Icons reference PNG files (icon-192.png, icon-512.png) that need to be generated from SVGs in `/public`

## Environment Variables

All prefixed with `NEXT_PUBLIC_` (exposed to client):
```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_BASE_URL              # https://pickoneapp.fun (used for OG tags and share links)
```

Template: `.env.local.example` → copy to `.env.local`

## Deployment

- **Vercel**: Auto-detects Next.js. Add env vars in Vercel dashboard before deploy.
- **Firebase**: Deploy Firestore rules via `firebase deploy --only firestore:rules`
- **DNS**: A record `@` → 76.76.21.21, CNAME `www` → cname.vercel-dns.com

## Important Notes

- Firestore region is **europe** (user is based in Brno, Czech Republic)
- No authentication — sessions are anonymous
- No API routes — all writes go directly from client to Firestore SDK
- Server components use REST API (not SDK) to read Firestore for metadata generation
- Session data intended to auto-delete after 24h (mentioned in privacy policy — TTL may need Firestore TTL policy setup)
- Monetization: Ko-fi link in footer, planned AdSense and Stripe payment links
- No test suite currently
