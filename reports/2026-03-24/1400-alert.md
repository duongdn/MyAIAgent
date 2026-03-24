# Alert Scan — 2026-03-24 14:00

**Window:** 2026-03-24T13:30:00+07:00 → 2026-03-24T14:00:00+07:00
**Sources checked:** 9 (Slack 14ws, Discord 2acct, Matrix, Redmine, Email skipped-short window, GitHub skipped-no tokens)
**Alerts:** 0 CRITICAL, 0 HIGH, 1 MEDIUM, 1 LOW

## CRITICAL / HIGH Alerts (notified)

None.

## MEDIUM / LOW (report only)

| # | Severity | Source | Summary | Link |
|---|----------|--------|---------|------|
| 1 | MEDIUM | Redmine/#77843 | New bug: "[Prestashop 9] [Live] Grazing Software - Issue 38" — High priority, In Progress, assigned VietPH | [#77843](https://redmine.nustechnology.com/issues/77843) |
| 2 | LOW | Slack/Global Grazing | Client Joey frustrated about 5-day fix delay; Amy/Nick reprioritizing: (1) mapping+grazing, (2) promo code, (3) accessories toggle | #maintenance |

## Sources Status

| Source | Status | Items |
|--------|--------|-------|
| Slack (14 ws) | ALL OK | 1 ws active (Global Grazing: 8 msgs — client prioritization discussion, no incidents) |
| Discord (2 acct) | OK (tokens valid) | 403 on channel reads (permissions issue, not auth — known) |
| Matrix/Fountain | OK (token refreshed) | 0 msgs in window |
| Redmine | OK | 1 new bug (#77843, High priority) |
| Email (6 acct) | SKIPPED | Short 30-min window, was clean at 13:30 |
| GitHub | SKIPPED | No token config found |
| Google Sheets | SKIPPED | Already checked in daily report |
| Scrin.io | SKIPPED | Already checked in daily report |

## Notes

- Matrix token successfully refreshed via browser login (was failing at 13:30 scan)
- Global Grazing: Joey wants mapping+grazing front office fixed first, then promo code, then accessories toggle. Nick returning this afternoon.
- Redmine #77843 is related to the Global Grazing discussion — VietPH already working on it
