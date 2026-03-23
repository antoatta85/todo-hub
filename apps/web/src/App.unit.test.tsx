import { cleanup, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

import App from './App'
import { LIST_STORAGE_KEY } from './features/lists/list-storage'
import { TASK_STORAGE_KEY } from './features/todos/task-storage'

describe('App unit baseline', () => {
  beforeEach(() => {
    cleanup()
  })

  it('renders list management heading and task empty-state guidance', () => {
    window.localStorage.removeItem(LIST_STORAGE_KEY)
    window.localStorage.removeItem(TASK_STORAGE_KEY)
    render(<App />)

    expect(screen.getByRole('heading', { name: 'List Management' })).toBeTruthy()
    expect(screen.getByText('No lists yet. Create your first list above.')).toBeTruthy()
    expect(screen.getByText('Create and select a list to start adding tasks.')).toBeTruthy()
  })

  it('renders stable shell regions for controls, task content, and contextual actions', () => {
    window.localStorage.removeItem(LIST_STORAGE_KEY)
    window.localStorage.removeItem(TASK_STORAGE_KEY)
    render(<App />)

    expect(screen.getByRole('region', { name: 'List and filter controls' })).toBeTruthy()
    expect(screen.getByRole('region', { name: 'Primary task area' })).toBeTruthy()
    expect(screen.getByRole('region', { name: 'Contextual actions' })).toBeTruthy()
  })
})
