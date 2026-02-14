import type { TimelineEntry } from '../content'
import './MemoryTimeline.css'

export type MemoryTimelineProps = {
  entries: TimelineEntry[]
}

export default function MemoryTimeline({ entries }: MemoryTimelineProps) {
  return (
    <section className="timeline" aria-label="Memory timeline">
      <ol className="timelineList">
        {entries.map((entry, index) => (
          <li className="timelineItem" key={`${entry.date}-${entry.title}-${index}`}>
            <article className="card">
              <header className="cardHeader">
                <time className="cardDate" dateTime={entry.date}>
                  {formatDate(entry.date)}
                </time>
                <h3 className="cardTitle">{entry.title}</h3>
              </header>

              {entry.image ? (
                <figure className="cardMedia">
                  <img
                    className="cardImage"
                    src={entry.image}
                    alt={entry.imageAlt ?? entry.title}
                    loading="lazy"
                  />
                </figure>
              ) : null}

              <p className="cardDescription">{entry.description}</p>
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}

function formatDate(isoDate: string) {
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return isoDate
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
}
