---
name: feedback_bailey_moved_to_workstream_speedventory
description: "Bailey is NO LONGER the Workstream exception — user directed 2026-08-21 to stop writing the weekly monitor task log to Google Sheets and use Workstream project 'speedventory' instead. Supersedes reference_workstream.md's 'ALL except Bailey' claim for the monitor task log."
metadata:
  type: feedback
---

`docs/memory/daily-report/sheets/reference_workstream.md` previously stated "ALL projects have moved to Workstream, EXCEPT Bailey" and that Bailey task-log actuals live only in the Paturevision Google Sheet. On 2026-08-21 the user said (Vietnamese): "từ giờ ko viết task log trên google nữa mà viết trên Workstream Bailey" (from now on, stop writing task log on Google, write it on Workstream Bailey) — specifically for the `me:bailey-monitor` weekly monitoring task-log entry (Subtask 9).

**Why:** Bailey/Paturevision now has a Workstream project — "Speedventory" (client alias "Bailey Joey", id `cmqyvio51000vqo0xhocbx5c9`) — already listed in [[reference_workstream]]'s project table as a 🆕 addition from 2026-07-02, but the "except Bailey" exception note wasn't updated when that project appeared. User confirmed via AskUserQuestion that `speedventory` is the correct target.

**How to apply:**
- `me:bailey-monitor` Subtask 9 now writes to Workstream via `node scripts/workstream-write-tasklog.js speedventory {date} "Weekly Monitor {Month} {Year}" 1` instead of the Paturevision Sheet (see [[reference_bailey_monitor_skill_file]] — skill file updated 2026-08-21).
- Workstream had NO write/POST script in this repo before — only read (`workstream-fetch-project-week.js`). The POST endpoint `{api_base}/time/task-logs` and its payload shape (`projectMemberId`, `date`, `projectId`, `tasks:[{taskName,actual,charged,isPt,note,additionalInfo,tagIds}]`, hours as `"H:MM"` strings) were discovered by fetching the live Workstream frontend JS bundle (`curl https://workstream.nustechnology.com/` → find `<script src>` → grep the bundle for `saveTaskLogs`/`task-logs`) and cross-checking field names against `/review/week`'s row shape. New script: `scripts/workstream-write-tasklog.js`.
- `config/.workstream-config.json` → `projects.speedventory` now holds `{id, name, client, projectMemberId}` — added 2026-08-21, re-encrypted via `bash scripts/encrypt-secrets.sh config/.workstream-config.json` (NOT the full `encrypt-secrets.sh` loop, to avoid clobbering other configs — see save-secret-config.js comment).
- **Only the monitor's own task-log entry is confirmed moved.** Whether Bailey DEV1/DEV3 (VietPH/TuanNT/DuongDN) *billing* actuals also moved off the Paturevision Sheet onto Workstream is NOT confirmed — [[feedback-bailey-paturevision-billing]] and [[feedback_bailey_invoice_verify_slack_quote_supersedes_buffer]] still describe Sheet-based billing; don't assume those moved too without asking.
