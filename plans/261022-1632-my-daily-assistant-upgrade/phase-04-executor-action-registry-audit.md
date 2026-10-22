# Phase 4 — Executor + action registry + audit
**Priority:** P0 · **Status:** todo

## Overview
Proposal approved → thực thi qua action đã đăng ký; không cho LLM chạy lệnh tuỳ ý.

## Architecture
- `scripts/assistant/actions/registry.js`: map `type → handler`:
  - `reply_message` → matrix-send-message / whatsapp-send-message / slack chat.postMessage / email SMTP
  - `run_skill` → `claude -p "/me:<skill> ..." --allowedTools <hẹp>`
  - `trello_update` → util:trello
  - `create_task_note` → ghi vào reports/
- Mỗi handler: validate params, idempotency key (proposal_id) → table `executions`, chặn gửi trùng (memory no_duplicate_sends).
- Kết quả gửi lại cho anh (ok/fail + link).

## Todo
- [ ] registry + 3 handler đầu (matrix, slack, email)  - [ ] idempotency  - [ ] audit log  - [ ] dry-run flag

## Success criteria
Approve 1 lần = gửi đúng 1 lần; retry sau crash không gửi lại.
