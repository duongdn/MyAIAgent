---
name: feedback_maddy_jira_identity_luhx_jeff_ihc_project
description: Maddy JIRA - LuHX logs as "Jeff Nguyen" on project IHC (not LIFM2); search JIRA by worklogDate across ALL projects before claiming "no JIRA log"
metadata:
  type: feedback
---

On Madhuraka JIRA (`config/.jira-config.json` instance `madhuraka`), the Maddy mobile dev **LuHX = "Jeff Nguyen"**, logging on project **IHC** (e.g. IHC-52 "Shift Notes"), NOT LIFM2. Kai = LongVV on LIFM2.

**Why:** 2026-10-07 Maddy invoice reconciliation. I claimed "LuHX has no JIRA ticket" after only reading WS `task` text and searching LIFM2. User corrected me: WS shows the ticket and the hours are filled. IHC-52 worklogs matched WS day by day (27h vs 27.25h).

**How to apply:** before any "no JIRA log / no ticket" claim, run JQL `worklogDate >= X AND worklogDate <= Y` with no project filter, and map authors (Jeff Nguyen=LuHX, Kai=LongVV, Luis, Carrick Tran=LeNH). The WS `/review/week` API does not return the ticket link, so don't conclude from WS text alone. Related: [[feedback_ws_aggregate_drops_rows_and_luhx_not_managed]], [[feedback_maddy_consolidated]].
