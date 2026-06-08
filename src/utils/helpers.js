export const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 }

export const PRIORITY_STYLES = {
  high:   { label: 'High',   dot: 'bg-red-500',    badge: 'bg-red-100 text-red-600',    border: 'border-l-red-500' },
  medium: { label: 'Medium', dot: 'bg-amber-400',  badge: 'bg-amber-100 text-amber-600', border: 'border-l-amber-400' },
  low:    { label: 'Low',    dot: 'bg-emerald-500', badge: 'bg-emerald-100 text-emerald-600', border: 'border-l-emerald-500' },
}

export const CATEGORIES = ['Work', 'Personal', 'Shopping', 'Health', 'Study']

export function today() {
  return new Date().toISOString().slice(0, 10)
}

export function isOverdue(todo) {
  return !todo.done && !!todo.due && todo.due < today()
}

export function formatDate(dateStr) {
  if (!dateStr) return ''
  const [y, m, d] = dateStr.split('-')
  return `${d}/${m}/${y}`
}

export function applyFilter(todos, filter) {
  const t = today()
  switch (filter) {
    case 'pending': return todos.filter(t => !t.done)
    case 'done':    return todos.filter(t => t.done)
    case 'high':    return todos.filter(t => t.priority === 'high')
    case 'overdue': return todos.filter(t => !t.done && !!t.due && t.due < today())
    default:        return todos
  }
}

export function applySort(todos, sortBy) {
  return [...todos].sort((a, b) => {
    if (sortBy === 'priority') return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
    if (sortBy === 'alpha')    return a.title.localeCompare(b.title)
    if (sortBy === 'due') {
      if (!a.due && !b.due) return 0
      if (!a.due) return 1
      if (!b.due) return -1
      return a.due.localeCompare(b.due)
    }
    return b.createdAt - a.createdAt
  })
}
