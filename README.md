# Strength

A phone-friendly Day A / Day B workout tracker for **Susie Scher**.

Open it on your phone at Body Space Fitness (NYC), or at a hotel / home gym. Two sessions only. No login. Checkmarks, notes, and weight edits stay on this device in `localStorage`.

## What it tracks

- **Day A** — upper body, squat, and core (Phase 7 shape)
- **Day B** — hinge, single-leg / lateral work for running and ski season, and pull

Each exercise shows sets × reps (or time / meters), a prescribed weight you can edit, a checkbox per set, rest when it helps, and an optional note. Warm-up is collapsible. Mark the session complete to stamp the last-done date for that day.

Weights are seeded from current baselines (for example 25 lb dumbbell press, 16 kg swings, 12 kg goblet / clean-squat, 15 lb overhead press). Anything extrapolated — RDL, bands, face pulls, deadlift total — is labeled **estimate · editable**.

There are no video embeds. Three moves have a **Demo** link that opens YouTube in a new tab: Band Pull-Aparts or Face Pulls (Day A), Single-Leg Calf Raise (Day B), and Dead Bug (Day B).

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`) on your laptop or phone.

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the Vite + React + TypeScript app |
| `npm run build` | Typecheck and production build |
| `npm run preview` | Serve the production build |

## How to use it at the gym

1. Add the page to your home screen if you like (it is set up as a simple standalone web app).
2. Toggle **Day A** or **Day B**.
3. Open the warm-up if you want it; skip foam rolling when you are short on time.
4. Tap a set when it is done. Edit the weight field whenever the load changes.
5. **Mark Day complete** when you are finished. Use **Reset sets** next time — weights and notes stay.

Progress never leaves this browser. Clearing site data will reset the log.
