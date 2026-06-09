---
name: feedback_fountain_0h_not_expected_day1
description: "Fountain 0h on first day of week is NOT expected — flag missing hours, don't dismiss"
metadata: 
  type: feedback
---

Do NOT dismiss Fountain dev 0h on the first day of a new week as "expected". Devs who work 40h/week should log 8h on Monday.

**Why:** 2026-06-09 daily report said "First day of W30 (Mon Jun 8) — all 0h expected." User corrected: "how can 0h expected, some guy work 40h/week -> 8h/day!!!"

**How to apply:**
- When the daily report scan runs Tuesday morning (5 AM +07) and Mon Jun 8 shows 0h in the Fountain task log, FLAG it as missing — do not dismiss
- Only dismiss 0h if: (1) dev has explicit leave note, or (2) dev's plan that week is 0h
- The "Chưa" (not yet) state in the Fountain sheet does NOT mean 0h is expected — it means hours haven't been logged
- Flag each named dev in the week's Matrix plan who shows 0h for the previous working day
