# Arthur / Meta-Stamp V3 — Cập nhật 2026-10-21 (từ 05:15 đến 08:45)

## Tóm tắt nhanh
Tin tốt: **Chris đã chuyển $931.50 qua Wise** (08:07, về trong ngày thứ Tư, Chris chịu phí). **Tommy đã kiểm xong M4 trên production**: scenario (a) và (b) đều đúng, R6 ghi đúng địa chỉ thật → **$1,701 được giải phóng**, Chris chuyển **ngày mai** vì Wise giới hạn mỗi ngày. Chris cũng đã chốt hết các điểm còn mở (rate limit, rows trước R1, per-partner). ⚠️ Chris hỏi **"Staging Friday the 23rd still stands??"** lúc 08:07 — **mình chưa trả lời**. Trong khi đó repo vẫn **0 commit R1** (commit cuối 10-16), còn 2 ngày.

## Chi tiết mới
- **Slack Meta-Stamp #msv3-official** — Chris, 08:00 ([msg](https://meta-stamp.slack.com/archives/C0BM37DJDD2/p1792544403403989)): kết quả kiểm M4 của Tommy trên production ngày 20/10:
  - (a) có key + catalog mở: giao hàng, tính phí $0.0025, content hash khớp, receipt công khai sạch.
  - (b) có key + catalog đóng: bị từ chối `catalog_closed`, không tính phí, receipt cùng dạng.
  - R6: lượt pull trả phí ghi đúng địa chỉ thật của Chris; lượt từ chối không key ngày 16/10 cũng có địa chỉ thật. Còn 1 trường hợp chưa thấy được: **từ chối khi CÓ key** — Feed không liệt kê, ledger/CSV không có cột IP. Chris nói việc này **đã nằm trong R1, test T6**.
  - 3 fix của mình trên production (bulk add/remove/move, hộp thoại xoá, filter Uploading) đều ổn.
  - **1 việc nhỏ cho R1:** hộp thoại xoá đang nói ledger sẽ hiện rows của pocket bị xoá là "(deleted pocket)". Theo R5, rows giữ nguyên tên + đánh dấu "deleted" → phải đổi câu chữ này cùng R5.
- **Chris, 08:07** ([msg](https://meta-stamp.slack.com/archives/C0BM37DJDD2/p1792544858295169)) + link theo dõi Wise 08:08 ([msg](https://meta-stamp.slack.com/archives/C0BM37DJDD2/p1792544881305039)):
  - "$931.50 sent just now from Wise, arrives Wednesday (fees on my end covered)."
  - "$1,701: Tommy's pass is above, so that releases. Wise's daily limit stops me tonight; it goes out tomorrow."
  - **Rate limit:** làm luôn trong R1. Từ chối + ghi row cho request bị giới hạn. Mặc định **60 request/phút/caller**, sẽ chỉnh sau.
  - **Rows trước R1:** theo cách mình đề xuất — dòng tóm tắt có số lượng, khoảng thời gian, đánh dấu pre-R1, gạch ngang chỗ không biết số. Không tự tạo timestamp.
  - **Per-partner split:** chưa làm. Xong R1 trước, tính sau buổi walkthrough.
  - ⚠️ "Staging Friday the 23rd still stands??" — chưa có trả lời từ mình.
- **Matrix** (cả 2 room): không có tin mới.
- **GitHub `Christebob/Meta_Stamp_V3`**: không có push nào từ 10-16 (nhánh nào cũng vậy). Commit cuối trên main 10-15 03:57. Chưa có nhánh R1.
- **Workstream "Meta-Stamp"**: vẫn chỉ có PhucVT 8h ngày 19/10. 20/10 chưa log (đọc lúc 08:25). Crystal lang: tuần này 0 row, không có row Pending.

## BẢNG THEO DÕI (cập nhật từ lần trước)
| # | Vấn đề | Trạng thái | Cập nhật | Link Slack |
|---|--------|-----------|----------|-----------|
| 1 | R6 + bulk ops lên production | ~~🟢 chờ Tommy re-check~~ 🟢 Tommy/Chris xác nhận OK. Còn case "từ chối có key" → R1 test T6 | 10-21 08:00 | [msg](https://meta-stamp.slack.com/archives/C0BM37DJDD2/p1792544403403989) |
| 2 | Gate payment part 2 $1,388 | 🟢 Chris đã gửi (Wise) | 10-16 08:14 | [msv3-official](https://meta-stamp.slack.com/archives/C0BM37DJDD2) |
| 3 | $1,701 M4 giữ lại | ~~⏳ chờ Tommy confirm~~ 🟢 đã giải phóng, Chris gửi **22/10** (giới hạn Wise). Kiểm tiền về | 10-21 08:07 | [msg](https://meta-stamp.slack.com/archives/C0BM37DJDD2/p1792544858295169) |
| 4 | Điều khoản R1 (½ phụ thuộc deal AllVerified) | 🟢 đã đồng ý 10-19 09:50. Rủi ro ½ R1 vẫn còn | 10-19 09:50 | [msg](https://meta-stamp.slack.com/archives/C0BM37DJDD2/p1792378211393269) |
| 5 | Rate limit $121.5 + per-partner $162 + rows trước R1 | ~~⏳ chờ Chris quyết~~ 🟢 Chris chốt: rate limit **làm trong R1** (60/phút/caller), per-partner **chưa làm**, rows pre-R1 theo cách mình | 10-21 08:07 | [msg](https://meta-stamp.slack.com/archives/C0BM37DJDD2/p1792544858295169) |
| 6 | Câu hỏi rows trước R1 hiển thị thế nào | ~~🟢 chờ Chris chọn~~ 🟢 chốt (xem #5) | 10-21 08:07 | [msg](https://meta-stamp.slack.com/archives/C0BM37DJDD2/p1792544858295169) |
| 7 | Workstream Crystal lang 4 rows Pending (12h, tuần trước) | ⏳ TienND chưa review (tuần này không có row Pending) | 10-20 09:25 | — |
| 8 | Tách R1 thành project Workstream riêng | 🟢 đã tách: "Meta-Stamp". Chưa set reviewer | 10-20 15:55 | — |
| 9 | Tiến độ R1, hạn staging 23/10 | ⚠️ **0 commit** lên GitHub (push cuối 10-16), 20/10 chưa log giờ. Còn 2 ngày. Chris hỏi lại hạn | 10-21 08:45 | [msg](https://meta-stamp.slack.com/archives/C0BM37DJDD2/p1792544858295169) |
| 10 | Khoản trả $931.50 ngày bắt đầu | ~~⚠️ chưa về~~ 🟢 Chris đã gửi Wise 08:07, về trong 21/10. Kiểm tiền về | 10-21 08:07 | [msg](https://meta-stamp.slack.com/archives/C0BM37DJDD2/p1792544881305039) |
| 11 | **MỚI** — Chris hỏi "Staging Friday the 23rd still stands??" | ⚠️ **chưa trả lời** (từ 08:07) | 10-21 08:07 | [msg](https://meta-stamp.slack.com/archives/C0BM37DJDD2/p1792544858295169) |
| 12 | **MỚI** — Đổi câu chữ hộp thoại xoá "(deleted pocket)" theo R5 | ⏳ đưa vào R1 | 10-21 08:00 | [msg](https://meta-stamp.slack.com/archives/C0BM37DJDD2/p1792544403403989) |

## Câu hỏi cần anh xác nhận/quyết định
- **Trả lời Chris về hạn staging 23/10**: PhucVT có kịp không? Repo chưa có commit R1 nào, mà R1 giờ có thêm rate limit (60/phút/caller) + đổi câu chữ hộp thoại xoá.
- Project "Meta-Stamp" chưa set reviewer. Ai review giờ R1 (TienND như Crystal lang)?
- Ai kiểm tiền về: $931.50 (21/10) và $1,701 (22/10)?
