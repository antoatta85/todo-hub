import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import App from './App'

describe('App integration baseline', () => {
  it('increments the counter when clicked', () => {
    render(<App />)

    const button = screen.getByRole('button', { name: /count is/i })
    fireEvent.click(button)

    expect(screen.getByRole('button', { name: 'Count is 1' })).toBeTruthy()
  })
})
