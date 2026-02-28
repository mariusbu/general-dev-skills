---
name: general-code-quality-debugger
description: "This skill should be used when performing code reviews, investigating bugs, identifying anti-patterns, reducing technical debt, or refactoring code. Triggers on debugging requests, code quality analysis, refactoring tasks, or root cause investigation."
user-invocable: true
---

## Workflow: Code Review

1. **Understand the intent** — read the PR description or ask what the change is supposed to do
2. **Check correctness first** — does the code actually do what it claims? Look for off-by-one errors, missing edge cases, race conditions
3. **Check for security issues** — input validation, injection risks, auth checks, sensitive data exposure
4. **Check for bugs** — null/undefined access, unhandled errors, resource leaks, incorrect state transitions
5. **Check design** — does it follow project patterns? See [references/clean-code.md](references/clean-code.md) and [references/solid-principles.md](references/solid-principles.md) for reference
6. **Check tests** — are there tests? Do they test behavior (not implementation)? Do they cover the important edge cases?
7. **Present findings by severity**: blockers first, then warnings, then suggestions

## Workflow: Debugging a Bug

1. **Reproduce the bug** — get a reliable reproduction before investigating. Note exact steps, inputs, and environment.
2. **Read the error** — read the full stack trace and error message carefully. The answer is often right there.
3. **Form a hypothesis** — based on the error, hypothesize what's wrong. Check the most likely cause first.
4. **Verify with evidence** — add logging, use a debugger, or write a failing test that demonstrates the bug
5. **Fix the root cause** — not the symptom. If a null check fixes the crash but the value should never be null, fix why it's null.
6. **Write a regression test** — add a test that would have caught this bug
7. **If stuck after 3 attempts** — follow the reassessment protocol in [references/debugging-methodology.md](references/debugging-methodology.md)

## Workflow: Refactoring

1. **Ensure test coverage exists** — if the code you're refactoring has no tests, write characterization tests first
2. **Identify the specific smell** — name it (God class, shotgun surgery, feature envy, etc.)
3. **Pick a single refactoring** — extract method, extract class, inline, rename, move. Do one at a time.
4. **Apply the refactoring** — make the change
5. **Run all tests** — verify nothing broke
6. **Commit** — one refactoring per commit, with a clear message

## Development Discipline

- **Never bypass hooks** — never use `--no-verify` to skip commit hooks
- **Never disable tests** — fix failing tests, don't skip or delete them; disabling a test to "fix" a failure is not a fix
- **Never commit broken code** — every commit must compile and pass all tests
- **Specify files in commits** — always name files explicitly; never use `git add -A` or `git add .`
- **Choose boring solutions** — single responsibility, no premature abstractions, no clever tricks; if you need to explain it, it's too complex
- **Verify with existing code** — don't make assumptions; check how the codebase actually works before suggesting changes

Refer to [references/clean-code.md](references/clean-code.md) for code quality guidelines, [references/solid-principles.md](references/solid-principles.md) for design principles, [references/test-driven-development.md](references/test-driven-development.md) for the TDD cycle, [references/debugging-methodology.md](references/debugging-methodology.md) for the 3-attempt protocol, [references/code-quality.md](references/code-quality.md) for commit standards and backend checks, and [references/quality-gates.md](references/quality-gates.md) for definition of done.
