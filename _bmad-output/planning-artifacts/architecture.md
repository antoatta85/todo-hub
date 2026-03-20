---
stepsCompleted:
  - step-01-init
  - step-02-context
  - step-03-starter
  - step-04-decisions
  - step-05-patterns
  - step-06-structure
  - step-07-validation
  - step-08-complete
inputDocuments:
  - /Users/antonioattanasio/Desktop/aine/bmad/todo/_bmad-output/planning-artifacts/prd.md
  - /Users/antonioattanasio/Desktop/aine/bmad/todo/_bmad-output/planning-artifacts/prd_executive_draft.md
  - /Users/antonioattanasio/Desktop/aine/bmad/todo/_bmad-output/planning-artifacts/prd_scoping_draft.md
  - /Users/antonioattanasio/Desktop/aine/bmad/todo/_bmad-output/project-context.md
workflowType: 'architecture'
lastStep: 8
status: 'complete'
project_name: 'todo'
user_name: 'Antonio'
date: '2026-03-17'
completedAt: '2026-03-17'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements (from PRD)**
- CRUD todo operations: create, read, update, delete.
- Toggle todo completion and track active/completed state.
- Persist todos across page refresh through local persistence and optional backend API.
- Support empty, loading, and error UI states.
- Track task metadata: id, text, createdAt, isDone.
- API contracts for backend: GET /api/v1/todos, POST /api/v1/todos, PATCH /api/v1/todos/:id, DELETE /api/v1/todos/:id.

**Non-Functional Requirements (from PRD)**
- 98% unit test coverage for core todo logic.
- Modular code separation: UI, state, API/storage.
- Performance threshold: <200ms operations for datasets <=500 items; UI responses <100ms.
- Accessibility: keyboard add/toggle/delete; screen-reader support.
- Security: sanitize input, no unsafe HTML injection.
- Stability: 99% save/load success with persistence.

### Scale & Complexity

- Primary domain: web productivity (SPA web app with backend API option).
- Complexity level: low (document explicitly classifies as low complexity, general domain, greenfield).
- Estimated architectural components: 5-7 (UI shell, task list module, state/logic module, persistence layer, API layer, offline cache, tests).

### Technical Constraints & Dependencies

- Must be built as SPA with client-side routing (React/Svelte/Vue or equivalent).
- Local persistence via IndexedDB/localStorage; optional backend Node/Express + SQLite/JSON.
- No auth required for MVP; single-user context.
- Reconcile optimistic UI updates with persistence eventual consistency.
- Avoid large data volumes in MVP; focus on up to 500 items with strong responsiveness.

### Cross-Cutting Concerns Identified

- Data consistency across in-memory state, local storage, and backend API.
- UI state determinism for sorted lists: important/incomplete/completed ordering.
- Error handling with user-friendly messages and retry behavior.
- Accessibility and performance together (keyboard-first, screen-reader labels, mobile-first responsive design).
- Testability for the full data flow (unit + integration for persistence interfaces).

### Project Complexity Assessment

- Real-time features: none required in MVP.
- Multi-tenancy: not needed in MVP.
- Regulatory compliance: minimal; general privacy hygiene.
- Integration complexity: low (local storage + simple CRUD API path).
- User interaction complexity: low-to-moderate (important-task rules, completed partition, keyboard shortcuts).
- Data complexity: low (simple JSON task objects with minimal fields).

## Validation Request

I'm reviewing your project documentation for todo.

- I found 1 PRD and 1 project context document.
- Functional requirements are focused on simple task CRUD, state toggling, data persistence, and basic UI states.
- Critical NFRs include reliability (99% save/load), performance (<200ms), test coverage (98%), and accessibility.

**Key architectural aspects:**
- Core functionality: lightweight SPA task management with persistence sync.
- Critical NFRs: performance, reliability, accessibility, modular maintainable architecture.
- UX complexity: mobile-first responsive UI with keyboard support and stable ordering rules.
- Constraints: no auth, local-first through optional backend, data model simple.

**Cross-cutting concerns:**
- state consistency; persistence resilience; error recovery; test coverage.

Does this match your understanding of the project scope and requirements?

### Next step menu

- A: Advanced Elicitation
- P: Party Mode
- C: Continue (save analysis, load step-03-starter)

## Starter Template Evaluation

### Current technical preferences
- Project context suggests a web SPA approach with React/Svelte/Vue. 
- No mandatory framework locked in; MVP requirement calls for lightweight and modular frontend architecture.
- Recommendation: Vite + React + TypeScript for optimum balance of familiarity, ecosystem, and low complexity.
- Accepted enhancement: preserve UI reactivity while designing for roadmap extensibility via API-first modular boundaries.

### Starter candidate chosen for recommendation
- `Vite React TypeScript` starter
- Rationale: low setup friction, up-to-date tooling, works well with functional requirements and NFRs (performance/accessibility/testing).

### Comparative Analysis Matrix (weighted to PRD priorities)

| Criterion | Weight | Vite + React | Next.js | SvelteKit | Nuxt |
|---|---:|---:|---:|---:|---:|
| MVP simplicity (setup + mental overhead) | 25 | 9 | 6 | 8 | 7 |
| Fit with required features (CRUD SPA, local persistence) | 20 | 9 | 8 | 8 | 8 |
| Performance for client-side interactions | 15 | 9 | 8 | 9 | 8 |
| Team familiarity/ecosystem depth | 15 | 9 | 8 | 6 | 7 |
| Future scalability path | 10 | 8 | 9 | 8 | 8 |
| Deployment flexibility/cost simplicity | 10 | 9 | 7 | 8 | 8 |
| Architectural lock-in risk (lower is better) | 5 | 9 | 6 | 8 | 8 |
| Weighted total | 100 | 8.95 | 7.35 | 7.85 | 7.70 |

### Why Vite over Next.js for current scope
- PRD does not require SSR, SEO-first rendering, or server components for MVP.
- Vite provides lower complexity and faster path to a reliable SPA implementation.
- Current NFR focus (responsiveness, maintainability, reliability) is met without Next.js overhead.

### When Next.js should be reconsidered
- SEO-first public pages become important.
- Server-rendered personalization is required.
- Tight backend/frontend coupling with server actions is needed early.
- Rapid shift to auth-heavy, multi-tenant, edge-rendered experiences.

### Recommended Baseline Configuration (accepted)

**Frontend (reactive UI):**
- Vite + React + TypeScript
- React Router
- TanStack Query
- Zustand

**Contracts & validation:**
- Shared Zod schemas between UI and API

**Persistence (local-first + future sync):**
- IndexedDB via Dexie
- Sync adapter abstraction for backend reconciliation

**Backend (future-ready from day one):**
- Fastify (or Express) + Prisma
- PostgreSQL (SQLite acceptable for local development)

**Testing:**
- Vitest + React Testing Library + Playwright

### Future-readiness mapping to PRD roadmap
- Auth + multi-user: user-scoped data model and auth module without frontend rewrite
- Collaboration and live updates: add event/websocket layer behind service interfaces
- Search/filter/sort: API query endpoints plus cache selectors
- Reminders/notifications: background jobs and notification adapters
- AI suggestions: isolated AI service with feature-flagged UI integration

### Architecture decision gates
- SSR/SEO gate: if required, evaluate migration to Next.js
- Multi-tenant/auth gate: if required, harden API boundaries and identity model
- Offline resilience gate: if required, prioritize queue-based sync conflict strategy

### Current versions (verified from Vite docs)
- Vite CLI uses: `npm create vite@latest`
- Node min version: 20.19+ (recommended 22.12+ for up-to-date support)
- Template command: `npm create vite@latest todo-app -- --template react-ts`

### Provided architecture by starter
- Language: TypeScript.
- UI framework: React 18+ (component-based, accessible patterns, hooks).
- Tooling: Vite bundler, fast HMR, optimized production builds.
- Styling: CSS modules or global CSS (can add Tailwind/Design System as next step).
- Testing: easy integration with Vitest + React Testing Library.
- Linting: ESLint + Prettier best practice path.
- Project structure: clean separation `src/components`, `src/state`, `src/services`.

### Backend starter for persistence API (optional MVP)
- Recommendation: Node + Express + SQLite (or JSON file) in a small API sandbox.
- Minimal starter: `npx express-generator --no-view backend` then add SQLite/Prisma model.

### Starter initialization commands
```bash
npm create vite@latest todo-app -- --template react-ts
cd todo-app
npm install
npm run dev
```

### Recommended next step in workflow
- Confirm this starter choice and finalize in architecture decisions.
- Proceed to step-04-decisions after step-03 C selection.

### Step 03 menu
- A: Advanced Elicitation (for starter options deeper analysis)
- P: Party Mode (multiple perspectives for starter trade-offs)
- C: Continue (save this starter selection and proceed to step-04-decisions)

## Core Architectural Decisions

### Decision Importance Analysis

**Critical Decisions (Block Implementation):**
- Frontend baseline: Vite SPA with React and TypeScript.
- State boundary: Zustand for local UI state, TanStack Query for async/server state.
- Persistence strategy: local-first IndexedDB with sync abstraction.
- API contract strategy: REST + shared runtime schemas using Zod.
- Backend baseline: Fastify service with Prisma ORM and PostgreSQL target schema.

**Important Decisions (Shape Architecture):**
- Routing model: React Router route modules.
- Validation model: Zod at transport boundaries with form-domain mapping.
- Security baseline: validation, rate limiting, CORS policy, structured errors.
- Testing pyramid: Vitest unit/component, adapter integration tests, Playwright E2E.
- Observability baseline: structured request logging and health endpoints.

**Deferred Decisions (Post-MVP):**
- Authentication/authorization provider and user tenancy model.
- Real-time collaboration channel (WebSocket/SSE).
- Advanced search indexing and reminder scheduling.
- AI classification/suggestion service.

### Data Architecture

- Client storage: Dexie 4.3.0 (IndexedDB) as local-first persistence.
- Server storage: PostgreSQL via Prisma 7.5.0 (SQLite acceptable for local dev).
- Consistency model: optimistic local writes + outbox sync queue.
- Initial conflict policy: last-write-wins with server timestamps.
- Cache model: TanStack Query 5.90.21 query keys scoped by list/task.

### Authentication & Security

- MVP auth posture: no authentication in MVP per PRD scope.
- API hardening baseline: schema validation, rate limiting, CORS allowlist, secure headers.
- Error envelope: consistent machine-readable code + user-safe message + trace id.
- Data protection: input sanitization and safe rendering, TLS in deployed environments.

### API & Communication Patterns

- API style: REST over JSON with versioned prefix `/api/v1`.
- Resource model: explicit list and todo resources with deterministic sorting semantics.
- Service layering: route -> service -> repository.
- Response standards: stable success/error envelope and typed payloads via shared schemas.

### Frontend Architecture

- Vite 8.0.0
- React 19.2.4
- React Router DOM 7.13.1
- Zustand 5.0.12
- TanStack Query 5.90.21
- Zod 4.3.6

Design principles:
- Feature-first modules and clear UI/domain/service separation.
- Route-level splitting and selective memoization only where measured.
- Accessibility-first interactions (keyboard and focus management).

### Infrastructure & Deployment

- Node line: v24 Active LTS (latest shown: v24.14.0).
- Backend runtime preference: Fastify 5.8.2.
- Alternative backend runtime: Express 5.2.1.
- Test tooling: Vitest 4.1.0 and Playwright 1.58.2.
- CI baseline: lint, typecheck, tests, build, preview deploy.

### Decision Impact Analysis

**Implementation Sequence:**
1. Scaffold frontend and backend workspaces.
2. Define shared schemas and API envelopes.
3. Implement local-first repository and sync queue.
4. Implement CRUD APIs and query invalidation paths.
5. Add end-to-end acceptance coverage.
6. Harden security and observability defaults.

**Cross-Component Dependencies:**
- Schema changes impact API contracts, sync layer, and UI forms.
- Sync conflict policy directly impacts optimistic UI behavior.
- Sorting semantics must remain consistent in API and client selectors.

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

Critical conflict points identified: 10 areas where different AI agents could diverge.

### Naming Patterns

**Database naming conventions:**
- Tables: plural snake_case (todo_lists, todos)
- Columns: snake_case (list_id, created_at)
- Foreign keys: {entity}_id (list_id)
- Indexes: idx_{table}_{column} (idx_todos_list_id)

**API naming conventions:**
- Endpoints: plural nouns with version prefix (/api/v1/todos)
- Route params: :id style
- Query params: camelCase at API boundary
- Headers: standard canonical names; custom headers prefixed with X-App-

**Code naming conventions:**
- Components and types: PascalCase
- Non-component files: kebab-case
- Functions and variables: camelCase
- Constants: UPPER_SNAKE_CASE

### Structure Patterns

**Project organization:**
- Feature-first folders (src/features/lists, src/features/todos)
- Shared modules (src/shared/ui, src/shared/lib, src/shared/api)
- Unit/component tests co-located as *.test.ts(x)
- E2E tests in e2e/

**Server layering:**
- routes -> services -> repositories -> db

### Format Patterns

**API response format:**
- Success: { data, meta? }
- Error: { error: { code, message, traceId, details? } }

**Data exchange standards:**
- JSON field names: camelCase
- Dates: ISO-8601 UTC strings
- Booleans: true/false
- Nulls: explicit null only when semantically required

### Communication Patterns

**Event conventions:**
- Event names: dot-separated lower-case (todo.created)
- Payload: { eventName, version, occurredAt, data }
- Event versioning starts at 1

**State management conventions:**
- TanStack Query owns server/cache state
- Zustand owns local UI/session state
- No duplicated ownership across state stores
- Selector-based store reads in components

### Process Patterns

**Error handling:**
- Validate at transport boundaries with Zod
- Map internal exceptions to stable error codes
- Never leak stack traces to clients
- Log structured errors with traceId and context

**Loading states:**
- Query-driven loading for server data
- Explicit local pending states for mutations
- Skeletons for list pages, spinners for in-place short actions
- Bounded retries with exponential backoff for idempotent requests

### Enforcement Guidelines

**All AI agents MUST:**
- Follow naming and folder conventions exactly
- Use shared success and error envelope formats
- Keep server state in TanStack Query and local state in Zustand
- Validate all contracts with shared Zod schemas
- Add layer-appropriate tests before marking tasks complete

**Pattern enforcement:**
- PR checklist includes naming/structure/format checks
- CI runs lint, typecheck, test suite, and contract checks
- Pattern deviations must be documented in architecture notes before merge

### Pattern Examples

**Good examples:**
- GET /api/v1/todos -> { data: [{ id, text, isDone, createdAt }] }
- Error -> { error: { code: "VALIDATION_ERROR", message, traceId } }
- File path -> src/features/todos/components/TodoItem.tsx

**Anti-patterns:**
- Mixed snake_case and camelCase in the same API payload
- Business logic in route handlers
- Duplicating server data in Zustand and query cache
- Non-versioned or inconsistent endpoint paths

## Project Structure & Boundaries

### Complete Project Directory Structure

```text
todo/
├── README.md
├── package.json
├── pnpm-workspace.yaml
├── .gitignore
├── .editorconfig
├── .env.example
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── quality-gates.yml
├── apps/
│   ├── web/
│   │   ├── package.json
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   ├── public/
│   │   │   └── favicon.svg
│   │   └── src/
│   │       ├── main.tsx
│   │       ├── app/
│   │       │   ├── App.tsx
│   │       │   ├── router.tsx
│   │       │   ├── providers/
│   │       │   │   ├── QueryProvider.tsx
│   │       │   │   └── StoreProvider.tsx
│   │       │   └── error-boundary/
│   │       │       └── AppErrorBoundary.tsx
│   │       ├── features/
│   │       │   ├── lists/
│   │       │   │   ├── components/
│   │       │   │   ├── hooks/
│   │       │   │   ├── store/
│   │       │   │   ├── api/
│   │       │   │   └── tests/
│   │       │   └── todos/
│   │       │       ├── components/
│   │       │       ├── hooks/
│   │       │       ├── store/
│   │       │       ├── api/
│   │       │       └── tests/
│   │       ├── shared/
│   │       │   ├── ui/
│   │       │   ├── lib/
│   │       │   ├── api/
│   │       │   ├── schemas/
│   │       │   └── utils/
│   │       ├── state/
│   │       │   ├── ui-store.ts
│   │       │   └── selectors.ts
│   │       └── assets/
│   └── api/
│       ├── package.json
│       ├── tsconfig.json
│       ├── src/
│       │   ├── server.ts
│       │   ├── app.ts
│       │   ├── config/
│       │   │   ├── env.ts
│       │   │   └── logger.ts
│       │   ├── modules/
│       │   │   ├── lists/
│       │   │   │   ├── routes.ts
│       │   │   │   ├── service.ts
│       │   │   │   ├── repository.ts
│       │   │   │   └── schemas.ts
│       │   │   └── todos/
│       │   │       ├── routes.ts
│       │   │       ├── service.ts
│       │   │       ├── repository.ts
│       │   │       └── schemas.ts
│       │   ├── middleware/
│       │   │   ├── rate-limit.ts
│       │   │   ├── cors.ts
│       │   │   ├── request-id.ts
│       │   │   └── error-handler.ts
│       │   ├── db/
│       │   │   ├── client.ts
│       │   │   └── migrations/
│       │   └── shared/
│       │       ├── response-envelope.ts
│       │       └── error-codes.ts
├── packages/
│   ├── contracts/
│   │   ├── package.json
│   │   └── src/
│   │       ├── todo.schema.ts
│   │       ├── list.schema.ts
│   │       ├── envelopes.ts
│   │       └── index.ts
│   ├── config/
│   │   ├── eslint/
│   │   ├── typescript/
│   │   └── prettier/
│   └── tooling/
│       └── scripts/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── e2e/
│   ├── playwright.config.ts
│   ├── tests/
│   └── fixtures/
└── docs/
  ├── architecture/
  ├── adr/
  └── api/
```

### Architectural Boundaries

**API boundaries:**
- Public REST boundary at /api/v1/lists and /api/v1/todos.
- Boundary contract enforced by shared schemas in packages/contracts.
- Error and success envelope standardized across all endpoints.

**Component boundaries:**
- Feature modules (lists, todos) own UI, hooks, feature API wrappers, and tests.
- Shared UI and utilities live only under shared to avoid cross-feature coupling.
- Router-level boundaries isolate page composition from feature internals.

**Service boundaries:**
- Strict layering in API: routes -> services -> repositories -> db.
- No domain logic in route handlers.
- No direct db calls from routes or middleware.

**Data boundaries:**
- Local-first on web side with IndexedDB adapter boundary.
- Sync boundary between local repository and backend API.
- Persistence schema boundaries centralized in Prisma and contracts package.

### Requirements to Structure Mapping

**Feature mapping:**
- Todo CRUD requirements -> apps/web/src/features/todos + apps/api/src/modules/todos.
- List CRUD and grouping -> apps/web/src/features/lists + apps/api/src/modules/lists.
- Stable ordering and state transitions -> feature service/store modules + api service layer.

**Cross-cutting concerns:**
- Validation -> packages/contracts + module schemas.
- Error handling -> api middleware/error-handler + web app error boundary.
- Performance and caching -> TanStack Query integration in web app providers/hooks.
- Accessibility -> shared UI primitives and feature component tests.

### Integration Points

**Internal communication:**
- Web feature modules communicate via typed hooks and shared contracts.
- API modules communicate only via service interfaces, not cross-repo direct imports.

**External integrations:**
- Future auth provider attaches at api middleware boundary.
- Future notifications and AI services attach through apps/api/src/integrations (reserved extension point).

**Data flow:**
- UI action -> local state/update -> local persistence -> queued sync -> API -> db -> query invalidation -> UI refresh.

### File Organization Patterns

**Configuration files:**
- Root for workspace and CI.
- Per-app configs scoped under apps/web and apps/api.
- Shared lint/ts/prettier presets in packages/config.

**Source organization:**
- Feature-first in web and module-first in API.
- Shared contracts extracted to packages/contracts.

**Test organization:**
- Unit/component tests co-located.
- E2E isolated under e2e for full flow validation.

**Asset organization:**
- App assets in apps/web/src/assets.
- Public static files in apps/web/public.

### Development Workflow Integration

**Development server structure:**
- apps/web runs Vite dev server.
- apps/api runs Fastify server.
- Shared contracts package watched and consumed by both.

**Build process structure:**
- Build contracts first, then api/web.
- Typecheck and tests run at root and app/package scopes.

**Deployment structure:**
- Web can deploy static assets separately.
- API deploys as independent service.
- Clear boundary supports future split scaling.

## Architecture Validation Results

### Coherence Validation ✅

**Decision compatibility:**
- Technology choices are compatible: Vite + React + TanStack Query + Zustand + Zod + Fastify + Prisma.
- Runtime and package version constraints align with modern Node LTS targets.
- Data, API, and state ownership boundaries are explicit and non-overlapping.

**Pattern consistency:**
- Naming, structure, API envelope, and error envelope standards are consistent.
- Validation, loading, retry, and error handling patterns support the chosen stack.

**Structure alignment:**
- Project structure supports feature-first frontend, module-first backend, and shared contracts.
- Integration boundaries match implementation patterns and separation-of-concerns goals.

### Requirements Coverage Validation ✅

**Functional requirements coverage:**
- CRUD, completion toggles, list grouping, deterministic ordering, and persistence are architecturally mapped.
- Empty/loading/error states are supported by component and query patterns.

**Non-functional requirements coverage:**
- Performance: local-first persistence plus query caching and bounded retry strategy.
- Reliability: sync queue abstraction and deterministic error handling.
- Security: schema validation, CORS policy, rate limiting, and secure middleware defaults.
- Accessibility: keyboard-first interactions and shared UI patterns.

**Roadmap readiness:**
- Extensible path for auth, multi-user behavior, collaboration, reminders, and AI-assist features without structural rewrite.

### Implementation Readiness Validation ✅

**Decision completeness:**
- Critical architecture decisions are documented with versions and rationale.
- Cross-component dependencies are captured.

**Structure completeness:**
- Complete project tree and component/service boundaries are defined.
- Integration points and data flow are explicitly mapped.

**Pattern completeness:**
- Major conflict-prone areas (naming, format, process, communication) are specified with examples and anti-patterns.

### Gap Analysis Results

**Critical gaps:**
- None identified that block implementation.

**Important gaps:**
- Add explicit offline conflict resolution policy details in follow-up ADR.
- Define pagination and default list limits for future dataset growth.

**Nice-to-have gaps:**
- Add ADR template and governance checklist under docs/adr.
- Add explicit contract-test harness between API and shared contracts package.

### Validation Issues Addressed

- Resolved stack-selection uncertainty by locking a reactive and extensible baseline.
- Resolved consistency ambiguity through enforced naming/format/state ownership patterns.
- Resolved structural ambiguity through explicit module boundaries and integration points.

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped

**✅ Architectural Decisions**
- [x] Critical decisions documented with versions
- [x] Technology stack fully specified
- [x] Integration patterns defined
- [x] Performance considerations addressed

**✅ Implementation Patterns**
- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Communication patterns specified
- [x] Process patterns documented

**✅ Project Structure**
- [x] Complete directory structure defined
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** high

**Key Strengths:**
- Clear separation of concerns with strong consistency controls.
- Reactive UI architecture with local-first reliability.
- Scalable boundaries for post-MVP expansion.

**Areas for Future Enhancement:**
- Conflict-resolution policy formalization for sync edge cases.
- Contract-test automation depth.

### Implementation Handoff

**AI Agent Guidelines:**
- Follow architectural decisions and patterns exactly.
- Keep server/cache state in TanStack Query and local UI/session state in Zustand.
- Enforce shared Zod contracts for request/response boundaries.
- Respect module boundaries and documented structure.

**First Implementation Focus:**
- Scaffold apps and shared contracts package, then establish API envelopes and schema contracts before feature coding.
