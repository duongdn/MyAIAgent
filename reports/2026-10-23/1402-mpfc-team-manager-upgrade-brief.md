# MPFC — Team Manager Upgrade Brief (Saul, 22/10/2026)

## Tóm tắt nhanh
Saul gửi PDF 10 trang: **nâng cấp Team Manager trên web** (không làm lại từ đầu). Sau nâng cấp, Director giao course/session/tài liệu club cho **cả coach lẫn player**, theo dõi bài nào đã được dạy, và đọc reflection của coach.
- **Fix now:** việc 1 và 2 xong trên server mới (nhánh `live-php83`, commit `93d5b1bc5`). Việc 3 phía web không cần sửa: login và app usage đã có endpoint ghi sẵn, app mới chỉ cần gọi `otherpages/app_usage`. Đã nhắn Tien 14:54 ([msg](https://mypersonalfoo-lbq2917.slack.com/archives/C057Y0CUKFC/p1792742070221219)).
- **Phần còn lại:** 5 phase, khoảng **20–23 ngày dev**.
- **Concern lớn nhất:** brief nói league dưới 6 người **gộp vào league cha**, mâu thuẫn với câu trả lời ý 5 đã gửi Tien.
- **Đã báo trong room** lúc 13:50 ([msg](https://mypersonalfoo-lbq2917.slack.com/archives/C057Y0CUKFC/p1792738213153739)): đã nhận PDF và đã fix 2 việc.

## Nội dung brief (dịch gọn)
| # | Mục | Yêu cầu chính |
|---|-----|---------------|
| 1 | Fix now | (1) Bật mặc định "Requires Approval" khi upload, cho mọi club và club mới. (2) Ngày dạng UK `22 Oct 2026`, theo quốc gia của club. (3) Feed dữ liệu từ app (Last App Login đang trống); khi chưa có thì hiện "—" |
| 2 | Menu 5 mục | Team stats · Team Manager · Plans · Leagues · Team Library (duyệt clip + Player of the Week). Manager/admin chuyển sang trang settings |
| 3 | Team Manager | Nút chuyển Players / Coaches; mỗi tài khoản có role player/coach/manager.<br>**Players:** cột lần cuối vào app, session/XP tuần; đỏ khi không vào app ≥7 ngày; bulk: set plan, IDP target, đổi team key, ẩn khỏi league.<br>**Coaches:** cột plan/đã dạy/reflection; đỏ khi chưa dạy gì trong block; bulk: set plan, nhắc nhở.<br>Nút Add coach, CSV thêm cột role. Chưa có dữ liệu thì hiện "—", không hiện 0 |
| 4 | Team key cho coach | Coach dùng chung team key với player.<br>Coach nằm trong key của đội nào thì là coach đội đó: được đặt IDP target, app hiện "Set by Coach Dan".<br>Plan đi theo key + nút chuyển (chỉ player hoặc chỉ coach) |
| 5 | Set training plans | Độ dài 1/2/4 tuần hoặc tùy chọn.<br>Chọn nội dung qua ô tìm kiếm.<br>Upload tài liệu club (PDF/video), lưu 1 lần dùng nhiều lần.<br>Ghi chú 1 dòng; tùy chọn yêu cầu reflection hoặc bắt buộc chia sẻ.<br>Giao cho 1 người, các dòng đã tick, hoặc cả team key.<br>Bảng "Current and past plans" có nút Edit. Plan cũ vẫn chạy |
| 6 | Ô tìm kiếm | Gõ để tìm, kết quả nhóm theo session / session plan / course / tài liệu.<br>Lọc theo loại, độ tuổi, Focus, Favourites.<br>Duyệt course → module → session.<br>Chỉ hiện nội dung người nhận có quyền xem.<br>Dùng chung catalogue với app |
| 7 | Plans + Coaching log | Tiến độ ("4 of 6 delivered"). Trạng thái: Not opened / Opened / Delivered / Completed.<br>Nút Remind: push + email, tối đa 1 lần mỗi 3 ngày.<br>Tab Coaching log: rating Good/OK/Poor + reflection; private thì chỉ hiện "Private".<br>Lọc link, số điện thoại, email, từ tục |
| 8 | Leagues | Tạo từ 1 hoặc nhiều team key, **chỉ player**. Luôn có league toàn club.<br>Công tắc ẩn từng player (vẫn được cộng XP).<br>**Tối thiểu 6 người, ít hơn thì gộp vào league cha.**<br>Reset thứ Hai 00:00 giờ địa phương; app hiện top 5 + dòng của player.<br>Chỉ hiện tên + chữ cái đầu của họ.<br>Không bot, **không coach** |
| 9 | Feed app ↔ web | Server-to-server có ký.<br>**App → web:** login, session hoàn thành, mở plan, coach đã dạy, reflection.<br>**Web → app:** plans, team keys/roles, leagues + người bị ẩn, tài liệu club.<br>**Web không tự tính XP** |

## BẢNG THEO DÕI
| # | Việc | Trạng thái | Phụ thuộc / ghi chú |
|---|------|-----------|---------------------|
| 1 | Fix now: Requires Approval mặc định cho mọi club | ✅ xong, server mới `live-php83` `93d5b1bc5` | Đã set lại 5 club (2 club 1157, 150 trước để Active) |
| 2 | Fix now: ngày UK `22 Oct 2026` | ✅ xong `93d5b1bc5`, ô chọn ngày đã test trên Chrome | Chưa đổi theo quốc gia, mọi club đều UK |
| 3 | Fix now: dữ liệu app (Last App Login, app usage) | ⏳ chờ Tien. Phía web không cần sửa | `auth/generate_auth_cookie` đã ghi login (60–80 user mỗi ngày). Team Stats đọc `mm_app_usage`, dữ liệu do `otherpages/app_usage` ghi. Đã hỏi Tien app mới có gọi endpoint này không ([msg](https://mypersonalfoo-lbq2917.slack.com/archives/C057Y0CUKFC/p1792742070221219)). Endpoint `appfeed` (HMAC) đã gỡ (`600721777`). Phần "—" thay cho 0 làm cùng các cột mới ở Phase 1 |
| 4 | Phase 1: role + Players/Coaches + team key cho coach + menu 5 mục | ⏳ todo, 4–5 ngày | Phải làm trước Leagues |
| 5 | Phase 2: Set plan mới + ô tìm kiếm + upload tài liệu club | ⏳ todo, 5–6 ngày | Catalogue chung với app; giới hạn file chờ Saul |
| 6 | Phase 3: Plans + Remind + Coaching log | ⏳ todo, 4 ngày | Push cần Tien; email làm được ngay |
| 7 | Phase 4: Leagues (gộp vào cha, bỏ coach, tên + chữ đầu, ẩn) | ⏳ todo, 3 ngày | Cần role (Phase 1) |
| 8 | Phase 5: feed server-to-server có ký | ⏳ todo, 3 ngày | Thống nhất với Tien |
| 9 | Message Slack báo đã nhận PDF + đã fix 2 việc | ✅ đã gửi 13:50 | [msg](https://mypersonalfoo-lbq2917.slack.com/archives/C057Y0CUKFC/p1792738213153739) |

## Concern
| # | Concern | Mức |
|---|---------|-----|
| 1 | League dưới 6 người gộp vào league cha, **trái với câu trả lời ý 5 đã gửi Tien** (fallback toàn club). Cần đính chính và sửa API | 🔴 |
| 2 | Chưa có role, nên league toàn club có thể đang gồm cả coach/manager | 🔴 |
| 3 | Feed phải server-to-server có ký, trong khi endpoint IDP/League hiện tại dùng cookie của player | 🟠 |
| 4 | "Web không tự tính XP": rà lại `session_complete`, chỉ lưu XP app gửi | 🟠 |
| 5 | Ô tìm kiếm phải dùng chung catalogue với app; catalogue đó lấy từ WP hay từ API của Tien? | 🟠 |
| 6 | Upload video cho tài liệu club: nơi lưu và dung lượng | 🟠 |
| 7 | League đang trả `display_name`, chưa chắc là tên + chữ cái đầu của họ | 🟡 |
| 8 | Lọc nội dung theo quyền của từng người nhận nặng khi giao cả team key | 🟡 |

## Câu hỏi cần anh xác nhận/quyết định
- **Saul:**
  1. Tài liệu club cho phép loại file nào, dung lượng tối đa bao nhiêu? Đề xuất PDF ≤ 20MB, MP4 ≤ 200MB.
  2. Giữ hay bỏ "training clocks" cũ?
  3. Reflection mặc định có chia sẻ không?
  4. Có đồng ý thứ tự làm việc không?
  5. Có club nào không ở UK không?
- **Tien:**
  0. App mới có gọi `otherpages/app_usage` không? (đã hỏi 14:54)
  1. Đính chính chuyện league cha.
  2. Thống nhất cách ký và danh sách event của feed.
  3. Catalogue nội dung lấy từ đâu?
  4. App nhận push cho nút Remind thế nào?

Plan chi tiết: `plans/261023-1327-mpfc-team-manager-upgrade/plan.md`
