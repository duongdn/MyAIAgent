---
name: me:mpfc-monitor
description: MyPersonalFootballCoach (MPFC) project monitor — check server health, WordPress errors, MemberMouse activity, cron job health, Slack workspace, New Relic APM, Rollbar errors, Cloudflare traffic/firewall. Use when user asks to monitor MPFC, check the football coach website, review MPFC server status, check memberships or payments, inspect WordPress errors, or review recent Slack/Cloudflare/Rollbar activity for MyPersonalFootballCoach.
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
| `/mpfc-monitor newrelic` | New Relic APM: traffic, errors, attacks, performance (apdex, percentiles, slowest txns, DB) |
| `/mpfc-monitor rollbar` | Rollbar: active errors, occurrences, criticals |
| `/mpfc-monitor cloudflare` | Cloudflare: traffic, threats, firewall, SSL |

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

```python
# Overview: total requests + avg response time
nrql("SELECT count(*), average(duration) FROM Transaction WHERE appName = 'MPFC-live2' SINCE 24 hours ago")

# Percentiles: P50/P75/P90/P95/P99 — key is row['percentile.duration']['50'] etc.
nrql("SELECT percentile(duration, 50, 75, 90, 95, 99) FROM Transaction WHERE appName = 'MPFC-live2' SINCE 24 hours ago")

# Apdex (T=0.5s)
nrql("SELECT apdex(duration, 0.5) FROM Transaction WHERE appName = 'MPFC-live2' SINCE 24 hours ago")
# key: row['apdex.duration']['score']

# Error rate
nrql("SELECT percentage(count(*), WHERE error IS TRUE) AS errRate FROM Transaction WHERE appName = 'MPFC-live2' SINCE 24 hours ago")

# Slowest transactions (exclude attack patterns, sort locally by average.duration DESC)
nrql("SELECT average(duration), max(duration), count(*) FROM Transaction WHERE appName = 'MPFC-live2' AND name NOT LIKE '%waitfor%' AND name NOT LIKE '%DBMS_PIPE%' AND name NOT LIKE '%SELECT%' FACET name SINCE 24 hours ago LIMIT 20")
# Sort result: sorted(res, key=lambda x: x.get('average.duration', 0), reverse=True)

# DB performance (transactions with DB calls)
nrql("SELECT average(databaseCallCount), max(databaseCallCount), average(databaseDuration) FROM Transaction WHERE appName = 'MPFC-live2' AND databaseCallCount > 0 SINCE 24 hours ago")

# Error breakdown by transaction
nrql("SELECT count(*) FROM TransactionError WHERE appName = 'MPFC-live2' FACET transactionName SINCE 24 hours ago LIMIT 10")

# HTTP status codes
nrql("SELECT count(*) FROM Transaction WHERE appName = 'MPFC-live2' FACET numeric(http.statusCode) SINCE 24 hours ago")

# Attack traffic (top transactions — flag xmlrpc, login, waitfor, DBMS_PIPE, SELECT patterns)
nrql("SELECT count(*) FROM Transaction WHERE appName = 'MPFC-live2' FACET name SINCE 24 hours ago LIMIT 10")
```

**Performance thresholds:**

| Metric | OK | WARNING | CRITICAL |
|--------|-----|---------|----------|
| Apdex (T=0.5s) | >0.7 | 0.5–0.7 | <0.5 |
| Error rate | <1% | 1–3% | >3% |
| P95 response | <2s | 2–5s | >5s |
| P99 response | <5s | 5–10s | >10s |
| Avg DB duration | <0.5s | 0.5–1s | >1s |
| Max DB calls/txn | <500 | 500–2000 | >2000 |

**Flag:**
- Any non-attack transaction with avg > 10s (likely N+1 query or external API hang)
- `processOrder.php` avg > 20s (payment processing too slow)
- `sitemap_index.xml` > 30s (regenerating large sitemap)
- Max databaseCallCount > 5000 (N+1 query problem)
- Error rate spike above 3%

**Known issues (pre-existing):**
- `include_once(): Failed opening '/Users/duongdn/...'` — stale dev path in MemberMouse files; 14 processOrder events/day; low impact
- Heartbeat "errors" (~300/day) are HTTP 200 false positives (PHP notices, no real error)
- Attack traffic ~31% of total (xmlrpc brute force + SQL injection timing attacks)
- `sitemap_index.xml` — 2 occurrences at ~48s avg; large sitemap generation, low priority
- `processOrder.php` — avg 16.9s, max 37s, 13/day; MemberMouse payment API latency, monitor for increase
- Max databaseCallCount hit 19,592 in one txn — investigate if recurring

**Apdex baseline:** Current 0.53 (T=0.5s). Affected by attacks inflating slow transaction count. Legitimate traffic apdex likely higher.

**Percentile baseline (24h):** P50=0.95s | P75=1.28s | P90=1.66s | P99=3.06s

## Check 6 — Rollbar (`/mpfc-monitor rollbar`)

**Config:** `config/.rollbar-config.json` (encrypted) — keys: `read_token`, `post_server_token`, `project` (mpfc), `environment` (production)
**Project ID:** 773475 | **Account ID:** 554643

```bash
TOKEN=$(python3 -c "import json; print(json.load(open('config/.rollbar-config.json'))['read_token'])")

# Active items
curl -s "https://api.rollbar.com/api/1/items/?access_token=$TOKEN&status=active&environment=production&order=desc&per_page=20" | python3 -c "
import json,sys,datetime
d=json.load(sys.stdin)
for it in d.get('result',{}).get('items',[]):
    ts=it.get('last_occurrence_timestamp',0)
    last=datetime.datetime.utcfromtimestamp(ts).strftime('%m-%d %H:%M') if ts else '?'
    print(f\"[{it.get('level').upper()}] {it.get('title','?')[:80]} | count={it.get('total_occurrences')} | last={last} UTC\")
"
```

**Flag:** CRITICAL level items, any MemberMouse errors, memory exhaustion, errors with count > 10 in last 7 days.

**Known active issues:**
- `Google_AuthException: invalid_grant` — 758 occurrences, last 05-29. Google OAuth token expired. Needs re-authorization of Google integration in WP admin.
- `MM_Product::findAll()/getPaymentType()` undefined method — MemberMouse version mismatch, 1-2 occurrences/week, low frequency
- Memory exhausted (1GB limit hit) — 9 occurrences on 05-19/20, not recent, monitor if recurs

## Check 7 — Cloudflare (`/mpfc-monitor cloudflare`)

**Config:** `config/.cloudflare-config.json` (encrypted) — keys: `api_token`, `zone_id` (ded47d2c4247118dac024d793372b069), `zone_name` (mypersonalfootballcoach.com)

**Plan:** Pro Website | Nameservers: jillian + yevgen.ns.cloudflare.com | SSL: full | Security level: medium

```python
import json, urllib.request, datetime

with open('config/.cloudflare-config.json') as f:
    cfg = json.load(f)

token = cfg['api_token']
zone_id = cfg['zone_id']

def cf_graphql(query):
    req = urllib.request.Request('https://api.cloudflare.com/client/v4/graphql',
        data=json.dumps({'query': query}).encode(),
        headers={'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'})
    with urllib.request.urlopen(req, timeout=20) as r:
        return json.loads(r.read())

def cf_get(path):
    req = urllib.request.Request(f'https://api.cloudflare.com/client/v4{path}',
        headers={'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'})
    with urllib.request.urlopen(req, timeout=15) as r:
        return json.loads(r.read())
```

**Key queries:**

```python
# Daily traffic (last 2 days) — use httpRequests1dGroups
today = datetime.date.today().isoformat()
yesterday = (datetime.date.today() - datetime.timedelta(days=1)).isoformat()
q = f'{{viewer{{zones(filter:{{zoneTag:"{zone_id}"}}){{httpRequests1dGroups(limit:2,orderBy:[date_DESC],filter:{{date_geq:"{yesterday}",date_leq:"{today}"}}){{dimensions{{date}}sum{{requests cachedRequests threats bytes pageViews}}uniq{{uniques}}}}}}}}}}'

# Firewall events (24h) — MUST keep window strictly < 1d (use 23h span)
now_str = datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
h23_ago = (datetime.datetime.utcnow() - datetime.timedelta(hours=23)).strftime('%Y-%m-%dT%H:%M:%SZ')
q_fw = f'{{viewer{{zones(filter:{{zoneTag:"{zone_id}"}}){{firewallEventsAdaptiveGroups(limit:15,orderBy:[count_DESC],filter:{{datetime_geq:"{h23_ago}",datetime_leq:"{now_str}"}}){{count dimensions{{action ruleId source clientCountryName}}}}}}}}}}'

# SSL cert status
cf_get(f'/zones/{zone_id}/ssl/certificate_packs?per_page=5')

# Zone security settings
cf_get(f'/zones/{zone_id}/settings/security_level')
cf_get(f'/zones/{zone_id}/settings/ssl')
```

**IMPORTANT — time range constraint:** `firewallEventsAdaptiveGroups` on Pro plan cannot span > 1d. Always use a window of 23h or less to avoid quota errors.

**Flag:**
- Threats spike (>>0 in daily summary)
- Firewall block/challenge count unusually high
- SSL cert status != `active`
- Security level changed from `medium`

**Known baseline:**
- 2026-05-29: 218,361 requests, 121,296 cached (55%), 0 threats, ~15.6GB bandwidth, 32,596 pageviews, 10,253 uniques
- 2026-05-30 (partial): 66,442 requests, 45,407 cached (68%), 0 threats so far
- WAF packages: OWASP ModSecurity + CloudFlare + USER
- Firewall events: 0 blocks/challenges recorded (attack traffic hitting origin directly, not blocked at CF edge)

## Full Run

Run all 7 checks in order:
1. Server health
2. WordPress health + cron
3. MemberMouse activity
4. Slack (MyPersonalFootballCoach workspace)
5. New Relic APM
6. Rollbar
7. Cloudflare
8. Write report: `reports/{YYYY-MM-DD}/{HHMM}-mpfc-monitor.md`

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
