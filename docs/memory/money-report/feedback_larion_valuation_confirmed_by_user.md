---
name: feedback_larion_valuation_confirmed_by_user
description: Larion cổ phần 800,000,000 revalue (25/08) confirmed by user as current actual sale price, not an unverified manual mark
metadata:
  type: feedback
---

The Larion cổ phần wallet revalue from 600M → 800M on 2026-08-25 (flagged as "unconfirmed valuation basis" in reports/dashboard since) is confirmed by the user (2026-08-26) as the current actual sale price of the shares, not an arbitrary manual entry.

**Why:** Prior reports repeatedly carried this as an open risk/unresolved question because there was no transaction or external price feed backing the jump. User has now directly confirmed the number is real market value.

**How to apply:** Stop flagging this as an unverified/unconfirmed risk in `/money-report` allocation reviews and dashboards. Treat 800M as the accurate current value for Larion going forward. If the value changes again later, treat future jumps as legitimate price updates rather than automatically re-raising the "unconfirmed valuation" concern — only flag if the user's own confirmation is contradicted by other evidence.
