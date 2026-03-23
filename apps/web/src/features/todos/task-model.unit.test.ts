import { describe, expect, it } from 'vitest'

import {
  createTodoTask,
  normalizeTaskText,
  toggleTaskCompletion,
  validateTaskText,
  type TodoTask,
} from './task-model'

describe('task model', () => {
  it('normalizes task text by trimming and collapsing whitespace', () => {
    expect(normalizeTaskText('  Draft   release   notes ')).toBe('Draft release notes')
  })

  it('validates required and duplicate task text within same list', () => {
    const tasks: TodoTask[] = [
      {
        id: 'task-1',
        listId: 'list-1',
        text: 'Call supplier',
        isCompleted: false,
        createdAt: '2026-03-20T00:00:00.000Z',
        updatedAt: '2026-03-20T00:00:00.000Z',
      },
    ]

    expect(validateTaskText('   ', tasks)).toBe('Task text is required.')
    expect(validateTaskText('  call   supplier ', tasks)).toBe(
      'A task with this text already exists in this list.',
    )
  })

  it('creates a task with required default fields', () => {
    const task = createTodoTask('list-1', 'Prepare invoice')

    expect(task.listId).toBe('list-1')
    expect(task.text).toBe('Prepare invoice')
    expect(task.isCompleted).toBe(false)
    expect(typeof task.id).toBe('string')
    expect(task.createdAt).toBeTruthy()
    expect(task.updatedAt).toBeTruthy()
  })

  it('toggles completion state and refreshes updated timestamp', () => {
    const task: TodoTask = {
      id: 'task-1',
      listId: 'list-1',
      text: 'Prepare invoice',
      isCompleted: false,
      createdAt: '2026-03-23T10:00:00.000Z',
      updatedAt: '2026-03-23T10:00:00.000Z',
    }

    const toggled = toggleTaskCompletion(task)

    expect(toggled.isCompleted).toBe(true)
    expect(toggled.updatedAt).not.toBe(task.updatedAt)
    expect(toggled.id).toBe(task.id)
    expect(toggled.listId).toBe(task.listId)
    expect(toggled.text).toBe(task.text)
  })
})
