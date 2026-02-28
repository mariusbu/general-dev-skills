/**
 * Gemini CLI Adapter
 * Converts standard skills to Gemini CLI extension format
 */

const BaseAdapter = require('../base_adapter');
const fs = require('fs');
const path = require('path');

class GeminiAdapter extends BaseAdapter {
  /**
   * Convert skill to Gemini CLI extension format
   * @param {Object} skill - Standard skill definition
   * @returns {Object} Gemini extension format with SKILL.md content and manifest
   */
  _convert(skill) {
    const frontmatter = [
      '---',
      `name: ${skill.name}`,
      `description: "${skill.description}"`,
    ];

    if (skill.triggers && skill.triggers.includes('manual')) {
      frontmatter.push('user-invocable: true');
    } else {
      frontmatter.push('user-invocable: false');
    }

    frontmatter.push('---');

    return {
      name: skill.name,
      format: 'gemini-extension-v1',
      frontmatter: frontmatter.join('\n'),
      manifest: {
        name: 'general-dev-skills',
        version: skill.version || '1.0.0',
        contextFileName: 'GEMINI.md'
      }
    };
  }

  /**
   * Generate Gemini CLI extension directory structure
   * @param {Object} skill - Standard skill definition
   * @param {string} skillBody - Markdown body content (without frontmatter)
   * @param {string} outputDir - Output directory
   */
  generateExtension(skill, skillBody, outputDir = 'output/gemini/general-dev-skills') {
    const converted = this.convert(skill);

    // Write gemini-extension.json manifest
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    const manifestPath = path.join(outputDir, 'gemini-extension.json');
    fs.writeFileSync(manifestPath, JSON.stringify(converted.manifest, null, 2));

    // Write SKILL.md into skills/{name}/
    const skillDir = path.join(outputDir, 'skills', skill.name);
    if (!fs.existsSync(skillDir)) {
      fs.mkdirSync(skillDir, { recursive: true });
    }

    const skillContent = skillBody
      ? `${converted.frontmatter}\n\n${skillBody}`
      : converted.frontmatter;

    const skillPath = path.join(skillDir, 'SKILL.md');
    fs.writeFileSync(skillPath, skillContent);

    console.log(`Generated Gemini extension: ${outputDir}`);
    console.log(`  Manifest: ${manifestPath}`);
    console.log(`  Skill: ${skillPath}`);
  }

  static getMetadata() {
    return {
      name: 'GeminiAdapter',
      platform: 'gemini-cli',
      version: '1.0.0',
      description: 'Adapter for Google Gemini CLI extensions',
      format: 'gemini-extension-v1',
      capabilities: ['skills', 'manifest', 'context-file']
    };
  }
}

module.exports = GeminiAdapter;
