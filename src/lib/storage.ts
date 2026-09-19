import { DAYS, setCount, type DayId, type LocationId } from '../data/program'

export const STORAGE_KEY = 'susie-strength-v1'

export interface DayState {
  lastCompleted: string | null
  weights: Record<string, string>
  notes: Record<string, string>
  sets: Record<string, boolean[]>
  warmupDone: Record<string, boolean>
  warmupOpen: boolean
}

export interface AppState {
  version: 1
  activeDay: DayId
  location: LocationId
  days: Record<DayId, DayState>
}

function emptySets(day: DayId): Record<string, boolean[]> {
  const sets: Record<string, boolean[]> = {}
  for (const exercise of DAYS[day].exercises) {
    sets[exercise.id] = Array.from({ length: setCount(exercise.scheme) }, () => false)
  }
  return sets
}

function emptyWarmup(day: DayId): Record<string, boolean> {
  return Object.fromEntries(DAYS[day].warmup.map((item) => [item.id, false]))
}

export function defaultDayState(day: DayId): DayState {
  return {
    lastCompleted: null,
    weights: {},
    notes: {},
    sets: emptySets(day),
    warmupDone: emptyWarmup(day),
    warmupOpen: false,
  }
}

export function defaultState(): AppState {
  return {
    version: 1,
    activeDay: 'A',
    location: 'gym',
    days: {
      A: defaultDayState('A'),
      B: defaultDayState('B'),
    },
  }
}

function mergeDay(day: DayId, saved: Partial<DayState> | undefined): DayState {
  const base = defaultDayState(day)
  if (!saved) return base

  const sets = emptySets(day)
  for (const [id, flags] of Object.entries(saved.sets ?? {})) {
    if (!(id in sets) || !Array.isArray(flags)) continue
    sets[id] = sets[id].map((_, index) => Boolean(flags[index]))
  }

  const warmupDone = emptyWarmup(day)
  for (const [id, done] of Object.entries(saved.warmupDone ?? {})) {
    if (id in warmupDone) warmupDone[id] = Boolean(done)
  }

  return {
    lastCompleted: saved.lastCompleted ?? null,
    weights: saved.weights ?? {},
    notes: saved.notes ?? {},
    sets,
    warmupDone,
    warmupOpen: Boolean(saved.warmupOpen),
  }
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    const parsed = JSON.parse(raw) as Partial<AppState>
    const activeDay = parsed.activeDay === 'B' ? 'B' : 'A'
    const location = parsed.location === 'home' ? 'home' : 'gym'
    return {
      version: 1,
      activeDay,
      location,
      days: {
        A: mergeDay('A', parsed.days?.A),
        B: mergeDay('B', parsed.days?.B),
      },
    }
  } catch {
    return defaultState()
  }
}

export function saveState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function todayStamp(): string {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

export function formatStamp(isoDate: string | null): string {
  if (!isoDate) return 'Not yet'
  const [year, month, day] = isoDate.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

export function countProgress(day: DayId, state: DayState): { done: number; total: number } {
  let done = 0
  let total = 0
  for (const exercise of DAYS[day].exercises) {
    const flags = state.sets[exercise.id] ?? []
    const n = setCount(exercise.scheme)
    total += n
    done += flags.slice(0, n).filter(Boolean).length
  }
  return { done, total }
}
