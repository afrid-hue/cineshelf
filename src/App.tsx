import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🎬 CineShelf</h1>
        <p className="tagline">Your personal movie &amp; series shelf</p>
      </header>

      <main className="app-main">
        {/*
          👋 This is the starter shell — intentionally almost empty.
          Build YOUR area's UI here. See README.md for who owns what.

          The whole app shares ONE movie list. Vivek introduces it in Wave 1
          (his PR 1, "Add movie form"), using the shared shape in src/types.ts:

              import { useState } from 'react'
              import type { Movie } from './types'

              const [movies, setMovies] = useState<Movie[]>([])

          Every other area then reads from and writes to that same `movies`
          list. Keep it frontend-only — no backend, no database. Data lives
          in memory (it resets on refresh) and that's fine for this project.
        */}
        <p className="placeholder">
          Nothing here yet — this is where CineShelf gets built. 🛠️
        </p>
      </main>
    </div>
  )
}

export default App
