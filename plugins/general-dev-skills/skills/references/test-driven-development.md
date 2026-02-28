# Test-Driven Development (TDD)

A software development approach where tests are written before production code.

## Core Principles

### Test-First Development
- Write tests before writing the code they test
- Define expected behavior upfront
- Prevents "writing code to see if it works" approach

### Red-Green-Refactor Cycle
1. **Red**: Write a failing test for new functionality
2. **Green**: Write minimal code to make the test pass
3. **Refactor**: Improve code structure while keeping tests passing
4. **Repeat**: Continue cycle for each new feature

### Keep It Simple
- Write only enough code to pass current tests
- Avoid over-engineering and speculative features
- Let tests guide the design

### Automated Testing
- All tests must be automated
- Tests should run quickly and frequently
- Provide immediate feedback on code changes

## TDD Workflow

### 1. Write a Failing Test (Red Phase)
```javascript
// Example: Writing a test for a calculator add function
test('adds 1 + 2 to equal 3', () => {
  expect(calculator.add(1, 2)).toBe(3);
});

// This test will fail initially because calculator.add() doesn't exist yet
```

### 2. Write Minimal Implementation (Green Phase)
```javascript
// Minimal implementation to make the test pass
class Calculator {
  add(a, b) {
    return a + b;
  }
}
```

### 3. Refactor (Refactor Phase)
```javascript
// Improve the implementation while keeping tests passing
class Calculator {
  // Add input validation
  add(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Both arguments must be numbers');
    }
    return a + b;
  }
}
```

## TDD Benefits

### Code Quality
- High test coverage from the start
- Code is written to be testable
- Encourages modular design

### Design Improvement
- Tests act as design specifications
- Forces thinking about interfaces first
- Prevents over-engineering

### Maintenance
- Regression tests prevent new bugs
- Safe refactoring with test safety net
- Clear documentation of expected behavior

### Collaboration
- Tests serve as executable specifications
- Clear communication of requirements
- Reduces ambiguity in feature implementation

## TDD Best Practices

### Test Characteristics
- **Fast**: Tests should run quickly
- **Isolated**: Tests shouldn't depend on each other
- **Repeatable**: Same results every time
- **Self-validating**: Clear pass/fail indication
- **Timely**: Written just before production code

### Test Guidelines
- Test behavior, not implementation
- One assertion per test when possible
- Clear test names describing scenario
- Use existing test utilities/helpers
- Tests should be deterministic

### Test Structure
```javascript
// Arrange-Act-Assert pattern
test('should do something', () => {
  // Arrange: Set up test conditions
  const input = 'test';
  const expected = 'TEST';
  
  // Act: Execute the code being tested
  const result = stringUtils.toUpperCase(input);
  
  // Assert: Verify the outcome
  expect(result).toBe(expected);
});
```

### Implementation Flow
Follow this workflow for all code changes:

1. **Understand** - Study existing patterns in codebase. Find 3 similar features/components.
2. **Test** - Write test first (red phase)
3. **Implement** - Minimal code to pass (green phase)
4. **Refactor** - Clean up with tests passing
5. **Commit** - With clear message linking to plan

Use same libraries/utilities as existing code. Follow existing test patterns. Don't introduce new tools without strong justification.

### Test Coverage
- Aim for 80-100% coverage of critical paths
- Focus on behavior, not implementation details
- Test both happy paths and edge cases

## Common TDD Challenges

### Learning Curve
- Requires discipline and practice
- Initial productivity may be slower
- Mindset shift from "code first" to "test first"

### Test Maintenance
- Tests need to be updated when requirements change
- Poor tests can become a maintenance burden
- Balance between thoroughness and practicality

### Overhead
- More code to write and maintain
- Requires good test organization
- Can feel redundant for simple code

## When to Use TDD

### Good Fit
- Complex business logic
- Long-term projects
- Critical systems requiring high reliability
- Teams with changing membership

### Less Ideal
- Rapid prototyping
- Highly experimental code
- Simple CRUD applications
- UI-heavy applications (consider other testing approaches)

## TDD Variations

### Behavior-Driven Development (BDD)
- Focuses on system behavior rather than implementation
- Uses natural language specifications (Given-When-Then)
- Tools: Cucumber, SpecFlow, Jest with BDD style

### Acceptance Test-Driven Development (ATDD)
- Tests written from user/customer perspective
- Defines acceptance criteria upfront
- Bridges gap between business and development

## Tools and Frameworks

### JavaScript/TypeScript
- Jest
- Mocha + Chai
- Jasmine

### Python
- pytest
- unittest
- nose2

### Java
- JUnit
- TestNG
- Spock

### C#
- NUnit
- xUnit
- MSTest

## References

- Test-Driven Development by Example - Kent Beck
- Growing Object-Oriented Software, Guided by Tests - Steve Freeman, Nat Pryce
- Clean Code: A Handbook of Agile Software Craftsmanship - Robert C. Martin
- The Art of Unit Testing - Roy Osherove