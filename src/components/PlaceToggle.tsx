import type { PlaceId } from '../data/program'

interface PlaceToggleProps {
  value: PlaceId
  onChange: (place: PlaceId) => void
}

export function PlaceToggle({ value, onChange }: PlaceToggleProps) {
  return (
    <div className="place-toggle" role="tablist" aria-label="Where to train">
      <button
        type="button"
        role="tab"
        aria-selected={value === 'gym'}
        className={value === 'gym' ? 'is-on' : ''}
        onClick={() => onChange('gym')}
      >
        Gym
        <span>Day A · Day B</span>
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={value === 'nyc'}
        className={value === 'nyc' ? 'is-on' : ''}
        onClick={() => onChange('nyc')}
      >
        NYC home
        <span>KBs · TRX · mat</span>
      </button>
    </div>
  )
}
