# Iron Grimoire

A gamified workout, habit, and meditation tracker with Solo Leveling-inspired progression.

## Features
- **Password-protected profiles** — SHA-256 hashed, per-profile auth
- **Iron** — Weightlifting tracker with exercise demos, PR tracking, rest timer
- **Discipline** — Habit tracker with dot calendar, streaks, custom + preset habits
- **Mind** — Meditation timer with journal, breathing animation
- **3 separate XP pools** with 90 levels each (E-Rank → Monarch)
- **75 achievements** across Iron, Discipline, Mind, and Cross-Pillar
- **Daily & weekly quests** with live progress tracking
- **Prestige system** — Ascend at max rank for permanent XP multiplier
- **Multi-profile** — Separate password-protected accounts per device

## Deploy to Vercel (Easiest — Free)

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" → Import your repo
4. Vercel auto-detects Vite — just click **Deploy**
5. Done. You get a URL like `iron-grimoire.vercel.app`

## Run Locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

Output goes to `dist/` folder — can be hosted anywhere static.
