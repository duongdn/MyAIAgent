---
description: Bailey project monitoring — CloudWatch alarms, events, and infrastructure health
---

# Bailey Monitor

Monitor Bailey project infrastructure. Generates `reports/{YYYY-MM-DD}-{HHMM}-bailey-monitor.md`.

## Config

Read `.bailey-config.json` for AWS credentials and settings.

## Setup AWS Access

Before running AWS CLI commands, export credentials from config:

```bash
export AWS_ACCESS_KEY_ID=$(cat .bailey-config.json | python3 -c "import json,sys; print(json.load(sys.stdin)['aws']['access_key_id'])")
export AWS_SECRET_ACCESS_KEY=$(cat .bailey-config.json | python3 -c "import json,sys; print(json.load(sys.stdin)['aws']['secret_access_key'])")
export AWS_DEFAULT_REGION=$(cat .bailey-config.json | python3 -c "import json,sys; print(json.load(sys.stdin)['aws']['region'])")
```

## Subtask 1: CloudWatch Dashboard & Alarms

Check the "Monitor" dashboard in eu-west-3 for any concerning events or alarms.

### Steps

1. **List all alarms** — check for any in ALARM or INSUFFICIENT_DATA state:
   ```bash
   aws cloudwatch describe-alarms --state-value ALARM --region eu-west-3
   aws cloudwatch describe-alarms --state-value INSUFFICIENT_DATA --region eu-west-3
   ```

2. **Get dashboard widgets** — read the Monitor dashboard to understand what metrics are tracked:
   ```bash
   aws cloudwatch get-dashboard --dashboard-name Monitor --region eu-west-3
   ```

3. **Check recent alarm history** (last 14 days / 336 hours matching dashboard lookback):
   ```bash
   aws cloudwatch describe-alarm-history --region eu-west-3 --start-date $(date -u -d '14 days ago' +%Y-%m-%dT%H:%M:%SZ) --end-date $(date -u +%Y-%m-%dT%H:%M:%SZ)
   ```

4. **Check key metrics** from dashboard widgets for anomalies (spikes, drops, flatlines)

### Report Format

```markdown
## CloudWatch — Bailey (eu-west-3)

### Alarms
| Alarm | State | Reason | Since |
|-------|-------|--------|-------|

### Recent Alarm History (14d)
- ...

### Dashboard Metrics Summary
- ...

### Issues / Warnings
- ...
```

## Rules

- Flag any alarm in ALARM state as critical
- INSUFFICIENT_DATA alarms should be flagged as warning
- Compare metric trends — sudden changes in last 24h vs 14d baseline
- If no alarms and metrics look normal, say "All clear" with brief summary
