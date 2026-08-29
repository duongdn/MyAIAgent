---
name: feedback_fountain_sheet_independent_of_workstream_outage
description: Fountain "Est vs Charged" Google Sheet (Parts 4/5 of the 5-part check) can be fetched live via the Sheets API even when Workstream SSO is fully down — it's a separate data source, not gated by the Workstream login
metadata:
  type: feedback
---

**Finding (2026-08-29):** During yet another Workstream SSO outage (8th occurrence, see [[feedback_workstream_display_outage_pattern]]), the Fountain "Est vs Charged" tab (sheetId `1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o`, tab "Est vs Charged", range A13:L118) was still fetchable via a direct `googleapis` service-account read (`config/daily-agent-490610-7eb7985b33e3.json`) — no browser/Puppeteer/Workstream login involved at all. Narrow/broad capacity numbers and the over-estimate list (Parts 4/5 of the Fountain 5-part check) came back byte-identical to the prior week, confirming this sheet is a legacy Google Sheets artifact that survived the 2026-08-21 Workstream migration and is queried completely independently.

**Why this matters:** Every recent weekly report has treated a Workstream outage as blocking the *entire* Fountain 5-part check (Parts 1-5). That's wrong for Parts 4/5 specifically — only Parts 2/3 (per-dev task-log actuals) actually depend on Workstream. Part 1 (Matrix plan) is also independent (Matrix API, not Workstream).

**How to apply:** When Workstream is down during a weekly-report run, don't skip the whole Fountain check — still fetch Part 1 (Matrix room transcript) and Parts 4/5 (Est vs Charged sheet, quick ad-hoc `googleapis` read) live. Only Parts 2/3 need to be marked unconfirmed/reconstructed from daily-report recheck data.
