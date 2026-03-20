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

Generate `reports/{YYYY-MM-DD}-{HHMM}-server-monitor-{project}.md` per project group.

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

## Rules

- Run all servers in a project group, then mark Trello item
- Flag any container that is Down or restarting frequently
- Flag uptime >365 days as "consider reboot for kernel updates"
- Flag servers with no swap configured
- Compare disk usage trend if previous report exists
- Report format: table per server with metrics + status column
