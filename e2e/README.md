# E2E Testing

This folder contains Playwright configuration and browser-level smoke tests.

## Files

- `playwright.config.ts`: Playwright runner configuration
- `tests/smoke.spec.ts`: baseline app-shell smoke test

## Setup

1. Install dependencies at repository root:
	 - `npm install`
2. Install Playwright browser binaries:
	 - `npx playwright install chromium`

## Run

- Run E2E only:
	- `npm run test:e2e`
- Run all tests (web, api, e2e):
	- `npm run test`

The test runner starts the frontend dev server automatically on port 4173.
