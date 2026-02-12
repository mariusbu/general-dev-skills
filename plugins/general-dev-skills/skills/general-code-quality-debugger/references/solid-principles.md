# SOLID Principles Reference

Five principles of object-oriented design (Robert C. Martin). Apply to functions, classes, and services.

## S - Single Responsibility Principle
Each component should do one thing. If the name includes "and", it needs decomposition. Related functionality belongs in separate, composable components.

## O - Open/Closed Principle
A component should be extensible, not modified. Design for expansion without requiring alterations:
- **Parameterization**: Accept callbacks/lambdas for custom behavior
- **Inheritance**: Use subclassing to extend without modification

## L - Liskov Substitution Principle
You should be able to swap in a subclass without noticing. Derived classes must preserve superclass behavior. Subclasses can specialize return values, but the method interface remains unchanged.

## I - Interface Segregation Principle
Create specialized, targeted interfaces isolated by concern. Don't force components to depend on methods they don't use. Prefer many small interfaces over one large one.

## D - Dependency Inversion Principle
Inject everything a function needs to do its job, and no more. High-level modules should not depend on low-level modules - both should depend on abstractions. Pass dependencies explicitly rather than relying on global scope.

## Code Smells (SOLID Violations)
- **God class/function**: Does too many things (SRP violation)
- **Shotgun surgery**: One change requires edits in many places (SRP violation)
- **Type checking with if/switch**: Should use polymorphism (OCP violation)
- **Fat interfaces**: Clients forced to implement unused methods (ISP violation)
- **Hard-coded dependencies**: Direct instantiation instead of injection (DIP violation)
