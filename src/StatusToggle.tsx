import type { FC } from 'react'
import type { Status } from './types'

interface Props {
  status: Status
  onToggle: () => void
}

const StatusToggle: FC<Props> = ({ status, onToggle }) => {
  const isWatched = status === 'watched'

  return (
    <button
      type="button"
      className={`status-toggle ${isWatched ? 'is-watched' : 'is-towatch'}`}
      onClick={onToggle}
      aria-label={isWatched ? 'Mark as to watch' : 'Mark as watched'}
    >
      {isWatched ? '✓ Watched' : '○ To Watch'}
    </button>
  )
}

export default StatusToggle
