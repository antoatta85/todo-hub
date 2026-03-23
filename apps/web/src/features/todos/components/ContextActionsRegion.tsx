type ContextActionsRegionProps = {
  selectedListName: string | null
  activeTaskCount: number
}

export function ContextActionsRegion({ selectedListName, activeTaskCount }: ContextActionsRegionProps) {
  return (
    <>
      <h2>Contextual actions</h2>
      <p className="context-copy">
        Select a list and create tasks to unlock contextual actions.
      </p>

      {selectedListName ? (
        <dl className="context-summary" aria-label="Current context summary">
          <div>
            <dt>Selected list</dt>
            <dd>{selectedListName}</dd>
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
