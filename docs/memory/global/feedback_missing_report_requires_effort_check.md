---
name: feedback_missing_report_requires_effort_check
description: "UNIVERSAL GATE — before flagging ANY missing daily report / no-reply / silence as an alert, for ANY dev/project/channel, first check independent effort evidence (Workstream/Sheets hours on THAT SPECIFIC project, commits, etc.). No evidence of work that day = no report expected = not an alert."
metadata:
  type: feedback
---

**Rule, stated once, applies everywhere:** "No report/reply/update found" is only an alert if the person actually did work that day. Before writing any such alert, check for independent evidence of effort on that specific project/channel — hours logged (Workstream/Sheets), commits, deploys, or an explicit leave note. If there's no evidence of work, the correct line is "no work tracked that day, no report expected" — not an alert, not even a caveat worth debating.

**Why this had to become a GLOBAL rule (2026-07-14):** This exact mistake was independently discovered and "fixed" at least twice before, but scoped narrowly each time instead of generalized:
- [[feedback_kai_daily_report_gate]] — Kai's missing Slack progress report is only an alert if Workstream shows he logged Maddy hours that day.
- [[feedback_aysar_consolidated]] (MANDATORY PRE-CHECK section) — Carrick/KhanhHH's missing Baamboozle update is only an alert if Workstream shows KhanhHH logged hours to Baamboozle that day (repeated false-alarm 2026-07-08, 2026-07-09).

Both fixes were written as project-specific rules. On 2026-07-14, the identical mistake recurred a 3rd time on a DIFFERENT project (OhCleo/Tony) that had no dedicated rule written for it: flagged "No Tony (LongVV) daily report found in Celine DM for 2026-07-13" as an alert without checking whether Tony actually worked OhCleo that day. User: "did you see any effort of Tony yesterday, why we need effort if no work? You must make a global rule for this, don't repeat stupid mistake." Direct check: Workstream showed LongVV logged **0h on the `ohcleo` project but 4h on Xtreme Soft Solutions (Maddy)** that same day — he simply worked a different project. No OhCleo work → no OhCleo report expected → not an alert.

**How to apply, for EVERY monitoring command and EVERY person/project, not just Kai/Aysar:**
1. Whenever a piece is about to flag "missing report" / "no reply" / "silence" as an alert for any person on any project/channel, first pull that person's hours/activity for the SPECIFIC project the report is supposed to cover (not just "did they work at all that day" — a dev can work 8h on Project A and 0h on Project B; only Project B's report is excused).
2. Use whatever effort signal exists for that project: Workstream `/review/week` (most projects), Google Sheets task log (Bailey/Paturevision, or as Workstream fallback), GitHub commits/PRs (if repo access exists), or an explicit leave note.
3. If effort = 0 for that specific project that day → the missing report is EXPECTED, write it as "no work tracked, no report due," complete the Trello item if that's the only gate.
4. If effort > 0 for that specific project that day and still no report → THAT is a genuine alert (the person worked but didn't communicate it).
5. If no effort-tracking mechanism exists at all for that project (e.g., a client relationship with zero hour-tracking) — say so explicitly ("no independent way to verify effort for X") rather than defaulting to treating silence as a problem.

**Don't wait for a project-specific memory file to exist before applying this.** The failure mode isn't "we forgot the Kai/Aysar rule" — it's "we didn't generalize it," so it kept missing every project that wasn't Kai or Aysar specifically. Apply this check universally, on any report/reply/silence finding, regardless of whether that exact project has been burned before.
