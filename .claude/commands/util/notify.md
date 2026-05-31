---
description: "UTIL — Send desktop notifications via scripts/desktop-notify.js"
---

# Util: Desktop Notify

## Usage

```bash
node scripts/desktop-notify.js --title "{title}" --body "{body}" --urgency {level}
```

## Urgency Levels

| Level | When to use |
|-------|-------------|
| `critical` | CRITICAL or HIGH alerts — production down, auth failure, developer absent |
| `normal` | MEDIUM findings — customer comment, stuck card |
| `low` | All-clear confirmation, informational |

## Standard Patterns

```bash
# CRITICAL/HIGH alert found
node scripts/desktop-notify.js \
  --title "ALERT: {source}" \
  --body "{one-line summary}" \
  --urgency critical

# No alerts (all-clear)
node scripts/desktop-notify.js \
  --title "Alert Scan OK" \
  --body "No high-severity alerts ({N} sources checked)" \
  --urgency low
```

## Severity → Notification mapping

| Severity | Notify? | Urgency |
|----------|---------|---------|
| CRITICAL | YES | critical |
| HIGH | YES | critical |
| MEDIUM | NO | — (report only) |
| LOW | NO | — (report only) |
