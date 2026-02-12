---
name: general-solution-architect
description: "This skill should be used when designing new systems, selecting technology stacks, planning distributed architectures, or evaluating major architectural changes. Triggers on greenfield system design, technology selection, scalability planning, or architectural pattern decisions. Not for assessing existing systems — use general-technical-project-lead for that."
user-invocable: false
---

## Workflow: Designing a New System

1. **Clarify requirements** — ask about:
   - Expected scale (users, requests/sec, data volume)
   - Latency and availability requirements
   - Team size and existing expertise
   - Budget and timeline constraints
   - Compliance or regulatory requirements
2. **Identify the core problem** — what is the system fundamentally doing? (CRUD app, event processing pipeline, real-time collaboration, etc.)
3. **Start with the simplest architecture that could work** — monolith > microservices unless there's a specific reason to split
4. **Make key decisions** using the framework in [references/decision-framework.md](references/decision-framework.md):
   - Data storage: SQL vs NoSQL vs both — driven by access patterns
   - Communication: sync (HTTP/gRPC) vs async (message queue) — driven by coupling and latency needs
   - State: stateless services with external state store when possible
5. **Document the architecture** — components, data flow, key interfaces, and the **reasons behind each decision**
6. **Identify risks** — single points of failure, scaling bottlenecks, data consistency challenges
7. **Define evolution path** — what changes when scale doubles? What's the next architectural milestone?

## Workflow: Evaluating a Technology Choice

1. **Define evaluation criteria** — weight these by importance for the specific context:
   - Does the team have expertise? (most important in practice)
   - Does it solve the actual problem, not a bigger/different one?
   - Is it actively maintained with a healthy community?
   - What are the operational costs (hosting, licensing, maintenance)?
   - How hard is it to migrate away from later?
2. **Build a proof of concept** — validate the critical unknown, not the easy parts
3. **Make a recommendation** — with clear reasoning and trade-offs documented

## Security by Design

Address these in every architecture decision:
- **Authentication and authorization** — choose an auth strategy (JWT, session, OAuth) upfront; define how permissions are checked at the resource level, not just route level
- **Data protection** — classify data sensitivity (public, internal, confidential, restricted); encrypt confidential and restricted data at rest and in transit; plan PII handling and retention
- **Secrets management** — design a secrets strategy from the start (environment variables, Vault, cloud KMS); never store secrets in code or config files committed to version control
- **Network boundaries** — define trust boundaries; use least-privilege network policies; don't expose internal services to the internet
- **Threat modeling** — identify the top 3-5 threats to the system; design mitigations for each; document accepted risks

## Anti-Patterns to Flag

- Microservices for a small team (< 5 engineers)
- Choosing technology because it's trendy rather than appropriate
- Designing for 10x the current scale before hitting 1x
- Adding infrastructure complexity to avoid code complexity

## Design Discipline

- **Incremental progress over big bangs** — design for incremental delivery; avoid architectures that require everything to be built before anything works
- **Choose boring solutions** — single responsibility, no premature abstractions, no clever tricks; if you need to explain it, it's too complex
- **Verify assumptions** — don't assume how the existing system works; read the code and check the actual behavior
- **Pragmatic over dogmatic** — adapt to the project's reality, team size, and constraints rather than applying textbook patterns blindly

Refer to [references/decision-framework.md](references/decision-framework.md) for the prioritized decision criteria.
