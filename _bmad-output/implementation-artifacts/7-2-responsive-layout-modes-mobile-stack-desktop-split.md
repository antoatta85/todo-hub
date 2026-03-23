# Story 7.2: Responsive Layout Modes (Mobile Stack + Desktop Split)

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a user,
I want layout behavior optimized for both thumb-first mobile and desktop productivity,
so that interactions remain fast and readable on any device.

## Acceptance Criteria

1. Given viewport width changes across breakpoints, when the app reflows, then mobile uses stacked sections and desktop uses split context without breaking feature behavior.
2. And Given responsive mode changes, when users continue task/list actions, then focus state and interaction continuity are preserved.

## Tasks / Subtasks

- [x] Implement shell-level responsive layout modes (AC: 1)
  - [x] Keep layout ownership in app shell composition and avoid moving layout logic into feature internals.
  - [x] Define and apply canonical breakpoint behavior for mobile, tablet, and desktop in shell styles.
  - [x] Ensure mobile layout uses stacked sections and desktop layout uses split context.

- [x] Preserve behavior parity during responsive reflow (AC: 1, 2)
  - [x] Verify list creation/selection and task creation/toggle flows remain functionally identical across breakpoints.
  - [x] Avoid breakpoint-specific business logic divergence; adapt presentation and density only.
  - [x] Ensure source-list context, labels, and region semantics remain clear in all modes.

- [x] Maintain focus and accessibility continuity across mode changes (AC: 2)
  - [x] Preserve keyboard focus visibility and predictable tab order after viewport changes.
  - [x] Keep landmarks/ARIA labels stable so assistive tech navigation remains consistent.
  - [x] Ensure touch-target sizing and non-color semantic cues remain compliant.

- [x] Add regression-proof test coverage for responsive behavior (AC: 1, 2)
  - [x] Add/extend integration tests for shell mode transitions and invariant feature behavior.
  - [x] Extend Playwright smoke coverage for mobile, tablet, and desktop breakpoint assertions.
  - [x] Verify focus continuity and interaction parity checks in responsive test paths.

- [x] Validate quality gates and architecture compliance (AC: 1, 2)
  - [x] Run `npm run test`.
  - [x] Run `npm run lint`.
  - [x] Run `npm run typecheck`.

## Dev Notes

### Technical Requirements

- Scope is strictly Story 7.2: responsive layout modes and continuity behavior.
- Do not implement menu-surface interaction work planned for Story 7.3.
- Keep shell landmarks and region contract from Story 7.1 intact while adjusting layout mode behavior.
- Breakpoint contract must be explicit and reflected consistently in CSS, tests, and story notes.

### Architecture Compliance

- App shell owns layout composition; feature modules own feature UI and domain logic.
- Keep changes within frontend shell and feature mount boundaries under `apps/web`.
- Do not introduce backend/API coupling for this layout-only scope.
- Preserve existing feature-first structure and shared UI/token usage.

### UX and Accessibility Constraints

- Apply mobile-first progressive enhancement for tablet and desktop.
- Keep behavior parity across breakpoints; change presentation/density, not interaction semantics.
- Preserve keyboard navigability, visible focus indicators, and screen-reader clarity.
- Ensure long-press equivalents and desktop keyboard paths remain functionally available.

### Breakpoint and Layout Guardrails

- UX specification indicates:
  - Mobile: 320px-767px
  - Tablet: 768px-1023px
  - Desktop: 1024px+
- Current implementation/test baseline from Story 7.1 includes a desktop split assertion at width 900.
- For Story 7.2, set and document one canonical split strategy, then update CSS and tests atomically to avoid ambiguous breakpoint behavior.

### Library and Framework Requirements

- Node baseline: 20.19+.
- Frontend: React + TypeScript + Vite.
- Testing: Vitest + React Testing Library + Playwright.
- Prefer existing stack/utilities; avoid dependency changes unless strictly needed.

### File Structure Requirements

Likely touch points for this story:

```text
apps/web/src/App.css
apps/web/src/App.tsx
apps/web/src/app/AppShell.tsx
apps/web/src/features/lists/components/*
apps/web/src/features/todos/components/*
apps/web/src/**/*.test.ts(x)
e2e/tests/smoke.spec.ts
```

### Testing Requirements

- Integration:
  - Assert shell mode transitions preserve mounted feature behavior and region semantics.
  - Assert no regression in list/task interaction flow during viewport changes.
- E2E:
  - Validate responsive behavior at representative mobile/tablet/desktop widths.
  - Assert stacked vs split layout expectations per canonical breakpoint decision.
  - Assert focus continuity and interaction discoverability after reflow.

Definition of done checks for this story should include successful execution of:

- `npm run test`
- `npm run lint`
- `npm run typecheck`

### Previous Story Intelligence

From Story 7.1 completion:

- Shell region composition and semantic landmarks are established and must remain stable.
- Existing smoke test already asserts 900px three-column split; any breakpoint changes must update this contract deliberately.
- Keep implementation incremental and test-backed to avoid layout regressions.
- Story/sprint status synchronization is expected for each workflow transition.

### Git Intelligence Summary

Recent commits show a pattern of story-first artifact preparation, test-backed implementation, and explicit status synchronization.
Apply the same pattern here: finalize context, implement in small increments, and validate with unit/integration/e2e before review.

### Project Structure Notes

- Epic 7 is the owner of shell, responsive composition, and navigation-surface behavior.
- Story 7.2 extends Story 7.1 shell contracts; avoid structural rewrites that would destabilize Story 7.1 guarantees.
- Keep boundaries clear across `apps/web`, `apps/api`, and `e2e`.

### References

- `_bmad-output/planning-artifacts/epics.md` (Epic 7, Story 7.2)
- `_bmad-output/planning-artifacts/ux-design-specification.md` (Responsive Strategy, Breakpoint Strategy, Accessibility Strategy)
- `_bmad-output/planning-artifacts/architecture.md` (module boundaries, structure, testing and integration patterns)
- `_bmad-output/project-context.md` (MVP responsiveness and accessibility goals)
- `_bmad-output/implementation-artifacts/7-1-establish-app-shell-and-information-architecture.md` (shell contract and prior implementation learnings)
- `apps/web/src/App.css` (current responsive baseline)
- `e2e/tests/smoke.spec.ts` (current viewport assertions)

## Dev Agent Record

### Agent Model Used

GPT-5.3-Codex

### Debug Log References

- Story context generated from explicit request `/bmad-create-story 7.2`.
- Source analysis covered sprint status, Epic 7 definition, UX responsive/accessibility strategy, architecture boundaries, and Story 7.1 implementation learnings.
- Git intelligence extracted from recent commit history for continuity.
- Red phase: tightened responsive E2E assertions to require stacked tablet layout at 900px and split desktop layout at 1024px with focus continuity checks.
- Green phase: updated shell CSS breakpoint contract to desktop split at 1024px+, with tablet density adjustments at 768px+ while preserving stacked layout.
- Extended integration coverage in `apps/web/src/App.integration.test.tsx` for task/list continuity in stable shell-owned regions.
- Validation gates executed successfully:
  - `npm run test`
  - `npm run lint`
  - `npm run typecheck`

### Completion Notes List

- Ultimate context engine analysis completed - comprehensive developer guide created.
- Story keyed to explicit user selection: `7.2`.
- Story status initialized to `ready-for-dev`.
- Canonical responsive contract implemented: mobile/tablet stacked sections, desktop split at 1024px+.
- Focus continuity verified during responsive viewport changes in E2E smoke coverage.
- Interaction continuity verified for list/task actions with stable shell region semantics.
- Story implementation complete and ready for code review.

### File List

- `_bmad-output/implementation-artifacts/7-2-responsive-layout-modes-mobile-stack-desktop-split.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `apps/web/src/App.css`
- `apps/web/src/App.integration.test.tsx`
- `e2e/tests/smoke.spec.ts`

## Change Log

- 2026-03-23: Story file created from `/bmad-create-story` for Story 7.2; status set to `ready-for-dev`.
- 2026-03-23: Implemented responsive layout modes with desktop split at 1024px+, added responsive continuity tests (integration + E2E), and completed quality gates; status set to `review`.
- 2026-03-23: Story promoted to `done` after review validation and follow-up hardening completion.
