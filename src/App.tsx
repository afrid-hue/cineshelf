import { useState, useEffect } from 'react'
import type { Movie, Status } from './types'
import AddMovieForm from './AddMovieForm'
import SummaryBar from './SummaryBar'
import MovieDetail from './MovieDetail'
import StarRating from './StarRating'
import StatusToggle from './StatusToggle'
import './App.css'

const STATUS_KEY = 'cineshelf-statuses'

function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [showForm, setShowForm] = useState(false)
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem(STATUS_KEY)
    if (!saved) return
    const statuses = JSON.parse(saved) as Record<string, Status>
    setMovies((prev) =>
      prev.map((m) => ({
        ...m,
        status: statuses[m.id] ?? m.status,
      }))
    )
  }, [])

  useEffect(() => {
    const statuses: Record<string, Status> = {}
    movies.forEach((m) => {
      statuses[m.id] = m.status
    })
    localStorage.setItem(STATUS_KEY, JSON.stringify(statuses))
  }, [movies])

  const selectedMovie =
    movies.find((movie) => movie.id === selectedMovieId) ?? null

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  function handleAddMovie(movie: Movie) {
    setMovies((prev) => [...prev, movie])
    setSelectedMovieId(movie.id)
  }

  const toggleStatus = (id: string) => {
    setMovies((prev) =>
      prev.map((movie) =>
        movie.id === id
          ? {
              ...movie,
              status: movie.status === 'watched' ? 'towatch' : 'watched',
            }
          : movie
      )
    )
  }

  const toggleFavorite = (id: string) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, favorite: !movie.favorite } : movie
      )
    )
  }

  const handleNoteChange = (movieId: string, note: string) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === movieId ? { ...movie, note } : movie
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
                onAdd={handleAddMovie}
                onClose={() => setShowForm(false)}
              />
            </div>
          </div>
        )}

        <SummaryBar movies={movies} />

        {movies.length === 0 ? (
          <p className="empty-state">No movies yet — add one to get started!</p>
        ) : (
          <div className="movie-layout">
            <div className="movie-list-container">
              <input
                type="text"
                placeholder="Search movies..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {filteredMovies.length > 0 ? (
                <ul className="movie-list">
                  {filteredMovies.map((movie) => (
                    <li key={movie.id} className="movie-card">
                      <div className="card-top">
                        <h3
                          className="card-title"
                          style={{ cursor: 'pointer' }}
                          onClick={() => setSelectedMovieId(movie.id)}
                        >
                          {movie.title}
                        </h3>
                        <span className={`status-badge ${movie.status}`}>
                          {movie.status === 'watched' ? 'Watched' : 'To Watch'}
                        </span>
                        <button
                          className={`favorite-btn ${movie.favorite ? 'is-favorite' : ''}`}
                          onClick={() => toggleFavorite(movie.id)}
                          aria-label={
                            movie.favorite ? 'Remove from favorites' : 'Add to favorites'
                          }
                        >
                          {movie.favorite ? '♥' : '♡'}
                        </button>
                      </div>
                      <div className="card-meta">
                        <span className="card-genre">{movie.genre}</span>
                        <StatusToggle
                          status={movie.status}
                          onToggle={() => toggleStatus(movie.id)}
                        />
                        <StarRating
                          className="card-stars"
                          rating={movie.rating}
                          onRate={(rating) =>
                            setMovies((prev) =>
                              prev.map((currentMovie) =>
                                currentMovie.id === movie.id
                                  ? { ...currentMovie, rating }
                                  : currentMovie
                              )
                            )
                          }
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-movies-message">No movies found</p>
              )}
            </div>

            {selectedMovie && (
              <MovieDetail
                movie={selectedMovie}
                onClose={() => setSelectedMovieId(null)}
                onNoteChange={handleNoteChange}
              />
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default App