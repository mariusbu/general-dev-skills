# Infrastructure Safety

## Core Safety Rules

**NEVER use destructive flags without explicit approval**:
- **NEVER** use volume-removing flags (e.g., `docker compose down -v`) unless explicitly told to reset
- **NEVER** use `make clean` or similar destructive commands without asking first
- Be conservative with infrastructure — ask before doing anything that deletes data

**ALWAYS ask before any data loss operation**:
- Before running any command that deletes, resets, or wipes data, ask first
- When told "This was working before", interpret that as "don't reset it"

**Safeguards when infrastructure fails**:
1. **Identify the actual problem** — don't assume a reset will help
2. **Ask which solution to use** — present options, don't assume
3. **Be explicit before acting** — state your reasoning and ask for confirmation
4. **Only then proceed** — never assume; verify approval first

**Wrong approach**: Tests fail → assume infrastructure → run destructive reset → data lost

**Correct approach**: Tests fail → identify root cause → ask "Should I try X or Y?" → wait for direction → proceed

## Deployment Safety
- Always deploy to staging before production
- Verify health checks pass after deployment before proceeding
- Keep the previous version available for immediate rollback
- Never deploy on Friday afternoons or before holidays without explicit approval

## Database Migration Safety
- Test migrations against a copy of production data (or realistic volume)
- Run migrations separately from application deployments when possible
- Never drop columns/tables in the same release that removes the code using them — do it in two releases
- Add new columns as nullable or with defaults; backfill, then add NOT NULL

## Secret Management
- Rotate secrets immediately if they appear in logs, commits, or error messages
- Never copy production secrets to development environments
- Use separate credentials per environment (dev/staging/production)

## Container Safety
- Never run containers as root in production
- Pin base image versions (not `latest`)
- Scan images for vulnerabilities before deployment
- Set resource limits (CPU, memory) on all containers
