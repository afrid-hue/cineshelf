import { useState } from 'react'
import type { Movie, Status } from './types'

interface Props {
  onAdd?: (movie: Movie) => void
  onUpdate?: (movie: Movie) => void
  initialMovie?: Movie
  onClose: () => void
}

const GENRES = [
  'Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror',
  'Romance', 'Thriller', 'Documentary', 'Animation', 'Fantasy'
]

export default function AddMovieForm({ onAdd, onUpdate, initialMovie, onClose }: Props) {
  const isEdit = !!initialMovie
  const [title, setTitle] = useState(initialMovie?.title ?? '')
  const [genre, setGenre] = useState(initialMovie?.genre ?? GENRES[0])
  const [rating, setRating] = useState(initialMovie?.rating ?? 0)
  const [status, setStatus] = useState<Status>(initialMovie?.status ?? 'towatch')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return

    if (isEdit && onUpdate && initialMovie) {
      onUpdate({
        ...initialMovie,
        title: title.trim(),
        genre,
        rating,
        status,
      })
    } else if (onAdd) {
      onAdd({
        id: crypto.randomUUID(),
        title: title.trim(),
        genre,
        rating,
        status,
      })
    }

    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <div className="add-form-header">
        <h2>{isEdit ? 'Edit Movie' : 'Add a Movie'}</h2>
        <button type="button" className="close-btn" onClick={onClose} aria-label="Close">✕</button>
      </div>

      <label>
        Title
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label>
        Genre
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          {GENRES.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </label>

      <label>
        Rating
        <div className="star-picker">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              type="button"
              key={n}
              className={n <= rating ? 'active' : ''}
              onClick={() => setRating(n)}
              aria-label={`Rate ${n} star${n > 1 ? 's' : ''}`}
            >
              ★
            </button>
          ))}
        </div>
      </label>

      <label>
        Status
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Status)}
        >
          <option value="towatch">To Watch</option>
          <option value="watched">Watched</option>
        </select>
      </label>

      <button type="submit">{isEdit ? 'Save Changes' : 'Add Movie'}</button>
    </form>
  )
}