import type { ReactNode } from 'react'

import { SHELL_REGION_LABELS } from './shell-regions'

type AppShellProps = {
  listControls: ReactNode
  primaryTaskArea: ReactNode
  contextualActions: ReactNode
}

export function AppShell({ listControls, primaryTaskArea, contextualActions }: AppShellProps) {
  return (
    <main className="app-shell" aria-label="Todo workspace">
      <div className="app-shell-layout">
        <section className="shell-region controls-region" aria-label={SHELL_REGION_LABELS.listControls}>
          {listControls}
        </section>

        <section className="shell-region task-region" aria-label={SHELL_REGION_LABELS.primaryTaskArea}>
          {primaryTaskArea}
        </section>

        <section className="shell-region context-region" aria-label={SHELL_REGION_LABELS.contextualActions}>
          {contextualActions}
        </section>
      </div>
    </main>
  )
}
