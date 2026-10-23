---
name: feedback_xid_sync_console_keep_verbose_logs_truncate_syslog
description: xid_sync_console disk high = syslog from xid-webapp EF Core SQL logs; user wants detailed logs kept, just truncate old syslog when big
metadata:
  type: feedback
---

xid_sync_console (Marcel/XID) disk climbs ~1.2-1.5G/day because `xid-webapp` (XID.Sync.API) logs every EF Core SQL at Information level into /var/log/syslog (weekly rotate, syslog.1 uncompressed ~8.5G).

User decision 2026-10-23: "log dự án này cần chi tiết, nhiều quá thì xóa thôi" — do NOT propose lowering log level / changing appsettings.json. 

**How to apply:** When xid_sync_console disk >=70% in server-monitor, the approved fix is `sudo truncate -s 0 /var/log/syslog.1` (2026-10-23: 73% -> 55%). Report it as known cause, not a new mystery. Still confirm before truncating the active /var/log/syslog. See [[feedback_server_safety_consolidated]].
