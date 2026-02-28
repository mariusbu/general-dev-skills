# AI Adapters

This directory contains adapters that convert the platform-agnostic skill format to specific AI coding CLI tool formats.

## Key Finding: Shared SKILL.md Format

All four major coding CLI tools use the same **SKILL.md** format — markdown files with YAML frontmatter. The adapters handle the per-platform differences:

| CLI Tool | Skill Location | Context File | Config Format |
|----------|---------------|--------------|---------------|
| Claude Code | `.claude/skills/` | `CLAUDE.md` | JSON |
| Gemini CLI | `skills/` (in extensions) | `GEMINI.md` | JSON manifest |
| Mistral Vibe | `.vibe/skills/` or `.agents/skills/` | `AGENTS.md` | TOML |
| OpenAI Codex | `.agents/skills/` | `AGENTS.md` | TOML |

## Available Adapters

- **Claude** - `adapters/claude/` - Generates Claude Code plugin format (`claude-plugin-v1`)
- **Gemini** - `adapters/gemini/` - Generates Gemini CLI extension with `gemini-extension.json` manifest
- **Mistral** - `adapters/mistral/` - Generates Mistral Vibe skill directories with `allowed-tools` support
- **Codex** - `adapters/codex/` - Generates OpenAI Codex skills under `.agents/skills/` with strict name validation

## Adapter Interface

Each adapter extends `BaseAdapter` and must implement:

```javascript
class MyAdapter extends BaseAdapter {
  _convert(skill) {
    // Convert standard skill JSON to platform-specific format
    // Returns an object with at minimum: { name, format, frontmatter }
  }

  static getMetadata() {
    return {
      name: 'MyAdapter',
      platform: 'my-platform',
      version: '1.0.0',
      description: 'Adapter for My Platform',
      format: 'my-format-v1',
      capabilities: ['skills']
    };
  }
}
```

Adapters may optionally override `validateSkill(skill)` for platform-specific validation (e.g., Codex enforces `^[a-z0-9-]+$` name pattern).

## Platform-Specific Differences

### Frontmatter Fields

| Field | Claude | Gemini | Mistral Vibe | Codex |
|-------|--------|--------|--------------|-------|
| `name` | Required (`general-` prefix) | Required | Required | Required (`^[a-z0-9-]+$`, max 64 chars) |
| `description` | Required | Required | Required | Required (max 1024 chars) |
| `user-invocable` | Optional | Optional | Optional | N/A |
| `license` | N/A | N/A | Optional | Optional |
| `allowed-tools` | N/A | N/A | Optional | Optional |

### Output Structure

**Claude:** JSON plugin config in `.claude-plugin/plugin.json`

**Gemini:** Extension directory with `gemini-extension.json` + `skills/{name}/SKILL.md`

**Mistral Vibe:** Skill directories at `skills/{name}/SKILL.md`

**Codex:** Skill directories at `.agents/skills/{name}/SKILL.md`

## Usage

```javascript
// Convert a standard skill definition
const GeminiAdapter = require('./adapters/gemini/adapter');
const skill = require('./core/skills/example-skill.json');

const adapter = new GeminiAdapter();
const result = adapter.convert(skill);
console.log(result.frontmatter);

// Generate files to disk
adapter.generateExtension(skill, skillBodyMarkdown, 'output/gemini/general-dev-skills');
```

## Testing

```bash
node adapters/claude/test.js
node adapters/gemini/test.js
node adapters/mistral/test.js
node adapters/codex/test.js
```

## Adding New Adapters

1. Create a new directory under `adapters/`
2. Extend `BaseAdapter` from `base_adapter.js`
3. Implement `_convert(skill)` and `static getMetadata()`
4. Add a `test.js` following the existing test pattern
5. Update this README
