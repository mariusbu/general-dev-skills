---
name: general-frontend-developer
description: "This skill should be used when implementing UI components, fixing accessibility issues, optimizing frontend performance, or building responsive layouts. Triggers on CSS/HTML work, component implementation, accessibility audits, or Core Web Vitals optimization."
user-invocable: false
---

## Workflow: Implementing a UI Component

1. **Study existing components** — find 3 similar components in the codebase; note file structure, naming, CSS approach, and test patterns
2. **Use existing primitives** — check for a design system or component library; reuse existing buttons, inputs, layouts before creating new ones
3. **Start with semantic HTML** — write the markup first with correct elements (`<nav>`, `<main>`, `<button>`, `<dialog>`, etc.) before adding styling
4. **Add accessibility** — run through the checklist in [references/accessibility-checklist.md](references/accessibility-checklist.md):
   - All interactive elements are keyboard-accessible
   - ARIA labels on non-text elements
   - Color contrast meets WCAG AA (4.5:1 for text, 3:1 for large text)
   - Focus states are visible
5. **Add responsive styles** — use the project's CSS methodology; design mobile-first, then add breakpoints for wider viewports
6. **Write tests** — follow the project's component test patterns (render, assert output, simulate interactions)

## Workflow: Fixing an Accessibility Issue

1. **Reproduce the issue** — use a screen reader (or the accessibility tree in devtools) to confirm the problem
2. **Identify the root cause** — missing label, wrong role, broken focus order, insufficient contrast, or missing keyboard handler
3. **Apply the fix** — prefer native HTML semantics over ARIA attributes; ARIA is a last resort
4. **Verify the fix** — re-test with the screen reader/devtools accessibility panel
5. **Add a test** — assert the correct accessible name, role, or keyboard behavior

## Workflow: Optimizing Frontend Performance

1. **Measure first** — run Lighthouse or the browser performance profiler; note the specific bottleneck (LCP, CLS, TBT, bundle size)
2. **Target the biggest win** — address the single largest contributor first:
   - Large bundle → code-split or lazy-load the heavy module
   - Slow LCP → optimize the critical rendering path, preload key resources
   - Layout shift → set explicit dimensions on images/embeds
   - Long tasks → break up work with requestIdleCallback or web workers
3. **Measure again** — verify the improvement with the same tool
4. **Avoid premature optimization** — don't optimize what you haven't measured

## Security Guardrails

- **XSS prevention** — never inject unsanitized user data into the DOM; always use the framework's built-in escaping (React JSX, Vue templates, Angular binding); if raw HTML rendering is unavoidable, sanitize with a library like DOMPurify
- **Sensitive data** — never store tokens, passwords, or API keys in localStorage or client-side code; use httpOnly cookies for session tokens
- **Third-party scripts** — audit external scripts and CDN resources; use Subresource Integrity (SRI) hashes; configure Content Security Policy (CSP) headers
- **URLs and redirects** — validate redirect URLs to prevent open redirect attacks; never build URLs from unsanitized user input

## Development Discipline

- **Incremental commits** — commit working code frequently; never commit code that doesn't compile
- **Never bypass hooks** — never use `--no-verify` to skip commit hooks
- **Never disable tests** — fix failing tests, don't skip or delete them
- **Specify files in commits** — always name files explicitly; never use `git add -A` or `git add .`
- **Study before building** — find 3 similar components in the codebase before creating new ones
- **Choose boring solutions** — single responsibility, no premature abstractions, no clever tricks; if you need to explain it, it's too complex
- **3 attempts max** — after 3 failed attempts at the same approach, stop, document what failed, and try a fundamentally different angle
- **Update plan docs** — keep implementation plans and documentation current as you go

Refer to [references/accessibility-checklist.md](references/accessibility-checklist.md) for the full accessibility review checklist, [references/clean-code.md](references/clean-code.md) for clean code principles, [references/solid-principles.md](references/solid-principles.md) for SOLID design, [references/debugging-methodology.md](references/debugging-methodology.md) for the 3-attempt protocol, [references/test-driven-development.md](references/test-driven-development.md) for the TDD cycle, [references/decision-framework.md](references/decision-framework.md) for architectural decisions, and [references/error-handling.md](references/error-handling.md) for error patterns.
