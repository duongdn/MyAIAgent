---
name: reference_ohcleo_no_server_access
description: OhCleo has zero SSH/DB/server access from this environment — it's Tony/LongVV's own deployment, we only reach it via Slack DM
metadata:
  type: reference
---

Unlike Elena-SamGuard or MPFC, this repo has **no server access to OhCleo's infrastructure at all**: no host in `~/.ssh/config`, no DB/server config file in `config/` (only `config/.newrelic-ohcleo-config.json` for the read-only New Relic API key). OhCleo is Tony's (LongVV's) own codebase/deployment — our only channel into it is the Slack DM with Celine Fierro (`D0B6846UN8K`, see Piece 12 in the daily-report skill).

**Why this matters:** any OhCleo backend bug found via New Relic (missing DB column, PHP/Python fatal, etc.) is NOT agent-fixable, even with a general "fix internal issues" directive — it must be relayed to Tony via Slack, and per [[feedback_never_send_messages_without_permission]] that still needs explicit user go-ahead before sending, even though it's the only path to actually resolving it.

**2026-07-10 example:** New Relic flagged `column app_media.cached_relevance_score does not exist` (36x) — very likely tied to Tony's own "Fix track ranking, replace likes only sorting with a relevance score" work (Trello card #299), migration probably never run on prod. Confirmed via error investigation, could not fix — flagged to user, not sent to Tony without permission.
