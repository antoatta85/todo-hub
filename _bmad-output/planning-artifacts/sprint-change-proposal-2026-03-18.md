# Sprint Change Proposal

**Date:** 2026-03-18
**Project:** todo
**Mode:** Incremental
**Trigger:** Implementation readiness assessment identified cross-artifact inconsistencies and epic-quality defects that should be corrected before Sprint Planning.

## 1. Issue Summary

A pre-implementation readiness review found six approved correction areas:
- Domain terminology drift across artifacts (important vs important)
- API contract path mismatch (/api/todos vs /api/v1/*)
- Interaction mismatch risk (swipe requirement vs long-press pattern)
- Technical milestone epics framed as user-value epics (Epic 0 and Epic 6)
- Acceptance criteria quality gap (not in Given/When/Then format)
- Template residue in epics document

These issues were discovered before Sprint Planning, so correction now has low implementation cost and avoids downstream rework.

## 2. Impact Analysis

### Epic Impact

- Epic 0 and Epic 6 require classification changes from user-value epics to enabling track content.
- Epics 1-5 remain the user-facing value stream and continue to anchor sprint sequencing.
- Story acceptance criteria style affects all stories and testability quality.

### Story Impact

- Story text using "important" needs normalization to "important" where it denotes the domain concept.
- Stories referencing endpoint contracts should align with canonical API versioning.
- AC formatting updates apply broadly to Story 1.x through Story 6.x.

### Artifact Conflicts

- PRD: FR24 endpoint convention needs canonicalization note.
- Epics: terminology, epic classification, AC formatting, and template residue.
- Architecture: endpoint examples and field naming examples need alignment with canonical choices.
- UX: long-press actions must be explicitly additive to swipe gestures, not replacing FR20 behavior.

### Technical Impact

- No core scope increase.
- Minimal to moderate document maintenance effort.
- Reduced risk of implementation drift and failing acceptance tests.

## 3. Recommended Approach

**Selected path:** Option 1 (Direct Adjustment), with minor governance hardening.

### Why this path

- Effort: Medium
- Risk: Low to Medium
- Timeline impact: Small (front-loaded documentation correction)
- Maintains current MVP scope and momentum

Rollback is not needed because implementation has not started. MVP reduction is not needed because issues are consistency and planning quality issues, not feasibility blockers.

## 4. Detailed Change Proposals

### A. PRD Updates

#### PRD-1: API contract canonicalization

File: _bmad-output/planning-artifacts/prd.md
Section: Functional Requirements (FR24)

OLD:
- FR24: API endpoints include GET /api/todos, POST /api/todos, PATCH /api/todos/:id, DELETE /api/todos/:id.

NEW:
- FR24: Canonical API endpoints include GET /api/v1/todos, POST /api/v1/todos, PATCH /api/v1/todos/:id, DELETE /api/v1/todos/:id.
- Compatibility note: legacy references to /api/todos may be supported via temporary aliasing during migration.

Rationale: Align PRD with architecture contract conventions and prevent implementation ambiguity.

### B. UX Specification Updates

#### UX-1: Interaction reconciliation for mobile

File: _bmad-output/planning-artifacts/ux-design-specification.md
Sections: Chosen Direction, Journey/Interaction behavior

OLD:
- Mobile: long press on row opens task action menu.

NEW:
- Mobile: swipe gestures remain supported for hide/remove actions per product requirement.
- Mobile: long press on row opens task action menu for secondary actions (Edit/Move/Mark/Unmark Important/Delete).
- These interactions are complementary and non-conflicting.

Rationale: Satisfy FR20 while preserving the chosen UX direction.

#### UX-2: Terminology normalization

File: _bmad-output/planning-artifacts/ux-design-specification.md

OLD:
- Important tasks, Mark/Unmark Important, ImportantGroupContainer

NEW:
- Important tasks, Mark/Unmark Important, PriorityGroupContainer (or keep component name and normalize visible/user-facing language consistently)

Rationale: Remove cross-artifact semantic drift.

### C. Architecture Updates

#### ARCH-1: Endpoint and field naming alignment

File: _bmad-output/planning-artifacts/architecture.md
Sections: API examples and contract patterns

OLD:
- Mixed examples between /api/todos and /api/v1/todos
- Examples that omit or vary important field naming semantics

NEW:
- Standardize examples to /api/v1/*
- Standardize domain field naming to important across contracts/examples
- Add explicit note that naming must mirror PRD canonical glossary

Rationale: Keep implementation contracts deterministic.

### D. Epics and Stories Updates

#### EPIC-1: Reclassify technical epics

File: _bmad-output/planning-artifacts/epics.md

OLD:
- Epic 0 and Epic 6 presented as product-value epics in same stream as user-facing epics.

NEW:
- Move Epic 0 and Epic 6 under an "Enabling Track" section.
- Keep stories intact, but classify as delivery enablers supporting user-facing epics.

Rationale: Align to user-value-first epic guidance while preserving work items.

#### EPIC-2: Terminology normalization

File: _bmad-output/planning-artifacts/epics.md

OLD:
- FR11-FR15 and related stories use "important"
- FR25 uses important field in some places

NEW:
- Normalize to "important" across FR inventory, story text, and ACs.

Rationale: Align epics with PRD canonical language.

#### EPIC-3: Acceptance criteria rewrite in BDD format

File: _bmad-output/planning-artifacts/epics.md
Scope: Stories 1.x to 6.x

OLD:
- Bullet-point ACs, mixed specificity

NEW:
- ACs rewritten as Given/When/Then(+And) with measurable outcomes and relevant failure cases.

Rationale: Improve implementation clarity and testability.

#### EPIC-4: Remove template residue

File: _bmad-output/planning-artifacts/epics.md

OLD:
- Placeholder blocks: Epic {{N}}, Story {{N}}.{{M}}, template comments

NEW:
- Placeholder blocks removed.

Rationale: Clean production planning artifact.

## 5. Implementation Handoff

### Scope classification

**Moderate**

### Handoff recipients and responsibilities

- Product Manager / Scrum Master:
  - Approve final classification and sequencing changes for epics.
  - Confirm Sprint Planning gate criteria post-corrections.
- Architect:
  - Confirm canonical API path and contract naming decisions.
- UX Designer:
  - Confirm swipe + long-press coexistence in interaction specs.
- Dev/QA leads:
  - Validate BDD AC rewrite is testable and complete.

### Success criteria

- All four artifacts (PRD, UX, Architecture, Epics) use canonical terminology and endpoint conventions.
- No unresolved placeholders remain.
- ACs are in Given/When/Then format.
- Re-run readiness check returns no critical issues blocking Sprint Planning.

## Checklist Traceability Status

### Section 1 - Trigger and Context
- 1.1 [N/A] No triggering implementation story yet; pre-sprint readiness finding used as trigger.
- 1.2 [x] Problem defined as planning and consistency defects.
- 1.3 [x] Evidence captured in implementation-readiness report.

### Section 2 - Epic Impact
- 2.1 [x] Current epics can continue after reclassification/cleanup.
- 2.2 [x] Specific epic-level changes identified.
- 2.3 [x] Future epics reviewed for dependency impact.
- 2.4 [x] No new user-value epics required; enabling track recommended.
- 2.5 [x] User-facing epics remain implementation important.

### Section 3 - Artifact Impact
- 3.1 [x] PRD conflicts identified and patch path defined.
- 3.2 [x] Architecture conflicts identified and patch path defined.
- 3.3 [x] UX conflicts identified and patch path defined.
- 3.4 [!] Secondary artifacts may need updates after document corrections (tests, CI contract checks).

### Section 4 - Path Forward
- 4.1 [x] Direct adjustment viable (effort medium, risk low-medium).
- 4.2 [N/A] Rollback not applicable pre-implementation.
- 4.3 [x] MVP remains achievable; no scope reduction required.
- 4.4 [x] Option 1 selected with rationale.

### Section 5 - Proposal Components
- 5.1 [x] Issue summary complete.
- 5.2 [x] Impact and adjustment needs documented.
- 5.3 [x] Recommended path and trade-offs documented.
- 5.4 [x] MVP impact and action plan documented.
- 5.5 [x] Agent/role handoff plan documented.

### Section 6 - Final Review and Handoff
- 6.1 [x] Applicable checklist items addressed.
- 6.2 [x] Proposal is actionable and specific.
- 6.3 [x] User approval received (yes - approve and proceed).
- 6.4 [N/A] sprint-status.yaml update deferred until epic edits are applied.
- 6.5 [x] Handoff execution order confirmed (apply edits now).

## Approval and Routing Record

- Proposal approval: Approved
- Scope classification: Moderate
- Routing: Product Manager/Scrum Master for backlog governance, Architect for contract finalization, UX Designer for interaction confirmation, Dev/QA for implementation and validation
