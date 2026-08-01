---
name: feedback_blair_brown_index_annotation_contradicts_file
description: docs/memory/MEMORY.md index tags project_blair_brown_setup with "Blair Brown FORBIDDEN" but the linked file itself documents Blair Brown as an active, client-requested report line item — no other memory explains a forbidden status
metadata:
  type: feedback
---

**Finding (2026-08-01):** `docs/memory/MEMORY.md` line 118 annotates `project_blair_brown_setup` with "— Blair Brown FORBIDDEN". The linked file (`docs/memory/weekly-report/project_blair_brown_setup.md`) says the opposite: Blair Brown - Peptide Clyde is a real client project, included in the James Diamond + Marcel Matrix report at ThuyLe's explicit request (2026-06-19 quote), with a documented format and data source. Grepped the entire memory tree (both Claude memory and project docs/memory) for any other mention of "FORBIDDEN" or an explanation — found nothing. Checked git blame — the "FORBIDDEN" annotation has been in the index since the section was first created (commit 8d0f300, 2026-07-13) and was never explained or reconciled with the file's own content.

**Also confirmed via the 2026-07-25 weekly report itself:** that report's final sent Matrix message included a "Blair Brown - Peptide Clyde" section (LeNH: 0h, KhanhHH: 0h), user-confirmed and sent — direct evidence the project treats Blair Brown as included, not forbidden.

**How to apply:** Treat the "FORBIDDEN" index annotation as stale/erroneous and continue including Blair Brown per [[project_blair_brown_setup]] and [[feedback_matrix_report_format]]. If the user actually wants Blair Brown excluded going forward, that's a new instruction to capture — don't silently drop it based on an unexplained one-word index tag that contradicts the sourced, detailed memory file and the actual send history.
