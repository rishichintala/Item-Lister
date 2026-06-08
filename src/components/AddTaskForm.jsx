import { useState } from 'react'
import { Plus } from 'lucide-react'
import { CATEGORIES } from '../utils/helpers'

const EMPTY = { title: '', priority: 'medium', category: '', due: '', note: '' }

export default function AddTaskForm({ onAdd }) {
  const [form, setForm] = useState(EMPTY)
  const [open, setOpen] = useState(true)

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const title = form.title.trim()
    if (!title) return
    onAdd({ ...form, title })
    setForm(EMPTY)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-4">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-2 px-5 py-4 text-left font-semibold text-primary hover:bg-primary/5 rounded-2xl transition-colors"
      >
        <Plus size={18} />
        Add New Task
        <span className="ml-auto text-gray-300 text-sm">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <form onSubmit={handleSubmit} className="px-5 pb-5">
          <input
            type="text"
            value={form.title}
            onChange={e => set('title', e.target.value)}
            placeholder="What needs to be done?"
            required
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 mb-3"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
            <select
              value={form.priority}
              onChange={e => set('priority', e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>

            <select
              value={form.category}
              onChange={e => set('category', e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="">No Category</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <input
              type="date"
              value={form.due}
              onChange={e => set('due', e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <input
            type="text"
            value={form.note}
            onChange={e => set('note', e.target.value)}
            placeholder="Add a note (optional)"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 mb-3"
          />

          <button
            type="submit"
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors"
          >
            <Plus size={16} /> Add Task
          </button>
        </form>
      )}
    </div>
  )
}
