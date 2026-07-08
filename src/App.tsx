import { useState } from 'react'
import type { Movie } from './types'
import AddMovieForm from './AddMovieForm'
import StarRating from './StarRating'
import './App.css'

function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [showForm, setShowForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [genreFilter, setGenreFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  const genres = ['All', ...new Set(movies.map((m) => m.genre))]

  const filteredMovies = movies.filter((m) => {
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGenre = genreFilter === 'All' || m.genre === genreFilter
    const matchesStatus = statusFilter === 'All' || m.status === statusFilter
    return matchesSearch && matchesGenre && matchesStatus
  })

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
        {movies.length === 0 ? (
          <p className="empty-state">No movies yet — add one to get started!</p>
        ) : (
          <div className="movie-list-container">
            <input
              type="text"
              placeholder="Search movies..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="filters-row">
              <label className="filter-group">
                <span className="filter-label">Genre</span>
                <select
                  className="filter-select"
                  value={genreFilter}
                  onChange={(e) => setGenreFilter(e.target.value)}
                >
                  {genres.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </label>
              <label className="filter-group">
                <span className="filter-label">Status</span>
                <select
                  className="filter-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="watched">Watched</option>
                  <option value="towatch">To Watch</option>
                </select>
              </label>
            </div>
            {filteredMovies.length > 0 ? (
              <ul className="movie-list">
                {filteredMovies.map((m) => (
                  <li key={m.id} className="movie-card">
                    <div className="card-top">
                      <h3 className="card-title">{m.title}</h3>
                      <span className={`status-badge ${m.status}`}>
                        {m.status === 'watched' ? 'Watched' : 'To Watch'}
                      </span>
                      <button
                        className={`favorite-btn ${m.favorite ? 'is-favorite' : ''}`}
                        onClick={() => toggleFavorite(m.id)}
                        aria-label={m.favorite ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        {m.favorite ? '♥' : '♡'}
                      </button>
                    </div>
                    <div className="card-meta">
                      <span className="card-genre">{m.genre}</span>
                      <StarRating
                        className="card-stars"
                        rating={m.rating}
                        onRate={(r) =>
                          setMovies((prev) =>
                            prev.map((movie) =>
                              movie.id === m.id
                                ? { ...movie, rating: r }
                                : movie
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
        )}
      </main>
    </div>
  )
}

export default App