# Error Handling

## Core Principles

- **Fail fast with descriptive messages** — detect errors as early as possible; include what happened, what was expected, and what context matters for debugging
- **Include context for debugging** — error messages should answer: what operation failed, what input caused it, and where in the flow it occurred
- **Handle errors at the appropriate level** — catch errors where you can meaningfully recover or translate them; don't catch if you can't do anything useful
- **Never silently swallow exceptions** — every catch block must either recover, re-throw, or log with sufficient context

## Patterns

### Boundary Validation
Validate at system boundaries (user input, API requests, external service responses). Trust internal code once past the boundary.

### Error Translation
Translate low-level errors into domain-appropriate errors at layer boundaries. A database "unique constraint violation" becomes "user already exists" at the API layer.

### Structured Error Responses
Use consistent error response formats:
- HTTP APIs: status code + error body with `code`, `message`, and optional `details`
- Internal code: typed/custom errors with machine-readable codes, not just message strings

### Logging vs Returning
- **Log** operational details (stack traces, internal state) for debugging
- **Return** user-safe messages to callers (no internal paths, no stack traces, no SQL)

## Anti-Patterns

- Catching `Exception` / `Error` broadly without filtering — masks real bugs
- Using error codes as flow control — use return values or result types instead
- Logging and re-throwing the same error — produces duplicate noise
- Empty catch blocks — hides failures that will surface later as mysterious state corruption
- Returning null instead of throwing — caller has no way to distinguish "no result" from "something went wrong"
