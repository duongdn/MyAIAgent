---
name: assistant-own-monitoring-alert-emails-always-urgent
description: MyDailyAssistant — our own "[X] ALERT ..." monitoring emails (MPFC stale stuck rebills) are urgent even when repeating; never drop as chronic
metadata:
  type: feedback
---
"[MPFC] ALERT stale stuck rebills (not auto-charged)" from info@mypersonalfootballcoach.com was dropped 4× as "chronic, repeats every 15 min". Wrong: repetition = still broken; it's a payment failure.

**Why:** 2026-10-26 user: "sai cái này mà loại bỏ !!!"
**How to apply:** gate prompt rule — subject with "ALERT" from our monitoring = urgent; code suppresses repeats (same sender + subject) to once per 6h in `event-intake.js`. "Stuck events cron - No events" (OK heartbeat) stays dropped. Related: [[assistant-customer-ask-to-team-is-wait-not-important]], [[mpfc_missed_rebills_caught_up_after_server_move]]
