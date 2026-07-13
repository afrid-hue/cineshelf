import { useState, useEffect } from 'react'
import type { Movie, Status, Collection } from './types'
import AddMovieForm from './AddMovieForm'
import SummaryBar from './SummaryBar'
import MovieDetail from './MovieDetail'
import StarRating from './StarRating'
import CollectionManager from './CollectionManager'
import StatusToggle from './StatusToggle'
import ThemeToggle from './ThemeToggle'
import ContinueWatchingRow from './ContinueWatchingRow'
import './App.css'

const STATUS_KEY = 'cineshelf-statuses'

function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [collections, setCollections] = useState<Collection[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingMovieId, setEditingMovieId] = useState<string | null>(null)
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('cineshelf-theme')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('cineshelf-theme', theme)
  }, [theme])

  const [genreFilter, setGenreFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [ratingSort, setRatingSort] = useState('none')

  const genres = ['All', ...new Set(movies.map((m) => m.genre))]

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

  const selectedMovie = movies.find((movie) => movie.id === selectedMovieId) ?? null
  const editingMovie = movies.find((movie) => movie.id === editingMovieId) ?? null

  const filteredMovies = movies
    .filter((movie) => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesGenre = genreFilter === 'All' || movie.genre === genreFilter
      const matchesStatus = statusFilter === 'All' || movie.status === statusFilter

      if (!selectedCollectionId) {
        return matchesSearch && matchesGenre && matchesStatus
      }

      const collection = collections.find((item) => item.id === selectedCollectionId)
      const inCollection = collection?.movieIds.includes(movie.id) ?? false

      return matchesSearch && matchesGenre && matchesStatus && inCollection
    })
    .sort((a, b) => {
      if (ratingSort === 'high') return b.rating - a.rating
      if (ratingSort === 'low') return a.rating - b.rating
      return 0
    })


  function handleAddMovie(movie: Movie) {
    setMovies((prev) => [...prev, movie])
    setSelectedMovieId(movie.id)
  }

  function handleUpdateMovie(movie: Movie) {
    setMovies((prev) =>
      prev.map((m) => (m.id === movie.id ? movie : m))
    )
  }

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const toggleFavorite = (id: string) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, favorite: !movie.favorite } : movie
      )
    )
  }

  const toggleStatus = (id: string) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id
          ? { ...movie, status: movie.status === 'watched' ? 'towatch' : 'watched' }
          : movie
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

  const handleCreateCollection = (name: string) => {
    const trimmedName = name.trim()
    if (!trimmedName) {
      return
    }

    setCollections((prevCollections) => [
      ...prevCollections,
      {
        id: crypto.randomUUID(),
        name: trimmedName,
        movieIds: [],
      },
    ])
  }

  const handleAssignMovieToCollection = (collectionId: string, movieId: string) => {
    setCollections((prevCollections) =>
      prevCollections.map((collection) => {
        if (collection.id !== collectionId) {
          return collection
        }

        if (collection.movieIds.includes(movieId)) {
          return collection
        }

        return {
          ...collection,
          movieIds: [...collection.movieIds, movieId],
        }
      })
    )
  }

  const handleRemoveMovieFromCollection = (collectionId: string, movieId: string) => {
    setCollections((prevCollections) =>
      prevCollections.map((collection) =>
        collection.id === collectionId
          ? {
              ...collection,
              movieIds: collection.movieIds.filter((id) => id !== movieId),
            }
          : collection
      )
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-row">
          <h1>🎬 CineShelf</h1>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
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

        {editingMovie && (
          <div className="modal-overlay" onClick={() => setEditingMovieId(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <AddMovieForm
                initialMovie={editingMovie}
                onUpdate={handleUpdateMovie}
                onClose={() => setEditingMovieId(null)}
              />
            </div>
          </div>
        )}

        <SummaryBar movies={movies} />

        <ContinueWatchingRow
          movies={movies}
          onSelectMovie={setSelectedMovieId}
        />

        <CollectionManager
          movies={movies}
          collections={collections}
          selectedCollectionId={selectedCollectionId}
          onSelectCollection={setSelectedCollectionId}
          onCreateCollection={handleCreateCollection}
          onAssignMovieToCollection={handleAssignMovieToCollection}
          onRemoveMovieFromCollection={handleRemoveMovieFromCollection}
        />

        {movies.length === 0 ? (
          <p className="empty-state">
            No movies yet — add one to get started!
          </p>
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
                <label className="filter-group">
                  <span className="filter-label">Sort by Rating</span>
                  <select
                    className="filter-select"
                    value={ratingSort}
                    onChange={(e) => setRatingSort(e.target.value)}
                  >
                    <option value="none">None</option>
                    <option value="high">Top Rated</option>
                    <option value="low">Lowest Rated</option>
                  </select>
                </label>
              </div>
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
                          {movie.status === 'watched'
                            ? 'Watched'
                            : 'To Watch'}
                        </span>

                        <button
                          className={`favorite-btn ${
                            movie.favorite ? 'is-favorite' : ''
                          }`}
                          onClick={() => toggleFavorite(movie.id)}
                          aria-label={
                            movie.favorite
                              ? 'Remove from favorites'
                              : 'Add to favorites'
                          }
                        >
                          {movie.favorite ? '♥' : '♡'}
                        </button>
                        <button
                          className="edit-btn"
                          onClick={() => setEditingMovieId(movie.id)}
                          aria-label="Edit movie"
                        >
                          ✎
                        </button>
                      </div>

                      <div className="card-meta">
                        <div className="card-details">
                          <span className="card-genre">{movie.genre}</span>
                            {movie.progress && (
                          <span className="card-progress">Progress: {movie.progress}</span>
                            )}
                          <StatusToggle
                            status={movie.status}
                            onToggle={() => toggleStatus(movie.id)}
                          />
                        </div>
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
                onEdit={() => setEditingMovieId(selectedMovie.id)}
              />
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default App