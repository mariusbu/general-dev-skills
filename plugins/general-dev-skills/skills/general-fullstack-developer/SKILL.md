---
name: general-fullstack-developer
description: "This skill should be used when implementing features that span database, API, and frontend layers simultaneously. Triggers on end-to-end feature implementation, data flow design across layers, or coordinated backend-frontend changes."
user-invocable: false
---

## Workflow: Implementing an End-to-End Feature

1. **Map the data flow** — trace the complete path: database → model → API endpoint → frontend state → UI component. Identify every layer that needs changes.
2. **Design the API contract first** — define request/response shapes before implementing either side. This is the handshake between backend and frontend.
3. **Implement bottom-up**:
   - Database: migration, model, constraints, indexes
   - API: endpoint, validation, error responses, tests
   - Frontend: API client/hook, state management, UI component, tests
4. **Validate at boundaries** — validate inputs at the API layer (server-side) and provide user feedback at the UI layer (client-side). Don't duplicate complex validation logic; let the server be authoritative.
5. **Test the integration** — write at least one end-to-end test that exercises the full flow from UI action to database change and back.
6. **Handle error states at every layer**:
   - Database: constraint violations → meaningful API errors
   - API: validation failures → structured error responses with field-level detail
   - Frontend: API errors → user-visible feedback (toast, inline error, error boundary)

## Workflow: Adding a New Data Field Across the Stack

1. **Database**: add a migration for the new column with appropriate type, default, and constraints
2. **Model**: add the field to the model/ORM with validation rules
3. **API**: add the field to request validation, serialization, and response schema
4. **Frontend**: update the API client types, form component, and display component
5. **Tests**: update existing tests at each layer; add a test for the new field's validation

## Integration Checklist

Use this when reviewing cross-layer changes. See [references/integration-checklist.md](references/integration-checklist.md) for the full checklist.

- [ ] API contract matches what frontend sends/expects
- [ ] Type definitions are consistent across layers (DB types → API types → TS types)
- [ ] Error responses from the API are handled in the frontend
- [ ] Loading and empty states are handled in the UI
- [ ] Database constraints match API validation rules
- [ ] Migrations are reversible

## Security Guardrails

Apply security at every layer:
- **Database** — parameterized queries only (never string-concatenate SQL); encrypt sensitive columns at rest
- **API** — authenticate every endpoint (or explicitly opt out); authorize at the resource level (user can only access their own data); validate and sanitize all inputs; never expose internal errors to clients
- **Frontend** — never inject unsanitized user data into the DOM; never store secrets in client-side code or localStorage; use httpOnly cookies for sessions
- **Secrets** — never hardcode credentials; use environment variables or a secret manager; never log sensitive data
- **Cross-layer** — ensure sensitive fields (passwords, tokens, internal IDs) are excluded from API responses before they reach the frontend

## Development Discipline

- **Incremental commits** — commit working code frequently; never commit code that doesn't compile
- **Never bypass hooks** — never use `--no-verify` to skip commit hooks
- **Never disable tests** — fix failing tests, don't skip or delete them
- **Specify files in commits** — always name files explicitly; never use `git add -A` or `git add .`
- **Study before building** — find 3 similar implementations at each layer before writing new code
- **Choose boring solutions** — single responsibility, no premature abstractions, no clever tricks; if you need to explain it, it's too complex
- **3 attempts max** — after 3 failed attempts at the same approach, stop, document what failed, and try a fundamentally different angle
- **Update plan docs** — keep implementation plans and documentation current as you go

Refer to [references/integration-checklist.md](references/integration-checklist.md) for the full cross-layer checklist, [references/clean-code.md](references/clean-code.md) for clean code principles, [references/solid-principles.md](references/solid-principles.md) for SOLID design, [references/debugging-methodology.md](references/debugging-methodology.md) for the 3-attempt protocol, [references/implementation-flow.md](references/implementation-flow.md) for the TDD cycle, [references/test-guidelines.md](references/test-guidelines.md) for testing standards, [references/decision-framework.md](references/decision-framework.md) for architectural decisions, [references/error-handling.md](references/error-handling.md) for error patterns, [references/infrastructure-safety.md](references/infrastructure-safety.md) for deployment and migration safety, [references/accessibility-checklist.md](references/accessibility-checklist.md) for the accessibility review checklist, and [references/code-quality.md](references/code-quality.md) for commit standards and backend checks.
