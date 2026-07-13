# Arthur / Meta-Stamp V3 — Cập nhật 2026-07-13 (từ 2026-07-09 10:10 đến 10:30)

## Tóm tắt nhanh
**2/5 nguồn không check được run này** (xem mục "Nguồn bị chặn" bên dưới) — Matrix bị skip theo yêu cầu, Slack "Solid Code" bị vỡ token do lỗi hệ thống (không phải do source thật sự down). Nguồn còn lại (GitHub + Workstream) cho thấy: **PR YouTube-ingestion fix bị merge → revert → re-merge lại trong 3 ngày** (07-10 đến 07-13) — dấu hiệu bất ổn kỹ thuật đáng theo dõi, đúng vào đúng hạng mục P0 "YouTube channel connect" đã ghi nhận từ lần trước. Ngoài ra 8 commit (07-09 đến 07-10) xây xong tính năng Provenance/Ownership trên pocket view — khớp với P0 item #2, nhưng CHƯA có xác nhận từ khách qua chat (do Slack không check được). Workstream tuần trước (06/07-12/07): PhucVT 41h, TienND 42.67h, DuongDN 3h — bình thường, không alert.

## Nguồn bị chặn run này (cần biết trước khi đọc bảng)

1. **Matrix (2 phòng)** — theo yêu cầu, SKIP hoàn toàn run này (token invalid, đã thử 7 lần trong ngày, không thử lại).
2. **Slack "Solid Code" (3 kênh: Arthur DM, ms-v3, msv3-official)** — 🔴 **lỗi hệ thống thật sự, không phải do workspace down.** Token của account này (`config/.slack-accounts.json`) đã bị **xoá mất hoàn toàn** khỏi file config — cùng loại lỗi đã ghi nhận trước đây (`decrypt-secrets.sh` ghi đè file plaintext bằng bản `.enc` cũ hơn, vì token Solid Code chưa từng được re-encrypt vào `.enc` sau khi thêm 07-06). Đã thử khôi phục an toàn:
   - Chạy lại script trích xuất token headless (`slack-extract-solid-code-team-token.js`) — thất bại, Google session hiện "Signed out" trong browser profile giả lập.
   - Mở trực tiếp `solid-code-team.slack.com` bằng Chrome Profile 15 thật của David (không phải profile giả lập) — **xác nhận đăng nhập OK, thấy đúng workspace/kênh/DM** (ảnh chụp màn hình xác nhận: #general, ms-v3, msv3-official, DM Nick/Chris Coyne/Art K đều hiển thị bình thường).
   - Token xoxc lấy được từ local storage của profile đó là **token cũ (từ 06/02), đã hết hạn** (`invalid_auth` khi test qua API) — muốn lấy token mới cần thao tác thêm trên desktop, nhưng **anh đang dùng máy trực tiếp lúc này** (terminal orchestrator đang mở, đang chat việc khác) nên em dừng lại, không thao tác tiếp trên desktop để tránh làm phiền/can thiệp nhầm cửa sổ đang dùng.
   - **Cần:** chạy lại `node scripts/slack-extract-solid-code-team-token.js` (hoặc thao tác thủ công lấy xoxc token mới từ Profile 15) khi máy rảnh, rồi `bash scripts/encrypt-secrets.sh config/.slack-accounts.json` để token không bị mất lại lần sau.

## Chi tiết mới (GitHub + Workstream — 2 nguồn check được)

### GitHub — `Christebob/Meta_Stamp_V3`, 3 PR mới + 8 commit
- **PR #9** (07-10 08:28, merged 09:29): `fix(ingestion): robust and fast YouTube channel ingestion via Celery` — khớp trực tiếp với P0 item #3 "YouTube channel connect" từ lần check trước.
- **PR #10** (07-10 10:21, merged ngay): `Revert "fix(ingestion)..."` — fix trên bị revert chỉ ~1 tiếng sau khi merge, tức là có vấn đề khi lên production/staging.
- **PR #11** (07-13 02:32, merged ngay 02:33 — tức sáng nay): `Revert "Revert ...”` — tức áp dụng lại fix ban đầu, sau 3 ngày điều tra/sửa thêm. Trạng thái hiện tại: fix ĐANG active lại, nhưng lịch sử revert cho thấy nó từng gây lỗi thật — cần theo dõi thêm xem lần re-apply này có ổn không.
- **8 commit riêng (07-09 04:34 → 07-10 07:34), tác giả `davidztv`:** toàn bộ xây tính năng Provenance/Ownership modal trên pocket view — `feat(pockets): show ownership/provenance one click deep`, `fix(pockets): sharper source link`, `portal provenance modal to body`, `hide Sound-recording owner row when unset`, `parse music splits into structured table`... Đây chính là P0 item #2 "Provenance trên pocket view" từ tracker — **code đã build xong**, nhưng CHƯA có xác nhận qua Slack (không check được kênh chat lần này) nên chưa thể đánh dấu 🟢/✅.

### Workstream — Crystal lang, tuần 06/07–12/07 (tuần trước, đã đủ dữ liệu)
| Member | Tổng giờ | Giờ tính phí |
|---|---|---|
| PhucVT | 41h | 38h |
| TienND | 42.67h | 42.67h |
| DuongDN | 3h | 3h |

Bình thường, không có shortfall. Tuần này (13/07–19/07) mới bắt đầu (thứ Hai), chưa có dữ liệu — không phải alert.

## BẢNG THEO DÕI (cập nhật)
| # | Vấn đề | Trạng thái | Link | Cập nhật lần cuối |
|---|--------|-----------|------|---------------------|
| 1 | Chris demo Jul-8 sáng — kết quả | ✅ Xong, khách đồng ý tiếp tục nhưng thất vọng thiếu billing+3rd-party agent | (Matrix, xem báo cáo gốc) | 2026-07-08 21:58 |
| 2a | P0 — Funded demo agent (tài khoản có thẻ sẵn) | 🟡 Chưa có bằng chứng mới (Slack không check được run này) | — | 2026-07-08 21:58 |
| 2b | P0 — Provenance UI trên pocket view | 🟢 **Code đã build xong** (8 commit GitHub 07-09/10) — chưa xác nhận với khách qua chat | GitHub 8 commits `davidztv` 07-09→07-10 | 2026-07-13 07:34 (commit) |
| 2c | P0 — YouTube channel connect fix | 🔴 **Bất ổn** — fix merge (PR#9) → revert (PR#10) cùng ngày 07-10 → re-apply (PR#11) sáng 07-13. Đang active lại nhưng có tiền sử lỗi, cần theo dõi | GitHub PR #9, #10, #11 | 2026-07-13 02:33 |
| 2d | P0 — Spotify/DISCO/Dropbox có hoạt động như "pocket" không? | 🟡 Chưa có câu trả lời (Slack không check được) | — | 2026-07-08 21:58 |
| 3 | P1 (14/7) — T&C checkbox, catalog export | 🟡 Chưa có bằng chứng mới | — | 2026-07-08 21:58 |
| 4 | P2 — metadata tiers, detection layer hook | 🟡 Chỉ cần spec, chưa build | — | 2026-07-08 21:58 |
| 5 | Trello password gửi plaintext trong Slack | ⚠️ Chưa xác nhận đã đổi | — | 2026-07-09 02:14 |
| 6 | AI usage disclosure với Chris | ✅ Đã rõ, không vấn đề | — | 2026-07-08 15:38 |
| 7 | PhucVT 0h Jul-8 (Crystal lang) | ✅ **Đã rõ** — tuần 06/07-12/07 PhucVT tổng 41h, không còn là vấn đề | Workstream | 2026-07-13 (tuần trước) |
| 8 | 3rd-party agent vs MCP-driven decision | 🟡 Chưa có bằng chứng mới | — | 2026-07-08 07:54 |
| 9 | Stripe Connect → production | 🟡 Chưa có bằng chứng mới | — | 2026-07-09 02:11 |
| 10 | **MỚI** — Slack "Solid Code" token bị mất do lỗi decrypt-secrets.sh | 🔴 Cần chạy lại script trích token + encrypt lại | — | 2026-07-13 10:30 |
| 11 | **MỚI** — YouTube-ingestion revert saga (xem 2c) | 🔴 Theo dõi, đã tách thành row riêng ở 2c | GitHub | 2026-07-13 02:33 |

## Câu hỏi cần anh xác nhận/quyết định
- **Slack Solid Code token bị mất** — anh có thể mở lại `solid-code-team.slack.com` trên Chrome Profile 15 (David) một lát khi rảnh không? Em cần chạy lại script lấy token mới rồi lưu — hiện session đăng nhập vẫn còn (đã xác nhận), chỉ cần trích token thôi.
- Do Slack + Matrix đều không check được run này, **không thể xác nhận tiến độ thực tế của 4 hạng mục P0** (chỉ có bằng chứng gián tiếp từ GitHub cho 2b và 2c) — deadline P0 gốc là "Thứ Năm" (07-09), đã qua 4 ngày, cần check Slack sớm để biết có bị trễ/escalate không.
- PR #9 YouTube-fix bị revert rồi re-apply — có ai xác nhận với team là bản re-apply lần 2 (07-13) đã test kỹ chưa, hay đang lặp lại lỗi cũ?
