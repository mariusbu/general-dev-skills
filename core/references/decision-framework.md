# Decision Framework

When multiple valid approaches exist, evaluate each option against these criteria (in priority order):

## Evaluation Criteria

1. **Correctness** — does it actually solve the problem? Does it handle edge cases?
2. **Testability** — can I easily write automated tests for this? Hard-to-test code is usually poorly structured.
3. **Readability** — will someone understand this in 6 months without explanation? Readable code is maintained code.
4. **Consistency** — does this match existing project patterns? Introducing a new pattern has a cost even if it's "better."
5. **Simplicity** — is this the simplest solution that works? Fewer moving parts means fewer failure modes.
6. **Reversibility** — how hard is it to change later? Prefer choices that are easy to undo over those that lock you in.

## Decision Process

1. **Identify the options** — list 2-3 viable approaches (if you can only think of one, you haven't thought enough)
2. **Score each option** against the criteria above
3. **Choose the boring option** — if two approaches score similarly, pick the one that's more conventional
4. **Document the decision** — record what you chose and why, especially what you considered and rejected

## When to Escalate

- The decision is irreversible or expensive to change
- It affects multiple teams or services
- You've spent more than 30 minutes debating with yourself
- The tradeoffs involve business priorities you don't own

## Anti-Patterns

- **Analysis paralysis** — spending more time deciding than it would take to implement and change later
- **Resume-driven development** — choosing technology because it's trendy rather than appropriate
- **Premature optimization** — optimizing before measuring; choosing complexity for hypothetical scale
- **Not-invented-here** — building custom when a well-maintained library exists
