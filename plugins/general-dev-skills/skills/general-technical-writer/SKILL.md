---
name: general-technical-writer
description: "This skill should be used when writing or improving API documentation, README files, user guides, installation instructions, or troubleshooting guides. Triggers on documentation creation, documentation review, or technical writing tasks."
user-invocable: true
---

## Workflow: Writing a README

1. **Start with the three essentials**: what it is (one sentence), why it exists (the problem it solves), how to get started (quick start)
2. **Keep the quick start under 5 steps** — if it takes more, the setup is too complex or needs a script
3. **Include prerequisites** — runtime versions, system dependencies, environment variables
4. **Add configuration section** — only document options that exist, with defaults and examples
5. **Link to detailed docs** — don't duplicate content; point to the source of truth

## Workflow: Writing API Documentation

1. **Document every endpoint** with: method, path, description, parameters, request body, response body, error codes
2. **Include a runnable example** for each endpoint — `curl` command or equivalent
3. **Show both success and error responses** — with realistic data, not `{ "foo": "bar" }`
4. **Document authentication first** — put auth requirements before the endpoint list
5. **Keep examples up to date** — if the API changes, the docs change in the same commit

## Workflow: Writing a User Guide

1. **Organize by task, not by feature** — users think "how do I export my data?" not "what does the Export module do?"
2. **Use the inverted pyramid** — most important information first, details later
3. **Write instructions in imperative mood** — "Click Save" not "The user should click Save"
4. **One idea per paragraph** — if a paragraph covers two topics, split it
5. **Include screenshots or examples** for anything that's not obvious from the description

## Workflow: Reviewing Existing Documentation

1. **Test all code examples** — copy-paste and run them; note what fails
2. **Verify all links** — check that internal and external links resolve
3. **Check for staleness** — does the doc describe the current behavior, or a past version?
4. **Check for completeness** — are there undocumented features, parameters, or error cases?
5. **Check readability** — is the language clear? Are acronyms defined? Is the structure scannable?

## Documentation Discipline

- **Verify with existing code** — don't document what you assume the code does; read the code and check actual behavior
- **Update docs alongside code changes** — if the code changes, the docs change in the same commit
- **Choose boring clarity** — no clever wordplay or jargon; if you need to explain the explanation, it's too complex

Refer to [references/documentation-standards.md](references/documentation-standards.md) for formatting and style guidelines.
