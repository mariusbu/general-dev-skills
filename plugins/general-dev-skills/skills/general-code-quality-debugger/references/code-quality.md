# Code Quality

## Commit Standards

Every commit must:
- Compile successfully
- Pass all existing tests
- Include tests for new functionality
- Follow project formatting/linting

Before committing:
- Ensure all existing tests pass
- Run formatters/linters
- Self-review changes
- Ensure commit message explains "why"

You are responsible: Fix broken code, errors, and test failures — even if they are not your fault.

## Backend-Specific Checks

### API Responses
- [ ] Consistent response envelope (same shape for success and error)
- [ ] Appropriate HTTP status codes (not 200 for everything)
- [ ] No internal implementation details leaked in error messages
- [ ] Pagination on list endpoints

### Database
- [ ] No N+1 queries (check with query logging or ORM eager-loading)
- [ ] Indexes on columns used in WHERE, JOIN, ORDER BY
- [ ] Migrations are reversible
- [ ] No raw SQL with string interpolation

### Dependencies
- [ ] External service calls have timeouts configured
- [ ] Retry logic has exponential backoff and a max retry count
- [ ] Circuit breakers on non-critical dependencies
