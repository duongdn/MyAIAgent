---
name: feedback_wordpress_samguard_not_on_ignore_list
description: "Elena - WordPress SamGuard is a SEPARATE Trello item (Pending checklist) from paused Elena - SamGuard Digital Plant (Work checklist) — do not lump them together as ignored"
metadata:
  type: feedback
---

"Elena - WordPress SamGuard" (Pending checklist, item id `6ab2ec692bb60b78c7b8b84d`) is NOT part of the paused Ignore List entry for "Elena - SamGuard Digital Plant" (Work checklist, PR/deploy flow). They are two different Trello items on two different checklists.

**Why:** A daily-report run (2026-09-23) wrote "Elena - SamGuard Digital Plant and Elena - WordPress SamGuard are on the paused Ignore List" and left WordPress SamGuard ○ without running its actual check (Piece 7's `elena wordpress` — samguard.co JS console/CSP scan). User caught it ("Elena WP sao ko complete được") since this item was never actually paused.

**How to apply:** Every full run / recheck, always run `TMPDIR_OVERRIDE=<short dir> node scripts/wordpress-samguard-check.js` and complete the "Elena - WordPress SamGuard" Pending-checklist item based on real output (0 jsErrors/pageErrors/cspViolations = clean, GA/ads `failedRequests` noise is not a real error — see [[feedback_csp_violations_are_real_errors]]). Only "Elena - SamGuard Digital Plant" (Work checklist) is on the ignore list per `.claude/rules/... daily-report skill "Ignore List"` table — never extend that pause to the WordPress item without an explicit user instruction.
