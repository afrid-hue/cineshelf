import { useState, useEffect } from 'react'
import type { Movie } from './types'
import AddMovieForm from './AddMovieForm'
import './App.css'

function App() {
  const [movies, setMovies] = useState<Movie[]>(() => {
    try {
      const saved = localStorage.getItem('cineshelf_movies')
      return saved ? JSON.parse(saved) : []
    } catch (error) {
      console.error('Error loading movies from localStorage:', error)
      return []
    }
  })
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem('cineshelf_movies', JSON.stringify(movies))
    } catch (error) {
      console.error('Error saving movies to localStorage:', error)
    }
  }, [movies])

  const toggleFavorite = (id: string) => {
    setMovies((prevMovies) =>
      prevMovies.map((m) =>
        m.id === id ? { ...m, favorite: !m.favorite } : m
      )
    )
  }

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
                <span>{m.title}</span>
                <button
                  className={`favorite-btn ${m.favorite ? 'is-favorite' : ''}`}
                  onClick={() => toggleFavorite(m.id)}
                  aria-label={m.favorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {m.favorite ? '♥' : '♡'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}

export default App
