---
name: project_mpfc_cron_server
description: "mpfc.mpfc.live is a REAL second execution environment for this exact project — runs headless Claude Code cron sessions (daily-report, news-digest, bailey-monitor, matrix-token-refresh) completely independent of any local/interactive session. It has its OWN native memory store, separate from both local stores. This explains recurring script-duplication and memory-drift bugs found 2026-07-13."
metadata: 
  node_type: memory
  type: project
  originSessionId: 754a9366-d1fc-446c-b7d4-a6661c260ab2
---

## What it is

`mpfc.mpfc.live` (SSH alias in `~/.ssh/config`, user `mpfc`, host `142.93.46.109`, key `~/.ssh/carrick/id_rsa`) is a DigitalOcean server that runs this project's cron automation. Confirmed 2026-07-13 by direct SSH + investigation.

- Same git repo as local: remote `git@github.com-duongdn:duongdn/MyAIAgent.git`, deployed at `/var/www/MyDailyAgent` (note: different absolute path than local `/home/nus/projects/My-AI-Agent` — same code, different location/name).
- Server timezone: `Etc/UTC`.
- Node v22.20.0, Claude Code CLI v2.1.205 installed there independently.

## Crontab (as of 2026-07-13, server-local = UTC)

```
5 23 * * *   /var/www/MyDailyAgent/scripts/autorun-daily-report.sh       # 23:05 UTC = 06:05 +07
5 21 * * *   /var/www/MyDailyAgent/scripts/autorun-news-digest.sh        # 21:05 UTC = 04:05 +07
5 19 * * 4   /var/www/MyDailyAgent/scripts/autorun-bailey-monitor.sh     # Thursdays only
30 17 * * *  /var/www/MyDailyAgent/scripts/autorun-session-health.sh
0 */2 * * *  /usr/bin/node /var/www/MyDailyAgent/scripts/matrix-token-refresh.js
```

Each `autorun-*.sh` invokes `claude -p "/me:{command}" --cron` — a real headless Claude Code session, same binary/CLI as interactive use, running the SAME `.claude/commands/me/*.md` skill files from the same repo. It is not a dumb curl/API script — it's a full autonomous agent session that reads code, writes files, and commits.

## 🔴 Critical implication — THIRD silent memory store

The mpfc server has its own native "auto memory" directory, keyed by ITS OWN absolute project path (different from local):
```
mpfc:  ~/.claude/projects/-var-www-MyDailyAgent/memory/
local: ~/.claude/projects/-home-nus-projects-My-AI-Agent/memory/   (this store)
repo:  docs/memory/   (git-tracked, the only one that's actually shared)
```

CLAUDE.md's "dual memory" rule (save to Claude memory + `docs/memory/`) was written assuming a single execution environment — it does NOT account for this third store. The mpfc server's native memory diverges silently from local native memory and is invisible from here; the only channel that crosses machines at all is `docs/memory/` via git commit+push+pull, and even that is only as fresh as the last sync in each direction (mpfc's `docs/memory/MEMORY.md` was last touched 2026-07-10 as of this check — 3 days stale vs local same-day edits).

**This explains multiple bugs found/fixed 2026-07-13 in this same session:**
- The `daily-email-scan-YYMMDD.js` dated-script proliferation (17 files) — independent cron sessions on mpfc (and possibly local sessions too) each improvised a fresh script instead of sharing one, because there was no single shared source of truth they could both see/edit live.
- Two memory files (`feedback_leave_day_handling.md`, `feedback_trello_per_client_gates_on_lead_dev.md`) had their frontmatter reset to `name: ""` moments after being fixed locally — very likely mpfc's cron (daily-report runs ~06:05 +07 daily, matrix-token-refresh every 2h) or another concurrent process touched the same files mid-edit.
- The ~80-file content drift previously found between local Claude-memory and `docs/memory` — plausibly caused by mpfc committing+pushing its own memory-adjacent changes to `docs/memory` (via git) at different times than local edits, with no reconciliation step.
- A real recent example already fixed on mpfc directly: commit `3563a8b fix: stop saveSecretConfig from re-encrypting all 21 configs on every save` — mpfc's own cron (`matrix-token-refresh.js` every 2h) had been silently corrupting `config/.email-accounts.json` by re-encrypting ALL configs on every single-file save.

## Other projects on the same box

`~/.claude/projects/` on mpfc also has entries for `-var-www-MyBussinessAiAgent` and `-var-www-mypersonalfootballcoach-com` — two other unrelated projects also run their own Claude Code sessions on this same shared server. Relevant if debugging resource contention, port conflicts, or unexpected process activity on that machine.

## How to apply

- If something looks edited/committed by "someone else" (git history shows commits you didn't make, memory files reset unexpectedly, config files changed) — check mpfc's cron first before assuming a bug in your own session. `ssh mpfc.mpfc.live` and check `crontab -l`, `cd /var/www/MyDailyAgent && git log`, and `tmp/alert-logs/` for recent cron activity.
- Before declaring local `docs/memory/` "the current state," remember mpfc may have pushed newer commits — `git pull` first, or explicitly diff against mpfc's checkout if reconciling memory drift.
- Scripts/files intended to be canonical (no dated copies, single source of truth — see [[feedback_no_dated_scan_scripts]]) matter MORE here than in a single-environment project, because two independent unsupervised cron sessions can each "fix" the same problem differently if there's ambiguity in the skill file.
- mpfc's own native memory store is NOT directly readable/writable from this local session — there's no automatic reconciliation. If a discrepancy is suspected, SSH in and read it directly (`ssh mpfc.mpfc.live "cat ~/.claude/projects/-var-www-MyDailyAgent/memory/MEMORY.md"`).
