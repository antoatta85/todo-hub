# Story 0.1: Initialize Project Structure

Status: review

## Story

As a developer,
I want to scaffold the frontend, backend, and test directories using AI assistance,
so that the project has a clear, maintainable structure from day one.

## Acceptance Criteria

1. Given an empty repository and Node 20+ are available, when the developer runs `npm create vite@latest todo-app -- --template react-ts`, then a TypeScript React starter application is created successfully.
2. Given the starter app is created, when the initial project structure is prepared, then the workspace contains explicit frontend, backend, and tests directories following the agreed modular layout.
3. Given project dependencies are not yet installed, when the developer runs `npm install` and `npm run dev` in the frontend app, then the development server starts without build errors.
4. Given baseline quality tooling is required, when project scripts are reviewed, then lint, test, and build scripts are present and executable.

## Tasks / Subtasks

- [x] Initialize frontend starter (AC: 1, 3)
  - [x] Verify Node version is >= 20.
  - [x] Run `npm create vite@latest todo-app -- --template react-ts`.
  - [x] Install dependencies in `todo-app` via `npm install`.
  - [x] Verify frontend runs via `npm run dev`.

- [x] Establish workspace structure (AC: 2)
  - [x] Create explicit top-level workspaces aligned with architecture direction: `apps/web`, `apps/api`, `e2e`.
  - [x] Move or recreate Vite app under `apps/web` while preserving startup behavior.
  - [x] Create backend scaffold directory under `apps/api` (minimal package and src entrypoint).
  - [x] Create `e2e` directory for test harness initialization in Story 0.2.

- [x] Add baseline scripts and quality gates (AC: 4)
  - [x] Ensure frontend scripts include `dev`, `build`, `test`, and `lint`.
  - [x] Add root-level scripts to run key workspace checks (`lint`, `test`, `build`, optional `typecheck`).
  - [x] Ensure scripts execute without syntax/config errors.

- [x] Document structure decisions (AC: 2, 4)
  - [x] Update root README with quickstart for frontend and planned backend/e2e structure.
  - [x] Note temporary placeholders and what Story 0.2 will complete.

## Dev Notes

### Technical Requirements

- Frontend baseline: Vite + React + TypeScript.
- Keep architecture-compatible conventions from day one:
  - Feature-first frontend modules.
  - API layering target (`routes -> services -> repositories -> db`) in backend scaffold.
  - Shared contract direction reserved for later (`packages/contracts`) without forcing premature implementation in this story.
- Do not implement business features in this story; scope is scaffolding and runnable baseline only.

### Architecture Compliance

- Follow naming conventions:
  - Components/types: PascalCase.
  - Non-component files: kebab-case.
  - Functions/variables: camelCase.
- Preserve separation of concerns and avoid placing domain logic in app bootstrap files.
- Keep test placement conventions ready:
  - Unit/component tests co-located in feature areas.
  - End-to-end tests under `e2e/`.

### Library and Framework Requirements

- Node: 20+ minimum (architecture notes mention modern LTS baseline).
- Frontend stack target:
  - Vite
  - React
  - TypeScript
- Testing and quality toolchain planned for immediate follow-up in Story 0.2:
  - Vitest
  - Playwright
  - ESLint/Prettier pathway

### File Structure Requirements

Minimum acceptable scaffold after this story:

```text
todo/
  apps/
    web/
    api/
  e2e/
```

Recommended direction from architecture (can be partially stubbed now, expanded in later stories):

```text
apps/web/src/{app,features,shared,state,assets}
apps/api/src/{modules,middleware,db,shared}
```

### Testing Requirements

- This story does not require full test suite implementation, but it must provide executable script hooks.
- Definition of done for this story requires commands to run successfully:
  - Frontend dev server command.
  - Lint script command.
  - Test script command (can be placeholder initially if explicitly documented and non-breaking).
  - Build script command.

### Scope Boundaries

In scope:
- Workspace scaffolding and script readiness.
- Runnable frontend baseline.
- Backend and e2e directory initialization.

Out of scope:
- Todo feature implementation.
- Full backend API implementation.
- Full automated test framework configuration (belongs primarily to Story 0.2).

### Risks and Guardrails

- Risk: Creating a flat single-app structure that conflicts with architecture.
  - Guardrail: Normalize into `apps/web`, `apps/api`, and `e2e` now.
- Risk: Over-engineering before foundations are runnable.
  - Guardrail: Prioritize startup/build/lint/test script operability over deep feature scaffolding.
- Risk: Silent script drift between root and app-level package files.
  - Guardrail: Verify root-level and app-level scripts both execute and document expected usage.

### Project Structure Notes

- The selected architecture favors a monorepo-like structure with separate app boundaries and shared contracts.
- Story 0.1 should establish directory boundaries and runnable entry points; Story 0.2 should harden test infrastructure within those boundaries.
- If there is conflict between starter defaults and architecture layout, prefer architecture layout and document any migration steps performed.

### References

- Source epics story definition: `_bmad-output/planning-artifacts/epics.md` (Story 0.1 section)
- Architecture baseline and starter decision: `_bmad-output/planning-artifacts/architecture.md`
- Product constraints and NFR context: `_bmad-output/planning-artifacts/prd.md`
- UX system constraints (for future styling consistency): `_bmad-output/planning-artifacts/ux-design-specification.md`

## Dev Agent Record

### Agent Model Used

GPT-5.3-Codex

### Debug Log References

- Node local runtime: `v20.19.5`, npm `10.8.2`
- Validation commands executed successfully:
  - `npm run dev` (apps/web smoke start)
  - `npm run lint` (root)
  - `npm run test` (root)
  - `npm run build` (root)

### Completion Notes List

- Ultimate context engine analysis completed - comprehensive developer guide created.
- Story keyed to explicit user selection: `0-1`.
- No previous story intelligence exists for Epic 0 Story 1.
- Scaffold implemented at architecture-aligned layout: `apps/web`, `apps/api`, `e2e`.
- Frontend app moved from `todo-app/` to `apps/web/` and remains runnable.
- Root scripts now orchestrate web/api lint, test, and build checks.
- API scaffold and e2e placeholder initialized for Story 0.2 follow-up.

### File List

- `_bmad-output/implementation-artifacts/0-1-initialize-project-structure.md`
- `apps/web/` (moved from `todo-app/`)
- `apps/web/package.json`
- `apps/web/package-lock.json`
- `apps/api/package.json`
- `apps/api/src/server.js`
- `e2e/README.md`
- `package.json`
- `README.md`

## Change Log

- 2026-03-20: Implemented Story 0.1 scaffolding, structure alignment, and baseline script validation; status set to `review`.
