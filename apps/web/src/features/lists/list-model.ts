export type TodoList = {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

const MAX_NAME_LENGTH = 80

export function normalizeListName(rawName: string): string {
  return rawName.trim().replace(/\s+/g, ' ')
}

export function validateListName(rawName: string, existingLists: TodoList[]): string | null {
  const normalized = normalizeListName(rawName)

  if (!normalized) {
    return 'List name is required.'
  }

  if (normalized.length > MAX_NAME_LENGTH) {
    return `List name must be ${MAX_NAME_LENGTH} characters or fewer.`
  }

  const normalizedLower = normalized.toLowerCase()
  const duplicate = existingLists.some((list) => list.name.toLowerCase() === normalizedLower)
  if (duplicate) {
    return 'A list with this name already exists.'
  }

  return null
}

export function createTodoList(name: string): TodoList {
  const now = new Date().toISOString()
  const id = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`

  return {
    id,
    name,
    createdAt: now,
    updatedAt: now,
  }
}