# My Tasks — Sophisticated Todo App

A fully-featured, modern todo application built with **React + Vite + Tailwind CSS**.

## Features

- **Add tasks** with title, priority, category, due date, and optional notes
- **Mark complete** — toggle tasks done/undone with a progress bar tracking completion
- **Inline edit** — edit any field directly on the card without leaving the page
- **Priorities** — High / Medium / Low with colour-coded left borders and badges
- **Categories** — Work, Personal, Shopping, Health, Study
- **Due dates** — overdue tasks highlighted in red automatically
- **Persistent storage** — all tasks saved to `localStorage`, survive page refresh
- **Real-time search** — filters by title, note, or category as you type
- **Sort** — by date added, due date, priority, or A–Z
- **Filter tabs** — All / Pending / Done / High priority / Overdue
- **Stats dashboard** — live counts for Total, Done, Pending, Overdue
- **Clear completed** — bulk-remove all done tasks in one click

## Tech Stack

| Layer     | Technology                |
|-----------|---------------------------|
| Framework | React 18                  |
| Build tool| Vite                      |
| Styling   | Tailwind CSS v3           |
| Icons     | lucide-react              |
| Storage   | Browser localStorage      |

## Project Structure

```
src/
├── App.jsx                  # Root component — state wiring
├── hooks/
│   └── useTodos.js          # Todo CRUD logic + localStorage sync
├── utils/
│   └── helpers.js           # Filtering, sorting, date utilities
└── components/
    ├── StatsBar.jsx          # Live stats + progress bar
    ├── AddTaskForm.jsx       # Collapsible add-task form
    ├── Toolbar.jsx           # Search, sort, filter chips
    ├── TaskCard.jsx          # Task card with inline edit
    └── EmptyState.jsx        # Contextual empty-state messages
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for Production

```bash
npm run build
npm run preview
```
