import { useEffect, useState } from 'react'
import { DayToggle } from './components/DayToggle'
import { ExerciseCard } from './components/ExerciseCard'
import { HelpSheet, type HelpContent } from './components/HelpSheet'
import { PlaceToggle } from './components/PlaceToggle'
import { SessionBar } from './components/SessionBar'
import { WarmupCard } from './components/WarmupCard'
import { isNycHome, placeFromDay } from './data/program'
import { useWorkoutStore } from './hooks/useWorkoutStore'
import { formatStamp } from './lib/storage'

export default function App() {
  const store = useWorkoutStore()
  const [flash, setFlash] = useState(false)
  const [help, setHelp] = useState<HelpContent | null>(null)

  useEffect(() => {
    if (!flash) return
    const timer = window.setTimeout(() => setFlash(false), 2200)
    return () => window.clearTimeout(timer)
  }, [flash])

  const { program, dayState, progress } = store
  const nyc = isNycHome(store.activeDay)

  return (
    <div className="app">
      <header className="top">
        <p className="brand-kicker">Your sessions · gym or NYC home</p>
        <h1>Stronger</h1>
        <p className="lede">
          Gym or NYC home. Check a set, change a weight, keep going.
        </p>
        <p className="last-line">
          <span>A {formatStamp(store.lastCompletedA)}</span>
          <span>B {formatStamp(store.lastCompletedB)}</span>
          <span>NYC {formatStamp(store.lastCompletedN)}</span>
        </p>
      </header>

      <div className="sticky-day">
        <PlaceToggle
          value={placeFromDay(store.activeDay)}
          onChange={(place) => {
            setFlash(false)
            store.setPlace(place)
            window.scrollTo({ top: 0, behavior: 'auto' })
          }}
        />
        {nyc ? (
          <p className="nyc-gear">
            NYC apartment · KBs 2×10, 2×12, 16, 20, 24 kg · TRX · mat
          </p>
        ) : (
          <DayToggle
            value={store.activeDay === 'B' ? 'B' : 'A'}
            onChange={(day) => {
              setFlash(false)
              store.setActiveDay(day)
            }}
          />
        )}
        <p className="day-focus">{program.focus}</p>
      </div>

      <main>
        <WarmupCard
          items={program.warmup}
          open={dayState.warmupOpen}
          done={dayState.warmupDone}
          onHelp={setHelp}
          onToggleOpen={store.toggleWarmupOpen}
          onToggleItem={store.toggleWarmupItem}
        />
        {program.exercises.map((exercise, index) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            index={index}
            total={program.exercises.length}
            flags={dayState.sets[exercise.id] ?? []}
            weight={dayState.weights[exercise.id] ?? exercise.weight?.value ?? ''}
            note={dayState.notes[exercise.id] ?? ''}
            location={store.location}
            onHelp={setHelp}
            onToggleSet={(setIndex) => store.toggleSet(exercise.id, setIndex)}
            onWeight={(value) => store.setWeight(exercise.id, value)}
            onNote={(value) => store.setNote(exercise.id, value)}
          />
        ))}
        <p className="block-note">
          This block: ~4 weeks / ~8 sessions, then progress loads.
        </p>
        <p className="foot-note">
          Tap a weight to change it — it stays on this phone. Estimates are
          starting guesses. No login.
        </p>
      </main>

      <SessionBar
        dayTitle={program.title}
        lastCompleted={dayState.lastCompleted}
        done={progress.done}
        total={progress.total}
        justCompleted={flash}
        onComplete={() => {
          store.markComplete()
          setFlash(true)
        }}
        onReset={() => {
          if (window.confirm('Clear today’s checkmarks? Weights and notes stay.')) {
            store.resetSession()
          }
        }}
      />
      <HelpSheet item={help} onClose={() => setHelp(null)} />
    </div>
  )
}
