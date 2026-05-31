---
description: "UTIL — Read and update monitoring timelines in config/.monitoring-timelines.json"
---

# Util: Monitoring Timeline

## File

`config/.monitoring-timelines.json` — tracks `last_run` per source/scope.

## Read Window Start

```python
import json
from datetime import datetime, timezone

with open("config/.monitoring-timelines.json") as f:
    tl = json.load(f)

# Lookup order for a given source (e.g. refresh.email.carrick):
# 1. tl["refresh"]["email"]["carrick"]["last_run"]
# 2. tl["refresh"]["email"]["last_run"]
# 3. tl["refresh"]["last_run"]
# 4. tl["daily_report"]["last_run"]  ← fallback if global refresh stale (>1 day)
```

## Update After Completing

Always update only the keys relevant to what you ran:

```python
import json
from datetime import datetime, timezone

now_iso = datetime.now(timezone.utc).isoformat()

with open("config/.monitoring-timelines.json") as f:
    tl = json.load(f)

# Single source example:
tl["refresh"]["slack"]["baamboozle"]["last_run"] = now_iso

# Full daily report — update both:
tl["daily_report"]["last_run"] = now_iso
tl["alert"]["last_run"] = now_iso

with open("config/.monitoring-timelines.json", "w") as f:
    json.dump(tl, f, indent=2)
```

## Timeline Keys per Skill

| Skill | Keys to update |
|-------|---------------|
| `daily-report` (full) | `daily_report.last_run` + `alert.last_run` |
| `daily-alert` | `alert.last_run` only — **NEVER touch** `daily_report` |
| `daily-report-refresh` (full) | `refresh.last_run` + all `refresh.{source}.last_run` |
| `daily-report-refresh` (piece) | only that piece's `refresh.{source}[.{account}].last_run` |

## MANDATORY: verify by re-reading

After writing, always read back and confirm the value was saved correctly.
