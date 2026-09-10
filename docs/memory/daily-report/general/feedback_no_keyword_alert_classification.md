---
name: feedback_no_keyword_alert_classification
description: "Never classify alerts by keyword matching on subject/text — always read actual message content and reason about it. Applies to every monitoring channel (email, Slack, Discord, Matrix, etc), not just email."
metadata:
  type: feedback
---

Alert/no-alert classification must come from actually reading and understanding message content — never from a hardcoded keyword list (e.g. "alert","error","fail","urgent") or a pattern rule (e.g. "any Fwd: from X is always an alert").

**Why:** `scripts/email-scan.js` used to flag "alerts" only when subject/from matched `ALERT_KEYWORDS`. Two real customer emails from MPFC — "Fwd: Coach Pass Access Issue" and "Fwd: Membership" (customer locked out of Coach Pass, a live billing/subscription bug) — matched no keyword and were silently excluded from the alerts list, even though they were present in the raw scanned mailbox (count was correct, "alerts" list was not). The daily report's Email section is then partly built by trusting that pre-filtered "alerts" list — the wrong layer to filter at. User explicitly rejected the proposed fix of hardcoding a new rule ("Fwd: from info@ = always alert") and required real content-based reading instead, "cho tất cả kênh" (for all channels).

**Fix applied 2026-09-10:** `email-scan.js` no longer returns an `alerts` field. It returns every message's `subject` + `from` + `date` + a real body `snippet` (IMAP: parsed from `BODY.PEEK[TEXT]`; Gmail API: the API's own `snippet` field). Classification of what's an alert happens when the report is written — by reading every subject+snippet, not by trusting a keyword pre-filter.

**How to apply:**
- Never re-introduce keyword-based or pattern-based (e.g. "Fwd: from X") auto-alert logic in any scan script (Slack, Discord, Matrix, email, or future ones) — if a script needs to narrow a large result set, have it return more raw content (snippets/previews), not a keyword-filtered subset.
- When writing the daily report, read every item a scan script returns (subject/snippet, or full message text for Slack/Matrix) yourself and reason about severity — don't just print whatever a script's own "alerts"/"matches" array happened to surface.
- If a scan script already exists with a keyword filter, treat that as a bug to fix the same way (return raw content, drop the filter) rather than adding more keywords to the list.
