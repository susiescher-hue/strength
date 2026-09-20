# Stronger

A phone-friendly Day A / Day B / NYC home workout tracker for **Susie Scher**.

**On your phone (no install):** [https://susiescher-hue.github.io/strength/](https://susiescher-hue.github.io/strength/)

Open that link at a regular gym or in the NYC apartment. Three sessions. No login. Checkmarks, notes, and weight edits stay on this device in `localStorage`.

If the link 404s the first time, enable Pages once: repo **Settings → Pages → Source: GitHub Actions**. This repo is private today — if GitHub blocks Pages, make the repo **public** (Settings → General → Danger zone) so the phone URL can go live. The site itself is still just the workout tracker.

## What it tracks

- **Day A** — gym: heavy upper, squat, and core. Working sets of ~8.
- **Day B** — gym: hinge, single-leg / lateral work for running and ski season, and pull
- **NYC home** — apartment session on her KBs (2×10, 2×12, 16, 20, 24 kg), TRX, and a mat. No band pull-aparts.

On Day A / Day B, set **Where am I?** to **Gym** or **Home**. Home shows the swap on the card (band instead of cable, DB instead of KB, skip SkiErg/rower, and so on). **NYC home** is its own programmed day — the location toggle hides and the apartment gear list shows instead. This app is for her own gym or home sessions — not Body Space trainer sessions.

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

### NYC home (apartment)

1. Hollow Hold — 3 × 25s — BW (blue-band anti-rotation 3 × 8 each is the swap)
2. Half-Kneeling Wood Chop — 3 × 8 each — 10 kg KB  
3. Two-Hand KB Swing — 4 × 8 — 16 kg  
4. Goblet Squat — 4 × 8 — 16 kg  
5. TRX Row — 4 × 8 — challenging angle  
6. Floor Press — 4 × 8 — 2 × 12 kg (single-arm 16 kg × 8 each is the backup)  
7. 1-Arm KB Row — 4 × 8 each — 16 kg  
8. 1-Arm KB Overhead Press — 3 × 8 each — 12 kg (10 kg if 12 is ugly)  
9. TRX Face Pull — 3 × 12–15  
10. Dead Bug — 3 × 8 each  
11. Bird Dog — 3 × 8 each  
12. Single-Leg Glute Bridge — 3 × 8 each — BW, optional light KB on hips

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

1. Add the page to your home screen if you like (standalone PWA). The mark is a flexed bicep (💪), not a letter S — Stretch owns the S. The icon under the name **💪 Stronger** is adapted from Twemoji.
2. Toggle **Day A**, **Day B**, or **NYC home**.
3. On Day A / Day B, set **Where am I?** to Gym or Home so home swaps show up. NYC home is already the apartment session.
4. Open the warm-up if you want it; skip foam rolling when you are short on time.
5. Tap a set when it is done. Tap the big weight field to change the load.
6. **Mark Day complete** when you are finished. Use **Reset sets** next time — weights and notes stay.

Progress never leaves this browser. Clearing site data will reset the log.
