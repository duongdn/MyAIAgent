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

## Subtask 2: AWS Health & Event Log

Check for scheduled events, maintenance, and health issues across eu-west-2 and eu-west-3.

Note: AWS Health API (aws health describe-events) requires Business/Enterprise Support. Use service-level APIs instead.

### Steps

1. **EC2 scheduled events** (both regions):
   ```bash
   aws ec2 describe-instance-status --include-all-instances --region eu-west-3 --query 'InstanceStatuses[?Events]'
   aws ec2 describe-instance-status --include-all-instances --region eu-west-2 --query 'InstanceStatuses[?Events]'
   ```

2. **EC2 instance inventory**:
   ```bash
   aws ec2 describe-instances --region eu-west-3 --query 'Reservations[].Instances[].[InstanceId,State.Name,Tags[?Key==`Name`].Value|[0]]' --output table
   ```

3. **RDS events** (14 days):
   ```bash
   aws rds describe-events --duration 20160 --region eu-west-3
   aws rds describe-events --duration 20160 --region eu-west-2
   ```

4. **RDS pending maintenance**:
   ```bash
   aws rds describe-pending-maintenance-actions --region eu-west-3
   aws rds describe-pending-maintenance-actions --region eu-west-2
   ```

### Report Format

For each pending maintenance action, explain:
- **Effect**: What the update does, potential downtime
- **Recommendation**: Urgency, when to schedule
- **Action needed?**: Yes/No with reasoning

## Subtask 3: Billing Review

Compare current month vs last month. Flag anomalies.

### Steps

1. **Current month by service**:
   ```bash
   aws ce get-cost-and-usage --time-period Start=YYYY-MM-01,End=YYYY-MM-DD --granularity MONTHLY --metrics BlendedCost --group-by Type=DIMENSION,Key=SERVICE --region us-east-1
   ```

2. **Last month by service** (for comparison):
   ```bash
   aws ce get-cost-and-usage --time-period Start=YYYY-MM-01,End=YYYY-MM-01 --granularity MONTHLY --metrics BlendedCost --group-by Type=DIMENSION,Key=SERVICE --region us-east-1
   ```

3. **Daily breakdown** (spot spikes):
   ```bash
   aws ce get-cost-and-usage --time-period Start=YYYY-MM-01,End=YYYY-MM-DD --granularity DAILY --metrics BlendedCost --region us-east-1
   ```

4. **If any service has >50% increase**, drill into usage type:
   ```bash
   aws ce get-cost-and-usage --time-period ... --group-by Type=DIMENSION,Key=USAGE_TYPE --filter '{"Dimensions":{"Key":"SERVICE","Values":["<service>"]}}'
   ```

### Report Format

- Monthly comparison table with projected full-month cost
- Daily trend highlighting any spikes
- For each anomaly: root cause analysis, action needed assessment
- Tax on 1st of month is normal accrual, not a spike

## Rules

- Flag any alarm in ALARM state as critical
- INSUFFICIENT_DATA alarms should be flagged as warning
- Compare metric trends — sudden changes in last 24h vs 14d baseline
- If no alarms and metrics look normal, say "All clear" with brief summary
- For pending maintenance: explain effect in plain language, evaluate urgency
- Check both eu-west-2 and eu-west-3 regions
- Billing: project current month to full 31 days for fair comparison
- Tax accrual on 1st of month is normal, do not flag as anomaly
- Flag service cost changes >50% for investigation
