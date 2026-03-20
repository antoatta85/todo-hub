# Story 1.1: Create a New Todo List

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a user,
I want to create a new todo list with a custom name,
so that I can organize my tasks by context or project.

## Acceptance Criteria

1. Given the user is on list management and enters a valid custom list name, when they confirm create, then the new list is created and appears immediately in list navigation.

## Tasks / Subtasks

- [x] Implement list creation flow in UI and state layer (AC: 1)
  - [x] Add list-create input and submit interaction in the list management area.
  - [x] Validate list name before create (trim, non-empty, duplicate handling policy).
  - [x] Trigger state update so the new list appears immediately in navigation.

- [x] Add domain/service support for create-list operation (AC: 1)
  - [x] Add list creation function in the feature state/store layer.
  - [x] Ensure new list object includes stable id and required metadata fields.
  - [x] Wire local persistence path for list creation so reload preserves the new list.

- [x] Preserve architecture and UX constraints (AC: 1)
  - [x] Keep implementation inside feature-first structure and avoid app-bootstrap logic bloat.
  - [x] Ensure accessible labels, keyboard submission, and visible validation feedback.
  - [x] Follow visual system conventions (tokens, spacing, typography, focus states).

- [x] Add test coverage for story behavior (AC: 1)
  - [x] Unit tests for list creation validation and state transitions.
  - [x] Integration test for create interaction and immediate navigation rendering.
  - [x] E2E smoke scenario for creating a list and verifying persistence after refresh.

## Dev Notes

### Technical Requirements

- Story scope is list creation only; do not implement rename/archive/delete/switch in this story.
- List creation must provide immediate UI feedback and deterministic state update.
- Use current stack and conventions already established in the repo:
  - Vite + React + TypeScript.
  - Feature-first frontend organization.
  - Root scripts as quality gate entry points.
- Align with PRD/epics for list management behavior and low-friction interaction.

### Architecture Compliance

- Keep frontend work inside `apps/web` and organize by feature/domain boundaries.
- Follow naming and structure conventions already set:
  - Components/types: PascalCase.
  - Non-component files: kebab-case.
  - Functions/variables: camelCase.
- Maintain separation between UI concerns and state/persistence logic.
- Avoid introducing API/backend dependencies if local-first flow already satisfies AC for this story.

### Library and Framework Requirements

- Node baseline: 20.19+.
- Frontend: React + TypeScript + Vite.
- Testing: Vitest + React Testing Library + Playwright.
- Keep additional dependencies minimal unless needed to satisfy AC and architecture constraints.

### File Structure Requirements

Likely touch points for this story:

```text
apps/web/src/features/lists/*
apps/web/src/state/*
apps/web/src/services/* (if persistence adapter wiring is needed)
apps/web/src/**/*.test.ts(x)
e2e/tests/*.spec.ts
```

### Testing Requirements

From project test strategy for Story 1.1:

- Unit: test list creation logic and input validation.
- Integration: verify new lists appear in navigation and persist after reload.
- E2E: simulate user creating a list and confirm it is visible and usable.

Definition of done checks for this story should include successful execution of:

- `npm run test`
- `npm run lint`
- `npm run typecheck`

### Previous Story Intelligence

Cross-story learnings from Epic 0 setup that should guide Story 1.1 implementation:

- Repository layout is already normalized to `apps/web`, `apps/api`, and `e2e`; keep changes within these boundaries.
- Quality gates and test infrastructure are operational; use them rather than ad-hoc verification.
- Keep documentation and configuration consistency tight (prior review found doc/config drift).
- Maintain focused scope per story to prevent accidental spillover into adjacent features.

### Git Intelligence Summary

Recent commits indicate expected delivery pattern:

- `3926c97` docs: prepare story 0.3 AI usage logging and governance Q&A.
- `bb8467a` chore: finalize stories 0.1 and 0.2 review closure.
- `fd407de` chore: checkpoint story 0.2 test infrastructure.
- `6e1e2bf` chore: checkpoint story 0.1 scaffold and review fixes.

Implication for Story 1.1: implement in small, verifiable increments with explicit tests and keep artifact/status updates synchronized.

### Project Structure Notes

- Epic 1 is the first user-facing feature epic; Story 1.1 should establish clean list-domain patterns that later stories 1.2-1.6 can reuse.
- Prefer reusable list-domain primitives over one-off UI logic to avoid rework in rename/archive/switch stories.

### References

- `_bmad-output/planning-artifacts/epics.md` (Epic 1, Story 1.1)
- `_bmad-output/planning-artifacts/prd.md` (list management and UX/quality goals)
- `_bmad-output/planning-artifacts/architecture.md` (stack, structure, testing conventions)
- `_bmad-output/planning-artifacts/ux-design-specification.md` (interaction and accessibility expectations)
- `_bmad-output/planning-artifacts/test-strategy.md` (Story 1.1 test expectations)
- `_bmad-output/implementation-artifacts/0-1-initialize-project-structure.md`
- `_bmad-output/implementation-artifacts/0-2-set-up-test-infrastructure.md`

## Dev Agent Record

### Agent Model Used

GPT-5.3-Codex

### Debug Log References

- Story context generated from sprint status, epics, architecture, PRD, UX spec, and test strategy.
- Epic 1 status transition prepared (`backlog` -> `in-progress`) as first story kickoff.
- Implemented list-domain model, storage adapter, and manager hook under `apps/web/src/features/lists`.
- Full validation gates executed successfully:
  - `npm run test`
  - `npm run lint`
  - `npm run typecheck`
- During implementation, fixed persistence race condition by initializing state lazily from localStorage.

### Completion Notes List

- Ultimate context engine analysis completed - comprehensive developer guide created.
- Story keyed to explicit user selection: `1.1`.
- Story file generated with implementation guardrails, test expectations, and cross-story setup learnings.
- Implemented accessible list creation UI with validation for empty and duplicate names.
- Added deterministic local persistence for created lists and verified post-refresh visibility in e2e.
- Added unit, integration, and e2e tests mapped to Story 1.1 acceptance criteria.

### File List

- `_bmad-output/implementation-artifacts/1-1-create-a-new-todo-list.md`
- `apps/web/src/App.tsx`
- `apps/web/src/App.css`
- `apps/web/src/App.unit.test.tsx`
- `apps/web/src/App.integration.test.tsx`
- `apps/web/src/features/lists/list-model.ts`
- `apps/web/src/features/lists/list-storage.ts`
- `apps/web/src/features/lists/use-list-manager.ts`
- `apps/web/src/features/lists/list-model.unit.test.ts`
- `e2e/tests/smoke.spec.ts`

## Change Log

- 2026-03-20: Story file created from `/bmad-create-story` for Story 1.1; status set to `ready-for-dev`.
- 2026-03-20: Implemented Story 1.1 list creation with validation, local persistence, and unit/integration/e2e coverage; status set to `review`.