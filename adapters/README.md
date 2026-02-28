# AI Adapters

This directory contains adapters that convert the platform-agnostic skill format to specific AI platform formats.

## Available Adapters

- **Claude** - `adapters/claude/` - For Anthropic Claude models
- **Mistral** - `adapters/mistral/` - For Mistral AI models (Codestral, etc.)
- **Gemini** - `adapters/gemini/` - For Google Gemini models
- **OpenAI** - `adapters/openai/` - For OpenAI compatible models

## Adapter Interface

Each adapter must implement:

```javascript
class BaseAdapter {
  /**
   * Convert skill to platform-specific format
   * @param {Object} skill - Standard skill definition
   * @returns {Object} Platform-specific skill format
   */
  convert(skill) {
    // Implementation specific to each AI platform
  }

  /**
   * Get adapter metadata
   * @returns {Object} Adapter information
   */
  static getMetadata() {
    return {
      name: 'Adapter Name',
      platform: 'AI Platform',
      version: '1.0.0'
    };
  }
}
```

## Adding New Adapters

1. Create a new directory under `adapters/`
2. Implement the adapter interface
3. Add tests in `__tests__/`
4. Update this README

## Usage

```javascript
const { ClaudeAdapter } = require('./adapters/claude');
const skill = require('../core/skills/backend-developer.json');

const claudeSkill = new ClaudeAdapter().convert(skill);
```
