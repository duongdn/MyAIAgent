---
name: feedback-bailey-paturevision-billing
description: "Bailey DEV1+DEV3(DuongDN) hours live in Paturevision spreadsheet (not Marcel); fixed-cost invoices bill client-approved GGS Slack quote (not WBS buffer, not task-log actuals) — see [[feedback_bailey_invoice_verify_slack_quote_supersedes_buffer]]. ⚠️ DEV1 was VietPH (resigned 2026-06-30) — project_php_team.md now lists TuanNT on Bailey, but unconfirmed whether TuanNT literally holds the 'DEV1' billing slot or this is separate — verify before naming a DEV1 in a report."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9ba04ead-670b-45ea-b6a0-575e6d6d55b2
---

**Sheet mapping:** Bailey DEV1 and Bailey DEV3 (DuongDN) Upwork hours are logged in the **Paturevision** spreadsheet (`1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg`), NOT the Marcel spreadsheet. Marcel sheet is only for Marcel/Equanimity adhoc work — DuongDN has both, don't cross-compare.

⚠️ **DEV1 was VietPH, who resigned 2026-06-30** (see [[project_php_team]]). `project_php_team.md` now lists TuanNT as covering Bailey work generally — but it's NOT confirmed whether TuanNT literally took over the "DEV1" Upwork/WBS billing role specifically, or Bailey's billing structure changed differently. Don't assume; verify with the user before naming a specific person as "DEV1" in a report.

**Invoice billing (UPDATED 2026-08-17 — supersedes the old "WBS buffer" rule below):** Bailey fixed-cost invoices bill the **hours quoted to and approved by the client on GGS Slack** (`#change-requests`/`#maintenance`, e.g. Amy: "total effort is X hours" → Joey: "Yes please"), NOT the WBS estimate+buffer formula and NOT the task-log actual. Hourly tasks still bill at task-log Actual. See [[feedback_bailey_invoice_verify_slack_quote_supersedes_buffer]] for the incident that corrected this (the `.claude/commands/me/bailey-invoice-verify.md` skill file itself was updated 2026-06-10 to this model — old runs before that date used the buffer formula, which is now wrong).

**How to apply:**
- Bailey DEV1/DEV3 Upwork hours → Paturevision spreadsheet, never Marcel
- Invoice verification → fetch `Main Tasks - Payment` / `Miscellaneous Tasks - Payment` sheets; for Photo Capture tasks also check individual WBS sheet (Console/Mobile/Prestashop breakdown)
- Task log "Charged" column = actual hours worked, NOT what gets invoiced. Rate: $30/h.
