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
