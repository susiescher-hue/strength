export type DayId = 'A' | 'B'

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
  swap?: string
  cue?: string
  optional?: boolean
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
    focus: 'Upper + squat + core',
    warmup: [
      {
        id: 'foam',
        name: 'Foam roll',
        detail: 'Hamstrings, quads, rhomboids — or skip if you are short on time.',
      },
      {
        id: 'wgs',
        name: 'World’s Greatest Stretch',
        detail: '30 seconds each side × 2.',
      },
    ],
    exercises: [
      {
        id: 'a-ab-dolly',
        name: 'Ab Dolly Rollout',
        section: 'core',
        scheme: { kind: 'reps', sets: 3, reps: 8 },
        weight: { value: 'BW', estimated: false },
        swap: 'Hotel/home: towel slide on the floor, or skip ahead to hollow holds.',
        cue: 'Ab wheel or dolly. Ribs down — don’t dump into the low back.',
      },
      {
        id: 'a-chop',
        name: '1/2 Kneeling Chop',
        section: 'core',
        scheme: { kind: 'reps', sets: 3, reps: 8 },
        eachSide: true,
        rest: '1:00',
        weight: { value: 'Light band / cable', estimated: true },
        swap: 'Cable at Body Space; band from a door or rack at hotel/home.',
      },
      {
        id: 'a-swing',
        name: 'Two-Hand KB Swing',
        section: 'power',
        scheme: { kind: 'reps', sets: 3, reps: 8 },
        weight: {
          value: '16 kg',
          estimated: false,
          alternate: '14 kg if 16 feels sloppy',
        },
      },
      {
        id: 'a-squat',
        name: 'Goblet or 2KB Front Squat',
        section: 'strength',
        scheme: { kind: 'repsVary', reps: [12, 10, 8] },
        rest: '0:30',
        weight: { value: '12 kg', estimated: false },
        cue: 'Goblet with one bell, or two kettlebells in the front rack.',
      },
      {
        id: 'a-slides',
        name: 'Wall Forearm Slides',
        section: 'strength',
        scheme: { kind: 'reps', sets: 3, reps: 6 },
        rest: '0:30',
        weight: { value: 'BW', estimated: false },
        cue: 'Forearms on the wall, ribs down, slide up without arching.',
      },
      {
        id: 'a-pulldown',
        name: 'Lat Pulldown — Underhand Grip',
        section: 'strength',
        scheme: { kind: 'reps', sets: 3, reps: 10 },
        weight: { value: 'Band or stack', estimated: true },
        swap: 'Band-assisted pull-up if no cable. Hotel: band pulldown from a door.',
      },
      {
        id: 'a-press',
        name: 'Incline Dumbbell Press',
        section: 'strength',
        scheme: { kind: 'reps', sets: 3, reps: 10 },
        rest: '1:00',
        weight: {
          value: '25 lb each',
          estimated: false,
          alternate: 'Flat bench if no incline',
        },
      },
      {
        id: 'a-row-press',
        name: 'Band SA Row + DB OH Press',
        section: 'strength',
        scheme: { kind: 'reps', sets: 3, reps: 8 },
        weight: { value: '25 lb row / 15 lb press', estimated: false },
        cue: 'Single-arm band row at 25 lb, then overhead press at 15 lb each.',
      },
      {
        id: 'a-facepull',
        name: 'Band Pull-Aparts or Face Pulls',
        section: 'strength',
        scheme: { kind: 'repsRange', sets: 3, repsMin: 12, repsMax: 15 },
        weight: { value: 'Light band', estimated: true },
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
        swap: 'Skip at hotel, or brisk 3 × 90s walk.',
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
        swap: 'Cable at Body Space; band at hotel/home.',
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
      },
      {
        id: 'b-pullup',
        name: 'Mixed-Grip Pull-Up',
        section: 'strength',
        scheme: { kind: 'repsVary', reps: [10, 8, 6] },
        rest: '0:30',
        weight: { value: 'BW or band', estimated: true },
        cue: 'One narrow + one wide. Split the total (10 = 5 each). Lat pulldown if needed.',
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
        swap: 'Single KB deadlift if you only have one bell.',
      },
      {
        id: 'b-rdl',
        name: '2KB / DB Romanian Deadlift',
        section: 'strength',
        scheme: { kind: 'reps', sets: 3, reps: 8 },
        rest: '1:00',
        weight: { value: '16–20 kg', estimated: true },
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
        swap: 'Rear-foot elevated split squat if no box. Hotel: chair or stair. ~12–20 lb DBs for a lunge swap.',
      },
      {
        id: 'b-row',
        name: 'TRX SA Row or DB Row',
        section: 'strength',
        scheme: { kind: 'reps', sets: 3, reps: 8 },
        rest: '1:00',
        weight: { value: '25 lb', estimated: false },
        swap: 'Cable if no TRX. Hotel: backpack or suitcase row.',
      },
      {
        id: 'b-calf',
        name: 'Single-Leg Calf Raise',
        section: 'accessory',
        scheme: { kind: 'reps', sets: 3, reps: 10 },
        eachSide: true,
        weight: { value: 'BW', estimated: false },
        cue: 'Slow lower. Hold a wall or kettlebell for balance.',
      },
      {
        id: 'b-deadbug',
        name: 'Dead Bug',
        section: 'core',
        scheme: { kind: 'reps', sets: 3, reps: 8 },
        eachSide: true,
        weight: { value: 'BW', estimated: false },
      },
      {
        id: 'b-skierg',
        name: 'SkiErg',
        section: 'condition',
        optional: true,
        scheme: { kind: 'distance', sets: 3, meters: 250 },
        rest: '0:30',
        weight: { value: 'Easy–moderate', estimated: true },
        swap: 'Skip at hotel, or 3 × 90s marching / band pulls.',
      },
    ],
  },
}
