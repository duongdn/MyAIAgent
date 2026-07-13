---
name: feedback_arthur_blair_brown_gate_added
description: Arthur/Meta-Stamp made part of every Full Run (was on-demand-only); Blair Brown - Peptide Clyde Trello item had no gate mapping at all, now gated by sheets lenh
metadata:
  type: feedback
---

2026-07-13: user reviewed a live "which Trello items are incomplete and why" answer and flagged two items as wrong:
1. **Arthur - Meta-Stamp** — was documented as "not part of Full Run, on-demand only" (`/daily-report arthur` only). User said this was wrong — it should run every Full Run and gate its own Trello item like every other client.
2. **Blair Brown - Peptide Clyde** — had NO gate mapping anywhere in the skill (not in Piece 8's table, not in Piece 11's recheck table) despite the Trello item existing on the board. Its data was already being collected incidentally (LeNH's Piece 4 sheets scan covers ALL Workstream projects, including Blair Brown's `cmqj4tj6v01gfm81vgx7ipkov`), but nothing ever completed/skipped the Trello item based on it.

**Why this matters:** a Trello item existing on the board with zero gate mapping will sit incomplete forever, indistinguishable from a real unresolved alert — misleads status readouts.

**How to apply:** Both are now wired in `.claude/commands/me/daily-report.md`:
- Arthur/Meta-Stamp: Piece 13 runs every Full Run (added to both cron sequential list and interactive parallel group), gates "Arthur - Meta-Stamp" (Work checklist).
- Blair Brown - Peptide Clyde: gated by `sheets lenh` — no dedicated piece needed, LeNH's existing all-Workstream-projects scan already covers it per [[feedback_dev_project_mapping_flexible]].

If a Trello item's name doesn't obviously match anything in the piece table, don't assume it's fine to leave unmapped — check what data source *should* cover it (often already collected incidentally by an existing piece) and add the gate.
