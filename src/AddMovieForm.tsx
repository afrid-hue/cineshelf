import { useState } from 'react'
import type { Movie, Status } from './types'

interface Props {
  onAdd: (movie: Movie) => void
  onClose: () => void
}

const GENRES = [
  'Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror',
  'Romance', 'Thriller', 'Documentary', 'Animation', 'Fantasy'
]

export default function AddMovieForm({ onAdd, onClose }: Props) {
  const [title, setTitle] = useState('')
  const [genre, setGenre] = useState(GENRES[0])
  const [rating, setRating] = useState(0)
  const [status, setStatus] = useState<Status>('towatch')
  const [progress, setProgress] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return

    const normalizedProgress = progress.trim()

    onAdd({
      id: crypto.randomUUID(),
      title: title.trim(),
      genre,
      rating,
      status,
      progress: normalizedProgress || undefined,
    })

    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <div className="add-form-header">
        <h2>Add a Movie</h2>
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

      <label>
        Series Progress
        <input
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
          placeholder="e.g. S2 E4"
        />
      </label>

      <button type="submit">Add Movie</button>
    </form>
  )
}