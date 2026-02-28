/**
 * Claude Adapter
 * Converts standard skills to Claude plugin format
 */

const BaseAdapter = require('../base_adapter');
const fs = require('fs');
const path = require('path');

class ClaudeAdapter extends BaseAdapter {
  /**
   * Convert skill to Claude plugin format
   * @param {Object} skill - Standard skill definition
   * @returns {Object} Claude plugin format
   */
  _convert(skill) {
    // Map standard skill fields to Claude format
    const claudeSkill = {
      name: skill.name,
      description: skill.description,
      user_invocable: skill.triggers && skill.triggers.includes('manual'),
      references: [],
      format: 'claude-plugin-v1'
    };

    // Add references if they exist
    if (skill.references) {
      claudeSkill.references = skill.references.map(ref => 
        `references/${ref}.md`
      );
    }

    // Add workflows if they exist
    if (skill.workflows) {
      claudeSkill.workflows = skill.workflows;
    }

    return claudeSkill;
  }

  /**
   * Validate skill for Claude format
   * @param {Object} skill - Skill to validate
   * @returns {boolean} True if valid for Claude
   */
  validateSkill(skill) {
    return super.validateSkill(skill) && 
           skill.name.startsWith('general-'); // Claude requires "general-" prefix
  }

  /**
   * Generate Claude plugin.json file
   * @param {Object} skill - Standard skill definition
   * @param {string} outputDir - Output directory
   */
  generatePluginFile(skill, outputDir = 'plugins/general-dev-skills') {
    const claudeSkill = this.convert(skill);
    const pluginDir = path.join(outputDir, '.claude-plugin');
    
    // Ensure directory exists
    if (!fs.existsSync(pluginDir)) {
      fs.mkdirSync(pluginDir, { recursive: true });
    }

    // Write plugin.json
    const pluginPath = path.join(pluginDir, 'plugin.json');
    fs.writeFileSync(pluginPath, JSON.stringify(claudeSkill, null, 2));
    
    console.log(`Generated Claude plugin: ${pluginPath}`);
  }

  /**
   * Get adapter metadata
   * @returns {Object} Adapter information
   */
  static getMetadata() {
    return {
      name: 'ClaudeAdapter',
      platform: 'claude',
      version: '1.0.0',
      description: 'Adapter for Anthropic Claude AI platform',
      format: 'claude-plugin-v1',
      capabilities: ['skills', 'references', 'workflows']
    };
  }
}

module.exports = ClaudeAdapter;
