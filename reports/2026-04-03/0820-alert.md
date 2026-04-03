# Alert Scan — 2026-04-03 08:20

**Window:** 2026-04-02 08:45 → 2026-04-03 08:20 (+07:00)
**Sources checked:** 21
**Alerts:** 0 CRITICAL, 0 HIGH, 2 MEDIUM, 0 LOW

## CRITICAL / HIGH Alerts (notified)

None.

## MEDIUM / LOW (report only)

| # | Severity | Source | Summary |
|---|----------|--------|---------|
| 1 | MEDIUM | Email/Rollbar | Fountain/FirstProject prod — 4x TypeError: Cannot read properties of null (reading 'title') (#973-#976) |
| 2 | MEDIUM | Email/Rollbar | Fountain/FirstProject prod — ChunkLoadError: Loading chunk 3730 failed (stale deploy/CDN) |

## Sources Status

| Source | Status | Items |
|--------|--------|-------|
| Slack (14 ws) | OK | 0 alerts |
| Discord (AirAgri) | OK | 0 alerts |
| Discord (Bizurk) | OK | 0 alerts |
| Email (6 accounts) | OK | 2 MEDIUM |
| Matrix (Fountain) | OK | 0 alerts |
| GitHub (Elena) | OK | 0 alerts |
| GitHub (Precognize) | 404 | repo path may need verification |
| Redmine | OK | 0 alerts |
| Google Sheets | Skipped | checked in daily report |
| Scrin.io | Skipped | checked in daily report |

## Notes

- Fountain Rollbar errors are team code issues (MEDIUM, not production-down). VuTQ disabled delivery date auto-change on BETA due to incorrect logic — dev fix in progress.
- Precognize GitHub 404 — recurring, repo name/org may have changed. Not a new issue.
- All Slack session tokens (Amazing Meds, Equanimity) valid.
- Both Discord tokens verified OK (3-step check passed).
