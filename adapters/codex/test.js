/**
 * OpenAI Codex Adapter Test
 */

const CodexAdapter = require('./adapter');

// Test skill definition (standard format)
const testSkill = {
  name: 'general-backend-developer',
  description: 'This skill should be used when designing or implementing backend API endpoints, database schemas, query optimization, server-side business logic, or auth flows.',
  version: '1.0.0',
  triggers: ['api', 'database', 'backend'],
  workflows: ['implement_endpoint', 'design_schema'],
  references: ['clean-code', 'solid-principles'],
  license: 'MIT'
};

console.log('Testing OpenAI Codex Adapter...\n');

// Test 1: Get metadata
console.log('1. Adapter Metadata:');
console.log(CodexAdapter.getMetadata());
console.log();

// Test 2: Validate skill
console.log('2. Skill Validation:');
const adapter = new CodexAdapter();
const isValid = adapter.validateSkill(testSkill);
console.log(`Skill is valid: ${isValid}`);
console.log();

// Test 3: Convert to Codex format
console.log('3. Skill Conversion:');
try {
  const codexSkill = adapter.convert(testSkill);
  console.log(`Format: ${codexSkill.format}`);
  console.log('Frontmatter:');
  console.log(codexSkill.frontmatter);
  console.log();
} catch (error) {
  console.error('Conversion failed:', error.message);
}

// Test 4: Validate name constraints
console.log('4. Name Validation:');
const invalidNames = [
  { name: 'Invalid_Name', description: 'test', reason: 'underscores not allowed' },
  { name: 'UPPERCASE', description: 'test', reason: 'must be lowercase' },
  { name: 'a'.repeat(65), description: 'test', reason: 'exceeds 64 chars' },
];
for (const invalid of invalidNames) {
  const valid = adapter.validateSkill(invalid);
  console.log(`  "${invalid.name.substring(0, 20)}..." (${invalid.reason}): ${valid ? 'PASS (unexpected)' : 'REJECTED (correct)'}`);
}
console.log();

// Test 5: Validate description length constraint
console.log('5. Description Validation:');
const longDesc = { name: 'valid-name', description: 'x'.repeat(1025) };
const descValid = adapter.validateSkill(longDesc);
console.log(`  1025-char description: ${descValid ? 'PASS (unexpected)' : 'REJECTED (correct)'}`);
console.log();

// Test 6: Generate skill dir (commented out to avoid file system changes)
// console.log('6. Generating skill directory...');
// adapter.generateSkillDir(testSkill, '## Workflow: Test\n\n1. Do the thing');

console.log('OpenAI Codex Adapter tests completed!');
