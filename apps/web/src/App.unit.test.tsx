import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import App from './App'
import { LIST_STORAGE_KEY } from './features/lists/list-storage'

describe('App unit baseline', () => {
  it('renders list management heading and empty state', () => {
    window.localStorage.removeItem(LIST_STORAGE_KEY)
    render(<App />)

    expect(screen.getByRole('heading', { name: 'List Management' })).toBeTruthy()
    expect(screen.getByText('No lists yet. Create your first list above.')).toBeTruthy()
  })
})
