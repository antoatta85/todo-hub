import { useEffect, useMemo, useState } from 'react'

import { createTodoList, normalizeListName, validateListName, type TodoList } from './list-model'
import { loadLists, saveLists } from './list-storage'

export function useListManager() {
  const [lists, setLists] = useState<TodoList[]>(() => loadLists())
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    saveLists(lists)
  }, [lists])

  const sortedLists = useMemo(
    () => [...lists].sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
    [lists],
  )

  function createList(rawName: string): TodoList | null {
    const validationError = validateListName(rawName, lists)
    if (validationError) {
      setError(validationError)
      return null
    }

    const name = normalizeListName(rawName)
    const nextList = createTodoList(name)
    setLists((current) => [...current, nextList])
    setError(null)
    return nextList
  }

  return {
    lists: sortedLists,
    error,
    createList,
  }
}