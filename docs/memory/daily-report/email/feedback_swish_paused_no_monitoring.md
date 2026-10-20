---
name: feedback_swish_paused_no_monitoring
description: Swish project paused 2026-10-20 — stop alerting on Swish monitoring mail in vuongtrancr@gmail.com
metadata:
  type: feedback
---
Swish (Carrick's project; alerts land in vuongtrancr@gmail.com: Delayed-newform, New Relic "Signal lost", BugSnag, Zendesk, delayedflight Bitbucket PRs) is **paused — not working on it, no monitoring needed** (user, 2026-10-20: "swish: hiện đã pending ko làm nữa, ko cần monitor thêm").

**Why:** daily reports kept listing Swish Delayed-newform/Signal-lost flapping as alerts (e.g. 2026-10-20 cron Alert #8) for a project nobody is working on.

**How to apply:** still scan vuongtrancr@ (count in the email table) but never put Swish mail in the ALERTS SUMMARY or detail lines. Flag only non-Swish mail there. If the user resumes Swish, delete this file and restore the old rule in `.claude/commands/me/daily-report.md` Piece 1 Group B. Related: [[feedback_ignore_list_paused_items]].
