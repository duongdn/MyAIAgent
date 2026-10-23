---
name: mpfc-missed-rebills-caught-up-after-server-move
description: 2026-10-23 new server charged 87 members £1,218.56 for rebills stuck 05-20→10-19; root cause = HyperDB srtm_ttl=1 + fixer dying in CLI on old server; fixed
metadata:
  type: project
---
**Incident 2026-10-23:** right after the move to the new server (live-php83), 87 real members were charged £1,218.56 between 03:13 and 03:17 UTC for Stripe rebills that had been due from 2026-05-20 to 2026-10-19. Each subscription was charged once and its next charge moved to about 23/11. Saul noticed the spike and was sent the list on WhatsApp the same day.

**Root cause (verified):**
1. In `db-config.php` the custom HyperDB `srtm_ttl` was 1, and the check uses `time()` (whole seconds). MemberMouse's billing sweep runs `UPDATE ... SET batch_id`, then `SELECT ... WHERE batch_id`. When that read landed in the next second it went to the lagging replica and got 0 rows, so no job was created. The event then had batch_id set with status 0, and MemberMouse never touches it again. About 25% of rebills were affected.
2. A safety net already existed: the mu-plugin `mpfc-manually-process-stuck-events-cron.php` (gitignored) runs `adonly/manually_process_stuck_events_cron.php`, which was not tracked in git. It worked from 2026-04-10 to 2026-05-20 13:43 UTC. On the old server it then died silently while loading WP in CLI: the Redirection plugin 5.7.5 `canonical_domain()` with force-HTTPS calls `wp_redirect`+`die()` when there is no HTTP context. On the new server (Redirection 5.10.1) it runs, which is why it released and charged the whole backlog at once.

**Fixes (2026-10-23, live server; files not in git):**
- `db-config.php`: srtm_ttl 30, and 86400 in cron/CLI. Verified that a read 2s after a write goes to `global__w`.
- Fixer: DB credentials now come from wp-config (the hardcoded doadmin password was removed). It auto-queues only rebills stuck ≤3 days; older ones trigger an "ALERT stale stuck rebills" email and are never auto-charged. The "No events" email spam is gone. It writes a heartbeat option `mpfc_stuck_fixer_last_run`.
- `/me:mpfc-monitor` Check 2 now has a "Billing Integrity" section: stuck count plus fixer heartbeat.
- Backups: `mpfc:~/backup-202610230859/`.

**Why:** a silent billing failure plus a silent safety-net failure meant months of missed charges, then a mass surprise charge.
**How to apply:** treat stuck count > 0 or a heartbeat older than 30 min as CRITICAL in every MPFC monitor run. Before any migration or plugin upgrade, check for stuck rebills first. The old droplet 293179468 is powered OFF with no DB access (tag removed). It is rollback only.
