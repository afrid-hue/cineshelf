import type { Movie } from './types'

interface SummaryBarProps {
  movies: Movie[]
}

function SummaryBar({ movies }: SummaryBarProps) {
  const total = movies.length
  const watched = movies.filter((m) => m.status === 'watched').length
  const favorites = movies.filter((m) => m.favorite).length

  return (
    <div className="summary-bar">
      <div className="summary-stat">
        <span className="summary-value">{total}</span>
        <span className="summary-label">Total</span>
      </div>
      <div className="summary-stat">
        <span className="summary-value">{watched}</span>
        <span className="summary-label">Watched</span>
      </div>
      <div className="summary-stat">
        <span className="summary-value">{favorites}</span>
        <span className="summary-label">Favorites</span>
      </div>
    </div>
  )
}

export default SummaryBar
