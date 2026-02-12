# General Dev Skills

A Claude Code plugin that provides 10 general-purpose development skills. Each skill gives Claude structured workflows, reference materials, and discipline guidelines for a specific engineering role.

## Installation

Add the marketplace and install the plugin:

```
/plugin marketplace add https://github.com/mariusbu/general-dev-skills
/plugin install general-dev-skills
```

## Skills

| Skill | Triggers on | Slash command |
|---|---|---|
| **Backend Developer** | API design, database schemas, query optimization, auth flows | auto |
| **Frontend Developer** | UI components, accessibility, frontend performance, responsive layouts | auto |
| **Fullstack Developer** | End-to-end features spanning database, API, and frontend layers | auto |
| **DevOps** | CI/CD pipelines, Dockerfiles, container orchestration, monitoring | auto |
| **Solution Architect** | Greenfield system design, technology selection, scalability planning | auto |
| **Technical Project Lead** | System health assessment, performance bottlenecks, security reviews, tech debt | auto |
| **Code Quality & Debugger** | Code reviews, bug investigation, anti-patterns, refactoring | `/general-code-quality-debugger` |
| **PM** | Issue creation, sprint planning, status updates, prioritization | `/general-pm` |
| **QA** | Test plans, test automation, edge case analysis, quality validation | `/general-qa` |
| **Technical Writer** | API docs, README files, user guides, troubleshooting guides | `/general-technical-writer` |

Skills marked **auto** are triggered automatically based on task context. Skills with a slash command can also be invoked manually.

## Credits

The skills in this plugin are based on the agents from [awattar/claude-code-best-practices](https://github.com/awattar/claude-code-best-practices).