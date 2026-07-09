export const EMOJI_OPTIONS = [
  { value: '', label: 'No emoji' },
  { value: '🎬', label: '🎬 Movie' },
  { value: '❤️', label: '❤️ Favorite' },
  { value: '😂', label: '😂 Comedy' },
  { value: '😱', label: '😱 Horror' },
  { value: '🚀', label: '🚀 Sci-Fi' },
  { value: '🔥', label: '🔥 Trending' },
  { value: '⭐', label: '⭐ Must Watch' },
  { value: '🍿', label: '🍿 Weekend' },
]

interface EmojiLabelPickerProps {
  value: string
  onChange: (value: string) => void
  id?: string
}

export default function EmojiLabelPicker({ value, onChange, id = 'emoji-label' }: EmojiLabelPickerProps) {
  return (
    <label htmlFor={id}>
      Emoji Tag
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="emoji-label-select"
      >
        {EMOJI_OPTIONS.map((option) => (
          <option key={option.value || 'none'} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
