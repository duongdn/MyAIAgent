---
name: feedback-fountain-dev-specific-consolidated
description: "Fountain per-dev 0h handling: HungPN/TrinhMTT not sole-QC issues, VuTQ small-plan 0h normal once met, HaVS only flag if on week's plan, never speculate on dev 0h in unresolved questions"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9ba04ead-670b-45ea-b6a0-575e6d6d55b2
---

**QC coverage is shared, not per-person:** HungPN 0h is not an alert if other QC (PhatDLT) covers that week's QC work — check total QC coverage across all QC members, only alert if ALL are 0h. **TrinhMTT is NOT QC** despite being listed in the Fountain sheet — she never does QC work; exclude her entirely from QC 0h alerts (only track HungPN + PhatDLT).

**Small weekly-plan devs (e.g. VuTQ):** Compare W{n} actual vs plan as a TOTAL, not per-day. If actual ≥~60% of weekly plan and remaining days show 0h, that's normal — no alert, no unresolved question. Only flag when actual is significantly below plan AND the week is ≥2/3 done. Applies to any dev with a sub-full-time Fountain plan.

**HaVS is not a core/fixed Fountain dev:** appears some weeks, not others. Only flag HaVS 0h if HaVS is explicitly named in that week's Matrix plan (Part 1) — if absent from the plan, 0h is expected, no alert, no speculation.

**Never speculate on dev 0h in Unresolved Questions:** When any Fountain dev (ViTHT/VuTQ/ThinhT/DatNT/LamLQ/HaVS/etc.) has a 0h day, just report the factual numbers in Part 2 and the plan-vs-actual delta in Part 3. Do NOT add questions like "delayed entry / sick / genuine off?" — the PM tracks individual availability via Matrix/internal channels separately; speculating adds noise. Only escalate as a real alert when week≥2/3 done AND actual significantly below plan AND it would block release/QC.

**Why (all corrected 2026-04-16 to 2026-05-18):** Each was a separate false-alert incident — shared QC coverage misread as a gap, small plans misread as falling behind, absent-from-plan devs misread as missing, and PM-internal availability questions misread as report-worthy unknowns.
