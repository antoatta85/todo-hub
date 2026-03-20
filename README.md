# Todo Workspace

This repository is scaffolded for Story 0.1 with explicit frontend, backend, and test directories.

## Structure

- apps/web: Vite + React + TypeScript frontend
- apps/api: minimal Node API scaffold
- e2e: placeholder folder for end-to-end tests (expanded in Story 0.2)

## Prerequisites

- Node 20+
- npm 10+

## Quickstart

1. Install dependencies from the workspace root:
   - `npm run install:all`
2. Start frontend dev server from the workspace root:
   - `npm run dev:web`
3. (Optional) Start API scaffold:
   - `npm run dev:api`

Alternative (app-local frontend flow):
- `cd apps/web && npm install && npm run dev`

## Baseline Quality Scripts

- `npm run lint`
- `npm run test` (web + api + e2e)
- `npm run test:web` (Vitest unit/integration)
- `npm run test:e2e` (Playwright)
- `npm run build`

## Test Infrastructure Notes

- Story 0.2 configures Vitest in `apps/web` for unit/integration baselines.
- Story 0.2 configures Playwright in `e2e` for browser smoke coverage.
- First-time Playwright setup requires browser install:
   - `npx playwright install chromium`
