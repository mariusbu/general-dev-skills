# Quality Gates

## Definition of Done

A task is done when all applicable items are satisfied:

- [ ] Code compiles and all tests pass
- [ ] New tests written for new behavior
- [ ] Code follows project conventions and style
- [ ] No linter or formatter warnings introduced
- [ ] Commit messages are clear and descriptive
- [ ] Implementation matches the agreed plan
- [ ] No TODOs without associated issue numbers
- [ ] Security checklist reviewed (input validation, auth, secrets)
- [ ] Documentation updated if public API or behavior changed

## Pre-Merge Checklist

Before requesting review:
1. **Self-review the diff** — read your own changes as if reviewing someone else's code
2. **Run the full test suite** — not just the tests you wrote
3. **Check for accidental inclusions** — debug logging, commented-out code, `.env` files
4. **Verify the commit history** — clean, logical commits; each compiles and passes tests independently

## Quality Levels

| Level | Criteria | When |
|-------|----------|------|
| **Minimum** | Compiles, tests pass, no security issues | Every commit |
| **Standard** | + code review, + docs updated, + no warnings | Every merge |
| **Release** | + integration tests, + performance check, + accessibility audit | Every release |
