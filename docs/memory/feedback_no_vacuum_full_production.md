---
name: Never run VACUUM FULL on production without explicit approval
description: VACUUM FULL takes exclusive lock blocking all reads/writes — never run on production DBs without asking user first
type: feedback
---

NEVER run VACUUM FULL on a production database without explicit user approval.

**Why:** VACUUM FULL acquires an ACCESS EXCLUSIVE lock, blocking ALL queries (reads and writes) on the table until complete. On a production database this freezes the application. User was very upset when this was attempted on xid_async_production RDS.

**How to apply:** For production databases, only use online tools like `pg_repack` (which works without blocking). If pg_repack can't handle a table, inform the user and let them decide whether to schedule VACUUM FULL during a maintenance window. Never run destructive/blocking DB operations on production without asking first.
