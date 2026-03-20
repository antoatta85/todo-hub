---
stepsCompleted: [step-01-validate-prerequisites]
inputDocuments:
  - /Users/antonioattanasio/Desktop/aine/bmad/todo/_bmad-output/planning-artifacts/prd.md
  - /Users/antonioattanasio/Desktop/aine/bmad/todo/_bmad-output/planning-artifacts/prd_executive_draft.md
  - /Users/antonioattanasio/Desktop/aine/bmad/todo/_bmad-output/planning-artifacts/prd_scoping_draft.md
  - /Users/antonioattanasio/Desktop/aine/bmad/todo/_bmad-output/planning-artifacts/architecture.md
  - /Users/antonioattanasio/Desktop/aine/bmad/todo/_bmad-output/planning-artifacts/ux-design-specification.md
---

# TodoHub - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for TodoHub, decomposing the requirements from the PRD, UX Design, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: User can create a new todo list with a custom name.
FR2: User can edit the name of an existing todo list.
FR3: User can archive a todo list.
FR4: User can delete a todo list with confirmation.
FR5: User can switch between lists and a global combined view tagged by list name.
FR6: User can add a new task to a selected todo list.
FR7: User can edit an existing task's text.
FR8: User can delete a task with confirmation in the task list.
FR9: User can toggle a task between completed and incomplete.
FR10: Completed tasks remain visible but are displayed in the completed section at the bottom.
FR11: User can mark/unmark a task as important (up to 4 per list).
FR12: The system prevents marking a 5th important task and shows a clear message.
FR13: Important tasks are shown at the top of the list with visual distinction.
FR14: Task sorting is: important tasks, then incomplete tasks, then completed tasks.
FR15: When an item is marked completed, it loses important state.
FR17: User can hide/show completed tasks via a toggle.
FR18: User can delete all completed tasks in a list with explicit confirmation.
FR19: User can use keyboard interactions, including spacebar to toggle task completion.
FR20: Mobile swipe gestures are supported for hide and removal actions only.
FR21: Application persists list and task state in local storage for offline resilience.
FR22: Application synchronizes CRUD operations with backend API endpoints.
FR23: Application restores state after browser restart/crash with no lost tasks.
FR24: API endpoints include GET /api/v1/todos, POST /api/v1/todos, PATCH /api/v1/todos/:id, DELETE /api/v1/todos/:id.
FR25: Data model fields include id, text, isDone, important, createdAt, updatedAt.

### NonFunctional Requirements

NFR1: Loading 10 lists with 30 tasks each completes in < 200ms.
NFR2: Sync operations (add/update/delete/toggle) complete in < 200ms.
NFR3: All API traffic uses HTTPS.
NFR4: Task input is sanitized to prevent XSS, and no sensitive data is stored in local storage.
NFR5: Application restores state after browser restart/crash with no lost tasks.
NFR6: Retry sync operations automatically up to 3 times with exponential backoff on transient backend failures.
NFR7: The interface is mobile-first responsive, keyboard-accessible, and meets WCAG AA contrast guidelines.
NFR8: Screen reader announcements for task create/complete/delete actions.
NFR9: Core todo task logic has unit tests with coverage >= 98%.
NFR10: Integration tests cover primary and edge user journeys (creating, prioritizing, and completing tasks).

### Additional Requirements

- SPA architecture with client-side routing (React/Svelte/Vue or equivalent).
- Local persistence via IndexedDB/localStorage; optional backend Node/Express + SQLite/JSON.
- No auth required for MVP; single-user context.
- Optimistic UI updates with eventual consistency for persistence.
- Avoid large data volumes in MVP; focus on up to 500 items with strong responsiveness.
- Data consistency across in-memory state, local storage, and backend API.
- Error handling with user-friendly messages and retry behavior.
- Accessibility and performance together (keyboard-first, screen-reader labels, mobile-first responsive design).
- Testability for the full data flow (unit + integration for persistence interfaces).
- Vite + React + TypeScript starter template recommended.
- IndexedDB via Dexie for local persistence; sync adapter abstraction for backend reconciliation.
- Fastify (or Express) + Prisma for backend; PostgreSQL or SQLite for storage.
- Vitest + React Testing Library + Playwright for testing.
- ESLint + Prettier for code quality.
- Clean separation of src/components, src/state, src/services.

### UX Design Requirements

UX-DR1: Implement Tailwind CSS design tokens for semantic colors, spacing, typography, and motion.
UX-DR2: Build reusable UI primitives: Button, Input, Checkbox, Tabs/List switcher, Badge/Important chip, Card/List item, Modal/Confirm dialog, Toast.
UX-DR3: TaskRow component with status circle, task text, source-list badge (merged only), important highlight shell, and accessibility support.
UX-DR4: MultiSelectListChips for fast list filtering and merged-list creation, with accessible multi-select semantics.
UX-DR5: ListsManagementControl for list administration (create, rename, reorder, archive, delete) with accessible dialogs.
UX-DR6: TaskActionMenu for secondary task actions (Edit, Move, Mark/Unmark Important, Duplicate, Delete) with mobile long-press and browser 3-dot triggers.
UX-DR7: MergedSourceBadge for task provenance in merged-list mode, with accessible labeling.
UX-DR8: PriorityGroupContainer to group important active tasks at the top, with region labeling for accessibility.
UX-DR9: Ensure all components and flows meet accessibility standards: keyboard/touch operability, focus rings, ARIA labels, and WCAG AA contrast.
UX-DR10: Visual design foundation: grayscale paper-pen aesthetic, teal accent, Inter typeface, 8px spacing scale, 10px/14px radii.
UX-DR11: Mobile-first layout and interaction patterns, with desktop parity and platform-adaptive action triggers.
UX-DR12: Deterministic sorting and state transitions for all task and list operations.

### FR Coverage Map

- FR1-FR5 -> Epic 1 (Stories 1.1-1.5)
- FR6-FR10 -> Epic 2 (Stories 2.1-2.5)
- FR11-FR15 -> Epic 3 (Stories 3.1-3.3)
- FR17-FR20 -> Epic 4 (Stories 4.1-4.4)
- FR21-FR25 -> Epic 5 (Stories 5.1-5.4)
- NFR coverage and cross-cutting quality checks are addressed in Story x.5/x.6/x.7 QA stories and enabling tracks.

## Epic List

User-facing delivery epics are Epic 1 through Epic 5.

### Epic 1: List Management & Organization
Users can create, edit, archive, delete, and switch between todo lists, including a global combined view. QA: Unit tests, integration tests, accessibility checks, AI documentation.
**FRs covered:** FR1, FR2, FR3, FR4, FR5

#### Story 1.1: Create a New Todo List
As a user,
I want to create a new todo list with a custom name,
So that I can organize my tasks by context or project.

**Acceptance Criteria:**
- Given the user is on list management and enters a valid custom list name, when they confirm create, then the new list is created and appears immediately in list navigation.

#### Story 1.2: Edit the Name of an Existing Todo List
As a user,
I want to edit the name of an existing todo list,
So that I can update or correct list names as needed.

**Acceptance Criteria:**
- Given an existing list is selected, when the user submits a new valid name, then the list name is updated and reflected immediately in the UI.

#### Story 1.3: Archive a Todo List
As a user,
I want to archive a todo list,
So that I can hide lists I no longer need without deleting them.

**Acceptance Criteria:**
- Given an active list exists, when the user archives that list, then it is removed from active list views and its data remains available for later retrieval.

#### Story 1.4: Delete a Todo List with Confirmation
As a user,
I want to delete a todo list with a confirmation step,
So that I can permanently remove lists I no longer need and avoid accidental deletion.

**Acceptance Criteria:**
- Given an existing list is selected, when the user chooses delete and confirms the warning dialog, then the list is permanently removed from the app.

#### Story 1.5: Switch Between Lists and Global Combined View
As a user,
I want to switch between individual lists and a global combined view,
So that I can focus on a single context or see all my tasks at once.

**Acceptance Criteria:**
- Given at least two lists exist, when the user switches between a single-list view and combined view, then tasks are displayed for the selected mode with source-list tagging in combined view.

#### Story 1.6: Accessibility and QA for List Management
As a QA engineer,
I want to verify accessibility and write unit/integration tests for list management features,
So that the app is robust and usable by everyone.

**Acceptance Criteria:**
- Given list management features are implemented, when QA runs unit and integration tests plus accessibility checks, then test results are recorded and WCAG AA compliance issues are surfaced for remediation.


### Epic 2: Task Core Experience
Users can add, edit, delete, and toggle tasks between active and completed, with completed tasks visible and sorted at the bottom. QA: Unit tests, integration tests, E2E tests, accessibility, performance, AI documentation.
**FRs covered:** FR6, FR7, FR8, FR9, FR10


#### Story 2.1: Add a New Task to a Selected Todo List
As a user,
I want to add a new task to a selected todo list,
So that I can capture tasks as they arise.

**Acceptance Criteria:**
- Given a target list is selected (or explicitly chosen in merged view), when the user submits a new task, then the task is created in that list and appears in its active section.

#### Story 2.2: Edit an Existing Task
As a user,
I want to edit the text of an existing task,
So that I can correct or update my tasks as needed.

**Acceptance Criteria:**
- Given an existing task is visible, when the user edits task text and saves, then the updated text is shown immediately and persisted.

#### Story 2.3: Delete a Task with Confirmation
As a user,
I want to delete a task with a confirmation step,
So that I can remove tasks I no longer need and avoid accidental deletion.

**Acceptance Criteria:**
- Given an existing task is visible, when the user selects delete and confirms the action, then the task is permanently removed from the app.

#### Story 2.4: Toggle Task Completion
As a user,
I want to mark a task as completed or incomplete,
So that I can track which tasks are done and which are still pending.

**Acceptance Criteria:**
- Given a task exists in active or completed state, when the user toggles completion (checkbox or keyboard), then the task state changes and it moves to the appropriate section.

#### Story 2.5: Display Completed Tasks at the Bottom
As a user,
I want completed tasks to remain visible but be displayed at the bottom of the list,
So that I can review what I have finished without cluttering my active tasks.

**Acceptance Criteria:**
- Given a list contains completed items, when the list is rendered or refreshed, then completed tasks are displayed in a separate section at the bottom and are visually distinct from active tasks.

#### Story 2.6: Accessibility and QA for Task Core Experience
As a QA engineer,
I want to verify accessibility and write unit/integration/E2E tests for task core features,
So that the app is robust, accessible, and reliable.

**Acceptance Criteria:**
- Given task core features are implemented, when QA executes unit, integration, and E2E suites with accessibility checks, then coverage results are documented and WCAG AA issues are identified for remediation.

#### Story 2.7: Performance and AI Documentation for Task Core Experience
As a developer,
I want to ensure task operations are performant and document AI/agent usage,
So that the app remains responsive and implementation learnings are captured.

**Acceptance Criteria:**
- Given a dataset of up to 300 tasks, when performance tests run add, edit, delete, and toggle operations, then each operation completes in <200ms.
- And Project documentation includes a log of AI/agent usage, effective prompts, and limitations encountered for task core features.

### Epic 3: Important Task Workflow

Users can mark/unmark tasks as important (up to 4 per list), see important tasks visually grouped at the top, and experience sorting and state transitions for important tasks. QA: Unit tests, integration tests, E2E tests, accessibility, security review, AI documentation.
**FRs covered:** FR11, FR12, FR13, FR14, FR15

#### Story 3.1: Mark/Unmark a Task as Important
As a user,
I want to mark or unmark a task as important (up to 4 per list),
So that I can highlight my most critical tasks for quick access.

**Acceptance Criteria:**
- Given a list has fewer than 4 important incomplete tasks, when the user marks an incomplete task as important, then the task is flagged important and included in the important group.
- And The user can unmark an important task at any time.
- And If the user attempts to mark a 5th task as important, the system prevents the action and displays a clear message.

#### Story 3.2: Display Important Tasks at the Top
As a user,
I want important tasks to be visually grouped at the top of each list,
So that I can easily find and focus on my most important tasks.

**Acceptance Criteria:**
- Given a list has both important and non-important active tasks, when the list is rendered, then important tasks are grouped at the top and visually distinct from other tasks.
- And The important group is clearly labeled and accessible for screen readers.

#### Story 3.3: Sorting and State Transitions for Important Tasks
As a user,
I want important tasks to be sorted above other incomplete tasks, and lose important status when completed,
So that my task list remains organized and reflects current priorities.

**Acceptance Criteria:**
- Given tasks include important, incomplete, and completed states, when sorting is applied, then ordering is important tasks first, other incomplete tasks second, and completed tasks last.
- And When a task is marked as completed, it automatically loses its important status and moves to the completed section.

#### Story 3.4: Visual and Accessibility Enhancements for Important Tasks
As a designer,
I want important tasks to have a distinct visual style and accessible labeling,
So that all users can easily identify and interact with important tasks.

**Acceptance Criteria:**
- Given important-task visual styles are implemented, when UI accessibility and contrast checks are run, then important tasks show a distinct badge/highlight and meet WCAG AA contrast requirements.
- And ARIA labels and region labeling are provided for important task groups.

#### Story 3.5: QA, Security, and AI Documentation for Important Task Workflow
As a QA engineer,
I want to verify the important task workflow with automated tests, security review, and AI/agent documentation,
So that the feature is robust, secure, and implementation learnings are captured.

**Acceptance Criteria:**
- Given important-task features are implemented, when QA runs unit, integration, and E2E suites for important workflows, then test coverage and failures are documented.
- And Security review confirms no privilege escalation or data leakage via important task logic.
- And Project documentation includes a log of AI/agent usage, effective prompts, and limitations encountered for important task features.

### Epic 4: Completion & Cleanup

Users can hide/show completed tasks, delete all completed tasks with confirmation, and use mobile/keyboard gestures for task actions. QA: Unit tests, E2E tests, accessibility, performance, AI documentation.
**FRs covered:** FR17, FR18, FR19, FR20

#### Story 4.1: Hide/Show Completed Tasks
As a user,
I want to hide or show completed tasks via a toggle,
So that I can focus on active tasks or review completed ones as needed.

**Acceptance Criteria:**
- Given completed tasks exist in a list or merged view, when the user toggles "Hide completed", then completed tasks are hidden or shown accordingly.
- And The toggle state is persisted per user session.

#### Story 4.2: Delete All Completed Tasks with Confirmation
As a user,
I want to delete all completed tasks in a list with explicit confirmation,
So that I can clean up finished work without risk of accidental data loss.

**Acceptance Criteria:**
- Given one or more completed tasks exist in the current list, when the user selects "Delete completed" and confirms, then only completed tasks are permanently removed.
- And Deleted tasks are permanently removed and cannot be recovered.

#### Story 4.3: Keyboard Interactions for Task Actions
As a user,
I want to use keyboard shortcuts (e.g., spacebar to toggle completion) for task actions,
So that I can work efficiently without relying on the mouse.

**Acceptance Criteria:**
- Given keyboard focus is within the task list, when the user uses documented keyboard shortcuts, then completion toggle, navigation, and supported task actions execute without mouse input.
- And All keyboard interactions are accessible and documented in the UI.

#### Story 4.4: Mobile Swipe Gestures for Hide and Removal
As a mobile user,
I want to use swipe gestures to hide or remove tasks,
So that I can quickly manage tasks on touch devices.

**Acceptance Criteria:**
- Given the user is on a supported touch device, when they perform the configured swipe gesture on a task row, then the mapped hide or remove action is triggered.
- And Gestures are intuitive, accessible, and do not interfere with other actions.

#### Story 4.5: QA, Performance, and AI Documentation for Completion & Cleanup
As a QA engineer,
I want to verify completion and cleanup features with automated tests, performance checks, and AI/agent documentation,
So that the app is robust, fast, and implementation learnings are captured.

**Acceptance Criteria:**
- Given completion and cleanup features are implemented, when QA runs unit and E2E suites plus performance checks, then results confirm behavior and performance targets or produce actionable defects.
- And Performance checks confirm that bulk deletion and toggling complete in <200ms for up to 300 tasks.
- And Project documentation includes a log of AI/agent usage, effective prompts, and limitations encountered for completion and cleanup features.

### Epic 5: Persistence & Reliability

Users benefit from offline resilience, backend sync, state restoration after crash/restart, and robust API/data model. QA: Integration tests, E2E tests, performance, security review, AI documentation.
**FRs covered:** FR21, FR22, FR23, FR24, FR25

#### Story 5.1: Persist List and Task State Locally
As a user,
I want my lists and tasks to be saved in local storage or IndexedDB,
So that I never lose my data, even when offline or after a browser restart.

**Acceptance Criteria:**
- Given local persistence is enabled and lists/tasks exist, when the user closes and reopens the browser, then all lists and tasks are restored from local storage/IndexedDB.
- And No data is lost during normal or abnormal browser closure.

#### Story 5.2: Synchronize CRUD Operations with Backend API
As a user,
I want all changes to lists and tasks to sync with the backend API,
So that my data is consistent and available across devices.

**Acceptance Criteria:**
- Given backend API connectivity is available, when the user performs create, read, update, or delete operations, then each operation is synchronized with backend endpoints.
- And Sync operations are optimistic and retried up to 3 times on transient failures.

#### Story 5.3: Restore State After Crash or Restart
As a user,
I want the app to restore my lists and tasks after a crash or restart,
So that I can continue where I left off without losing progress.

**Acceptance Criteria:**
- Given the application terminates unexpectedly, when the user relaunches the app, then the last persisted list and task state is restored without data loss.

#### Story 5.4: Robust API and Data Model
As a developer,
I want a robust API and data model for lists and tasks,
So that the backend is reliable, secure, and easy to maintain.

**Acceptance Criteria:**
- Given the API service is running, when clients call todo CRUD endpoints, then GET, POST, PATCH, and DELETE operations respond with the documented contract.
- And Data model includes id, text, isDone, important, createdAt, updatedAt fields.
- And All API traffic uses HTTPS and input is sanitized to prevent XSS.

#### Story 5.5: QA, Performance, Security, and AI Documentation for Persistence & Reliability
As a QA engineer,
I want to verify persistence and reliability features with automated tests, performance and security checks, and AI/agent documentation,
So that the app is robust, secure, and implementation learnings are captured.

**Acceptance Criteria:**
- Given persistence and reliability features are implemented, when QA executes integration and E2E suites with performance and security checks, then results verify requirements or identify actionable defects.
- And Performance checks confirm that loading 10 lists with 30 tasks each completes in <200ms.
- And Security review confirms no sensitive data is stored in local storage and all input is sanitized.
- And Project documentation includes a log of AI/agent usage, effective prompts, and limitations encountered for persistence and reliability features.

### Enabling Track 2: Containerization & Deployment (formerly Epic 6)

Containerize frontend and backend with Dockerfiles and docker-compose. Implement health checks, environment config, and deployment QA. Document AI-assisted containerization and limitations according to the AI Documentation Guidelines (see Epic 0).
**Tasks covered:** Dockerfiles, docker-compose, health checks, environment config, deployment QA, AI/agent log

#### Story 6.1: Containerize Frontend with Docker
As a developer,
I want to containerize the frontend application using Docker,
So that it can be built, tested, and deployed consistently across environments.

**Acceptance Criteria:**
- Given frontend source code and Docker are available, when the frontend image is built and run, then a working Dockerfile supports local development and production builds.
- And The container runs the frontend app and exposes the correct port.

#### Story 6.2: Containerize Backend with Docker
As a developer,
I want to containerize the backend API using Docker,
So that it can be built, tested, and deployed consistently across environments.

**Acceptance Criteria:**
- Given backend source code and Docker are available, when the backend image is built and run, then a working Dockerfile supports local development and production builds.
- And The container runs the backend API and exposes the correct port.

#### Story 6.3: Compose Services with docker-compose
As a developer,
I want to use docker-compose to orchestrate frontend, backend, and database containers,
So that the entire stack can be started and managed with a single command.

**Acceptance Criteria:**
- Given frontend, backend, and database service definitions exist, when docker-compose is started, then docker-compose.yml orchestrates all services and networking successfully.
- And All services start and communicate correctly with a single command.

#### Story 6.4: Implement Health Checks and Environment Configuration
As a DevOps engineer,
I want to implement health checks and environment variable configuration for all containers,
So that deployments are reliable and issues are detected early.

**Acceptance Criteria:**
- Given containerized services are configured, when health checks and environment variables are applied, then frontend, backend, and database expose health status and documented environment configuration.
- And Environment variables are managed securely and documented for all services.

#### Story 6.5: QA, Deployment, and AI Documentation for Containerization
As a QA engineer,
I want to verify containerization and deployment with automated tests, deployment QA, and AI/agent documentation,
So that the stack is robust, easy to deploy, and implementation learnings are captured.

**Acceptance Criteria:**
- Given the container stack is configured, when deployment smoke tests and health-check tests are executed, then containerized deployment behavior is validated and defects are reported.
- And Deployment QA confirms all services work together in containers.
- And Project documentation includes a log of AI/agent usage, effective prompts, and limitations encountered for containerization and deployment.


### Enabling Track 1: Project Setup & QA Integration (formerly Epic 0)

### Story 0.1: Initialize Project Structure
As a developer,
I want to scaffold the frontend, backend, and test directories using AI assistance,
So that the project has a clear, maintainable structure from day one.

**Acceptance Criteria:**
- Given an empty repository and Node 20+ are available, When the developer runs `npm create vite@latest todo-app -- --template react-ts`, Then a TypeScript React starter application is created successfully.
- And Given the starter app is created, When the initial project structure is prepared, Then the workspace contains explicit frontend, backend, and tests directories following the agreed modular layout.
- And Given project dependencies are not yet installed, When the developer runs `npm install` and `npm run dev` in the frontend app, Then the development server starts without build errors.
- And Given baseline quality tooling is required, When project scripts are reviewed, Then lint, test, and build scripts are present and executable.

### Story 0.2: Set Up Test Infrastructure
As a QA engineer,
I want to configure unit, integration, and E2E test frameworks (Vitest/Jest, Playwright),
So that tests can be written and run from the start.

**Acceptance Criteria:**
- Given the repository includes required test dependencies, when the engineer configures Vitest/Jest and Playwright plus test scripts, then unit, integration, and E2E test folders and runnable scripts are available.

### Story 0.3: Document AI Integration and Agent Usage
As a project owner,
I want to maintain an AI/agent log documenting agent usage, prompts, MCP server usage, test generation, debugging, and limitations,
So that the implementation process is transparent and learnings are captured.

**Acceptance Criteria:**
- Given AI-assisted implementation work is performed, when the project owner updates the AI/agent log after each session, then documentation records agent usage, prompts, MCP usage, generated tests, debugging cases, and known limitations.

