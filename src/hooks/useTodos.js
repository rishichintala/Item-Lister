import { useState, useEffect } from 'react'

const STORAGE_KEY = 'react-todos-v1'

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [] }
  catch { return [] }
}

function uid() {
  return Math.random().toString(36).slice(2, 9) + Date.now().toString(36)
}

export function useTodos() {
  const [todos, setTodos] = useState(load)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function addTodo({ title, priority, category, due, note }) {
    setTodos(prev => [{
      id: uid(), title, priority, category, due, note,
      done: false, createdAt: Date.now(),
    }, ...prev])
  }

  function updateTodo(id, patch) {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, ...patch } : t))
  }

  function toggleDone(id) {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  function deleteTodo(id) {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  function clearCompleted() {
    setTodos(prev => prev.filter(t => !t.done))
  }

  return { todos, addTodo, updateTodo, toggleDone, deleteTodo, clearCompleted }
}
