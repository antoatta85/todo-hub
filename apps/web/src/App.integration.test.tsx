import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

import App from './App'
import { LIST_STORAGE_KEY } from './features/lists/list-storage'
import { TASK_STORAGE_KEY } from './features/todos/task-storage'

describe('App integration baseline', () => {
  beforeEach(() => {
    cleanup()
    window.localStorage.removeItem(LIST_STORAGE_KEY)
    window.localStorage.removeItem(TASK_STORAGE_KEY)
  })

  it('creates a list, adds tasks, and prevents duplicate task text in the selected list', () => {
    render(<App />)

    const listInput = screen.getByLabelText('New list name')
    fireEvent.change(listInput, { target: { value: 'Client work' } })
    fireEvent.click(screen.getByRole('button', { name: 'Create list' }))

    expect(screen.getByRole('button', { name: 'Client work' })).toBeTruthy()

    const taskInput = screen.getByLabelText('New task in Client work')
    fireEvent.change(taskInput, { target: { value: 'Draft proposal' } })
    fireEvent.click(screen.getByRole('button', { name: '+ New task' }))

    expect(screen.getByText('Draft proposal')).toBeTruthy()

    fireEvent.change(taskInput, { target: { value: '  draft   proposal ' } })
    fireEvent.click(screen.getByRole('button', { name: '+ New task' }))

    expect(screen.getByRole('alert')).toHaveTextContent(
      'A task with this text already exists in this list.',
    )
  })

  it('prevents duplicate list names', () => {
    render(<App />)

    const listInput = screen.getByLabelText('New list name')
    fireEvent.change(listInput, { target: { value: 'Client work' } })
    fireEvent.click(screen.getByRole('button', { name: 'Create list' }))

    fireEvent.change(listInput, { target: { value: '  client   work ' } })
    fireEvent.click(screen.getByRole('button', { name: 'Create list' }))

    expect(screen.getByRole('alert')).toHaveTextContent('A list with this name already exists.')
  })

  it('keeps feature controls mounted inside shell-owned regions', () => {
    render(<App />)

    const controlsRegion = screen.getByRole('region', { name: 'List and filter controls' })
    const taskRegion = screen.getByRole('region', { name: 'Primary task area' })
    const contextRegion = screen.getByRole('region', { name: 'Contextual actions' })

    expect(within(controlsRegion).getByLabelText('Create todo list form')).toBeTruthy()
    expect(within(controlsRegion).getByRole('navigation', { name: 'Todo lists' })).toBeTruthy()
    expect(within(taskRegion).getByText('Create and select a list to start adding tasks.')).toBeTruthy()
    expect(within(contextRegion).getByText('Select a list and create tasks to unlock contextual actions.')).toBeTruthy()
  })
})
