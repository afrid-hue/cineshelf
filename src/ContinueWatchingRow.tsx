import type { Movie } from './types'

interface ContinueWatchingRowProps {
  movies: Movie[]
  onSelectMovie: (movieId: string) => void
}

interface ProgressInfo {
  percent: number | null
  text: string
}

function getProgressInfo(movie: Movie): ProgressInfo {
  const value = movie.progress?.trim()

  if (!value) {
    return { percent: null, text: 'In progress' }
  }

  const normalizedValue = value.toLowerCase()

  if (
    normalizedValue.includes('completed') ||
    normalizedValue.includes('finished') ||
    normalizedValue.includes('done') ||
    normalizedValue === '100%' ||
    normalizedValue === '100% watched'
  ) {
    return { percent: null, text: 'Completed' }
  }

  const percentMatch = value.match(/(\d{1,3})\s*%/)

  if (percentMatch) {
    const percent = Number(percentMatch[1])
    if (percent >= 1 && percent <= 99) {
      return { percent, text: `${percent}% watched` }
    }
  }

  return { percent: 72, text: value }
}

function isInProgress(movie: Movie) {
  const value = movie.progress?.trim()

  if (!value) {
    return false
  }

  const normalizedValue = value.toLowerCase()

  if (
    normalizedValue.includes('completed') ||
    normalizedValue.includes('finished') ||
    normalizedValue.includes('done') ||
    normalizedValue === '100%' ||
    normalizedValue === '100% watched'
  ) {
    return false
  }

  const percentMatch = value.match(/(\d{1,3})\s*%/)

  if (percentMatch) {
    const percent = Number(percentMatch[1])
    return percent >= 1 && percent <= 99
  }

  return true
}

export default function ContinueWatchingRow({ movies, onSelectMovie }: ContinueWatchingRowProps) {
  const continueWatchingMovies = movies.filter(isInProgress)

  if (continueWatchingMovies.length === 0) {
    return null
  }

  return (
    <section className="continue-watching-section" aria-label="Continue watching">
      <div className="continue-watching-header">
        <h2>Continue Watching</h2>
      </div>

      <div className="continue-watching-row">
        {continueWatchingMovies.map((movie) => {
          const progressInfo = getProgressInfo(movie)
          const progressPercent = progressInfo.percent ?? 72

          return (
            <button
              key={movie.id}
              type="button"
              className="continue-watching-card"
              onClick={() => onSelectMovie(movie.id)}
            >
              <div className="continue-watching-poster">
                {movie.posterUrl ? (
                  <img src={movie.posterUrl} alt={movie.title} loading="lazy" />
                ) : (
                  <span className="continue-watching-poster-fallback">{movie.title}</span>
                )}
              </div>

              <div className="continue-watching-content">
                <h3>{movie.title}</h3>
                <div className="continue-watching-progress-track" aria-hidden="true">
                  <div
                    className="continue-watching-progress-fill"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="continue-watching-meta">
                  <span>{progressInfo.text}</span>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
