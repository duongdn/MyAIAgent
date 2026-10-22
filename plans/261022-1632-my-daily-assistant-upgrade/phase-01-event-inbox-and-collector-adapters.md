# Phase 1 — Event inbox + collector adapters
**Priority:** P0 · **Status:** todo

## Overview
Chuẩn hoá mọi tin nhắn/info vào 1 bảng `events` để các bước sau không phụ thuộc nguồn.

## Key insights
- Đã có collectors: `scripts/slack-scan.js`, `email-scan.js`, `discord-monitor.js`, `fetch-matrix-daily.js`, `whatsapp-monitor.js`, `zalo-monitor.js`, `fetch-msteams-customer-messages.js`, `upwork-room-messages.js`. Chỉ cần adapter → không viết lại.
- Known gotchas: OhCleo thread replies bị bỏ sót, OhCleo time là UTC (memory) → xử lí trong adapter.

## Architecture
- `data/assistant.db` (better-sqlite3, gitignored). Tables:
  - `events(id, source, account, channel, thread_id, sender, sender_role[customer|team|me|bot], text, ts_utc, url, raw_json, status[new|triaged|done|ignored], UNIQUE(source, source_msg_id))`
  - `cursors(source, account, last_ts)`
- `scripts/assistant/collectors/<source>-adapter.js`: gọi collector có sẵn (hoặc import hàm), map → event, upsert.
- `scripts/assistant/collect-all.js`: chạy adapters song song, timeout từng nguồn, lỗi nguồn nào ghi log nguồn đó.

## Related files
Create: `scripts/assistant/db.js`, `scripts/assistant/collectors/*.js`, `scripts/assistant/collect-all.js`. Modify: `.gitignore` (data/).

## Steps
1. db.js + migration. 2. Adapter Slack + Email trước (khối lượng tin khách lớn nhất). 3. Matrix, WhatsApp, Zalo, Discord (AirAgri+Bizurk only), MSTeams, Upwork. 4. sender_role từ `config/assistant-contacts.json` (map người → khách/team/project).

## Todo
- [ ] db schema + dedup  - [ ] slack/email adapters  - [ ] other adapters  - [ ] contacts map  - [ ] collect-all CLI

## Success criteria
Chạy `node scripts/assistant/collect-all.js` 2 lần liên tiếp → lần 2 insert 0 bản trùng; đủ tin của 1 ngày so với daily report.

## Risks
Token/cookie hết hạn → adapter trả lỗi rõ, KHÔNG báo "token expired" khi chưa verify 3 bước (rule Discord).
