export type TodoTask = {
  id: string
  listId: string
  text: string
  isCompleted: boolean
  createdAt: string
  updatedAt: string
}

const MAX_TASK_TEXT_LENGTH = 200

export function normalizeTaskText(rawText: string): string {
  return rawText.trim().replace(/\s+/g, ' ')
}

export function validateTaskText(rawText: string, existingTasks: TodoTask[]): string | null {
  const normalized = normalizeTaskText(rawText)

  if (!normalized) {
    return 'Task text is required.'
  }

  if (normalized.length > MAX_TASK_TEXT_LENGTH) {
    return `Task text must be ${MAX_TASK_TEXT_LENGTH} characters or fewer.`
  }

  const normalizedLower = normalized.toLowerCase()
  const duplicate = existingTasks.some((task) => task.text.toLowerCase() === normalizedLower)
  if (duplicate) {
    return 'A task with this text already exists in this list.'
  }

  return null
}

export function createTodoTask(listId: string, text: string): TodoTask {
  const now = new Date().toISOString()
  const id = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`

  return {
    id,
    listId,
    text,
    isCompleted: false,
    createdAt: now,
    updatedAt: now,
  }
}
