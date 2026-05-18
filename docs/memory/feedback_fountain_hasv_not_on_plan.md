---
name: Fountain HaVS not a fixed team member — check plan before flagging 0h
description: HaVS is not always on the Fountain weekly plan. Only flag 0h if HaVS is named in that week's Matrix plan.
metadata:
  type: feedback
---

HaVS is not a core Fountain dev — they appear in some weeks but not others. Do NOT flag HaVS 0h as an alert unless HaVS is explicitly named in that week's Matrix plan (Part 1).

**Why:** 2026-05-18 daily report flagged HaVS W26 0h as HIGH alert. User corrected: "no HaVS on plan" — they weren't in the W26 plan (ViTHT/ThinhT/DatNT/LamLQ only), so 0h is expected.

**How to apply:**
1. Before flagging any Fountain dev's 0h, check if they appear in that week's Matrix plan.
2. If not in the plan → 0h is expected, no alert, no speculation.
3. Pairs with `feedback_fountain_dev_0h_no_speculation` — that rule covers known devs; this extends to HaVS specifically.
