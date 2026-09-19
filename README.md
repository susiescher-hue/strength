# SUSIE STAYS STRONG

A phone-friendly Day A / Day B workout tracker for **Susie Scher**.

**On your phone (no install):** [https://susiescher-hue.github.io/strength/](https://susiescher-hue.github.io/strength/)

Open that link at a regular gym or at home. Two sessions only. No login. Checkmarks, notes, and weight edits stay on this device in `localStorage`.

If the link 404s the first time, enable Pages once: repo **Settings → Pages → Source: GitHub Actions**. This repo is private today — if GitHub blocks Pages, make the repo **public** (Settings → General → Danger zone) so the phone URL can go live. The site itself is still just the workout tracker.

## What it tracks

- **Day A** — heavy upper, squat, and core. Working sets of ~8.
- **Day B** — hinge, single-leg / lateral work for running and ski season, and pull

Set **Where am I?** to **Gym** or **Home**. Home shows the swap on the card (band instead of cable, DB instead of KB, skip SkiErg/rower, and so on). The day stays on screen. This app is for her own gym or home sessions — not Body Space trainer sessions.

This block: ~4 weeks / ~8 sessions, then progress loads.

Each exercise shows sets × reps (or time / meters), a large **Tap to edit weight** field, a checkbox per set, rest when it helps, and an optional note. Tap the **?** next to a name for a short form note. If a demo exists, **Watch demo** opens YouTube in a new tab — no embeds. Warm-up items have a lighter **?** too. Mark the session complete to stamp the last-done date for that day.

Day A seeds: squat 12 kg (go 16 when ready), swings 16 kg (20 when snappy), incline press 25 lb (30 when solid), row 25 lb (30 when easy), OH press 15 lb (20 when ready). Estimates are labeled.

### Day A (current)

1. Ab Dolly Rollout — 3 × 8 — BW  
2. 1/2 Kneeling Chop — 3 × 8 each — medium cable / band  
3. Two-Hand KB Swing — 4 × 8 — 16 kg  
4. Goblet or 2KB Front Squat — 4 × 8 — 12 kg  
5. Lat Pulldown — Underhand — 4 × 8 — heavy stack  
6. Incline DB Press — 4 × 8 — 25 lb each  
7. 1-Arm DB Row — 4 × 8 each — 25 lb  
8. Seated DB Overhead Press — 3 × 8 — 15 lb each  
9. Band Pull-Aparts or Face Pulls — 3 × 12–15 — light band  
10. Hollow Hold / Flutters — 3 × 20–30s — BW  
11. Optional rower — 3 × 250 m

There are no video embeds. Help lives on the **?** — form note on every move, **Watch demo** only when a public YouTube URL is set. Foam roll is note-only.

## Run it

```bash
npm install
npm run dev
```

Then open `http://localhost:5173/strength/` (the app is built for GitHub Pages at `/strength/`).

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the Vite + React + TypeScript app |
| `npm run build` | Typecheck and production build |
| `npm run preview` | Serve the production build |

## How to use it at the gym

1. Add the page to your home screen if you like (it is set up as a simple standalone web app).
2. Toggle **Day A** or **Day B**.
3. Set **Where am I?** to Gym or Home so home swaps show up.
4. Open the warm-up if you want it; skip foam rolling when you are short on time.
5. Tap a set when it is done. Tap the big weight field to change the load.
6. **Mark Day complete** when you are finished. Use **Reset sets** next time — weights and notes stay.

Progress never leaves this browser. Clearing site data will reset the log.
