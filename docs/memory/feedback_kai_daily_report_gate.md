---
name: feedback-kai-daily-report-gate
description: "UN-RETIRED 2026-07-13 with a fix: check Workstream Maddy project for LongVV's hours THAT DAY first — only if he logged hours (worked), then check Slack Xtreme for Kai's daily report. Missing report on a day he didn't work = normal, not an alert."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 0d04b4fe-c323-4761-9532-67c23fb83622
---

The old blanket rule ("never check Kai's daily report presence, ever") is REPLACED — user gave the correct two-step check 2026-07-13:

**Step 1 — Workstream first:** Query Workstream project `maddy` (Xtreme Soft Solutions, id `cmpqc1v7v00ahtk1vs1817xt8`) for LongVV's logged hours on the reporting date (see [[reference_workstream]] — Workstream is now primary for this project). This tells you whether he actually worked on Maddy that day at all.

**Step 2 — Conditional Slack check:** ONLY if Workstream shows LongVV logged hours on Maddy that day, then check Slack Xtreme Soft Solutions workspace for Kai's daily report ("progress"/"daily report" search). Missing report on a day he DID work = real alert, flag it. If Workstream shows 0h on Maddy that day, do NOT check for a Slack report at all — 0h day = no report expected = not an alert, same as any other dev's 0h-with-no-work-that-day case.

**Why the old blanket rule existed and why it's now fixable:** The original "always check Slack presence" version was retired 2026-07-09 after 3+ false positives (2026-07-01, 07-08, 07-09) — every time, Kai had genuinely not worked that day, and there was no way to confirm "did he work today" before writing the report, so the check was pure guessing and got disabled entirely. Since then, Workstream became the primary source of truth for hours across all projects except Bailey (confirmed 2026-07-13, see [[reference_workstream]]) — this closes the original gap: Workstream tells you definitively whether he worked, removing the guesswork that made the old check unreliable.

**How to apply:**
- When running the Maddy 4-part check (Slack + JIRA + est/actual + PR), the Slack part now has TWO layers: (a) unanswered Madhuraka/client messages + explicit blocker/escalation posts (always check, as before), AND (b) Kai's daily-report presence — but ONLY evaluate (b) if Workstream confirms he logged Maddy hours that day.
- If Workstream Maddy hours = 0 for the day: skip (b) entirely, note "no Maddy hours logged — report check not applicable" if relevant, do not flag.
- If Workstream Maddy hours > 0 for the day and no daily report found in Slack: this IS a real alert line item.
- Maddy's overall alert status is still also driven by: PR backlog (unaddressed Critical/High Bitbucket findings), JIRA est/actual overruns, and unanswered direct client asks — this Workstream-gated report check is an ADDITION, not a replacement for those.
