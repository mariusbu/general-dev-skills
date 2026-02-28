/**
 * Skill Loader - Loads and manages skills from the core/skills directory
 */

const fs = require('fs');
const path = require('path');

class SkillLoader {
  /**
   * @param {Object} options
   * @param {string} options.skillsDir - Path to skills directory
   */
  constructor(options = {}) {
    this.skillsDir = options.skillsDir ||
      path.resolve(__dirname, '../skills');
  }

  /**
   * Load a single skill JSON file by name
   * @param {string} skillName - Name of the skill (e.g., "general-backend-developer")
   * @returns {Object|null} Skill definition or null if not found
   */
  load(skillName) {
    // Try loading the JSON version first
    const jsonPath = path.join(this.skillsDir, `${skillName}.json`);
    if (fs.existsSync(jsonPath)) {
      return JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    }

    // Try parsing frontmatter from the markdown version
    const mdPath = path.join(this.skillsDir, `${skillName}.md`);
    if (fs.existsSync(mdPath)) {
      return this._parseMarkdownSkill(mdPath, skillName);
    }

    return null;
  }

  /**
   * Load all skill definitions from the directory
   * @returns {Object[]} Array of skill definitions
   */
  loadAll() {
    const skills = [];
    const seen = new Set();
    const files = fs.readdirSync(this.skillsDir);

    // Load JSON files first (canonical format)
    for (const file of files) {
      if (!file.endsWith('.json')) continue;
      const filePath = path.join(this.skillsDir, file);
      const skill = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      seen.add(skill.name);
      skills.push(skill);
    }

    // Load markdown skills that don't have a JSON version
    for (const file of files) {
      if (!file.endsWith('.md') || file === 'SKILL_FORMAT.md') continue;
      const name = file.replace('.md', '');
      if (seen.has(name)) continue;
      const skill = this._parseMarkdownSkill(
        path.join(this.skillsDir, file), name
      );
      if (skill) {
        seen.add(name);
        skills.push(skill);
      }
    }

    return skills;
  }

  /**
   * Find a skill matching a trigger keyword
   * @param {string} trigger - Trigger keyword to match
   * @returns {Object|null} First matching skill or null
   */
  getByTrigger(trigger) {
    const skills = this.loadAll();
    const lower = trigger.toLowerCase();
    return skills.find(s =>
      s.triggers && s.triggers.some(t => t.toLowerCase() === lower)
    ) || null;
  }

  /**
   * Parse a SKILL.md file into a skill-like object
   * @param {string} filePath - Path to the markdown file
   * @param {string} fallbackName - Name to use if not in frontmatter
   * @returns {Object|null} Parsed skill object
   * @private
   */
  _parseMarkdownSkill(filePath, fallbackName) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return null;

    const frontmatter = match[1];
    const skill = { name: fallbackName };

    for (const line of frontmatter.split('\n')) {
      const kv = line.match(/^(\w[\w-]*):\s*"?(.+?)"?\s*$/);
      if (!kv) continue;
      const [, key, value] = kv;
      if (key === 'name') skill.name = value;
      else if (key === 'description') skill.description = value;
      else if (key === 'user-invocable') skill.user_invocable = value === 'true';
    }

    return skill;
  }
}

module.exports = SkillLoader;
