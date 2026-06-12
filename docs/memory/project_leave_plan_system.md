---
name: project_leave_plan_system
description: Leave-plan system — parse-leave-emails.js scans duongdn@ IMAP for nghỉ phép emails, updates config/leave-plan.json, and must be consulted BEFORE checking task logs
metadata:
  type: project
---

**Fact:** A leave-plan system was added 2026-06-12.

**Files:**
- `config/leave-plan.json` — approved leave dates per dev. **Read this BEFORE running task log checks.**
- `scripts/parse-leave-emails.js` — scans duongdn@ IMAP for nghỉ phép emails (90-day lookback), detects approval replies, updates leave-plan.json

**Usage in daily report (MANDATORY order):**
1. Run `node scripts/parse-leave-emails.js` during the email piece — updates the leave plan
2. BEFORE task log check for each dev: `node scripts/parse-leave-emails.js --check {DevId} {YYYY-MM-DD}`
   - Exit 0 = LEAVE → skip task log, mark as "off (approved leave)" in report
   - Exit 1 = WORKING → proceed with task log check normally
3. `node scripts/parse-leave-emails.js --list` — shows upcoming/recent leaves for report summary

**Key design decisions:**
- 90-day lookback: devs submit leave 1-2 weeks in advance
- Approval = manager reply (binhnt@, duongdn@, namtv@) with keyword "ok"/"đồng ý"/"được"
- Dates parsed as DD/MM/YYYY from Vietnamese body text (range: "từ ngày X đến ngày Y")
- Half-day detection: "nửa ngày", "buổi sáng", "buổi chiều"
- Leave ID: `{devid-lowercase}-{first-date}` — dedup-safe
- ASCII-safe IMAP search ("nghi", "phep", "leave") to avoid UTF-8 encode errors

**Why:** User requested 2026-06-12 — devs email nghỉ phép 1+ week early; cron was marking them as 0h alerts without knowing they had approved leave.

**How to apply:** Always run parse-leave-emails.js FIRST in the email piece. Always check leave-plan.json BEFORE flagging any dev's 0h as an alert.
