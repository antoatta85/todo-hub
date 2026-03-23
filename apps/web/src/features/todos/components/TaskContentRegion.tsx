import type { FormEvent } from 'react'

import type { TodoList } from '../../lists/list-model'
import type { TodoTask } from '../task-model'

type TaskContentRegionProps = {
  selectedList: TodoList | null
  newTaskText: string
  onNewTaskTextChange: (value: string) => void
  onCreateTaskSubmit: (event: FormEvent<HTMLFormElement>) => void
  taskError: string | null
  activeTasks: TodoTask[]
}

export function TaskContentRegion({
  selectedList,
  newTaskText,
  onNewTaskTextChange,
  onCreateTaskSubmit,
  taskError,
  activeTasks,
}: TaskContentRegionProps) {
  return (
    <>
      <h2 id="task-entry-heading">Task capture</h2>

      {!selectedList ? (
        <p className="empty-state">Create and select a list to start adding tasks.</p>
      ) : (
        <>
          <form onSubmit={onCreateTaskSubmit} className="create-form" aria-label="Create task form">
            <label htmlFor="task-text-input">New task in {selectedList.name}</label>
            <div className="form-row">
              <input
                id="task-text-input"
                name="taskText"
                type="text"
                value={newTaskText}
                onChange={(event) => onNewTaskTextChange(event.target.value)}
                placeholder="e.g. Send agenda to team"
                autoComplete="off"
              />
              <button type="submit">+ New task</button>
            </div>
          </form>

          {taskError ? (
            <p role="alert" className="error-message">
              {taskError}
            </p>
          ) : null}

          <div className="tasks-section" aria-label="Active tasks section">
            <h3>Active tasks</h3>
            {activeTasks.length === 0 ? (
              <p className="empty-state">No tasks yet in this list.</p>
            ) : (
              <ul>
                {activeTasks.map((task) => (
                  <li key={task.id}>{task.text}</li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </>
  )
}
