# Alert Scan — 2026-03-24 11:00

**Window:** 2026-03-24T10:30:00+07:00 → 2026-03-24T11:00:00+07:00
**Sources checked:** 9 (Slack 14ws, Discord 2acct, GitHub 2acct, Matrix, Redmine, Email 6acct)
**Alerts:** 0 CRITICAL, 2 HIGH, 1 MEDIUM, 0 LOW

## CRITICAL / HIGH Alerts (notified)

| # | Severity | Source | Summary | Link |
|---|----------|--------|---------|------|
| 1 | HIGH | Slack/AmazingMeds | Session token expired (invalid_auth) — workspace monitoring offline (blind spot) | https://amazingmeds.slack.com |
| 2 | HIGH | Slack/Equanimity | Session token expired (invalid_auth) — workspace monitoring offline (blind spot) | https://equanimity-talk.slack.com |

## MEDIUM / LOW (report only)

| # | Severity | Source | Summary |
|---|----------|--------|---------|
| 1 | MEDIUM | Redmine/#77831 | New Fountain bug: "[Card_ID:2595] Khong hien thi section what include" — Normal priority, new status | [#77831](https://redmine.nustechnology.com/issues/77831) |

## Sources Status

| Source | Status | Items |
|--------|--------|-------|
| Slack (14 ws) | 12 OK, 2 AUTH FAIL | 11 msgs normal, AmazingMeds + Equanimity invalid_auth |
| Discord (2 acct) | OK | 1 msg AirAgri (normal), 0 urgent — tokens recovered from previous 403 |
| Email (6 acct) | OK | 0 new emails since cutoff |
| GitHub/duongdn | OK | 3 push events (MyAIAgent), no failed CI |
| GitHub/nusken | OK | 0 events |
| Matrix/Fountain | OK | Token refreshed, 0 msgs since cutoff |
| Redmine | OK | 1 new bug (normal priority) |
| Google Sheets | SKIPPED | Already checked in daily report |
| Scrin.io | SKIPPED | Already checked in daily report |

## Notes

- AmazingMeds & Equanimity use xoxc session tokens + cookies — these expire and need manual re-login to refresh
- Discord tokens (nusvinn + nuscarrick) both working again (200 OK) — previous 403 resolved
- Matrix token refreshed via browser login script
- SAMGuard: 2 msgs (normal HubSpot activity)
- Generator: 2 msgs (normal dev activity)
- LegalAtoms: 1 msg (normal)
- MyPersonalFootballCoach: 6 msgs (normal)
- Redmine #77831: New Fountain bug — section display issue on card 2595
