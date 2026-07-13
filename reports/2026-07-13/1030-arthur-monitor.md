# Arthur / Meta-Stamp V3 — Cập nhật 2026-07-13 (GitHub+Workstream 10:10→10:30, Slack 10:10→13/07 10:21)

## Tóm tắt nhanh
**Slack "Solid Code" đã fix xong (token khôi phục, xác nhận sống qua auth.test) — đã đọc đủ 3 kênh từ 09/07 10:10 đến 13/07 10:21.** Chỉ còn Matrix (2 phòng) chưa check được run này. Tin quan trọng nhất: **item Provenance UI (P0 #2) đã được KHÁCH (Chris Coyne) xác nhận trực tiếp** — nâng lên ✅. Ngược lại, một **deadline khẩn cấp mới xuất hiện**: Chris đang chờ 3 thứ từ Art (green-light test billing, staging URL/key, xác nhận Stripe Connect) để kịp chuẩn bị demo thứ Ba — tính đến cuối cửa sổ đọc (13/07 10:21 giờ VN) Art vẫn CHƯA trả lời, đang loay hoay chọn tài khoản Stripe cho creator payout cùng Nick. **Freeze code: 18:00 thứ Hai giờ PT ≈ 08:00 sáng thứ Ba giờ VN (14/7)** — deadline rất gần. Hạng mục YouTube-ingestion (2c) vẫn KHÔNG có xác nhận ổn định qua chat dù GitHub đã re-apply fix — cần theo dõi tiếp qua "Pillar 1" test 15-video mà Chris tự nói sẽ chạy trước freeze.

## Nguồn bị chặn run này

1. **Matrix (2 phòng)** — vẫn SKIP (chưa refresh token), sẽ check ở lần sau.
2. **Slack "Solid Code"** — ✅ **ĐÃ FIX, đọc thành công** 3 kênh (Arthur DM 0 msg mới, ms-v3 185 msg, msv3-official 25 msg) bằng `conversations.history` qua token vừa khôi phục.

**Lưu ý về `last_run`:** vì Matrix vẫn chưa verify, `arthur_monitor.last_run` trong `config/.monitoring-timelines.json` **giữ nguyên `2026-07-09T10:10:00+07:00`** (không advance) — theo đúng quy tắc của field này (chỉ advance khi cả 5 nguồn đã verify cùng lúc). Lần chạy tới sẽ đọc lại Matrix từ 09/07 nhưng Slack/GitHub/Workstream đã có dữ liệu tới 13/07 rồi (không mất gì, chỉ hơi dư).

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

## Chi tiết mới (Slack "Solid Code" — 3 kênh, 09/07 10:10 → 13/07 10:21)

### 1. Provenance UI (P0 #2) — ✅ KHÁCH ĐÃ XÁC NHẬN, không còn chỉ là "code xong"
David Tran (tài khoản chung) báo trong `msv3-official` 09/07 15:00: đã push + deploy provenance view lên production, field "sound-recording owner" trống thì ẩn đi. **Chris Coyne xác nhận trực tiếp** trong bài tổng kết "Thursday morning status" 09/07 22:14: *"provenance shipped (hide-when-empty was the right call, Nam), banner + meta fixed"*. Đây là xác nhận từ khách, không phải suy đoán từ code — nâng hẳn lên ✅.

### 2. "Hai trụ cột" (Two Pillars) — Chris Coyne định nghĩa lại tiêu chí nghiệm thu (09/07 22:14)
Đây là tin quan trọng nhất chưa từng thấy trước đây — Chris đặt ra bài test cụ thể sẽ **tự tay chạy trước freeze**:
- **Pillar 1 (Video/YouTube):** ingest full kênh YouTube, robust + nhanh. Test nghiệm thu: connect kênh `youtube.com/@MetaStampPockets` (15 video, ~6 phút/video) — mọi video phải thành "pocket" có index, title đúng, source URL, đủ trường attribution, và phải NHANH. Chris tự nói: *"That's the test I will personally run before Monday freeze."* → đây chính là bài test thật cho hạng mục 2c (YouTube fix) — hiện GitHub đã re-apply fix (PR#11) nhưng **chưa có bằng chứng Chris đã chạy test 15-video này**.
- **Pillar 2 (Music):** hiển thị đủ composer/publisher/split% trên mọi pocket khi có trong metadata — phần route thanh toán split thì để sau (roadmap), nhưng hiển thị dữ liệu phải có ngay. David đã làm thêm bước hiển thị rõ split % trong composer field 10/07.
- **Quyết định về hosted-platform (2d):** *"Hosted-platform scope (DISCO/SourceAudio/Spotify): decision Friday. DISCO + SourceAudio first, basic metadata before provenance. Don't build yet."* → đã CÓ quyết định ưu tiên (DISCO+SourceAudio trước) nhưng khách dặn rõ **CHƯA cần build** — không còn là câu hỏi bỏ ngỏ, chỉ là việc chưa tới lượt làm.
- **Freeze code: Thứ Hai 18:00 giờ PT** ≈ **08:00 sáng thứ Ba (14/7) giờ Việt Nam** — không được deploy gì thêm sau mốc này cho tới sau 2 cuộc gọi thứ Ba.

### 3. Chuỗi unblock của Chris (09/07 → 12/07) — cả 4 việc phía khách đều xong
Google OAuth publish (fix lỗi YouTube connect) ✓ 10/07, Auth0 production tenant ✓ 10/07, Stripe live-mode ✓ 10/07 (khách gửi key qua email `chris@meta-stamp.com`, ban đầu Art tìm không thấy — vào spam), thẻ ảo test $20 (qua Privacy.com) kẹt ở bước duyệt doanh nghiệp, **đến 12/07 11:01 mới Active**. Sau đó Art bắt đầu test billing thật với thẻ này.

### 4. 🔴 MỚI, khẩn cấp — Chris đang chờ 3 việc từ Art, tính đến cuối cửa sổ đọc VẪN CHƯA trả lời
Tin nhắn 13/07 04:53 (giờ VN) của Chris trong `msv3-official`, dài và rất cụ thể — anh ấy đang tạo tài khoản creator mới, đăng lại ~12 track demo tối nay, và **giữ (hold) toàn bộ việc chạy harvester test cho đến khi Art trả lời 3 điều**:
   a) Green-light xác nhận đã test xong funded demo agent + live billing (thẻ $20)
   b) Staging URL + 1 customer key ở staging để Casey/Chris tập chạy thử không tốn tiền thật
   c) Xác nhận kế hoạch Stripe Connect cho tài khoản creator mới (tự làm hay để Chris làm)
   Chris còn cảnh báo thêm: key `pkt_` cũ mà console harvester của Casey dùng có thể đã "mồ côi" (orphaned) do Auth0 bị wipe khi tách production/staging — cần Art xác nhận key nào Casey nên dùng.
   **Đến hết cửa sổ đọc (13/07 10:21 giờ VN), Art và Nick vẫn đang loay hoay với bước Stripe Connect** (xem mục 5) — CHƯA gửi 3 câu trả lời này cho Chris.

### 5. Stripe Connect cho creator payout — đang làm dở, bế tắc nhẹ cuối cửa sổ đọc
Sáng 13/07 (09:33-10:21 giờ VN), Nick test xong luồng "customer" (funded demo agent), đang chuyển sang test luồng "creator" (nhận tiền qua Stripe Connect) thì vướng: Stripe Connect yêu cầu nhập thông tin ngân hàng cho chủ tài khoản Stripe (hiện là email cá nhân `art_k@mac.com` của Art) — Art không muốn thông tin ngân hàng của khách nằm trong tài khoản Stripe do Art đứng tên, hỏi có thể đổi sang dùng tài khoản Stripe khác (của Chris, hoặc của NUS) không. Nick giải thích Stripe Connect độc lập với API key nên đổi tài khoản không phức tạp thêm, nhưng cần biết Chris có online để tự làm không. Art chốt: *"Chris is aware of Nam/David, so the NUS connection is not a problem... if we can use his account to connect it to metastamp_creator+2 then I think that is the solution, no?"* — **tin nhắn cuối cùng trong cửa sổ đọc là Nick trả lời "Let me ask Nam" (10:21)**, chưa có kết luận.

### 6. Báo cáo giờ làm hàng tuần của David Tran (khớp chéo với Workstream)
Báo cáo tuần 06/07-10/07 trong `msv3-official`: tổng **41 giờ** — khớp đúng với số Workstream đã ghi nhận ở trên (PhucVT 41h). Xác nhận chéo tốt, không có gì bất thường.

## BẢNG THEO DÕI (cập nhật)
| # | Vấn đề | Trạng thái | Link | Cập nhật lần cuối |
|---|--------|-----------|------|---------------------|
| 1 | Chris demo Jul-8 sáng — kết quả | ✅ Xong, khách đồng ý tiếp tục nhưng thất vọng thiếu billing+3rd-party agent | (Matrix, xem báo cáo gốc) | 2026-07-08 21:58 |
| 2a | P0 — Funded demo agent (tài khoản có thẻ sẵn) | 🟡 Thẻ $20 Active từ 12/07 11:01, Art đang test billing thật 13/07 sáng — chưa có xác nhận "đã test xong" gửi cho Chris | [Chris: card active](https://solid-code-team.slack.com/archives/C0BEPFBLGJV/p1783828860403399) | 2026-07-13 10:21 |
| 2b | P0 — Provenance UI trên pocket view | ✅ **Khách (Chris) xác nhận trực tiếp** 09/07: "provenance shipped (hide-when-empty was the right call)" | [Chris confirm](https://solid-code-team.slack.com/archives/C0BEPFBLGJV/p1783610058773399) · [David deploy](https://solid-code-team.slack.com/archives/C0BEPFBLGJV/p1783584059779739) | 2026-07-09 22:14 |
| 2c | P0 — YouTube channel connect fix | 🔴 **Vẫn chưa xác nhận ổn định.** GitHub re-apply fix (PR#11, 13/07 02:33) nhưng Chris tự đặt bài test nghiệm thu riêng (Pillar 1: ingest kênh 15-video `@MetaStampPockets`, tự tay chạy trước freeze) — CHƯA thấy bằng chứng đã chạy/pass qua Slack | GitHub PR #9,#10,#11 · (xem mục "Hai trụ cột" ở trên) | 2026-07-13 10:21 |
| 2d | P0 — Spotify/DISCO/Dropbox có hoạt động như "pocket" không? | 🟢 **Đã có quyết định của khách** (09/07): ưu tiên DISCO+SourceAudio trước, nhưng khách dặn rõ "Don't build yet" — không còn là câu hỏi mở, chỉ chưa tới lượt làm | (Chris, msv3-official 09/07 22:14) | 2026-07-13 10:21 |
| 3 | P1 (14/7) — T&C checkbox, catalog export | 🟡 T&C checkbox đã deploy staging (10/07), đang test trước khi lên production. MCP UI mới (Live Rail) cũng đã thêm | (David weekly report, msv3-official) | 2026-07-10 17:29 |
| 4 | P2 — metadata tiers, detection layer hook | 🟡 Chỉ cần spec, chưa build — không có tin mới | — | 2026-07-08 21:58 |
| 5 | Trello password gửi plaintext trong Slack | ⚠️ Chưa xác nhận đã đổi — không có tin mới cửa sổ này | — | 2026-07-09 02:14 |
| 6 | AI usage disclosure với Chris | ✅ Đã rõ, không vấn đề | — | 2026-07-08 15:38 |
| 7 | PhucVT 0h Jul-8 (Crystal lang) | ✅ **Đã rõ, xác nhận chéo thêm lần nữa** — Workstream 41h + báo cáo tuần của David tự báo cũng đúng 41h | Workstream + Slack weekly report | 2026-07-13 10:21 |
| 8 | 3rd-party agent vs MCP-driven decision | 🟢 **Đã build + deploy** lên Railway (`3rdagent-production.up.railway.app`), Nick đang test tích cực (vướng SambaNova rate-limit, không critical) | (ms-v3, 09/07 16:38) | 2026-07-09 17:07 |
| 9 | Stripe Connect → production | 🔴 **Đang làm dở, bế tắc nhẹ cuối cửa sổ đọc** — vướng chọn tài khoản Stripe nào để nhận bank details cho creator payout (Art không muốn dùng tài khoản cá nhân `art_k@mac.com`). Kết thúc bằng "Let me ask Nam", chưa có quyết định | [start test](https://solid-code-team.slack.com/archives/C0B4G8USU3D/p1783910158562449) · [blocked cuối](https://solid-code-team.slack.com/archives/C0B4G8USU3D/p1783912869364969) | 2026-07-13 10:21 |
| 10 | Slack "Solid Code" token bị mất do lỗi decrypt-secrets.sh | ✅ **ĐÃ FIX** — token khôi phục, verify sống qua auth.test (user=namtv), đọc lại được cả 3 kênh | — | 2026-07-13 (run này) |
| 11 | YouTube-ingestion revert saga (xem 2c) | 🔴 Theo dõi tiếp — gộp vào 2c, chờ Chris tự chạy test Pillar 1 trước freeze | GitHub | 2026-07-13 10:21 |
| 12 | **MỚI** — Freeze code Thứ Hai 18:00 PT ≈ 08:00 sáng Thứ Ba (14/7) giờ VN | 🟡 Sắp tới, không được deploy gì sau mốc này tới sau 2 cuộc gọi Thứ Ba | (Chris, msv3-official 09/07 22:14) | 2026-07-13 10:21 |
| 13 | **MỚI** — Chris chờ 3 việc từ Art (green-light billing test, staging URL/key, xác nhận Stripe Connect) để chuẩn bị demo Thứ Ba, đang HOLD toàn bộ harvester test | 🔴 **Khẩn cấp** — tính đến cuối cửa sổ đọc (13/07 10:21) Art CHƯA trả lời Chris | [Chris 3-asks](https://solid-code-team.slack.com/archives/C0BEPFBLGJV/p1783893209698559) | 2026-07-13 10:21 |
| 14 | **MỚI** — Auth0 production bị wipe khi tách production/staging → key `pkt_` cũ dùng cho harvester demo console của Casey có thể bị "mồ côi" | 🟡 Cần Art xác nhận key nào Casey nên dùng trước Thứ Ba | (Chris, msv3-official 13/07 04:53, cùng link mục 13) | 2026-07-13 10:21 |

## Câu hỏi cần anh xác nhận/quyết định
- **Khẩn cấp nhất:** Chris đang chờ Art trả lời 3 việc (mục 13) để chuẩn bị demo Thứ Ba — tính đến 13/07 10:21 giờ VN vẫn chưa trả lời, mà freeze code chỉ còn ~22 tiếng nữa (08:00 sáng 14/7). Anh có muốn nhắc trực tiếp cho Art/Nick không?
- Bài test nghiệm thu "Pillar 1" (ingest kênh YouTube 15-video) mà Chris tự nói sẽ tự tay chạy trước freeze — chưa thấy bằng chứng đã chạy qua Slack. Nếu fix PR#11 (re-apply 13/07 02:33) chưa kịp test kỹ mà Chris chạy test này trước freeze, rủi ro lộ lỗi ngay trước mắt khách.
- Stripe Connect cho creator payout đang bế tắc nhẹ (mục 9) — cần Nam quyết định dùng tài khoản Stripe nào (Art/Chris/NUS) để Nick tiếp tục test.
- Matrix (2 phòng) vẫn chưa check được run này — cần refresh token khi máy rảnh để lần sau đọc đủ 5/5 nguồn.
