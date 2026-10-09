# MPFC Monitor — 2026-05-30 01:37 (+07:00)

---

## Server

| Metric | Value | Status |
|--------|-------|--------|
| Host | mpfc-live | — |
| Uptime | 598 days, 17h | ⚠️ Consider reboot for kernel updates |
| Disk (/) | 38G / 155G — **25%** | ✅ OK |
| Memory | 1.4G used / 7.8G — **5.9G available** | ✅ OK |
| Swap | 110M / 8G used | ✅ OK |
| Load avg (4 cores) | 0.27 / 0.36 / 0.36 | ✅ OK (0.07/core) |
| Apache | Active (running since 2026-04-09) | ✅ OK |

**Top memory processes:**
- `claude` process: 5.6% MEM (461 MB) — current session
- 4× apache2 workers: ~2.4% each (~200 MB each) — normal
- `resque` worker: 2.4% — MemberMouse job queue, running ✅

---

## WordPress

### Cron
✅ All events executing normally:
- `mm_resque_jobs_worker` ✅ running
- `action_scheduler_run_queue` ✅
- `check_missing_user_courses_hook` ✅
- `mm_local_billing` ✅
- `process_unqueued_custom_jobs_hook` ✅

Warnings in cron.log (non-blocking):
- `Module 'newrelic' already loaded` — harmless PHP warning from WP CLI, can be suppressed
- `Undefined index: HTTP_HOST` — WP CLI runs without HTTP context, expected noise

### Apache Error Log
✅ No errors in last 200 lines.

### WP Debug Log
| Error | Severity | Notes |
|-------|----------|-------|
| `Undefined index: HTTP_HOST` in wp-config.php:159 | Notice | WP CLI context noise — not a site error |
| `filesize(): stat failed for lib_videos_preview/1602225437-1024x354.jpeg` | Warning | Missing thumbnail file in `wp-content/uploads/lib_videos_preview/` — pre-existing issue |
| `Rollbar: Initial stack trace captured` (many) | — | Rollbar tracking normal page loads, not errors |

⚠️ **Missing thumbnail:** `wp-content/uploads/lib_videos_preview/1602225437-1024x354.jpeg` — file missing. Rollbar captures this on every SEO plugin scan. Low priority but generates noise.

### Action Scheduler
✅ Failed jobs (24h): **0**

---

## MemberMouse

| Type | Count (24h) |
|------|-------------|
| New members | 0 |
| Cancellations | 0 |
| Failed payments | 0 |

✅ No MemberMouse events in last 24h. Quiet period.

---

## Slack — MyPersonalFootballCoach

Token: ✅ valid (`freelancer` / T03FC1Z9T51)
Messages (last 7 days): **0**

✅ No Slack activity in the last 7 days. Workspace is quiet.

---

## GitHub

⚠️ Could not check — `nuscarrick` account doesn't have access to MPFC GitHub repo (repo name unknown or no repo exists under `nustechnology`). Skipped.

---

## Summary

| Check | Status |
|-------|--------|
| Server | ✅ Healthy |
| WordPress cron | ✅ All jobs running |
| Apache errors | ✅ None |
| WP debug log | ⚠️ Missing thumbnail (pre-existing, low priority) |
| Action Scheduler | ✅ 0 failures |
| MemberMouse | ✅ No events |
| Slack | ✅ No alerts (quiet) |
| GitHub | ⚠️ Skipped (no repo access) |

**Warnings (2):**
1. Server uptime 598 days — consider scheduling a reboot for kernel updates
2. Missing thumbnail `lib_videos_preview/1602225437-1024x354.jpeg` — generating Rollbar/SEO noise

**No critical issues.**
