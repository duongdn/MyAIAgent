# Alert Scan — 2026-03-24 10:30

**Window:** 2026-03-24T09:31:00+07:00 → 2026-03-24T10:30:00+07:00
**Sources checked:** 9 (Slack 14ws, Discord 2acct, GitHub 2acct, Matrix, Redmine, Email 6acct)
**Alerts:** 0 CRITICAL, 0 HIGH, 3 MEDIUM, 0 LOW

## CRITICAL / HIGH Alerts (notified)

None.

## MEDIUM / LOW (report only)

| # | Severity | Source | Summary |
|---|----------|--------|---------|
| 1 | MEDIUM | Discord/nusvinn | Token returns 403 Forbidden — needs refresh (AirAgri, HOMIEAPP servers inaccessible) |
| 2 | MEDIUM | Matrix/Fountain | Token expired (401), refresh also failed (400) — room monitoring offline |
| 3 | MEDIUM | Redmine | API returns 403 Forbidden — key may be revoked or expired |

## Sources Status

| Source | Status | Items |
|--------|--------|-------|
| Slack (14 ws) | OK | 0 alerts (31 msgs, all normal activity) |
| Discord (2 acct) | AUTH FAIL | Both tokens 403 |
| Email (6 acct) | OK | 0 alerts (17 emails, none alert-worthy) |
| GitHub/duongdn | OK | 4 push events, no failed CI |
| GitHub/nusken | OK | 0 events |
| Matrix/Fountain | AUTH FAIL | Token expired, refresh failed |
| Redmine | AUTH FAIL | 403 Forbidden |
| Google Sheets | SKIPPED | Already checked in daily report |
| Scrin.io | SKIPPED | Already checked in daily report |

## Notes

- SAMGuard Slack: 6 HubSpot MQL lead notifications (automated, not alerts)
- Generator Slack: Normal dev activity — Jeff fixing #754, Rudi requesting PR reviews, yarn serve errors discussion
- LegalAtoms Slack: Deadline prioritization discussion ("more urgent" = task priority, not incident)
- GGS Slack: Normal maintenance channel activity
- AmazingMeds Slack: Marketing photo updates, web dev requests
- WilliamBills Slack: Casual dev check-in
- Discord/Matrix/Redmine auth failures are recurring — tokens need manual refresh
