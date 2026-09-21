---
name: feedback_20260921_recheck_findings
description: "2026-09-21 recheck: real LeNH 0h + chronic Bitbucket/customer-comment alerts found; all 3 structural gaps from 09-15 (Philip msteams, Fountain trello token, Bitbucket Maddy token) now confirmed fixed/working"
metadata:
  type: feedback
---

**Structural gaps from [[feedback_20260915_recheck_findings]] — all 3 now resolved:**
1. Philip MS Teams config exists as `.enc` (decrypted this pass) — was fully missing before.
2. Fountain customer Trello board token (`config/.trello-config.json` → `fountain` key) present and working.
3. Bitbucket Maddy token present and working (200, was 401/dead) — immediately surfaced a real chronic alert (PR #481, 2 High + 1 Medium client findings open since June, still unanswered as of 09-21).

**Real findings, not false positives:** LeNH 0h on Fri 09-18 (James Diamond, last entry 09-17) with no leave on file — re-verified fresh. Fountain Trello board had 4 unanswered kunalsheth customer comments from 09-18, still unanswered 3 days later. MPFC New Relic Apdex degraded to 0.48 (poor) with 2 new Elementor-related error classes + a memory-exhaustion critical, found by cross-referencing ken@/rick@ email scan with the Performance piece — the two sources corroborated each other.

**How to apply:** Now that Bitbucket/Fountain-board/Philip-msteams tokens all work, run these checks every recheck touching Maddy/Fountain/Philip instead of assuming they're still broken — the 09-15 note said "confirm and move on" but they're actually fixed now, not just confirmed-broken-again. Bitbucket PR #481 is a recurring miss (flagged 09-11 and again 09-21) — worth a direct escalation rather than re-noting a 3rd time.
