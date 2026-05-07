---
name: Don't speculate on Fountain dev 0h days as unresolved questions
description: When a Fountain dev (ViTHT, VuTQ, etc.) has a 0h day mid-week, just report the data — don't add "delayed entry / sick / off?" as an unresolved question. The PM handles this internally.
type: feedback
---

When the Fountain piece finds a 0h day for an individual Fountain dev (ViTHT, VuTQ, ThinhT, DatNT, LamLQ, HaVS, etc.), do NOT add a question like "delayed entry / sick day / genuine off?" to the Unresolved Questions list.

**Why:** User corrected on 2026-05-07. Both "VuTQ Day 3 still 0h" and "ViTHT Wed 0h — same pattern as last week. Delayed entry, sick day, or genuine off?" were flagged as wrong questions. The PM tracks individual dev availability via Matrix/internal channels — the daily report shouldn't add noise by speculating in unresolved questions.

**How to apply:**
1. Report the actual Wed/day numbers for each Fountain dev in Part 2 (factual).
2. In Part 3 (Plan vs Actual), state the delta vs plan — that IS useful.
3. Do NOT add per-dev speculation to the Unresolved Questions section.
4. Only escalate as alert when: (a) week ≥2/3 done AND actual is significantly below plan, AND (b) it would block release/QC.
5. Pair with `feedback_vutq_small_plan_normal.md` — small-plan devs especially shouldn't be flagged on later-week 0h.
