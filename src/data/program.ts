export type DayId = 'A' | 'B'
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
  cue?: string
  optional?: boolean
  demoUrl?: string
  swaps?: { home: string }
}

export interface WarmupItem {
  id: string
  name: string
  detail: string
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
      },
      {
        id: 'wgs',
        name: 'World’s Greatest Stretch',
        detail: '30 seconds each side × 1.',
      },
    ],
    exercises: [
      {
        id: 'a-ab-dolly',
        name: 'Ab Dolly Rollout',
        section: 'core',
        scheme: { kind: 'reps', sets: 3, reps: 8 },
        weight: { value: 'BW', estimated: false },
        cue: 'Anti-extension. Ribs down. Add a light plate on the hips when 8 is easy.',
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
        cue: 'Anti-rotation. Pick a load that makes the last 2 reps a fight.',
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
        cue: 'Hard hip snap. If 16 kg feels easy, go 20 kg next session.',
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
        cue: 'Working sets of 8 — not a pump pyramid. Add load when 12 kg is no longer hard.',
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
        cue: 'A hard 8. If you could do 12, the stack is too light.',
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
        cue: 'Last 2 reps should grind. Flat bench is fine if there is no incline.',
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
        cue: 'Chest supported or hand-on-bench. Pull to the hip. Own the last reps.',
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
        cue: 'Strict. If 15 lb flies, go 20 next time.',
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
        demoUrl: 'https://www.youtube.com/watch?v=qi2y-eI_kuI',
        swaps: {
          home: 'Band pull-aparts. Same Demo.',
        },
      },
      {
        id: 'a-hollow',
        name: 'Hollow Hold / Flutters',
        section: 'core',
        scheme: { kind: 'timeRange', sets: 3, secondsMin: 20, secondsMax: 30 },
        rest: '0:30',
        weight: { value: 'BW', estimated: false },
      },
      {
        id: 'a-rower',
        name: 'Rower',
        section: 'condition',
        optional: true,
        scheme: { kind: 'distance', sets: 3, meters: 250 },
        rest: '0:30',
        weight: { value: 'Easy–moderate', estimated: true },
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
      },
      {
        id: 'wgs',
        name: 'World’s Greatest Stretch',
        detail: '30 seconds each side × 2.',
      },
      {
        id: 'swings',
        name: 'Wall Forward Leg Swings',
        detail: '8 each side.',
      },
    ],
    exercises: [
      {
        id: 'b-pulldown',
        name: 'Straight-Arm Pulldown',
        section: 'core',
        scheme: { kind: 'reps', sets: 3, reps: 8 },
        weight: { value: 'Cable or band', estimated: true },
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
      },
      {
        id: 'b-clean-squat',
        name: 'KB Goblet Clean to Squat',
        section: 'power',
        scheme: { kind: 'repsRange', sets: 3, repsMin: 3, repsMax: 5 },
        weight: { value: '12 kg', estimated: false },
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
        cue: 'One narrow + one wide. Split the total (10 = 5 each). Lat pulldown if needed.',
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
        cue: '10 steps each way. Athletic stance, knees out.',
      },
      {
        id: 'b-stepup',
        name: '1KB Racked Step-Up or RFESS',
        section: 'strength',
        scheme: { kind: 'reps', sets: 3, reps: 8 },
        eachSide: true,
        rest: '1:00',
        weight: { value: '12 kg', estimated: false },
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
        swaps: {
          home: 'Skip. March 3 × 90s or band pulls.',
        },
      },
    ],
  },
}
