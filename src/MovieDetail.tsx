import type { Movie } from './types'

interface MovieDetailProps {
  movie: Movie
  onClose: () => void
}

export default function MovieDetail({ movie, onClose }: MovieDetailProps) {
  const statusLabel = movie.status === 'watched' ? 'Watched' : 'To Watch'

  return (
    <section className="detail-panel" aria-label="Movie details">
      <div className="detail-header">
        <div>
          <p className="detail-eyebrow">Selected movie</p>
          <h2>{movie.title}</h2>
        </div>
        <button type="button" className="detail-close" onClick={onClose} aria-label="Close details">
          ✕
        </button>
      </div>

      <div className="detail-grid">
        <div>
          <p className="detail-label">Genre</p>
          <p className="detail-value">{movie.genre}</p>
        </div>

        <div>
          <p className="detail-label">Rating</p>
          <div className="detail-value rating-row" aria-label={`${movie.rating} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className={star <= movie.rating ? 'star filled' : 'star'}>
                ★
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="detail-label">Watch Status</p>
          <p className="detail-value">
            <span className="status-pill">{statusLabel}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
