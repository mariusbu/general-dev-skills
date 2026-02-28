/**
 * Base Adapter Class
 * Abstract base class for all AI platform adapters
 */

class BaseAdapter {
  /**
   * Convert skill to platform-specific format
   * @param {Object} skill - Standard skill definition
   * @returns {Object} Platform-specific skill format
   * @throws {Error} If skill format is invalid
   */
  convert(skill) {
    if (!this.validateSkill(skill)) {
      throw new Error(`Invalid skill format for ${this.getMetadata().name}`);
    }
    return this._convert(skill);
  }

  /**
   * Validate skill format for this platform
   * @param {Object} skill - Skill to validate
   * @returns {boolean} True if valid
   */
  validateSkill(skill) {
    // Basic validation - can be overridden
    return skill && skill.name && skill.description;
  }

  /**
   * Platform-specific conversion (to be implemented by subclasses)
   * @param {Object} skill - Standard skill definition
   * @returns {Object} Platform-specific format
   * @protected
   */
  _convert(skill) {
    throw new Error('_convert() must be implemented by subclass');
  }

  /**
   * Get adapter metadata
   * @returns {Object} Adapter information
   */
  static getMetadata() {
    return {
      name: 'BaseAdapter',
      platform: 'abstract',
      version: '1.0.0',
      description: 'Abstract base adapter for AI platforms'
    };
  }
}

module.exports = BaseAdapter;
