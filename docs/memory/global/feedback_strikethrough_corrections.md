---
name: feedback_strikethrough_corrections
description: When correcting wrong data in a report after user feedback, strike through the wrong text (~~...~~) with the correction next to it — never silently delete/rewrite it
metadata:
  type: feedback
---

Rule: whenever the user points out wrong data in an already-written report (daily-report or any other monitoring report) and it needs correcting, do NOT silently edit/delete the wrong line. Wrap the original wrong claim in markdown strikethrough (`~~wrong text~~`) and add the correction immediately after (e.g. "→ **WRONG, struck: ...**" or "→ **CORRECTED: ...**").

Why: user said explicitly (2026-07-09) "you must strike though all wrong data after my feedback !!!" — wants a visible audit trail of what was wrong in the original report, not a cleaned-up version that hides the mistake ever happened.

How to apply: applies to every field/line/table-row edited in response to user feedback on a report, across all report types (daily-report, weekly-report, money-report, etc.) — not just this one incident. Applies to ALERTS SUMMARY tables, per-source detail sections, and Trello summary sections alike. Do this in the same pass as fixing the underlying memory/logic bug — both the report text and the root-cause memory need updating.
