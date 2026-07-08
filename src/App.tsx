import { useState } from 'react'
import type { Movie } from './types'
import AddMovieForm from './AddMovieForm'
import MovieDetail from './MovieDetail'
import './App.css'

function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [showForm, setShowForm] = useState(false)
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null)

  const selectedMovie =
    movies.find((movie) => movie.id === selectedMovieId) ?? null

  function handleAddMovie(movie: Movie) {
    setMovies((prev) => [...prev, movie])
    setSelectedMovieId(movie.id)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎬 CineShelf</h1>
        <p className="tagline">Your personal movie &amp; series shelf</p>
      </header>

      <main className="app-main">
        <button
          className="open-form-btn"
          onClick={() => setShowForm(true)}
        >
          + Add Movie
        </button>

        {showForm && (
          <div
            className="modal-overlay"
            onClick={() => setShowForm(false)}
          >
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <AddMovieForm
                onAdd={handleAddMovie}
                onClose={() => setShowForm(false)}
              />
            </div>
          </div>
        )}

        {movies.length > 0 && (
          <div className="movie-layout">
            <ul className="movie-list-minimal">
              {movies.map((movie) => (
                <li
                  key={movie.id}
                  className={
                    selectedMovieId === movie.id ? 'selected' : ''
                  }
                  onClick={() => setSelectedMovieId(movie.id)}
                >
                  <span>{movie.title}</span>
                  <span className="movie-meta">
                    {movie.genre}
                  </span>
                </li>
              ))}
            </ul>

            {selectedMovie && (
              <MovieDetail
                movie={selectedMovie}
                onClose={() => setSelectedMovieId(null)}
              />
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default App