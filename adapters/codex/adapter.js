/**
 * OpenAI Codex Adapter
 * Converts standard skills to OpenAI Codex CLI skill format
 */

const BaseAdapter = require('../base_adapter');
const fs = require('fs');
const path = require('path');

const CODEX_NAME_PATTERN = /^[a-z0-9-]+$/;
const CODEX_NAME_MAX_LENGTH = 64;
const CODEX_DESCRIPTION_MAX_LENGTH = 1024;

class CodexAdapter extends BaseAdapter {
  /**
   * Validate skill for Codex format
   * Codex has stricter name requirements: hyphen-case, 1-64 chars, ^[a-z0-9-]+$
   * @param {Object} skill - Skill to validate
   * @returns {boolean} True if valid for Codex
   */
  validateSkill(skill) {
    if (!super.validateSkill(skill)) return false;
    if (!CODEX_NAME_PATTERN.test(skill.name)) return false;
    if (skill.name.length > CODEX_NAME_MAX_LENGTH) return false;
    if (skill.description.length > CODEX_DESCRIPTION_MAX_LENGTH) return false;
    return true;
  }

  /**
   * Convert skill to Codex SKILL.md format
   * @param {Object} skill - Standard skill definition
   * @returns {Object} Codex skill format with SKILL.md content
   */
  _convert(skill) {
    const frontmatter = [
      '---',
      `name: ${skill.name}`,
      `description: "${skill.description}"`,
    ];

    if (skill.license) {
      frontmatter.push(`license: ${skill.license}`);
    }

    // Codex supports allowed-tools in frontmatter
    if (skill.allowedTools) {
      frontmatter.push('allowed-tools:');
      for (const tool of skill.allowedTools) {
        frontmatter.push(`  - ${tool}`);
      }
    }

    frontmatter.push('---');

    return {
      name: skill.name,
      format: 'codex-skill-v1',
      frontmatter: frontmatter.join('\n')
    };
  }

  /**
   * Generate Codex skill directory structure under .agents/skills/
   * @param {Object} skill - Standard skill definition
   * @param {string} skillBody - Markdown body content (without frontmatter)
   * @param {string} outputDir - Output directory
   */
  generate(skill, skillBody, outputDir = 'output/codex/.agents/skills') {
    const converted = this.convert(skill);

    const skillDir = path.join(outputDir, skill.name);
    if (!fs.existsSync(skillDir)) {
      fs.mkdirSync(skillDir, { recursive: true });
    }

    const skillContent = skillBody
      ? `${converted.frontmatter}\n\n${skillBody}`
      : converted.frontmatter;

    const skillPath = path.join(skillDir, 'SKILL.md');
    fs.writeFileSync(skillPath, skillContent);

    console.log(`Generated Codex skill: ${skillPath}`);
  }

  static getMetadata() {
    return {
      name: 'CodexAdapter',
      platform: 'openai-codex',
      version: '1.0.0',
      description: 'Adapter for OpenAI Codex CLI',
      format: 'codex-skill-v1',
      capabilities: ['skills', 'allowed-tools', 'name-validation']
    };
  }
}

module.exports = CodexAdapter;
