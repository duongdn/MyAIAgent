# Eval cho daily-report — Setup & kết quả lần đầu

**Ngày:** 2026-10-19 · **Giai đoạn 1** của [lộ trình AI Engineer](1605-ai-engineer-architect-learning-plan.md)

## Đã tạo

| File | Vai trò |
|---|---|
| `evals/daily-report/structure-checks.js` | 16 check cấu trúc, mỗi check gắn với 1 rule MANDATORY (CLAUDE.md / memory) |
| `evals/daily-report/run-structure-eval.js` | Chạy check trên report cũ (`reports/` + `reports/backup/`), không cần AI, miễn phí |
| `evals/daily-report/judgment-cases.json` | 14 test case phán đoán alert, lấy từ các lần user sửa sai (memory feedback) |
| `evals/daily-report/run-judgment-eval.js` | Gửi **chỉ rule memory + scenario** cho model và chấm alert đúng/sai. `--provider claude` (gói Claude Code, `claude -p`) hoặc `deepseek` |

**Chạy:**
```bash
npm run eval:daily-structure -- --days 60     # cấu trúc 60 report gần nhất
npm run eval:daily-judgment                    # phán đoán, mặc định claude/haiku
npm run eval:daily-judgment -- --provider deepseek   # cần config/.deepseek-config.json {"api_key":"..."} (gitignored)
npm run eval:daily-judgment -- --runs 3        # chạy lặp, đo độ ổn định
```

## Kết quả lần đầu

### A. Cấu trúc — 60 report (07-28 → 10-19): **81,2%**

| Check | Pass | Nhận xét |
|---|---|---|
| Fountain 5 phần | **14/60** | Rule có từ 03-27, nhưng tới ~10-05 report chỉ có 3 phần. Khớp với ghi chú trong CLAUDE.md "missed multiple days". Từ 10-06 đã đủ |
| Bảng Workstream dev/reviewer/status | **15/60** | Rule thêm 07-15, thực tế chỉ được áp dụng từ ~10-06 |
| Alert hội thoại có link | **10/60** | Alert Slack/Matrix/Trello thường thiếu link tới tin nhắn |
| Section Trello / Upwork / Unresolved | 51–52/60 | Thỉnh thoảng thiếu section |
| Còn lại (header, Email, Slack, Discord scope, timeline…) | 100% | |

**Report hôm nay (10-19): sạch.** Chất lượng tăng rõ từ đầu tháng 10. Eval xác nhận điều này bằng số, không còn là cảm giác.

### B. Phán đoán — claude/haiku: **13/14 = 93%**

❌ **`holding-reply-counts-as-answered`** — model báo alert cho tình huống "khách hỏi, dev trả lời *'Let me check and get back to you today'*, vẫn trong cùng ngày".

**Nguyên nhân: 2 memory mâu thuẫn nhau** (không phải lỗi model):
- `global/feedback_customer_direct_ask_universal_gate.md`: chỉ acknowledge (*"let me check"*, *"noted"*, emoji) mà chưa giải quyết thì → **WARNING**.
- `daily-report/trello/feedback_holding_reply_and_our_side_done_are_not_alerts.md` (10-09): holding reply → **đã trả lời**.

Report 10-19 đang làm theo rule thứ hai, nên kết quả phụ thuộc vào việc model đọc file nào trước. Đây chính là loại lỗi mà sửa tay qua memory không phát hiện được.

**Đề xuất gộp** (cần user xác nhận): holding reply = đã trả lời **trong 24h**. Quá 24h mà không có follow-up thực chất → alert (đúng với vụ Franc 25h+).

## Lợi ích / cách dùng tiếp

- Mỗi lần user sửa một lỗi daily-report: thêm 1 case vào `judgment-cases.json` rồi chạy lại toàn bộ. Lỗi cũ sẽ không quay lại mà không bị phát hiện.
- Trước khi sửa prompt/memory: chạy eval để lấy baseline, sau khi sửa chạy lại để so sánh.
- So sánh model: `--provider deepseek` với claude trên cùng bộ case.
- Có thể gắn `eval:daily-structure` vào cuối run daily-report để tự cảnh báo khi report thiếu phần.

**Docs impact:** minor (chưa cập nhật `docs/`; usage nằm ở header của các script).

## Câu hỏi còn mở

1. Gộp 2 rule holding-reply theo đề xuất **24h** ở trên được không?
2. Có gắn structure eval tự chạy cuối mỗi daily-report (chỉ in cảnh báo, không chặn) không?
3. DeepSeek: khi có API key, lưu ở `config/.deepseek-config.json` rồi encrypt như các config khác. Case hiện tại là synthetic nhưng có tên dev nội bộ. Có cần ẩn danh tên dev trước khi gửi DeepSeek không?

---

## Cập nhật 2026-10-20 (user trả lời: 1 Yes · 2 Yes · 3 không cần ẩn danh)

- **Gộp rule:** holding reply = đã trả lời trong **24h**; quá 24h không có follow-up thực chất → alert. Sửa cả 2 file memory ở cả 2 nơi lưu (`~/.claude/...memory` + `docs/memory`) và dòng index MEMORY.md.
- **Case mới:** `holding-reply-expired-after-24h` (khách hỏi 30h trước, chỉ có "Let me check" → alert).
- **Judgment eval:** 15 case × 3 lần = **45/45 (100%)**, trước khi gộp rule là 93%.
- **Gắn vào daily-report:** `.claude/commands/me/daily-report.md`, bước 4b (cron), 8 (interactive), 1b (recheck). Structure eval chạy sau khi cập nhật timeline và chỉ cảnh báo: sửa report nếu có sẵn dữ liệu, không thì ghi `Eval: …` vào Unresolved Questions.
- **Fix runner:** sort danh sách ngày truyền tay. Trước đây ngày cuối danh sách bị coi là "latest".
- **Report 10-20:** ❌ `alerts-have-links`, 3/4 alert hội thoại thiếu link (GGS, Matrix halt, Xtreme Maddy). Từ lần chạy sau, bước eval sẽ bắt lỗi này.
