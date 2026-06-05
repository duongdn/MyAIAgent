---
description: Bailey project monitoring — CloudWatch alarms, events, and infrastructure health
---

## Utils

| Util | When | Params |
|------|------|--------|
| `/util:read-memory` | First — before anything | — |
| `/util:report` | Write output | `reports/{YYYY-MM-DD}/{HHMM}-bailey-monitor.md` |
| `/util:tasklog-write` | Subtask 9: log monitoring task | sheet `1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg`; task `Weekly Monitor {Month} {Year}`; owner `DuongDN`; hours `1` |
| Trello API | Subtask 10: complete checklist | card `6a221fe400d53ea9a87d45e5`; create checklist named DD/MM/YYYY; mark all 9 subtasks complete |

---

# Bailey Monitor

Monitor Bailey project infrastructure. Generates `reports/{YYYY-MM-DD}/{HHMM}-bailey-monitor.md`.

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

## Subtask 4: RDS Monitoring (speedventory)

Deep check on the speedventory PostgreSQL instance.

### Steps

1. **Instance details**:
   ```bash
   aws rds describe-db-instances --db-instance-identifier speedventory --region eu-west-3
   ```
   Check: MultiAZ, PubliclyAccessible, AutoMinorVersionUpgrade, storage, cert expiry, pending modifications.

2. **Key metrics** (last 1h current + 24h baseline):
   - CPUUtilization, FreeableMemory, FreeStorageSpace, DatabaseConnections
   - ReadIOPS, WriteIOPS, ReadLatency, WriteLatency
   - SwapUsage, NetworkReceiveThroughput, NetworkTransmitThroughput, DiskQueueDepth

3. **Flag**: CPU spikes, memory pressure, latency spikes, storage filling up, public accessibility

### Report Format

- Instance config table with assessments
- Metrics table: current vs avg24h vs max24h
- Issues found with severity
- Recommendations prioritized

## Subtask 5: New Relic APM — Console LIVE

Query New Relic NerdGraph API for application performance data.

### Setup

Read `.bailey-config.json` for `newrelic.user_api_key`, `newrelic.account_id`, `newrelic.entity_guid`.

API endpoint: `https://api.newrelic.com/graphql`
Header: `API-Key: {user_api_key}`

### Steps

1. **Top transactions by DB time** (find heavy queries):
   ```
   SELECT average(databaseDuration), max(databaseDuration), average(duration), count(*)
   FROM Transaction SINCE 24 hours ago FACET name LIMIT 20
   ```

2. **Slow DB transactions** (>1s database time):
   ```
   SELECT average(databaseDuration), max(databaseDuration), count(*)
   FROM Transaction WHERE databaseDuration > 1 SINCE 24 hours ago FACET name LIMIT 10
   ```

3. **Hourly error rate + throughput**:
   ```
   SELECT count(*), average(duration), percentage(count(*), WHERE error IS true) as errorRate
   FROM Transaction SINCE 24 hours ago TIMESERIES 1 hour
   ```

4. **Errors by class**:
   ```
   SELECT count(*), latest(error.message) FROM TransactionError
   SINCE 24 hours ago FACET error.class LIMIT 10
   ```

5. **Slow DB queries from spans**:
   ```
   SELECT average(duration), max(duration), count(*)
   FROM Span WHERE category = 'datastore' AND db.statement IS NOT NULL
   SINCE 24 hours ago FACET db.statement LIMIT 10
   ```

### Report Format

- Sidekiq jobs table with DB time, frequency, trend
- Error breakdown with count and impact
- Hourly error rate timeline highlighting spikes
- Top DB queries by call volume
- Recommendations prioritized by impact

## Subtask 6: Mailgun — mail.paturevision.fr

Check email delivery health.

### Setup

Read `.bailey-config.json` for `mailgun.api_key`, `mailgun.domain`, `mailgun.region`.
API: `https://api.mailgun.net/v3/{domain}` (US) or `https://api.eu.mailgun.net/v3/{domain}` (EU)
Auth: `--user 'api:{api_key}'`

### Steps

1. **14-day delivery stats**:
   ```bash
   curl -s --user 'api:{key}' '{base}/stats/total?event=accepted&event=delivered&event=failed&event=opened&event=clicked&event=complained&duration=14d&resolution=day'
   ```

2. **Failed events (24h)**:
   ```bash
   curl -s --user 'api:{key}' '{base}/events?begin={24h_ago_epoch}&event=failed&limit=50'
   ```

3. **Bounces and complaints** (if API key has permission):
   ```bash
   curl -s --user 'api:{key}' '{base}/bounces?limit=20'
   curl -s --user 'api:{key}' '{base}/complaints?limit=20'
   ```

### Report Format

- Daily delivery table (sent, delivered, failed, rate)
- Failed events grouped by recipient and reason
- Flag: IP reputation issues, permanent bounces still being sent to, 0% engagement

## Subtask 7: Siteground Statistics (Browser)

Fetch storage/CPU/RAM stats from Siteground dashboard via Puppeteer.

### Steps

1. **Run scraper** (headless, uses saved browser profile):
   ```bash
   node scripts/siteground-storage.js
   ```
   If returns `session_expired`, run with `--login` flag (opens visible browser for manual re-auth).

2. **Also check disk details via SSH**:
   ```bash
   ssh -o ConnectTimeout=10 Bailey.cpanel 'cd ~/www && du -sh */ 2>/dev/null | sort -rh && echo "===" && du -sh *.zip 2>/dev/null | sort -rh && echo "===" && du -sh . 2>/dev/null'
   ```

### Report Format

- SSD usage: total, used, free, breakdown (site vs system)
- CPU and Memory from dashboard
- Top directories by size (from SSH)
- Flag large zip/backup files that can be cleaned
- Flag if storage >80% used

## Subtask 8: Post to Slack #maintenance

After all subtasks complete, post a condensed status summary to the GLOBAL GRAZING SERVICES Slack `#maintenance` channel (ID: `C0338NXK3SB`).

### Setup

Read `.slack-accounts.json`, find "GLOBAL GRAZING SERVICES" workspace token.

### Steps

Post message via Slack API:
```bash
curl -s -X POST "https://slack.com/api/chat.postMessage" \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"channel":"C0338NXK3SB","text":"{message}","mrkdwn":true}'
```

### Message Format

Use this exact Slack mrkdwn format with bullet hierarchy (`•` → `◦` → `▪︎`):

```
DD/MM/YYYY

• Performance status: OK | WARNING | CRITICAL

• Resource status:
    ◦  Storage:
        ▪︎ Prestashop: OK | WARNING (xx%) | ~*NOT OK* (xx%)~
        ▪︎ Console: OK | WARNING (xx%) | NOT OK (xx%)
    ◦ Swap: OK | WARNING
    ◦ Memory: OK | WARNING

• DB backup status: OK | FAILED
• S3 backup: OK | WARNING
• AWS backup status: OK | WARNING

• Billing: OK | OK ($xx.xx MTD) | WARNING ($xx anomaly)

• Mailgun: OK *(xx.x%)*

• Run recalculate stock: OK | Done
• Check AWS noti: OK | WARNING
• AWS Cloudtrail: OK | WARNING
• AWS RDS: OK | WARNING

• SSL:
    ◦ Console: {full date from openssl}
    ◦ Prestashop: {full date from openssl}
```

### SSL Check

Check cert expiry dates:
```bash
echo | openssl s_client -servername console.paturevision.fr -connect console.paturevision.fr:443 2>/dev/null | openssl x509 -noout -enddate
echo | openssl s_client -servername paturevision.fr -connect paturevision.fr:443 2>/dev/null | openssl x509 -noout -enddate
```

### Status Rules

- **OK**: metric within normal range
- **WARNING**: metric approaching threshold (storage >70%, delivery <99%, billing anomaly <50%)
- **NOT OK / CRITICAL**: metric exceeded threshold (storage >85%, delivery <95%, alarm in ALARM state)
- Storage %: from Siteground dashboard data
- Mailgun %: delivery rate from stats
- SSL dates: flag if expiring within 30 days

### ⚠️ Customer-Facing Message Rules (MANDATORY)

This Slack channel is customer-visible. **NEVER expose internal details:**
- ❌ No internal errors: "session expired", "script failed", "N/A (token invalid)"
- ❌ No security config details: "PubliclyAccessible=True", "MultiAZ=False"
- ❌ No error counts or stack traces: "86x Redis::TimeoutError", "connection refused"
- ❌ No tool/auth failures: "Siteground session expired — needs re-auth"

**How to handle unavailable data:**
- Siteground session expired → write `OK` (no alarms = safe default), omit the detail
- RDS security config issues → note in local report only, write `OK` in Slack
- Internal errors → mention in local report, write clean status in Slack

The Slack message should only contain: status labels (OK/WARNING/NOT OK) + delivery %, billing amount, SSL dates.

## Subtask 9: Fill Task Log (Google Sheets)

After posting to Slack, log the monitoring task in the Paturevision task log spreadsheet.

### Setup

- Spreadsheet ID: `1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg`
- Service account key: `daily-agent-490610-7eb7985b33e3.json`
- Sheet: `W{N}` — find by iterating sheets, read row 4 col A (Monday date), check if today falls within that Mon–Sun range

### Steps

1. **Find correct week sheet**: Check W-sheets, read each row 4 col A (e.g. `Mon, 16/03/26`), find the one whose week contains today.

2. **Find today's date row**: Search column A for today (e.g. `Fri, 20/03/26` — use current day-of-week and DD/MM/YY format).

3. **Find first empty row** after today's date row (col A = `Task dự án` and cols C–J empty).

4. **Write task entry** with columns:
   | Col | Value |
   |-----|-------|
   | A | Task dự án |
   | E | Weekly Monitor {current month name} {current year} (e.g. `Weekly Monitor Mar 2026`) |
   | G | DuongDN |
   | H | 1 |
   | J | 1 |

5. **Use Google Sheets API**:
   ```
   PUT /v4/spreadsheets/{id}/values/{sheet}!A{row}:J{row}?valueInputOption=USER_ENTERED
   Body: {"values": [["Task dự án", "", "", "", "Weekly Monitor Mar 2026", "", "DuongDN", "1", "", "1"]]}
   ```

### Reference

See W18 row 70 for example format.

## Subtask 10: Complete Trello Checklist

After all subtasks complete, mark the "Bailey monitor" Trello card checklist for today's run.

### Setup

- Card ID: `6a221fe400d53ea9a87d45e5` (card name: "Bailey monitor", board: O83pAyqb)
- API key + token: from `.trello-config.json`

### Steps

1. **Create a new checklist** on the card named `DD/MM/YYYY` (today's date):
   ```
   POST /1/checklists?idCard={card_id}&name={date}
   ```

2. **Add all 9 subtask items** and mark each as `complete`:
   - CloudWatch Alarms & Dashboard
   - AWS Health & EC2 Events
   - Billing Review
   - RDS Monitoring (speedventory)
   - New Relic APM
   - Mailgun Delivery Stats
   - Siteground Storage
   - Post to Slack #maintenance (GGS)
   - Fill Task Log (Google Sheets)

   ```
   POST /1/checklists/{cl_id}/checkItems?name={item}&checked=false
   PUT  /1/cards/{card_id}/checkItem/{item_id}?state=complete
   ```

3. If a subtask couldn't be completed (e.g. Siteground session expired), mark that item `incomplete` and note the reason in the local report only.

---

## Rules

- Flag any alarm in ALARM state as critical
- INSUFFICIENT_DATA alarms should be flagged as warning
- Compare metric trends — sudden changes in last 24h vs 14d baseline
- If no alarms and metrics look normal, say "All clear" with brief summary
- For pending maintenance: explain effect in plain language, evaluate urgency
- Check both eu-west-2 and eu-west-3 regions
- Billing: show actual current cost, not projections. Flag services exceeding last month's total
- Tax accrual on 1st of month is normal, do not flag as anomaly
- Flag service cost changes >50% for investigation
- RDS: flag PubliclyAccessible=true, MultiAZ=false, disabled auto-upgrade, cert expiring within 6 months
