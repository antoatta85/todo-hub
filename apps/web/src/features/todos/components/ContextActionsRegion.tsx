import type { TaskViewMode } from '../task-view'

type ContextActionsRegionProps = {
  selectedListName: string | null
  activeTaskCount: number
  viewMode: TaskViewMode
  listCount: number
}

export function ContextActionsRegion({
  selectedListName,
  activeTaskCount,
  viewMode,
  listCount,
}: ContextActionsRegionProps) {
  const isCombinedView = viewMode === 'combined'

  return (
    <>
      <h2>Contextual actions</h2>
      <p className="context-copy">
        Select a list and switch between single-list and combined modes to control your task context.
      </p>

      {selectedListName ? (
        <dl className="context-summary" aria-label="Current context summary">
          <div>
            <dt>View mode</dt>
            <dd>{isCombinedView ? 'Combined view' : 'Single list view'}</dd>
          </div>
          <div>
            <dt>Selected list</dt>
            <dd>{isCombinedView ? `Merged with ${listCount} lists` : selectedListName}</dd>
          </div>
          <div>
            <dt>Active tasks</dt>
            <dd>{activeTaskCount}</dd>
          </div>
        </dl>
      ) : (
        <p className="empty-state">No list selected yet.</p>
      )}
    </>
  )
}
