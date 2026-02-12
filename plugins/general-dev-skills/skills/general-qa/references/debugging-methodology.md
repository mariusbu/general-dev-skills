# Debugging Methodology

## The 3-Attempt Protocol

After 3 failed attempts at fixing the same issue, STOP and do the following:

### 1. Document What Failed
- What you tried (specific changes, not vague descriptions)
- The exact error messages after each attempt
- Why you think each attempt failed

### 2. Research Alternatives
- Find 2-3 similar implementations in the codebase or open source
- Note what approaches they use that differ from yours
- Check if there's an existing utility or library that handles this case

### 3. Question Your Assumptions
- Is this the right abstraction level? Maybe the problem is one layer up or down.
- Can this be split into smaller, independently testable problems?
- Is there a fundamentally simpler approach? (Remove complexity instead of adding it.)
- Are you solving the right problem, or a symptom?

### 4. Try a Different Angle
- Different library or framework feature
- Different architectural pattern (e.g., pull instead of push, sync instead of async)
- Remove abstraction instead of adding it
- Ask the user for guidance with your documented findings

## Debugging Checklist

Before diving into code, check these common causes first:
- [ ] Read the full error message and stack trace (the answer is often there)
- [ ] Check if the error is in your code or a dependency
- [ ] Verify the environment (correct database, API keys, config, versions)
- [ ] Check recent changes (git log/diff) — what changed since it last worked?
- [ ] Try to reproduce with the simplest possible case
