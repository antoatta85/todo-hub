---
stepsCompleted:
  - step-01-init
  - step-02b-vision
  - step-02c-executive-summary
  - step-03-success
  - step-04-journeys
  - step-05-domain
  - step-06-innovation
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
inputDocuments:
  - /Users/antonioattanasio/Desktop/aine/bmad/todo/_bmad-output/project-context.md
workflowType: 'prd'
projectName: todo
userName: Antonio
date: 2026-03-16
classification:
  projectType: web_app
  domain: general
  complexity: low
  projectContext: greenfield
---

# Product Requirements Document - todo

**Author:** Antonio
**Date:** 2026-03-16

## Executive Summary

Todo is a greenfield web app in the general productivity domain, designed for low-complexity, high-leverage task management. It focuses on a mobile-first, lightweight interface that supports multiple independent lists (with an optional global category view), fast task entry, and persistent storage through a well-defined backend API. The core user problem is reducing friction for task capture and progress flow: users need a streamlined tool where tasks are visible, important, and easily managed without losing context when completed.

### What Makes This Special

The product is special because it combines clarity with controlled focus. Task groups support named lists that persist, archive, and delete. Users can mark up to four important tasks per list, with important tasks always displayed at the top and visually highlighted. Incomplete tasks are shown before completed tasks; completed tasks remain visible and are moved to the bottom, supporting accountability while keeping focus on remaining work. The design is intentionally minimal, fast, and accessible with both touch and keyboard interactions (spacebar toggles done/undone).

## Project Classification

- Project Type: web_app
- Domain: general
- Complexity: low
- Project Context: greenfield

## User Journeys

### Primary User - Marco (Core Experience)

Marco is a busy consultant using his phone to manage tasks across client work and personal errands.

- Opening scene: Marco opens the app quickly, sees empty state in a clean light interface.
- Rising action: Marco creates "Client work" list and "Personal" list, adds 8 tasks, flags 3 as important.
- Climax: Marco marks first tasks completed; completed tasks remain visible in bottom section, with incomplete + important tasks still on top. He confirms that the mobile gestures and spacebar shortcut are smooth.
- Resolution: Marco closes the app with a sense of control, his lists are persisted; on refresh, all tasks reload immediately.

This journey reveals requirements:
- quick list creation and naming
- important pinning and limits
- sorted list state with incomplete/important/completed ordering
- persistence and immediate reload from backend + local storage

### Primary User Edge Case - Anna (Decision Reversal)

Anna is a project lead who needs to reprioritize rapidly during a meeting.

- Opening scene: Anna enters her "Sprint" list on desktop.
- Rising action: she flags 4 tasks as important, then needs to promote a 5th task.
- Climax: system rejects 5th important task with clear message and suggests removing an existing important.
- Resolution: Anna unflags one task, flags the new 5th, then completes a task. Completed task is sent to bottom and loses important.

This confirms requirements:
- 2-way important toggle with reject logic and user message
- clear status management for completed tasks
- interaction constraints (max 4 priorities)

### Secondary User - Support Operator

Support operator Jo needs to reproduce issues reported in the system without requiring user accounts (single-user context, later extensible for per-user operations).

- Opening scene: Jo opens internal diagnostics or local logs that are tied to the current installation and list data state.
- Rising action: Jo finds information about list changes and deleted tasks, then validates what happened during a session.
- Climax: Jo confirms that the deleted/non-restored item is marked as removed and can explain behavior.
- Resolution: Jo provides guidance to the end-user on expected behavior and verifies if data persistence worked correctly.

This suggests requirements:
- historical state for deletion/inactivation
- clear semantics for archive/delete actions
- support telemetry/logging in backend API.

### API consumer journey

- Opening scene: Developer uses the API docs to integrate tasks into an external dashboard.
- Rising action: Developer posts tasks to `POST /api/v1/todos`, patches important on a task, and gets list sorted accordingly.
- Climax: Developer writes feature to renders both per-list and global views with list tags.
- Resolution: API works as expected, enabling future cross-tool workflows.

This requires:
- stable backend CRUD API, contracts (GET/POST/PATCH/DELETE)
- explicit sort order semantics in API response (important/incomplete/completed)

### Journey Requirements Summary

- UX: instant item operations, clear state transitions, intuitive important manager, mobile+keyboard
- Persistence: durable backend with local cache and post-crash recovery
- Usability: helpful errors for rules, confirm delete workflows, hide completed toggle
- QA: success and edge cases for important limits, toggles, alphabetical vs order, list archiving


## Success Criteria

### User Success

- 90% of users can open app, add a new task, mark important, and create a new list in one session.
- Aha moment: users prioritize tasks and see them pinned to the top in a clear, lightweight view.
- Users can mark tasks completed and observe completed tasks move to bottom without disappearing.

### Business Success

- Users create multiple lists and use task completion to track progress (meaning task count in lists increases and tasks are being completed).
- Users use important flags actively (important flag toggles used in >= 70% of sessions).
- Success is measured by engagement: active lists per user and task completion rate over 7 days.

### Technical Success

- Load tasks from storage in <200ms for 10 lists with 30 tasks each.
- Sync each action (add/update/delete/toggle) with persistence backend in <200ms.
- Persistent recovery: data must be restored after browser restart/crash with no lost tasks.
- Unit test coverage for core task logic target >= 98%, including prioritization and completion flow.

### Measurable Outcomes

- 90% first-session task action completion rate.
- 70% of users with at least one important task in the first 7 days.
- 80% retention of users who create at least one list, after 14 days.

## Product Scope

### MVP - Minimum Viable Product

- CRUD tasks in independent lists (create, read, update, delete).
- Prioritize up to 4 tasks per list, with clear UI pinned to top.
- Incomplete-first, completed-bottom list sorting; completed tasks retained and visible.
- Mobile-first interface with keyboard spacebar support.
- Backend CRUD API and local persistence for reliability.
- Hide completed toggle + delete completed with confirmation.

### Growth Features (Post-MVP)

- Undo delete with time-bound toast.
- Drag-and-drop reorder tasks/lists.
- Global search and filters across lists.
- Collaboration / share list read-only link.

### Vision (Future)

- Multi-user sync and cross-device collaboration.
- Advanced scheduling, reminders, and smart prioritization suggestions.
- AI-assisted task classification and goal setting.

## Domain-Specific Requirements

Since this project is classified as general domain with low complexity, the domain-specific requirements are minimal and focus on universally good practices for web productivity apps:

### Compliance & Regulatory
- No specific industry compliance required for MVP (non-regulated consumer productivity domain).
- Adhere to general privacy best practices and local data handling rules.

### Technical Constraints
- Strong data durability for local+backend persistence (auto-recover from crash/restart).
- Basic security hygiene (HTTPS, input sanitization, no user authentication required in MVP).

### Integration Requirements
- A stable backend CRUD API with explicit sorting semantics and conflict-handling contracts.

### Risk Mitigations
- Avoid premature access-control complexity by deferring auth/user accounts to later phases.
- Ensure offline-resilience fallback (local storage) to satisfy persistence requirements.
- Add logging/telemetry for support scenarios without user-specific identity information.

## Web App Specific Requirements

### Project-Type Overview

This product is a web_app with SPA/PWA behavior that prioritizes mobile-first responsive UX, accessibility, and fast local+backend task persistence. It explicitly avoids authentication in MVP while still offering durable user data handling.

### Technical Architecture Considerations

- Single Page Application architecture (React/Svelte/Vue or similar) with client-side routing for list navigation.
- Backend CRUD API as defined by the initial PRD contracts (`GET /api/v1/todos`, `POST /api/v1/todos`, `PATCH /api/v1/todos/:id`, `DELETE /api/v1/todos/:id`).
- Local persistence layer (IndexedDB or localStorage) for instant availability and crash recovery.
- UI state hydration from cache and backend upon load; changes are optimistic with reconciliation.
- Accessibility and performance patterns aligned with WCAG AA and 200ms operation targets.

### Implementation Considerations

- Platform support: modern desktop and mobile browsers (Chrome, Safari, Firefox, Edge).
- Data format: JSON API payloads with fields id/text/isDone/important/createdAt/updatedAt.
- Error handling: clear user messaging for persistence failures and important limit rejections.
- Backend considerations: idempotent updates and explicit sort order in API responses for important/incomplete/completed states.
- Skip sections: SEO strategies are optional and not required for MVP.

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Problem-solution fit MVP for a lean productivity tool. Focus on validated user value via quick task entry, important controls, and durable persistence.
**Resource Requirements:** Small cross-functional team (1 PM, 1 designer, 2 FE engineers, 1 BE engineer, 1 QA) for a 6-8 week initial cycle.

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:**
- Create/manage independent todo lists
- Add/edit/delete tasks with check/uncheck behavior
- Set important up to 4 tasks per list
- Sort: important first, then incomplete, then completed
- Persist tasks across app reload/crash via local storage + backend API
- Mobile-first UI with keyboard support (spacebar toggle)

**Must-Have Capabilities:**
- CRUD list + tasks
- Important limit enforcement with user feedback
- Completed tasks non-destructive reorder
- Hide completed toggle
- Delete completed confirmation
- Basic accessibility, responsive design

### Post-MVP Features

**Phase 2 (Post-MVP):**
- Undo delete toast
- Drag-and-drop reorder tasks/lists
- Global search across lists
- List sharing or export

**Phase 3 (Expansion):**
- Multi-user sync and cross-device support
- Reminders and scheduling
- AI-assisted prioritization suggestions

### Risk Mitigation Strategy

**Technical Risks:**
- VP: important max logic and sync ordering. Mitigation: implement with unit tests and clear deterministic sorted model.
- backend persistence latency: Mitigation: local optimistic updates + background sync.

**Market Risks:**
- VP: user adoption if not clearly better than existing tools. Mitigation: ensure killer feature (important deck) and fast flow via usability tests.

**Resource Risks:**
- limited team bandwidth: Mitigation: focus MVP on core use cases and high-frequency tasks; use simple tech stack.

## Functional Requirements

- FR1: User can create a new todo list with a custom name.
- FR2: User can edit the name of an existing todo list.
- FR3: User can archive a todo list.
- FR4: User can delete a todo list with confirmation.
- FR5: User can switch between lists and a global combined view tagged by list name.
- FR6: User can add a new task to a selected todo list.
- FR7: User can edit an existing task's text.
- FR8: User can delete a task with confirmation in the task list.
- FR9: User can toggle a task between completed and incomplete.
- FR10: Completed tasks remain visible but are displayed in the completed section at the bottom.
- FR11: User can mark/unmark a task as important (up to 4 per list).
- FR12: The system prevents marking a 5th important task and shows a clear message.
- FR13: Important tasks are shown at the top of the list with visual distinction.
- FR14: Task sorting is: important tasks, then incomplete tasks, then completed tasks.
- FR15: When an item is marked completed, it loses important state.
- FR17: User can hide/show completed tasks via a toggle.
- FR18: User can delete all completed tasks in a list with explicit confirmation.
- FR19: User can use keyboard interactions, including spacebar to toggle task completion.
- FR20: Mobile swipe gestures are supported for hide and removal actions only.
- FR21: Application persists list and task state in local storage for offline resilience.
- FR22: Application synchronizes CRUD operations with backend API endpoints.
- FR23: Application restores state after browser restart/crash with no lost tasks.
- FR24: API endpoints include GET /api/v1/todos, POST /api/v1/todos, PATCH /api/v1/todos/:id, DELETE /api/v1/todos/:id.
- FR25: Data model fields include id, text, isDone, important, createdAt, updatedAt.

## Non-Functional Requirements

### Performance
- NFR1: Loading 10 lists with 30 tasks each completes in < 200ms.
- NFR2: Sync operations (add/update/delete/toggle) complete in < 200ms.

### Security
- NFR3: All API traffic uses HTTPS.
- NFR4: Task input is sanitized to prevent XSS, and no sensitive data is stored in local storage.

### Reliability
- NFR5: Application restores state after browser restart/crash with no lost tasks.
- NFR6: Retry sync operations automatically up to 3 times with exponential backoff on transient backend failures.

### Accessibility
- NFR7: The interface is mobile-first responsive, keyboard-accessible, and meets WCAG AA contrast guidelines.
- NFR8: Screen reader announcements for task create/complete/delete actions.

### Quality
- NFR9: Core todo task logic has unit tests with coverage >= 98%.
- NFR10: Integration tests cover primary and edge user journeys (creating, prioritizing, and completing tasks).
