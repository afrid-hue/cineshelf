import { useEffect, useState } from 'react'
import type { Collection, Movie } from './types'

interface CollectionManagerProps {
  movies: Movie[]
  collections: Collection[]
  selectedCollectionId: string | null
  onSelectCollection: (collectionId: string | null) => void
  onCreateCollection: (name: string) => void
  onAssignMovieToCollection: (collectionId: string, movieId: string) => void
  onRemoveMovieFromCollection: (collectionId: string, movieId: string) => void
}

function CollectionManager({
  movies,
  collections,
  selectedCollectionId,
  onSelectCollection,
  onCreateCollection,
  onAssignMovieToCollection,
  onRemoveMovieFromCollection,
}: CollectionManagerProps) {
  const [collectionName, setCollectionName] = useState('')
  const [selectedMovieId, setSelectedMovieId] = useState('')
  const [selectedAssignCollectionId, setSelectedAssignCollectionId] = useState('')

  useEffect(() => {
    if (!selectedAssignCollectionId && collections.length > 0) {
      setSelectedAssignCollectionId(collections[0].id)
    }
  }, [collections, selectedAssignCollectionId])

  const handleCreateCollection = (event: React.FormEvent) => {
    event.preventDefault()

    const trimmedName = collectionName.trim()
    if (!trimmedName) {
      return
    }

    onCreateCollection(trimmedName)
    setCollectionName('')
  }

  const handleAssignMovie = (event: React.FormEvent) => {
    event.preventDefault()

    if (!selectedMovieId || !selectedAssignCollectionId) {
      return
    }

    onAssignMovieToCollection(selectedAssignCollectionId, selectedMovieId)
    setSelectedMovieId('')
  }

  const activeCollection = collections.find((collection) => collection.id === selectedCollectionId) ?? null

  return (
    <section className="collections-panel" aria-label="Movie collections">
      <div className="collections-panel-header">
        <div>
          <h2>Collections</h2>
          <p className="collections-caption">Group movies into simple personal lists.</p>
        </div>
      </div>

      <form className="collection-form" onSubmit={handleCreateCollection}>
        <input
          type="text"
          value={collectionName}
          onChange={(event) => setCollectionName(event.target.value)}
          placeholder="New collection name"
        />
        <button type="submit">Create</button>
      </form>

      <ul className="collection-list">
        <li>
          <button
            type="button"
            className={`collection-pill ${selectedCollectionId === null ? 'active' : ''}`}
            onClick={() => onSelectCollection(null)}
          >
            All movies
          </button>
        </li>
        {collections.map((collection) => (
          <li key={collection.id}>
            <button
              type="button"
              className={`collection-pill ${selectedCollectionId === collection.id ? 'active' : ''}`}
              onClick={() => onSelectCollection(collection.id)}
            >
              {collection.name} ({collection.movieIds.length})
            </button>
          </li>
        ))}
      </ul>

      {activeCollection && (
        <div className="collection-details">
          <h3>{activeCollection.name}</h3>
          {activeCollection.movieIds.length > 0 ? (
            <ul className="collection-movie-list">
              {activeCollection.movieIds.map((movieId) => {
                const movie = movies.find((item) => item.id === movieId)

                if (!movie) {
                  return null
                }

                return (
                  <li key={movie.id} className="collection-movie-item">
                    <span>{movie.title}</span>
                    <button
                      type="button"
                      className="collection-remove-btn"
                      onClick={() => onRemoveMovieFromCollection(activeCollection.id, movie.id)}
                    >
                      Remove
                    </button>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className="collection-empty">No movies in this collection yet.</p>
          )}
        </div>
      )}

      <form className="assign-form" onSubmit={handleAssignMovie}>
        <select value={selectedMovieId} onChange={(event) => setSelectedMovieId(event.target.value)}>
          <option value="">Select a movie</option>
          {movies.map((movie) => (
            <option key={movie.id} value={movie.id}>
              {movie.title}
            </option>
          ))}
        </select>
        <select
          value={selectedAssignCollectionId}
          onChange={(event) => setSelectedAssignCollectionId(event.target.value)}
        >
          <option value="">Select a collection</option>
          {collections.map((collection) => (
            <option key={collection.id} value={collection.id}>
              {collection.name}
            </option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>
    </section>
  )
}

export default CollectionManager
