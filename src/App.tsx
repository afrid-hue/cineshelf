import { useState } from 'react'
import AddMovieForm from './AddMovieForm'
import './App.css'

function App() {
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
                onAdd={() => {}}
                onClose={() => setShowForm(false)}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
