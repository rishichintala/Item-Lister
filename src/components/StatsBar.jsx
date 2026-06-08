import { isOverdue } from '../utils/helpers'

export default function StatsBar({ todos }) {
  const total   = todos.length
  const done    = todos.filter(t => t.done).length
  const pending = total - done
  const overdue = todos.filter(isOverdue).length
  const pct     = total ? Math.round((done / total) * 100) : 0

  const stats = [
    { label: 'Total',   value: total,   color: 'text-primary' },
    { label: 'Done',    value: done,    color: 'text-emerald-500' },
    { label: 'Pending', value: pending, color: 'text-amber-500' },
    { label: 'Overdue', value: overdue, color: 'text-red-500' },
  ]

  return (
    <div className="-mt-10 mb-6">
      <div className="grid grid-cols-4 gap-3">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-2xl shadow-md p-4 text-center">
            <div className={`text-3xl font-bold leading-none ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wide mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 px-1">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Progress</span>
          <span>{pct}%</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  )
}
