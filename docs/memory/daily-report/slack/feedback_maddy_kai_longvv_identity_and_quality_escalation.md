---
name: feedback_maddy_kai_longvv_identity_and_quality_escalation
description: "Kai (Maddy Slack/JIRA persona) maps to internal_name LongVV per config/.jira-config.json — the file's expected_weekly_hours:40 is LongVV's combined total across Maddy+OhCleo, NOT the Maddy-specific alert threshold. Also documents a real client quality escalation on LIFM2-439 (19/06)."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 754a9366-d1fc-446c-b7d4-a6661c260ab2
---

## Identity mapping — RESOLVED 2026-07-13

`config/.jira-config.json` → `team.kai`:
```json
{ "internal_name": "LongVV", "google_docs_name": "LongVV", "client": "Maddy", "expected_weekly_hours": 40 }
```

User confirmed 2026-07-13: **Maddy alert threshold stays 16h/week** — the config's `expected_weekly_hours: 40` reflects LongVV's combined workload across both Maddy (16h) + OhCleo (40h, full-time since 2026-07-07), not a Maddy-specific figure. See [[feedback_longvv_consolidated]] for the full two-track breakdown. Do NOT use the config's 40 to alert on Maddy-specific shortfall — keep using 16h there.

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

## Recurrence confirmed 2026-06-24 — LIFM2-260 again

Kai recovered well after the 6/19 incident (daily progress posted 6/20-6/22, Madhuraka's tone warmed). But on 2026-06-24 06:25+07, Madhuraka sent both a Slack DM and an email (kai@ inbox, "FW: Dev Tasks") reporting a new bug on **LIFM2-260** itself — the same long-tail ticket named in the original incident ("Update Shopify products with images uploaded on to S3", open since 2025-02-25, 24 comments of rework, no estimate ever set): *"Can you see why the ordering is incorrect here? Client has given the SKUs of the products on Shopify staging..."*

**Pattern now confirmed, not speculation:** LIFM2-260 is a recurring-failure ticket, not a one-off. Treat any future Madhuraka message mentioning Shopify image/ordering/S3 sync as touching this same unresolved ticket — check its JIRA history for the full rework count before responding, and don't let it get auto-completed in Trello as "just a project topic" (see [[feedback_project_topics_not_alerts]]) — an unanswered customer complaint about a person's/ticket's track record DOES block the Maddy Trello item until answered, even though the Trello gate is nominally Slack-activity-only.

**Next watch point:** check again in a few days whether LIFM2-260 finally gets a real fix or keeps recurring — if it recurs a 3rd time, this is no longer a per-incident issue but a structural problem with that ticket/feature that should be raised with the user directly rather than just logged.
