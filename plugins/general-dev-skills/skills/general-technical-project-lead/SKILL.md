---
name: general-technical-project-lead
description: "This skill should be used when assessing existing system health, analyzing performance bottlenecks, conducting security reviews, prioritizing technical debt, or making risk-based technical decisions on existing systems. Triggers on system assessment, performance profiling, security audit, or technical debt evaluation. Not for greenfield design — use general-solution-architect for that."
user-invocable: false
---

## Workflow: Performance Bottleneck Analysis

1. **Measure, don't guess** — get profiling data, APM traces, or benchmarks before forming opinions
2. **Identify the bottleneck type**:
   - **CPU-bound**: slow algorithms, excessive computation, missing caching
   - **I/O-bound**: slow database queries, network calls, disk access
   - **Memory-bound**: memory leaks, excessive allocation, missing garbage collection
   - **Contention**: lock contention, connection pool exhaustion, rate limits
3. **Find the single biggest contributor** — Pareto principle: 80% of the slowness is usually in 20% of the code
4. **Propose a fix with expected impact** — "Adding an index on X should reduce query time from 200ms to 5ms"
5. **Verify after implementation** — re-measure with the same methodology

## Workflow: Security Review

1. **Map the attack surface** — identify all entry points: API endpoints, file uploads, user inputs, third-party integrations
2. **Check authentication and authorization** — is every endpoint protected? Are permissions checked correctly?
3. **Check input handling** — SQL injection, XSS, command injection, path traversal, SSRF
4. **Check data protection** — sensitive data encrypted at rest and in transit? PII properly handled? Secrets in environment variables (not code)?
5. **Check dependencies** — run `npm audit` / `bundle audit` / equivalent; flag known vulnerabilities
6. **Document findings** — severity (critical/high/medium/low), reproduction steps, and recommended fix for each issue

## Workflow: Technical Debt Prioritization

1. **Inventory the debt** — categorize by type:
   - **Code debt**: duplication, dead code, missing tests, unclear naming
   - **Architecture debt**: wrong abstractions, tight coupling, missing boundaries
   - **Infrastructure debt**: manual processes, missing monitoring, outdated dependencies
   - **Documentation debt**: missing or stale docs, tribal knowledge
2. **Score each item** on two axes:
   - **Impact**: how much does this slow down the team or risk production issues?
   - **Effort**: how long to fix?
3. **Prioritize**: high-impact/low-effort first, then high-impact/high-effort (plan these), skip low-impact/high-effort
4. **Attach debt reduction to feature work** — fix debt in the area you're already working on

## Assessment Discipline

- **3 attempts max** — after 3 failed attempts at diagnosing or fixing an issue, stop, document what you've tried, and try a fundamentally different angle
- **Verify with existing code** — don't make assumptions; check how the system actually works before recommending changes
- **Pragmatic over dogmatic** — adapt recommendations to the project's reality, team size, and constraints
- **Incremental improvement** — recommend small, measurable improvements over sweeping rewrites

Refer to [references/assessment-framework.md](references/assessment-framework.md) for the system health evaluation checklist and [references/decision-framework.md](references/decision-framework.md) for evaluating technical trade-offs.
