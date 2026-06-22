---
name: feedback_tuannt_four_sheets
description: TuanNT has had previously-unknown sheets surface at least twice — always scan ALL 11 sheets, never assume sheet list is complete.
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 93d3428d-d58a-4cde-9afe-1610d3aceef8
---

TuanNT had sheets added without notice:
- 2026-06-09: Paturevision sheet was missing from scan → false "combined 0h"
- 2026-06-17: CharlesChang/Family App V2 sheet was unknown → false "combined 0h" (real 6.17h there)

**Rule:** Scan ALL 11 sheets for TuanNT using PREV_DATE (yesterday's date). Each sheet has its own independent W-numbering — always use that sheet's Summary tab to find the correct W-tab for the reporting date. See [[feedback_dev_project_mapping_flexible]] for all 11 sheet IDs.

**Note on PREV_DATE:** Always scan yesterday's data, not today's. On Monday, PREV_DATE = last Friday.
