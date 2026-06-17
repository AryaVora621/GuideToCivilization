# APPENDIX BRIEF — reference-content writing (read on resume/after /clear)

The 317 chapters are DONE. Final remaining content: the **12 appendices (A–L)**, which
are currently ~350-byte placeholder stubs. Each appendix is a single MDX file (NOT a
chapter directory) at `content/appendices/<ID>.mdx`.

Working dir: `/Users/aryavora/Desktop/Personal Projects/guide to civilization/guide-to-civilization`

## Format (different from chapters)
Appendices are REFERENCE material — tables, charts, identification keys, quick-lookup
data designed to be useful "at a glance". Keep the existing frontmatter exactly:
```
---
title: "<existing title>"
id: "<existing id, e.g. A-periodic-table>"
---
```
Then write **1500+ words** of dense reference content: lots of **Markdown tables**,
ordered identification keys, labelled lists, and short explanatory notes. Less prose,
more structured data than a chapter. Use GFM tables (remark-gfm is enabled).

## Hard rules (same MDX safety rules as chapters)
- NEVER write `<` directly before a digit (`<10`, `<3mm`) — it breaks the MDX/Vercel build.
  Write "under 10" / "below 3 mm" / `&lt;10`. (`>` before a digit is fine.)
- Quote any YAML value containing a colon.
- Do NOT change the `id:` — it must match the filename (routing depends on it).
- Verify the file is >1200 words before reporting done: `wc -w content/appendices/<ID>.mdx`.

## Assignments (write your assigned appendices, then ping orchestrator)
- Agent-2: A-periodic-table, B-star-charts
- Agent-3: C-world-maps, D-seed-identification
- Agent-4: E-edible-poisonous-plants, F-animal-identification
- Agent-5: G-ore-mineral-identification, H-engineering-drawings
- Agent-6: I-units-standards, J-instrument-construction
- Agent-7: K-paper-ink-bookbinding
- Agent-8: L-tech-tree  (textual reference: list every volume and its prerequisite
  volumes / what it unlocks, as a dependency table + the 5-phase progression. The
  interactive graph version is built separately by the orchestrator.)

Overwrite the stub file in place (keep its frontmatter). Work silently; ping the
orchestrator only when your appendices are done or you hit a blocker. If you are out
of budget, say so and the orchestrator will reassign.
