---
name: feedback_vinn_daily_report_format
description: "Vinn's daily-report messages start with 'Just report my process today:' — search for this phrase (not generic 'daily report'), in BOTH #airagri_webapp AND #airagri-flutter (command already scans both channels — that part is not a separate rule)"
type: feedback
originSessionId: 5515ee9c-da46-4fb0-bd2b-801d0f2d67b5
---
Vinn (AirAgri dev) posts his daily summary in AirAgri Discord channels (`airagri_webapp` / `airagri-flutter`) using the opening phrase **"Just report my process today:"** followed by a bullet list of deploys / dev-done / in-progress / PR reviews.

**Why:** User corrected 2026-04-23. The Discord subagent scanned messages and flagged "Vinn missing daily report Tue 22/04" — but Vinn HAD posted a full daily report that day. Subagent likely searched for keywords like "daily report" and missed the actual phrase. Sample from 22/04:
> Just report my process today:
> - Module SAR missed text at paging (deployed on production)
> - Fix block job steps when doesn't have water quality (deployed on staging)
> - ... (deploys/staging/dev-done/in-progress/PR reviews)

**Channel note (merged from a separate file 2026-07-13):** on 2026-06-15, cron only scanned #airagri-flutter and missed a full report Vinn posted in #airagri_webapp instead — concluded "Vinn absent" wrongly. Command Piece 3 already scans both channels (`airagri_webapp`/`airagri-flutter`), so this specific failure mode is closed at the command level — kept here only as the "why" for that command behavior.

**How to apply:**
1. When checking Vinn's daily report, search Discord AirAgri channels for the phrase **`Just report my process today`** (case-insensitive).
2. Treat presence of that bullet-list post within the day's window as daily-report-OK.
3. **If opener not found but Vinn has substantive activity** (technical Q&A, fix confirmations, code responses, warning log investigation) → treat as OK, complete James Diamond Trello item. Confirmed 2026-05-19 and 2026-06-03.
4. Only flag as alert if the phrase is absent AND Vinn had zero substantive activity that day.
5. Bug fixes, technical responses, posting warning logs they're investigating — all count.
6. **Recurring mistake (do not repeat):** 2026-06-03 Vinn posted warning log in #airagri-testing — user confirmed this IS the daily report. Apply rule 3 immediately, do not second-guess or require the exact opener phrase.
7. **Date window rule (corrected 2026-06-04):** When running the Jun N daily report, check for Jun N-1's report (previous workday). Do NOT require a same-day (Jun N) report — the morning run fires before Vinn has had a chance to post. Vinn posted Jun 3 17:24 → Jun 4 morning run = COMPLETE, no alert.
