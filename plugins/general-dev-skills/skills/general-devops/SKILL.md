---
name: general-devops
description: "This skill should be used when configuring CI/CD pipelines, writing Dockerfiles, setting up container orchestration, designing deployment strategies, or configuring monitoring and alerting. Triggers on infrastructure-as-code, pipeline design, container configuration, or reliability engineering tasks."
user-invocable: false
---

## Workflow: Setting Up a CI/CD Pipeline

1. **Study the existing setup** — check for existing pipeline files (`.github/workflows/`, `Jenkinsfile`, `.gitlab-ci.yml`, etc.) and follow established patterns
2. **Define stages** — typical order: lint → test → build → deploy-staging → deploy-production
3. **Keep pipelines fast** — cache dependencies, run independent jobs in parallel, only run what's needed per change
4. **Add quality gates** — fail the pipeline on: lint errors, test failures, security scan findings, coverage drops
5. **Make deployments reversible** — always have a rollback strategy (blue-green, canary, or simple revert)
6. **Store secrets properly** — use the platform's secret management (GitHub Secrets, Vault, etc.); never hardcode credentials

## Workflow: Writing a Dockerfile

1. **Start from an official base image** — use a specific version tag, not `latest`
2. **Use multi-stage builds** — separate build dependencies from runtime
3. **Order layers by change frequency** — dependencies first (cached), source code last (changes often)
4. **Run as non-root** — add a `USER` directive
5. **Minimize the image** — remove build tools, temp files, and package caches in the same layer they're created
6. **Add a health check** — `HEALTHCHECK` directive or equivalent for the orchestrator

## Workflow: Designing a Monitoring Setup

1. **Identify the key signals** — the four golden signals: latency, traffic, errors, saturation
2. **Instrument the application** — add metrics at: HTTP layer (request rate, latency, errors), business logic (key operations), infrastructure (CPU, memory, disk, network)
3. **Set up dashboards** — one overview dashboard with the golden signals; drill-down dashboards per service
4. **Configure alerts** — alert on symptoms (error rate > threshold) not causes (CPU > 90%); include runbook links in alerts
5. **Add structured logging** — JSON format, consistent fields (request_id, user_id, timestamp, level)

## Development Discipline

- **Incremental commits** — commit working code frequently; never commit code that doesn't compile
- **Never bypass hooks** — never use `--no-verify` to skip commit hooks
- **Specify files in commits** — always name files explicitly; never use `git add -A` or `git add .`
- **Study before building** — check for existing pipeline/infra patterns in the project before creating new ones
- **3 attempts max** — after 3 failed attempts at the same approach, stop, document what failed, and try a fundamentally different angle
- **Infrastructure safety** — never use destructive commands (`docker compose down -v`, `make clean`, etc.) without explicit user approval; always ask before any data loss operation. See [references/infrastructure-safety.md](references/infrastructure-safety.md)

Refer to [references/project-integration.md](references/project-integration.md) for guidelines on working with existing project tooling.
