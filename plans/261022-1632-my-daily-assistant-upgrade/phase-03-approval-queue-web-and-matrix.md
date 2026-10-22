# Phase 3 — Approval queue
**Priority:** P0 · **Status:** todo

## Overview
T2 → `proposals` table → báo anh → Approve / Edit / Reject.

## Architecture
- Table `proposals(id, triage_id, action_json, draft, status[pending|approved|edited|rejected|executed|failed], decided_at, decided_by)`.
- Web: thêm tab "Inbox" trong `web/server.js` (đã có login): list proposal, xem nguồn + link, sửa draft, nút Approve/Reject.
- Notify: `util:notify` / `matrix-send-message.js` gửi tóm tắt + link proposal (chỉ gửi cho chính anh). Digest gộp nếu nhiều.
- Option (tuỳ Q1): Telegram bot inline buttons.

## Related files
Modify: `web/server.js`, `web/public/*`. Create: `scripts/assistant/notify-proposals.js`.

## Todo
- [ ] table + API  - [ ] Inbox UI  - [ ] notify + digest  - [ ] proposal hết hạn (vd 24h) → nhắc lại

## Success criteria
Từ lúc tin đến → anh nhận thông báo < 15 phút; approve từ điện thoại được.

## Security
Endpoint approve yêu cầu session login; CSRF token; log ai approve.
