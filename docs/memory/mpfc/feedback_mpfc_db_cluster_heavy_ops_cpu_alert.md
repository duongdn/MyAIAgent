---
name: feedback_mpfc_db_cluster_heavy_ops_cpu_alert
description: MPFC managed MySQL is tiny (1vCPU/1GB) and shared with live — mysqldump|import of wp_mpfc pushed CPU to 95% and fired DO alert to the customer-side monitor
metadata:
  type: feedback
---
2026-10-14: copying wp_mpfc → wp_mpfc_upgrade on the SAME cluster (mysqldump | mysql, ~40 min, stuck on mm_notifications 2GB) drove cluster CPU 94.78% > 90% for 5m → DO alert reached the user ("what are you doing ???"). Killed it.

**Why:** cluster db-mysql-lon1-14783 is db-s-1vcpu-1gb serving live WP + replica + apache_logs inserts; dump+import on the same node doubles load.
**How to apply:** never run bulk dump/import/ALTER against this cluster during business hours without asking + throttling. Prefer dumping from the read replica (db-ro-mysql-lon1-25682) to a file, importing elsewhere (test droplet local MySQL or a separate small cluster), or skip huge log tables (mm_notifications, mm_app_usage_logs, mm_app_log_events) with --ignore-table / --where. Monitor CPU and stop at first alert. Related: [[reference_mpfc_digitalocean_token_and_infra]]
