import { GYM_DAYS } from '../data/program'

interface DayToggleProps {
  value: 'A' | 'B'
  onChange: (day: 'A' | 'B') => void
}

export function DayToggle({ value, onChange }: DayToggleProps) {
  return (
    <div className="day-toggle" role="tablist" aria-label="Gym day">
      {GYM_DAYS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={value === tab.id}
          className={value === tab.id ? 'is-on' : ''}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
          <span>{tab.blurb}</span>
        </button>
      ))}
    </div>
  )
}
