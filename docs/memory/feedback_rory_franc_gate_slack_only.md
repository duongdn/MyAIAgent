---
name: feedback_rory_franc_gate_slack_only
description: Rory and Franc Trello items gate ONLY on their Slack check (Swift/RDC) — LeNH sheet hours never block these two items, only trigger a personal reminder
metadata:
  type: feedback
---

`reference_trello_gate_mapping.md` (the curated, authoritative gate file) lists Rory's gate as "Swift Studio Slack (Carrick activity)" and Franc's as "RDC Slack (dmetiner updates)" — Slack only, no sheet dependency. Its "Common Mistakes to Avoid" section explicitly names Franc as an item that must NOT be blocked by task-log 0h.

The `/me:daily-report` skill's Piece 8 quick-reference table pairs both `rory` and `franc` args with `slack swift + sheets lenh` / `slack rdc + sheets lenh` — this reads as if LeNH's combined hours should gate these two items too. That reading is wrong.

**Why:** 2026-06-22 — LeNH's combined Fri-Jun19 hours were 7.33h (0.67h short of 8h, a real alert worth a personal reminder per [[feedback_lenh_partial_hour_alert]]). Had to decide whether this blocks Rory + Franc Trello completion. Resolved by trusting the more specific/curated gate-mapping file over the skill's summary table, since the gate-mapping file's own "Common Mistakes" section was written specifically to prevent this exact error for Franc.

**How to apply:**
- Rory Trello item = Swift Studio Slack check only (Carrick activity/absence). LeNH's sheet hours are irrelevant to this item.
- Franc Trello item = RDC Slack check only (dmetiner updates). Also ad hoc per [[feedback_franc_adhoc]] — always complete unless dmetiner explicitly raises an issue.
- LeNH's combined-hours shortfall (Rory+Franc+Rebecca sheets) still matters — it drives the **Reminders piece** (send LeNH a personal task-log reminder), but it does NOT gate/block the Rory or Franc Check-Progress checklist items.
- When the skill's quick-reference table and `reference_trello_gate_mapping.md` disagree on gate sources, prefer the gate-mapping file — it's maintained specifically to correct these mistakes.
