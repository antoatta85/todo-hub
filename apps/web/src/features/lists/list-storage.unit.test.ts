import { describe, expect, it } from 'vitest'

import { LIST_STORAGE_KEY, loadLists } from './list-storage'

describe('list storage', () => {
  it('filters malformed list payloads that miss timestamps', () => {
    window.localStorage.setItem(
      LIST_STORAGE_KEY,
      JSON.stringify([
        { id: 'l1', name: 'Inbox', createdAt: '2026-03-20T00:00:00.000Z', updatedAt: '2026-03-20T00:00:00.000Z' },
        { id: 'l2', name: 'Malformed list' },
      ]),
    )

    const loaded = loadLists()

    expect(loaded).toHaveLength(1)
    expect(loaded[0]?.id).toBe('l1')
  })
})
