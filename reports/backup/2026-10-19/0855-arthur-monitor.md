# Arthur / Meta-Stamp V3 — Cập nhật 2026-10-19 (từ 10-16 05:00 đến 08:55)

## Tóm tắt nhanh
Chris đã duyệt và mình đã deploy production R6 + bulk add/remove/move (Fri 11:29). Đã nhận thêm $1,388 (tổng gate $3,330), $1,701 còn giữ lại tới khi R2–R6 pass trên production. Báo giá R1 gửi Fri 21:36. **Sáng nay 05:33 + 05:59 Chris trả lời báo giá. Chưa ai reply.** Chris cần câu trả lời thẳng về tiền trước khi bắt đầu.

## Chi tiết mới
**Chris 05:33 (#msv3-official), cần quyết định:**
- Làm: toàn bộ R1 (R1-a → R1-g) $1,701 + B1 $81. Backfill để sau, nhưng giữ nguyên log cũ.
- Thanh toán:
  - (1) $1,701 đang giữ của M4 sẽ trả khi Tommy xác nhận scenario (a), (b) và R6 trên production trong tuần này.
  - (2) **Hôm nay** trả $931.50 (½ R1 + B1).
  - (3) **½ R1 còn lại $850.50 chỉ trả "the day the AllVerified deal closes"**, tức là phụ thuộc deal của Chris. Đây là rủi ro: có thể không được trả.
- Nếu đồng ý: bắt đầu **Mon 19/10**, lên staging **Fri 23/10**. Nếu không thì "tell me straight", hai bên bàn cắt/chia giai đoạn.
- Yêu cầu kỹ thuật:
  - R1-e: không hardcode 85/15, đọc `STRIPE_PLATFORM_FEE_PERCENT`, sửa 2 chỗ đang hardcode 85.
  - **Báo giá thêm** chi phí làm split per-partner.
  - Các fix no-charge (R5, B2, money columns, R4(a), evidence/export) làm chung đợt R1.
  - Không ship "Denials in the last 7 days".
  - Export: JSON Lines.
- **Câu hỏi:** "how will rows written before R1 show in the new views?"
- Spec v5 đính kèm. Nếu spec và list khác nhau thì spec thắng.

**Chris 05:59:** muốn **báo giá rate limit ngay bây giờ** (per-caller/phút, key theo fingerprint_id, số lượng là setting, request bị limit vẫn ghi row). Nếu nhỏ thì build chung đợt R1.

## BẢNG THEO DÕI
| # | Vấn đề | Trạng thái | Cập nhật | Link Slack |
|---|--------|-----------|----------|-----------|
| 1 | R6 + bulk ops lên production | 🟢 đã deploy, chờ Tommy re-check | 10-16 11:29 | [msv3-official](https://meta-stamp.slack.com/archives/C0BM37DJDD2) |
| 2 | Gate payment part 2 $1,388 | 🟢 Chris đã gửi (Wise) | 10-16 08:14 | [msv3-official](https://meta-stamp.slack.com/archives/C0BM37DJDD2) |
| 3 | $1,701 M4 giữ lại | ⏳ chờ Tommy confirm (a)/(b)/R6 tuần này | 10-19 05:33 | [msv3-official](https://meta-stamp.slack.com/archives/C0BM37DJDD2) |
| 4 | **Điều khoản thanh toán R1 (½ phụ thuộc deal AllVerified)** | 🔴 chờ mình trả lời, cần quyết định | 10-19 05:33 | [msv3-official](https://meta-stamp.slack.com/archives/C0BM37DJDD2) |
| 5 | Báo giá rate limit + per-partner split | 🔴 chưa báo giá | 10-19 05:59 | [msv3-official](https://meta-stamp.slack.com/archives/C0BM37DJDD2) |
| 6 | Câu hỏi: rows trước R1 hiển thị thế nào | 🔴 chưa trả lời | 10-19 05:33 | [msv3-official](https://meta-stamp.slack.com/archives/C0BM37DJDD2) |
| 7 | Workstream Crystal lang 4 rows Pending | 🔴 chờ TienND review | 10-16 | — |

Chưa check lần này: Slack Solid Code (token hết hạn, dự án đã chuyển qua workspace Meta-Stamp) và GitHub repo.

## Câu hỏi cần anh xác nhận/quyết định
- Có chấp nhận ½ R1 ($850.50) chỉ được trả khi deal AllVerified chốt không? Hay đề nghị cắt/chia giai đoạn?
- Hôm nay có bắt đầu R1 không (Chris muốn start 19/10, staging 23/10)?
- Ai reply Chris và gửi báo giá rate limit + per-partner split?
