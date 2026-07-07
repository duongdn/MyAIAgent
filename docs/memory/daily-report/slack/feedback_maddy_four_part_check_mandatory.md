---
name: feedback_maddy_four_part_check_mandatory
description: Maddy checks MUST cover 4 parts every time (Slack, JIRA comments, est/actual, PR status) — user has asked repeatedly and it was never done at the first pass
metadata:
  type: feedback
---

**MANDATORY, every Maddy check, not just when asked:**
1. **Slack** — DM history Madhuraka↔Kai (not just `search.messages` keyword hits — pull the actual DM thread)
2. **JIRA ticket comments** — for any ticket Kai mentions as "Done"/"in progress" in Slack, fetch the actual JIRA issue (status + comments) and cross-check. Also re-check the 3 known prior risk tickets each time: LIFM2-260, LIFM2-439, LIFM2-409 (see [[feedback_maddy_kai_longvv_identity_and_quality_escalation]]).
3. **Est/actual** — `node scripts/maddy-jira-tasklog-check.js --week <date>` AND cross-reference each ticket's real JIRA `timeoriginalestimate`/`timespent` (the script alone isn't enough — pull individual tickets too, per the pattern in this check).
4. **PR status/comments** — ⚠️ **structurally blocked**: this project's code is on **Bitbucket** (`bitbucket.org/xtreme-web/rms`), not GitHub. No Bitbucket credentials/script exist in this project at all (checked 2026-07-07, confirmed absent). PR links are only discoverable via JIRA comment inline cards (e.g. `https://bitbucket.org/xtreme-web/rms/pull-requests/514`). **Cannot deliver this part until the user provides a Bitbucket app password/token** for an account with read access to `xtreme-web/rms`.

**Why:** User, 2026-07-07: "I asked you many time about that every day but never done at the first time." Root cause investigated same day: PR status was never deliverable because there's no Bitbucket integration — this wasn't a process laziness issue, it was a missing capability that was never surfaced/flagged to the user until this session.

**Real findings from the 2026-07-07 deep check (useful as a template for what "done right" looks like):**
- Slack showed Kai claiming LIFM2-447/446 "Done" — JIRA showed 447 still "In Progress" with 0h logged, and 446 "Review" not "Done". Real discrepancy, only caught by checking JIRA directly.
- LIFM2-428 (the ticket Madhuraka flagged as "been there for a long time") had been sitting in Review since Jun 28 with zero comment movement — 9 days, confirms the complaint is legitimate, not a client being impatient over nothing.
- Maddy's task-log Google Sheet (`1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I`, own week-epoch e.g. `W14` for Jul 6) showed **0h logged** for a day with 3 real JIRA ticket updates — a genuine tracking gap, not a data-fetch bug.

**How to apply:** Never present a Maddy check as "Kai posted daily report, clean" — that is not sufficient. Always attempt all 4 parts; if a part is structurally blocked (like PR status), say so explicitly and name what's needed to unblock it, don't silently omit it.
