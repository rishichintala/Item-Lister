import { ClipboardCheck } from 'lucide-react'

export default function EmptyState({ filter }) {
  const messages = {
    all:     { head: 'No tasks yet!', sub: 'Add your first task above to get started.' },
    pending: { head: 'All caught up!', sub: 'No pending tasks — great job!' },
    done:    { head: 'Nothing completed yet', sub: 'Complete a task to see it here.' },
    high:    { head: 'No high-priority tasks', sub: 'Add or change task priorities above.' },
    overdue: { head: 'No overdue tasks', sub: "You're on track — nothing overdue!" },
  }
  const { head, sub } = messages[filter] || messages.all

  return (
    <div className="text-center py-16 text-gray-400">
      <ClipboardCheck size={48} className="mx-auto mb-4 opacity-25" />
      <p className="font-semibold text-gray-500">{head}</p>
      <p className="text-sm mt-1">{sub}</p>
    </div>
  )
}
