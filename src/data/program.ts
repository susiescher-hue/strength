export type DayId = 'A' | 'B' | 'N'
export type LocationId = 'gym' | 'home'

export type Scheme =
  | { kind: 'reps'; sets: number; reps: number }
  | { kind: 'repsVary'; reps: number[] }
  | { kind: 'repsRange'; sets: number; repsMin: number; repsMax: number }
  | { kind: 'time'; sets: number; seconds: number }
  | { kind: 'timeRange'; sets: number; secondsMin: number; secondsMax: number }
  | { kind: 'distance'; sets: number; meters: number }

export type Section = 'core' | 'power' | 'strength' | 'accessory' | 'condition'

export interface WeightSeed {
  value: string
  estimated: boolean
  alternate?: string
}

export interface Exercise {
  id: string
  name: string
  section: Section
  scheme: Scheme
  eachSide?: boolean
  rest?: string
  weight: WeightSeed | null
  help: string
  cue?: string
  optional?: boolean
  demoUrl?: string
  swaps?: { home: string }
}

export interface WarmupItem {
  id: string
  name: string
  detail: string
  help: string
  demoUrl?: string
}

export interface DayProgram {
  id: DayId
  title: string
  focus: string
  warmup: WarmupItem[]
  exercises: Exercise[]
}

export const SECTION_LABEL: Record<Section, string> = {
  core: 'Core',
  power: 'Power',
  strength: 'Strength',
  accessory: 'Accessory',
  condition: 'Conditioning',
}

export const LOCATION_LABEL: Record<LocationId, string> = {
  gym: 'Gym',
  home: 'Home',
}

export const DAY_TABS: { id: DayId; label: string; blurb: string }[] = [
  { id: 'A', label: 'Day A', blurb: 'Gym upper' },
  { id: 'B', label: 'Day B', blurb: 'Gym hinge' },
  { id: 'N', label: 'NYC home', blurb: 'KBs · TRX' },
]

export function isNycHome(day: DayId): boolean {
  return day === 'N'
}

const HELP_FOAM =
  'Quick pass on hamstrings, quads, and the upper-back rhomboids. Keep it moving — this is a warm-up, not a long smash session. Skip it if you are short on time.'

const HELP_WGS =
  'Long lunge, then reach the same-side elbow toward the instep and open the chest to the sky. Soft breathing, no forcing. Switch sides and stay tall through the back hip.'

const DEMO_WGS = 'https://www.youtube.com/watch?v=-CiWQ2IvY34'

export function locationSwap(
  exercise: Exercise,
  location: LocationId,
): string | null {
  if (location !== 'home') return null
  return exercise.swaps?.home ?? null
}

export function setCount(scheme: Scheme): number {
  if (scheme.kind === 'repsVary') return scheme.reps.length
  return scheme.sets
}

export function setLabel(scheme: Scheme, index: number): string {
  switch (scheme.kind) {
    case 'reps':
      return String(scheme.reps)
    case 'repsVary':
      return String(scheme.reps[index])
    case 'repsRange':
      return `${scheme.repsMin}–${scheme.repsMax}`
    case 'time':
      return `${scheme.seconds}s`
    case 'timeRange':
      return `${scheme.secondsMin}–${scheme.secondsMax}s`
    case 'distance':
      return `${scheme.meters}m`
  }
}

export function schemeSummary(exercise: Exercise): string {
  const { scheme } = exercise
  const side = exercise.eachSide ? ' each' : ''
  switch (scheme.kind) {
    case 'reps':
      return `${scheme.sets} × ${scheme.reps}${side}`
    case 'repsVary':
      return scheme.reps.join(', ') + side
    case 'repsRange':
      return `${scheme.sets} × ${scheme.repsMin}–${scheme.repsMax}${side}`
    case 'time':
      return `${scheme.sets} × ${scheme.seconds}s${side}`
    case 'timeRange':
      return `${scheme.sets} × ${scheme.secondsMin}–${scheme.secondsMax}s${side}`
    case 'distance':
      return `${scheme.sets} × ${scheme.meters}m`
  }
}

export const DAYS: Record<DayId, DayProgram> = {
  A: {
    id: 'A',
    title: 'Day A',
    focus: 'Heavy upper + squat + core',
    warmup: [
      {
        id: 'foam',
        name: 'Foam roll',
        detail: 'Hamstrings, quads, rhomboids — or skip if you are short on time.',
        help: HELP_FOAM,
      },
      {
        id: 'wgs',
        name: 'World’s Greatest Stretch',
        detail: '30 seconds each side × 1.',
        help: HELP_WGS,
        demoUrl: DEMO_WGS,
      },
    ],
    exercises: [
      {
        id: 'a-ab-dolly',
        name: 'Ab Dolly Rollout',
        section: 'core',
        scheme: { kind: 'reps', sets: 3, reps: 8 },
        weight: { value: 'BW', estimated: false },
        help: 'Kneel, hands on the wheel or sliders, ribs down like you zipped a tight jacket. Roll out only as far as the low back stays quiet — if it pops, you went too far. Pull yourself back with the abs, not a big hip snap.',
        cue: 'Anti-extension. Ribs down. Add a light plate on the hips when 8 is easy.',
        demoUrl: 'https://www.youtube.com/watch?v=A3uK5TPzHq8',
        swaps: {
          home: 'Towel slide, or extra hollow holds if you have no wheel.',
        },
      },
      {
        id: 'a-chop',
        name: '1/2 Kneeling Chop',
        section: 'core',
        scheme: { kind: 'reps', sets: 3, reps: 8 },
        eachSide: true,
        rest: '1:00',
        weight: { value: 'Medium cable / band', estimated: true },
        help: 'Half-kneel with the inside knee up. Chop the handle from high-outside to low-inside without letting the ribs or hips spin. Stay stacked — this is a chop, not a twist. Last two reps should feel like a fight.',
        cue: 'Anti-rotation. Pick a load that makes the last 2 reps a fight.',
        demoUrl: 'https://www.youtube.com/watch?v=I4Ncb8LZntY',
        swaps: {
          home: 'Band from a door. Stand if kneeling is awkward.',
        },
      },
      {
        id: 'a-swing',
        name: 'Two-Hand KB Swing',
        section: 'power',
        scheme: { kind: 'reps', sets: 4, reps: 8 },
        rest: '0:45',
        weight: {
          value: '16 kg',
          estimated: false,
          alternate: '20 kg when 16 is snappy and quiet',
        },
        help: 'Hinge, don’t squat. Hike the bell back, then snap the hips so it floats to about chest height. Arms are ropes — the power is from the hips. Land quiet and snappy.',
        cue: 'Hard hip snap. If 16 kg feels easy, go 20 kg next session.',
        demoUrl: 'https://www.youtube.com/watch?v=1FjAoO5McVI',
        swaps: {
          home: 'KB if you have it. Else two-hand DB swing, or a backpack swing.',
        },
      },
      {
        id: 'a-squat',
        name: 'Goblet or 2KB Front Squat',
        section: 'strength',
        scheme: { kind: 'reps', sets: 4, reps: 8 },
        rest: '1:30',
        weight: {
          value: '12 kg',
          estimated: false,
          alternate: '16 kg when all 8s are clean',
        },
        help: 'Hold the bell or two KBs at the chest, elbows down. Sit between the heels, chest tall, knees tracking the toes. Stand by pushing the floor away. Working sets of 8 — not a pump set.',
        cue: 'Working sets of 8 — not a pump pyramid. Add load when 12 kg is no longer hard.',
        demoUrl: 'https://www.youtube.com/watch?v=0eW8av1WC4g',
        swaps: {
          home: 'Goblet DB or a packed backpack. Same 4 × 8.',
        },
      },
      {
        id: 'a-pulldown',
        name: 'Lat Pulldown — Underhand Grip',
        section: 'strength',
        scheme: { kind: 'reps', sets: 4, reps: 8 },
        rest: '1:30',
        weight: { value: 'Heavy stack', estimated: true },
        help: 'Underhand grip, sit tall, pull the bar to the upper chest. Drive the elbows down and slightly back — don’t lean way back to cheat. Control the way up.',
        cue: 'A hard 8. If you could do 12, the stack is too light.',
        demoUrl: 'https://www.youtube.com/watch?v=apzFTbsm7HU',
        swaps: {
          home: 'Band pulldown from a door, or band-assisted pull-up.',
        },
      },
      {
        id: 'a-press',
        name: 'Incline Dumbbell Press',
        section: 'strength',
        scheme: { kind: 'reps', sets: 4, reps: 8 },
        rest: '1:30',
        weight: {
          value: '25 lb each',
          estimated: false,
          alternate: '30 lb each when 25 is solid for 8',
        },
        help: 'Slight incline. Start with the DBs at the shoulders, wrists stacked, then press up and a little together. Lower on a slow count. Last two reps should grind — flat bench is fine if there is no incline.',
        cue: 'Last 2 reps should grind. Flat bench is fine if there is no incline.',
        demoUrl: 'https://www.youtube.com/watch?v=8iPEnn-ltC8',
        swaps: {
          home: 'Floor press with DBs. Same 4 × 8.',
        },
      },
      {
        id: 'a-row',
        name: '1-Arm DB Row',
        section: 'strength',
        scheme: { kind: 'reps', sets: 4, reps: 8 },
        eachSide: true,
        rest: '1:00',
        weight: {
          value: '25 lb',
          estimated: false,
          alternate: '30 lb when 25 is easy',
        },
        help: 'Hand and knee on a bench, or chest supported. Pull the DB to the hip, not the shoulder. Pause a beat at the top, then lower without a shrug. Own the last reps.',
        cue: 'Chest supported or hand-on-bench. Pull to the hip. Own the last reps.',
        demoUrl: 'https://www.youtube.com/watch?v=epSR-ma7BsY',
        swaps: {
          home: 'DB row, backpack row, or band row. Load it.',
        },
      },
      {
        id: 'a-oh-press',
        name: 'Seated DB Overhead Press',
        section: 'strength',
        scheme: { kind: 'reps', sets: 3, reps: 8 },
        rest: '1:30',
        weight: {
          value: '15 lb each',
          estimated: false,
          alternate: '20 lb each when 15 is no longer hard',
        },
        help: 'Sit tall, DBs at the shoulders, ribs down. Press straight up so the biceps finish by the ears. No big backbend. Strict reps only.',
        cue: 'Strict. If 15 lb flies, go 20 next time.',
        demoUrl: 'https://www.youtube.com/watch?v=qEwKCR5JCog',
        swaps: {
          home: 'Standing OH press with DBs, or one KB press each side.',
        },
      },
      {
        id: 'a-facepull',
        name: 'Band Pull-Aparts or Face Pulls',
        section: 'strength',
        scheme: { kind: 'repsRange', sets: 3, repsMin: 12, repsMax: 15 },
        weight: { value: 'Light band', estimated: true },
        help: 'Hold a light band at chest height, arms long. Pull it apart until it meets the chest, squeeze the shoulder blades, then return slow. Don’t shrug. Step back or use a thicker band if it is easy.',
        demoUrl: 'https://www.youtube.com/watch?v=qi2y-eI_kuI',
        swaps: {
          home: 'Band pull-aparts. Same form note.',
        },
      },
      {
        id: 'a-hollow',
        name: 'Hollow Hold / Flutters',
        section: 'core',
        scheme: { kind: 'timeRange', sets: 3, secondsMin: 20, secondsMax: 30 },
        rest: '0:30',
        weight: { value: 'BW', estimated: false },
        help: 'On your back, low back pressed to the floor, arms and legs long and a few inches off the ground. If the back pops up, tuck the knees or shorten the hold. Flutters are tiny kicks from that same shape — not big bicycle swings.',
        demoUrl: 'https://www.youtube.com/watch?v=LlDNef_Ztsc',
      },
      {
        id: 'a-rower',
        name: 'Rower',
        section: 'condition',
        optional: true,
        scheme: { kind: 'distance', sets: 3, meters: 250 },
        rest: '0:30',
        weight: { value: 'Easy–moderate', estimated: true },
        help: 'Strap the feet, sit tall, then drive legs, swing the body, then pull. Recover in reverse: arms, body, legs. Easy to moderate — this is optional finish work, not a race.',
        demoUrl: 'https://www.youtube.com/watch?v=QGqls1jhTUM',
        swaps: {
          home: 'Skip, or 3 × 90s marching in place.',
        },
      },
    ],
  },
  B: {
    id: 'B',
    title: 'Day B',
    focus: 'Hinge + unilateral + pull',
    warmup: [
      {
        id: 'foam',
        name: 'Foam roll',
        detail: 'Hamstrings, quads, rhomboids.',
        help: HELP_FOAM,
      },
      {
        id: 'wgs',
        name: 'World’s Greatest Stretch',
        detail: '30 seconds each side × 2.',
        help: HELP_WGS,
        demoUrl: DEMO_WGS,
      },
      {
        id: 'swings',
        name: 'Wall Forward Leg Swings',
        detail: '8 each side.',
        help: 'Hold the wall and swing one leg forward and back like a pendulum. Tall posture, small range at first. Eight each side. This is a warm-up swing, not a kick.',
        demoUrl: 'https://www.youtube.com/watch?v=naW8u72lOzI',
      },
    ],
    exercises: [
      {
        id: 'b-pulldown',
        name: 'Straight-Arm Pulldown',
        section: 'core',
        scheme: { kind: 'reps', sets: 3, reps: 8 },
        weight: { value: 'Cable or band', estimated: true },
        help: 'Stand facing the cable or band, arms long. Push the handle to the thighs without bending the elbows much. Think lats, not arms. Return slow and keep the ribs down.',
        demoUrl: 'https://www.youtube.com/watch?v=zECTZHrvuMg',
        swaps: {
          home: 'Band straight-arm pulldown from a door.',
        },
      },
      {
        id: 'b-anti-rot',
        name: 'Band Anti-Rotation Press + OH Reach',
        section: 'core',
        scheme: { kind: 'time', sets: 3, seconds: 30 },
        eachSide: true,
        rest: '1:00',
        weight: { value: 'Light–medium band', estimated: true },
        help: 'Band at chest height from the side. Press the handles straight out and hold — don’t let the band twist you. Reach a little overhead if the hold is solid, then switch sides. Soft knees, quiet hips.',
        demoUrl: 'https://www.youtube.com/watch?v=og9auCunK4M',
      },
      {
        id: 'b-clean-squat',
        name: 'KB Goblet Clean to Squat',
        section: 'power',
        scheme: { kind: 'repsRange', sets: 3, repsMin: 3, repsMax: 5 },
        weight: { value: '12 kg', estimated: false },
        help: 'Hike or deadlift the bell, then snap it to the goblet spot at the chest — don’t curl it. Once it is parked, sit into a tidy goblet squat and stand. Reset between reps if you need to. If the clean is messy, skip it and just goblet squat the same load.',
        demoUrl: 'https://www.youtube.com/watch?v=RtXA7dBxKyM',
        swaps: {
          home: 'DB goblet clean to squat, or skip the clean and goblet squat the same load.',
        },
      },
      {
        id: 'b-pullup',
        name: 'Mixed-Grip Pull-Up',
        section: 'strength',
        scheme: { kind: 'repsVary', reps: [10, 8, 6] },
        rest: '0:30',
        weight: { value: 'BW or band', estimated: true },
        help: 'Mixed grip: one hand closer, one wider. Pull the chest toward the bar, then lower all the way. Split the listed number (10 is 5 each grip). Use a band or switch to a pulldown if you cannot own the last reps.',
        cue: 'One narrow + one wide. Split the total (10 = 5 each). Lat pulldown if needed.',
        demoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g',
        swaps: {
          home: 'Band pulldown from a door, or band-assisted pull-up.',
        },
      },
      {
        id: 'b-dl',
        name: '2KB Sumo Deadlift',
        section: 'strength',
        scheme: { kind: 'repsRange', sets: 3, repsMin: 8, repsMax: 10 },
        rest: '1:00',
        weight: {
          value: '~20 kg KB total',
          estimated: true,
          alternate: 'Barbell 80 lb',
        },
        help: 'Wide stance, toes out a bit, bells or bar between the feet. Sit the hips down, grab the handles, then stand tall — push the floor away. Don’t yank with the back. Soft lockout, then lower with control.',
        demoUrl: 'https://www.youtube.com/watch?v=Cxi0NHlkrag',
        swaps: {
          home: 'Single KB or two DBs. Same 3 × 8–10.',
        },
      },
      {
        id: 'b-rdl',
        name: '2KB / DB Romanian Deadlift',
        section: 'strength',
        scheme: { kind: 'reps', sets: 3, reps: 8 },
        rest: '1:00',
        weight: { value: '16–20 kg', estimated: true },
        help: 'Soft knees, bells in front of the thighs. Push the hips back until you feel the hamstrings, then stand and squeeze the glutes. Keep the bells close to the legs. Stop before the back rounds.',
        demoUrl: 'https://www.youtube.com/watch?v=uhghy9pFIPY',
        swaps: {
          home: 'DB RDL, or one KB RDL. Same 3 × 8.',
        },
      },
      {
        id: 'b-lateral',
        name: 'Lateral Band Walks',
        section: 'strength',
        scheme: { kind: 'reps', sets: 3, reps: 10 },
        eachSide: true,
        weight: { value: 'Light–medium band', estimated: true },
        help: 'Band above the knees or at the ankles, athletic stance. Take short side steps — knees out, feet pointing forward. Ten steps one way, ten back. Don’t let the knees cave.',
        cue: '10 steps each way. Athletic stance, knees out.',
        demoUrl: 'https://www.youtube.com/watch?v=5wUk8wQNUT8',
      },
      {
        id: 'b-stepup',
        name: '1KB Racked Step-Up or RFESS',
        section: 'strength',
        scheme: { kind: 'reps', sets: 3, reps: 8 },
        eachSide: true,
        rest: '1:00',
        weight: { value: '12 kg', estimated: false },
        help: 'KB in a front rack or goblet. Step onto a sturdy box or stair and drive through the whole foot. Stand tall at the top, then lower with control — don’t bounce off the trailing leg. RFESS on a chair is the same idea, just reverse.',
        demoUrl: 'https://www.youtube.com/watch?v=oC2c46JGy5c',
        swaps: {
          home: 'Stair step-up or RFESS on a chair. DB or KB.',
        },
      },
      {
        id: 'b-row',
        name: 'TRX SA Row or DB Row',
        section: 'strength',
        scheme: { kind: 'reps', sets: 3, reps: 8 },
        rest: '1:00',
        weight: { value: '25 lb', estimated: false },
        help: 'Lean back on the straps or grab a DB. Pull the chest through, squeeze the shoulder blades, then lower slow. Keep the body in one line on TRX. Home: DB, backpack, or band row is the same pattern.',
        demoUrl: 'https://www.youtube.com/watch?v=N_14s8zFOms',
        swaps: {
          home: 'DB row, backpack row, or band row.',
        },
      },
      {
        id: 'b-calf',
        name: 'Single-Leg Calf Raise',
        section: 'accessory',
        scheme: { kind: 'reps', sets: 3, reps: 10 },
        eachSide: true,
        weight: { value: 'BW', estimated: false },
        help: 'Stand on one foot and hold a wall or kettlebell for balance. Rise onto the ball of the foot, pause, then lower slow. Full range — don’t bounce. Switch sides.',
        cue: 'Slow lower. Hold a wall or kettlebell for balance.',
        demoUrl: 'https://www.youtube.com/watch?v=ElcvJ0kjt6c',
      },
      {
        id: 'b-deadbug',
        name: 'Dead Bug',
        section: 'core',
        scheme: { kind: 'reps', sets: 3, reps: 8 },
        eachSide: true,
        weight: { value: 'BW', estimated: false },
        help: 'On your back, knees over hips, arms to the ceiling. Press the low back down, then reach one arm and the opposite leg out. Only go as far as the back stays glued. Switch sides — slow wins.',
        demoUrl: 'https://www.youtube.com/watch?v=4XLEnwUr1d8',
      },
      {
        id: 'b-skierg',
        name: 'SkiErg',
        section: 'condition',
        optional: true,
        scheme: { kind: 'distance', sets: 3, meters: 250 },
        rest: '0:30',
        weight: { value: 'Easy–moderate', estimated: true },
        help: 'Stand tall, then crunch and hinge as you pull the handles to the pockets — hat to pockets. Legs and core do the work; arms follow. Easy to moderate. Skip at home.',
        demoUrl: 'https://www.youtube.com/watch?v=B0lIgT5PHc8',
        swaps: {
          home: 'Skip. March 3 × 90s or band pulls.',
        },
      },
    ],
  },
  N: {
    id: 'N',
    title: 'NYC home',
    focus: 'NYC apartment · 2×10, 2×12, 16, 20, 24 kg KBs · TRX · mat',
    warmup: [
      {
        id: 'wgs',
        name: 'World’s Greatest Stretch',
        detail: '30 seconds each side × 1.',
        help: HELP_WGS,
        demoUrl: DEMO_WGS,
      },
      {
        id: 'catcow',
        name: 'Cat-cow on the mat',
        detail: '6–8 slow rounds.',
        help: 'On all fours, round the back on the exhale, then lift the chest and look a little forward on the inhale. Slow and easy — this is a warm-up, not a stretch contest.',
      },
    ],
    exercises: [
      {
        id: 'n-hollow',
        name: 'Hollow Hold',
        section: 'core',
        scheme: { kind: 'time', sets: 3, seconds: 25 },
        rest: '0:30',
        weight: { value: 'BW', estimated: false },
        help: 'On your back, low back pressed to the floor, arms and legs long and a few inches off the ground. If the back pops up, tuck the knees or shorten the hold. Own a quiet 25 seconds.',
        cue: 'If you have the blue handle band, you can swap to anti-rotation 3 × 8 each.',
        demoUrl: 'https://www.youtube.com/watch?v=LlDNef_Ztsc',
      },
      {
        id: 'n-chop',
        name: 'Half-Kneeling Wood Chop',
        section: 'core',
        scheme: { kind: 'reps', sets: 3, reps: 8 },
        eachSide: true,
        rest: '1:00',
        weight: { value: '10 kg KB', estimated: false },
        help: 'Half-kneel with the inside knee up. Hold the 10 kg bell and chop from high-outside to low-inside without letting the ribs or hips spin. Stay stacked — this is a chop, not a twist.',
        cue: 'Quiet hips. Last two reps should feel like a fight.',
        demoUrl: 'https://www.youtube.com/watch?v=I4Ncb8LZntY',
      },
      {
        id: 'n-swing',
        name: 'Two-Hand KB Swing',
        section: 'power',
        scheme: { kind: 'reps', sets: 4, reps: 8 },
        rest: '0:45',
        weight: {
          value: '16 kg',
          estimated: false,
          alternate: '20 kg when 16 is snappy and quiet',
        },
        help: 'Hinge, don’t squat. Hike the bell back, then snap the hips so it floats to about chest height. Arms are ropes — the power is from the hips. Land quiet and snappy.',
        cue: 'Hard hip snap. 20 kg is next when 16 is easy.',
        demoUrl: 'https://www.youtube.com/watch?v=1FjAoO5McVI',
      },
      {
        id: 'n-squat',
        name: 'Goblet Squat',
        section: 'strength',
        scheme: { kind: 'reps', sets: 4, reps: 8 },
        rest: '1:30',
        weight: {
          value: '16 kg',
          estimated: false,
          alternate: '20 kg when all 8s are clean',
        },
        help: 'Hold the 16 kg bell at the chest, elbows down. Sit between the heels, chest tall, knees tracking the toes. Stand by pushing the floor away. Working sets of 8.',
        cue: 'Working 8s. Add load when 16 kg is no longer hard.',
        demoUrl: 'https://www.youtube.com/watch?v=0eW8av1WC4g',
      },
      {
        id: 'n-trx-row',
        name: 'TRX Row',
        section: 'strength',
        scheme: { kind: 'reps', sets: 4, reps: 8 },
        rest: '1:00',
        weight: { value: 'Challenging angle', estimated: true },
        help: 'Lean back on the straps, body in one line. Pull the chest through, squeeze the shoulder blades, then lower slow. Walk the feet forward to make it harder — the last two reps should grind.',
        cue: 'Walk the feet in until 8 is a fight.',
        demoUrl: 'https://www.youtube.com/watch?v=N_14s8zFOms',
      },
      {
        id: 'n-floor-press',
        name: 'Floor Press',
        section: 'strength',
        scheme: { kind: 'reps', sets: 4, reps: 8 },
        rest: '1:30',
        weight: {
          value: '2 × 12 kg',
          estimated: false,
          alternate: 'Single-arm 16 kg × 8 each',
        },
        help: 'Lie on the mat, bells at the shoulders, wrists stacked. Press up until the arms are long, then lower until the upper arms kiss the floor — no bounce. Keep the ribs down. Roll to your side to set the bells down.',
        cue: 'Two 12s. Single-arm 16 kg × 8 each is the backup.',
        demoUrl: 'https://www.youtube.com/watch?v=4ULa6AJcjr8',
      },
      {
        id: 'n-row',
        name: '1-Arm KB Row',
        section: 'strength',
        scheme: { kind: 'reps', sets: 4, reps: 8 },
        eachSide: true,
        rest: '1:00',
        weight: { value: '16 kg', estimated: false },
        help: 'Hinge or put a hand on a chair. Pull the 16 kg bell to the hip, not the shoulder. Pause a beat at the top, then lower without a shrug. Own the last reps.',
        cue: 'Pull to the hip. Own the last reps.',
        demoUrl: 'https://www.youtube.com/watch?v=epSR-ma7BsY',
      },
      {
        id: 'n-oh-press',
        name: '1-Arm KB Overhead Press',
        section: 'strength',
        scheme: { kind: 'reps', sets: 3, reps: 8 },
        eachSide: true,
        rest: '1:30',
        weight: {
          value: '12 kg',
          estimated: false,
          alternate: '10 kg if 12 is ugly',
        },
        help: 'Rack the bell at the shoulder, ribs down, glutes tight. Press straight up so the biceps finishes by the ear. No big backbend. Lower with control back to the rack.',
        cue: 'Strict. Drop to 10 kg if 12 wanders.',
        demoUrl: 'https://www.youtube.com/watch?v=gjr-QAdsq4o',
      },
      {
        id: 'n-facepull',
        name: 'TRX Face Pull',
        section: 'strength',
        scheme: { kind: 'repsRange', sets: 3, repsMin: 12, repsMax: 15 },
        weight: { value: 'TRX', estimated: true },
        help: 'Face the anchor, lean back, arms long. Pull the handles to the forehead with elbows high, then open the hands a little toward the ears. Squeeze the shoulder blades — don’t shrug. This replaces band pull-aparts.',
        cue: 'Elbows high. No band pull-aparts in this apartment.',
        demoUrl: 'https://www.youtube.com/watch?v=QPWImG4kJUg',
      },
      {
        id: 'n-deadbug',
        name: 'Dead Bug',
        section: 'core',
        scheme: { kind: 'reps', sets: 3, reps: 8 },
        eachSide: true,
        weight: { value: 'BW', estimated: false },
        help: 'On your back, knees over hips, arms to the ceiling. Press the low back down, then reach one arm and the opposite leg out. Only go as far as the back stays glued. Switch sides — slow wins.',
        demoUrl: 'https://www.youtube.com/watch?v=4XLEnwUr1d8',
      },
      {
        id: 'n-birddog',
        name: 'Bird Dog',
        section: 'core',
        scheme: { kind: 'reps', sets: 3, reps: 8 },
        eachSide: true,
        weight: { value: 'BW', estimated: false },
        help: 'On all fours, hands under shoulders, knees under hips. Reach one arm and the opposite leg long without letting the hips or shoulders twist. Pause, then return slow. Small and quiet beats big and wobbly.',
        demoUrl: 'https://www.youtube.com/watch?v=ZdAHe9_HeEw',
      },
      {
        id: 'n-bridge',
        name: 'Single-Leg Glute Bridge',
        section: 'accessory',
        scheme: { kind: 'reps', sets: 3, reps: 8 },
        eachSide: true,
        weight: {
          value: 'BW',
          estimated: false,
          alternate: 'Light KB on the hips when BW is easy',
        },
        help: 'On your back, one foot planted, the other knee tucked. Drive through the planted heel until the hips are long, squeeze the glute, then lower slow. Keep the hips level. A light bell on the hips is optional.',
        cue: 'Hips level. Optional light KB on the hips.',
        demoUrl: 'https://www.youtube.com/watch?v=_K_di6h2-Wg',
      },
    ],
  },
}
