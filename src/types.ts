// Shared data model for a CineShelf entry.
//
// This is the ONE shape every area of the app reads and writes, so we all keep
// it in sync here. It starts minimal — just the fields Vivek's "Add movie form"
// (PR 1) collects. As you build your feature, add the field(s) you need and
// leave a comment saying who owns them. For example:
//
//   favorite?: boolean          // Mubashira — favorites toggle
//   note?: string               // Jithya — notes per movie
//   collections?: string[]      // Jithya — custom collections
//   progress?: string           // Hisana — series progress, e.g. "S2 E4"
//   updatedAt?: number          // Hisana — sort by recently updated
//
// Adding a field here is a normal, small PR-sized change — and a great place to
// practise resolving merge conflicts when two of you touch this file at once.

export type Status = 'watched' | 'towatch'

export interface Movie {
  id: string
  title: string
  genre: string
  rating: number // 1–5; 0 means "not rated yet"
  status: Status
}
