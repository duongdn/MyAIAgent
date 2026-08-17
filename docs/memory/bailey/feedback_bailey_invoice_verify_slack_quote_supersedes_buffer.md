---
name: feedback_bailey_invoice_verify_slack_quote_supersedes_buffer
description: The old "fixed-cost = WBS estimate+10% buffer" billing memory was stale; the bailey-invoice-verify skill was updated 2026-06-10 to bill fixed-cost tasks at the client-approved GGS Slack quote instead. Also documents GGS xoxp Slack search.messages auth quirk.
metadata:
  type: feedback
---

On a 2026-08-17 invoice-verify run, [[feedback_bailey_paturevision_billing]]'s "fixed-cost bills at WBS est+10% buffer" rule looked stale next to the current `.claude/commands/me/bailey-invoice-verify.md` skill file, which explicitly says "NOT internal buffer formula." `git log -p` on that file confirmed it: on 2026-06-10 the skill was deliberately rewritten from a 2-source (WBS + task log) to a 3-source (WBS + **GGS Slack** + task log) verification model, moving fixed-cost billing from "WBS est+buffer" to "hours quoted to and approved by client on Slack."

**Why:** Memory files can go stale when the underlying skill/command file changes later. Always diff a recalled memory against current skill file content (or `git log -p` it) when they conflict, rather than trusting either blindly — see the memory-system guidance "trust what you observe now."

**How to apply:** For any Bailey fixed-cost invoice line, find the GGS Slack quote thread (search `#change-requests`/`#maintenance` for the task name; the quote message is usually Amy stating "total effort is X hours" with Joey replying "Yes please"/approval) — that hours figure is what should match the invoice, not WBS Est w/Buffer nor task-log Actual. Hourly tasks still bill at task-log Actual = Charged.

**Gotcha found the same run:** a Slack quote can bundle multiple deliverables in one thread (e.g. a bug fix + a separate feature-restriction ask both folded into "total effort is 6.5 hours"), while the internal Est-vs-Charged task log only has one line item for one of them. Don't treat that as a hours mismatch — the bundled Slack-approved total still governs the fixed-cost invoice line; just flag the bundling for clarity in the report.

---

## GGS Slack search.messages auth quirk

The GGS workspace token in `config/.slack-accounts.json` is a legacy `xoxp-...` user token (not xoxc — no cookie needed). `auth.test` works fine with the token in EITHER the `Authorization: Bearer` header or as a `token=` query param. But `search.messages` only works with the token in the `Authorization: Bearer` header — passing it as a `token=` query param (even together with the header) returns `{"ok":false,"error":"invalid_auth"}`. If `auth.test` succeeds but `search.messages` fails with `invalid_auth`, don't assume the token is dead — first retry with the token ONLY in the header, no `token=` query param.

[[feedback_bailey_paturevision_billing]] [[reference_bailey_monitor_skill_file]]
