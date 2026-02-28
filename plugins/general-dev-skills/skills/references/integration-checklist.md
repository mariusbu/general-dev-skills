# Integration Checklist

Use this when implementing or reviewing features that span multiple application layers.

## API Contract
- [ ] Request/response shapes are defined before implementation begins
- [ ] Field names are consistent across layers (no `user_id` in API, `userId` in frontend without explicit mapping)
- [ ] Pagination parameters and response format follow existing project conventions
- [ ] Error response format is consistent with other endpoints

## Type Safety
- [ ] Database column types match model/ORM types
- [ ] API serialization includes all required fields and excludes sensitive fields
- [ ] Frontend TypeScript types match API response shapes
- [ ] Enum values are consistent across layers (same strings/ints in DB, API, and frontend)

## Error Handling
- [ ] Database constraint violations produce meaningful API error messages
- [ ] API validation errors include field-level detail (which field, what's wrong)
- [ ] Frontend displays API errors to the user (not just console.log)
- [ ] Network errors (timeout, 500, offline) have user-facing fallbacks
- [ ] Optimistic updates are rolled back on API failure

## State Management
- [ ] Loading states shown while API requests are in flight
- [ ] Empty states handled (no data yet vs. filtered to nothing)
- [ ] Stale data is refreshed after mutations (invalidate cache, refetch, or optimistic update)
- [ ] Race conditions handled (user submits twice, navigates away mid-request)

## Data Integrity
- [ ] Required fields enforced at database level (NOT NULL) and API level (validation)
- [ ] Unique constraints enforced at database level, with API handling duplicate errors gracefully
- [ ] Foreign key constraints in place for relationships
- [ ] Migrations are reversible (has both up and down)
- [ ] Seed data or migration data is idempotent (safe to run twice)

## Security
- [ ] Authentication required on new endpoints
- [ ] Authorization checked (user can only access their own data)
- [ ] Sensitive fields not returned in API responses (passwords, tokens, internal IDs)
- [ ] User input sanitized before database storage and before rendering in HTML
