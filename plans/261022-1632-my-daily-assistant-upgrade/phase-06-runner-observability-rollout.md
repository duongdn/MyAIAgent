# Phase 6 — Runner, observability, rollout
**Priority:** P1 · **Status:** todo

## Architecture
- `scripts/assistant/tick.sh` cron mỗi 10 phút giờ làm việc (copy pattern lock từ `daily-alert-cron.sh`): collect → triage → notify → execute approved.
- Hoặc systemd user service nếu cần realtime hơn.
- Daily digest cuối ngày: số event, đã auto, pending, cost token.
- Health: nguồn nào fail liên tục → 1 proposal "fix collector" (memory fix_internal_issues_not_just_report).
- Daily-report vẫn giữ; dần đọc từ inbox thay vì scan lại.

## Docs
Update `README.md` (rename MyDailyAssistant), `docs/system-architecture.md`, `docs/project-changelog.md`.

## Todo
- [ ] tick.sh + crontab  - [ ] digest  - [ ] health  - [ ] docs
