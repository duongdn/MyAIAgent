---
name: VuTQ small W25 plan — partial-week 0h is normal once plan covered
description: VuTQ has small Fountain plans (e.g. W25 = 8h). Once weekly target hit on early day, subsequent 0h days are normal — don't flag as alert.
type: feedback
---

When VuTQ's weekly Fountain plan is small (e.g. 8h for W25), don't flag mid-week 0h days as alerts if the weekly plan has already been substantially met on an earlier day.

**Why:** User corrected on 2026-05-07 — Fountain piece flagged "VuTQ Day 3 still 0h" as a concern, but VuTQ logged 5h Mon already, which substantially covers the 8h W25 plan. Wed 0h is normal in that context. User: "wrong, I saw 5h on Monday, this is normal".

**How to apply:**
1. For Fountain devs with small weekly plans (≤16h), compare W{n} actual vs plan as a TOTAL, not per-day.
2. If actual ≥ ~60% of weekly plan and remaining days have 0h, treat as normal — no alert, no question in unresolved list.
3. Only flag VuTQ when actual is significantly below plan AND the week is ≥2/3 done.
4. Same principle applies to other devs with sub-full-time Fountain plans.
