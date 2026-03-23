import type { TodoTask } from './task-model'

export type TaskViewMode = 'single' | 'combined'

type GetVisibleActiveTasksInput = {
  tasks: TodoTask[]
  listIds: string[]
  selectedListId: string | null
  viewMode: TaskViewMode
}

type TaskSections = {
  active: TodoTask[]
  completed: TodoTask[]
}

function getVisibleTasks({
  tasks,
  listIds,
  selectedListId,
  viewMode,
}: GetVisibleActiveTasksInput): TodoTask[] {
  const inScope = tasks.filter((task) => listIds.includes(task.listId))

  if (viewMode === 'combined') {
    return [...inScope].sort((a, b) => a.createdAt.localeCompare(b.createdAt))
  }

  if (!selectedListId) {
    return []
  }

  return inScope.filter((task) => task.listId === selectedListId)
}

export function getVisibleTaskSections(input: GetVisibleActiveTasksInput): TaskSections {
  const visibleTasks = getVisibleTasks(input)

  return {
    active: visibleTasks.filter((task) => !task.isCompleted),
    completed: visibleTasks.filter((task) => task.isCompleted),
  }
}

export function getVisibleActiveTasks({
  tasks,
  listIds,
  selectedListId,
  viewMode,
}: GetVisibleActiveTasksInput): TodoTask[] {
  return getVisibleTaskSections({ tasks, listIds, selectedListId, viewMode }).active
}