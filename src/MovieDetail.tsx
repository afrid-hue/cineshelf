import { useEffect, useState } from 'react'
import type { Movie } from './types'

interface MovieDetailProps {
  movie: Movie
  onClose: () => void
  onNoteChange: (movieId: string, note: string) => void
}

export default function MovieDetail({ movie, onClose, onNoteChange }: MovieDetailProps) {
  const statusLabel = movie.status === 'watched' ? 'Watched' : 'To Watch'
  const [isEditingNote, setIsEditingNote] = useState(false)
  const [draftNote, setDraftNote] = useState(movie.note ?? '')

  useEffect(() => {
    setDraftNote(movie.note ?? '')
    setIsEditingNote(false)
  }, [movie.id, movie.note])

  const hasNote = Boolean(movie.note?.trim())

  const handleSaveNote = () => {
    onNoteChange(movie.id, draftNote)
    setIsEditingNote(false)
  }

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

      <div className="note-section">
        <div className="note-section-header">
          <p className="detail-label">Personal note</p>
          <button
            type="button"
            className="note-action-btn"
            onClick={() => {
              setDraftNote(movie.note ?? '')
              setIsEditingNote(true)
            }}
          >
            {hasNote ? 'Edit Note' : 'Add Note'}
          </button>
        </div>

        {isEditingNote ? (
          <div className="note-editor">
            <textarea
              className="note-textarea"
              value={draftNote}
              onChange={(event) => setDraftNote(event.target.value)}
              rows={4}
              placeholder="Write a personal note about this movie..."
            />
            <div className="note-actions">
              <button
                type="button"
                className="note-cancel-btn"
                onClick={() => {
                  setDraftNote(movie.note ?? '')
                  setIsEditingNote(false)
                }}
              >
                Cancel
              </button>
              <button type="button" className="note-save-btn" onClick={handleSaveNote}>
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="note-preview">
            {hasNote ? <p>{movie.note}</p> : <p className="note-empty">No notes yet.</p>}
          </div>
        )}
      </div>
    </section>
  )
}
