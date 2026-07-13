---
name: feedback_tuannt_gate_show_breakdown
description: "TuanNT Trello gate report must show per-sheet breakdown, not just \"combined Xh\" — prevents misleading labels"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: a61419af-501f-4646-a1fa-5c9991cec471
---

When reporting TuanNT's combined hours for Trello gate status, always show the per-sheet breakdown. "TuanNT: 8h combined ✓" is misleading — it implies 8h in the John Yi sheet, but it may be 0h John Yi + 8h Paturevision.

**Why:** Jun 11 report showed "John Yi (TuanNT): 8h combined ✓ → gate passes" — user was confused because the label implied 8h specifically on John Yi. Actual: 0h John Yi, 8h Paturevision, 0h Rebecca, 0h Neural.

**How to apply:**
- Always show the per-sheet breakdown across ALL 11 sheets scanned (not a fixed subset — the sheet count/list has been wrong before, see [[feedback_dev_project_mapping_flexible]])
- Gate formula: combined > 0 → ✓ passes; combined = 0 → ⚠️ blocks
- See [[feedback_tuannt_consolidated]] — combined 0 blocks John Yi + Bailey + Rebecca Trello items simultaneously
