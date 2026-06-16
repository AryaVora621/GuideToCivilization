# ORCHESTRATOR RESUME GUIDE (read this first on reboot)

You are the **head orchestrator** of 4 Haiku content-writer agents building the
"Guide to Civilization" (316 chapters). You are Opus (expensive) — keep every
sweep LEAN. The agents are cheap/fast — they do the writing; you only coordinate,
reconcile the DB, fix build-breakers, push to GitHub, and verify the Vercel deploy.

## Working dir
`/Users/aryavora/Desktop/Personal Projects/guide to civilization/guide-to-civilization`

## CRITICAL on reboot — do these in order
1. **Recreate the cron** (session-only crons DIE on reboot). CronCreate:
   - cron: `7 */2 * * *` (every 2h), recurring: true
   - prompt: the full sweep prompt (see "SWEEP PROCEDURE" below).
2. Run one sweep now (SWEEP PROCEDURE).
3. Confirm dev server on :3000 is up (`curl -s -o /dev/null -w '%{http_code}' http://localhost:3000`). If down, `npm run dev` in background. NEVER run `next build` locally — it kills the dev server. Verify builds via Vercel only.

## Hard rules (user requirements)
- **Git commits: author "Arya Vora" <aryavora621@gmail.com>, NO "Co-Authored-By: Claude" trailer.** Never attribute to Claude on GitHub.
- Push to `main` whenever new chapters land → Vercel auto-deploys.
- `scripts/tasks.db` is gitignored (local coordination only).
- Budget mode: minimize Opus tool calls; tell agents to work SILENTLY (ping only on blocker/done). Don't nudge exhausted agents repeatedly.

## Key facts
- GitHub: `AryaVora621/GuideToCivilization` (gh authenticated as AryaVora621). Branch `main`.
- Live site: **https://guide-to-civilization.vercel.app** (auto-deploys on push).
- Verify deploy: `gh api repos/AryaVora621/GuideToCivilization/commits/<sha>/status --jq .state` → poll until success/failure.
- Agent peer IDs (may change if restarted): agent-1=rx8y9euk, agent-2=5d08vogx, agent-3=52fgricn, agent-4=e9vlfcu5. Use claude-peers list_peers/send_message.
- Source of truth = `scripts/tasks.db` (sqlite). `bash scripts/tasks.sh status`.
- Agents have their own self-contained brief: **AGENT_BRIEF.md** (point cleared agents to it).

## THE recurring build-breaker (most common deploy failure)
Agents write `<` directly before a digit in prose (e.g. `<10%`, `<38°C`). MDX reads
`<digit` as a broken JSX tag and FAILS the Vercel build (the `/print/[vol]` page
compiles a whole volume at once, so one bad file fails everything).
**Fix every sweep BEFORE pushing:**
```
for f in $(grep -rlE '<[0-9]' content/volumes --include=index.mdx); do perl -i -pe 's/<(?=\d)/&lt;/g' "$f"; done
```
(`>` before a digit is fine; only `<` breaks.)

## SWEEP PROCEDURE (the cron prompt / what each sweep does)
1. Status: `bash scripts/tasks.sh status`; counts via sqlite.
2. Release stale claims (>25min old AND no real file): `bash scripts/tasks.sh release <id>`.
3. Reconcile: any `content/volumes/<id>/index.mdx` with >1000 words but status!=done →
   `sqlite3 scripts/tasks.db "UPDATE chapters SET status='done', completed_at=datetime('now') WHERE id='<id>';"`
4. Build-breaker scan + fix (command above).
5. If new chapters since last commit: `git add -A && git commit -m "..." && git push origin main` (author Arya, NO co-author).
6. Verify deploy: poll gh commit status until success/failure. If failure, pull Vercel build log (or reproduce statically) and fix.
7. Nudge agents ONLY if idle AND budget likely; tell them resume SILENTLY.
8. Update this file briefly.

## Priority order for remaining work
Phase 1 (Vols 1-8) ✓ DONE. Then Vols 14-20, then 21-33, then Phase 4-5 (33-45).

## Agent lanes (assigned 2026-06-16 17:40 UTC, ~111 chapters left)
- **Agent-1**: Vols 21,23,24,25,26 → slugs 02-scientific-method, 04-language-communication, 26-cartography-surveying, 32-trade-money-markets, 23-meteorology-earth-sciences
- **Agent-2**: Vols 34,35,36,37,38 → 37-energy-systems, 15-transportation, 39-seafaring-oceanography, 12-electrical-engineering, 13-manufacturing
- **Agent-3** (top performer): Vols 30,39,40,44 → finish 17-astronomy-navigation, 43-polymers-synthetic-materials, 44-precision-metrology, 16-computing
- **Agent-4**: Vols 41,42,43,45 → 45-telecommunications, 41-vacuum-tubes-early-electronics, 42-magnetic-analog-recording, 40-semiconductor-technology
When a lane is exhausted, agent runs `claim-next` with no arg to take anything left.

## CURRENT STATE (update each sweep)
- 2026-06-16 17:40 UTC: **203 / 316 done**, 111 pending, 0 active, 0 drift, build green (commit 14acb1a live).
- All 4 agent sessions were just /cleared by user (to save tokens) — re-briefed via AGENT_BRIEF.md.
- Pattern: agents burst ~15-20 chapters then idle ~1.5h.
