import { useState } from 'react'
import {
  LOCATION_LABEL,
  SECTION_LABEL,
  locationSwap,
  setCount,
  setLabel,
  schemeSummary,
  type Exercise,
  type LocationId,
} from '../data/program'

interface ExerciseCardProps {
  exercise: Exercise
  index: number
  total: number
  flags: boolean[]
  weight: string
  note: string
  location: LocationId
  onToggleSet: (index: number) => void
  onWeight: (value: string) => void
  onNote: (value: string) => void
}

export function ExerciseCard({
  exercise,
  index,
  total,
  flags,
  weight,
  note,
  location,
  onToggleSet,
  onWeight,
  onNote,
}: ExerciseCardProps) {
  const [noteOpen, setNoteOpen] = useState(false)
  const count = setCount(exercise.scheme)
  const done = flags.slice(0, count).filter(Boolean).length
  const showNote = noteOpen || note.length > 0
  const swap = locationSwap(exercise, location)

  return (
    <article className={`card exercise ${exercise.optional ? 'is-optional' : ''}`}>
      <header className="ex-head">
        <p className="eyebrow">
          {exercise.optional ? 'Optional' : SECTION_LABEL[exercise.section]}
          <span>
            {index + 1}/{total}
          </span>
        </p>
        <div className="ex-title">
          <h3>{exercise.name}</h3>
          {exercise.demoUrl && (
            <a
              className="demo-link"
              href={exercise.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Demo
            </a>
          )}
        </div>
        <p className="ex-meta">
          <span>{schemeSummary(exercise)}</span>
          {exercise.rest && <span>Rest {exercise.rest}</span>}
          {done > 0 && (
            <span className="ex-progress">
              {done}/{count}
            </span>
          )}
        </p>
      </header>

      <div className="sets" role="group" aria-label={`${exercise.name} sets`}>
        {Array.from({ length: count }, (_, setIndex) => {
          const on = Boolean(flags[setIndex])
          return (
            <button
              key={setIndex}
              type="button"
              className={`set ${on ? 'is-on' : ''}`}
              aria-pressed={on}
              onClick={() => onToggleSet(setIndex)}
            >
              <strong>{setIndex + 1}</strong>
              <span>{setLabel(exercise.scheme, setIndex)}</span>
            </button>
          )
        })}
      </div>

      {exercise.weight && (
        <label className="weight">
          <span>
            Tap to edit weight
            {exercise.weight.estimated && (
              <mark className="est">estimate</mark>
            )}
          </span>
          <input
            type="text"
            inputMode="text"
            enterKeyHint="done"
            value={weight}
            onChange={(event) => onWeight(event.target.value)}
            placeholder={exercise.weight.value}
            aria-label={`${exercise.name} weight, tap to edit`}
          />
          {exercise.weight.alternate && (
            <small>Next step: {exercise.weight.alternate}</small>
          )}
        </label>
      )}

      {exercise.cue && <p className="cue">{exercise.cue}</p>}
      {swap && (
        <p className="swap is-shown">
          <strong>{LOCATION_LABEL[location]}:</strong> {swap}
        </p>
      )}

      {showNote ? (
        <label className="note">
          <span>Note</span>
          <textarea
            rows={2}
            value={note}
            onChange={(event) => onNote(event.target.value)}
            placeholder="How it felt, swap used, hotel notes…"
          />
        </label>
      ) : (
        <button type="button" className="note-add" onClick={() => setNoteOpen(true)}>
          + Add a note
        </button>
      )}
    </article>
  )
}
