import type { FormEvent } from 'react'

import type { TodoList } from '../list-model'
import type { TaskViewMode } from '../../todos/task-view'

type ListControlsRegionProps = {
  newListName: string
  onNewListNameChange: (value: string) => void
  onCreateListSubmit: (event: FormEvent<HTMLFormElement>) => void
  listError: string | null
  lists: TodoList[]
  effectiveSelectedListId: string | null
  onSelectList: (listId: string) => void
  viewMode: TaskViewMode
  canUseCombinedView: boolean
  onViewModeChange: (viewMode: TaskViewMode) => void
}

export function ListControlsRegion({
  newListName,
  onNewListNameChange,
  onCreateListSubmit,
  listError,
  lists,
  effectiveSelectedListId,
  onSelectList,
  viewMode,
  canUseCombinedView,
  onViewModeChange,
}: ListControlsRegionProps) {
  return (
    <>
      <h1 id="list-management-heading">List Management</h1>
      <p className="subtitle">Create a new todo list to organize your tasks by project or context.</p>

      <form onSubmit={onCreateListSubmit} className="create-form" aria-label="Create todo list form">
        <label htmlFor="list-name-input">New list name</label>
        <div className="form-row">
          <input
            id="list-name-input"
            name="listName"
            type="text"
            value={newListName}
            onChange={(event) => onNewListNameChange(event.target.value)}
            placeholder="e.g. Client work"
            autoComplete="off"
          />
          <button type="submit">Create list</button>
        </div>
      </form>

      {listError ? (
        <p role="alert" className="error-message">
          {listError}
        </p>
      ) : null}

      <div className="view-mode-controls" role="group" aria-label="Task view mode">
        <button
          type="button"
          className={`view-mode-button ${viewMode === 'single' ? 'selected' : ''}`}
          aria-pressed={viewMode === 'single'}
          onClick={() => onViewModeChange('single')}
        >
          Single list view
        </button>
        <button
          type="button"
          className={`view-mode-button ${viewMode === 'combined' ? 'selected' : ''}`}
          aria-pressed={viewMode === 'combined'}
          onClick={() => onViewModeChange('combined')}
          disabled={!canUseCombinedView}
        >
          Combined view
        </button>
      </div>

      {!canUseCombinedView ? (
        <p className="empty-state">Create at least two lists to enable combined view.</p>
      ) : null}

      <nav aria-label="Todo lists" className="lists-nav">
        <h2>Todo lists</h2>
        {lists.length === 0 ? (
          <p className="empty-state">No lists yet. Create your first list above.</p>
        ) : (
          <ul className="list-selector">
            {lists.map((list) => (
              <li key={list.id}>
                <button
                  type="button"
                  className={`list-chip ${effectiveSelectedListId === list.id ? 'selected' : ''}`}
                  onClick={() => onSelectList(list.id)}
                  aria-pressed={effectiveSelectedListId === list.id}
                >
                  {list.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </>
  )
}
