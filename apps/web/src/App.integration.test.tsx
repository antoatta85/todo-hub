import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import App from './App'
import { LIST_STORAGE_KEY } from './features/lists/list-storage'

describe('App integration baseline', () => {
  it('creates a list and prevents duplicates', () => {
    window.localStorage.removeItem(LIST_STORAGE_KEY)
    render(<App />)

    const input = screen.getByLabelText('New list name')
    fireEvent.change(input, { target: { value: 'Client work' } })
    fireEvent.click(screen.getByRole('button', { name: 'Create list' }))

    expect(screen.getByText('Client work')).toBeTruthy()

    fireEvent.change(input, { target: { value: '  client   work ' } })
    fireEvent.click(screen.getByRole('button', { name: 'Create list' }))

    expect(screen.getByRole('alert')).toHaveTextContent('A list with this name already exists.')
  })
})
