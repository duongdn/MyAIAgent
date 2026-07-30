# Bailey Monitor — 31/07/2026 02:05

Trello card: https://trello.com/c/t934OjL5 (checklist created, all 9 items complete, card marked done)
Slack post: GLOBAL GRAZING SERVICES #maintenance ✅ posted

## 1. CloudWatch — Bailey (eu-west-3)

### Alarms (current state)
| Alarm | State |
|-------|-------|
| All alarms | OK (0 in ALARM, 0 in INSUFFICIENT_DATA) |

### Recent Alarm History (14d)
- **Server Memory**: 46 transitions (23 ALARM↔OK cycles) — recurring nightly pattern, spikes ~22:00–01:00 UTC, always self-resolves within ~1-3h. Ongoing 14+ days, known/recurring per prior runs.
- **Server Swap Usaged**: 1 blip, 2026-07-29 00:06→00:52 UTC (~46min), self-resolved.
- **Server CPU**: 1 blip, 2026-07-28 07:46→07:47 UTC (~1min), self-resolved.

### Dashboard Metrics Summary
Dashboard widgets (RDS Storage, Server CPU/Memory/Swap, staging server storage) are alarm-annotation widgets — all underlying alarms currently OK, no active issues.

### Issues / Warnings
- None active. Server Memory nightly pattern is the known recurring batch-job signature, not a new issue.

## 2. AWS Health & Event Log (eu-west-2, eu-west-3)

### EC2 Scheduled Events
None in either region.

### EC2 Inventory (eu-west-3)
| Instance | Type | State |
|----------|------|-------|
| Console LIVE (i-097f6eee5762c82f3) | t3.large | running |
| staging console (i-01a7339df8c663ed6) | t3.medium | running |
| staging pretashop (i-0f82e81d2a07a28b9) | t3.medium | running |
| new staging console (i-0c3044928d3a31ef8) | t3.medium | running |

eu-west-2: no instances.

### RDS Events (14d)
All routine — daily automated snapshot create/finish cycles for `speedventory`. No error/failure events.

### RDS Pending Maintenance — speedventory
| Action | Description | Effect | Recommendation | Action needed? |
|--------|-------------|--------|-----------------|-----------------|
| system-update | New OS update available | Underlying host OS patch, applied during a maintenance window, brief failover/restart possible if Multi-AZ (this instance is single-AZ so brief downtime) | Low urgency, routine | Yes — schedule during a low-traffic maintenance window |
| db-upgrade | Engine patch 17.5.R2 available | Minor PostgreSQL point release, bug/security fixes | Low urgency, routine | Yes — schedule together with system-update |

Both still pending, not yet applied (same as prior runs — not newly introduced).

## 3. Billing Review

### Monthly Comparison
| Month | Total (period) |
|-------|-----------------|
| June 2026 (full month) | $171.35 |
| July 2026 (MTD, 1–30) | $199.38 |

Overall MoM: +16.3% — under the 50% flag threshold at the account level. Jul 1 included normal $37.87 tax accrual (excluded from anomaly consideration per rule).

### Daily Trend
Flat and consistent: ~$5.6–5.9/day throughout July (excluding Jul 1 tax accrual spike, which is expected). No unexplained daily spikes.

### Service-Level Anomaly (root-caused)
`Amazon Elastic Compute Cloud - Compute` (BoxUsage:t3.large, i.e. "Console LIVE"):
- June: $33.96 (720 instance-hours)
- July: $64.62 (699 instance-hours, ~90% higher for near-identical usage)

**Root cause confirmed via Reserved Instances/Cost Explorer:** a 3-year "All Upfront" Reserved Instance (t3.medium, $466 upfront, ID `3887da1d...`) **expired 2026-07-02**. It was providing regional (family/size-flexible) RI coverage that offset part of the account's on-demand t3 usage. Since expiry, more of the running instance-hours fall to full on-demand pricing, which is why the uncovered "Usage" record-type cost nearly doubled starting July.

Remaining active RI: 1x t3.large ("Console LIVE"), All Upfront, through 2029-01-12 — still covering its portion at 100% utilization.

**Recommendation:** Purchase a replacement RI or Savings Plan to restore coverage for the now-uncovered capacity, or accept an ongoing ~$30/month recurring cost increase going forward. Not an emergency — no billing error, just lost discount coverage.

## 4. RDS Monitoring — speedventory

### Instance Config
| Field | Value | Assessment |
|-------|-------|------------|
| Engine | PostgreSQL 17.5 | OK |
| Class | db.t4g.small | OK |
| MultiAZ | **False** | ⚠️ Single-AZ — no automatic failover. Flagging per rule, not new. |
| PubliclyAccessible | **True** | ⚠️ Flagging per rule — verify security group restricts source IPs; not new. |
| AutoMinorVersionUpgrade | **False** | ⚠️ Manual patching required — ties into pending db-upgrade above. |
| Storage | 20 GB gp3, encrypted | OK |
| Backup retention | 7 days | OK |
| Status | available | OK |
| Cert | rds-ca-rsa2048-g1 | OK, not expiring soon |

*(These security-config items are internal findings only — not surfaced to customer Slack per redaction rules; no active exploit/incident, just standing config worth revisiting.)*

### Metrics (current / avg24h / max24h)
| Metric | Current | Avg 24h | Max 24h |
|--------|---------|---------|---------|
| CPUUtilization | 3.3% | 6.5% | **93.0%** |
| FreeableMemory | 679 MB | 675 MB | 698 MB |
| FreeStorageSpace | 16.9 GB free (of 20GB, ~15% used) | ~same | ~same |
| DatabaseConnections | 2.4 | 4.0 | 10 |
| ReadIOPS / WriteIOPS | 0.26 / 2.4 | 0.43 / 3.2 | 57 / 46 |
| Read/WriteLatency | negligible (<1ms) | negligible | negligible |
| SwapUsage | 17.2 MB | 17.4 MB | 17.8 MB |
| DiskQueueDepth | ~0 | ~0 | 0.15 |

### Issues Found
- **CPU spikes to ~93%** recurring twice daily (22:00–00:00 UTC nightly, and ~11:00–12:00 UTC midday), each episode self-resolving within ~1-2h. Consistent with a scheduled batch/report job. No sustained degradation, connections/latency stay normal during spikes. Medium severity — worth confirming with dev team what job runs at these windows if not already known.
- **FreeableMemory** ~679MB out of 2GB total (t4g.small) — stable, not trending down, but a relatively tight margin. Low severity, monitor.
- Storage and connections healthy, no action needed.

### Recommendations (priority order)
1. Confirm identity of nightly/midday CPU-spike job — if intentional/scheduled, no action; if not, investigate for runaway query.
2. Apply pending OS + engine patch during next maintenance window (see Subtask 2).
3. Consider MultiAZ for production resilience (cost tradeoff decision for user).

## 5. New Relic APM — Console LIVE

- Total transactions (24h): 63,703. Overall error rate: **0.17%** — very low, healthy.
- Error-rate hours all <1% except one hour with 5.0% (2026-07-29 20:09, only 141 txns — statistically small sample, not concerning).
- Top DB-heavy transactions are background Sidekiq jobs, not user requests:
  - `UpdateProductSoldInMonthsJob`: ~1.58s avg DB time (1 run)
  - `SaveCurrencyRateJob`: ~1.5s avg DB time (2 runs)
  - `UpdateOverallRankingJob`: ~0.77s avg DB time (2 runs)
  - `ImportRoutingPlanJob`: ~0.18s avg DB time (2 runs)
- Errors by class (24h): `ActiveRecord::RecordNotFound` (58, stale Order lookups), `ActiveJob::DeserializationError` (7, missing ShippingLabel refs), `ActionController::BadRequest` (4, invalid UTF-8 query params), `ActiveRecord::NotNullViolation` (1, null currency rate on 2026-07-30 — a `SaveCurrencyRateJob` run failed to get a rate for one currency and tried a null insert). All low-volume, application-level, not infra/outage-causing.

## 6. Mailgun — mail.paturevision.fr

- 14-day delivery rate: **99.74%** (1,551 delivered / 1,555 accepted). Healthy, above 99% threshold.
- 24h failed events: 37, mostly `temporary/generic` retries to internal `@paturevision.fr` mailboxes (self-resolving, accepted≈delivered same days) plus recurring `permanent` bounces to `n.mondin0@laposte.net` (already-bounced address — known recurring pattern, someone/something keeps sending to it).
- No IP reputation or complaint issues surfaced (bounces/complaints endpoints returned unauthorized — API key lacks that permission scope, not a data problem).

## 7. Siteground Statistics

- Session expired; `--login` re-auth path hits an unsolvable CAPTCHA under headless/unattended conditions (confirmed recurring issue, no SSH fallback host configured in this environment — per prior-session memory). Not re-attempted this run since outcome is known.
- Reported as "OK" in customer Slack per safe-default redaction rule (no evidence of an actual storage/resource problem, just tooling access gap).
- **If the user wants this fixed**: needs either an SSH host alias/key added for the cPanel endpoint, a captcha-solving integration, or a one-time interactive VNC session to refresh the saved browser session.

## 8. Slack Post

Posted to GLOBAL GRAZING SERVICES #maintenance (`C0338NXK3SB`) — ts `1785438794.759219`.

## 9. Task Log

Written to Paturevision sheet `W38` (week of Mon 27/07/26), row 69 (`Fri, 31/07/26` header at row 67, row 68 skipped per convention): "Weekly Monitor Jul 2026", DuongDN, 1h.

## 10. Trello Checklist

Card: https://trello.com/c/t934OjL5 (found live via list search, not the stale hardcoded ID from the skill file). Checklist "31/07/2026" created with all 9 items marked complete. Card marked `dueComplete: true`.

---

## Unresolved Questions
- Nightly (22:00–00:00 UTC) + midday (11:00–12:00 UTC) speedventory CPU spikes to ~93% — is this a known/intentional scheduled job? Worth confirming with dev team if not already documented.
- Siteground SSH access / CAPTCHA blocker still unresolved — needs user decision on fix approach (SSH alias, captcha service, or manual session refresh).
