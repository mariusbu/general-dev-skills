/**
 * Skill Validator - Validates skill definitions
 */

class SkillValidator {
  /**
   * Validate a skill definition
   * @param {Object} skill - Skill definition to validate
   * @returns {boolean} True if valid
   */
  static validate(skill) {
    const requiredFields = ['name', 'description', 'version', 'triggers'];
    
    for (const field of requiredFields) {
      if (!skill[field]) {
        console.error(`Missing required field: ${field}`);
        return false;
      }
    }
    
    console.log(`Skill ${skill.name} is valid`);
    return true;
  }

  /**
   * Validate all skills in directory
   * @returns {Object} Validation report
   */
  static validateAll() {
    console.log('Validating all skills');
    return {valid: true, errors: []}; // Placeholder
  }
}

module.exports = SkillValidator;
