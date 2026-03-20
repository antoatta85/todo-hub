import { describe, expect, it } from 'vitest'

import { createTodoList, normalizeListName, validateListName, type TodoList } from './list-model'

describe('list-model', () => {
  it('normalizes list names by trimming and collapsing whitespace', () => {
    expect(normalizeListName('   Client    Work   ')).toBe('Client Work')
  })

  it('rejects empty list names', () => {
    const error = validateListName('   ', [])
    expect(error).toBe('List name is required.')
  })

  it('rejects duplicate list names (case-insensitive)', () => {
    const existing: TodoList[] = [
      {
        id: 'a',
        name: 'Client Work',
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      },
    ]

    const error = validateListName('client work', existing)
    expect(error).toBe('A list with this name already exists.')
  })

  it('creates lists with id and timestamps', () => {
    const list = createTodoList('Personal')

    expect(list.id.length).toBeGreaterThan(0)
    expect(list.name).toBe('Personal')
    expect(list.createdAt.length).toBeGreaterThan(0)
    expect(list.updatedAt).toBe(list.createdAt)
  })
})