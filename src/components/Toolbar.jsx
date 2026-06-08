import { Search, Trash2 } from 'lucide-react'

const FILTERS = [
  { key: 'all',     label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'done',    label: 'Done' },
  { key: 'high',    label: 'High' },
  { key: 'overdue', label: 'Overdue' },
]

const SORTS = [
  { value: 'created',  label: 'Date Added' },
  { value: 'due',      label: 'Due Date' },
  { value: 'priority', label: 'Priority' },
  { value: 'alpha',    label: 'A – Z' },
]

export default function Toolbar({ search, onSearch, sortBy, onSort, filter, onFilter, onClearDone }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-4 mb-4">
      <div className="flex flex-col sm:flex-row gap-2 mb-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => onSearch(e.target.value)}
            placeholder="Search tasks…"
            className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        <select
          value={sortBy}
          onChange={e => onSort(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>

        <button
          onClick={onClearDone}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-500 transition-colors px-2"
        >
          <Trash2 size={14} /> Clear done
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => onFilter(f.key)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
              filter === f.key
                ? 'bg-primary text-white border-primary'
                : 'border-gray-200 text-gray-500 hover:border-primary hover:text-primary'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  )
}
