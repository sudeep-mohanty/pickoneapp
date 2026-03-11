# ✌️ Pick One — pickoneapp.fun

The two-finger decision maker. Set two options, share a link, let fate decide.

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/pickoneapp.git
cd pickoneapp
npm install
```

### 2. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create project → name it `pickoneapp`
3. Enable **Google Analytics** when prompted (free)
4. Go to **Build → Firestore Database → Create database**
   - Start in **production mode**
   - Region: `asia-south1` (Mumbai)
5. Go to **Firestore → Rules tab** → paste contents of `firestore.rules` → **Publish**
6. Go to **Project Settings → General → Your apps → Web (</>) icon**
   - Register app as `pickoneapp-web`
   - Copy the `firebaseConfig` object

### 3. Configure Environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and paste your Firebase config values:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=pickoneapp.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=pickoneapp
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=pickoneapp.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
NEXT_PUBLIC_BASE_URL=https://pickoneapp.fun
```

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — test the full flow.

### 5. Generate App Icons

Convert the SVGs in `/public` to PNGs for PWA support:

- Open `public/icon-192.svg` in any image editor → Export as `icon-192.png`
- Open `public/icon-512.svg` → Export as `icon-512.png`
- Or use [CloudConvert](https://cloudconvert.com/svg-to-png)

The OG image (`og-default.png`) is generated dynamically at the edge — no static file needed.

### 6. Deploy to Vercel

```bash
# Install Vercel CLI (optional — you can also deploy via the web UI)
npm i -g vercel
vercel
```

Or via web:
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Add your `.env.local` values as Environment Variables in Settings
4. Deploy

### 7. Connect Your Domain

In **Vercel** → Project → Settings → Domains → Add `pickoneapp.fun`

In **Namecheap** → Domain List → pickoneapp.fun → Manage → Advanced DNS:

| Type | Host | Value |
|------|------|-------|
| A Record | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

Delete any default parking records. Wait 5–30 minutes for DNS propagation.

## Project Structure

```
pickoneapp/
├── src/
│   ├── app/
│   │   ├── layout.js          # Root layout with OG defaults
│   │   ├── globals.css         # Global styles + animations
│   │   ├── page.js             # Home — create two options
│   │   ├── [id]/
│   │   │   └── page.js         # Session — wait/pick/reveal
│   │   ├── privacy/
│   │   │   └── page.js         # Privacy policy
│   │   └── og-default.png/
│   │       └── route.js        # Dynamic OG image generation
│   ├── components/
│   │   ├── Hand.js             # Interactive hand SVG
│   │   ├── Confetti.js         # Canvas confetti animation
│   │   ├── ProgressBar.js      # Step progress indicator
│   │   ├── Footer.js           # Ko-fi support link
│   │   └── SessionClient.js    # Client-side session logic
│   └── lib/
│       ├── firebase.js         # Client-side Firebase SDK
│       └── firebase-server.js  # Server-side REST API fetch
├── public/
│   ├── manifest.json           # PWA manifest
│   ├── robots.txt              # SEO
│   └── *.svg                   # App icons (convert to PNG)
├── firestore.rules             # Firestore security rules
└── .env.local.example          # Environment template
```

## How It Works

1. **Creator** enters two options → stored in Firestore with a random 7-char ID
2. **Share link** generated: `pickoneapp.fun/{id}`
3. **Chooser** opens link → sees the hand → taps a finger
4. **Firestore update** triggers real-time listener → both see confetti + reveal
5. **Share result** via Web Share API → viral loop begins

## Costs

| Service | Cost |
|---------|------|
| Domain (pickoneapp.fun, 2 years) | $16.38 (paid) |
| Vercel Hobby hosting | $0 |
| Firebase Spark (Firestore) | $0 |
| Firebase Analytics | $0 |
| SSL certificate | $0 (Vercel) |
| **Total** | **$16.38** |

## Monetization

- **Ko-fi** link in footer (0% commission) — active from day 1
- **AdSense** banner on result screen — add when you have traffic
- **Stripe Payment Links** for premium themes — add when there's demand

## License

MIT
