---
name: general-scientific-debugging
description: "This skill should be used when debugging any bug, failure, or unexpected behavior. Triggers on debugging requests, investigating errors, fixing test failures, diagnosing unexpected behavior, or root cause analysis. Apply the scientific method to debugging: observe, hypothesize, predict, experiment, conclude."
---

# Scientific Debugging

**See also**: `/general-code-quality-debugger` for code quality workflows.

Debug systematically using the scientific method. Never guess-and-check. Never shotgun-debug. Every action should test a specific hypothesis.

## The Method

### 1. Observe — Gather facts before forming opinions

Collect all available evidence before thinking about causes:

- **Read the error** — full stack trace, error message, error code. The answer is often right there.
- **Read the code** — trace the execution path by reading the source. Don't just read the line that threw — follow the data flow backward. Ask: "which lines of code contributed to this value being wrong?" (This is called *slicing*.)
- **Reproduce the bug** — get a reliable, minimal reproduction. If you can't reproduce it, you don't understand it yet. Use binary search on the input: if a large input triggers the bug, test with half the input and narrow down.
- **Note the context** — what changed recently? (`git log`, `git diff`). When did it last work? What's different now?
- **Check the environment** — correct database, API keys, config, dependency versions, OS, runtime.
- **Establish the baseline** — what is the *expected* behavior? What is the *actual* behavior? Be precise.

**If you can't reproduce it**: don't give up — increase observability. Add structured logging or tracing to the suspect code path. For timing-dependent or intermittent bugs, look for race conditions (shared mutable state, missing locks, async ordering assumptions), check if the failure correlates with load/timing/specific data, and try running with different concurrency settings or adding small delays to expose timing windows.

**Output of this step**: A clear written statement of the problem. "When [action], expected [X] but got [Y] in [context]."

### 2. Hypothesize — Propose a specific, falsifiable explanation

Based on your observations, form a hypothesis about the *cause* — not the symptom:

- A hypothesis must be **specific**: "The `userId` is null because the auth middleware doesn't run on this route" — not "something is wrong with auth."
- A hypothesis must be **falsifiable**: you must be able to design an experiment that would prove it wrong.
- **Prioritize likely causes** — recent code changes over old code, your code over library code, simple explanations over complex ones. But beware **recency bias**: your recent change might have *exposed* a latent bug rather than *caused* it.
- **One hypothesis at a time** — resist the urge to test multiple theories simultaneously. You won't know which one explains the result.

**Output of this step**: "I believe the cause is [X] because [evidence]."

### 3. Predict — State what you expect to see *before* you look

Before running any experiment, write down what you expect the result to be *if your hypothesis is correct*:

- "If the auth middleware is being skipped, then logging at the middleware entry point will NOT appear for this route."
- "If this variable is null at line 42, then adding a log before line 42 will print `null`."

This is the step most people skip, and it's the most important. Without a prediction, you can't distinguish between a confirming result and a coincidence. A prediction turns an experiment from "poking around" into science.

**Output of this step**: "If my hypothesis is correct, then I expect to see [Y] when I do [Z]."

### 4. Experiment — Change exactly one thing and observe

Design a **controlled experiment** — change one variable at a time:

- **Minimally invasive probes first** — logging, print statements, assertions, reading state in a debugger. Don't change the code under test yet.
- **One variable at a time** — if you change two things and the bug disappears, you don't know which change fixed it (or if both were needed).
- **Compare against a control** — a working case vs. the failing case. What differs?
- **Record the actual result** — don't rely on memory. Write it down or keep the terminal output.

Experiment types, from least to most invasive:
1. **Read** — inspect logs, state, config, database values
2. **Log** — add targeted print/log statements
3. **Assert** — add runtime assertions that crash on violated assumptions
4. **Bisect** — use divide-and-conquer to narrow the problem space. This takes many forms:
   - `git bisect` — find the exact commit that introduced the bug
   - Code bisection — comment out half the pipeline or code path; does the bug persist? Narrow by half each time.
   - Data bisection — halve the input; which half triggers the failure?
5. **Isolate** — write a minimal failing test case
6. **Modify** — change code only after you understand the cause

**Output of this step**: "I did [experiment]. I expected [prediction]. I actually observed [result]."

### 5. Conclude — Update your understanding based on evidence

Compare your prediction to the actual result:

- **Prediction confirmed** → your hypothesis gains confidence. Gather one more piece of confirming evidence before committing to a fix.
- **Prediction refuted** → your hypothesis is wrong. *This is progress.* Eliminate it and form a new one. Go back to step 2.
- **Unexpected result** → you learned something new. Update your mental model and form a new hypothesis.

**Never** ignore a result that contradicts your hypothesis. That's the most valuable data you can get.

Watch for **confirmation bias** — the tendency to notice evidence that supports your hypothesis and overlook evidence that contradicts it. Actively look for disconfirming evidence. Ask: "what would I expect to see if my hypothesis were *wrong*?"

### 6. Fix — Address the root cause, not the symptom

Once you have a confirmed hypothesis with evidence:

- **Fix the root cause** — if a null check fixes the crash but the value should never be null, fix *why* it's null.
- **Write a regression test** — a test that would have caught this bug, proving both that the bug existed and that your fix resolves it.
- **Search for siblings** — does the same bug pattern exist elsewhere in the codebase?
- **Verify the fix doesn't break other things** — run the full test suite, not just the failing test.
- **Clean up** — remove all debug logging, print statements, and temporary test modifications. They have no place in the final commit.

## Keep a Debugging Log

Scientists keep lab notebooks. You should keep a debugging log. Write things down as you go — don't rely on memory.

For each cycle through the method, record:

```
## Bug: [short description]

### Observations
- Error: [exact message]
- Reproduction: [steps]
- Last known working: [commit/date/change]

### Attempt 1
- Hypothesis: [what I think the cause is]
- Prediction: [what I expect to see]
- Experiment: [what I did]
- Result: [what actually happened]
- Conclusion: [confirmed / refuted / unexpected — and what I learned]

### Attempt 2
...
```

Why this matters:

- **You won't repeat failed experiments** — 45 minutes in, you forget what you already tried. Your log remembers.
- **Patterns emerge across attempts** — writing "attempt 1 failed because X, attempt 2 failed because Y" sometimes reveals that X and Y share a deeper root cause you hadn't considered.
- **Handoffs become possible** — if you're stuck and need help, documented findings let someone else pick up where you left off without re-doing your work.
- **Future bugs get easier** — the same class of bug often recurs. Past logs become a shortcut. When you see a familiar error, check if you've solved it before.

The log doesn't need to be formal. A comment in the issue tracker, a scratch file, even a terminal history with annotations — anything beats trying to reconstruct your reasoning from memory.

## Anti-Patterns — What NOT to Do

| Anti-pattern | Why it fails | Instead |
|---|---|---|
| **Shotgun debugging** — changing random things until it works | You don't know what fixed it; you may have introduced new bugs | Form a hypothesis first |
| **Fixing the symptom** — adding a null check without understanding why it's null | The root cause persists and will surface elsewhere | Trace the cause to its origin |
| **Changing multiple things at once** — "I refactored and also fixed the bug" | Impossible to verify which change was the fix | One change per experiment |
| **Skipping reproduction** — "I think I see the problem, let me just fix it" | You can't verify your fix without a reliable reproduction | Always reproduce first |
| **Anchoring on first hypothesis** — ignoring evidence that contradicts your initial guess | Confirmation bias wastes time on wrong paths | Let evidence guide you; abandon disproven hypotheses |
| **Debugging by printf without a hypothesis** — scattering log statements everywhere | Generates noise without signal | Log *specific values* that test *specific predictions* |
| **Brute-force resets** — restarting services, clearing caches, reinstalling deps "just in case" | Masks the root cause and it will return | Understand before you act |

## The 3-Attempt Rule

After 3 failed hypotheses on the same bug, STOP. You're likely missing something fundamental.

1. **Review your debugging log** — re-read your attempts. What do the failures have in common? What assumptions are shared across all three hypotheses?
2. **Question those shared assumptions** — what are you taking for granted that might be wrong? Is the bug even where you think it is?
3. **Widen the scope** — search for similar bugs in the codebase, check git history, look at upstream dependencies.
4. **Reset your context** — accumulated failed attempts create noise that degrades reasoning (for humans: fatigue; for AI: context pollution). Concrete actions:
   - *Human*: step away. Take a walk, work on something else, sleep on it. A fresh mind catches what a tired one misses.
   - *AI*: summarize all findings from the debugging log into a compact handoff, then start a fresh conversation with only that summary. A clean context lets you reason from evidence instead of anchoring on stale hypotheses.
5. **Change perspective** — explain the problem aloud (rubber duck). Ask: "If I were wrong about everything, what would I check first?"
6. **Ask for help** — present your documented findings from the debugging log. Two sets of eyes catch what one misses, and a log means they don't have to redo your work.

## Quick Reference

```
OBSERVE  →  "When [action], expected [X] but got [Y]."
HYPOTHESIZE  →  "I believe the cause is [Z] because [evidence]."
PREDICT  →  "If correct, then [experiment] should show [result]."
EXPERIMENT  →  "I did [experiment]. I saw [actual result]."
CONCLUDE  →  Confirmed / Refuted / Unexpected → loop back or fix.
FIX  →  Root cause fix + regression test + sibling search + clean up.
LOG  →  Record every cycle. Your future self will thank you.
```
