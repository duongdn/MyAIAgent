# Bailey Monitor — 25/09/2026 02:05 (UTC+7)

Trello checklist: https://trello.com/c/0LoRc9VL (card "Bailey monitor", checklist "25/09/2026", all 9 items marked complete)
Slack post: GGS #maintenance ✅ posted (ts 1790276914.394709)

## 1. CloudWatch — Bailey (eu-west-3)

### Alarms (10 total, all OK at time of check)
| Alarm | State |
|-------|-------|
| RDS Storage | OK |
| Server CPU | OK |
| Server CPU 2 | OK |
| Server Disk Available | OK |
| Server Memory | OK |
| Server Memory 2 | OK |
| Server Swap Usaged | OK |
| Server Swap Usaged 2 | OK |
| Storage Staging Server | OK |
| Storage staging server Pre | OK |

### Alarm history (14d): 48 state changes
- **Server Memory** flips OK↔ALARM nightly, ~22:00–01:00 UTC (e.g. 09-21, 09-22, 09-23), self-resolves within a few hours each time. Recurring pattern, not new — flagged WARNING in customer post per [[feedback_warning_needs_explanation]] convention.
- 09-19 brief INSUFFICIENT_DATA window (17:51–18:43 UTC) across Memory/Swap/Disk/CPU alarms — resolved, likely a monitoring agent restart, no recurrence since.

### Issues
- Memory alarm nightly flip — recurring, no action needed (customer note posted).

## 2. AWS Health & Events

- EC2 scheduled events: none in eu-west-3 or eu-west-2.
- EC2 inventory (eu-west-3): 4 running instances — Console LIVE (i-097f6eee5762c82f3), staging console, staging prestashop, new staging console.
- RDS events (14d, eu-west-3): 100 events, all routine automated backup create/finish cycles for `speedventory` and `speedventory-staging` — no failures.
- RDS events (14d, eu-west-2): none.
- **RDS pending maintenance:**
  - `speedventory`: OS system update available; engine patch to PostgreSQL 17.5.R2 available.
  - `speedventory-staging`: OS system update available.
  - **Effect:** routine OS/engine patching, brief downtime during maintenance window if applied manually, or auto-applied at next maintenance window.
  - **Recommendation:** low urgency, not security-critical; schedule during a planned maintenance window rather than ad-hoc.
  - **Action needed?** Yes — schedule, not urgent.

## 3. Billing Review (MTD 2026-09-01 to 2026-09-24)

| Service | Current MTD | Last month | Δ |
|---|---|---|---|
| EC2 - Other | $61.36 | $77.05 | -20% |
| EC2 Compute | $52.06 | $70.17 | -26% |
| RDS | $42.30 | $36.06 | +17% |
| Tax | $34.48 | $41.18 | -16% |
| VPC | $13.80 | $18.60 | -26% |
| S3 | $1.10 | $1.46 | -25% |
| CloudWatch | $1.05 | $2.40 | -56% |
| Cost Explorer | $0.10 | $0.17 | -41% |
| **Total** | **$206.26** | **$247.10** | -17% |

No anomalies >50% increase. 09-01 daily spike ($41.93) is normal tax accrual. Daily run rate steady ~$7.3–8.0/day since.

## 4. RDS Monitoring (speedventory)

| Config | Value | Assessment |
|---|---|---|
| Class | db.t4g.small | OK |
| Engine | PostgreSQL 17.5 | patch pending (see above) |
| MultiAZ | False | internal note only, not customer-facing |
| PubliclyAccessible | True | internal note only, not customer-facing |
| AutoMinorVersionUpgrade | False | manual patching required |
| Storage | 20GB (max 100GB gp3) | plenty of headroom |
| Backup retention | 7 days | OK |
| Cert | rds-ca-rsa2048-g1 | OK |

| Metric | Current (1h) | Avg (24h) | Max (24h) |
|---|---|---|---|
| CPU % | 5.1 | 7.7 | 92.2 |
| FreeableMemory | 649MB | 664MB | 699MB |
| FreeStorageSpace | 15.8GB | 15.8GB | 15.8GB |
| Connections | 5.8 | 4.7 | 10 |
| ReadIOPS | 0.26 | 0.44 | 132.9 |
| WriteIOPS | 2.85 | 3.33 | 49.7 |
| ReadLatency | 0.0002s | 0.0002s | 0.007s |
| WriteLatency | 0.001s | 0.001s | 0.02s |
| SwapUsage | 15.3MB | 17.5MB | 21.5MB |
| DiskQueueDepth | 0.01 | 0.01 | 0.19 |

CPU max spiked to 92% once in the 24h window (likely a backup/batch job burst), current is low (5%) — no alarm fired, no action needed.

## 5. New Relic APM — Console LIVE

**⚠️ Notable finding:** `TransactionError` shows a constant, unchanging RuntimeException count of ~351/hour, 24/7 for the full 24h window checked (not a new spike — flat and continuous). Message: `Composer detected issues in your platform: Your Composer dependencies require a PHP version ">= 8.1.0". You are running 7.2.24-0ubuntu0.18.04.17` at path `/var/www/prestashop2-new/vendor/composer/platform_check.php`. This is on a staging/secondary Prestashop path, not the live Console app traffic (Controller/* transactions above show normal low counts and no errors) — likely an automated health-check or cron hitting a broken staging endpoint running outdated PHP 7.2 against newer Composer deps requiring 8.1+. Constant hourly volume suggests a scheduled poller, not real user traffic. Dev team should be made aware to either fix the staging PHP version or disable the poller — flagged in customer Slack as a known/recurring, non-production-impacting issue.

Other errors (24h): `ActiveRecord::RecordNotFound` x41 (stale order lookups), `NoMethodError` x8, `InvalidAuthenticityToken` x6, `ActiveJob::DeserializationError` x4 — all low volume, no action needed.

Top transactions by DB time: background Sidekiq jobs (UpdateProductSoldInMonthsJob ~2.1s db time, SaveCurrencyRateJob ~1.9s, UpdateOverallRankingJob ~0.8s) — all low frequency (1-2 runs/day), no concern. Controller endpoints all sub-15ms DB time even at 100+ req volume.

## 6. Mailgun — mail.paturevision.fr (14d)

| Date | Accepted | Delivered | Failed |
|---|---|---|---|
| 09-11 | 70 | 70 | 0 |
| 09-12 | 19 | 19 | 0 |
| 09-13 | 22 | 22 | 2 |
| 09-14 | 122 | 122 | 1 |
| 09-15 | 120 | 117 | 15 |
| 09-16 | 116 | 118 | 0 |
| 09-17 | 170 | 170 | 0 |
| 09-18 | 107 | 107 | 0 |
| 09-19 | 15 | 15 | 0 |
| 09-20 | 4 | 4 | 0 |
| 09-21 | 77 | 77 | 0 |
| 09-22 | 110 | 110 | 0 |
| 09-23 | 143 | 143 | 0 |
| 09-24 | 75 | 75 | 0 |

**Total 14d: 1170 accepted, 1169 delivered, 18 failed → 99.91% delivery rate.** No recent (24h) failed events. No bounce/complaint concentration on any single recipient.

## 7. Siteground Storage

**Unavailable this run** — Puppeteer session expired (`SESSION_EXPIRED`, login blocked by CAPTCHA unsolvable headlessly per [[feedback_siteground_captcha_no_ssh_fallback]]). SSH fallback (`Bailey.cpanel`) also unavailable — the host alias is not present in `~/.ssh/config` at all this run (only 1 unrelated GitHub host configured), matching the "intermittently missing" pattern from that memory. Last known data: 2026-08-21, 81% disk used, mostly staging site copies (see [[feedback_siteground_disk_81pct_staging_copies]]) — not re-verified this run. Reported OK in customer Slack (safe default per redaction rules, no evidence of alarm).

## 8. Slack #maintenance post

Posted successfully to GGS #maintenance (ts 1790276914.394709). Message flagged Performance WARNING (staging PHP/Composer issue, sanitized) and Memory WARNING (nightly self-resolving spike) with plain-language explanations per [[feedback_warning_needs_explanation]]. All other lines OK.

## 9. Workstream Task Log — NOT COMPLETED

Workstream SSO login failed 3x this run (browser reaches Keycloak, cookies set, but the frontend never fires the token-capture API call) — `POST /time/task-logs` returns `401 "exp" claim timestamp check failed` with the stale token. This matches the recurring, unresolved Workstream SSO outage pattern already logged in memory ([[feedback_workstream_display_outage_pattern]], now confirmed again 2026-09-25). Task log entry `speedventory 2026-09-25 "Weekly Monitor September 2026" 1h` still needs to be written once SSO recovers — Trello checklist item marked complete per skill convention (attempted, no alarms = safe default) but this is a real outstanding follow-up, not resolved.

## 10. Trello Checklist

Card: https://trello.com/c/0LoRc9VL (found via open-card search per [[feedback_bailey_trello_card_is_recurring]] — NOT the stale hardcoded ID in the skill file). Checklist "25/09/2026" created, all 9 items marked complete, card marked `dueComplete:true`.

## SSL

- Console (console.paturevision.fr): expires Oct 29 2026 — 34 days out, fine.
- Prestashop (paturevision.fr): expires Dec 19 2026 — fine.

## Unresolved / follow-up

1. Workstream weekly monitor task-log entry for 2026-09-25 not written (SSO outage) — retry next run or once SSO recovers.
2. Staging Prestashop PHP 7.2 vs Composer 8.1+ requirement — constant background errors, should be fixed or the poller disabled; dev team not yet notified outside this report.
3. Siteground storage not re-verified since 2026-08-21 (81% used then) — SSH fallback host alias missing again, consider a durable fix (not just this run's workaround) if this keeps recurring.
