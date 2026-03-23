# Story 7.1: Establish App Shell and Information Architecture

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a user,
I want a clear app shell with stable regions for list controls and task content,
so that I can understand where actions belong and navigate without confusion.

## Acceptance Criteria

1. Given the app loads on mobile or desktop, when the shell renders, then top-level regions (list/filter controls, primary task area, contextual actions) are consistently placed and labeled.
2. And Given feature modules render into the shell, when list and task features are used, then layout ownership remains in shell composition rather than duplicated in feature components.

## Tasks / Subtasks

- [x] Establish app-shell composition and region ownership in the frontend app layer (AC: 1, 2)
  - [x] Create explicit shell regions for list/filter controls, primary task content, and contextual action surfaces.
  - [x] Keep shell ownership in app composition (`app/` or route/page layer), not inside feature internals.
  - [x] Add stable semantic labels/landmarks for each top-level region.

- [x] Refactor feature mounting points to consume shell slots instead of defining page layout (AC: 2)
  - [x] Ensure list and task features render as content modules inside shell-defined regions.
  - [x] Remove/avoid duplicated layout wrappers in `features/lists` and `features/todos` components.
  - [x] Preserve existing story behavior for list/task flows while moving composition responsibility to shell.

- [x] Align shell behavior with responsive and interaction foundations (AC: 1)
  - [x] Ensure region order and naming remain consistent across mobile and desktop.
  - [x] Keep primary action discoverable and secondary actions contextual per UX patterns.
  - [x] Preserve keyboard and screen-reader navigation across region boundaries.

- [x] Validate architecture and design-system conformance (AC: 1, 2)
  - [x] Keep changes within `apps/web` feature-first boundaries and shared UI primitives.
  - [x] Use approved spacing, typography, and state tokens from the UX specification.
  - [x] Avoid introducing backend/API coupling for shell composition-only scope.

- [x] Add test coverage for shell composition and ownership rules (AC: 1, 2)
  - [x] Unit tests for region composition helpers/selectors if introduced.
  - [x] Integration tests verifying stable region rendering and feature placement in shell.
  - [x] E2E smoke checks for mobile and desktop shell landmarks and interaction continuity.

## Dev Notes

### Technical Requirements

- Scope is strictly Story 7.1: define shell structure and information architecture only.
- Do not implement advanced menu interactions or breakpoint-specific split logic here (covered in Stories 7.2 and 7.3).
- Shell must expose stable, predictable regions for:
  - list/filter controls
  - primary task area
  - contextual action surfaces
- Maintain behavior parity for existing implemented stories while moving composition responsibility upward.

### Architecture Compliance

- Follow architecture boundaries and keep page composition separate from feature internals:
  - Feature modules own local UI/domain logic.
  - App shell owns high-level layout composition.
- Keep implementation under `apps/web/src/app` and feature mount points in `apps/web/src/features/*`.
- Avoid leaking shell layout concerns into persistence/domain hooks.

### UX and Accessibility Constraints

- Story must align with Epic 7 coverage: UX-DR1, UX-DR2, UX-DR4, UX-DR5, UX-DR6, UX-DR10, UX-DR11.
- Top-level regions need consistent labeling and predictable placement on mobile and desktop.
- Ensure semantic landmarks, visible focus states, and keyboard traversal order are preserved.
- Respect touch-target and non-color-only state guidance from UX specification.

### Library and Framework Requirements

- Node baseline: 20.19+.
- Frontend: React + TypeScript + Vite.
- Testing: Vitest + React Testing Library + Playwright.
- Keep dependency footprint unchanged unless absolutely required for AC delivery.

### File Structure Requirements

Likely touch points for this story:

```text
apps/web/src/app/App.tsx
apps/web/src/app/router.tsx
apps/web/src/features/lists/components/*
apps/web/src/features/todos/components/*
apps/web/src/shared/ui/*
apps/web/src/**/*.test.ts(x)
e2e/tests/*.spec.ts
```

### Testing Requirements

Derived from project and Epic 7 QA expectations:

- Unit: validate composition helpers and region ownership constraints.
- Integration: verify shell renders stable labeled regions and features mount within shell slots.
- E2E: verify shell layout and navigability at mobile and desktop widths.

Definition of done checks for this story should include successful execution of:

- `npm run test`
- `npm run lint`
- `npm run typecheck`

### Previous Story Intelligence

Implementation lessons from completed stories to retain while introducing shell composition:

- Keep local-first state and persistence behavior deterministic.
- Preserve existing accessibility baseline (labels, focus handling, keyboard submission/interaction).
- Avoid scope creep into adjacent stories (responsive split variants and context menus are separate story scopes).

### Git Intelligence Summary

Recent delivery pattern indicates incremental, test-backed changes and synchronized artifact updates:

- Story artifacts are created first and promoted to `ready-for-dev` before implementation.
- Implementations are validated with unit/integration/e2e checks and tracked in story changelog updates.

Implication for Story 7.1: complete shell composition in small, testable increments and keep sprint-status/story artifact alignment strict.

### Project Structure Notes

- Epic 7 is the dedicated owner of UI shell/layout/navigation surfaces.
- Story 7.1 should establish shell contracts that Stories 7.2-7.4 extend without structural rework.
- Preserve hard boundaries across `apps/web`, `apps/api`, and `e2e`.

### References

- `_bmad-output/planning-artifacts/epics.md` (Epic 7, Story 7.1)
- `_bmad-output/planning-artifacts/architecture.md` (project structure, composition boundaries, testing stack)
- `_bmad-output/planning-artifacts/ux-design-specification.md` (component strategy, responsive and accessibility patterns)
- `_bmad-output/planning-artifacts/test-strategy.md` (test-level expectations)
- `_bmad-output/project-context.md` (product goals and baseline constraints)
- `_bmad-output/implementation-artifacts/1-1-create-a-new-todo-list.md` (existing implementation patterns)
- `_bmad-output/implementation-artifacts/2-1-add-a-new-task-to-a-selected-todo-list.md` (existing implementation patterns)

## Dev Agent Record

### Agent Model Used

GPT-5.3-Codex

### Debug Log References

- Story context generated from sprint status, epics, architecture, UX specification, test strategy, and project context.
- Story 7.1 selected from user command `/bmad-create-story 7.1`.
- Sprint status updated for first Epic 7 story kickoff.
- Implemented app-shell region composition in `apps/web/src/app/AppShell.tsx` with stable landmark labels from `apps/web/src/app/shell-regions.ts`.
- Refactored feature mounting into shell-owned slots via `features/lists/components/ListControlsRegion.tsx`, `features/todos/components/TaskContentRegion.tsx`, and `features/todos/components/ContextActionsRegion.tsx`.
- Added and validated Story 7.1 tests:
  - Red phase: new unit/integration shell-region assertions failed before implementation.
  - Green phase: unit/integration tests passed after shell refactor.
  - E2E: smoke test extended with mobile/desktop viewport landmark continuity checks.
- Full quality gates executed successfully:
  - `npm run test`
  - `npm run lint`
  - `npm run typecheck`

### Completion Notes List

- Ultimate context engine analysis completed - comprehensive developer guide created.
- Story keyed to explicit user selection: `7.1`.
- Story artifact created with AC-traceable tasks and implementation guardrails.
- Implemented shell-owned information architecture with explicit, stable regions: list/filter controls, primary task area, contextual actions.
- Preserved existing list/task behavior while moving layout ownership out of feature-internal page structure.
- Added responsive shell layout scaffolding for mobile and desktop with consistent region ordering and labels.
- Added unit, integration, and E2E coverage for shell-region presence, slot ownership, and viewport continuity.
- Addressed code review follow-up by adding explicit desktop-breakpoint assertion at width 900 in E2E smoke coverage.
- Epic kickoff and story completion states synchronized in sprint tracking.

### File List

- `_bmad-output/implementation-artifacts/7-1-establish-app-shell-and-information-architecture.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `apps/web/src/App.tsx`
- `apps/web/src/App.css`
- `apps/web/src/App.unit.test.tsx`
- `apps/web/src/App.integration.test.tsx`
- `apps/web/src/app/AppShell.tsx`
- `apps/web/src/app/shell-regions.ts`
- `apps/web/src/features/lists/components/ListControlsRegion.tsx`
- `apps/web/src/features/todos/components/TaskContentRegion.tsx`
- `apps/web/src/features/todos/components/ContextActionsRegion.tsx`
- `e2e/tests/smoke.spec.ts`

## Change Log

- 2026-03-20: Story file created from `/bmad-create-story` for Story 7.1; status set to `ready-for-dev`.
- 2026-03-20: Implemented Story 7.1 app-shell composition with stable regions, feature slot mounting, responsive structure, and unit/integration/e2e coverage; status set to `review`.
- 2026-03-20: Code review follow-up applied and verified (`npm run test:e2e` pass) by asserting desktop split behavior at width 900.
- 2026-03-20: Story status promoted to `done` after approved review and follow-up validation.

## Senior Developer Review (AI)

### Review Date

2026-03-20

### Outcome

Approved

### Summary

- Scope and acceptance criteria for Story 7.1 are satisfied.
- One patch-level hardening item was identified during review and is now resolved.

### Action Items

- [x] Add explicit breakpoint assertion at width 900 to verify desktop shell split behavior in E2E smoke test.