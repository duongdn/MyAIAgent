---
name: feedback_airagri_webapp_channel
description: Vinn (nusvinn) posts daily report in #airagri_webapp, NOT only #airagri-flutter — cron repeatedly misses it
metadata:
  type: feedback
---

Vinn (nusvinn) posts the daily report `"Just report my process today:"` in **#airagri_webapp**, not exclusively in #airagri-flutter. The cron has repeatedly found 0 Vinn activity by only checking #airagri-flutter.

**Why:** On 2026-06-15, nusvinn posted full daily report at 17:19+07 in #airagri_webapp with extensive activity all day (SMS fix, code review, Entra SSO). Cron only captured ~11 messages from #airagri-flutter and concluded "Vinn absent."

**How to apply:**
- When checking AirAgri Discord for Vinn's report, ALWAYS scan **both** #airagri_webapp AND #airagri-flutter
- Search for `"Just report my process today"` in both channels
- Also count substantive activity in #airagri_webapp (technical answers, fix confirmations, PR reviews) as OK per [[feedback_vinn_daily_report_format]]
- Do NOT conclude "Vinn absent" from #airagri-flutter alone

**Repeat miss 2026-06-19:** Cron run (05:00) flagged "Vinn no daily report — last post Jun 11" as a critical alert and skipped the Trello James Diamond item. Interactive recheck the same morning found nusvinn HAD posted full daily reports on Jun 17 (17:28+07) and Jun 18 (17:29+07), both in #airagri_webapp — exact same channel this memory already names. The cron script must be re-dropping the #airagri_webapp channel from its scan list or has a snowflake/window bug — this is the second documented instance of this exact miss. Before flagging Vinn absent, fetch `/channels/{id}/messages?limit=20` directly for #airagri_webapp (channel list under `daily-discord-scan-*.js`) and grep for "Just report my process today" — do not trust a prior "0 messages" result without doing this raw check first.
