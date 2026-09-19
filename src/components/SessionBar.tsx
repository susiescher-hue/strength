import { formatStamp } from '../lib/storage'

interface SessionBarProps {
  dayTitle: string
  lastCompleted: string | null
  done: number
  total: number
  onComplete: () => void
  onReset: () => void
  justCompleted: boolean
}

export function SessionBar({
  dayTitle,
  lastCompleted,
  done,
  total,
  onComplete,
  onReset,
  justCompleted,
}: SessionBarProps) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100)

  return (
    <footer className="session-bar">
      <div className="session-progress">
        <div className="bar" aria-hidden>
          <i style={{ width: `${pct}%` }} />
        </div>
        <p>
          {done}/{total} sets
          <span>Last {dayTitle}: {formatStamp(lastCompleted)}</span>
        </p>
      </div>
      <div className="session-actions">
        <button type="button" className="ghost" onClick={onReset}>
          Reset sets
        </button>
        <button type="button" className="primary" onClick={onComplete}>
          {justCompleted ? 'Saved for today' : `Mark ${dayTitle} complete`}
        </button>
      </div>
    </footer>
  )
}
