/**
 * Skill Validator - Validates skill definitions against SKILL_FORMAT.md spec
 */

const fs = require('fs');
const path = require('path');

const SEMVER_PATTERN = /^\d+\.\d+\.\d+$/;
const VALID_FORMAT = 'standard-v1';

class SkillValidator {
  /**
   * @param {Object} options
   * @param {string} options.referencesDir - Path to references directory
   */
  constructor(options = {}) {
    this.referencesDir = options.referencesDir ||
      path.resolve(__dirname, '../references');
  }

  /**
   * Validate a skill definition against the standard format spec
   * @param {Object} skill - Skill definition to validate
   * @returns {{ valid: boolean, errors: string[] }}
   */
  validate(skill) {
    const errors = [];

    // Required fields
    const required = ['name', 'description', 'version', 'triggers', 'format'];
    for (const field of required) {
      if (!skill[field]) {
        errors.push(`Missing required field: ${field}`);
      }
    }

    if (errors.length > 0) {
      return { valid: false, errors };
    }

    // Name format
    if (typeof skill.name !== 'string' || skill.name.length === 0) {
      errors.push('name must be a non-empty string');
    }

    // Version must be semver
    if (!SEMVER_PATTERN.test(skill.version)) {
      errors.push(`version must follow semver (MAJOR.MINOR.PATCH), got: ${skill.version}`);
    }

    // Format must be standard-v1
    if (skill.format !== VALID_FORMAT) {
      errors.push(`format must be "${VALID_FORMAT}", got: "${skill.format}"`);
    }

    // Triggers must be a non-empty array
    if (!Array.isArray(skill.triggers) || skill.triggers.length === 0) {
      errors.push('triggers must be a non-empty array of strings');
    }

    // References must point to existing files
    if (skill.references && Array.isArray(skill.references)) {
      for (const ref of skill.references) {
        const refPath = path.join(this.referencesDir, `${ref}.md`);
        if (!fs.existsSync(refPath)) {
          errors.push(`Reference not found: ${ref} (expected at ${refPath})`);
        }
      }
    }

    // Optional field types
    if (skill.workflows && !Array.isArray(skill.workflows)) {
      errors.push('workflows must be an array');
    }

    if (skill.user_invocable !== undefined && typeof skill.user_invocable !== 'boolean') {
      errors.push('user_invocable must be a boolean');
    }

    return { valid: errors.length === 0, errors };
  }

  /**
   * Validate all JSON skill files in a directory
   * @param {string} skillsDir - Path to skills directory
   * @returns {{ valid: boolean, results: Object[] }}
   */
  validateAll(skillsDir) {
    skillsDir = skillsDir || path.resolve(__dirname, '../skills');
    const results = [];
    let allValid = true;

    const files = fs.readdirSync(skillsDir)
      .filter(f => f.endsWith('.json'));

    for (const file of files) {
      const filePath = path.join(skillsDir, file);
      const skill = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const result = this.validate(skill);
      results.push({ file, ...result });
      if (!result.valid) allValid = false;
    }

    return { valid: allValid, results };
  }
}

module.exports = SkillValidator;
