import { useEffect, useMemo, useState } from 'react'

import {
  createTodoTask,
  normalizeTaskText,
  toggleTaskCompletion,
  validateTaskText,
  type TodoTask,
} from './task-model'
import { loadTasks, saveTasks } from './task-storage'

type UseTaskManagerResult = {
  tasks: TodoTask[]
  error: string | null
  createTask: (listId: string | null, rawText: string) => boolean
  toggleTask: (taskId: string) => void
}

export function useTaskManager(listIds: string[]): UseTaskManagerResult {
  const [tasks, setTasks] = useState<TodoTask[]>(() => loadTasks())
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const sortedTasks = useMemo(
    () =>
      tasks
        .filter((task) => listIds.includes(task.listId))
        .sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
    [listIds, tasks],
  )

  function createTask(listId: string | null, rawText: string): boolean {
    if (!listId || !listIds.includes(listId)) {
      setError('Select a list before adding a task.')
      return false
    }

    const sameListTasks = tasks.filter((task) => task.listId === listId)
    const validationError = validateTaskText(rawText, sameListTasks)
    if (validationError) {
      setError(validationError)
      return false
    }

    const text = normalizeTaskText(rawText)
    const nextTask = createTodoTask(listId, text)
    setTasks((current) => [...current, nextTask])
    setError(null)
    return true
  }

  function toggleTask(taskId: string): void {
    setTasks((current) => current.map((task) => (task.id === taskId ? toggleTaskCompletion(task) : task)))
    setError(null)
  }

  return {
    tasks: sortedTasks,
    error,
    createTask,
    toggleTask,
  }
}
