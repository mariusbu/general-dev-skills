---
name: general-qa
description: "This skill should be used when creating test plans, designing test automation, identifying edge cases, or validating software behavior against requirements. Triggers on test strategy requests, regression test design, edge case analysis, or quality validation tasks."
user-invocable: true
---

## Workflow: Creating a Test Plan

1. **Read the requirements** — understand what the feature does, its acceptance criteria, and its integration points
2. **Identify test categories**:
   - **Happy path**: the primary user flow works correctly
   - **Input boundaries**: min/max values, empty inputs, special characters, very long strings
   - **Error conditions**: invalid inputs, network failures, timeouts, permission denied
   - **State transitions**: what happens when data changes mid-operation, concurrent access, stale data
   - **Integration points**: does it work with the systems it depends on?
3. **Write test cases** — for each category, write concrete scenarios with: precondition, action, expected result
4. **Prioritize by risk** — test critical paths and likely failure modes first; defer cosmetic or unlikely scenarios
5. **Choose automation strategy** — unit tests for logic, integration tests for boundaries, e2e tests for critical user flows

## Workflow: Identifying Edge Cases

For any feature, systematically check:
- **Empty/null**: what if the input is empty, null, undefined, or missing?
- **Boundaries**: what happens at 0, 1, max, max+1?
- **Duplicates**: what if the same action happens twice?
- **Concurrency**: what if two users do this simultaneously?
- **Ordering**: what if events arrive out of order?
- **Permissions**: what if the user lacks access?
- **Data size**: what if the input is unexpectedly large?

## Workflow: Writing Automated Tests

1. **Follow existing test patterns** — find 3 similar tests in the codebase and match their structure, naming, and utilities
2. **Test behavior, not implementation** — assert on outputs and side effects, not internal state
3. **One logical assertion per test** — each test should verify one behavior; name it to describe that behavior
4. **Make tests deterministic** — no random data, no time-dependent logic, no test ordering dependencies
5. **Use the project's test utilities** — don't introduce new test libraries without strong justification

## Security Testing

Include these in every test plan for features that handle user input or sensitive data:
- **Injection** — test with SQL injection payloads, XSS payloads, and command injection attempts in all input fields
- **Authentication bypass** — test endpoints without auth tokens; test with expired/invalid tokens; test with another user's token
- **Authorization** — test accessing another user's resources; test escalating from regular user to admin actions
- **Input abuse** — test with extremely long strings, special characters, null bytes, and unexpected content types
- **Sensitive data exposure** — verify passwords, tokens, and PII are not returned in API responses or logged

## Development Discipline

- **Never disable tests** — fix failing tests, don't skip or delete them; a disabled test is worse than no test because it creates false confidence
- **Never bypass hooks** — never use `--no-verify` to skip commit hooks
- **Specify files in commits** — always name files explicitly; never use `git add -A` or `git add .`
- **Every commit must pass all tests** — never commit code that breaks existing tests
- **3 attempts max** — after 3 failed attempts at making a test pass, stop, document what failed, and try a fundamentally different angle
- **Verify with existing code** — find 3 similar tests in the codebase and match their patterns before writing new ones

Refer to [references/quality-gates.md](references/quality-gates.md) for definition of done, [references/debugging-methodology.md](references/debugging-methodology.md) for the 3-attempt protocol, and [references/test-driven-development.md](references/test-driven-development.md) for the TDD cycle.
