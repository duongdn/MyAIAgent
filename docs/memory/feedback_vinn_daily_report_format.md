---
name: Vinn daily report format on AirAgri Discord
description: Vinn's daily-report messages start with "Just report my process today:" — search for this phrase, not generic "daily report"
type: feedback
---

Vinn (AirAgri dev) posts his daily summary in AirAgri Discord channels (`airagri_webapp` / `airagri-flutter`) using the opening phrase **"Just report my process today:"** followed by a bullet list of deploys / dev-done / in-progress / PR reviews.

**Why:** User corrected 2026-04-23. The Discord subagent scanned messages and flagged "Vinn missing daily report Tue 22/04" — but Vinn HAD posted a full daily report that day. Subagent likely searched for keywords like "daily report" and missed the actual phrase. Sample from 22/04:
> Just report my process today:
> - Module SAR missed text at paging (deployed on production)
> - Fix block job steps when doesn't have water quality (deployed on staging)
> - ... (deploys/staging/dev-done/in-progress/PR reviews)

**How to apply:**
1. When checking Vinn's daily report, search Discord AirAgri channels for the phrase **`Just report my process today`** (case-insensitive).
2. Treat presence of that bullet-list post within the day's window as daily-report-OK.
3. **If opener not found but Vinn has substantive activity** (technical Q&A, fix confirmations, code responses) → treat as OK, complete James Diamond Trello item. Confirmed 2026-05-19: Vinn had 5 msgs on May 18 with no opener but was clearly working.
4. Only flag as alert if the phrase is absent AND Vinn had zero substantive activity that day.
5. Don't confuse regular commit/code chatter with the daily report — but bug fixes and technical responses DO count as evidence of work.
