---
name: misa-money-report-skill-file-location
description: Where MISA money-report operational rules live — the skill file, not memory
metadata:
  type: reference
---

The full, current operational playbook for `/me:money-report` (MISA MoneyKeeper fetch + analysis) lives in `.claude/commands/me/money-report.md` in this project — not in memory. As of 2026-06-23 it contains a "⚠️ Net Worth — authoritative source" section with the verified formulas, known MISA website bugs, and the FX-conversion rule for income/expense.

The fetch script itself is `scripts/misa-money-report.js`, which has matching code comments at the top documenting: the `startDate < 2024-01-01` → 500 error pagination trap, the CDP `protocolTimeout` trap from pagination-inside-one-`page.evaluate()`, and the `trueTotalBalance` field sourced from `GET /wallets/totaldashboard`.

**How to apply:** Before changing money-report logic or debugging a weird MISA number, read the skill file and script comments first — they're more detailed and more likely to be current than any memory summary. See [[feedback_misa_money_report_net_worth_bugs]] for the short version of why these exist.
