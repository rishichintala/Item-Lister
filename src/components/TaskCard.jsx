import { useState } from 'react'
import { Pencil, Trash2, Check, Calendar, ChevronDown, ChevronUp } from 'lucide-react'
import { PRIORITY_STYLES, CATEGORIES, isOverdue, formatDate, today } from '../utils/helpers'

export default function TaskCard({ todo, onToggle, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ ...todo })

  const overdue = isOverdue(todo)
  const pri = PRIORITY_STYLES[todo.priority]

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleSave(e) {
    e.preventDefault()
    const title = form.title.trim()
    if (!title) return
    onUpdate(todo.id, { ...form, title })
    setEditing(false)
  }

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-4 border-l-4 ${todo.done ? 'border-l-emerald-400 opacity-70' : pri.border} transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-start gap-3">
        {/* Check button */}
        <button
          onClick={() => onToggle(todo.id)}
          className={`mt-0.5 w-6 h-6 min-w-[24px] rounded-full border-2 flex items-center justify-center transition-colors ${
            todo.done
              ? 'bg-emerald-500 border-emerald-500 text-white'
              : 'border-gray-300 hover:border-primary'
          }`}
        >
          {todo.done && <Check size={12} strokeWidth={3} />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {!editing ? (
            <>
              <p className={`text-sm font-medium leading-snug ${todo.done ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                {todo.title}
              </p>
              {todo.note && (
                <p className="text-xs text-gray-400 mt-0.5">{todo.note}</p>
              )}
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${pri.badge}`}>
                  {pri.label}
                </span>
                {todo.category && (
                  <span className="text-xs px-2 py-0.5 rounded-md bg-primary/10 text-primary font-medium">
                    {todo.category}
                  </span>
                )}
                {todo.due && (
                  <span className={`flex items-center gap-1 text-xs ${overdue ? 'text-red-500 font-semibold' : 'text-gray-400'}`}>
                    <Calendar size={11} />
                    {formatDate(todo.due)}{overdue ? ' · Overdue' : ''}
                  </span>
                )}
              </div>
            </>
          ) : (
            <form onSubmit={handleSave} className="space-y-2">
              <input
                type="text"
                value={form.title}
                onChange={e => set('title', e.target.value)}
                required
                autoFocus
                className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <div className="grid grid-cols-3 gap-2">
                <select
                  value={form.priority}
                  onChange={e => set('priority', e.target.value)}
                  className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <select
                  value={form.category}
                  onChange={e => set('category', e.target.value)}
                  className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  <option value="">No Category</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input
                  type="date"
                  value={form.due}
                  onChange={e => set('due', e.target.value)}
                  className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <input
                type="text"
                value={form.note}
                onChange={e => set('note', e.target.value)}
                placeholder="Note…"
                className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <div className="flex gap-2">
                <button type="submit" className="bg-primary text-white text-xs px-3 py-1.5 rounded-lg hover:bg-primary-dark transition-colors">
                  Save
                </button>
                <button type="button" onClick={() => { setForm({ ...todo }); setEditing(false) }}
                  className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Actions */}
        {!editing && (
          <div className="flex gap-1 ml-1">
            <button
              onClick={() => setEditing(true)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
