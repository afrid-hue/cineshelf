import type { FC } from 'react'

interface Props {
  rating: number
  onRate: (rating: number) => void
  className?: string
}

const StarRating: FC<Props> = ({ rating, onRate, className }) => {
  return (
    <div className={className ? `${className} star-picker` : 'star-picker'}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={n <= rating ? 'active' : ''}
          onClick={() => onRate(n)}
          aria-label={`Rate ${n} star${n > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

export default StarRating
