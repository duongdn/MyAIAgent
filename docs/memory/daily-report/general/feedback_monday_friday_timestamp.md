---
name: feedback_monday_friday_timestamp
description: "Scan window start = last_run from config/.monitoring-timelines.json, ALWAYS, for every source (Slack/Discord/Matrix/email/etc.) — not a hardcoded day-of-week calculation. Day-of-week (e.g. Monday->Friday) is only a sanity-check fallback for when last_run is missing/stale, never the primary mechanism."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 754a9366-d1fc-446c-b7d4-a6661c260ab2
---

**Corrected 2026-07-13** (was previously framed backwards): the correct mechanism is `last_run` in `config/.monitoring-timelines.json` — trust it, for every piece, every day of the week. Do NOT hardcode "if today is Monday, window starts Friday" as the primary logic; that was a symptom-only patch for one incident where a script had a bug independently of the day-of-week.

**Original incidents this rule is based on:**
- 2026-06-08: a hardcoded date literal in a Discord scan script used Saturday instead of Friday as the Monday window start, missing Vinn's Friday report. The actual bug was the script not reading `last_run` correctly — the fix documented at the time ("Monday → go back to Friday") treated the symptom, not the root cause.
- Separately: a case where `last_run` in the timeline file was itself stale (a run had been missed) — using it blindly reused an old timestamp.

**How to apply now:**
1. Every piece (Slack, Discord, Matrix, email, etc.) reads its window start from the matching `last_run` field in `config/.monitoring-timelines.json` — this is universal, not source-specific, and not day-of-week-specific. See `.claude/commands/me/daily-report.md`'s Timeline note.
2. If `last_run` is being updated correctly at the end of every run (per [[feedback_timeline_system]]'s rules), it is ALREADY correct on a Monday — the last real run was Friday, so `last_run` naturally points to Friday's timestamp. No special Monday case is needed when the timeline system itself is healthy.
3. Only fall back to a calculated "previous business day" window if `last_run` is provably missing, corrupted, or implausibly stale (e.g. jumps back weeks, or file doesn't exist) — and even then, fix why it went stale rather than relying on the day-of-week guess going forward.
4. Never silently accept a `last_run` that's obviously wrong (too old / in the future) without flagging it — but also never override a plausible `last_run` just because "today is Monday."

Related: [[feedback_timeline_system]], [[feedback_vinn_daily_report_format]]
