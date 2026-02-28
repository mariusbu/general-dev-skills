# Standard Skill Format Specification

## Overview

The standard skill format is a JSON-based specification that enables platform-agnostic skill definitions. Adapters convert these standard definitions to platform-specific formats (Claude, Mistral, Gemini, etc.).

## Schema

```json
{
  "name": "string",              // Required: Skill name (e.g., "general-backend-developer")
  "description": "string",        // Required: Skill description
  "version": "string",            // Required: Semantic version (e.g., "1.0.0")
  "triggers": "string[]",        // Required: Trigger keywords/phrases
  "workflows": "string[]",        // Optional: Workflow names
  "references": "string[]",       // Optional: Reference file names (without .md)
  "user_invocable": "boolean",    // Optional: Can user manually invoke? (default: false)
  "format": "string",            // Required: Format version (e.g., "standard-v1")
  "author": "string",            // Optional: Author name
  "license": "string",           // Optional: License (default: "MIT")
  "homepage": "string"           // Optional: Project homepage
}
```

## Field Definitions

### Required Fields

**`name`** (string)
- Unique identifier for the skill
- Must start with `general-` for Claude compatibility
- Example: `"general-backend-developer"`

**`description`** (string)
- Clear description of what the skill does
- Should include trigger conditions and use cases
- Example: `"This skill should be used when designing backend APIs..."`

**`version`** (string)
- Semantic version following `MAJOR.MINOR.PATCH`
- Example: `"1.0.0"`

**`triggers`** (string[])
- Keywords/phrases that trigger this skill
- Used for automatic skill selection
- Example: `["api", "database", "backend"]`

**`format`** (string)
- Format version identifier
- Current: `"standard-v1"`

### Optional Fields

**`workflows`** (string[])
- Named workflows this skill provides
- Example: `["implement_api_endpoint", "design_database_schema"]`

**`references`** (string[])
- Reference documents this skill uses
- Filenames without `.md` extension
- Must exist in `core/references/`
- Example: `["clean-code", "solid-principles"]`

**`user_invocable`** (boolean)
- Can users manually invoke this skill?
- Default: `false`
- Example: `true` for skills with slash commands

**`author`** (string)
- Skill author name
- Example: `"Marius Bugge Monsen"`

**`license`** (string)
- License identifier
- Default: `"MIT"`
- Example: `"Apache-2.0"`

**`homepage`** (string)
- Project homepage URL
- Example: `"https://github.com/mariusbu/general-dev-skills"`

## Examples

### Minimal Skill
```json
{
  "name": "general-example",
  "description": "Example skill description",
  "version": "1.0.0",
  "triggers": ["example"],
  "format": "standard-v1"
}
```

### Complete Skill
```json
{
  "name": "general-backend-developer",
  "description": "Backend development skills...",
  "version": "1.0.0",
  "triggers": ["api", "database", "backend"],
  "workflows": ["implement_endpoint", "design_schema"],
  "references": ["clean-code", "solid-principles"],
  "user_invocable": false,
  "format": "standard-v1",
  "author": "Marius Bugge Monsen",
  "license": "MIT",
  "homepage": "https://github.com/mariusbu/general-dev-skills"
}
```

## Validation Rules

1. **Required fields** must be present
2. **`name`** must start with `"general-"` for Claude compatibility
3. **`version`** must follow semantic versioning
4. **`references`** must point to existing files in `core/references/`
5. **`format`** must be `"standard-v1"`

## Conversion Examples

### To Claude Format
```javascript
// Input: Standard format
const standardSkill = {
  name: "general-backend-developer",
  description: "Backend skills",
  triggers: ["api", "manual"],
  references: ["clean-code"]
};

// Output: Claude format
const claudeSkill = {
  name: "general-backend-developer",
  description: "Backend skills",
  user_invocable: true,  // Because triggers includes "manual"
  references: ["references/clean-code.md"],
  format: "claude-plugin-v1"
};
```

### To Mistral Format
```yaml
# Mistral plugin.yaml
name: general-backend-developer
description: Backend skills
model: codestral.mistral.ai
endpoints:
  - path: /api/implement_endpoint
    method: POST
  - path: /api/design_schema
    method: POST
```

## Migration Guide

### From SKILL.md to JSON

**Before (SKILL.md):**
```markdown
---
name: general-backend-developer
description: "Backend development skills..."
user-invocable: false
---

## Workflow: Implementing an API Endpoint
...
```

**After (skill.json):**
```json
{
  "name": "general-backend-developer",
  "description": "Backend development skills...",
  "version": "1.0.0",
  "triggers": ["api", "database", "backend"],
  "workflows": ["implement_api_endpoint"],
  "user_invocable": false,
  "format": "standard-v1"
}
```

## Tools

### Validator
```javascript
const { SkillValidator } = require('../common/validator');
const skill = require('./my-skill.json');

if (SkillValidator.validate(skill)) {
  console.log('✅ Skill is valid');
} else {
  console.log('❌ Skill validation failed');
}
```

### Adapter Usage
```javascript
const { ClaudeAdapter } = require('../../adapters/claude');
const skill = require('./my-skill.json');

const adapter = new ClaudeAdapter();
const claudeSkill = adapter.convert(skill);
console.log(claudeSkill);
```
