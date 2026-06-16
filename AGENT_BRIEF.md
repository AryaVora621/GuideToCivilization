# AGENT BRIEF — read this on every resume / after any /clear

You are a **content-writer agent** for the "Guide to Civilization" project (316
chapters across 45 volumes). An orchestrator coordinates you and 3 peers via the
claude-peers network. If your context was cleared, this file is all you need.

Working dir: `/Users/aryavora/Desktop/Personal Projects/guide to civilization/guide-to-civilization`

## Your loop (repeat ~every 15 min)
1. **Claim**: `AGENT_ID=agent-N bash scripts/tasks.sh claim-next <volume-slug>`
   → it prints the EXACT canonical chapter id, e.g. `14-medicine/01-anatomy-overview`.
   (Replace N with your agent number. With no <volume-slug> it claims the next global pending chapter.)
2. **Write** the chapter at `content/volumes/<EXACT-id>/index.mdx`, **2000+ words**.
   Copy the structure of an existing chapter — read `content/volumes/07-biology/01-cell-theory/index.mdx`:
   YAML frontmatter (title, volume, chapter, difficulty, prerequisites, unlocks, tags, summary),
   then instructional markdown: overview, prerequisites, materials/tools, step-by-step
   sections, worked examples, verification criteria, common mistakes, cross-references.
3. **Verify**: `test -s content/volumes/<id>/index.mdx && wc -w content/volumes/<id>/index.mdx` (must be >1000, aim 2000+).
4. **Complete**: `AGENT_ID=agent-N bash scripts/tasks.sh complete <id>`
5. Repeat.

## Hard rules
- Use the EXACT id from `claim-next`. NEVER invent directory/slug names. Display
  numbers (e.g. "Vol 17") are NOT the directory slug (e.g. `10-materials`).
- **Never write `<` directly before a digit in prose** (e.g. `<10%`, `<3 mm`, `<38°C`).
  MDX reads `<digit` as a broken HTML tag and FAILS the deploy. Write "under 10%" /
  "below 3 mm", or use `&lt;10%`. (`>` before a digit is fine.)
- In YAML frontmatter, QUOTE any value containing a colon: `- "Vol 1: Survival — ..."`.
- ALWAYS verify the file exists and is >1000 words BEFORE running `complete`.
- Work SILENTLY. Only message the orchestrator on a blocker or when your lane/budget is done.

## Lanes (which volumes are yours)
- Agent-1: 02-scientific-method, 04-language-communication, 26-cartography-surveying, 32-trade-money-markets, 23-meteorology-earth-sciences
- Agent-2: 37-energy-systems, 15-transportation, 39-seafaring-oceanography, 12-electrical-engineering, 13-manufacturing
- Agent-3: 17-astronomy-navigation, 43-polymers-synthetic-materials, 44-precision-metrology, 16-computing
- Agent-4: 45-telecommunications, 41-vacuum-tubes-early-electronics, 42-magnetic-analog-recording, 40-semiconductor-technology
When your lane is fully done, run `claim-next` with no arg to take any remaining chapter.

## After a milestone, you MAY /clear your own context to save tokens
Finish your current chapter + mark it complete first, then /clear, then re-read
this file and continue your loop. Nothing is lost — the DB tracks your progress.
