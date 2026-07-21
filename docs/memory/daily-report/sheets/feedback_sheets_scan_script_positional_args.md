---
name: feedback_sheets_scan_script_positional_args
description: "sheets-tasklog-scan.js takes positional args (date, then dev names) — NOT --date=/--dev= flags. Wrong flags silently produce garbage dates and a false '13 sheets, no week tab found' data-gap for every sheet."
metadata:
  type: feedback
---

**Correct usage:** `node scripts/sheets-tasklog-scan.js <YYYY-MM-DD> <devNameSubstr> [devNameSubstr2 ...]` — e.g. `node scripts/sheets-tasklog-scan.js 2026-07-20 tuannt lenh khanhhh`.

**Wrong usage that silently fails:** `node scripts/sheets-tasklog-scan.js --date=2026-07-20 --dev=tuannt` — the script has no flag parsing. `--date=2026-07-20` becomes the positional `dateStr`, fails `Date` parsing, and `discoverWeekTab` then fails for every single sheet — printing `<sheet>: no week tab found for date` for all 13 sheets. This looks exactly like a real data-source outage (matches the wording other genuine outages use) and can produce a false "cannot verify any dev's hours today" conclusion.

**Why this matters:** 2026-07-21 — used the wrong flags mid-recheck while investigating a TuanNT hours dispute, got "no week tab found" for all 13 sheets, and almost concluded (again) that Sheets data was unavailable. Caught only because the result was suspiciously total (every sheet, not just some) and the correct positional syntax was checked against the script's own `main()` argv parsing before trusting the "gap."

**How to apply:** before trusting any "data gap" / "unavailable" output from a script, if the failure is total (100% of sources fail identically) rather than partial, suspect an invocation bug in the calling command before suspecting the data source. Quick sanity check: read the first ~15 lines of `main()` in the script to confirm actual argv/flag handling before assuming CLI usage from memory or convention.

See also [[feedback_sheets_wrong_tab_numbering]] (Summary-tab lookup) and [[feedback_scrin_consolidated]] (the TuanNT/Nick mixup found during the same incident).
