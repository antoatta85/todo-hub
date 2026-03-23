# Story 1.5: Switch Between Lists and Global Combined View

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a user,
I want to switch between individual lists and a global combined view,
so that I can focus on a single context or see all my tasks at once.

## Acceptance Criteria

1. Given at least two lists exist, when the user switches between a single-list view and combined view, then tasks are displayed for the selected mode with source-list tagging in combined view.

## Tasks / Subtasks

- [x] Implement list view-mode switching in list controls and app state (AC: 1)
  - [x] Add a clear mode control that supports single-list focus and combined view activation.
  - [x] Preserve existing per-list selection behavior while introducing combined mode without conflicting state ownership.
  - [x] Ensure mode changes are reflected immediately in shell regions and contextual labels.

- [x] Implement combined-view task projection and source tagging (AC: 1)
  - [x] Extend task selection logic to return tasks for the active list in single mode and all eligible tasks in combined mode.
  - [x] Render source-list tagging for each task only in combined mode.
  - [x] Keep deterministic ordering and avoid duplicate rendering when switching modes.

- [x] Preserve UX and accessibility behavior for mode switching (AC: 1)
  - [x] Keep list controls keyboard-operable with clear selected-state semantics.
  - [x] Ensure combined-mode source labels are announced and visually distinguishable beyond color alone.
  - [x] Keep shell landmark structure and focus continuity stable when toggling modes.

- [x] Add unit, integration, and E2E coverage for Story 1.5 (AC: 1)
  - [x] Unit tests for mode-selection state and task projection rules.
  - [x] Integration tests verifying single-list vs combined rendering and source-list tagging.
  - [x] E2E smoke flow that toggles between modes and confirms accurate task display context.

- [x] Validate quality gates and architecture conformance (AC: 1)
  - [x] Run `npm run test`.
  - [x] Run `npm run lint`.
  - [x] Run `npm run typecheck`.

## Dev Notes

### Technical Requirements

- Scope is Story 1.5 only: list context switching between single-list mode and global combined mode.
- Combined mode must preserve task provenance by showing source-list tagging for each rendered task.
- Keep behavior deterministic while switching modes so users can confidently move between focused and merged views.
- Do not bundle list administration operations (rename/archive/delete) into this story.

### Architecture Compliance

- Keep implementation inside `apps/web` with feature-first boundaries:
  - list mode/select controls in list feature components/state.
  - task projection and rendering logic in todos feature modules.
- Preserve separation between UI composition (`AppShell` regions), feature state, and storage adapters.
- Respect existing local-first behavior and avoid introducing backend coupling for this story scope.
- Keep naming/file conventions aligned with architecture guidance:
  - Components/types: PascalCase.
  - Non-component files: kebab-case.
  - Functions/variables: camelCase.

### UX and Accessibility Constraints

- UX specification requires list-chip based selection with merged behavior and source badges in merged mode.
- Source-list tags must be present only in combined mode to reduce visual noise in single-list mode.
- Mode controls must remain keyboard accessible and expose clear selected-state semantics.
- Preserve region semantics from app shell (`List and filter controls`, `Primary task area`, `Contextual actions`).

### File Structure Requirements

Likely touch points for this story:

```text
apps/web/src/App.tsx
apps/web/src/features/lists/components/ListControlsRegion.tsx
apps/web/src/features/lists/use-list-manager.ts (only if list-mode ownership belongs here)
apps/web/src/features/todos/components/TaskContentRegion.tsx
apps/web/src/features/todos/use-task-manager.ts
apps/web/src/**/*.test.ts(x)
e2e/tests/smoke.spec.ts
```

### Testing Requirements

From project test strategy for Story 1.5:

- Unit: test view switching logic.
- Integration: verify tasks are grouped/tagged by source list in combined view.
- E2E: simulate toggling between views and confirm correct display.

Definition of done checks for this story should include successful execution of:

- `npm run test`
- `npm run lint`
- `npm run typecheck`

### Previous Story Intelligence

Relevant implementation learnings already in this codebase:

- Story 1.1 established list creation/selection and local persistence patterns; extend these patterns rather than replacing selection flow.
- Story 7.1 and Story 7.2 established shell-owned layout/region composition; keep view-mode behavior within stable shell regions.
- Recent review hardening enforced strict persisted-data validation (required timestamps in list/task deserialization); any Story 1.5 state derivation must tolerate only valid persisted entities.
- Existing integration and e2e baselines already verify list/task continuity; extend them with combined-view assertions instead of creating disconnected test-only paths.

### Git Intelligence Summary

Recent work pattern in repository:

- Story artifacts are created with explicit AC traceability and architecture guardrails.
- Implementation follows test-backed increments (integration and e2e additions aligned with behavior changes).
- Story and sprint status synchronization is maintained at each workflow transition.

Apply the same pattern here: implement incrementally, keep tests authoritative, and avoid scope spill into adjacent list-management stories.

### Project Structure Notes

- Current app uses single selected list state in app composition; Story 1.5 should introduce a mode abstraction without destabilizing existing list/task creation UX.
- Lists and tasks are already separated into feature modules under `apps/web/src/features/lists` and `apps/web/src/features/todos`; preserve this separation.
- Keep source-tag rendering logic close to task presentation to avoid list-feature overreach.

### References

- `_bmad-output/planning-artifacts/epics.md` (Epic 1, Story 1.5 acceptance criteria)
- `_bmad-output/planning-artifacts/ux-design-specification.md` (chosen direction: multi-select chips, merged feed behavior, source-list labeling)
- `_bmad-output/planning-artifacts/test-strategy.md` (Story 1.5 unit/integration/e2e expectations)
- `_bmad-output/planning-artifacts/architecture.md` (feature-first boundaries, naming conventions, testing stack)
- `_bmad-output/implementation-artifacts/1-1-create-a-new-todo-list.md` (list-domain and persistence learnings)
- `_bmad-output/implementation-artifacts/7-1-establish-app-shell-and-information-architecture.md` (shell region contract)
- `_bmad-output/implementation-artifacts/7-2-responsive-layout-modes-mobile-stack-desktop-split.md` (responsive continuity constraints)
- `apps/web/src/App.tsx` (current single-list selection baseline)
- `apps/web/src/features/lists/components/ListControlsRegion.tsx` (current list-selector interaction surface)
- `apps/web/src/features/todos/components/TaskContentRegion.tsx` (current task rendering surface)

## Dev Agent Record

### Agent Model Used

GPT-5.3-Codex

### Debug Log References

- Story implementation executed from explicit request `/bmad-dev-story 1.5`.
- Sprint status transitioned from `ready-for-dev` to `in-progress` before code changes.
- Implemented view-mode switching in list controls and app state with guarded combined-mode availability.
- Added deterministic active-task projection helper for single-list vs combined mode and source-list tagging support.
- Extended contextual summary and task region presentation to reflect view mode and merged-list context.
- Added unit coverage for task view projection logic, integration coverage for single/combined switching, and e2e smoke assertions for source-tag behavior.
- Validation gates executed successfully after implementation:
  - `npm run test`
  - `npm run lint`
  - `npm run typecheck`
- Sprint status transitioned from `in-progress` to `review` after passing completion gates.

### Completion Notes List

- Implemented single-list and combined-view mode controls with keyboard-accessible selected-state semantics.
- Preserved existing list selection behavior while allowing merged active-task display across lists in combined mode.
- Added source-list badges in combined mode only and kept single-list mode visually focused.
- Added reusable task projection logic and unit tests for mode-aware filtering/order behavior.
- Added integration and e2e coverage that validates toggling behavior and source-list tagging across modes.
- Completed all required quality gates with passing test, lint, and typecheck runs.
- Closed review patch findings by aligning combined-view empty-state copy and adding non-color selected-state cues for mode/list controls.

### File List

- `_bmad-output/implementation-artifacts/1-5-switch-between-lists-and-global-combined-view.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `apps/web/src/App.tsx`
- `apps/web/src/App.css`
- `apps/web/src/App.integration.test.tsx`
- `apps/web/src/features/lists/components/ListControlsRegion.tsx`
- `apps/web/src/features/todos/components/ContextActionsRegion.tsx`
- `apps/web/src/features/todos/components/TaskContentRegion.tsx`
- `apps/web/src/features/todos/task-view.ts`
- `apps/web/src/features/todos/task-view.unit.test.ts`
- `e2e/tests/smoke.spec.ts`

## Change Log

- 2026-03-23: Story file created from `/bmad-create-story 1.5`; status set to `ready-for-dev`.
- 2026-03-23: Implemented single-list/combined view switching with combined source-list tagging, added unit/integration/e2e coverage, passed quality gates, and updated status to `review`.
- 2026-03-23: Applied review follow-up UI/accessibility copy-cue fixes, re-ran quality gates successfully, and promoted status to `done`.