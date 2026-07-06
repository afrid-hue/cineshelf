# 🎬 CineShelf — Team Build

A personal **movie & series tracker** that runs entirely in the browser. No backend, no
database — all data lives in memory. This is an **intern team project**: the real goal isn't
the app, it's mastering the professional **Git & GitHub workflow** by five people building on
one codebase.

**Stack:** Vite + React 19 + TypeScript.

---

## Getting started

You need [Node.js](https://nodejs.org) 20+ installed. Then:

```bash
# 1. Clone the repo (first time only)
git clone https://github.com/afrid-hue/cineshelf.git
cd cineshelf

# 2. Install dependencies
npm install

# 3. Start the dev server (hot-reloads as you edit)
npm run dev
```

Open the URL it prints (usually http://localhost:5173). Other commands:

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the local dev server with hot reload |
| `npm run build` | Type-check + production build (run this before opening a PR) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run the linter |

---

## Project structure

```
cineshelf/
├── index.html          # Page shell
├── src/
│   ├── main.tsx         # App entry point — don't usually need to touch this
│   ├── App.tsx          # The app shell — build your area's UI in here / in components
│   ├── types.ts         # ⭐ Shared Movie type — the ONE shape we all agree on
│   ├── index.css        # Global styles + light/dark design tokens (CSS variables)
│   └── App.css          # App layout styles
├── package.json
└── tsconfig*.json        # TypeScript config
```

### The one shared thing: the movie list

Every area reads and displays the **same** list of movies. That shared list is what makes
this a *team* project — you can't finish in isolation. Its shape is defined once in
[`src/types.ts`](src/types.ts) as the `Movie` type. When your feature needs a new field
(a favorite flag, a note, a rating…), add it there — and expect the occasional merge
conflict when two of you touch that file. Resolving those cleanly is the whole point.

---

## Who owns what

Each sub-task = **one branch = one Pull Request**. Do them in order; don't start all at once.

| Person | Area | Sub-tasks (one PR each) |
| --- | --- | --- |
| **Vivek** | Movie Management | Add-movie form → Cards + empty state → Edit entry → Delete with confirm |
| **Rida** | Discovery | Live search → Filter by status/genre → Sort by rating → No-results state |
| **Mubashira** | Insights & Personalization | Favorite toggle → Summary bar → Quick status toggle → Light/dark theme |
| **Jithya** | Collections & Detail | Detail view → Notes per movie → Custom collections → Tag/emoji label |
| **Hisana** | Watch Progress & Ratings | Star-rating UI → Series progress → Continue-watching row → Sort by recently updated |

> **Wave 1:** Vivek ships *Add form* + *Cards* first — these create the list everyone else
> needs. **Wave 2:** once movies exist, the other four start their first PRs in parallel.

---

## The everyday Git loop (do this for every sub-task)

```bash
# 1. Start from the latest main
git switch main
git pull origin main

# 2. Create a branch for THIS one sub-task
git switch -c feature/add-movie-form      # name it for the sub-task

# 3. Work in small commits with clear messages
git add .
git commit -m "Add rating stars to movie card"

# 4. Push your branch
git push -u origin feature/add-movie-form

# 5. Open a Pull Request on GitHub into `main`, describe it + how to test,
#    and request Afrid as reviewer. Wait for approval before merging.

# 6. After merge, delete the branch and re-sync before your next sub-task:
git switch main
git pull origin main
```

## Team rules (the unbreakable ones)

1. **Never push to `main`.** Every change → branch → PR → reviewed by Afrid → merge.
2. **Pull `main` before every new branch.** Always start from the latest shared code.
3. **One sub-task = one branch = one PR.** Never bundle unrelated work.
4. **Commit small and often.** Message test: finish the sentence *"This commit will…"*.
5. **Write a real PR description.** What it does + how to test it.
6. **Respond to review feedback on the same branch** — don't open a new PR.
7. **Never commit junk.** `node_modules/` and `dist/` are already in `.gitignore`.

When you're stuck: try for ~20 minutes, search the exact error, then ask Afrid. Never force
a fix you don't understand.
