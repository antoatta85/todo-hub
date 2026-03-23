import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'

import { AppShell } from './app/AppShell'
import { useListManager } from './features/lists/use-list-manager'
import { ListControlsRegion } from './features/lists/components/ListControlsRegion'
import { ContextActionsRegion } from './features/todos/components/ContextActionsRegion'
import { TaskContentRegion } from './features/todos/components/TaskContentRegion'
import { getVisibleTaskSections, type TaskViewMode } from './features/todos/task-view'
import { useTaskManager } from './features/todos/use-task-manager'
import './App.css'

function App() {
  const [newListName, setNewListName] = useState('')
  const [newTaskText, setNewTaskText] = useState('')
  const [selectedListId, setSelectedListId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<TaskViewMode>('single')
  const { lists, error: listError, createList } = useListManager()
  const listIds = useMemo(() => lists.map((list) => list.id), [lists])
  const { tasks, error: taskError, createTask, toggleTask } = useTaskManager(listIds)
  const canUseCombinedView = lists.length >= 2
  const effectiveViewMode: TaskViewMode = canUseCombinedView ? viewMode : 'single'

  const effectiveSelectedListId =
    selectedListId && lists.some((list) => list.id === selectedListId)
      ? selectedListId
      : lists[0]?.id ?? null

  const selectedList = useMemo(
    () => lists.find((list) => list.id === effectiveSelectedListId) ?? null,
    [effectiveSelectedListId, lists],
  )

  const listNameById = useMemo(() => {
    const map = new Map<string, string>()
    for (const list of lists) {
      map.set(list.id, list.name)
    }
    return map
  }, [lists])

  const visibleTaskSections = useMemo(() => {
    return getVisibleTaskSections({
      tasks,
      listIds,
      selectedListId: effectiveSelectedListId,
      viewMode: effectiveViewMode,
    })
  }, [effectiveSelectedListId, effectiveViewMode, listIds, tasks])

  const activeTasks = visibleTaskSections.active
  const completedTasks = visibleTaskSections.completed

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

  function handleViewModeChange(nextViewMode: TaskViewMode) {
    if (nextViewMode === 'combined' && !canUseCombinedView) {
      return
    }

    setViewMode(nextViewMode)
  }

  function getSourceListName(listId: string): string {
    return listNameById.get(listId) ?? 'Unknown list'
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
          viewMode={effectiveViewMode}
          canUseCombinedView={canUseCombinedView}
          onViewModeChange={handleViewModeChange}
        />
      }
      primaryTaskArea={
        <TaskContentRegion
          selectedList={selectedList}
          newTaskText={newTaskText}
          onNewTaskTextChange={setNewTaskText}
          onCreateTaskSubmit={handleCreateTask}
          onToggleTaskCompletion={toggleTask}
          taskError={taskError}
          activeTasks={activeTasks}
          completedTasks={completedTasks}
          viewMode={effectiveViewMode}
          getSourceListName={getSourceListName}
        />
      }
      contextualActions={
        <ContextActionsRegion
          selectedListName={selectedList?.name ?? null}
          activeTaskCount={activeTasks.length}
          viewMode={effectiveViewMode}
          listCount={lists.length}
        />
      }
    />
  )
}

export default App
