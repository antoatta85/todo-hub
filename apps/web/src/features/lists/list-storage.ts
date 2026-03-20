import type { TodoList } from './list-model'

export const LIST_STORAGE_KEY = 'todo.lists.v1'

export function loadLists(): TodoList[] {
  const raw = window.localStorage.getItem(LIST_STORAGE_KEY)
  if (!raw) {
    return []
  }

  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter((item) => typeof item?.id === 'string' && typeof item?.name === 'string')
  } catch {
    return []
  }
}

export function saveLists(lists: TodoList[]): void {
  window.localStorage.setItem(LIST_STORAGE_KEY, JSON.stringify(lists))
}