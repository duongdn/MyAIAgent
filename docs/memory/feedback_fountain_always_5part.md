---
name: feedback_fountain_always_5part
description: CRITICAL — Fountain 5-part check keeps getting missed in daily report, user extremely frustrated, MUST validate before finalizing
type: feedback
---

Fountain 5-part check is MANDATORY in every daily report. Missed MULTIPLE DAYS IN A ROW.

**The 5 parts + Trello board:**
1. Matrix plan (cite @sender + timestamp)
2. Task log actuals (Fountain Summary tab)
3. Plan vs Actual table (per-dev comparison)
4. Capacity & Runway ("Est vs Charged" tab — remaining est, runway at 86h/week)
5. Over-estimate tracking (#2595, #2615 — compare with previous, flag if growing)
6. Trello board (customer comments, stuck tasks, hard-to-release)

**Why it fails:** Fountain data scattered across agents. No validation gate.

**Fix:** Assign ONE agent for all Fountain data. After compiling, VALIDATE all 5 sections exist before finalizing. This is the #1 recurring content failure.
