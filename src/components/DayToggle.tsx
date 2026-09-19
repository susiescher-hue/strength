import type { DayId } from '../data/program'

interface DayToggleProps {
  value: DayId
  onChange: (day: DayId) => void
}

export function DayToggle({ value, onChange }: DayToggleProps) {
  return (
    <div className="day-toggle" role="tablist" aria-label="Workout day">
      <button
        type="button"
        role="tab"
        aria-selected={value === 'A'}
        className={value === 'A' ? 'is-on' : ''}
        onClick={() => onChange('A')}
      >
        Day A
        <span>Upper · squat · core</span>
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={value === 'B'}
        className={value === 'B' ? 'is-on' : ''}
        onClick={() => onChange('B')}
      >
        Day B
        <span>Hinge · single-leg · pull</span>
      </button>
    </div>
  )
}
