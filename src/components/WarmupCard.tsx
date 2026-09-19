import type { WarmupItem } from '../data/program'
import { HelpButton, type HelpContent } from './HelpSheet'

interface WarmupCardProps {
  items: WarmupItem[]
  open: boolean
  done: Record<string, boolean>
  onHelp: (item: HelpContent) => void
  onToggleOpen: () => void
  onToggleItem: (id: string) => void
}

export function WarmupCard({
  items,
  open,
  done,
  onHelp,
  onToggleOpen,
  onToggleItem,
}: WarmupCardProps) {
  const finished = items.filter((item) => done[item.id]).length

  return (
    <section className="card warmup">
      <button
        type="button"
        className="warmup-head"
        onClick={onToggleOpen}
        aria-expanded={open}
      >
        <div>
          <p className="eyebrow">Warm-up</p>
          <h2>Arrive, then work</h2>
        </div>
        <div className="warmup-meta">
          <span>
            {finished}/{items.length}
          </span>
          <span className={`chev ${open ? 'is-open' : ''}`} aria-hidden>
            ▾
          </span>
        </div>
      </button>
      {open && (
        <ul className="warmup-list">
          {items.map((item) => (
            <li key={item.id} className="warmup-item">
              <button
                type="button"
                className={`check-row ${done[item.id] ? 'is-done' : ''}`}
                onClick={() => onToggleItem(item.id)}
              >
                <span className="box" aria-hidden>
                  {done[item.id] ? '✓' : ''}
                </span>
                <span>
                  <strong>{item.name}</strong>
                  <em>{item.detail}</em>
                </span>
              </button>
              <HelpButton
                name={item.name}
                light
                onOpen={() =>
                  onHelp({
                    name: item.name,
                    help: item.help,
                    demoUrl: item.demoUrl,
                  })
                }
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
