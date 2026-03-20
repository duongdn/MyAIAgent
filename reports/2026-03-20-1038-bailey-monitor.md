# Bailey Monitor — 2026-03-20 10:38 (UTC+7)

## CloudWatch — Bailey (eu-west-3)

### Alarms — All OK

| Alarm | State | Current Value | Threshold | Headroom |
|-------|-------|--------------|-----------|----------|
| Server CPU | OK | 1.01% | 70% | ~69% |
| Server CPU 2 | OK | 2.01% | 70% | ~68% |
| Server Memory | OK | 12.78% | 90% | ~77% |
| Server Memory 2 | OK | 42.02% | 90% | ~48% |
| Server Swap Used | OK | 161 MB | 5,000 MB | ~97% free |
| Server Swap Used 2 | OK | 830 MB | 2,000 MB | ~58% free |
| RDS Storage | OK | 17.2 GB free | 5 GB min | ~12 GB buffer |
| Server Disk Available | OK | No data (1h) | 5 GB min | — |
| Storage Staging Server | OK | No data (1h) | 5 GB min | — |
| Storage Staging Server Pre | OK | No data (1h) | 5 GB min | — |

### Recent Alarm Activity (14 days)

| Alarm | State Changes | Last Event | Notes |
|-------|--------------|------------|-------|
| **Server Memory** | **36 flaps** | 20 Mar 01:02 UTC — ALARM->OK | Crossed 90% threshold ~18 times. Last spike: 91.5% on 19 Mar 22:19 UTC, recovered to 79% by 01:02 UTC |
| Server CPU | 14 flaps | 17 Mar 00:03 UTC — ALARM->OK | CPU spikes above 70% mostly on 16-17 Mar |
| Server Swap Used | 2 flaps | 14 Mar 00:38 UTC — ALARM->OK | Single spike on 14 Mar, resolved in 33 min |

### Issues / Warnings

- **Server Memory flapping (36 state changes/14d)**: Memory regularly hits 90%+ threshold, especially during evening hours (UTC 22:00-01:00). Recovers each time but frequency is concerning — may indicate memory leak or undersized instance. Recommend investigation.
- **3 metrics missing data**: Server Disk Available, Storage Staging Server, Storage Staging Server Pre — no datapoints in last 1h. CloudWatch agent may not be reporting disk metrics. Verify agent status on staging servers.

### Summary

All alarms currently OK. No imminent events. Main concern is **Server Memory** flapping ~2.5x/day avg — not critical now but trending toward needing attention.

---

## AWS Health & Event Log

### Infrastructure

| Resource | Region | Type | State |
|----------|--------|------|-------|
| Console LIVE (i-097f6eee5762c82f3) | eu-west-3 | EC2 | running |
| staging console (i-01a7339df8c663ed6) | eu-west-3 | EC2 | running |
| staging pretashop (i-0f82e81d2a07a28b9) | eu-west-3 | EC2 | running |
| speedventory | eu-west-3 | RDS | active |
| eu-west-2 | — | — | No resources |

### EC2 Scheduled Events

None. No pending maintenance, retirement, or reboot events on any instance.

### RDS Events (14 days)

- **speedventory** (eu-west-3): Daily automated snapshots running normally at 13:00 UTC. All 14 days successful, completing in ~3-6 min. No errors, failovers, or configuration changes.

### RDS Pending Maintenance — ACTION NEEDED

| Resource | Action | Description | Deadline |
|----------|--------|-------------|----------|
| **speedventory** | system-update | New OS update available | No forced date |
| **speedventory** | db-upgrade | Engine patch 17.5.R2 available | No forced date |

**Effect**: Both are optional (no auto-apply date set). OS update = security/kernel patches. DB upgrade (17.5.R2) = PostgreSQL patch with bug fixes and security patches.

**Recommendation**: Schedule during low-traffic window. OS update may cause brief reboot (~30s downtime for single-AZ). DB upgrade takes ~5-10 min depending on instance size. Apply OS update first, then db-upgrade in next maintenance window.

**Action needed?** Not urgent (no deadline), but recommended within 2-4 weeks to stay current on security patches. If the instance is single-AZ, plan for brief downtime.

### AWS Health Dashboard

API requires Business/Enterprise Support plan — not available on this account. Checked via service-level APIs instead (EC2 events, RDS events, pending maintenance).

### Summary

No imminent events. 2 optional maintenance actions pending on RDS `speedventory` — recommend scheduling within 2-4 weeks.
