---
name: feedback-server-safety-consolidated
description: "Server/DB safety: never cleanup or VACUUM FULL on any server without explicit confirmation; storage alerts at 75% must explain WHY with a breakdown, not just say high"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9ba04ead-670b-45ea-b6a0-575e6d6d55b2
---

**Never run destructive ops without confirmation:** When storage is high, only investigate and report — do NOT run cleanup (apt autoremove, rm -rf, journalctl --vacuum, npm cache clean) or **VACUUM FULL** on any server (prod or dev) without explicit user approval. VACUUM FULL takes an ACCESS EXCLUSIVE lock blocking ALL reads/writes until done — running it on production (xid_async_production RDS) without asking upset the user badly. For production DB bloat, use `pg_repack` (non-blocking); if it can't handle a table, ask the user before scheduling a maintenance-window VACUUM FULL.

**Storage alerts must explain WHY, threshold=75%:** Don't just report "disk X% WARNING" — SSH in, check top consumers (`du -sh` on /usr /var /home /snap, `journalctl --disk-usage`), and include a breakdown table + recommended cleanup commands. 75% is the trigger (not 80/85%), applies to ALL servers in the report. Then WAIT for explicit "yes/go ahead/run it" before executing any cleanup.
