---
name: feedback_verify_workstream_zero_hours_before_alerting
description: Never report a dev's Workstream hours as 0h/alert without re-running the fetch and confirming — a truncated/misread output caused a false LeNH alert
metadata:
  type: feedback
---

Before writing a "0h / shortfall" alert for any dev from `workstream-fetch-project-week.js` output, re-run the fetch (or re-check the raw JSON directly) and confirm the `members` array is actually empty for that dev — don't trust a summary printed earlier in a long session.

**Why:** 2026-08-25 — reported "LeNH: 0h across all known Workstream projects Monday 08-24" as Alert #4, based on an earlier script run in the session where `james_diamond.members` appeared empty. User caught it: "LeNH có task log mà !!!!" Re-running the exact same script confirmed LeNH actually had `weekCharged: 8` on James Diamond that day — the earlier read was simply wrong (likely a truncated/garbled parse of a long JSON blob during a token/time-pressured session, not a real script bug). This blocked the Blair Brown Trello item on a false premise. This is the same failure shape as the Aysar/Baamboozle false alert earlier the same day: an hours-based alert was written from a stale/misread number instead of a freshly verified one, twice in one session.

**How to apply:** Any time a daily-report piece is about to declare "0h" or "shortfall" for a specific dev (LeNH, TuanNT, KhanhHH, PhucVT, LongVV — any hours-gated dev), do a final direct check of that dev's row in the current Workstream JSON right before writing the alert line — don't rely on a mental note or a summary table built earlier in a long multi-piece run. If genuinely 0h, that's fine to report; but the check must be the last thing before the claim, not something inferred from an earlier pass. Applies to [[feedback_aysar_consolidated]]'s same lesson generalized beyond just Aysar.
