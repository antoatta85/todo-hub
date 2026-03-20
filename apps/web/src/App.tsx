import { useState } from 'react'
import type { FormEvent } from 'react'

import { useListManager } from './features/lists/use-list-manager'
import './App.css'

function App() {
  const [newListName, setNewListName] = useState('')
  const { lists, error, createList } = useListManager()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const wasCreated = createList(newListName)
    if (wasCreated) {
      setNewListName('')
    }
  }

  return (
    <main className="app-shell">
      <section className="panel" aria-labelledby="list-management-heading">
        <h1 id="list-management-heading">List Management</h1>
        <p className="subtitle">Create a new todo list to organize your tasks by project or context.</p>

        <form onSubmit={handleSubmit} className="create-form" aria-label="Create todo list form">
          <label htmlFor="list-name-input">New list name</label>
          <div className="form-row">
            <input
              id="list-name-input"
              name="listName"
              type="text"
              value={newListName}
              onChange={(event) => setNewListName(event.target.value)}
              placeholder="e.g. Client work"
              autoComplete="off"
            />
            <button type="submit">Create list</button>
          </div>
        </form>

        {error ? (
          <p role="alert" className="error-message">
            {error}
          </p>
        ) : null}

        <nav aria-label="Todo lists" className="lists-nav">
          <h2>Todo lists</h2>
          {lists.length === 0 ? (
            <p className="empty-state">No lists yet. Create your first list above.</p>
          ) : (
            <ul>
              {lists.map((list) => (
                <li key={list.id}>{list.name}</li>
              ))}
            </ul>
          )}
        </nav>
      </section>
    </main>
  )
}

export default App
