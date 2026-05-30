---
name: me:mpfc-monitor
description: MyPersonalFootballCoach (MPFC) project monitor — check server health, WordPress errors, MemberMouse activity, cron job health, and Slack workspace. Use when user asks to monitor MPFC, check the football coach website, review MPFC server status, check memberships or payments, inspect WordPress errors, or review recent Slack activity for MyPersonalFootballCoach.
---

# MPFC Monitor

Monitor the MyPersonalFootballCoach WordPress project. Generates `reports/{YYYY-MM-DD}/{HHMM}-mpfc-monitor.md`.

**Project root:** `/var/www/mypersonalfootballcoach.com`
**Staging root:** `/var/www/staging`

## Quick Reference

| Command | What it checks |
|---------|---------------|
| `/mpfc-monitor` | Full run (all checks) |
| `/mpfc-monitor server` | Disk, memory, CPU, processes |
| `/mpfc-monitor wordpress` | WP errors, PHP errors, cron log |
| `/mpfc-monitor members` | MemberMouse recent activity via DB |
| `/mpfc-monitor slack` | MyPersonalFootballCoach Slack workspace |
| `/mpfc-monitor newrelic` | New Relic APM: traffic, errors, attacks |
| `/mpfc-monitor github` | Open GitHub PRs (nuscarrick account) |

## Check 1 — Server Health (`/mpfc-monitor server`)

Run directly on this server (no SSH needed):

```bash
hostname && uptime && free -h && df -h / && nproc && cat /proc/loadavg
echo '=== TOP PROCESSES ==='
ps aux --sort=-%mem | head -8
echo '=== APACHE ==='
systemctl status apache2 --no-pager | head -10
echo '=== MYSQL CONN TEST ==='
wp --path=/var/www/mypersonalfootballcoach.com db check 2>&1 | tail -5
echo '=== SWAP ==='
swapon --show
```

**Thresholds:**

| Metric | OK | WARNING | CRITICAL |
|--------|----|---------|----------|
| Disk | <70% | 70-85% | >85% |
| Memory available | >30% | 15-30% | <15% |
| Load (per core) | <0.7 | 0.7-1.0 | >1.0 |

**Storage >= 75%:** Investigate causes, recommend specific cleanup targets (logs, backups, uploads). Never run cleanup without user confirmation.

## Check 2 — WordPress Health (`/mpfc-monitor wordpress`)

### Error Logs

```bash
# PHP / Apache errors (last 100 lines)
tail -100 /var/log/apache2/error.log 2>/dev/null || tail -100 /var/www/mypersonalfootballcoach.com/wp-content/debug.log 2>/dev/null

# WP debug log
tail -50 /var/www/mypersonalfootballcoach.com/wp-content/debug.log 2>/dev/null
```

### Cron Health

```bash
# Last 20 lines of cron log
tail -20 /var/www/mypersonalfootballcoach.com/cron.log

# Check for failed/stuck cron events via WP CLI
wp --path=/var/www/mypersonalfootballcoach.com cron event list --format=table 2>/dev/null | head -20
```

**Flag:** any PHP Fatal/Error in logs, cron events overdue by >30 min, `mm_resque_jobs_worker` not running.

### Plugin/Queue Health

```bash
# Action Scheduler failed jobs (last 24h)
wp --path=/var/www/mypersonalfootballcoach.com eval "
  global \$wpdb;
  \$count = \$wpdb->get_var(\"SELECT COUNT(*) FROM {$wpdb->prefix}actionscheduler_actions WHERE status='failed' AND scheduled_date_gmt > DATE_SUB(NOW(), INTERVAL 24 HOUR)\");
  echo 'Action Scheduler failed (24h): ' . \$count;
"
```

## Check 3 — MemberMouse Activity (`/mpfc-monitor members`)

Query DigitalOcean MySQL directly via WP CLI (credentials in `wp-config.php`):

```bash
# New members (last 24h)
wp --path=/var/www/mypersonalfootballcoach.com eval "
  global \$wpdb;
  \$rows = \$wpdb->get_results(\"
    SELECT mm.mm_member_id, u.user_email, mm.mm_membership_level, mm.mm_status, mm.mm_subscr_date
    FROM {$wpdb->prefix}user_attributes mm
    JOIN {$wpdb->users} u ON mm.user_id = u.ID
    WHERE mm.mm_subscr_date > DATE_SUB(NOW(), INTERVAL 24 HOUR)
    ORDER BY mm.mm_subscr_date DESC
    LIMIT 20
  \");
  foreach(\$rows as \$r) echo \$r->user_email . ' | ' . \$r->mm_membership_level . ' | ' . \$r->mm_status . ' | ' . \$r->mm_subscr_date . PHP_EOL;
  echo 'Total: ' . count(\$rows);
"

# Cancelled members (last 24h)
wp --path=/var/www/mypersonalfootballcoach.com eval "
  global \$wpdb;
  \$rows = \$wpdb->get_results(\"
    SELECT u.user_email, mm.mm_membership_level, mm.mm_cancel_date
    FROM {$wpdb->prefix}user_attributes mm
    JOIN {$wpdb->users} u ON mm.user_id = u.ID
    WHERE mm.mm_cancel_date > DATE_SUB(NOW(), INTERVAL 24 HOUR)
    ORDER BY mm.mm_cancel_date DESC
    LIMIT 10
  \");
  foreach(\$rows as \$r) echo \$r->user_email . ' | ' . \$r->mm_membership_level . ' | ' . \$r->mm_cancel_date . PHP_EOL;
  echo 'Cancelled: ' . count(\$rows);
"

# Failed payment log (mm_payment_history, last 24h)
wp --path=/var/www/mypersonalfootballcoach.com eval "
  global \$wpdb;
  \$rows = \$wpdb->get_results(\"
    SELECT ph.user_id, u.user_email, ph.transaction_type, ph.payment_amount, ph.transaction_date
    FROM {$wpdb->prefix}mm_payment_history ph
    JOIN {$wpdb->users} u ON ph.user_id = u.ID
    WHERE ph.transaction_type LIKE '%fail%' AND ph.transaction_date > DATE_SUB(NOW(), INTERVAL 24 HOUR)
    ORDER BY ph.transaction_date DESC
    LIMIT 10
  \");
  foreach(\$rows as \$r) echo \$r->user_email . ' | £' . \$r->payment_amount . ' | ' . \$r->transaction_type . ' | ' . \$r->transaction_date . PHP_EOL;
  echo 'Failed payments: ' . count(\$rows);
"
```

**Flag:** any failed payments, sudden spike in cancellations, MemberMouse queue stuck.

## Check 4 — Slack (`/mpfc-monitor slack`)

**Workspace:** MyPersonalFootballCoach (config in `config/.slack-accounts.json`, key: `mpfc`)
**Token type:** xoxp

Fetch recent messages using `search.messages` API with `after:{day_before}` + epoch filter (same as daily-report pattern).

**Look for:** client messages, errors, deployment notifications, unusual activity.

## Check 5 — New Relic APM (`/mpfc-monitor newrelic`)

**Config:** `config/.newrelic-config.json` (encrypted) — keys: `user_api_key`, `account_id` (3457746), `app_name` (MPFC-live2)

Query via NerdGraph (GraphQL). Key: User API key (NRAK prefix), NOT license key.

```python
import json, urllib.request

with open('config/.newrelic-config.json') as f:
    cfg = json.load(f)

def nrql(query):
    body = json.dumps({"query": '{ actor { account(id: %d) { nrql(query: "%s") { results } } } }' % (cfg['account_id'], query.replace('"', '\\"'))})
    req = urllib.request.Request('https://api.newrelic.com/graphql', data=body.encode(),
        headers={'Content-Type': 'application/json', 'API-Key': cfg['user_api_key']}, method='POST')
    with urllib.request.urlopen(req, timeout=15) as r:
        resp = json.loads(r.read())
    return (((resp.get('data') or {}).get('actor') or {}).get('account') or {}).get('nrql', {}).get('results') or []
```

**Key queries:**
- Overview: `SELECT count(*), average(duration) FROM Transaction WHERE appName = 'MPFC-live2' SINCE 24 hours ago`
- P95: key is `row['percentile.duration']['95']` (NOT `percentile(duration,95)`)
- Errors: `SELECT count(*) FROM TransactionError WHERE appName = 'MPFC-live2' FACET transactionName SINCE 24 hours ago LIMIT 10`
- HTTP codes: `SELECT count(*) FROM Transaction WHERE appName = 'MPFC-live2' FACET numeric(http.statusCode) SINCE 24 hours ago`
- Attack traffic: `SELECT count(*) FROM Transaction WHERE appName = 'MPFC-live2' FACET name SINCE 24 hours ago LIMIT 10` — flag xmlrpc, login, waitfor, DBMS_PIPE patterns

**Known issues (pre-existing):**
- `include_once(): Failed opening '/Users/duongdn/...'` — stale dev path in MemberMouse files; 14 processOrder events/day; low impact
- Heartbeat "errors" (475/day) are HTTP 200 false positives (PHP notices, no real error)
- Attack traffic ~31% of total (xmlrpc brute force + SQL injection timing attacks)

**Apdex target:** 0.85. Current: 0.712 (affected by attacks).

## Check 6 — GitHub (`/mpfc-monitor github`)

```bash
# Check open PRs (nuscarrick default account)
gh pr list --repo nustechnology/mypersonalfootballcoach 2>/dev/null || \
gh pr list --repo mpfc/mypersonalfootballcoach 2>/dev/null || \
echo "No repo found or no access"
```

## Full Run

Run all 6 checks in order:
1. Server health
2. WordPress health + cron
3. MemberMouse activity
4. Slack
5. New Relic APM
6. GitHub
7. Write report: `reports/{YYYY-MM-DD}/{HHMM}-mpfc-monitor.md`

## Report Format

```
## MPFC Monitor — {YYYY-MM-DD} {HH:MM} (+07:00)

### Server
| Metric | Value | Status |
...

### WordPress
- Errors: ...
- Cron: ...

### MemberMouse
| Type | Count | Details |
| New members | X | ... |
| Cancellations | X | ... |
| Failed payments | X | ... |

### Slack
...

### GitHub
...

### Summary
✅ No issues / ⚠️ {N} warnings / 🔴 {N} critical
```

## Key Rules

- Storage >= 75%: investigate causes + recommend cleanup — NEVER auto-cleanup without confirmation
- Failed payment = always flag, include email + amount
- PHP Fatal errors = CRITICAL, always surface
- Cron event overdue > 30 min = WARNING
- Use `wp --path=/var/www/mypersonalfootballcoach.com` prefix for all WP CLI commands on live
- DB credentials in `/var/www/mypersonalfootballcoach.com/wp-config.php` — never hardcode, use WP CLI

## Security

Handles MPFC internal server data only. Never expose DB passwords, user emails beyond report scope, or MemberMouse member PII beyond what's needed for the alert summary.
