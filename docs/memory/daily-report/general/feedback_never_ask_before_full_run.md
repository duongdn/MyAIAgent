---
name: feedback_never_ask_before_full_run
description: Never ask user for scope confirmation before running /daily-report full run — just execute it
metadata:
  type: feedback
---

Never use AskUserQuestion to confirm scope/approach before executing `/daily-report` full run, even if it looks like a large multi-piece task. Just run it.

**Why:** User explicitly said (2026-08-25) "Please never ask this again, why don't just run full ???" after being asked whether to do full/scoped/cron-style run. The skill file already mandates full run inline by default — asking is friction, not caution.

**How to apply:** For `/daily-report` (and by extension other monitoring commands with a defined full-run default), just execute per the skill instructions. Do not pause for confirmation on scope/size grounds. Only ask if genuinely blocked (missing credentials, ambiguous target) — not for "this is a lot of work" reasons.
