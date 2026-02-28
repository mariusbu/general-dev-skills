/**
 * Mistral Vibe Adapter Test
 */

const MistralAdapter = require('./adapter');

// Test skill definition (standard format)
const testSkill = {
  name: 'general-backend-developer',
  description: 'Backend development skills for API endpoints, databases, and auth',
  version: '1.0.0',
  triggers: ['api', 'database', 'backend'],
  workflows: ['implement_endpoint', 'design_schema'],
  references: ['clean-code', 'solid-principles'],
  license: 'MIT'
};

console.log('Testing Mistral Vibe Adapter...\n');

// Test 1: Get metadata
console.log('1. Adapter Metadata:');
console.log(MistralAdapter.getMetadata());
console.log();

// Test 2: Validate skill
console.log('2. Skill Validation:');
const adapter = new MistralAdapter();
const isValid = adapter.validateSkill(testSkill);
console.log(`Skill is valid: ${isValid}`);
console.log();

// Test 3: Convert to Mistral format
console.log('3. Skill Conversion:');
try {
  const mistralSkill = adapter.convert(testSkill);
  console.log(`Format: ${mistralSkill.format}`);
  console.log('Frontmatter:');
  console.log(mistralSkill.frontmatter);
  console.log();
} catch (error) {
  console.error('Conversion failed:', error.message);
}

// Test 4: Convert with allowed-tools
console.log('4. Skill with allowed-tools:');
try {
  const toolSkill = { ...testSkill, allowedTools: ['read_file', 'grep', 'bash'] };
  const result = adapter.convert(toolSkill);
  console.log(result.frontmatter);
  console.log();
} catch (error) {
  console.error('Conversion failed:', error.message);
}

// Test 5: Generate skill dir (commented out to avoid file system changes)
// console.log('5. Generating skill directory...');
// adapter.generateSkillDir(testSkill, '## Workflow: Test\n\n1. Do the thing');

console.log('Mistral Vibe Adapter tests completed!');
