import { useEffect, useId, useRef } from 'react'

export interface HelpContent {
  name: string
  help: string
  demoUrl?: string
}

interface HelpButtonProps {
  name: string
  light?: boolean
  onOpen: () => void
}

export function HelpButton({ name, light, onOpen }: HelpButtonProps) {
  return (
    <button
      type="button"
      className={`help-btn${light ? ' is-light' : ''}`}
      aria-label={`Help for ${name}`}
      onClick={(event) => {
        event.stopPropagation()
        onOpen()
      }}
    >
      ?
    </button>
  )
}

interface HelpSheetProps {
  item: HelpContent | null
  onClose: () => void
}

export function HelpSheet({ item, onClose }: HelpSheetProps) {
  const titleId = useId()
  const doneRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!item) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    doneRef.current?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <div className="sheet-root">
      <button
        type="button"
        className="sheet-backdrop"
        aria-label="Close help"
        onClick={onClose}
      />
      <div
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <p className="eyebrow">Form note</p>
        <h2 id={titleId}>{item.name}</h2>
        <p className="sheet-help">{item.help}</p>
        <div className="sheet-actions">
          {item.demoUrl && (
            <a
              className="sheet-demo"
              href={item.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch demo
            </a>
          )}
          <button
            ref={doneRef}
            type="button"
            className="sheet-done"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
