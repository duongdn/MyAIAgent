---
name: feedback_ohcleo_slack_times_are_utc
description: slack-fetch-ohcleo.js `datetime` is UTC, not +07 — convert before judging reply gaps
metadata:
  type: feedback
---
`scripts/slack-fetch-ohcleo.js` prints `datetime` via `toISOString()` = **UTC**. Celine (customer) is in a Western timezone, Tony (LongVV) is UTC+7.

**Why:** 2026-09-28 cron flagged "Celine 'Please review my last question!' (09-25 12:02) unanswered ~53h" as an alert. In VN time that nudge was Fri 19:02 — after Tony's end-of-day report — and Tony's next message (Sun 00:08 VN) was the substantive answer to the cover-art question (model comparison + cost), not a "different topic". Misread timezone + skimmed content turned normal weekend cadence into a false neglect alert.

**How to apply:** Add 7h before reasoning about OhCleo reply gaps/working hours. Read the reply's content to check whether it answers the earlier ask before calling it "unrelated". Weekend-posted customer asks are still open items on Monday morning (keep ○), but frame them as fresh, not as neglect. Related: [[feedback_customer_direct_ask_universal_gate]], [[feedback_missing_report_requires_effort_check]].
