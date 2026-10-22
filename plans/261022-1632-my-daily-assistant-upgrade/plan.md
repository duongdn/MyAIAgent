# MyDailyAgent → MyDailyAssistant

**Status:** Draft · **Created:** 2026-10-22 · **Branch:** master

## Mục tiêu
Từ "chạy skill theo lệnh/cron" → trợ lí chạy liên tục: **nhận → phân tích → (tự xử lí việc đơn giản | đề xuất + xin approve → thực thi)**.

## Kiến trúc (local, tái dùng code sẵn có)
```
 Collectors (đã có)            Inbox            Brain              Actions
 slack-scan, email-scan,  →  SQLite events  →  claude -p triage → T0 log/digest
 discord, matrix, whatsapp,   (dedup, cursor)   (JSON schema,     T1 auto (holding reply, allowlist)
 zalo, msteams, upwork-room                     policy + memory)  T2 proposal → approve (Web/Matrix)
                                                                        ↓ approved
                                                                  Executor (claude -p, allowedTools hẹp)
                                                                  → send scripts / skills → audit log
```
Không cần framework mới (n8n/LangGraph/OpenClaw): Claude Code headless (`claude -p`) + cron + SQLite + web/server.js đã có là đủ. YAGNI.

## Phases
| # | Phase | Status |
|---|-------|--------|
| 1 | [Event inbox + collector adapters](phase-01-event-inbox-and-collector-adapters.md) | todo |
| 2 | [Triage engine (classify + analyze)](phase-02-triage-engine.md) | todo |
| 3 | [Approval queue (web + Matrix)](phase-03-approval-queue-web-and-matrix.md) | todo |
| 4 | [Executor + action registry + audit](phase-04-executor-action-registry-audit.md) | todo |
| 5 | [Auto-reply tier: shadow → live](phase-05-auto-reply-shadow-then-live.md) | todo |
| 6 | [Runner daemon, observability, rollout](phase-06-runner-observability-rollout.md) | todo |

## Nguyên tắc an toàn (bắt buộc)
- Mặc định **không gửi gì** ra ngoài nếu chưa approve (memory: never_send_messages_without_permission, no_duplicate_sends, customer_facing_messages). T1 chỉ bật theo allowlist kênh, sau ≥1 tuần shadow mode.
- Mọi action có idempotency key + audit log; kill-switch `config/assistant-policy.json: "enabled": false`.
- Không hardcode secret — đọc config/ như hiện tại.

## Dependencies
Collectors hiện tại phải xuất JSON được (phase 1 chỉ bọc adapter, không viết lại). Claude CLI headless có trên máy công ty.

## Unresolved questions
1. Kênh approve chính: Web UI (dailyagent.*), Matrix DM, hay thêm Telegram bot (nút bấm trên điện thoại tiện nhất)?
2. Holding reply (T1) cho kênh nào được phép tự gửi? Câu mẫu do anh duyệt trước?
3. Chạy ở PC công ty (chỉ bật 08:00+) hay server mpfc 24/7? Collector cần cookie/Chrome thì phải ở PC.
4. Ngân sách token/ngày cho triage (poll 10 phút × nhiều nguồn)?

## Realtime (bổ sung 2026-10-22)
- **Nhận tin realtime (listener chạy liên tục):** Matrix /sync long-poll, Email IMAP IDLE, Discord gateway WS, Slack RTM/WS (token xoxc), WhatsApp/Zalo CDP event. Nguồn không có push (MSTeams, Upwork) → poll 1–2 phút.
- **Báo anh realtime:** Telegram bot (push + nút Approve/Reject, ưu tiên) | Matrix/Element push | `scripts/desktop-notify.js`.
- **Lọc 2 tầng:** lọc rẻ (bot/noise/team chat) → Haiku phân loại nhanh (~giây) → Sonnet/Opus chỉ cho tin cần đề xuất.
- Runner phase 6: đổi cron 10' → service `assistant-daemon` (systemd user, tự restart); cron chỉ làm fallback/health.
- **Chốt 2026-10-22:** Telegram bot = kênh notify + approve chính (điện thoại + Telegram Desktop). Desktop thêm popup `notify-send` qua `desktop-notify.js` cho tin urgency=high. Config: `config/.telegram-config.json` (token, chat_id; gitignored + encrypt).
