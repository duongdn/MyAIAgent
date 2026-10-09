# Alert Scan — 2026-03-24 13:30

**Window:** 2026-03-24T11:00:00+07:00 → 2026-03-24T13:30:00+07:00
**Sources checked:** 9 (Slack 14ws, Discord 2acct, GitHub 2acct, Matrix, Redmine, Email 6acct)
**Alerts:** 0 CRITICAL, 1 HIGH, 3 MEDIUM, 0 LOW

## CRITICAL / HIGH Alerts (notified)

| # | Severity | Source | Summary | Link |
|---|----------|--------|---------|------|
| 1 | HIGH | Matrix/Fountain | Token expired + refresh_token invalid — room monitoring offline (blind spot). Needs manual browser login. | https://chat.nustechnology.com |

## MEDIUM / LOW (report only)

| # | Severity | Source | Summary |
|---|----------|--------|---------|
| 1 | MEDIUM | Redmine/#77839 | New Bailey bug: "[Prestashop 9] [Live] Product accessories toggle controls missing" — Normal priority, assigned VietPH | [#77839](https://redmine.nustechnology.com/issues/77839) |
| 2 | MEDIUM | Redmine/#77836 | New Bailey bug: "[Prestashop 9] [Live] Block selection not highlighting associated paddocks" — Normal priority, assigned VietPH | [#77836](https://redmine.nustechnology.com/issues/77836) |
| 3 | MEDIUM | Redmine/#77832 | New Fountain bug: "[Card_ID:2595] Gift 'Build a box' not showing all items" — Normal priority, assigned VuTQ | [#77832](https://redmine.nustechnology.com/issues/77832) |

## Sources Status

| Source | Status | Items |
|--------|--------|-------|
| Slack (14 ws) | ALL OK | 0 msgs in window — AmazingMeds + Equanimity tokens recovered (were expired at 1100) |
| Discord (2 acct) | OK | nusvinn: 13 msgs AirAgri (normal dev), nuscarrick: Bizurk partial access (permissions, not token) |
| Email (6 acct) | OK | 0 new emails since cutoff |
| GitHub/duongdn | OK | 0 events since cutoff |
| GitHub/nusken | OK | 0 events since cutoff |
| Matrix/Fountain | AUTH FAIL | Token + refresh_token both expired, needs manual browser login |
| Redmine | OK | 3 new bugs (all Normal priority) |
| Google Sheets | SKIPPED | Already checked in daily report |
| Scrin.io | SKIPPED | Already checked in daily report |

## Notes

- AmazingMeds & Equanimity xoxc session tokens are working again (resolved since 1100 scan)
- Matrix auth failure is recurring — token was refreshed during 1100 scan but expired again. The 5-min token TTL makes automated monitoring fragile.
- AirAgri Discord: dev activity around door sensor staging deploy, hazard area PR271, motion/speed detection — all normal
- Bizurk Discord: nuscarrick token valid but Missing Access on most channels (permissions issue, not auth)
- Redmine: 3 new Normal-priority bugs (2 Bailey/Prestashop 9 live issues, 1 Fountain gift box display)
