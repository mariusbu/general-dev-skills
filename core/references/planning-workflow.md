# Planning & Staging Workflow

Break complex work into 3-5 stages. Each stage should be independently shippable and testable.

## Stage Template

Document each stage in your implementation plan:

```markdown
## Stage N: [Name]
**Goal**: [Specific deliverable — what will exist when this stage is done]
**Success Criteria**: [Testable outcomes — how do you know it works]
**Tests**: [Specific test cases to write]
**Dependencies**: [What must be done before this stage can start]
**Status**: [Not Started | In Progress | Complete]
```

## Planning Process

1. **Understand the end state** — what does "done" look like? Write it down before breaking it into stages.
2. **Identify the riskiest part** — what's most likely to fail or change? Tackle it early, not last.
3. **Define stages back-to-front** — start from the end state and work backwards to find the natural breakpoints.
4. **Each stage compiles and passes tests** — no stage should leave the codebase in a broken state.
5. **Each stage is a commit (or PR)** — keep stages small enough to review in one sitting.

## Tracking Progress

- Update stage status as you work — don't let the plan go stale
- When a stage reveals that the plan needs to change, update the plan first, then continue
- Remove the plan file when all stages are complete

## Common Mistakes

- **Stages too large** — if a stage takes more than a day, break it down further
- **Stages with hidden dependencies** — if stage 3 can't start until stage 2 is reviewed, that's a dependency; make it explicit
- **Planning without reading the code** — study the existing implementation before writing a plan
- **Not updating the plan** — a stale plan is worse than no plan; it actively misleads
