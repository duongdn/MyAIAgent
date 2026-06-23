---
name: IMAP and Slack Timestamp Gotchas
description: IMAP SINCE uses server dates (search previous day + filter), Slack after: excludes named date (use day before + epoch filter)
type: feedback
---

### IMAP
IMAP `SINCE` uses server-interpreted dates (usually UTC). For UTC+7, emails arriving after midnight local but before midnight UTC get missed. **Fix:** Search `SINCE {previous_day}`, then filter by parsing `Date` header with `parsedate_to_datetime()` against the actual monitoring window.

### Slack search.messages
- `on:YYYY-MM-DD` = only that single day
- `after:YYYY-MM-DD` = excludes that date (means strictly after)
- **Fix:** Use `after:{day_before_window_start}`, then filter by `ts > cutoff_epoch`
- Convert cutoff: `datetime(Y,M,D,H,M,S, tzinfo=ZoneInfo('Asia/Ho_Chi_Minh')).timestamp()`

**Why:** User caught wrong results twice. First, IMAP missed emails that arrived in the UTC+7 morning. Second, Slack `on:` and `after:` queries returned wrong date ranges, missing the Mar 19 16:16-23:59 window entirely.

**How to apply:** Always compute epoch cutoff from the monitoring window start time, search broader than needed, and post-filter by exact timestamp comparison.
