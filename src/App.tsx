import { useState } from 'react'
import type { Movie } from './types'
import AddMovieForm from './AddMovieForm'
import StarRating from './StarRating'
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

        {movies.length > 0 && (
          <ul className="movie-list-minimal">
            {movies.map((m) => (
              <li key={m.id}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>{m.title}</span>
                  <StarRating
                    rating={m.rating}
                    onRate={(r) =>
                      setMovies((prev) => prev.map((movie) => (movie.id === m.id ? { ...movie, rating: r } : movie)))
                    }
                  />
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
