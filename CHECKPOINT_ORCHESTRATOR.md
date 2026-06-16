# Orchestrator Checkpoint

**Role:** Head orchestrator (agents 1-4), 30-min loop (cron job 3ad20d60)
**Last run:** 2026-06-15 21:15 local (2026-06-16 01:15 UTC)

## Source of truth
`scripts/tasks.db` (sqlite). Use `bash scripts/tasks.sh status`. TASK_QUEUE.md is stale/secondary.

## Current state
- **47 / 316** chapters done. 265 pending, 1 active (agent-3).
- Build: **PASSING** (exit 0, no errors; only benign dual-lockfile workspace-root warning).
- Done by agent: agent-1=12, agent-4(="4")=11, agent-2=9, agent-3=8, misc(agent-A/B/C/test/empty)=7.

## Live peers
- agent-1 = rx8y9euk (active)
- agent-2 = 5d08vogx (~49k token budget cap)
- agent-3 = 52fgricn (no summary set yet; holds Vol2 ch6 claim)
- agent-4 = e9vlfcu5 (~73k tokens left; writes agent_id as "4" — asked to fix to "agent-4")

## Lane assignments (issued this run)
- agent-1: Vols 14-20
- agent-2: Vol 8, then Vols 21-26
- agent-3: finish Vol 2, then Vols 27-33
- agent-4: Vols 9-13 (confirmed)
- Unassigned/backlog: Vols 34-45 + appendices (round-robin once lanes drain)

## Actions taken this run
- Released 2 stale stub claims (agent-B/agent-C, ~44min old, 110-125 word stubs) in Vol 3:
  01-survival/03-shelter-construction, 01-survival/04-food-preservation → back in pool.

## Error sweep (2026-06-15 21:30 local) — FIXES APPLIED
- **DB drift fixed:** 15 chapters were marked `done` with NO index.mdx (empty/missing dirs) + 1 stub (01-survival/08-rope-knots, 115 words). All 16 reset to `pending`. DB backed up to scripts/tasks.db.bak.*. Done count corrected 49 -> 35.
- **Root cause of old "MDX linter" failures:** NOT a linter (none exists, no hooks/settings.json). It's unquoted YAML values containing colons in frontmatter (e.g. `- Vol 1: Survival`). Fix = quote them: `- "Vol 1: Survival — ..."`. Broadcast to all 4 agents.
- **Prevention broadcast:** all agents told to create content ONLY at the exact id from `tasks.sh claim-next`, never invent dir names.

## OPEN DECISION — 6 orphaned chapters (~11.5k words, real content, wrong slugs)
Agent wrote these under invented display-number slugs; invisible to site + not in DB:
| orphan dir | canonical volume | topical fit |
|---|---|---|
| 29-military-history-defense/01-defense-strategy | 31-military-defense | ch3 "03-defensive-strategy" (good) |
| 30-natural-resources/01-mining-extraction | 09-natural-resources | no exact ch (geology/ore/groundwater) |
| 31-ceramics-pottery/01-ceramic-techniques | 34-ceramics-pottery | generic vs clay-id/hand-building/wheel |
| 32-textile-fiber-arts/01-fiber-processing | 21-textile-fiber-arts | ch1 "01-plant-fiber-processing" (ok) |
| 33-materials/01-material-properties | 10-materials | no fit (woodworking/brick/glass) |
| 34-architecture-structural/01-structural-principles | 22-architecture-structural-engineering | generic vs load-calc/foundations/arch |
Recommendation: preserve as NEW canonical chapters (add DB rows + fix frontmatter volume#) rather than overwrite mismatched slots. AWAITING USER OK before migrating. Do NOT let agents touch these dirs meanwhile.

## Sweep 2 (2026-06-16 01:38 UTC)
- 37 done / 38 files / 276 pending. Build typechecks clean (used `npx tsc --noEmit`, NOT next build — protects live dev server).
- Reset recurring false-done `19-civilization-roadmap/01-how-to-use-this-guide` AGAIN (empty dir; an agent on Vol 1 marks complete without the file landing — likely "agent-28708" who holds 19-civ/02).
- Removed leftover agent-B/C stub files (01-survival/03,04 — 110-125 words, were pending).
- All 4 peers alive. agent-3 (52fgricn) still no summary. Non-canonical id "agent-28708" seen; agent-4 has ~0 valid canonical chapters (its earlier output was the deleted orphans).
- NEW RULE broadcast to all 4: verify `test -s .../index.mdx && wc -w` (>1000 words) BEFORE `tasks.sh complete`. This is the fix for recurring false-done.
- Dev server: running in background (task bstcjocch) on :3000, serving 200.

## Sweep 3 (2026-06-16 04:34 UTC) — COST MODE + idle recovery
- **User asleep; budget priority.** Opus (me) is expensive, agents are cheap Haiku. Slowed my cron 30min -> **every 2h** (job 2f0b3d90, deleted 3ad20d60). Leaner sweep prompt to cut tokens.
- **Agents had stalled ~3h** (last completion 01:50 UTC). Nudged all 4 to resume self-paced loops; reply "DONE"+count if budget-exhausted so I reassign. Agent-3 resumed immediately (has budget).
- Fixes: released dead claim 19-civ/02 (no file, 3h stale, by phantom "agent-28708"); marked agent-4's real crop-rotation (2193w) done (was written, never completed before idle).
- Dev server died again (500); restarted (bg task bcako8an1), now 200. NOTE: dev server is fragile — do NOT run `next build` or `rm .next` while it runs; use `npx tsc --noEmit` for validation.
- State: 52 files = 52 done, ZERO drift, 0 stale claims. ~263 pending.

## Overnight plan
- Agents self-run on Haiku (10min loops); I supervise every 2h only.
- Each 2h sweep: status+drift+stale-claim release+mark-verified-done+nudge-idle+tsc. Keep it lean.
- If agents all report DONE/budget-exhausted, the project pauses until morning — surface that to user, don't burn Opus spinning.

## Sweep 4 (2026-06-16 06:24 UTC) — 2h cron, lean
- Big overnight throughput: 66 -> **104 done** (=104 files, zero drift), dev 200.
- Fixes: released dead stale claim 03-mathematics/03-algebra (no file, 1h46m); marked 3 verified env-science chapters done (carrying-capacity/ecosystem-restoration/pollution-prevention, 2k+ each, were stuck claimed); discarded 3 wrong-CHAPTER-slug astronomy chapters (17-astronomy-navigation/01-astronomy-basics etc. — invented slugs vs canonical celestial-sphere/star-identification; thin 1.2k; per established discard policy).
- NEW failure mode: chapter-level slug invention (not just volume-level). Standing rule already covers it (use exact claim-next id). Re-broadcast in nudge.
- 0 active claims + 30min idle -> nudged agents 1,3,4 to resume. Agent-2 wrapped (budget).
- Phantom PID-style agent ids continue (agent-60073/72057/72178/72311) — agents spawn per-claim ids; harmless, DB tracks fine.

## Sweep 5 (2026-06-16 08:24 UTC) — winding down
- 110 done = 110 files, zero drift, no orphans, dev 200.
- Throughput SLOWING: +6 this 2h window (was +38 prior). ~2h since last completion (06:29). Agents appear budget-exhausted.
- Fix: marked 09-natural-resources/01-geology-basics done (verified 2049w, was stuck claimed).
- Nudged agents 1/3/4 once more; asked them to reply DONE+count if out of budget.
- DECISION for next sweep: if still flat (no new completions) AND no DONE replies, STOP nudging — agents are exhausted; project pauses until user wakes/refuels budget. Do not burn Opus spinning. Just keep DB clean + dev up.

## Sweep 6 (2026-06-16 10:24 UTC) — PLATEAU, nudging stopped
- 112 done = 112 files, zero drift, dev 200. Only +2 in last 2h; ~2h since last completion.
- Fix: released dead stale claim 19-civ/04-knowledge-preservation (no file, ~2h).
- Agents are budget-exhausted. Per prior decision: STOPPED nudging (no production response, wastes Opus).
- Project paused for the night at 112/316 (35% — was 35 at session start). Awaiting user wake / budget refuel.
- Maintenance-only mode now: each 2h sweep just keeps DB clean (release stale, mark verified-unmarked) + dev up. No nudges unless an agent replies or new completions appear.

## Sweep 7 (2026-06-16 12:22 UTC) — Phase 1 COMPLETE, GitHub+Vercel live
- 166 done / 150 pending. **Phase 1 (Vols 1-8) fully complete.** Remaining: P2=23, P3=39, P4-5=88.
- GitHub repo connected (AryaVora621/GuideToCivilization), Vercel auto-deploy working. Live: https://guide-to-civilization.vercel.app
- COMMITS: author "Arya Vora", NO Co-Authored-By trailer (user requirement). tasks.db is gitignored.
- Recurring build-breaker: agents write "<10%"/"<38°C"; MDX fails Vercel build on <digit. Fix in every sweep: grep -rlE '<[0-9]' + perl 's/<(?=\d)/&lt;/g'. Rule broadcast to all agents.
- This sweep: released stale claim 34-ceramics/06-firing-temperatures (no file, 1h34m); 0 git changes (nothing new to push); nudged agents 1/3/4 (idle ~48min).
- Cron now job 3f8a664b (every 2h) includes push+deploy-verify.

## Sweep 8 (2026-06-16 14:22 UTC)
- 197 done / 119 pending (was 166). Big batch reconciled: agent-3 finished Mechanical (7/7), Optics (6/6), Astronomy (mostly), Pharmacology (mostly).
- Pushed commit 2ecfe9a → Vercel build SUCCESS. 197 chapters live.
- No stale claims, no drift, 0 build-breakers.
- Agents idle ~1.5h after burst (last completion 12:36). Nudged 1 & 4 to resume SILENTLY (agent-3 running its autonomous plan). 
- Pattern holds: agents burst ~15-20 chapters then idle ~1.5h (loop cadence or budget). My limits + likely theirs reset ~5h cycle.

## Watch items for next iteration
1. Stale claims: release any `claimed` row older than ~25 min where the file is <500 words (dead/renamed agent).
2. Inconsistent agent_id values pollute tracking (agent-A/B/C, "4", agent-test). Encourage canonical agent-1..4.
3. Known content issues: MDX linter corrupts "Vol X" frontmatter refs (14-medicine ch6, 36-sanitation ch2 historically failed). Verify build stays green.
4. Coverage gap: ensure Vols 8-45 actually start filling, not just low volumes.
5. Budget exhaustion: agents 2 & 4 may stop mid-lane; reassign their remaining volumes.

## Next-run checklist
1. `bash scripts/tasks.sh status` — done count + active claims.
2. Release stale claims (rule above).
3. `npm run build` — confirm green.
4. list_peers — confirm 4 alive; redistribute lanes for any dead/budget-exhausted agent.
5. Update this checkpoint.
