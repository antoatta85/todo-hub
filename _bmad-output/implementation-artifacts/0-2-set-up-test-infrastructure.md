# Story 0.2: Set Up Test Infrastructure

Status: done

## Story

As a QA engineer,
I want to configure unit, integration, and E2E test frameworks (Vitest/Jest, Playwright),
so that tests can be written and run from the start.

## Acceptance Criteria

1. Given the repository includes required test dependencies, when the engineer configures Vitest/Jest and Playwright plus test scripts, then unit, integration, and E2E test folders and runnable scripts are available.

## Tasks / Subtasks

- [x] Configure web unit and integration testing with Vitest (AC: 1)
  - [x] Add and configure Vitest dependencies in `apps/web`.
  - [x] Add React Testing Library setup with jsdom environment.
  - [x] Create sample unit and integration-level tests that run successfully.

- [x] Configure E2E testing with Playwright (AC: 1)
  - [x] Add Playwright dependency and configuration under `e2e`.
  - [x] Add one smoke E2E spec that validates app bootstrap behavior.
  - [x] Ensure E2E command is executable from repository root.

- [x] Wire scripts and baseline execution path (AC: 1)
  - [x] Add root scripts for unit/integration and e2e execution.
  - [x] Ensure script naming is clear for local and CI usage.
  - [x] Verify scripts execute without configuration errors.

- [x] Document test infrastructure usage (AC: 1)
  - [x] Update `e2e/README.md` with setup and run instructions.
  - [x] Update root `README.md` with testing quickstart.

## Dev Notes

### Technical Requirements

- Testing stack direction from architecture: Vitest + React Testing Library + Playwright.
- Keep folder alignment established in Story 0.1:
  - `apps/web` for frontend unit/integration test setup.
  - `e2e` for Playwright config and specs.
- Keep scripts runnable from root to support repeatable onboarding and CI.

### Architecture Compliance

- Unit/component tests should be co-located in frontend source as `*.test.ts(x)`.
- E2E tests should live under `e2e/`.
- Do not introduce feature logic changes while setting up test infrastructure.

### Library and Framework Requirements

- Web tests: Vitest, React Testing Library, jsdom.
- E2E tests: Playwright.
- Prefer currently used package manager and script conventions already present in repo.

### File Structure Requirements

Expected additions for this story:

```text
apps/web/src/**/*.test.tsx
apps/web/src/test/setup.ts
e2e/playwright.config.ts
e2e/tests/*.spec.ts
```

### Testing Requirements

- Test strategy mapping for Story 0.2:
  - Unit: framework configs validate.
  - Integration: sample tests run and report correctly.
  - E2E: full command path for E2E tests is executable.
- Ensure at least one sample passing test exists for Vitest and Playwright.

### Scope Boundaries

In scope:
- Framework setup and baseline runnable tests.
- Script wiring and documentation for running tests.

Out of scope:
- Business feature implementation.
- Deep API test harness implementation beyond baseline script readiness.

### Risks and Guardrails

- Risk: scripts exist but do not execute in clean environments.
  - Guardrail: run and verify all introduced test commands.
- Risk: E2E setup depends on implicit local state.
  - Guardrail: document required installation/setup steps in `e2e/README.md`.

### Project Structure Notes

- Story 0.1 established project scaffolding and placeholder test scripts.
- Story 0.2 hardens this by replacing placeholders with real framework setup.

### References

- `_bmad-output/planning-artifacts/epics.md` (Story 0.2)
- `_bmad-output/planning-artifacts/architecture.md` (Testing stack and patterns)
- `_bmad-output/planning-artifacts/test-strategy.md` (Story 0.2 test expectations)
- `_bmad-output/implementation-artifacts/0-1-initialize-project-structure.md`

## Dev Agent Record

### Agent Model Used

GPT-5.3-Codex

### Debug Log References

- Installed dependencies with `npm install` after adding Vitest/RTL/Playwright.
- Installed Playwright browser runtime via `npx playwright install chromium`.
- Initial Playwright timeout diagnosed to an occupied port and resolved by moving to strict port `4273`.
- Final validation sequence passed:
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test`
  - `npm run build`

### Completion Notes List

- Ultimate context engine analysis completed - comprehensive developer guide created.
- Story keyed to explicit user selection: `0-2`.
- Configured Vitest + jsdom + React Testing Library in `apps/web`.
- Added sample unit and integration tests (`App.unit.test.tsx`, `App.integration.test.tsx`).
- Configured Playwright in `e2e` with smoke test and root execution scripts.
- Verified unit, integration, and e2e tests are all runnable from root scripts.

### File List

- `_bmad-output/implementation-artifacts/0-2-set-up-test-infrastructure.md`
- `.gitignore`
- `README.md`
- `package.json`
- `package-lock.json`
- `apps/web/package.json`
- `apps/web/vite.config.ts`
- `apps/web/src/test/setup.ts`
- `apps/web/src/App.unit.test.tsx`
- `apps/web/src/App.integration.test.tsx`
- `e2e/README.md`
- `e2e/playwright.config.ts`
- `e2e/tests/smoke.spec.ts`

## Change Log

- 2026-03-20: Story file created and moved to `in-progress` for implementation start.
- 2026-03-20: Implemented test infrastructure with Vitest and Playwright, added sample tests, updated docs/scripts, and moved status to `review`.