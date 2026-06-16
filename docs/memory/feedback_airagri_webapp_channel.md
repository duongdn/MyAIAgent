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
