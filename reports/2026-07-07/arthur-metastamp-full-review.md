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
| **Nick** (nick@nustechnology.com) | Dev chính, làm việc trực tiếp với Arthur qua Slack, báo cáo **48 giờ/tuần** rất chi tiết | Đây có vẻ là người làm kỹ thuật chính (Stripe, MCP, thanh toán, fingerprint...) — **KHÔNG xuất hiện trong Workstream "Crystal lang"** mà ta đang theo dõi nội bộ! |
| **David Tran** / "David Freelancer" | Danh tính dùng chung — namtv, PhucVT, DuongDN đều có thể đăng nhập bằng tài khoản này | Việc "David Tran" làm (upload track, tạo tài khoản, hỏi yêu cầu Chris) khớp với báo cáo Workstream của PhucVT |
| **Jack** | Người quen cũ của Arthur, giới thiệu Nam Tran cho Arthur | Ít hoạt động, chủ yếu giai đoạn đầu |
| **TienND** | Theo Workstream ghi role "Manager" | Nhưng theo Matrix lại đang code tay (MCP, S3) — cần hỏi lại |
| **"Dave Pelman"** | Nhắc đến 1 lần (6/7) — có vẻ là **executive/CEO thật của khách hàng cuối** | Người sẽ xem demo thứ Năm |

⚠️ **Cần làm rõ ngay: "Nick" là ai trong hệ thống nội bộ của mình?** Nếu đây là nick@nustechnology.com thật (nhân viên NUS), thì **48 giờ/tuần công việc của bạn ấy không hề xuất hiện trong Workstream "Crystal lang"** — nghĩa là có một luồng giờ công/lương hoàn toàn tách biệt, không được theo dõi qua hệ thống chính thức. Cần xác nhận: Nick có được trả lương qua kênh nào khác không, hay đây là lỗ hổng theo dõi giờ công thật sự.

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

## 5. DANH SÁCH VẤN ĐỀ CẦN GIẢI QUYẾT (tổng hợp cuối)

| # | Vấn đề | Mức độ | Có tự sửa được không | Cách xử lý đề xuất |
|---|--------|--------|----------------------|---------------------|
| 1 | **"Nick" (nick@nustechnology.com?) làm 48h/tuần nhưng không xuất hiện trong Workstream "Crystal lang"** — có khoảng trống theo dõi giờ công/lương thật sự | 🔴 Cao | Không — cần xác nhận từ anh | Hỏi trực tiếp Nam Tran: Nick có phải nhân viên NUS không, giờ công của bạn ấy được tính lương qua đâu? |
| 2 | **Yêu cầu che giấu vị trí Việt Nam bằng proxy Mexico** — rủi ro uy tín/pháp lý nếu khách hàng cuối phát hiện việc thuê ngoài không được biết trước | 🔴 Cao | Không — quyết định kinh doanh, không phải lỗi kỹ thuật | Cần anh quyết định có chấp nhận rủi ro này tiếp tục hay không, và có nên yêu cầu Arthur minh bạch hơn với khách |
| 3 | **Secrets thật (.env) dán thẳng vào Matrix chat** — MongoDB, Stripe, Auth0, YouTube API key | 🟡 Trung bình | Có | Nhắc team dùng kênh chia sẻ bảo mật hơn (1Password, Bitwarden...) thay vì paste vào chat, kể cả key test |
| 4 | **7 bug Chris liệt kê tối 6/7** (làm tròn tiền, tên track sai, MCP page treo, URL lỗi double-slash, banner sai, meta tag sai endpoint, chưa xác nhận demo account có tiền thật) | 🔴 Cao — hạn chót thứ Tư | Có, đều là bug kỹ thuật cụ thể | Theo dõi tiến độ fix qua GitHub commit (dùng `gh auth -u davidztv`) — nếu chưa merge trước thứ Tư thì cần escalate ngay |
| 5 | **Khách chưa từng tự tay test sản phẩm** (theo lời Arthur) — toàn bộ QA đổ lên team mình, rủi ro phát hiện lỗi ngay lúc demo | 🟡 Trung bình | Một phần | Đảm bảo có "dry run" đầy đủ trước mỗi lần demo (đã có lịch), và có thể đề xuất Arthur cho khách test thử trước 1 lần |
| 6 | **Phình phạm vi (scope creep) liên tục** — từ "chỉ cần charge tiền" → thêm "audio pocket" → thêm "metadata" → hôm nay thêm "retention/training tiers" | 🟡 Trung bình | Có, đang xử lý tốt | Team đã tự soạn tin từ chối khéo — tiếp tục giữ nguyên tắc "tính năng mới sau demo thứ Năm", không nhận thêm việc miễn phí |
| 7 | **TienND ghi role "Manager" trong Workstream nhưng đang code tay thật (MCP, S3)** — có thể role bị stale hoặc bạn ấy chưa log giờ | 🟢 Thấp | Có | Hỏi trực tiếp Tien xem có cần cập nhật role hoặc log giờ riêng không |
| 8 | **Không có review code (PR) nào cho các thay đổi gần đây** (đã xác nhận trước đó: 0 PR mở, code push thẳng vào `main`) | 🟡 Trung bình | Có | Cân nhắc thêm ít nhất 1 bước review trước khi push lên production, nhất là sát ngày demo CEO |
| 9 | **Demo thứ Năm gặp CEO khách hàng cuối** — mức độ rủi ro/tầm quan trọng rất cao, có thể quyết định có tiếp tục tài trợ dự án hay không | 🔴 Cao (thông tin, không phải lỗi) | — | Theo dõi sát tiến độ 2 ngày tới, cân nhắc hỗ trợ thêm nhân lực nếu cần |

---

## 6. Câu hỏi còn tồn đọng

1. "Nick" là nhân viên NUS thật hay là 1 identity/contractor khác? Giờ công của bạn ấy tính lương qua đâu?
2. Anh có chấp nhận tiếp tục yêu cầu che giấu vị trí (proxy Mexico) hay muốn Nam Tran làm rõ với Arthur?
3. Có cần thiết lập theo dõi định kỳ (tự động) cho cả 5 kênh (2 Matrix + 3 Slack) để không bị bỏ sót tin nhắn nữa không?

*Báo cáo này đọc toàn bộ 190 tin nhắn Matrix + 919 tin nhắn Slack (2/5 kênh liên quan, kênh "random"/"general" không liên quan tới dự án Arthur nên bỏ qua).*
