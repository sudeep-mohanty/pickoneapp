# Pick One — pickoneapp.fun

A two-finger decision maker. Set two options, share a link, let someone pick a finger to decide.

## How It Works

1. You enter two options (e.g. "Pizza" vs "Sushi")
2. Share the link with a friend
3. They tap a finger on the hand
4. Both of you see the result with confetti

## Run Locally

```bash
git clone https://github.com/YOUR_USERNAME/pickoneapp.git
cd pickoneapp
npm install
cp .env.local.example .env.local   # fill in your Firebase config
npm run dev
```

Open [localhost:3000](http://localhost:3000).

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com). Add the env vars from `.env.local.example` in the Vercel dashboard.

Point your domain's DNS:
- `A` record `@` → `76.76.21.21`
- `CNAME` `www` → `cname.vercel-dns.com`

## Tech Stack

- Next.js 14 (App Router)
- Firebase Firestore
- Vercel hosting
- No CSS framework — all inline styles

## License

MIT
