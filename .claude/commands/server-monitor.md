---
description: Server resource monitoring — check all managed servers and update Trello checklist
---

# Server Monitor

Check server resources for all managed projects. After each server group check, mark the corresponding item complete on the "Check server status" Trello card.

## Trello Integration

- Config: `.trello-config.json` (api_key, token)
- Board: `O83pAyqb` (My Task)
- Card: Find by name "Check server status" (recurring card, find by name not hardcoded ID)
- After checking each project's servers, mark its checklist item as complete via:
  ```
  PUT /1/cards/{cardId}/checkItem/{itemId}?key={key}&token={token}
  Body: {"state":"complete"}
  ```

## Report

Generate single combined report: `reports/{YYYY-MM-DD}-{HHMM}-server-monitor.md`

---

## Bailey

### 1. Siteground (Prestashop)

```bash
node scripts/siteground-storage.js
```
If `session_expired`, run with `--login` flag for manual re-auth.

**Check**: SSD usage %, CPU, RAM, plan expiry

### 2. Console (ssh speedventory)

```bash
ssh -o ConnectTimeout=10 speedventory "
hostname && uptime && free -h && df -h / && nproc && cat /proc/loadavg
echo '=== DOCKER ==='
docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'
echo '=== TOP ==='
ps aux --sort=-%mem | head -8
echo '=== SWAP ==='
swapon --show
"
```

**Check**: disk %, memory, swap, load, docker container status

### 3. Redis (via Docker on Console)

```bash
ssh -o ConnectTimeout=10 speedventory "
docker exec wms-nov_redis_1 redis-cli info memory | head -20
echo '==='
docker exec wms-nov_redis_1 redis-cli info keyspace
echo '==='
docker exec wms-nov_redis_1 redis-cli dbsize
"
```

**Check**: memory usage, key count, peak memory ratio

### 4. Staging (ssh staging.console.speedventory)

```bash
ssh -o ConnectTimeout=10 staging.console.speedventory "
hostname && uptime && free -h && df -h / && nproc && cat /proc/loadavg
echo '=== DOCKER ==='
docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'
echo '=== TOP ==='
ps aux --sort=-%mem | head -8
echo '=== SWAP ==='
swapon --show
"
```

**Check**: disk %, memory, swap, load, docker container status

### Bailey Trello Checklist Item
Mark "Bailey" complete after all 4 sub-checks done.

---

## Thresholds

| Metric | OK | WARNING | CRITICAL |
|--------|----|---------|----------|
| Disk | <70% | 70-85% | >85% |
| Memory available | >30% | 15-30% | <15% |
| Swap used | <10% | 10-30% | >30% |
| Load avg (per core) | <0.7 | 0.7-1.0 | >1.0 |
| Redis memory | <50% of system | 50-75% | >75% |

## Elena — WordPress SamGuard

### 1. SamGuard (ssh samguard.co)

```bash
ssh -o ConnectTimeout=10 samguard.co "
hostname && uptime && free -h && df -h / && nproc && cat /proc/loadavg
echo '=== TOP ==='
ps aux --sort=-%mem | head -8
echo '=== SWAP ==='
swapon --show
"
```

**Check**: disk %, memory, swap, load, MySQL + Apache process health

### Elena Trello Checklist Item
Mark "Elena - WordPress SamGuard" complete after check done.

---

## Neural Contract — Contract Probe

### 1. Staging (ssh nc_staging)

```bash
ssh -o ConnectTimeout=10 nc_staging "
hostname && uptime && free -h && df -h / && nproc && cat /proc/loadavg
echo '=== TOP ==='
ps aux --sort=-%mem | head -8
echo '=== SWAP ==='
swapon --show 2>/dev/null || echo 'No swap'
"
```

**Check**: disk %, memory, swap (flag if none), load, PHP-FPM + MySQL health

### Neural Contract Trello Checklist Item
Mark "Neural Contract - Contract Probe" complete after check done.

---

## Fountain

### 1. Staging (ssh staging.fountaingifts.com)

```bash
ssh -o ConnectTimeout=10 staging.fountaingifts.com "
hostname && uptime && free -h && df -h / && nproc && cat /proc/loadavg
echo '=== TOP ==='
ps aux --sort=-%mem | head -8
echo '=== SWAP ==='
swapon --show
"
```

### 2. Production (ssh fountaingifts.com)

```bash
ssh -o ConnectTimeout=10 fountaingifts.com "
hostname && uptime && free -h && df -h / && nproc && cat /proc/loadavg
echo '=== TOP ==='
ps aux --sort=-%mem | head -8
echo '=== SWAP ==='
swapon --show
"
```

**Check**: disk %, memory, swap, load, Puma + Sidekiq + Next.js process health

### Fountain Trello Checklist Item
Mark "Fountain" complete after both servers checked.

---

## Marcel (XID)

### SSH Hosts (from ~/.ssh/config, prefix `xid`)

**Production**: xid_sync_console, xid_app_backend, xid_saas_backend, xidsg.com, xid_app_frontend, xid_saas_frontend, xid.stlodge
**Dev/Staging**: xid_app_backend.dev, xid_sync_console.dev, xid_sass_backend.dev, xid_sass_frontend.dev, xid_app_frontend.dev, xid_saas_backend.dev

```bash
for host in xid_sync_console xid_app_backend xid_saas_backend xidsg.com xid_app_frontend xid_saas_frontend xid.stlodge xid_app_backend.dev xid_sync_console.dev xid_sass_backend.dev xid_sass_frontend.dev xid_app_frontend.dev xid_saas_backend.dev; do
  echo "========== $host =========="
  ssh -o ConnectTimeout=5 -o BatchMode=yes "$host" "hostname; uptime; free -h | grep -E 'Mem|Swap'; df -h / | tail -1; nproc" 2>&1 || echo "CONNECTION FAILED"
done
```

**Check**: connectivity, disk %, memory, swap, load. Report unreachable servers.

### Marcel Trello Checklist Item
Mark "Marcel" complete after all reachable servers checked.

---

## Rory (cPanel shared hosting — GoDaddy)

### 1. Server (ssh rory.cpanel)

SSH key `~/.ssh/rory/id_rsa` requires passphrase (see comment above Host entry in ~/.ssh/config). Decrypt key before connecting:
```bash
cp ~/.ssh/rory/id_rsa /tmp/rory_key && chmod 600 /tmp/rory_key
ssh-keygen -p -P "{passphrase}" -N "" -f /tmp/rory_key
```

Then check:
```bash
ssh -o ConnectTimeout=10 -i /tmp/rory_key bql6w65kif0q@92.205.13.202 "
echo '=== HOME ==='
du -sh ~
echo '=== FILE COUNT ==='
find ~ -type f 2>/dev/null | wc -l
echo '=== TOP DIRS ==='
du -sh ~/*/ 2>/dev/null | sort -rh | head -15
echo '=== LARGE FILES ==='
find ~ -maxdepth 3 -type f -size +50M 2>/dev/null
echo '=== ERROR LOGS ==='
du -sh ~/public_html/*/error_log* 2>/dev/null | sort -rh
echo '=== ZIP BACKUPS ==='
du -sh ~/public_html/*.zip 2>/dev/null | sort -rh
"
rm -f /tmp/rory_key
```

**Check**: disk vs 50 GB limit, file count vs 250,000 limit, deletable backups/logs
Note: `df -h` is useless on shared hosting. Use `du -sh ~` for disk, `find ~ -type f | wc -l` for file count.

### Rory Trello Checklist Item
Mark "Rory" complete after check done.

---

## Rules

- Run all servers in a project group, then mark Trello item
- Flag any container that is Down or restarting frequently
- Flag uptime >365 days as "consider reboot for kernel updates"
- Flag servers with no swap configured
- Compare disk usage trend if previous report exists
- Report format: table per server with metrics + status column
