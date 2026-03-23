import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'

import { AppShell } from './app/AppShell'
import { useListManager } from './features/lists/use-list-manager'
import { ListControlsRegion } from './features/lists/components/ListControlsRegion'
import { ContextActionsRegion } from './features/todos/components/ContextActionsRegion'
import { TaskContentRegion } from './features/todos/components/TaskContentRegion'
import { useTaskManager } from './features/todos/use-task-manager'
import './App.css'

function App() {
  const [newListName, setNewListName] = useState('')
  const [newTaskText, setNewTaskText] = useState('')
  const [selectedListId, setSelectedListId] = useState<string | null>(null)
  const { lists, error: listError, createList } = useListManager()
  const listIds = useMemo(() => lists.map((list) => list.id), [lists])
  const { tasks, error: taskError, createTask } = useTaskManager(listIds)

  const effectiveSelectedListId =
    selectedListId && lists.some((list) => list.id === selectedListId)
      ? selectedListId
      : lists[0]?.id ?? null

  const selectedList = useMemo(
    () => lists.find((list) => list.id === effectiveSelectedListId) ?? null,
    [effectiveSelectedListId, lists],
  )

  const activeTasks = useMemo(() => {
    if (!effectiveSelectedListId) {
      return []
    }

    return tasks.filter((task) => task.listId === effectiveSelectedListId && !task.isCompleted)
  }, [effectiveSelectedListId, tasks])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const createdList = createList(newListName)
    if (createdList) {
      setNewListName('')
      setSelectedListId(createdList.id)
    }
  }

  function handleCreateTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const wasCreated = createTask(effectiveSelectedListId, newTaskText)
    if (wasCreated) {
      setNewTaskText('')
    }
  }

  return (
    <AppShell
      listControls={
        <ListControlsRegion
          newListName={newListName}
          onNewListNameChange={setNewListName}
          onCreateListSubmit={handleSubmit}
          listError={listError}
          lists={lists}
          effectiveSelectedListId={effectiveSelectedListId}
          onSelectList={setSelectedListId}
        />
      }
      primaryTaskArea={
        <TaskContentRegion
          selectedList={selectedList}
          newTaskText={newTaskText}
          onNewTaskTextChange={setNewTaskText}
          onCreateTaskSubmit={handleCreateTask}
          taskError={taskError}
          activeTasks={activeTasks}
        />
      }
      contextualActions={
        <ContextActionsRegion
          selectedListName={selectedList?.name ?? null}
          activeTaskCount={activeTasks.length}
        />
      }
    />
  )
}

export default App
