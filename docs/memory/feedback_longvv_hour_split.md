---
name: LongVV hour split — 16h/week target, 0h daily is normal
description: LongVV is part-time 16h/WEEK. Flag only if weekly total < 16h with no leave. 0h on any single day is normal — never alert on a daily 0h.
type: feedback
---

LongVV is part-time (~16h/week committed, up to 24h/week flexible for backfill).

**Weekly target = 16h.** NOT 8h/day — daily 0h is normal and never an alert.

**Why (2026-05-15):** Repeated confusion over LongVV's W26 hours (24h flagged as shortfall). User clarified: "LongVV is only have 16h static, another one can use for flexible purpose."

**How to apply:**
1. Scan ALL 11 Google Sheets + ALL Workstream projects for LongVV (filter col G = "LongVV" or search by name in Workstream). See [[feedback_dev_project_mapping_flexible]] for sheet list, [[reference_workstream]] for Workstream project IDs.
2. Aggregate weekly total across all sources (PREV_DATE week).
3. Flag only if WEEKLY total < 16h with no leave note.
4. Any hours beyond 16h = flexible backfill — no separate target, no alert.
5. Workstream is authoritative when sheets show 0h — always check both.
6. Matrix Web report line: LongVV charge = actual backfill hours (e.g. `LongVV: 8h/8h`).
