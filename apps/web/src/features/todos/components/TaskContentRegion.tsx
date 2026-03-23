import type { FormEvent } from 'react'

import type { TodoList } from '../../lists/list-model'
import type { TodoTask } from '../task-model'
import type { TaskViewMode } from '../task-view'

type TaskContentRegionProps = {
  selectedList: TodoList | null
  newTaskText: string
  onNewTaskTextChange: (value: string) => void
  onCreateTaskSubmit: (event: FormEvent<HTMLFormElement>) => void
  onToggleTaskCompletion: (taskId: string) => void
  taskError: string | null
  activeTasks: TodoTask[]
  completedTasks: TodoTask[]
  viewMode: TaskViewMode
  getSourceListName: (listId: string) => string
}

export function TaskContentRegion({
  selectedList,
  newTaskText,
  onNewTaskTextChange,
  onCreateTaskSubmit,
  onToggleTaskCompletion,
  taskError,
  activeTasks,
  completedTasks,
  viewMode,
  getSourceListName,
}: TaskContentRegionProps) {
  const isCombinedView = viewMode === 'combined'

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
            <h3>{isCombinedView ? 'Active tasks (combined view)' : 'Active tasks'}</h3>
            {activeTasks.length === 0 ? (
              <p className="empty-state">
                {isCombinedView ? 'No active tasks across selected lists.' : 'No active tasks in this list.'}
              </p>
            ) : (
              <ul>
                {activeTasks.map((task) => (
                  <li key={task.id} className="task-row">
                    <label className="task-label">
                      <input
                        type="checkbox"
                        checked={task.isCompleted}
                        onChange={() => onToggleTaskCompletion(task.id)}
                        aria-label={`Mark task "${task.text}" as completed`}
                      />
                      <span>{task.text}</span>
                    </label>
                    <span className="task-meta">
                      {isCombinedView ? (
                        <span className="source-badge" aria-label={`Source list: ${getSourceListName(task.listId)}`}>
                          {getSourceListName(task.listId)}
                        </span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="tasks-section" aria-label="Completed tasks section">
            <h3>{isCombinedView ? 'Completed tasks (combined view)' : 'Completed tasks'}</h3>
            {completedTasks.length === 0 ? (
              <p className="empty-state">
                {isCombinedView
                  ? 'No completed tasks across selected lists.'
                  : 'No completed tasks in this list.'}
              </p>
            ) : (
              <ul>
                {completedTasks.map((task) => (
                  <li key={task.id} className="task-row task-row-completed">
                    <label className="task-label">
                      <input
                        type="checkbox"
                        checked={task.isCompleted}
                        onChange={() => onToggleTaskCompletion(task.id)}
                        aria-label={`Mark task "${task.text}" as active`}
                      />
                      <span>{task.text}</span>
                    </label>
                    <span className="task-meta">
                      <span className="task-complete-badge" aria-label="Task status: Completed">
                        Completed
                      </span>
                      {isCombinedView ? (
                        <span className="source-badge" aria-label={`Source list: ${getSourceListName(task.listId)}`}>
                          {getSourceListName(task.listId)}
                        </span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </>
  )
}
