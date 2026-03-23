# Story 2.1: Add a New Task to a Selected Todo List

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a user,
I want to add a new task to a selected todo list,
so that I can capture tasks as they arise.

## Acceptance Criteria

1. Given a target list is selected (or explicitly chosen in merged view), when the user submits a new task, then the task is created in that list and appears in its active section.

## Tasks / Subtasks

- [x] Implement task-create flow in UI for selected list context (AC: 1)
  - [x] Add a visible primary task-entry control (+ New Task pattern) with accessible label and keyboard submit.
  - [x] Show lightweight validation for required text and clear inline error feedback.
  - [x] Render the newly created task immediately in the active tasks section of the selected list.

- [x] Add domain/state support for create-task operation (AC: 1)
  - [x] Introduce todo/task model for id, listId, text, completion state, and timestamps.
  - [x] Add create-task action in feature state layer with deterministic assignment to selected list.
  - [x] Normalize user input (trim/collapse whitespace) and enforce duplicate/empty-name policy defined for task text.

- [x] Wire local persistence for task creation (AC: 1)
  - [x] Persist newly created tasks through local-first storage adapter used by the web app.
  - [x] Restore tasks on reload and ensure tasks map back to the owning list.
  - [x] Keep list and task persistence boundaries clean (no direct storage calls in UI components).

- [x] Preserve architecture and UX constraints while implementing (AC: 1)
  - [x] Keep implementation inside feature-first modules (`features/todos`, `features/lists`) and avoid app bootstrap bloat.
  - [x] Follow UX spec visual system and accessibility requirements (mobile-first layout, visible focus, 44x44 targets).
  - [x] Maintain calm/fast interaction model with one primary action per section and non-blocking feedback.

- [x] Add test coverage for Story 2.1 behavior (AC: 1)
  - [x] Unit tests for task creation validation and list-assignment behavior.
  - [x] Integration test for task create interaction and immediate active-section rendering in selected list.
  - [x] E2E scenario for adding a task, refreshing, and verifying persisted placement in the correct list.

## Dev Notes

### Technical Requirements

- Scope is strictly Story 2.1 (task create only). Do not implement edit/delete/toggle/completed sorting in this story.
- Creation must be immediate and deterministic: user submits once, task appears in selected list active section.
- If merged/global list view is not yet available in current UI, implement selected-list path now and keep API/state shape ready for explicit list targeting when merged view lands.
- Use existing stack and repository conventions:
  - Vite + React + TypeScript.
  - Feature-first frontend organization.
  - Root quality gate scripts as source of truth.

### Architecture Compliance

- Keep frontend implementation under `apps/web` with feature modules owning their own model/state/tests.
- Align to architecture mapping for Todo CRUD:
  - Web: `apps/web/src/features/todos`
  - API (future stories): `apps/api/src/modules/todos`
- Preserve separation of concerns:
  - UI handles interaction and rendering only.
  - Feature state/domain handles business logic.
  - Storage adapter handles persistence.
- Keep typed contracts in feature boundaries and avoid cross-feature coupling.

### Library and Framework Requirements

- Node baseline: 20.19+.
- Frontend: React + TypeScript + Vite.
- Testing: Vitest + React Testing Library + Playwright.
- No additional dependencies unless required to satisfy AC and approved by story scope.

### File Structure Requirements

Likely touch points for this story:

```text
apps/web/src/features/todos/*
apps/web/src/features/lists/* (selected-list integration only)
apps/web/src/App.tsx (or route/page composition layer)
apps/web/src/App.css (or corresponding feature styles)
apps/web/src/**/*.test.ts(x)
e2e/tests/*.spec.ts
```

### Testing Requirements

From project test strategy for Story 2.1:

- Unit: task creation logic and input validation.
- Integration: new tasks added to correct list and persist after reload.
- E2E: create a task in merged/selected context and verify correct assignment.

Definition of done checks for this story should include successful execution of:

- `npm run test`
- `npm run lint`
- `npm run typecheck`

### Previous Story Intelligence

Cross-story learnings from Story 1.1 and prior setup that should guide Story 2.1:

- Reuse established list-domain and local storage adapter patterns; do not duplicate persistence plumbing.
- Keep deterministic state initialization from storage to avoid reload race conditions.
- Preserve UX token usage (grayscale + teal, clear focus ring, mobile-first spacing) and avoid visual drift.
- Keep scope disciplined; Story 1.1 review emphasized avoiding adjacent-feature spillover.

### Git Intelligence Summary

Recent commits indicate expected delivery pattern:

- `0c493ab` feat: Story 1.1 implementation completed with UX alignment.
- `2d68c91` docs: Story 1.1 context creation workflow.
- `3926c97` docs: AI usage logging/governance preparation.
- `bb8467a` chore: Story 0.1/0.2 review closure.

Implication for Story 2.1: implement incrementally with explicit tests, preserve established feature boundaries, and keep artifact/status synchronization tight.

### Project Structure Notes

- Story 2.1 starts Epic 2; mark Epic 2 as in-progress when this story context is created.
- Establish reusable todo-domain primitives now so Stories 2.2-2.5 can extend without refactor churn.
- Continue using `apps/web`, `apps/api`, and `e2e` as hard boundaries.

### References

- `_bmad-output/planning-artifacts/epics.md` (Epic 2, Story 2.1)
- `_bmad-output/planning-artifacts/prd.md` (task workflow and NFRs)
- `_bmad-output/planning-artifacts/architecture.md` (feature mapping, structure boundaries, testing stack)
- `_bmad-output/planning-artifacts/ux-design-specification.md` (quick capture flow, task-entry and accessibility patterns)
- `_bmad-output/planning-artifacts/test-strategy.md` (Story 2.1 test expectations)
- `_bmad-output/implementation-artifacts/1-1-create-a-new-todo-list.md` (established local-first and UX-alignment patterns)

## Dev Agent Record

### Agent Model Used

GPT-5.3-Codex

### Debug Log References

- Story context generated from sprint status, epics, architecture, PRD, UX specification, test strategy, and recent git history.
- Epic 2 status transition prepared (`backlog` -> `in-progress`) as first story kickoff.
- Implemented `features/todos` domain model, storage adapter, and task manager hook with selected-list assignment.
- Updated app UI to include selected-list chips, task-entry form, active-task section, and validation feedback.
- Resolved test and lint issues during implementation:
  - Integration test DOM isolation by adding `cleanup` and per-test storage reset.
  - Playwright strict-mode selector ambiguity by switching to role-based assertions.
  - React lint rule (`set-state-in-effect`) by replacing effect-driven state writes with derived state.
- Full validation gates passed:
  - `npm run test`
  - `npm run lint`
  - `npm run typecheck`

### Completion Notes List

- Ultimate context engine analysis completed - comprehensive developer guide created.
- Story keyed to explicit user selection: `2.1`.
- Story file generated with implementation guardrails, test expectations, and cross-story learnings.
- Implemented selected-list task creation with immediate active-section rendering and inline validation.
- Added local-first task persistence and reload restoration tied to list ownership.
- Added unit, integration, and E2E coverage for Story 2.1 acceptance criteria.

### File List

- `_bmad-output/implementation-artifacts/2-1-add-a-new-task-to-a-selected-todo-list.md`
- `apps/web/src/App.tsx`
- `apps/web/src/App.css`
- `apps/web/src/App.unit.test.tsx`
- `apps/web/src/App.integration.test.tsx`
- `apps/web/src/features/lists/use-list-manager.ts`
- `apps/web/src/features/todos/task-model.ts`
- `apps/web/src/features/todos/task-storage.ts`
- `apps/web/src/features/todos/use-task-manager.ts`
- `apps/web/src/features/todos/task-model.unit.test.ts`
- `e2e/tests/smoke.spec.ts`

## Change Log

- 2026-03-20: Story file created from `/bmad-create-story` for Story 2.1; status set to `ready-for-dev`.
- 2026-03-20: Implemented Story 2.1 task creation for selected list with local persistence and unit/integration/e2e coverage; status set to `review`.
- 2026-03-23: Story promoted to `done` after review validation and storage-hardening follow-up closure.
