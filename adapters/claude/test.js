/**
 * Claude Adapter Test
 */

const ClaudeAdapter = require('./adapter');

// Test skill definition (standard format)
const testSkill = {
  name: 'general-backend-developer',
  description: 'Backend development skills for Claude',
  version: '1.0.0',
  triggers: ['api', 'database', 'manual'],
  workflows: ['implement_endpoint', 'design_schema'],
  references: ['clean-code', 'solid-principles', 'test-driven-development']
};

console.log('Testing Claude Adapter...\n');

// Test 1: Get metadata
console.log('1. Adapter Metadata:');
console.log(ClaudeAdapter.getMetadata());
console.log();

// Test 2: Validate skill
console.log('2. Skill Validation:');
const adapter = new ClaudeAdapter();
const isValid = adapter.validateSkill(testSkill);
console.log(`Skill is valid: ${isValid}`);
console.log();

// Test 3: Convert to Claude format
console.log('3. Skill Conversion:');
try {
  const claudeSkill = adapter.convert(testSkill);
  console.log('Converted Claude skill:');
  console.log(JSON.stringify(claudeSkill, null, 2));
  console.log();
} catch (error) {
  console.error('Conversion failed:', error.message);
}

// Test 4: Convert real skill from example-skill.json
console.log('4. Real Skill Conversion:');
try {
  const realSkill = require('../../core/skills/example-skill.json');
  const realResult = adapter.convert(realSkill);
  console.log(`Real skill name: ${realResult.name}`);
  console.log(`References: ${realResult.references.length}`);
  console.log();
} catch (error) {
  console.error('Real skill conversion failed:', error.message);
}

// Test 5: Generate files (commented out to avoid file system changes)
// console.log('5. Generating files...');
// adapter.generate(testSkill);

console.log('Claude Adapter tests completed!');
