# AI Agent Log

Status: active
Owner: project owner
Last updated: 2026-03-20

## Purpose

This log captures AI-assisted implementation work so the team can answer these governance questions at any time:

1. Which tasks were completed with AI assistance, and what prompts worked best?
2. Which MCP servers were used, and how did they help?
3. How did AI assist in generating test cases, and what did it miss?
4. Where did AI help with debugging?
5. What limitations were encountered, and where was human expertise critical?

## Session Entry Template

Copy this block for each implementation session.

### Session YYYY-MM-DD-HHMM

- Date/time (UTC):
- Scope/story:
- Goal:
- Agent/model:
- Human owner:

#### Agent Usage

- AI-assisted tasks completed:
- Best prompts used (top 1-3):
- Why these prompts worked:

#### MCP Server Usage

- MCP servers/tools used:
- How each tool helped outcome:
- If none used, state: none

#### Test Generation

- Tests AI proposed/generated:
- Tests adopted/executed:
- What AI missed or required manual completion:

#### Debugging with AI

- Issue summary:
- AI suggestion(s) that helped:
- Final fix applied:
- Verification evidence (command/output):

#### Limitations and Human Expertise

- AI limitations encountered:
- Human decisions/interventions required:
- Residual risks or follow-ups:

#### Evidence

- Files changed:
- Commits:
- Related artifact links:

## Q&A Readout

Update this section after each session by linking to the evidence above.

### 1. Agent Usage: Which tasks were completed with AI assistance? What prompts worked best?

- Answer:
- Supporting sessions:

### 2. MCP Server Usage: Which MCP servers did you use? How did they help?

- Answer:
- Supporting sessions:

### 3. Test Generation: How did AI assist in generating test cases? What did it miss?

- Answer:
- Supporting sessions:

### 4. Debugging with AI: Document cases where AI helped debug issues.

- Answer:
- Supporting sessions:

### 5. Limitations Encountered: What could not the AI do well? Where was human expertise critical?

- Answer:
- Supporting sessions:

## Backfill: Story 0.1 Setup Session (reconstructed)

- Date/time (UTC): 2026-03-20 (reconstructed)
- Scope/story: Story 0.1
- Goal: initialize project structure and baseline scripts
- Agent/model: GPT-5.3-Codex
- Human owner: Antonio

#### Agent Usage

- AI-assisted tasks completed:
  - scaffold alignment to apps/web, apps/api, e2e
  - root scripts and baseline checks
  - review-fix pass for docs and safety hardening
- Best prompts used (top 1-3):
  - "apply Story 0.1 review fixes and keep scope limited to intended files"
  - "re-review only changed files for Story 0.1"
- Why these prompts worked:
  - constrained scope and reduced unrelated edits

#### MCP Server Usage

- MCP servers/tools used:
  - VS Code workspace tools (file editing, search, terminal)
- How each tool helped outcome:
  - enabled deterministic edits, diff verification, and command validation
- External MCP servers:
  - none explicitly logged

#### Test Generation

- Tests AI proposed/generated:
  - none specific to Story 0.1 scope
- Tests adopted/executed:
  - root test/lint/typecheck/build validations
- What AI missed or required manual completion:
  - N/A for test generation in this story

#### Debugging with AI

- Issue summary:
  - review scope contamination risk from unrelated changed files
- AI suggestion(s) that helped:
  - isolate scope and ignore non-product directories in git/review context
- Final fix applied:
  - updated ignore rules and continued scoped review
- Verification evidence (command/output):
  - git status and targeted diff checks

#### Limitations and Human Expertise

- AI limitations encountered:
  - needed explicit human policy for which directories to ignore
- Human decisions/interventions required:
  - user provided authoritative ignore list and review policy
- Residual risks or follow-ups:
  - keep review scope policy enforced in future sessions

#### Evidence

- Files changed:
  - _bmad-output/implementation-artifacts/0-1-initialize-project-structure.md
  - README.md
  - apps/web/src/App.tsx
  - .gitignore
- Commits:
  - 6e1e2bf
  - bb8467a
- Related artifact links:
  - _bmad-output/implementation-artifacts/0-1-initialize-project-structure.md

## Backfill: Story 0.2 Test Infrastructure Session (reconstructed)

- Date/time (UTC): 2026-03-20 (reconstructed)
- Scope/story: Story 0.2
- Goal: establish Vitest/RTL/Playwright baseline and runnable scripts
- Agent/model: GPT-5.3-Codex
- Human owner: Antonio

#### Agent Usage

- AI-assisted tasks completed:
  - configured Vitest + RTL + jsdom in web app
  - configured Playwright smoke suite and root execution flow
  - executed full quality gate and review cycle
- Best prompts used (top 1-3):
  - "run full review for Story 0.2 and list findings by severity"
  - "apply only agreed fix and re-validate"
- Why these prompts worked:
  - produced actionable review output and tight fix loop

#### MCP Server Usage

- MCP servers/tools used:
  - VS Code workspace tools (terminal, diff, file editing)
- How each tool helped outcome:
  - rapid detect-fix-verify loop for doc/config mismatch
- External MCP servers:
  - none explicitly logged

#### Test Generation

- Tests AI proposed/generated:
  - web unit and integration sample tests
  - Playwright smoke test
- Tests adopted/executed:
  - npm run test (including e2e)
- What AI missed or required manual completion:
  - documentation port mismatch in e2e README vs Playwright config (fixed)

#### Debugging with AI

- Issue summary:
  - Playwright/dev-server port configuration drift in docs
- AI suggestion(s) that helped:
  - reconcile documented port with configured strict port
- Final fix applied:
  - e2e README updated to 4273
- Verification evidence (command/output):
  - full test suite pass after fix

#### Limitations and Human Expertise

- AI limitations encountered:
  - can overlook doc/config consistency in first pass
- Human decisions/interventions required:
  - user approved final fix and closure sequence
- Residual risks or follow-ups:
  - maintain explicit checklist item for docs/config parity

#### Evidence

- Files changed:
  - _bmad-output/implementation-artifacts/0-2-set-up-test-infrastructure.md
  - e2e/README.md
  - e2e/playwright.config.ts
- Commits:
  - fd407de
  - bb8467a
- Related artifact links:
  - _bmad-output/implementation-artifacts/0-2-set-up-test-infrastructure.md

## Q&A Readout (current)

### 1. Agent Usage: Which tasks were completed with AI assistance? What prompts worked best?

- Answer:
  - AI assisted Story 0.1 scaffolding/review fixes and Story 0.2 test setup/review closure.
  - Best prompts were scoped implementation/review prompts that constrained files and expected outputs.
- Supporting sessions:
  - Story 0.1 Setup Session
  - Story 0.2 Test Infrastructure Session

### 2. MCP Server Usage: Which MCP servers did you use? How did they help?

- Answer:
  - No external MCP servers were explicitly logged.
  - VS Code workspace tools were used for search, editing, diffs, and command execution to verify outcomes.
- Supporting sessions:
  - Story 0.1 Setup Session
  - Story 0.2 Test Infrastructure Session

### 3. Test Generation: How did AI assist in generating test cases? What did it miss?

- Answer:
  - AI helped generate baseline web and e2e tests and execute the full test pipeline.
  - It missed a docs/config mismatch (e2e port) that was later corrected.
- Supporting sessions:
  - Story 0.2 Test Infrastructure Session

### 4. Debugging with AI: Document cases where AI helped debug issues.

- Answer:
  - AI helped identify and resolve documentation/configuration drift in e2e port setup and supported targeted verification.
- Supporting sessions:
  - Story 0.2 Test Infrastructure Session

### 5. Limitations Encountered: What could not the AI do well? Where was human expertise critical?

- Answer:
  - AI needed explicit human policy for scope boundaries and final approval on closure decisions.
  - Human judgment was critical for repository policy (ignore rules) and release/closure sequencing.
- Supporting sessions:
  - Story 0.1 Setup Session
  - Story 0.2 Test Infrastructure Session
