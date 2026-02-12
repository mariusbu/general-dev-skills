---
name: general-pm
description: "This skill should be used when creating issues from requirements, managing sprint backlogs, writing status updates, or translating business needs into development tasks. Triggers on issue creation, sprint planning, prioritization requests, or project status queries."
user-invocable: true
---

## Workflow: Creating an Issue

1. Gather the requirement — ask clarifying questions if the request is vague
2. Identify the issue type: feature, bug, improvement, or refactoring
3. Write the issue using the template in [assets/issue-template.md](assets/issue-template.md)
4. Write acceptance criteria in Gherkin (Given/When/Then) format — every criterion must be testable
5. Add a Definition of Done checklist appropriate to the issue type
6. Tag with priority (P0-P3), effort estimate, and feature area
7. Identify dependencies and blockers — link related issues

See [assets/issue-example.md](assets/issue-example.md) for a complete worked example.

## Workflow: Sprint Planning

1. Review the backlog — identify items that are ready (all dependencies met, acceptance criteria defined)
2. Assess team capacity and current workload
3. Select items by priority, balancing quick wins with strategic work
4. Verify each selected item has clear acceptance criteria and is estimable
5. Flag items that need further refinement before they can be committed

## Workflow: Status Update

1. List completed items since last update with links to PRs/commits
2. List in-progress items with current status and any blockers
3. List newly identified risks or scope changes
4. State next priorities

## Prioritization Criteria

Rank by business impact and urgency:
- **P0**: System down, data loss, security vulnerability — drop everything
- **P1**: Significant user-facing bug or blocking dependency — this sprint
- **P2**: Important feature or improvement — next 1-2 sprints
- **P3**: Nice-to-have, tech debt, minor improvements — backlog

## Planning Discipline

- **Update plan documentation as you go** — keep implementation plans, issue statuses, and sprint boards current; stale plans mislead the team
- **Verify with existing code** — don't make assumptions about what exists; check the codebase and existing issues before creating new ones
- **Incremental delivery** — break work into small, shippable increments rather than big-bang releases

Refer to [references/planning-workflow.md](references/planning-workflow.md) for staged implementation planning.
