---
name: Project timezone UTC+7
description: All time references in this project use UTC+7 (Asia/Bangkok) as the reference timezone
type: project
---

All time mentions (schedules, cron times, report timestamps, "morning", "8 AM", etc.) use **UTC+7** (Asia/Bangkok / ICT) as the reference timezone.

**Why:** The team is based in Vietnam (UTC+7). All monitoring windows, scheduled runs, and time-of-day references assume UTC+7 unless explicitly stated otherwise.

**How to apply:**
- When user says "5:00 AM" → interpret as 05:00 UTC+7 = 22:00 UTC
- When converting for cron: subtract 7 hours (e.g. 07:00 UTC+7 = 00:00 UTC → `0 0 * * *`)
- Report timestamps use `+07:00` offset
- "morning run" = ~07:00–09:00 UTC+7
