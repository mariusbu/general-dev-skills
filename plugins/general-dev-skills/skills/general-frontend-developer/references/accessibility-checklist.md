# Accessibility Checklist

Use this checklist when implementing or reviewing UI components.

## Keyboard Navigation
- [ ] All interactive elements reachable via Tab key
- [ ] Tab order follows visual layout (no tabindex > 0)
- [ ] Focus indicator is visible on every interactive element
- [ ] Escape closes modals, dropdowns, and popovers
- [ ] Enter/Space activates buttons and links
- [ ] Arrow keys navigate within composite widgets (menus, tabs, listboxes)
- [ ] No keyboard traps — focus can always leave the component

## Screen Readers
- [ ] Every image has an `alt` attribute (empty `alt=""` for decorative images)
- [ ] Form inputs have associated `<label>` elements (or `aria-label`)
- [ ] Buttons and links have descriptive text (not "Click here")
- [ ] Dynamic content changes announced via `aria-live` regions
- [ ] Heading hierarchy is logical (h1 → h2 → h3, no skipped levels)
- [ ] Landmarks used appropriately (`<nav>`, `<main>`, `<aside>`, `<footer>`)

## Visual
- [ ] Text color contrast ≥ 4.5:1 against background (WCAG AA)
- [ ] Large text (18px+ bold or 24px+) contrast ≥ 3:1
- [ ] UI component contrast ≥ 3:1 against adjacent colors
- [ ] Information not conveyed by color alone (add icons, text, or patterns)
- [ ] Text resizes up to 200% without loss of content or function
- [ ] No content requires horizontal scrolling at 320px viewport width

## Interactive Elements
- [ ] Touch targets are at least 44x44px on mobile
- [ ] Hover content (tooltips) also accessible via focus
- [ ] No time limits, or users can extend/disable them
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Error messages are specific and associated with the field that caused them

## Semantic HTML Preferences
Prefer native elements over ARIA:
- `<button>` over `<div role="button">`
- `<a href>` over `<span onclick>`
- `<input type="checkbox">` over `<div role="checkbox">`
- `<dialog>` over `<div role="dialog">`
- `<details>/<summary>` over custom accordions
