# PostgreSQL RDS Health Check Report
**Database:** xid_async_production  
**Host:** xid-async-app-api.cklx2wfxabbc.ap-southeast-1.rds.amazonaws.com  
**Version:** PostgreSQL 14.17 (x86_64-pc-linux-gnu, gcc 7.3.1)  
**Assessment Date:** 2026-04-03  
**Assessed By:** database-admin subagent

---

## Executive Summary

The `xid_async_production` database is a **32 GB multi-tenant PostgreSQL instance** running on AWS RDS. The architecture uses schema-per-tenant isolation with 27 active tenant schemas and 32 archived backup schemas. The system is currently **stable with no active lock contention, no long-running queries, and no replication configured**.

However, several **critical performance and bloat issues** require immediate attention:

| Severity | Issue | Impact |
|---|---|---|
| CRITICAL | Massive table bloat in DeviceCmds (tenant99, tenant126, tenant112) | Storage waste, slow scans |
| CRITICAL | Catastrophic sequential scan ratios on DeviceCmds tables | CPU/IO saturation |
| HIGH | TmpBioPhotos tables: 145–177 MB total size, only ~200 KB live data | ~99% bloat |
| HIGH | Buffer cache hit ratio 90.3% (below 95% target) | Disk I/O pressure |
| MEDIUM | 25+ unused indexes consuming ~150 MB | Wasted storage + write overhead |
| MEDIUM | `work_mem` at 4 MB (very low) | Spill-to-disk on sorts/joins |
| LOW | No slow query logging enabled | No observability into slow queries |
| LOW | No read replicas configured | Single point of failure risk |

---

## 1. Database Size

**Total database size: 32 GB**

| Database | Size |
|---|---|
| xid_async_production | 32 GB |
| rdsadmin | 9.1 MB |
| template1 / postgres / pem | ~8.9 MB each |

**Size breakdown by schema category:**

| Category | Schema Count | Total Size |
|---|---|---|
| Active tenant schemas | 27 | 32 GB |
| Backup schemas | 31 | 15 MB |
| public | 1 | 48 kB |

All meaningful data is in the 27 active tenant schemas. Backup schemas are negligibly small (15 MB total).

---

## 2. Top 20 Largest Tables

| Schema | Table | Total Size | Table Size | Index Size |
|---|---|---|---|---|
| tenant126 | DeviceCmds | **9,263 MB** | 140 MB | 57 MB |
| tenant112 | DeviceCmds | **8,127 MB** | 288 MB | 85 MB |
| tenant99 | DeviceCmds | **7,885 MB** | 169 MB | 66 MB |
| tenant106 | DeviceCmds | 1,517 MB | 17 MB | 21 MB |
| tenant130 | DeviceCmds | 767 MB | 35 MB | 8.7 MB |
| tenant56 | DeviceCmds | 660 MB | 12 MB | 4.8 MB |
| tenant77 | DeviceCmds | 565 MB | 15 MB | 7.6 MB |
| tenant112 | RealTimeLogs | 439 MB | 384 MB | 54 MB |
| tenant56 | RealTimeLogs | 433 MB | 388 MB | 45 MB |
| tenant133 | DeviceCmds | 370 MB | 3.4 MB | 1.5 MB |
| tenant99 | RealTimeLogs | 324 MB | 284 MB | 40 MB |
| tenant126 | RealTimeLogs | 240 MB | 240 MB | 0 |
| tenant137 | DeviceCmds | 198 MB | 2.5 MB | 912 kB |
| tenant131 | DeviceCmds | 185 MB | 17 MB | 5.3 MB |
| tenant56 | TmpBioPhotos | **177 MB** | 232 kB | 0 |
| tenant112 | TmpBioPhotos | **175 MB** | 208 kB | 0 |
| tenant126 | TmpBioPhotos | **170 MB** | 232 kB | 0 |
| tenant99 | TmpBioPhotos | **145 MB** | 200 kB | 0 |
| tenant66 | RealTimeLogs | 137 MB | 113 MB | 24 MB |
| tenant130 | RealTimeLogs | 121 MB | 121 MB | 0 |

**Key observation:** The top 3 DeviceCmds tables (tenant126/112/99) account for **~25 GB combined**, with total size vastly exceeding live data size — strong bloat signal.

---

## 3. Connection Stats

| Metric | Value |
|---|---|
| max_connections | 402 |
| Total connections | 13 |
| Active (running query) | 1 (our monitoring query) |
| Idle | 6 |
| Idle in transaction | 0 |
| Waiting on Lock | 0 |
| Utilization | 3.2% |

**Status: HEALTHY.** Connection utilization is very low. No idle-in-transaction connections. No lock waits. Connection pooling (PgBouncer/RDS Proxy) may not be needed at current load, but recommended for production resilience.

---

## 4. Table Stats — Dead Tuples and Bloat

### Dead Tuple Summary (Top offenders)

| Schema | Table | Live Rows | Dead Rows | Dead % | Last Autovacuum |
|---|---|---|---|---|---|
| tenant112 | RealTimeLogs | 1,274,675 | 17,524 | 1.4% | 2026-04-01 |
| tenant126 | RealTimeLogs | 737,028 | 16,986 | 2.3% | 2026-04-01 |
| tenant126 | DeviceCmds | 243,782 | 14,739 | **6.0%** | 2026-04-02 |
| tenant112 | DeviceCmds | 125,028 | 11,203 | **9.0%** | 2026-04-02 |
| tenant77 | DeviceCmds | 26,675 | 2,632 | **9.9%** | 2026-04-02 |
| tenant137 | DeviceCmds | 9,120 | 620 | **6.8%** | 2026-03-09 (25 days ago) |
| tenant99 | TmpBioDatas | 1,246 | 170 | **13.6%** | Never |
| tenant106 | UserInfo | 442 | 73 | **16.5%** | 2025-12-16 |
| tenant112 | TmpFPs | 1,645 | 194 | **11.8%** | Never |

### Critical Bloat — DeviceCmds Tables

The DeviceCmds table exhibits extreme bloat (total size vastly exceeds live data):

| Schema | Total Size | Table (live) Size | Live Rows | Bytes/Row | Bloat Estimate |
|---|---|---|---|---|---|
| tenant126 | 9,263 MB | 140 MB | 243,782 | 602 B | **~9.1 GB bloat** |
| tenant112 | 8,127 MB | 288 MB | 125,028 | 2,418 B | **~7.8 GB bloat** |
| tenant99 | 7,885 MB | 169 MB | 17,300 | ~10 kB | **~7.7 GB bloat** |
| tenant106 | 1,517 MB | 17 MB | 60 | — | **~1.5 GB bloat** |

**Root cause:** DeviceCmds is likely a command/event queue with high insert+delete churn. Autovacuum reclaims dead tuple visibility but does NOT return space to OS — `VACUUM FULL` (or `pg_repack`) required to reclaim the physical space.

### Critical Bloat — TmpBioPhotos Tables

| Schema | Total Size | Table Size | Live Rows | Bloat |
|---|---|---|---|---|
| tenant56 | 177 MB | 232 kB | 2,550 | ~99.9% |
| tenant112 | 175 MB | 208 kB | 2,208 | ~99.9% |
| tenant126 | 170 MB | 232 kB | 2,571 | ~99.9% |
| tenant99 | 145 MB | 200 kB | 1,829 | ~99.9% |

TmpBioPhotos has essentially all of its allocated space as dead space. Only ~200 kB of live data but 145–177 MB allocated. These tables hold temporary biometric photo data that has been repeatedly inserted and deleted without VACUUM FULL.

---

## 5. Index Health

### Unused Indexes (idx_scan = 0)

25 indexes have never been used since stats reset:

| Schema | Table | Index | Size |
|---|---|---|---|
| tenant99 | DeviceCmds | idx_devicecmds_id | 15 MB |
| tenant66 | DeviceCmds | idx_devicecmds_devsn_returnvalue | 14 MB |
| tenant112 | RealTimeLogs | tenant112_idx_inoutstatus | 14 MB |
| tenant99 | RealTimeLogs | tenant99_idx_inoutstatus | 10 MB |
| tenant106 | DeviceCmds | idx_devicecmds_id | 4.7 MB |
| tenant66 | DeviceCmds | idx_devicecmds_id | 4.6 MB |
| tenant66 | RealTimeLogs | tenant66_idx_inoutstatus | 3.8 MB |
| tenant66 | RealTimeLogs | tenant66_idx_pin | 3.6 MB |
| tenant130 | DeviceCmds | idx_devicecmds_id | 2.0 MB |
| tenant114 | DeviceCmds | idx_devicecmds_id | 2.0 MB |
| ... (15 more smaller) | | | |

**Total unused index space: ~80+ MB**

Note: `idx_devicecmds_id` is unused across nearly all tenants. `idx_devicecmds_devsn_returnvalue` is used in tenant112/99/126/77/130/131/56 but unused in tenant66/94/124/137.

### Missing Indexes — Sequential Scans on Large Tables (CRITICAL)

| Schema | Table | Seq Scans | Seq Tuples Read | Idx Scans | Live Rows |
|---|---|---|---|---|---|
| tenant112 | DeviceCmds | 24,482,700 | **5.6 trillion** | 370,195 | 125,028 |
| tenant99 | DeviceCmds | 8,977,499 | **1.9 trillion** | 41,310 | 17,300 |
| tenant126 | DeviceCmds | 8,101,897 | 917 billion | 376,441 | 243,782 |
| tenant130 | DeviceCmds | 3,854,779 | 222 billion | 63,153 | 25,038 |
| tenant56 | DeviceCmds | 6,845,582 | 202 billion | 84,868 | 16,607 |
| tenant77 | DeviceCmds | 2,152,187 | 102 billion | 88,493 | 26,675 |
| tenant131 | DeviceCmds | 1,645,539 | 50 billion | 65,241 | 28,450 |

**This is the most critical performance issue.** The ratio of sequential scans to index scans on DeviceCmds is extremely high. For tenant112, there have been 24 million sequential scans reading 5.6 trillion tuples. This indicates:
1. Queries are not using available indexes, OR
2. The queries access data patterns that no current index covers, OR
3. The planner prefers seq scan due to stale statistics or table bloat distorting row estimates

Given the massive bloat, the planner likely sees an inflated table size and opts for sequential scans even when indexes exist.

---

## 6. Slow / Long-Running Queries

**Status: CLEAR.** No long-running queries at time of assessment. All non-idle activity was the monitoring query itself.

**Recommendation:** Enable slow query logging to gain visibility:
```sql
-- Set in RDS parameter group (requires reboot if static parameter):
log_min_duration_statement = 1000  -- log queries > 1 second
```

---

## 7. Lock Contention

**Status: CLEAR.** No blocked queries or lock waits at time of assessment.

---

## 8. Replication Status

**No replication configured.** `pg_stat_replication` returns zero rows.

**Risk:** This is a single-node deployment. AWS RDS Multi-AZ provides synchronous standby for HA/failover at the storage layer, but no read replicas exist for read scaling or disaster recovery testing.

**Recommendation:** If this is a production workload, consider:
- RDS Multi-AZ (if not already enabled — check RDS console)
- A read replica in a different AZ for reporting/analytics queries to offload read pressure

---

## 9. Cache Hit Ratios

| Metric | Value | Target |
|---|---|---|
| Heap (table) cache hit ratio | **90.34%** | >= 95% |
| Index cache hit ratio | **95.78%** | >= 95% |

**Heap cache hit ratio is below target (90.3%).** This means ~10% of table block reads are going to disk, which is significant given the 32 GB database size.

**Current shared_buffers:** 117,211 × 8 kB = **~916 MB**  
**Current effective_cache_size:** 234,423 × 8 kB = **~1.83 GB**

For a 32 GB database, shared_buffers of ~916 MB is very small. The active working set (hot data) for frequently accessed DeviceCmds/RealTimeLogs tables likely doesn't fit in buffer cache, causing repeated disk reads.

**Recommendation:** Increase shared_buffers. On RDS, this is controlled via the `shared_buffers` parameter in the parameter group. AWS RDS `db.r5.large` has ~16 GB RAM; `db.r5.xlarge` has ~32 GB. Typical recommendation is 25% of RAM.

---

## 10. Transaction ID Wraparound

| Database | XID Age | XIDs Until Wraparound |
|---|---|---|
| xid_async_production | 57,971,362 | 2,089,512,286 |

**Status: SAFE.** XID age is ~58 million, with over 2 billion transactions remaining before wraparound. PostgreSQL emits a warning at 1.6 billion and forces shutdown at 2 billion. No immediate risk.

Oldest non-system table XID age: `public.Tenant` at 57,903,791 (matches database age — expected).

Autovacuum freeze parameters:
- `autovacuum_freeze_max_age`: 200,000,000 (standard)
- `vacuum_freeze_table_age`: 150,000,000 (standard)

Autovacuum is correctly handling freeze operations.

---

## 11. Disk Usage / Tablespaces

| Tablespace | Size |
|---|---|
| pg_default | 32 GB |
| pg_global | 1.2 MB |
| rds_temp_tablespace | 0 bytes |

All data in `pg_default`. No custom tablespaces in use. The 32 GB is entirely live + bloat in active tenant schemas.

---

## 12. Schema Overview

**Total schemas:** 59 (excluding pg_catalog and information_schema)

| Type | Count | Notes |
|---|---|---|
| Active tenant schemas | 27 | tenant56 through tenant138, ~42 tables each |
| Backup tenant schemas | 32 | backup_tenant9 through backup_tenant123, ~41 tables each |
| public | 1 | Single `Tenant` table |
| backup_public | 1 | Single table |

The multi-tenant schema-per-tenant design isolates data per tenant. Tenant numbering is non-sequential (tenant9 through tenant138 with gaps), with tenant106 having 47 tables (5 more than standard — likely additional feature tables).

**Standard tables per active tenant (~42 each):** DeviceCmds, RealTimeLogs, TmpBioPhotos, TmpBioDatas, TmpFPs, UserInfo, UserAccessLevels, Profiles, Doors, Groups, GroupRoles, Holidays, Districts, Provinces, OpLogs, ErrorLogs, and ~26 others.

---

## 13. Key Configuration Parameters

| Parameter | Current | Recommended | Note |
|---|---|---|---|
| max_connections | 402 | 100–200 + pgbouncer | High; 13 currently used |
| shared_buffers | ~916 MB | 25% of RAM | Low for 32 GB DB |
| effective_cache_size | ~1.83 GB | 75% of RAM | Used by planner only |
| work_mem | 4 MB | 16–64 MB | Low; causes disk spill |
| maintenance_work_mem | 64 MB | 256–512 MB | Low for VACUUM/index builds |
| random_page_cost | 4 | 1.1 (SSD/EBS) | Too high for SSD storage |
| log_min_duration_statement | -1 (disabled) | 1000 ms | No slow query visibility |
| autovacuum_max_workers | 3 | 5–6 | Low for 27 active schemas |
| autovacuum_vacuum_cost_limit | 200 | 400–800 | Throttled too aggressively |
| effective_io_concurrency | 1 | 100–200 (SSD) | Too low for EBS |

---

## Remediation Log (2026-04-03 15:20–15:36)

### pg_repack executed (online, zero downtime)

| Table | Before | After | Reclaimed |
|---|---|---|---|
| tenant126.DeviceCmds | 9,263 MB | 4,489 MB | **~4.7 GB** |
| tenant112.DeviceCmds | 8,127 MB | 1,759 MB | **~6.2 GB** |
| tenant99.DeviceCmds | 7,885 MB | 345 MB | **~7.4 GB** |
| tenant56.DeviceCmds | 660 MB | 269 MB | **~391 MB** |
| **Database total** | **32 GB** | **14 GB** | **~18 GB** |

**Steps taken:**
1. Installed `pg_repack 1.4.7` extension on RDS (`CREATE EXTENSION pg_repack`)
2. Built matching `pg_repack 1.4.7` client from source (apt only had 1.5.0)
3. Added PRIMARY KEY on `Id` column to DeviceCmds + TmpBioPhotos (required by pg_repack)
4. Ran `pg_repack --no-superuser-check` on 4 DeviceCmds tables — all succeeded
5. Ran `pg_repack` on 4 TmpBioPhotos tables — completed but sizes unchanged (minimal live data, space may be reclaimed by OS later)

**NOT done:** TmpBioPhotos still ~145-175 MB each (~99% bloat). Would require `VACUUM FULL` which locks the table — deferred to scheduled maintenance window.

---

## Alerts Summary

| # | Severity | Alert | Affected Objects |
|---|---|---|---|
| 1 | ~~CRITICAL~~ RESOLVED | DeviceCmds bloat: reclaimed ~18 GB via pg_repack | tenant126/112/99/56 DeviceCmds |
| 2 | CRITICAL | 5.6+ trillion rows from sequential scans on DeviceCmds | tenant112/99/126/130/56/77/131 |
| 3 | HIGH | TmpBioPhotos ~99% bloat (667 MB allocated, ~1 MB live) — pending maintenance window | tenant56/112/126/99 |
| 4 | HIGH | Buffer cache hit ratio 90.3% (below 95% threshold) | All workloads |
| 5 | MEDIUM | 25 unused indexes (~80+ MB wasted, write overhead) | Multiple tenants |
| 6 | MEDIUM | work_mem = 4 MB (too low, causes disk spill on sorts) | All queries |
| 7 | MEDIUM | random_page_cost = 4 (wrong for SSD, planner prefers seq scans) | Query planner |
| 8 | LOW | Slow query logging disabled | Monitoring blind spot |
| 9 | LOW | No read replicas | HA/read scaling gap |

---

## Optimization Recommendations

### Priority 1 — IMMEDIATE (bloat and sequential scans)

#### 1a. VACUUM FULL / pg_repack on bloated DeviceCmds

VACUUM FULL reclaims physical disk space but requires an exclusive lock. Use `pg_repack` for online operation:

```bash
# Install pg_repack extension (if not available):
# On RDS: check if pg_repack is in the available extensions list

# With pg_repack (online, no downtime):
pg_repack -h xid-async-app-api.cklx2wfxabbc.ap-southeast-1.rds.amazonaws.com \
  -U postgres -d xid_async_production \
  --schema tenant126 --table "DeviceCmds"

pg_repack -h xid-async-app-api.cklx2wfxabbc.ap-southeast-1.rds.amazonaws.com \
  -U postgres -d xid_async_production \
  --schema tenant112 --table "DeviceCmds"

pg_repack -h xid-async-app-api.cklx2wfxabbc.ap-southeast-1.rds.amazonaws.com \
  -U postgres -d xid_async_production \
  --schema tenant99 --table "DeviceCmds"
```

Expected space recovery: **~25 GB** reclaimed from these 3 tables alone.

#### 1b. VACUUM FULL on TmpBioPhotos (acceptable downtime window)

These tables are "Tmp" (temporary), implying lower traffic risk:

```sql
-- Run during maintenance window
VACUUM FULL tenant56."TmpBioPhotos";
VACUUM FULL tenant112."TmpBioPhotos";
VACUUM FULL tenant126."TmpBioPhotos";
VACUUM FULL tenant99."TmpBioPhotos";
```

Expected space recovery: **~667 MB** combined.

#### 1c. Fix random_page_cost for SSD

This is the single highest-impact planner fix — currently `random_page_cost = 4` tells the planner that random page access is 4x more expensive than sequential. On AWS EBS SSD, it should be ~1.1:

```sql
-- In RDS parameter group (no restart required for session-level test):
ALTER SYSTEM SET random_page_cost = 1.1;
-- Or set in RDS parameter group: random_page_cost = 1.1
```

This alone may significantly reduce sequential scan counts on DeviceCmds by making the planner favor index scans.

---

### Priority 2 — SHORT TERM (this week)

#### 2a. Increase work_mem

```sql
-- In RDS parameter group:
-- work_mem = 16384  (16 MB — safe default increase)
-- For heavy sort/join workloads, consider 32MB-64MB
-- Test with: SET work_mem = '16MB'; then run typical queries
```

#### 2b. Drop confirmed unused indexes

Verify these indexes are truly unused (stats may have reset after maintenance):

```sql
-- Drop unused idx_devicecmds_id across tenants (check each carefully):
DROP INDEX IF EXISTS tenant99.idx_devicecmds_id;         -- 15 MB
DROP INDEX IF EXISTS tenant66.idx_devicecmds_devsn_returnvalue; -- 14 MB
DROP INDEX IF EXISTS tenant106.idx_devicecmds_id;        -- 4.7 MB
DROP INDEX IF EXISTS tenant66.idx_devicecmds_id;         -- 4.6 MB
DROP INDEX IF EXISTS tenant130.idx_devicecmds_id;        -- 2.0 MB
DROP INDEX IF EXISTS tenant114.idx_devicecmds_id;        -- 2.0 MB
-- Continue for remaining unused indexes

-- Drop unused inoutstatus indexes:
DROP INDEX IF EXISTS tenant112.tenant112_idx_inoutstatus; -- 14 MB
DROP INDEX IF EXISTS tenant99.tenant99_idx_inoutstatus;   -- 10 MB
DROP INDEX IF EXISTS tenant66.tenant66_idx_inoutstatus;   -- 3.8 MB
DROP INDEX IF EXISTS tenant66.tenant66_idx_pin;           -- 3.6 MB
DROP INDEX IF EXISTS tenant66."UserAccessLevels_pkey";    -- 136 kB (verify constraints first)
```

**Note:** Do not drop primary key constraints (`_pkey`) without verifying the table has no foreign key dependencies.

#### 2c. Increase autovacuum workers and reduce throttling

```ini
# In RDS parameter group:
autovacuum_max_workers = 6           # from 3
autovacuum_vacuum_cost_limit = 400   # from 200
autovacuum_vacuum_scale_factor = 0.05  # from 0.1 (vacuum sooner)
autovacuum_analyze_scale_factor = 0.02 # from 0.05 (analyze sooner)
```

With 27 active tenant schemas and high-churn tables (DeviceCmds, RealTimeLogs), 3 autovacuum workers are insufficient to keep up with bloat accumulation.

#### 2d. Enable slow query logging

```ini
# In RDS parameter group:
log_min_duration_statement = 1000    # log queries > 1 second
log_destination = 'csvlog'
logging_collector = on
log_directory = 'pg_log'
```

---

### Priority 3 — MEDIUM TERM (this month)

#### 3a. Increase shared_buffers

Verify instance type in RDS console. If instance has 16+ GB RAM:

```ini
# For db.r5.large (16 GB RAM):
shared_buffers = 4096000  # ~4 GB (25% of 16 GB), in 8kB units: 512000
effective_cache_size = 12288000  # ~12 GB (75% of 16 GB)

# For db.r5.xlarge (32 GB RAM):
shared_buffers = 1048576   # ~8 GB
effective_cache_size = 3145728  # ~24 GB
```

Note: `shared_buffers` changes require a PostgreSQL restart on RDS.

#### 3b. Implement table archival/partitioning strategy for DeviceCmds

The DeviceCmds table is a command queue. Rows with completed/returned commands should be:
1. Archived to a separate table/schema, OR
2. Deleted on a scheduled basis, OR
3. The table should use range partitioning by date so old partitions can be dropped cheaply

```sql
-- Example: create partitioned DeviceCmds (requires application change)
-- Or implement a nightly cleanup job:
DELETE FROM tenant112."DeviceCmds" 
WHERE "ReturnValue" IS NOT NULL 
  AND "CreateTime" < NOW() - INTERVAL '90 days';
-- Follow with VACUUM ANALYZE
```

#### 3c. Increase effective_io_concurrency for SSD

```ini
# In RDS parameter group:
effective_io_concurrency = 100   # from 1, for SSD/EBS
```

#### 3d. Consider read replica for analytics/reporting

If any reporting or analytics queries run against this database, offload them to a read replica to reduce primary load.

---

### Priority 4 — ONGOING

- Schedule monthly review of `pg_stat_user_tables` for bloat accumulation
- Monitor sequential scan ratios after implementing random_page_cost fix
- Test all parameter changes in a staging RDS instance first
- Enable RDS Enhanced Monitoring for CPU, IOPS, and memory metrics
- Set CloudWatch alarms for: FreeStorageSpace < 5 GB, DatabaseConnections > 300, ReadLatency > 20ms

---

## Implementation Checklist

```
[ ] P1: Set random_page_cost = 1.1 in RDS parameter group
[x] P1: pg_repack on DeviceCmds (tenant99/112/126/56) — DONE 2026-04-03, reclaimed ~18 GB
[ ] P1: VACUUM FULL for TmpBioPhotos tables (needs maintenance window — locks table)
[ ] P2: Set work_mem = 16384 in RDS parameter group
[ ] P2: Increase autovacuum_max_workers to 6
[ ] P2: Set autovacuum_vacuum_cost_limit = 400
[ ] P2: Enable log_min_duration_statement = 1000
[ ] P2: Drop confirmed unused indexes (verify each in staging first)
[ ] P3: Review instance RAM and adjust shared_buffers
[ ] P3: Implement DeviceCmds data lifecycle policy (archive/delete old rows)
[ ] P3: Set effective_io_concurrency = 100
[ ] P4: Create CloudWatch alarms for storage and performance metrics
[ ] P4: Evaluate RDS Multi-AZ status and read replica needs
```

---

## Risk Assessment

| Change | Risk | Mitigation |
|---|---|---|
| VACUUM FULL / pg_repack | Medium — exclusive lock (VACUUM FULL) | Use pg_repack; schedule in maintenance window |
| random_page_cost change | Low | Revertible; test with SET in session first |
| shared_buffers change | Medium — requires restart | Plan restart in maintenance window |
| Dropping unused indexes | Medium — may break queries if stats stale | Test each DROP in staging; keep rollback script |
| Autovacuum parameter changes | Low | Parameters apply at next autovacuum cycle |
| work_mem change | Low | Revertible; monitor for memory pressure |

**Rollback for any parameter change:**
```sql
-- For session-level test:
RESET random_page_cost;
RESET work_mem;

-- For RDS parameter group: revert to prior value and apply
```

---

*Report generated: 2026-04-03 | Tool: psql 16.13 → PostgreSQL 14.17 RDS*
