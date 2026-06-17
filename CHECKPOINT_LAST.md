# CHECKPOINT — Guide to Civilization (paused 2026-06-17)

Orchestrator = Opus (head). Fleet = 8 Haiku content agents (claude-peers network).
Full orchestrator runbook: **CHECKPOINT_ORCHESTRATOR.md** (read it first on resume).

## Where things stand
- **All 317 chapters DONE.** Deploy GREEN. Live: https://guide-to-civilization.vercel.app
- **All 12 appendices (A–L) written** (no longer stubs).
- **Downloads shipped**: `/downloads` page; per-chapter `.md`, per-volume `.zip`, complete `.zip`
  (Obsidian vault, 377 files). Routes are static (Vercel-safe).
- **Interactive knowledge graph shipped**: `/graph` (reactflow + d3-force, volume-level
  dependency graph from chapter prerequisites).
- Latest commit pushed to `main`; Vercel auto-deployed green.

## NEXT (on resume) — awaiting user
User said "looks good so far" and paused; will confirm before UI changes. Pending:
1. Confirm the 3 features (appendices / downloads / graph) are accepted.
2. Optional: chapter-level "expand" mode on the graph (currently volume-level, 45 nodes,
   because chapter-to-chapter prereqs are free-text and unreliable).
3. Then: **UI changes** (agreed next phase — scope TBD with user).

## Infra notes
- Git author MUST be "Arya Vora" <aryavora621@gmail.com>, NO Co-Authored-By trailer.
- Maintenance cron e82d1f14 (2h, session-only — dies when this Claude session exits;
  recreate with `7 */2 * * *` on resume if you want auto-sweeps).
- Dev server on :3000 (session-only). NEVER run `next build` locally (kills dev server);
  verify builds via Vercel commit status only.
- Build-breaker rule still applies to any new MDX: never `<` directly before a digit.
- Fleet stood down to conserve budget; re-nudge via claude-peers on resume if needed.
