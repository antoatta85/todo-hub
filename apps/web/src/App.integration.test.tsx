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
    expect(
      within(contextRegion).getByText(
        'Select a list and switch between single-list and combined modes to control your task context.',
      ),
    ).toBeTruthy()
  })

  it('preserves task/list interaction continuity within stable shell regions', () => {
    render(<App />)

    const controlsRegion = screen.getByRole('region', { name: 'List and filter controls' })
    const taskRegion = screen.getByRole('region', { name: 'Primary task area' })
    const contextRegion = screen.getByRole('region', { name: 'Contextual actions' })

    const listInput = within(controlsRegion).getByLabelText('New list name')
    fireEvent.change(listInput, { target: { value: 'Work' } })
    fireEvent.click(within(controlsRegion).getByRole('button', { name: 'Create list' }))

    fireEvent.change(listInput, { target: { value: 'Home' } })
    fireEvent.click(within(controlsRegion).getByRole('button', { name: 'Create list' }))

    fireEvent.click(within(controlsRegion).getByRole('button', { name: 'Work' }))
    const taskInputWork = within(taskRegion).getByLabelText('New task in Work')
    fireEvent.change(taskInputWork, { target: { value: 'Prepare notes' } })
    fireEvent.click(within(taskRegion).getByRole('button', { name: '+ New task' }))

    fireEvent.click(within(controlsRegion).getByRole('button', { name: 'Home' }))
    expect(within(taskRegion).getByLabelText('New task in Home')).toBeTruthy()
    expect(within(contextRegion).getByText('Home')).toBeTruthy()

    fireEvent.click(within(controlsRegion).getByRole('button', { name: 'Work' }))
    expect(within(taskRegion).getByText('Prepare notes')).toBeTruthy()
    expect(within(contextRegion).getByText('Work')).toBeTruthy()
  })

  it('switches between single-list and combined view with source-list tagging', () => {
    render(<App />)

    const controlsRegion = screen.getByRole('region', { name: 'List and filter controls' })
    const taskRegion = screen.getByRole('region', { name: 'Primary task area' })
    const contextRegion = screen.getByRole('region', { name: 'Contextual actions' })

    const listInput = within(controlsRegion).getByLabelText('New list name')
    fireEvent.change(listInput, { target: { value: 'Work' } })
    fireEvent.click(within(controlsRegion).getByRole('button', { name: 'Create list' }))
    fireEvent.change(listInput, { target: { value: 'Home' } })
    fireEvent.click(within(controlsRegion).getByRole('button', { name: 'Create list' }))

    fireEvent.click(within(controlsRegion).getByRole('button', { name: 'Work' }))
    let taskInput = within(taskRegion).getByLabelText('New task in Work')
    fireEvent.change(taskInput, { target: { value: 'Prepare roadmap' } })
    fireEvent.click(within(taskRegion).getByRole('button', { name: '+ New task' }))

    fireEvent.click(within(controlsRegion).getByRole('button', { name: 'Home' }))
    taskInput = within(taskRegion).getByLabelText('New task in Home')
    fireEvent.change(taskInput, { target: { value: 'Buy groceries' } })
    fireEvent.click(within(taskRegion).getByRole('button', { name: '+ New task' }))

    expect(within(taskRegion).queryByText('Prepare roadmap')).toBeNull()
    expect(within(taskRegion).getByText('Buy groceries')).toBeTruthy()

    fireEvent.click(within(controlsRegion).getByRole('button', { name: 'Combined view' }))

    expect(within(taskRegion).getByText('Prepare roadmap')).toBeTruthy()
    expect(within(taskRegion).getByText('Buy groceries')).toBeTruthy()
    expect(within(taskRegion).getByLabelText('Source list: Work')).toBeTruthy()
    expect(within(taskRegion).getByLabelText('Source list: Home')).toBeTruthy()
    expect(within(contextRegion).getByText('Combined view')).toBeTruthy()
    expect(within(contextRegion).getByText('Merged with 2 lists')).toBeTruthy()

    fireEvent.click(within(controlsRegion).getByRole('button', { name: 'Single list view' }))

    expect(within(taskRegion).queryByText('Prepare roadmap')).toBeNull()
    expect(within(taskRegion).getByText('Buy groceries')).toBeTruthy()
    expect(within(taskRegion).queryByLabelText('Source list: Home')).toBeNull()
  })

  it('toggles task completion between active and completed sections and keeps it after reload', () => {
    render(<App />)

    const controlsRegion = screen.getByRole('region', { name: 'List and filter controls' })
    const taskRegion = screen.getByRole('region', { name: 'Primary task area' })

    const listInput = within(controlsRegion).getByLabelText('New list name')
    fireEvent.change(listInput, { target: { value: 'Work' } })
    fireEvent.click(within(controlsRegion).getByRole('button', { name: 'Create list' }))

    const taskInput = within(taskRegion).getByLabelText('New task in Work')
    fireEvent.change(taskInput, { target: { value: 'Prepare roadmap' } })
    fireEvent.click(within(taskRegion).getByRole('button', { name: '+ New task' }))

    const activeSection = within(taskRegion).getByRole('heading', { name: 'Active tasks' }).closest('div')
    const completedSection = within(taskRegion).getByRole('heading', { name: 'Completed tasks' }).closest('div')
    expect(activeSection).toBeTruthy()
    expect(completedSection).toBeTruthy()

    fireEvent.click(within(taskRegion).getByRole('checkbox', { name: 'Mark task "Prepare roadmap" as completed' }))

    expect(within(activeSection as HTMLElement).queryByText('Prepare roadmap')).toBeNull()
    expect(within(completedSection as HTMLElement).getByText('Prepare roadmap')).toBeTruthy()
    expect(within(completedSection as HTMLElement).getByText('Completed')).toBeTruthy()

    cleanup()
    render(<App />)

    const persistedTaskRegion = screen.getByRole('region', { name: 'Primary task area' })
    const persistedCompletedSection = within(persistedTaskRegion)
      .getByRole('heading', { name: 'Completed tasks' })
      .closest('div')
    expect(persistedCompletedSection).toBeTruthy()
    expect(within(persistedCompletedSection as HTMLElement).getByText('Prepare roadmap')).toBeTruthy()
  })
})
