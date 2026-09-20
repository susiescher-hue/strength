import { useCallback, useEffect, useMemo, useState } from 'react'
import { DAYS, type DayId, type PlaceId } from '../data/program'
import {
  countProgress,
  defaultDayState,
  defaultState,
  loadState,
  saveState,
  todayStamp,
  type AppState,
  type DayState,
} from '../lib/storage'

function updateDay(
  state: AppState,
  day: DayId,
  patch: (current: DayState) => DayState,
): AppState {
  const current = state.days[day] ?? defaultDayState(day)
  return {
    ...state,
    days: {
      ...state.days,
      [day]: patch(current),
    },
  }
}

export function useWorkoutStore() {
  const [state, setState] = useState<AppState>(defaultState)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setState(loadState())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) saveState(state)
  }, [state, hydrated])

  const activeDay = state.activeDay
  const dayState = state.days[activeDay]
  const program = DAYS[activeDay]
  const progress = useMemo(
    () => countProgress(activeDay, dayState),
    [activeDay, dayState],
  )

  const setActiveDay = useCallback((day: DayId) => {
    setState((prev) => ({
      ...prev,
      activeDay: day,
      lastGymDay: day === 'B' ? 'B' : day === 'A' ? 'A' : prev.lastGymDay,
      location: day === 'N' ? 'home' : 'gym',
    }))
  }, [])

  const setPlace = useCallback((place: PlaceId) => {
    setState((prev) => {
      if (place === 'nyc') {
        const lastGymDay =
          prev.activeDay === 'B' ? 'B' : prev.activeDay === 'A' ? 'A' : prev.lastGymDay
        return {
          ...prev,
          activeDay: 'N',
          lastGymDay,
          location: 'home',
        }
      }
      return {
        ...prev,
        activeDay: prev.lastGymDay === 'B' ? 'B' : 'A',
        location: 'gym',
      }
    })
  }, [])

  const toggleWarmupOpen = useCallback(() => {
    setState((prev) =>
      updateDay(prev, prev.activeDay, (current) => ({
        ...current,
        warmupOpen: !current.warmupOpen,
      })),
    )
  }, [])

  const toggleWarmupItem = useCallback((id: string) => {
    setState((prev) =>
      updateDay(prev, prev.activeDay, (current) => ({
        ...current,
        warmupDone: {
          ...current.warmupDone,
          [id]: !current.warmupDone[id],
        },
      })),
    )
  }, [])

  const toggleSet = useCallback((exerciseId: string, index: number) => {
    setState((prev) =>
      updateDay(prev, prev.activeDay, (current) => {
        const flags = current.sets[exerciseId] ?? []
        return {
          ...current,
          sets: {
            ...current.sets,
            [exerciseId]: flags.map((flag, i) => (i === index ? !flag : flag)),
          },
        }
      }),
    )
  }, [])

  const setWeight = useCallback((exerciseId: string, value: string) => {
    setState((prev) =>
      updateDay(prev, prev.activeDay, (current) => ({
        ...current,
        weights: { ...current.weights, [exerciseId]: value },
      })),
    )
  }, [])

  const setNote = useCallback((exerciseId: string, value: string) => {
    setState((prev) =>
      updateDay(prev, prev.activeDay, (current) => ({
        ...current,
        notes: { ...current.notes, [exerciseId]: value },
      })),
    )
  }, [])

  const markComplete = useCallback(() => {
    setState((prev) =>
      updateDay(prev, prev.activeDay, (current) => ({
        ...current,
        lastCompleted: todayStamp(),
      })),
    )
  }, [])

  const resetSession = useCallback(() => {
    setState((prev) =>
      updateDay(prev, prev.activeDay, (current) => ({
        ...current,
        sets: Object.fromEntries(
          Object.entries(current.sets).map(([id, flags]) => [
            id,
            flags.map(() => false),
          ]),
        ),
        warmupDone: Object.fromEntries(
          Object.entries(current.warmupDone).map(([id]) => [id, false]),
        ),
      })),
    )
  }, [])

  return {
    hydrated,
    activeDay,
    dayState,
    program,
    progress,
    lastCompletedA: state.days.A.lastCompleted,
    lastCompletedB: state.days.B.lastCompleted,
    lastCompletedN: state.days.N?.lastCompleted ?? null,
    location: state.location,
    setActiveDay,
    setPlace,
    toggleWarmupOpen,
    toggleWarmupItem,
    toggleSet,
    setWeight,
    setNote,
    markComplete,
    resetSession,
  }
}
