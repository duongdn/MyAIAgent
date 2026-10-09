# Alert Scan — 2026-03-24 14:30

**Window:** 2026-03-24T14:00:00+07:00 → 2026-03-24T14:30:00+07:00
**Sources checked:** 9 (Slack 14ws, Discord 2acct, Matrix, Redmine, Email skipped, GitHub skipped)
**Alerts:** 0 CRITICAL, 0 HIGH, 1 MEDIUM, 3 LOW

## CRITICAL / HIGH Alerts (notified)

None.

## MEDIUM / LOW (report only)

| # | Severity | Source | Summary | Link |
|---|----------|--------|---------|------|
| 1 | MEDIUM | Slack/WilliamBills | Oliver reports portal bugs: upgrade/downgrade creates duplicate subscription instead of switching; users can't update card details. Tagged @QuanLee @Lucas @DuongDN, requesting fix | #mx channel |
| 2 | LOW | Slack/Baamboozle | Client Jamie unavailable — was in ER, apologized for absence | DM with Carrick |
| 3 | LOW | Slack/XtremeSoft | Kai: live templates updated and QA tested, moving to Anoma testing, clarifying color options placement | DM with Madhuraka |
| 4 | LOW | Redmine/#77844 | New bug: "[Prestashop 9] [Staging] Quote detail/PDF download returns 404 error" — Low priority, assigned VietPH | [#77844](https://redmine.nustechnology.com/issues/77844) |

## Sources Status

| Source | Status | Items |
|--------|--------|-------|
| Slack (14 ws) | ALL OK | 3 ws active (WilliamBills: 4 msgs, XtremeSoft: 3 msgs, Baamboozle: 1 msg) |
| Discord (2 acct) | OK (tokens valid) | 403 on channel reads (permissions, not auth — known) |
| Matrix/Fountain | OK (token refreshed) | 0 msgs in window |
| Redmine | OK | 1 new low-priority bug (#77844) |
| Email (6 acct) | SKIPPED | Short 30-min window |
| GitHub | SKIPPED | No token config |
| Google Sheets | SKIPPED | Already checked in daily report |
| Scrin.io | SKIPPED | Already checked in daily report |

## Notes

- WilliamBills: Oliver's portal bug is functional (upgrade/downgrade flow broken) but not production-down. Team tagged, awaiting response.
- Redmine #77844 is related to Global Grazing Prestashop 9 staging — VietPH assigned.
