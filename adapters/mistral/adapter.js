/**
 * Mistral Vibe Adapter
 * Converts standard skills to Mistral Vibe skill format
 */

const BaseAdapter = require('../base_adapter');
const fs = require('fs');
const path = require('path');

class MistralAdapter extends BaseAdapter {
  /**
   * Convert skill to Mistral Vibe SKILL.md format
   * @param {Object} skill - Standard skill definition
   * @returns {Object} Mistral Vibe skill format with SKILL.md content
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

    if (skill.triggers && skill.triggers.includes('manual')) {
      frontmatter.push('user-invocable: true');
    } else {
      frontmatter.push('user-invocable: false');
    }

    // Vibe supports allowed-tools in frontmatter
    if (skill.allowedTools) {
      frontmatter.push('allowed-tools:');
      for (const tool of skill.allowedTools) {
        frontmatter.push(`  - ${tool}`);
      }
    }

    frontmatter.push('---');

    return {
      name: skill.name,
      format: 'mistral-vibe-v1',
      frontmatter: frontmatter.join('\n')
    };
  }

  /**
   * Generate Mistral Vibe skill directory structure
   * @param {Object} skill - Standard skill definition
   * @param {string} skillBody - Markdown body content (without frontmatter)
   * @param {string} outputDir - Output directory
   */
  generateSkillDir(skill, skillBody, outputDir = 'output/mistral/skills') {
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

    console.log(`Generated Mistral Vibe skill: ${skillPath}`);
  }

  static getMetadata() {
    return {
      name: 'MistralAdapter',
      platform: 'mistral-vibe',
      version: '1.0.0',
      description: 'Adapter for Mistral Vibe CLI',
      format: 'mistral-vibe-v1',
      capabilities: ['skills', 'allowed-tools']
    };
  }
}

module.exports = MistralAdapter;
