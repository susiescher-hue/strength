import { DAY_TABS, type DayId } from '../data/program'

interface DayToggleProps {
  value: DayId
  onChange: (day: DayId) => void
}

export function DayToggle({ value, onChange }: DayToggleProps) {
  return (
    <div className="day-toggle" role="tablist" aria-label="Workout day">
      {DAY_TABS.map((tab) => (
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
