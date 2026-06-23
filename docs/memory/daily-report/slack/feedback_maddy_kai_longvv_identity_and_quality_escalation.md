---
name: feedback_maddy_kai_longvv_identity_and_quality_escalation
description: Kai (Maddy Slack/JIRA persona) maps to internal_name LongVV per config/.jira-config.json with expected_weekly_hours 40 — conflicts with existing 16h/week part-time memory. Also documents a real client quality escalation on LIFM2-439 (19/06).
metadata:
  type: feedback
---

## Identity mapping discrepancy — UNRESOLVED, needs user confirmation

`config/.jira-config.json` → `team.kai`:
```json
{ "internal_name": "LongVV", "google_docs_name": "LongVV", "client": "Maddy", "expected_weekly_hours": 40 }
```

This conflicts with [[feedback_longvv_hour_split]] which says LongVV is part-time 16h/week on Maddy. Likely explanation (unconfirmed): LongVV/Kai is actually full-time (40h), split across **Maddy** (Slack/JIRA persona "Kai", project LIFM2) + **OhCleo** (Slack persona "Tony", per Piece 12 OhCleo config: "U0B6EF611FC | Tony | Our dev (LongVV)"). The 16h figure may only be the Maddy-specific slice of a 40h total, not LongVV's whole employment.

**Do not silently change the 16h alert threshold based on this alone — ask the user to confirm the actual split before editing [[feedback_longvv_hour_split]].**

## Real quality escalation found 2026-06-23 (during a /me:daily-report deep recheck)

User pushback: routine Slack scan of Xtreme workspace only checked Kai's daily "progress" messages and missed an active client trust issue from a few days earlier. Found by searching Slack DM history (not just `search.messages` keyword hits) + querying JIRA ticket est/actual directly.

**Timeline (Slack DM, Madhuraka ↔ Kai, madhuraka@... workspace):**
- 19/06: Madhuraka flags #444 perf complaint, #434 unaddressed PR comments, and questions why #439 needed extra hours when in original scope.
- 19/06: Kai apologizes twice, mentions "formal meeting with my technical lead" over "internal issues," commits to a team lessons-learned meeting.
- 20/06: Kai commits personal weekend time to stay on schedule.
- 21/06: Madhuraka's tone warms ("appreciate your effort").
- 22/06: Kai reports several tickets Done — recovering.

**JIRA root cause confirmed:** LIFM2-439 est 12h vs actual 21.5h = **+79% over** — this is the specific ticket Madhuraka questioned. Also found LIFM2-260 (Shopify S3 images) has **no original estimate ever set**, 38.5h actual, open since 2025-02-25, 24 comments of recurring rework — a long-tail risk ticket independent of the Jun19 incident.

**How to apply:**
- A daily Slack scan that only checks for "daily report present" is not sufficient when a client relationship is under strain — periodically (or when something looks routine-but-quiet) pull DM history directly and cross-check JIRA est-vs-actual for in-flight tickets, not just the task-log sheet.
- Don't mark a one-day quiet recovery as fully resolved — re-check Maddy/Kai DM + LIFM2-439/260 status again in a few days for recurrence.
- See [[reference_trello_gate_mapping]] — the Maddy Trello gate is Slack-activity-only by design; this finding doesn't change the gate, just adds a watch item.
