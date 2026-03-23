# Story 2.4: Toggle Task Completion

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a user,
I want to mark a task as completed or incomplete,
so that I can track which tasks are done and which are still pending.

## Acceptance Criteria

1. Given a task exists in active or completed state, when the user toggles completion (checkbox or keyboard), then the task state changes and it moves to the appropriate section.

## Tasks / Subtasks

- [x] Implement completion-toggle interaction on task rows (AC: 1)
  - [x] Add a dedicated status control in each task row that toggles only active/completed state.
  - [x] Support pointer/touch activation and keyboard activation on the same control.
  - [x] Keep toggle behavior separate from contextual action menu triggers.

- [x] Implement state transition and persistence for completion toggles (AC: 1)
  - [x] Add feature-layer toggle operation that updates `isCompleted` and `updatedAt` deterministically.
  - [x] Persist toggled state through existing local-first task storage adapters.
  - [x] Ensure toggled items rehydrate correctly after reload without losing list ownership.

- [x] Implement section movement and visual feedback on toggle (AC: 1)
  - [x] Move active -> completed tasks into completed section, and completed -> active back to active section.
  - [x] Apply completion visual treatment (checked state + reduced-salience completed style) with non-color cues.
  - [x] Preserve deterministic ordering semantics within active/completed sections after each toggle.

- [x] Preserve accessibility and interaction parity for completion control (AC: 1)
  - [x] Ensure control announces Active/Completed state to assistive tech.
  - [x] Maintain keyboard parity (including space/enter activation where applicable).
  - [x] Keep focus visibility and focus continuity stable across state transitions.

- [x] Add Story 2.4 test coverage (AC: 1)
  - [x] Unit tests for toggle logic and state transitions.
  - [x] Integration tests verifying movement between active and completed sections.
  - [x] E2E scenario for toggling completion and confirming immediate UI/persistence updates.

- [x] Validate quality gates and architecture conformance (AC: 1)
  - [x] Run `npm run test`.
  - [x] Run `npm run lint`.
  - [x] Run `npm run typecheck`.

## Dev Notes

### Technical Requirements

- Story scope is completion toggle only; do not implement hide/show-completed controls (Epic 4) in this story.
- Completion toggle is binary and direct (Active <-> Completed only).
- Completion changes must update task status and immediately move items to the correct section.
- Maintain predictable behavior across single-list and combined-list contexts already introduced in Story 1.5.

### Architecture Compliance

- Keep implementation under `apps/web` feature-first modules.
- Place task-domain logic under `features/todos` and keep list-domain concerns under `features/lists`.
- Preserve separation between UI controls, domain/state logic, and storage adapters.
- Follow established naming/structure conventions:
  - Components/types: PascalCase.
  - Non-component files: kebab-case.
  - Functions/variables: camelCase.

### Library and Framework Requirements

- Frontend stack: Vite + React + TypeScript.
- Test stack: Vitest + React Testing Library + Playwright.
- Keep dependencies unchanged unless absolutely required and explicitly approved.

### UX and Accessibility Constraints

- UX spec defines status circle as completion-only control; do not overload it with important-task actions.
- Completion feedback should include checked-state iconography and reduced-salience completed styling.
- Semantic state cues must not be color-only.
- Preserve touch targets at minimum 44x44 for status controls.
- Preserve keyboard/screen-reader parity for completion toggles.

### File Structure Requirements

Likely touch points for this story:

```text
apps/web/src/features/todos/*
apps/web/src/features/todos/components/*
apps/web/src/App.tsx
apps/web/src/App.css
apps/web/src/**/*.test.ts(x)
e2e/tests/smoke.spec.ts
```

### Testing Requirements

From project test strategy for Story 2.4:

- Unit: test toggle logic for completed/incomplete state.
- Integration: verify tasks move to the correct section on toggle.
- E2E: simulate toggling completion and confirm UI updates.

Definition of done checks for this story should include successful execution of:

- `npm run test`
- `npm run lint`
- `npm run typecheck`

### Previous Story Intelligence

Relevant learnings from completed stories:

- Story 2.1 already established task model/storage and selected-list task creation; extend existing task-domain primitives instead of creating parallel toggle state.
- Story 1.5 introduced combined/single view mode behavior and source-tag rendering; toggle transitions must remain correct in both modes.
- Recent review hardening enforces strict local-storage deserialization requirements (required timestamps); completion updates must preserve required metadata and storage integrity.
- Shell composition from Epic 7 is stable; keep completion logic in feature modules, not in shell layout.

### Git Intelligence Summary

Recent commits indicate stable delivery pattern: create focused story artifacts, implement in test-backed increments, and keep status synchronization tight.

For Story 2.4, follow the same approach: implement minimal state transition behavior first, lock it with tests, then refine UI/accessibility details.

### Project Structure Notes

- Epic 2 owns task-core behavior (create/edit/delete/toggle + ordering).
- Story 2.4 should establish robust completion state transitions that Story 2.5 can rely on for completed-at-bottom rendering.
- Keep all behavior changes bounded to task feature modules and related tests.

### References

- `_bmad-output/planning-artifacts/epics.md` (Epic 2, Story 2.4)
- `_bmad-output/planning-artifacts/test-strategy.md` (Story 2.4 expectations)
- `_bmad-output/planning-artifacts/ux-design-specification.md` (completion toggle behavior, non-color cues, accessibility baseline)
- `_bmad-output/planning-artifacts/architecture.md` (feature-first boundaries, deterministic ordering, test stack)
- `_bmad-output/implementation-artifacts/2-1-add-a-new-task-to-a-selected-todo-list.md` (task-domain and persistence patterns)
- `_bmad-output/implementation-artifacts/1-5-switch-between-lists-and-global-combined-view.md` (combined/single mode interaction baseline)

## Dev Agent Record

### Agent Model Used

GPT-5.3-Codex

### Debug Log References

- Story context created from explicit request `/bmad-create-story 2.4, 2.5`.
- Inputs analyzed from epics, test strategy, UX specification, architecture, project context, and prior Epic 2 implementation artifacts.
- Sprint status transition prepared for Story 2.4 (`backlog` -> `ready-for-dev`).
- Implemented completion toggle in domain/state/view/component layers and wired section movement between active/completed lists.
- Verified persistence and rendering after reload via integration and e2e scenarios.
- Executed quality gates: `npm run test`, `npm run lint`, `npm run typecheck`.

### Completion Notes List

- Added binary completion toggle controls per task row with pointer/touch/keyboard parity.
- Implemented deterministic state transitions via `toggleTaskCompletion` + task manager integration.
- Added active/completed section rendering with explicit labels and non-color completed cues.
- Added/updated unit, integration, and e2e tests validating movement and persistence.

### File List

- `_bmad-output/implementation-artifacts/2-4-toggle-task-completion.md`
- `apps/web/src/features/todos/task-model.ts`
- `apps/web/src/features/todos/use-task-manager.ts`
- `apps/web/src/features/todos/task-view.ts`
- `apps/web/src/features/todos/components/TaskContentRegion.tsx`
- `apps/web/src/features/todos/task-model.unit.test.ts`
- `apps/web/src/features/todos/task-view.unit.test.ts`
- `apps/web/src/App.tsx`
- `apps/web/src/App.css`
- `apps/web/src/App.integration.test.tsx`
- `e2e/tests/smoke.spec.ts`

## Change Log

- 2026-03-23: Story file created from `/bmad-create-story 2.4`; status set to `ready-for-dev`.
- 2026-03-23: Implemented Story 2.4 completion toggle behavior, added tests, ran quality gates, status set to `review`.