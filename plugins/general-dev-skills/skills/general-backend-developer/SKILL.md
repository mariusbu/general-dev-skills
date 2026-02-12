---
name: general-backend-developer
description: "This skill should be used when designing or implementing backend API endpoints, database schemas, query optimization, server-side business logic, or authentication/authorization flows. Triggers on API design, database work, or server-side implementation tasks."
user-invocable: false
---

## Workflow: Implementing an API Endpoint

1. **Study existing endpoints** — find 3 similar endpoints in the codebase and note their patterns (routing, middleware, validation, response format)
2. **Design the contract** — define method, path, request/response shapes, status codes, and error responses before writing code
3. **Write the test first** — create a test for the happy path and at least one error case, following the project's test patterns
4. **Implement minimally** — write only enough code to pass the tests
5. **Add validation** — validate all inputs at the boundary (request params, body, headers); trust internal code
6. **Handle errors** — use the project's error handling pattern; return appropriate HTTP status codes with descriptive messages
7. **Add to API documentation** if the project maintains it

## Workflow: Designing a Database Schema

1. **Study existing models** — find 3 similar tables/models and follow their conventions (naming, constraints, indexes)
2. **Design the schema** — define tables, columns, types, constraints, and relationships
3. **Write a migration** — use the project's migration tool; make migrations reversible
4. **Add indexes** — index columns used in WHERE clauses, JOINs, and ORDER BY
5. **Add constraints** — use NOT NULL, UNIQUE, FOREIGN KEY, and CHECK constraints to enforce data integrity at the database level
6. **Test with realistic data** — verify queries perform well against expected data volumes

## Workflow: Optimizing a Slow Query

1. **Measure first** — get the current execution time and query plan (EXPLAIN/EXPLAIN ANALYZE)
2. **Identify the bottleneck** — full table scans, missing indexes, N+1 queries, unnecessary JOINs
3. **Apply the simplest fix** — add an index, rewrite the query, add eager loading
4. **Measure again** — verify the improvement with the same query plan tool
5. **Add a regression test** — if the query is critical, add a test that asserts performance bounds

## Security Guardrails

Every API endpoint must address these before merging:
- **Input validation** — validate and sanitize all user input; use parameterized queries (never string-concatenate SQL); reject unexpected fields
- **Authentication** — verify the endpoint requires auth (or is explicitly public); use the project's existing auth middleware
- **Authorization** — check that the user has permission to access the specific resource (not just "is logged in")
- **Secrets** — never hardcode API keys, passwords, or tokens in code; use environment variables or a secret manager; never log secrets
- **Error messages** — never expose internal details (stack traces, database errors, file paths) to the client
- **Rate limiting** — apply rate limits on public and auth endpoints to prevent brute force and abuse
- **CORS** — configure allowed origins explicitly; never use `*` in production
- **Sensitive data** — never return passwords, tokens, or internal IDs in API responses; mask PII in logs

## Development Discipline

- **Incremental commits** — commit working code frequently; never commit code that doesn't compile
- **Never bypass hooks** — never use `--no-verify` to skip commit hooks
- **Never disable tests** — fix failing tests, don't skip or delete them
- **Specify files in commits** — always name files explicitly; never use `git add -A` or `git add .`
- **Study before building** — find 3 similar implementations in the codebase before writing new code
- **Choose boring solutions** — single responsibility, no premature abstractions, no clever tricks; if you need to explain it, it's too complex
- **3 attempts max** — after 3 failed attempts at the same approach, stop, document what failed, and try a fundamentally different angle
- **Update plan docs** — keep implementation plans and documentation current as you go

Refer to [references/architecture-principles.md](references/architecture-principles.md) for design guidelines, [references/error-handling.md](references/error-handling.md) for error patterns, [references/implementation-flow.md](references/implementation-flow.md) for the TDD cycle, [references/clean-code.md](references/clean-code.md) for clean code principles, [references/solid-principles.md](references/solid-principles.md) for SOLID design, [references/debugging-methodology.md](references/debugging-methodology.md) for the 3-attempt protocol, [references/test-guidelines.md](references/test-guidelines.md) for testing standards, [references/decision-framework.md](references/decision-framework.md) for architectural decisions, and [references/infrastructure-safety.md](references/infrastructure-safety.md) for deployment and migration safety.
