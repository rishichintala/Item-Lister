import { useState, useMemo } from 'react'
import { CheckSquare } from 'lucide-react'
import { useTodos } from './hooks/useTodos'
import { applyFilter, applySort } from './utils/helpers'
import StatsBar from './components/StatsBar'
import AddTaskForm from './components/AddTaskForm'
import Toolbar from './components/Toolbar'
import TaskCard from './components/TaskCard'
import EmptyState from './components/EmptyState'

export default function App() {
  const { todos, addTodo, updateTodo, toggleDone, deleteTodo, clearCompleted } = useTodos()
  const [search, setSearch]   = useState('')
  const [filter, setFilter]   = useState('all')
  const [sortBy, setSortBy]   = useState('created')

  const visible = useMemo(() => {
    let list = applyFilter(todos, filter)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(t =>
        t.title.toLowerCase().includes(q) ||
        (t.note && t.note.toLowerCase().includes(q)) ||
        (t.category && t.category.toLowerCase().includes(q))
      )
    }
    return applySort(list, sortBy)
  }, [todos, filter, search, sortBy])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-purple-400 text-white py-10 pb-20">
        <div className="max-w-xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <CheckSquare size={32} strokeWidth={2} />
            <div>
              <h1 className="text-2xl font-bold tracking-tight leading-none">My Tasks</h1>
              <p className="text-sm text-white/75 mt-0.5">Stay organised, stay productive.</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 -mt-10 pb-20">
        <StatsBar todos={todos} />
        <AddTaskForm onAdd={addTodo} />
        <Toolbar
          search={search}   onSearch={setSearch}
          sortBy={sortBy}   onSort={setSortBy}
          filter={filter}   onFilter={setFilter}
          onClearDone={clearCompleted}
        />

        <div className="space-y-2.5">
          {visible.length === 0
            ? <EmptyState filter={filter} />
            : visible.map(t => (
                <TaskCard
                  key={t.id}
                  todo={t}
                  onToggle={toggleDone}
                  onUpdate={updateTodo}
                  onDelete={deleteTodo}
                />
              ))
          }
        </div>

        {visible.length > 0 && (
          <p className="text-center text-xs text-gray-400 mt-6">
            {visible.length} task{visible.length !== 1 ? 's' : ''} shown
          </p>
        )}
      </main>
    </div>
  )
}
