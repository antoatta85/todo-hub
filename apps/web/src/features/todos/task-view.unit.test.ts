import { describe, expect, it } from 'vitest'

import type { TodoTask } from './task-model'
import { getVisibleActiveTasks, getVisibleTaskSections } from './task-view'

function makeTask(overrides: Partial<TodoTask>): TodoTask {
  return {
    id: overrides.id ?? 'task-id',
    listId: overrides.listId ?? 'list-a',
    text: overrides.text ?? 'Task',
    isCompleted: overrides.isCompleted ?? false,
    createdAt: overrides.createdAt ?? '2026-03-23T10:00:00.000Z',
    updatedAt: overrides.updatedAt ?? '2026-03-23T10:00:00.000Z',
  }
}

describe('getVisibleActiveTasks', () => {
  it('returns only active tasks from selected list in single mode', () => {
    const tasks: TodoTask[] = [
      makeTask({ id: 'a-1', listId: 'list-a', text: 'A-1' }),
      makeTask({ id: 'a-2', listId: 'list-a', text: 'A-2', isCompleted: true }),
      makeTask({ id: 'b-1', listId: 'list-b', text: 'B-1' }),
    ]

    const visible = getVisibleActiveTasks({
      tasks,
      listIds: ['list-a', 'list-b'],
      selectedListId: 'list-a',
      viewMode: 'single',
    })

    expect(visible.map((task) => task.id)).toEqual(['a-1'])
  })

  it('returns active tasks from all lists in chronological order in combined mode', () => {
    const tasks: TodoTask[] = [
      makeTask({ id: 'b-1', listId: 'list-b', text: 'B-1', createdAt: '2026-03-23T10:02:00.000Z' }),
      makeTask({ id: 'a-1', listId: 'list-a', text: 'A-1', createdAt: '2026-03-23T10:01:00.000Z' }),
      makeTask({ id: 'b-2', listId: 'list-b', text: 'B-2', isCompleted: true }),
    ]

    const visible = getVisibleActiveTasks({
      tasks,
      listIds: ['list-a', 'list-b'],
      selectedListId: 'list-a',
      viewMode: 'combined',
    })

    expect(visible.map((task) => task.id)).toEqual(['a-1', 'b-1'])
  })

  it('excludes tasks from list ids that are not currently available', () => {
    const tasks: TodoTask[] = [
      makeTask({ id: 'a-1', listId: 'list-a' }),
      makeTask({ id: 'c-1', listId: 'list-c' }),
    ]

    const visible = getVisibleActiveTasks({
      tasks,
      listIds: ['list-a'],
      selectedListId: 'list-a',
      viewMode: 'combined',
    })

    expect(visible.map((task) => task.id)).toEqual(['a-1'])
  })
})

describe('getVisibleTaskSections', () => {
  it('partitions tasks into active and completed sections in combined mode', () => {
    const tasks: TodoTask[] = [
      makeTask({ id: 'a-1', listId: 'list-a', createdAt: '2026-03-23T10:01:00.000Z' }),
      makeTask({ id: 'a-2', listId: 'list-a', isCompleted: true, createdAt: '2026-03-23T10:02:00.000Z' }),
      makeTask({ id: 'b-1', listId: 'list-b', createdAt: '2026-03-23T10:03:00.000Z' }),
      makeTask({ id: 'b-2', listId: 'list-b', isCompleted: true, createdAt: '2026-03-23T10:04:00.000Z' }),
    ]

    const sections = getVisibleTaskSections({
      tasks,
      listIds: ['list-a', 'list-b'],
      selectedListId: 'list-a',
      viewMode: 'combined',
    })

    expect(sections.active.map((task) => task.id)).toEqual(['a-1', 'b-1'])
    expect(sections.completed.map((task) => task.id)).toEqual(['a-2', 'b-2'])
  })

  it('returns only selected list tasks in single mode', () => {
    const tasks: TodoTask[] = [
      makeTask({ id: 'a-1', listId: 'list-a' }),
      makeTask({ id: 'a-2', listId: 'list-a', isCompleted: true }),
      makeTask({ id: 'b-1', listId: 'list-b' }),
      makeTask({ id: 'b-2', listId: 'list-b', isCompleted: true }),
    ]

    const sections = getVisibleTaskSections({
      tasks,
      listIds: ['list-a', 'list-b'],
      selectedListId: 'list-a',
      viewMode: 'single',
    })

    expect(sections.active.map((task) => task.id)).toEqual(['a-1'])
    expect(sections.completed.map((task) => task.id)).toEqual(['a-2'])
  })
})