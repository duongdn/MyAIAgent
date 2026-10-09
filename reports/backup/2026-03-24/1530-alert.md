# Alert Scan — 2026-03-24 15:30

**Window:** 2026-03-24T15:00:00+07:00 → 2026-03-24T15:30:00+07:00
**Sources checked:** 9 (Slack 14ws, Discord 2acct, Matrix, Redmine, Email skipped, GitHub skipped)
**Alerts:** 0 CRITICAL, 1 HIGH, 0 MEDIUM, 0 LOW

## CRITICAL / HIGH Alerts (notified)

| # | Severity | Source | Summary | Link |
|---|----------|--------|---------|------|
| 1 | HIGH | Slack/GlobalGrazingServices | Production incident: mapping & grazing front office DOWN for customers. Joey manually patching staging, Nick debugging by comparing two versions. Prestashop logistics fallback in use. Priority fix list: grazing/mapping front office → promotional code → accessories toggle + order cart → reduction issue | https://globalgrazingservices.slack.com/ #maintenance |

## MEDIUM / LOW (report only)

None.

## Sources Status

| Source | Status | Items |
|--------|--------|-------|
| Slack (14 ws) | 14 OK (all tokens valid) | 14 msgs total (GGS:8, RDC:3, Generator:3) |
| Slack/AmazingMeds | Session OK (auth.test valid), search limited | 0 scannable |
| Slack/Equanimity | Session OK (auth.test valid), search limited | 0 scannable |
| Discord (2 acct) | OK (both tokens valid) | 0 msgs in window |
| Matrix/Fountain | OK (token refreshed) | 0 msgs in window |
| Redmine | OK | 0 issues updated |
| Email (6 acct) | SKIPPED | Short 30-min window |
| GitHub | SKIPPED | No token config |
| Google Sheets | SKIPPED | Not first scan of day |
| Scrin.io | SKIPPED | Not first scan of day |

## Notes

- GGS incident is actively being worked by joey, nick, and amy in #maintenance. Customer-facing features affected but team is aware and responding.
- Bizurk/fwf-frontend has post-cutoff activity but nuscarrick token lacks read permission — content unknown.
