# Arthur / Meta-Stamp V3 — Cập nhật 2026-07-09 (từ 2026-07-08 13:33 đến 10:10)

## Tóm tắt nhanh
**Có việc quan trọng cần chú ý**: Chris (khách) đã demo xong sáng 08/07, đồng ý tiếp tục, nhưng thất vọng vì thiếu "live billing" + "3rd-party agent" — anh ấy đưa ra **danh sách yêu cầu ưu tiên P0/P1/P2**, trong đó **P0 phải xong trước Thứ Năm** (tức ngày mai theo giờ VN nếu tính theo lịch client). Đội đã bắt đầu setup Trello để track. Ngoài ra có 1 chi tiết bảo mật cần lưu ý: password Trello được gửi trực tiếp qua Slack (dạng plaintext).

## Chi tiết mới

### 1. Yêu cầu khách hàng — DEADLINE THỨ NĂM (msv3-official, Chris 21:58 Jul-8)
Chris gửi danh sách build ưu tiên sau demo:

**P0 — TRƯỚC PHẦN 2 (mục tiêu: Thứ Năm):**
1. **FUNDED DEMO AGENT** — tài khoản khách hàng có thẻ đã nạp sẵn, test kỹ, sẵn sàng dùng bất kỳ lúc nào trong call. Demo hôm nay KHÔNG có "money moment" vì thiếu cái này — Chris nói "never again", đây là mục #1.
2. **Provenance trên pocket view** — hiện composer/publisher/rights owner/sound-recording owner chỉ 1 click. Chris gọi đây là "crucial set of ownership/provenance metadata".
3. **YouTube channel connect** — lỗi 2 lần live demo hôm nay (cả channel của Chris và của David). Cần fix hoặc ẩn nút.
4. **Câu hỏi cần trả lời trong tuần này**: link Spotify/DISCO/Dropbox có hoạt động như "pocket" không? SourceAudio đã work live, Chris hỏi cụ thể về Spotify-hosted Float album của anh ấy.

**P1 — TRƯỚC CUỘC GỌI VC NGÀY 14:**
5. Checkbox T&C khi upload ("tôi sở hữu quyền này") — yêu cầu pháp lý, Chris hỏi rõ.
6. Catalog export — xuất 1-click toàn bộ dữ liệu 1 creator (assets, metadata, pockets, giá). CSV thô cũng được. Chris: "để tôi audit được".

**P2 — SPEC NGAY, BUILD SAU NGÀY 14:**
7. Metadata intake theo tier (form đơn giản / auto-extract / bulk CSV cho enterprise).
8. Detection layer hook — kiến trúc cho AI-music verification (loại Authio) ở bước ingest — chỉ design, chưa build.

**Thêm:** Casey (bạn dev của Art K) đang build demo bulk-crawl agent cho VC call ngày 14 — 1 agent tự kéo 10-15 track liên tiếp và trả tiền từng cái. Có thể sẽ hỏi David/TienND về integration.

### 2. Setup Trello mới (ms-v3, sau 21:58 Jul-8)
- Art K yêu cầu setup Trello để track P0-P2, David tạo và share cho Art K (email `art_k@mac.com`) + share tiếp cho Nick (TienND) dùng chung account.
- ⚠️ **Bảo mật:** Art K gửi password Trello trực tiếp trong Slack dạng plaintext: `pwd 1L8:ko9hR-KPKhz` (02:14 Jul-9). Nên đổi lại qua kênh an toàn hơn nếu còn dùng.
- Art K còn đề xuất thêm 1 board Trello nội bộ riêng (không có Chris) — David phản hồi thận trọng, hỏi rõ mục đích, đề xuất Notion thay vì 2 board cùng project (hợp lý, tránh nhầm lẫn).

### 3. Vấn đề kỹ thuật khác (ms-v3)
- Rate limit SambaNova API trên repo `metaStampCustomerDemo` — Art K đã báo Casey, có key mới (`c7ea0ca5-c5c0-48c1-87aa-dd62fc47b763`, đã gửi trong Slack — cũng plaintext).
- Stripe Connect cần chuyển sang production — David hỏi Chris login Stripe để config; Art K hỏi có dùng account Stripe của mình được không (chưa có câu trả lời cuối).
- mini PC của Art K bị offline trên Tailscale — đã fix (David restart).
- Repo z3cka (3rd-party agent) — deploy vào đây chỉ cần thiết nếu quyết định dùng 3rd-party agent thay vì MCP-driven agent; quyết định này vẫn treo.

### 4. Msv3-official — không có gì mới ngoài đoạn P0-P2 ở trên (đã trích đầy đủ). Chris cảm ơn, hẹn 9:30 sáng.

### 5. GitHub (Christebob/Meta_Stamp_V3) — 8 commit mới khớp với các trao đổi trên
`fix(demo)`: sửa docker, route, SSE parsing, thêm `/demo-dhar-mann`, xóa hết text "Dhar Mann" khỏi `/demo` chính, update text login page — tất cả trong khoảng 06:48-10:34 Jul-8, đúng như David báo trong Slack.

### 6. Aysar DM (channel gốc) — 0 tin nhắn mới, không có gì.

### 7. Matrix "Arthur - Meta-Stamp" (11 msg, đã có trong lần check trước) — PhucVT hỏi Nam về AI usage disclosure, Nam xác nhận ok. Chris báo demo xong sáng nay ok, có bug nhỏ (#3) đang check.

### 8. Matrix technical room — 0 tin nhắn mới.

### 9. Workstream (Crystal lang) — PhucVT 0h Jul 8, không có lý do nghỉ — real alert, đã gửi nhắc nhở (xem Sheets recheck trong daily-report chính).

## BẢNG THEO DÕI (cập nhật)
| # | Vấn đề | Trạng thái | Cập nhật lần cuối |
|---|--------|-----------|---------------------|
| 1 | Chris demo Jul-8 sáng — kết quả | ✅ Xong, khách đồng ý tiếp tục nhưng thất vọng thiếu billing+3rd-party agent | 2026-07-08 21:58 |
| 2 | **P0 deadline Thứ Năm** — Funded demo agent, Provenance UI, YouTube connect fix, Spotify/DISCO/Dropbox answer | 🔴 MỚI — cần theo dõi sát, deadline gần | 2026-07-08 21:58 |
| 3 | P1 deadline 14/7 (VC call) — T&C checkbox, catalog export | 🟡 Chưa bắt đầu | 2026-07-08 21:58 |
| 4 | P2 — metadata tiers, detection layer hook | 🟡 Chỉ cần spec, chưa build | 2026-07-08 21:58 |
| 5 | Trello password gửi plaintext trong Slack | ⚠️ Bảo mật nhẹ — nên đổi qua kênh khác | 2026-07-09 02:14 |
| 6 | AI usage disclosure với Chris | ✅ Đã rõ, không vấn đề | 2026-07-08 15:38 |
| 7 | PhucVT 0h Jul 8 (Crystal lang) | 🟡 Cần theo dõi | 2026-07-09 (Sheets recheck) |
| 8 | 3rd-party agent vs MCP-driven decision | 🟡 Chưa quyết, ảnh hưởng scope z3cka repo | 2026-07-08 07:54 |
| 9 | Stripe Connect → production | 🟡 Đang chờ Chris/Art K quyết định account nào dùng | 2026-07-09 02:11 |

## Câu hỏi cần anh xác nhận/quyết định
- P0 có deadline Thứ Năm — anh có muốn em theo dõi sát hơn (check lại trong ngày) cho tới khi qua deadline không?
- Trello password gửi plaintext — có cần nhắc đội đổi cách chia sẻ credential không, hay việc này để đội tự xử lý?
- Chưa kiểm tra lại được liệu FUNDED DEMO AGENT/provenance UI/YouTube fix đã có tiến triển gì trong ms-v3 sau 21:58 Jul-8 hay chưa — team có thể đã bắt tay làm nhưng report chưa thấy cập nhật mới (do vừa mới nhận yêu cầu tối qua).
