import { describe, expect, it } from 'vitest'

import { TASK_STORAGE_KEY, loadTasks } from './task-storage'

describe('task storage', () => {
  it('filters malformed task payloads that miss timestamps', () => {
    window.localStorage.setItem(
      TASK_STORAGE_KEY,
      JSON.stringify([
        {
          id: 't1',
          listId: 'l1',
          text: 'Valid task',
          isCompleted: false,
          createdAt: '2026-03-20T00:00:00.000Z',
          updatedAt: '2026-03-20T00:00:00.000Z',
        },
        {
          id: 't2',
          listId: 'l1',
          text: 'Malformed task',
          isCompleted: false,
        },
      ]),
    )

    const loaded = loadTasks()

    expect(loaded).toHaveLength(1)
    expect(loaded[0]?.id).toBe('t1')
  })
})
