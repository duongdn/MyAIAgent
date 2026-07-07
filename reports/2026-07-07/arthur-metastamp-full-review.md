# Arthur / Meta-Stamp V3 — Tổng hợp toàn bộ (29/4 → 07/7/2026)

**Nguồn:** Matrix (2 phòng: "Arthur - Meta-Stamp" + phòng kỹ thuật `!QEbdvaMJkTurMpRPIX`) + Slack workspace `solid-code-team.slack.com` (3 kênh: `mpdm-art_k--jack--namtv-1`, `ms-v3`, `msv3-official`).

---

## 1. Dự án này thực chất là gì

**Đây KHÔNG phải dự án nội bộ NUS thông thường — đây là kèo Nam Tran (namtv) tự nhận qua quan hệ cá nhân với "Jack" và "Arthur" (Art K), rồi thuê team NUS làm ngầm phía sau.**

- Bắt đầu từ **29/4**: Arthur giới thiệu bản thân là CTO, nói rõ mô hình kinh doanh: *"Tôi sẽ nhận hợp đồng giá cao dưới tên tôi, rồi cho 1 người của team các bạn làm phần lớn công việc ở hậu trường. Nếu khách trả giá cao thì tôi đứng tên; nếu khách muốn giảm giá thì tôi giới thiệu 'một trong những dev giỏi nhất tôi từng làm việc cùng'."*
- Team NUS làm bài đánh giá kỹ năng (skills.md, thang điểm 1-5): mạnh Python, PHP/Laravel, Ruby on Rails, AWS, Stripe; **yếu toàn bộ mảng "AI-engineering core"** (agent, LangChain, RAG); chưa có kinh nghiệm Solidity/crypto.
- **15/5**: Arthur nhận được 1 hợp đồng thật từ khách hàng "Chris" — dự án ban đầu chỉ **80 giờ** (có thể co giãn tới 100h), khách "không phải dev", đã tự "vibe-code" một phần bằng AI nên code có nhiều lỗ hổng.
- **Sản phẩm là gì:** "Meta-Stamp V3" — nền tảng cho phép chủ sở hữu nội dung (nhạc, video) upload tài sản, hệ thống tạo "fingerprint", rồi AI agent (Claude, ChatGPT...) chỉ được phép kéo nội dung qua **MCP endpoint có tính phí** — không có API key thì trả về **HTTP 402 (Payment Required)**, có key thì tự động trừ tiền qua Stripe, chia doanh thu 85/15 cho người tạo nội dung. Đây là nền tảng "content licensing trả theo lượt AI truy cập", không phải app demo chơi chơi.

---

## 2. Ai là ai (rất dễ nhầm)

| Tên hiển thị | Là ai | Vai trò |
|---|---|---|
| **Art K** | Arthur | Đầu mối kỹ thuật chính, nhận job từ Chris, chuyển tiếp cho team |
| **Chris (Chris Coyne)** | Chris | Người quản lý dự án phía khách, chuyển tiếp yêu cầu từ 1 sếp cấp cao hơn ("SVP") |
| **Nick = TienND** (Tien Nguyen) | ✅ Đã xác nhận (anh Dương) — "Nick" trên Slack chính là TienND | Người làm kỹ thuật chính thật sự (Stripe, MCP, thanh toán, fingerprint...), báo cáo trực tiếp cho Arthur **40-48 giờ/tuần** rất chi tiết (breakdown từng ngày). Nhưng Workstream "Crystal lang" chỉ ghi role "Manager" cho TienND, **không hề có giờ công nào được log** — xem vấn đề #1 bên dưới. |
| **David Tran** / "David Freelancer" | Danh tính dùng chung — namtv, PhucVT, DuongDN đều có thể đăng nhập bằng tài khoản này | Việc "David Tran" làm (upload track, tạo tài khoản, hỏi yêu cầu Chris) khớp với báo cáo Workstream của PhucVT |
| **Jack** | Người quen cũ của Arthur, giới thiệu Nam Tran cho Arthur | Ít hoạt động, chủ yếu giai đoạn đầu |
| **"Dave Pelman"** | Nhắc đến 1 lần (6/7) — có vẻ là **executive/CEO thật của khách hàng cuối** | Người sẽ xem demo thứ Năm |

🔴 **Vấn đề thật sự (đã xác nhận danh tính, không còn là câu hỏi mở):** TienND làm việc trực tiếp với Arthur dưới tên "Nick" trên Slack, báo cáo tỉ mỉ 40-48 giờ/tuần bằng tiếng Anh (breakdown từng task, từng ngày) — nhưng trong Workstream nội bộ "Crystal lang", TienND chỉ được gắn role "Manager" và **không log một giờ nào**. Đây là khoảng trống theo dõi giờ công/lương thật sự cần xử lý, không phải nhầm lẫn danh tính.

---

## 3. Diễn biến quan trọng theo mốc thời gian

**19/5 – 1/6:** Bắt đầu code thật. Có kế hoạch chi tiết "MVP Level 4" chia 10 task lớn (~85-95 giờ tổng), mỗi task có budget giờ riêng — Task 1-7 xong đúng tiến độ trong ~2 tuần đầu.

**9/6:** Khách (qua Arthur) yêu cầu thêm **40 giờ việc mới** (Upload page, Asset page, đổi mật khẩu...) ngoài kế hoạch ban đầu. Nick tự cảnh báo: *"Testing: chỉ còn khoảng 5 giờ, tôi lo là không đủ để test cho kỹ."* — rủi ro thiếu thời gian test đã được chính dev nêu ra từ sớm.

**10/6:** Nick bị ốm, nghỉ 1 ngày (báo trực tiếp qua Slack cho Arthur).

**16/6:** Arthur bực mình chất vấn: *"Hay là code dở tệ, hay là bạn chẳng test gì cả?"* — mâu thuẫn thật về chất lượng đã từng xảy ra, không phải lần đầu.

**26/6:** Arthur nói rõ ràng buộc ngân sách: *"Do ngân sách, chúng ta không muốn đi theo phương án 3 tuần/120 giờ."* — ngân sách bị siết chặt, mọi lựa chọn kỹ thuật đều bị cân đo theo tiền.

**2/7 (bắt đầu tuần chạy nước rút cho demo 8/7):**
- Arthur xác nhận: dự án phải "production ready" cho khách nhạc tên **AllVerified**.
- Nick hỏi thẳng: *"Chris đã test tính năng nào tụi mình deploy chưa? Ổng có phản hồi gì không? Tôi không thấy có user thật nào được đăng ký ngoài tài khoản test của tôi."* → Arthur trả lời: *"Không, Chris không rành kỹ thuật nên việc test là trách nhiệm của mình, ổng chỉ mặc định là nó chạy."* — **rủi ro rất lớn: khách hàng chưa từng tự tay dùng thử sản phẩm**, toàn bộ trách nhiệm QA nằm ở team mình.

**4-6/7:** Chris gửi file nhạc thật (catalog Spotify "Float" của Calm City, 8 track + "Dreamscapes"), yêu cầu build tính năng upload AIFF, metadata (rights holder, source URL). Nick/David hoàn thành tính năng này, deploy Production để Arthur test.

**Đêm 6/7 (giờ VN), 23:17 — TIN NHẮN QUAN TRỌNG NHẤT: Chris gửi "big picture" + danh sách 7 lỗi bắt buộc phải sửa trước thứ Tư:**

> *"TIÊU CHUẨN: Dave Pelman (giám đốc khách hàng cuối) phải tự mình chạy được bài test này."* Kịch bản: khách tự upload 1 file nhạc (WAV/MP3/AIFF hoặc URL từ DISCO/YouTube/Spotify) → hệ thống tạo "pocket" → AI agent chạm tường phí → 402 → thêm key → pull thành công → **ví tiền của khách tăng lên ngay trên màn hình, live.**

**Lịch demo leo thang theo mức độ quan trọng:**
- Thứ Hai (hôm nay giờ họ): chỉ Arthur + Chris kiểm tra 2 lần
- **Thứ Tư: gặp 1 executive** (Chris gọi là "an executive")
- **Thứ Năm: gặp CEO** — đây là buổi demo quyết định, có thể chốt tài trợ dự án

**7 lỗi cụ thể Chris liệt kê (bắt buộc sửa trước thứ Tư):**
1. Dashboard/Wallet làm tròn sai — $0.0025 hiển thị thành $0.00
2. Tên track hiển thị sai — thẻ pocket hiện URL S3 thay vì tên bài hát; MCP catalog trả về title/description rỗng; `pull_content` trả nhầm URL Spotify làm Title
3. Trang MCP trong sidebar bị treo, không load được
4. URL đăng ký bị lỗi double-slash: `...app//customer-signup`
5. Banner "Hoàn tất thiết lập tài khoản" vẫn hiện dù đã kết nối Stripe rồi
6. Meta tag quảng cáo sai endpoint (`/api/v1/mcp/pockets` thay vì `/mcp` thật)
7. Cần xác nhận tài khoản demo agent đã được nạp tiền + gắn thanh toán thật — **kiểm chứng, không giả định**

**Yêu cầu UI:** Không dùng terminal ngày demo — cần 1 màn hình duy nhất tường thuật trực quan: request → 402 hiện to → thêm key → pull thành công (hiện luôn thời gian phản hồi 27ms) → ví tiền tăng real-time.

**7/7 (hôm nay) — phát sinh tranh cãi phạm vi (scope creep) từ CẢ HAI PHÍA:**
- Arthur chất vấn ngược lại chính sếp của Chris: *"Ông ấy (SVP) có từng nhắc tới gói 'retention và training' trước đây không? Cái này có nằm trong MVP ban đầu hay giờ mới thảy ra phút chót?"* — Arthur cũng đang khó chịu với chính nội bộ khách hàng.
- Team mình (David Tran/Nam Tran) xác nhận đúng: **chưa từng nghe nhắc tới gói này**, và soạn tin nhắn từ chối khéo gửi Chris: *"Chúng tôi hiện chưa có gói retention/training, chỉ có gói retrieval. Đây không phải thứ có thể build trong 1-2 ngày cùng lúc mọi thứ khác."* — **team xử lý tình huống này khá tốt, đã chặn được yêu cầu phình phạm vi phút chót.**
- Nhưng đồng thời khách VẪN yêu cầu thêm cái mới thật: "new MCP UI with metadata" ngay trong hôm nay.
- Cuộc gọi "dry run" (chạy thử trước khi demo thật) lúc 10h sáng giờ Thái Bình Dương hôm nay — Nam Tran quyết định tham gia trực tiếp cùng Arthur.

---

## 4. Rủi ro bảo mật / vận hành cần lưu ý

- **Yêu cầu che giấu vị trí thật:** Arthur từng dặn: *"Đừng để lộ bất cứ gì thuộc về khách nếu không dùng proxy Mexico... kết nối qua mini-PC của tôi vì nó có IP của tôi, hoặc ít nhất dùng proxy đặt tại Mexico City."* Arthur đang ở "San Gaspar" gần Valle de Bravo, Mexico. → **Team đang được yêu cầu che giấu việc công việc thực tế đang làm từ Việt Nam**, để khách hàng cuối tin rằng Arthur (ở Mexico) trực tiếp làm. Đây là rủi ro pháp lý/uy tín nếu bị phát hiện.
- **Secrets dán thẳng vào chat (3/7):** toàn bộ file `.env` (MongoDB URI, Stripe test key, Auth0 client secret, YouTube API key, Stripe webhook secret...) được dán trực tiếp vào phòng Matrix dạng plaintext.
- Team dùng chung 1 tài khoản Claude Code/Codex/Cursor qua mini-PC của Arthur — không tách biệt theo người dùng.

---

## 4b. Link Slack để anh tự confirm

| Vấn đề | Link |
|---|---|
| Yêu cầu proxy Mexico (Arthur, 19/5) | https://solid-code-team.slack.com/archives/C0B0BG90AUB/p1779154019589459 |
| Nick lo thiếu thời gian test (9/6) | https://solid-code-team.slack.com/archives/C0B4G8USU3D/p1780995774652229 |
| Arthur nghi ngờ chất lượng "buggy as hell" (16/6) | https://solid-code-team.slack.com/archives/C0B4G8USU3D/p1781580208321849 |
| Ngân sách 120h (26/6) | https://solid-code-team.slack.com/archives/C0B4G8USU3D/p1782452837001879 |
| Nick tự báo "48 hours this week" (3/7) | https://solid-code-team.slack.com/archives/C0B4G8USU3D/p1783074537638599 |
| Chris — big picture + 7 bugs (6/7 23:17) | https://solid-code-team.slack.com/archives/C0B4G8USU3D/p1783379830570709 |
| "Attribution = half the test" (7/7) | https://solid-code-team.slack.com/archives/C0B4G8USU3D/p1783388123033279 |
| Nick đang fix metadata (7/7) | https://solid-code-team.slack.com/archives/C0B4G8USU3D/p1783391050402099 |
| Arthur chốt bỏ qua retention/training (7/7) | https://solid-code-team.slack.com/archives/C0B4G8USU3D/p1783394853204339 |

*(Cần đăng nhập `solid-code-team.slack.com` bằng tài khoản namtv/David để mở được link.)*

⚠️ **Vấn đề #1 (TienND 48h) cần làm rõ lại:** Em quét lại kỹ toàn bộ 18 project trong Workstream (cả tuần này lẫn tuần trước) — **không tìm thấy dòng log giờ nào của TienND**. Con số "48 giờ/tuần" duy nhất em thấy là chính Nick TỰ báo cho Arthur qua Slack (link ở trên), không phải log trong Workstream nội bộ. Anh check ở đâu ra 48h — Workstream web UI (project nào?) hay đang nhắc tới con số Nick tự báo trên Slack? Nếu là Workstream thật thì có thể em query nhầm project/quyền hạn API bị giới hạn hơn UI.

---

## 5. BẢNG THEO DÕI (living tracker — cập nhật mỗi lần check, không viết lại từ đầu)

**Trạng thái:** 🔴 Mở (chưa làm gì) | 🟡 Đang xử lý | 🟢 Xong, chờ anh xác nhận | ✅ Anh đã xác nhận xong

| # | Vấn đề | Mức độ | Trạng thái | Cập nhật gần nhất | Cách xử lý / theo dõi tiếp |
|---|--------|--------|------------|---------------------|------------------------------|
| 1 | TienND ("Nick") làm 40-48h/tuần thật (theo Slack) — nhưng em quét API không thấy log trong Workstream "Crystal lang" hay bất kỳ project nào khác | 🔴 Cao | 🟡 Đang làm rõ | 07/7 11:56 — anh nói đã check thấy 48h, em quét API 18 project không thấy | Cần anh confirm: check ở đâu ra 48h (Workstream UI project nào, hay số Nick tự báo Slack)? Có thể API bị giới hạn quyền so với UI |
| 2 | Arthur yêu cầu che giấu vị trí VN bằng proxy Mexico | 🔴 Cao | 🔴 Mở | 07/7 11:46 | Chờ anh quyết định: chấp nhận tiếp tục hay yêu cầu Nam Tran làm rõ với Arthur |
| 3 | Secrets thật (.env) dán thẳng vào chat (Matrix + có thể cả Slack) | 🟡 TB | 🔴 Mở | 07/7 11:46 | Nhắc team dùng kênh bảo mật hơn thay vì paste vào chat |
| 4a | Bug #1 — Dashboard/Wallet làm tròn sai ($0.0025→$0.00) | 🔴 Cao (hạn thứ Tư) | 🔴 Mở | 07/7 10:27 (tin cuối) | Theo dõi qua GitHub commit |
| 4b | Bug #2 — Tên track sai (URL S3 thay vì tên bài, title rỗng) — **= "attribution", ½ bài test theo Chris** | 🔴 Cao (hạn thứ Tư) | 🟡 Đang xử lý | 07/7 10:24 — Nick: "I'm currently fixing the metadata issue" | Rights holder + Source URL đã xong & test pass (06/7 18:07). Còn thiếu: tên track hiển thị đúng. Chưa có tin xác nhận hoàn tất |
| 4c | Bug #3 — Trang MCP sidebar bị treo | 🔴 Cao (hạn thứ Tư) | 🟡 Đang xử lý | 07/7 09:43 — David đang bàn thiết kế lại toàn bộ trang MCP.tsx mới với Chris | Sẽ được giải quyết cùng lúc build trang MCP mới |
| 4d | Bug #4 — URL double-slash | 🔴 Cao (hạn thứ Tư) | 🔴 Mở | 07/7 10:27 | Theo dõi qua GitHub commit |
| 4e | Bug #5 — Banner "hoàn tất setup" hiện sai | 🔴 Cao (hạn thứ Tư) | 🔴 Mở | 07/7 10:27 | Theo dõi qua GitHub commit |
| 4f | Bug #6 — Meta tag sai endpoint | 🔴 Cao (hạn thứ Tư) | 🔴 Mở | 07/7 10:27 | Theo dõi qua GitHub commit |
| 4g | Bug #7 — Xác nhận demo account có tiền thật | 🔴 Cao (hạn thứ Tư) | 🔴 Mở | 07/7 10:27 | Cần verify trước dry run |
| 5 | Khách (Chris/Dave Pelman) chưa từng tự tay test sản phẩm | 🟡 TB | 🔴 Mở (rủi ro thường trực) | — | Đề xuất Arthur cho khách test thử ít nhất 1 lần trước demo thật |
| 6 | Scope creep liên tục (charge tiền → audio pocket → metadata → retention/training) | 🟡 TB | ✅ Xử lý tốt, không cần theo dõi thêm | 07/7 10:27 — Arthur đã chốt bỏ qua retention/training | Không cần hành động thêm |
| 7 | Không có code review (0 PR mở, push thẳng `main`) | 🟡 TB | 🔴 Mở | (từ lần check trước) | Cân nhắc thêm review trước demo CEO |
| 8 | Cuộc gọi "dry run" với Chris | 🔴 Cao | 🔴 **Chưa diễn ra** | 06/7 23:17 hẹn lịch | Hẹn "10am PT" = **~0h đêm nay (rạng sáng 8/7 giờ VN), còn ~12 tiếng nữa** — chưa có tin xác nhận đã họp hay dời lịch |
| 9 | Demo thứ Năm gặp CEO khách hàng cuối | 🔴 Cao (thông tin) | — | — | Theo dõi sát 2 ngày tới |

---

## 6. Câu hỏi cần anh xác nhận/quyết định

1. TienND (Nick) làm 40-48h/tuần cho Arthur — giờ này có được tính lương qua kênh nào không, hay cần bắt đầu log vào Workstream?
2. Anh có chấp nhận tiếp tục yêu cầu che giấu vị trí (proxy Mexico) hay muốn Nam Tran làm rõ với Arthur?
3. Có cần thiết lập theo dõi định kỳ (tự động) cho cả 5 kênh (2 Matrix + 3 Slack) để không bị bỏ sót tin nhắn nữa không?

*Báo cáo này đọc toàn bộ 190 tin nhắn Matrix + 919 tin nhắn Slack (3/5 kênh liên quan, kênh "random"/"general" không liên quan tới dự án Arthur nên bỏ qua). Bảng mục 5 là tracker sống — lần check tiếp theo chỉ cần cập nhật cột "Trạng thái"/"Cập nhật gần nhất", không viết lại toàn bộ.*
