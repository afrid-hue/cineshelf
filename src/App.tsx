import { useState } from 'react'
import type { Movie } from './types'
import AddMovieForm from './AddMovieForm'
import './App.css'

function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎬 CineShelf</h1>
        <p className="tagline">Your personal movie &amp; series shelf</p>
      </header>

      <main className="app-main">
        <button className="open-form-btn" onClick={() => setShowForm(true)}>
          + Add Movie
        </button>

        {showForm && (
          <div className="modal-overlay" onClick={() => setShowForm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <AddMovieForm
                onAdd={(movie) => setMovies((prev) => [...prev, movie])}
                onClose={() => setShowForm(false)}
              />
            </div>
          </div>
        )}

        {movies.length === 0 ? (
          <p className="empty-state">No movies yet — add one to get started!</p>
        ) : (
          <ul className="movie-list">
            {movies.map((m) => (
              <li key={m.id} className="movie-card">
                <div className="card-top">
                  <h3 className="card-title">{m.title}</h3>
                  <span className={`status-badge ${m.status}`}>{m.status === 'watched' ? 'Watched' : 'To Watch'}</span>
                </div>
                <div className="card-meta">
                  <span className="card-genre">{m.genre}</span>
                  <span className="card-stars">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <span key={n} className={n <= m.rating ? 'star filled' : 'star'}>★</span>
                    ))}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}

export default App
