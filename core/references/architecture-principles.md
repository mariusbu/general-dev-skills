# Architecture Principles

## Core Principles

### Composition over Inheritance
- **Use dependency injection** to create flexible, testable components
- **Prefer interfaces** over concrete implementations
- **Avoid deep inheritance hierarchies** that become rigid and hard to modify

### Explicit over Implicit
- **Clear data flow** - Make dependencies and control flow obvious
- **Explicit dependencies** - Don't rely on global state or singletons
- **Transparent behavior** - Avoid "magic" or hidden side effects

### Test-Driven Design
- **Never disable tests** - Fix failing tests, don't skip them
- **Test-driven development** - Write tests before implementation when possible
- **Testable by default** - Design components to be easily testable

### Single Responsibility
- **One reason to change** - Each function/class should have a single responsibility
- **Focused components** - Avoid "god classes" that do everything
- **Clear boundaries** - Well-defined interfaces between components

### Pragmatic Simplicity
- **No premature abstractions** - Don't abstract until you have 3+ similar use cases
- **Choose the boring solution** - Simple, proven approaches over clever complexity
- **YAGNI principle** - You Aren't Gonna Need It - Don't implement speculative features

## Design Patterns

### Layered Architecture
- **Presentation Layer** - UI/components that handle user interaction
- **Application Layer** - Business logic and use cases
- **Domain Layer** - Core business rules and entities
- **Infrastructure Layer** - External services, databases, frameworks

### Dependency Management
- **Dependency Injection** - Pass dependencies explicitly rather than creating them internally
- **Inversion of Control** - High-level modules shouldn't depend on low-level modules
- **Interface Segregation** - Clients shouldn't depend on methods they don't use

### Error Handling
- **Fail fast** - Validate inputs early and fail clearly
- **Graceful degradation** - Handle errors at appropriate levels
- **Meaningful error messages** - Provide actionable information without exposing internals

## Anti-Patterns to Avoid

### Architectural Anti-Patterns
- **Big Ball of Mud** - No discernible architecture, everything interconnected
- **Spaghetti Code** - Complex, tangled control flow
- **God Class** - Single class that knows/does too much
- **Vendor Lock-in** - Over-dependence on specific technologies

### Design Anti-Patterns
- **Golden Hammer** - Using familiar tools for inappropriate problems
- **Not Invented Here** - Rewriting existing solutions unnecessarily
- **Over-engineering** - Adding complexity for hypothetical future needs
- **Under-engineering** - Ignoring obvious scalability requirements

## Decision Making Framework

When choosing between architectural approaches:

1. **Testability** - Can we easily test this design?
2. **Maintainability** - Will this be easy to understand and modify?
3. **Scalability** - Can this handle expected growth?
4. **Consistency** - Does this match existing patterns?
5. **Simplicity** - Is this the simplest solution that works?

## See Also

- [SOLID Principles](solid-principles.md) - Object-oriented design principles for maintainable architecture
- [Clean Code Principles](clean-code.md) - Writing code that supports good architecture
- [Test-Driven Development](test-driven-development.md) - Building testable architectures

## References

- Clean Architecture: A Craftsman's Guide to Software Structure and Design - Robert C. Martin
- Design Patterns: Elements of Reusable Object-Oriented Software - Gang of Four
- Domain-Driven Design: Tackling Complexity in the Heart of Software - Eric Evans
