# Issue Creation Template

## Issue Title Format

Use descriptive, action-oriented titles that clearly communicate the purpose:
- **Features**: "Add [functionality] to [component/area]"
- **Bugs**: "Fix [specific issue] in [component/area]"
- **Improvements**: "Improve [aspect] of [component/area]"
- **Refactoring**: "Refactor [component] to [goal/benefit]"

## Required Issue Structure

**1. Description**
- Provide comprehensive context about the request or problem
- Include user story format when applicable: "As a [user type], I want [goal] so that [benefit]"
- Explain the business value and impact
- Reference related issues, epics, or documentation

**2. Technical Requirements**
- Specify technical constraints and considerations
- List required technologies, frameworks, or integrations
- Identify performance requirements or benchmarks
- Note security, accessibility, or compliance requirements
- Include any API specifications or data structure requirements

**3. Acceptance Criteria (Gherkin Format)**
Use Given/When/Then format for each testable scenario:
```gherkin
Scenario: [Descriptive scenario name]
Given [initial context/state]
When [action or event occurs]
Then [expected outcome]
And [additional expected outcomes if needed]
```

**4. Definition of Done**
Create a checklist of completion criteria:
- [ ] Code implemented and follows coding standards
- [ ] Unit tests written and passing
- [ ] Integration tests written and passing
- [ ] Code reviewed and approved
- [ ] Documentation updated
- [ ] Accessibility requirements met
- [ ] Performance benchmarks met
- [ ] Security requirements validated
- [ ] Deployed to staging environment
- [ ] Product owner acceptance received

**5. Notes**
- Additional context, constraints, or considerations
- Links to related research, designs, or specifications
- Dependencies on other issues or external factors
- Risk assessment or potential blockers

## Best Practices

1. **Be Specific**: Avoid vague language; use concrete, measurable terms
2. **Include Context**: Always explain the "why" behind the request
3. **Make it Testable**: Acceptance criteria should be clearly verifiable
4. **Consider Dependencies**: Identify and link related issues or blockers
5. **Think About Edge Cases**: Include scenarios for error handling and edge cases
6. **Estimate Complexity**: Add story points or effort estimates when possible
7. **Tag Appropriately**: Use consistent labels for categorization and filtering

See [assets/issue-example.md](issue-example.md) for a complete worked example.
