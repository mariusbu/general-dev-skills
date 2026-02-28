/**
 * Gemini CLI Adapter Test
 */

const GeminiAdapter = require('./adapter');

// Test skill definition (standard format)
const testSkill = {
  name: 'general-frontend-developer',
  description: 'Frontend development skills for UI components, accessibility, and performance',
  version: '1.0.0',
  triggers: ['css', 'html', 'component', 'accessibility'],
  workflows: ['implement_ui_component', 'fix_accessibility', 'optimize_performance'],
  references: ['clean-code', 'accessibility-checklist']
};

console.log('Testing Gemini CLI Adapter...\n');

// Test 1: Get metadata
console.log('1. Adapter Metadata:');
console.log(GeminiAdapter.getMetadata());
console.log();

// Test 2: Validate skill
console.log('2. Skill Validation:');
const adapter = new GeminiAdapter();
const isValid = adapter.validateSkill(testSkill);
console.log(`Skill is valid: ${isValid}`);
console.log();

// Test 3: Convert to Gemini format
console.log('3. Skill Conversion:');
try {
  const geminiSkill = adapter.convert(testSkill);
  console.log(`Format: ${geminiSkill.format}`);
  console.log(`Manifest: ${JSON.stringify(geminiSkill.manifest, null, 2)}`);
  console.log('Frontmatter:');
  console.log(geminiSkill.frontmatter);
  console.log();
} catch (error) {
  console.error('Conversion failed:', error.message);
}

// Test 4: Convert skill with manual trigger (user-invocable)
console.log('4. User-invocable Skill:');
try {
  const manualSkill = { ...testSkill, triggers: ['css', 'manual'] };
  const result = adapter.convert(manualSkill);
  console.log(result.frontmatter);
  console.log();
} catch (error) {
  console.error('Conversion failed:', error.message);
}

// Test 5: Convert real skill from example-skill.json
console.log('5. Real Skill Conversion:');
try {
  const realSkill = require('../../core/skills/example-skill.json');
  const realResult = adapter.convert(realSkill);
  console.log(`Real skill name: ${realResult.name}`);
  console.log(`Manifest version: ${realResult.manifest.version}`);
  console.log();
} catch (error) {
  console.error('Real skill conversion failed:', error.message);
}

// Test 6: Generate files (commented out to avoid file system changes)
// console.log('6. Generating files...');
// adapter.generate(testSkill, '## Workflow: Test\n\n1. Do the thing');

console.log('Gemini CLI Adapter tests completed!');
