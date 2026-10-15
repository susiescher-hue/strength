import { GYM_DAYS, type GymDayId } from '../data/program'

interface DayToggleProps {
  value: GymDayId
  onChange: (day: GymDayId) => void
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
