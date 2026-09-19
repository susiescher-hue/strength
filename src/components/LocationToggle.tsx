import { LOCATION_LABEL, type LocationId } from '../data/program'

interface LocationToggleProps {
  value: LocationId
  onChange: (location: LocationId) => void
}

const OPTIONS: LocationId[] = ['gym', 'home']

export function LocationToggle({ value, onChange }: LocationToggleProps) {
  return (
    <div className="location-block">
      <p className="location-label">Where am I?</p>
      <div className="location-toggle" role="radiogroup" aria-label="Where am I?">
        {OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={value === option}
            className={value === option ? 'is-on' : ''}
            onClick={() => onChange(option)}
          >
            {LOCATION_LABEL[option]}
          </button>
        ))}
      </div>
    </div>
  )
}
