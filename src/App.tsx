import { useEffect, useState } from 'react'
import { DayToggle } from './components/DayToggle'
import { ExerciseCard } from './components/ExerciseCard'
import { SessionBar } from './components/SessionBar'
import { WarmupCard } from './components/WarmupCard'
import { useWorkoutStore } from './hooks/useWorkoutStore'
import { formatStamp } from './lib/storage'

export default function App() {
  const store = useWorkoutStore()
  const [flash, setFlash] = useState(false)

  useEffect(() => {
    if (!flash) return
    const timer = window.setTimeout(() => setFlash(false), 2200)
    return () => window.clearTimeout(timer)
  }, [flash])

  const { program, dayState, progress } = store

  return (
    <div className="app">
      <header className="top">
        <p className="brand-kicker">Susie Scher · Body Space Fitness NYC</p>
        <h1>strength</h1>
        <p className="lede">
          Two days. Gym, hotel, or home. Check a set, change a weight, keep going.
        </p>
        <p className="last-line">
          <span>
            A last done {formatStamp(store.lastCompletedA)}
          </span>
          <span>
            B last done {formatStamp(store.lastCompletedB)}
          </span>
        </p>
      </header>

      <div className="sticky-day">
        <DayToggle value={store.activeDay} onChange={store.setActiveDay} />
        <p className="day-focus">{program.focus}</p>
      </div>

      <main>
        <WarmupCard
          items={program.warmup}
          open={dayState.warmupOpen}
          done={dayState.warmupDone}
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
            onToggleSet={(setIndex) => store.toggleSet(exercise.id, setIndex)}
            onWeight={(value) => store.setWeight(exercise.id, value)}
            onNote={(value) => store.setNote(exercise.id, value)}
          />
        ))}
        <p className="foot-note">
          Seeded from current baselines. Anything marked estimate is a starting
          guess — tap the weight and make it yours. No login; this phone keeps
          the session in local storage.
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
    </div>
  )
}
