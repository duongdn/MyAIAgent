---
name: feedback_tuannt_gate_show_breakdown
description: TuanNT Trello gate report must show per-sheet breakdown, not just "combined Xh" — prevents misleading labels
metadata:
  type: feedback
---

When reporting TuanNT's combined hours for Trello gate status, always show the per-sheet breakdown. "TuanNT: 8h combined ✓" is misleading — it implies 8h in the John Yi sheet, but it may be 0h John Yi + 8h Paturevision.

**Why:** Jun 11 report showed "John Yi (TuanNT): 8h combined ✓ → gate passes" — user was confused because the label implied 8h specifically on John Yi. Actual: 0h John Yi, 8h Paturevision, 0h Rebecca, 0h Neural.

**How to apply:**
- Always show: `TuanNT combined: JohnYi Xh | Paturevision Xh | Rebecca Xh | Neural Xh = Xh total`
- Gate formula: combined > 0 → ✓ passes; combined = 0 → ⚠️ blocks
- See [[feedback_tuannt_four_sheets]] — 4 sheets: JohnVi + Rebecca + Paturevision + Neural
- See [[feedback_tuannt_trello_gates]] — combined 0 blocks John Yi + Bailey + Rebecca Trello items simultaneously
