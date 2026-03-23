# Story 2.5: Display Completed Tasks at the Bottom

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a user,
I want completed tasks to remain visible but be displayed at the bottom of the list,
so that I can review what I have finished without cluttering my active tasks.

## Acceptance Criteria

1. Given a list contains completed items, when the list is rendered or refreshed, then completed tasks are displayed in a separate section at the bottom and are visually distinct from active tasks.

## Tasks / Subtasks

- [x] Implement completed-at-bottom sectioning in task rendering (AC: 1)
  - [x] Partition rendered tasks into active and completed sections.
  - [x] Render completed section after active section in both single-list and combined-list contexts.
  - [x] Keep empty-state behavior clear when one section is empty and the other is populated.

- [x] Implement deterministic ordering for active/completed groups (AC: 1)
  - [x] Keep ordering logic deterministic within each section across renders and refresh.
  - [x] Ensure section ordering remains stable after create/toggle operations.
  - [x] Reuse existing task projection/sorting primitives where possible to avoid duplicate ordering logic.

- [x] Apply visual distinction for completed tasks (AC: 1)
  - [x] Add reduced-salience completed styling (text tone/decoration and status icon state).
  - [x] Ensure distinction is not color-only and remains understandable in high-contrast conditions.
  - [x] Keep section labels explicit so users can quickly scan active vs completed tasks.

- [x] Preserve persistence and refresh behavior (AC: 1)
  - [x] Confirm completed section layout is correct after reload using persisted state.
  - [x] Ensure deserialized tasks with valid schema are consistently sectioned and rendered.
  - [x] Avoid introducing list/task ownership drift during sectioning logic.

- [x] Add Story 2.5 test coverage (AC: 1)
  - [x] Unit tests for section partitioning and completed-order logic.
  - [x] Integration tests verifying completed tasks remain at bottom and visually distinct.
  - [x] E2E scenario completing tasks and verifying bottom placement across reload.

- [x] Validate quality gates and architecture conformance (AC: 1)
  - [x] Run `npm run test`.
  - [x] Run `npm run lint`.
  - [x] Run `npm run typecheck`.

## Dev Notes

### Technical Requirements

- Story scope is rendering/ordering of completed tasks at the bottom; do not implement hide/show-completed controls in this story.
- Completed tasks must remain visible and distinct while preserving active-task focus.
- Behavior must be deterministic across immediate renders and page refreshes.
- Completed-at-bottom behavior must work for both single-list and combined-list modes.

### Architecture Compliance

- Keep logic in feature modules under `apps/web/src/features/todos` and avoid scattering ordering logic across unrelated components.
- Preserve separation between state derivation, presentation, and persistence adapters.
- Reuse existing task filtering/projection utilities introduced in Story 2.4/2.1 paths where possible.
- Follow naming/file conventions from architecture guidance.

### Library and Framework Requirements

- Frontend stack: Vite + React + TypeScript.
- Test stack: Vitest + React Testing Library + Playwright.
- Keep runtime dependencies unchanged unless story scope explicitly requires otherwise.

### UX and Accessibility Constraints

- UX spec requires clear separation between active and completed tasks with predictable transitions.
- Completed-state communication must include non-color cues.
- Keep section labels and ordering logic obvious to users without hidden rules.
- Maintain keyboard/screen-reader clarity for section boundaries and task state.

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

From project test strategy for Story 2.5:

- Unit: test sorting logic for completed tasks.
- Integration: confirm completed tasks are visually distinct and at the bottom.
- E2E: simulate completing tasks and verify display order.

Definition of done checks for this story should include successful execution of:

- `npm run test`
- `npm run lint`
- `npm run typecheck`

### Previous Story Intelligence

Relevant sequence intelligence:

- Story 2.1 established task model/storage and deterministic creation flow; completed-bottom rendering should build directly on that model.
- Story 2.4 defines completion transitions and section movement semantics; Story 2.5 should refine section ordering/presentation without altering toggle semantics.
- Story 1.5 added combined-list mode and source tagging; completed-bottom behavior must preserve these contexts in merged view.
- Review hardening for storage validation means ordering/section logic should operate only on valid persisted entities.

### Git Intelligence Summary

Recent repo history reflects a test-first, scope-focused pattern. Continue this pattern by making section-order logic explicit, validating with unit/integration/e2e checks, and avoiding side effects outside Story 2.5 scope.

### Project Structure Notes

- Epic 2 progression expects 2.4 completion behavior before 2.5 ordering polish.
- Story 2.5 should keep implementation constrained to task rendering/state derivation layers.
- Ensure completed-bottom logic remains extensible for Epic 4 hide/show-completed features.

### References

- `_bmad-output/planning-artifacts/epics.md` (Epic 2, Story 2.5)
- `_bmad-output/planning-artifacts/test-strategy.md` (Story 2.5 expectations)
- `_bmad-output/planning-artifacts/ux-design-specification.md` (completion section movement, visual distinction, accessibility baseline)
- `_bmad-output/planning-artifacts/architecture.md` (deterministic ordering and feature boundaries)
- `_bmad-output/implementation-artifacts/2-1-add-a-new-task-to-a-selected-todo-list.md` (task-domain baseline)
- `_bmad-output/implementation-artifacts/2-4-toggle-task-completion.md` (completion transition constraints for sequencing)
- `_bmad-output/implementation-artifacts/1-5-switch-between-lists-and-global-combined-view.md` (combined/single rendering context)

## Dev Agent Record

### Agent Model Used

GPT-5.3-Codex

### Debug Log References

- Story context created from explicit request `/bmad-create-story 2.4, 2.5`.
- Inputs analyzed from Epic 2 definitions, Story 2.5 test strategy expectations, UX completion behavior, architecture ordering constraints, and prior implementation artifacts.
- Sprint status transition prepared for Story 2.5 (`backlog` -> `ready-for-dev`).
- Implemented active/completed partitioning and completed-at-bottom rendering in single and combined view modes.
- Added completed visual treatment (line-through + status badge) and explicit completed section labeling.
- Executed quality gates: `npm run test`, `npm run lint`, `npm run typecheck`.

### Completion Notes List

- Added reusable task section projection utility to keep ordering/partitioning deterministic.
- Rendered completed tasks in a dedicated bottom section for both single and combined views.
- Preserved persisted completed layout on reload via integration and e2e validation.
- Added unit, integration, and e2e coverage for completed-bottom behavior.

### File List

- `_bmad-output/implementation-artifacts/2-5-display-completed-tasks-at-the-bottom.md`
- `apps/web/src/features/todos/task-view.ts`
- `apps/web/src/features/todos/components/TaskContentRegion.tsx`
- `apps/web/src/features/todos/task-view.unit.test.ts`
- `apps/web/src/App.tsx`
- `apps/web/src/App.css`
- `apps/web/src/App.integration.test.tsx`
- `e2e/tests/smoke.spec.ts`

## Change Log

- 2026-03-23: Story file created from `/bmad-create-story 2.5`; status set to `ready-for-dev`.
- 2026-03-23: Implemented Story 2.5 completed-at-bottom rendering, added tests, ran quality gates, status set to `review`.