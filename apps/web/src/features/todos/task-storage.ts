import type { TodoTask } from './task-model'

export const TASK_STORAGE_KEY = 'todo.tasks.v1'

export function loadTasks(): TodoTask[] {
  const raw = window.localStorage.getItem(TASK_STORAGE_KEY)
  if (!raw) {
    return []
  }

  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter(
      (item) =>
        typeof item?.id === 'string' &&
        typeof item?.listId === 'string' &&
        typeof item?.text === 'string' &&
        typeof item?.isCompleted === 'boolean' &&
        typeof item?.createdAt === 'string' &&
        typeof item?.updatedAt === 'string',
    )
  } catch {
    return []
  }
}

export function saveTasks(tasks: TodoTask[]): void {
  window.localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks))
}
