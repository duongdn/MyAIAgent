# MPFC — Team Manager Upgrade Brief (bản dịch + concern + task)

Nguồn: `Team Manager Upgrade — Web Developer Brief.pdf` (Saul, 22/10/2026, 10 trang)
Plan chi tiết: `plans/261023-1327-mpfc-team-manager-upgrade/plan.md`

---

## Phần A — Dịch nội dung brief

**Mục tiêu:** nâng cấp Team Manager hiện có trên mypersonalfootballcoach.com, không viết lại từ đầu. Sau nâng cấp, Director (giám đốc club) làm được 3 việc:
- giao course, session và tài liệu club cho cả coach lẫn player;
- theo dõi nội dung nào đã được dạy;
- đọc reflection (bài tự đánh giá) của coach.

### 1. Fix now — sửa ngay, không chờ phần khác
1. **Bật duyệt upload mặc định cho mọi club.**
   - Ở Team Stats, toggle "Default upload status" (Requires Approval) đang tắt.
   - Clip của đội phải được coach duyệt thì trẻ khác mới xem được.
   - Bật cho mọi club, và đặt mặc định là bật cho club mới.
2. **Định dạng ngày UK.** Set training plans đang hiện `10/22/2026`. Đổi thành `22 Oct 2026`, theo quốc gia của club.
3. **Dữ liệu app trên dashboard.**
   - Last App Login đang trống và số liệu sử dụng app gần 0, vì app mới chưa gửi dữ liệu về web.
   - Cần thống nhất feed server-to-server với Tien.
   - Khi feed chưa chạy, các cột tracking mới để trống.

### 2. Menu: club area có 5 mục
| Mục | Nội dung |
|---|---|
| Team stats | Trang stats hiện tại (login, purchases), giữ nguyên |
| Team Manager | Tất cả thành viên club, có nút chuyển Players / Coaches |
| Plans | Mọi thứ đã giao cho player hoặc coach, kèm tiến độ |
| Leagues | League của club, tạo từ team key |
| Team Library | Duyệt clip và Player of the Week (chuyển từ Team stats sang) |

Club manager và admin (mỗi club chỉ 1–2 người) chuyển sang một trang settings riêng.

### 3. Team Manager: Players và Coaches
Một trang, phía trên có nút chuyển Players (mặc định) / Coaches, mỗi bên hiện số lượng.
- Hiện danh sách đang lẫn player, coach và staff.
- Mỗi tài khoản cần có role (player / coach / manager) để tách ra.

| | Players | Coaches |
|---|---|---|
| Cột | Tên · team keys · lần cuối vào app · số session tuần này · XP tuần này | Tên · team keys · số plan trong block · đã dạy · số reflection đã chia sẻ |
| Đánh dấu đỏ | Không vào app từ 7 ngày trở lên | Chưa dạy bài nào của plan trong block này |
| Thao tác hàng loạt (các dòng đã tick) | Set plan · Set IDP target · Đổi team key · Ẩn khỏi league | Set plan · Gửi nhắc nhở |
| Bộ lọc | Team key · tìm theo tên | Team key · tìm theo tên |

- Nút View mở trang cá nhân với các tab hiện có. Coach có thêm tab **Coaching log**.
- Nút **Add coach** đặt cạnh Add team member, Bulk import CSV và Invite team member.
- File CSV thêm cột **role**.
- Session, XP và "last in app" lấy từ feed của app. Khi chưa có dữ liệu thì hiện **"—", không bao giờ hiện 0**.

### 4. Team key dùng cho cả coach
Coach dùng chung team key với player. Không có hệ thống nhóm thứ hai.
- **Thành phần key:** một key có thể chứa player, coach hoặc cả hai.
  - "U10 Blues" chứa cả đội và coach của đội.
  - "U12 coaches" hay "Goalkeeper coaches" chỉ chứa coach.
- **Đặt tên và số lượng:** club đặt tên key tự do, không giới hạn số key.
- **Một người nhiều key:** một người có thể ở nhiều key.
- **Lọc:** nút chuyển Players / Coaches lọc người bên trong key đang chọn.
- **Giao plan:** plan đi theo key và theo nút chuyển.
  - Plan giao cho "U12 coaches" chỉ đến coach.
  - Plan giao cho "U10 Blues" khi đang chọn Players chỉ đến player.
- **Coach của đội:** coach nằm trong key của một đội thì là coach của đội đó.
  - Coach đó được đặt IDP target cho player trong app.
  - App hiện "Set by Coach Dan".
  - Không cần cài đặt thêm gì.
- **Bulk import:** cột group trong CSV dùng được cho cả coach.

### 5. Set training plans, bản nâng cấp
Áp dụng cho tab trên trang cá nhân. Form "Add a plan for the week (for all players)" chuyển thành bulk action **Set plan**. Chạy giống nhau cho player và coach. Plan cũ vẫn hoạt động.

| Field | Hiện tại | Nâng cấp |
|---|---|---|
| Ngày bắt đầu | Format US | `26 Oct 2026`, theo quốc gia của club |
| Độ dài | Không có | 1, 2, 4 tuần hoặc tùy chọn; plan tự kết thúc |
| Nội dung | Dropdown 3 course, rồi list phải Ctrl-click | Ô tìm kiếm (mục 6): session, course, session plan của Coach Pass, tài liệu club |
| Tài liệu club | Không có | Upload PDF/video, lưu 1 lần, giao được nhiều lần |
| Ghi chú | Không có | 1 dòng tùy chọn, hiện kèm plan trong app |
| Reflection | Không có | "Yêu cầu reflection sau khi dạy" (coach); "Reflection của plan này bắt buộc chia sẻ" (tùy chọn) |
| Giao cho ai | 1 người, hoặc "tất cả player" | 1 người, các dòng đã tick, hoặc cả team key |
| Đã giao gì | Không hiện | "Current and past plans": block, plan, người giao, trạng thái, nút Edit |

Trong app, mỗi item hiện với tên riêng của nó. Nếu giao cả course thì hiện tên course kèm session tiếp theo. Việc này sửa lỗi app đang hiện tên course ("VIRTUAL ACADEMY NEXT GEN CLUB") làm tên bài được giao.

### 6. Ô tìm kiếm nội dung
Ô này tìm trên cùng catalogue nội dung mà app đọc, nên không phải duy trì hai nơi.
1. **Gõ để tìm.** Kết quả hiện ngay khi gõ.
   - Nhóm theo Sessions / Session plans / Courses / Club documents.
   - Highlight phần khớp.
   - Mỗi kết quả hiện course, số thứ tự session, thời lượng (lấy từ file video) và Focus.
2. **Bộ lọc:** loại nội dung, độ tuổi, Focus, Favourites, Recently set.
3. **+ Add** đưa item lên đầu danh sách đã chọn, bỏ bằng ✕. Kết quả vẫn mở để thêm nhiều item liên tiếp.
4. **Duyệt theo course:** course → module → session, có nút "Add whole course".
5. **Chỉ hiện nội dung người nhận mở được,** theo membership, seat của club hoặc course họ có.

### 7. Plans, tracking và Coaching log
Trang Plans liệt kê mọi plan, mới nhất ở trên. Mỗi dòng hiện:
- plan và người được giao;
- block;
- tiến độ ("4 of 6 delivered", với player là "11 of 14 started");
- tóm tắt các reflection đã chia sẻ.

Nút View mở danh sách người được giao kèm trạng thái:

| Trạng thái | Nghĩa |
|---|---|
| Not opened | Chưa mở trong app |
| Opened | Đã mở, nhưng coach chưa đánh dấu đã dạy, hoặc player chưa bắt đầu |
| Delivered [ngày] | Coach đã đánh dấu đã dạy trong app |
| Completed [ngày] | Player đã hoàn thành (theo dữ liệu xác nhận từ app) |

- **Nút Remind:** gửi 1 push và 1 email cho người chưa xong, tối đa 1 lần mỗi 3 ngày cho mỗi plan.
- **Tab Coaching log** (trên trang của coach):
  - Liệt kê mọi session coach đã dạy, kể cả session không được giao.
  - Mỗi dòng có ngày, session, đội, rating và reflection.
  - Reflection coach để private thì chỉ hiện chữ "Private". Director chỉ thấy đúng những gì coach chia sẻ.
- **Dữ liệu reflection (do app gửi):**
  - Rating: Good / OK / Poor.
  - Điểm làm tốt và điểm cần đổi: chọn từ danh sách cố định, cộng 1 dòng tự do.
  - Có chia sẻ hay không.
  - Phần chữ tự do được lọc link, số điện thoại, email, handle và từ tục. Coach được nhắc không nêu tên player.

### 8. Leagues
- **Tạo từ team key, chỉ gồm player.** Một league có thể gồm 1 key hoặc nhiều key, ví dụ U11 Reds + U11 Blues.
- **League toàn club:** club nào cũng có một league chứa mọi player, tạo tự động và không xóa được.
- **Ẩn khỏi league:**
  - Có công tắc cho từng player, và bulk action trên Team Manager.
  - Người khác không thấy player bị ẩn.
  - Player đó vẫn thấy dòng của mình và vẫn được cộng XP.
- **Luật:**
  - League tối thiểu 6 người; ít hơn thì **gộp vào league cha**.
  - Reset vào thứ Hai lúc 00:00 giờ địa phương.
  - App hiện top 5 cộng dòng của chính player.
  - Chỉ hiện **tên và chữ cái đầu của họ**.
  - Không có lên hạng hay xuống hạng.
- **Không có bot trong league club.** Bot chỉ có ở nhóm worldwide của app.
- **Coach không bao giờ nằm trong league.**

### 9. Dữ liệu trao đổi giữa app và web
Backend của Tien gọi server-to-server tới web bằng request có ký (signed request), giống dashboard spec. Hai bên tự thống nhất field cụ thể.

| Chiều | Dữ liệu | Dùng cho |
|---|---|---|
| App → Web | Thời điểm login app | "Last in app", Team stats |
| App → Web | Session hoàn thành (player, session, phút, XP, thời gian), chỉ gửi sau khi server app xác nhận | Session và XP tuần, tiến độ plan, số đếm IDP |
| App → Web | Mở plan (người, plan, thời gian) | Trạng thái Opened |
| App → Web | Coach đã dạy (coach, session hoặc plan, đội, ngày) | Trạng thái Delivered, Coaching log |
| App → Web | Reflection (rating, các lựa chọn, chữ tự do, có chia sẻ không) | Coaching log, tóm tắt trên Plans |
| Web → App | Plans (ai, nội dung gì, block, ghi chú, cài đặt reflection) | "From your coach" cho player, "From your director" cho coach |
| Web → App | Team keys và roles | Coach nào phụ trách ai, leagues |
| Web → App | Leagues và player bị ẩn | Bảng xếp hạng của club |
| Web → App | Tài liệu club đã upload | Mở tài liệu trong app |

**Web không bao giờ tự tính XP, chỉ hiển thị số app gửi về.**

### 10. Câu hỏi mở trong brief
1. Reflection của plan được giao: mặc định chia sẻ và coach tự tắt được (như bản vẽ), hay luôn chia sẻ khi director giao plan? Saul quyết định.
2. Giữ hay bỏ "Player's training clocks" cũ (player tự nhập), khi app đã tự ghi lại việc tập?
3. Tài liệu club cho phép loại file nào, dung lượng tối đa bao nhiêu?
4. Thứ tự làm việc: Fix now → Players/Coaches + team key → Set plan + ô tìm kiếm → Plans + Coaching log → Leagues. Saul hỏi mình có đồng ý không, hay muốn đổi.

---

## Phần B — Concern

| # | Concern | Mức | Ghi chú |
|---|---|---|---|
| 1 | **Mâu thuẫn với câu trả lời đã gửi Tien (ý 5).** Brief yêu cầu league dưới 6 người gộp vào league cha; mình đã nói fallback là league toàn club. | 🔴 | Đính chính với Tien, sửa API League. |
| 2 | **Chưa có role.** Coach, manager và player đang lẫn lộn, nên league toàn club có thể đang gồm cả coach/manager. | 🔴 | Phase 1 phải làm trước Leagues. |
| 3 | **Brief muốn feed server-to-server có ký,** trong khi các endpoint IDP/League hiện tại là app gọi bằng cookie của player. | 🟠 | Thống nhất cách ký (HMAC) và danh sách event với Tien. Giữ endpoint cookie cho các màn hình app chỉ đọc. |
| 4 | **"Web không tự tính XP".** Hiện `session_complete` đang ghi XP vào League theo dữ liệu app gửi. | 🟠 | Rà lại để chỉ lưu XP app gửi, không tự cộng thêm. |
| 5 | **Tên hiển thị trong league:** API đang trả `display_name`, chưa chắc là dạng "tên + chữ cái đầu của họ". | 🟡 | Sửa trong Phase 4. |
| 6 | **Ngày "theo quốc gia của club":** hiện mọi club dùng format UK. | 🟡 | Hỏi Saul có club nào không ở UK không. |
| 7 | **Ô tìm kiếm phải dùng chung catalogue với app,** trong khi catalogue đó là API của Tien hay dữ liệu WP thì chưa rõ. | 🟠 | Hỏi Tien. Nếu là dữ liệu WP (wpcw units/courses) thì web tự query được. |
| 8 | **Chỉ hiện nội dung người nhận mở được:** phải kiểm tra quyền MemberMouse của từng người nhận, nặng khi chọn cả team key. | 🟡 | Cache, hoặc lấy giao của quyền giữa các người nhận. |
| 9 | **Upload tài liệu club (video):** tốn dung lượng, cần nơi lưu (S3 hay server?). | 🟠 | Chờ Saul chốt giới hạn; đề xuất PDF ≤ 20MB, MP4 ≤ 200MB. |
| 10 | **Không chạy được push/email cho nút Remind** nếu app chưa có endpoint nhận push. | 🟡 | Email làm được ngay; push cần Tien. |
| 11 | **Trên server có code IDP/League chưa commit** (đã gom vào commit `f151a5fcf`) và **thư mục `.git/objects` bị root sở hữu.** | 🟡 | Đã chown. Nhắc team tránh chạy git bằng root. |
| 12 | **Token Slack thiếu `chat:write`**, nên mình không tự gửi message được. | 🟡 | Thêm scope nếu muốn mình gửi. |

---

## Phần C — Task cần làm

### Phase 0 — Fix now
- [x] Bật mặc định Requires Approval cho mọi club và club mới (commit `f151a5fcf`)
- [x] Định dạng ngày UK `22 Oct 2026`; ô chọn ngày đã test trên Chrome
- [ ] Gửi message báo đã nhận PDF và đã fix 2 việc (chờ scope Slack hoặc user tự gửi)
- [ ] Hiện "—" thay vì 0 cho các cột lấy từ app (Last App Login, sessions, XP)

### Phase 1 — Role + Players/Coaches + team key cho coach (4–5 ngày)
- [ ] Thêm field role (player/coach/manager) và migrate dữ liệu hiện có
- [ ] Nút chuyển Players/Coaches kèm số lượng; cột, đánh dấu đỏ và bộ lọc riêng cho mỗi bên
- [ ] Thao tác hàng loạt: Set IDP target, Đổi team key, Ẩn khỏi league, Gửi nhắc nhở
- [ ] Nút Add coach; thêm cột role và group trong CSV
- [ ] Coach dùng team key: xác định "coach của đội", cho đặt IDP target, hiện "Set by Coach X"
- [ ] Menu 5 mục; manager/admin sang trang settings; chuyển Team Library sang mục riêng

### Phase 2 — Set training plans + ô tìm kiếm (5–6 ngày)
- [ ] Bảng plan mới: độ dài, ghi chú, cài đặt reflection, item (session/course/plan/doc), vẫn chạy được plan cũ
- [ ] Upload tài liệu club (PDF/video), lưu 1 lần, dùng lại nhiều lần
- [ ] Ô tìm kiếm: gõ để tìm, nhóm kết quả, bộ lọc, duyệt theo course, chỉ hiện nội dung có quyền
- [ ] Giao cho 1 người, các dòng đã tick hoặc cả team key (theo nút chuyển)
- [ ] Bảng "Current and past plans" có nút Edit

### Phase 3 — Plans + Remind + Coaching log (4 ngày)
- [ ] Trang Plans: tiến độ, View danh sách người với 4 trạng thái
- [ ] Remind: push + email, tối đa 1 lần mỗi 3 ngày cho mỗi plan
- [ ] Tab Coaching log: rating, reflection, hiện "Private" khi coach không chia sẻ
- [ ] Lọc chữ tự do (link, số điện thoại, email, handle, từ tục)

### Phase 4 — Leagues (3 ngày)
- [ ] League tạo từ 1 hoặc nhiều team key, chỉ gồm player, bỏ coach
- [ ] League dưới 6 người gộp vào league cha; sửa API và api-docs
- [ ] Công tắc ẩn khỏi league cho từng player + bulk action; player bị ẩn vẫn thấy mình và vẫn có XP
- [ ] Chỉ hiện tên và chữ cái đầu của họ

### Phase 5 — Feed giữa app và web (3 ngày, làm cùng Tien)
- [ ] Spec endpoint có ký (HMAC): 5 loại event app → web, 4 loại dữ liệu web → app
- [ ] Viết endpoint, test và cập nhật api-docs
- [ ] Nối với các cột Team Manager và trạng thái Plans

**Tổng:** khoảng 20–23 ngày dev, chưa gồm QA.

---

## Câu hỏi chưa giải quyết
- **Saul:**
  1. Loại file và dung lượng tối đa cho tài liệu club?
  2. Giữ hay bỏ training clocks cũ?
  3. Reflection mặc định có chia sẻ không?
  4. Có đồng ý thứ tự làm việc không?
  5. Có club nào không ở UK không?
- **Tien:**
  1. Đính chính chuyện league cha.
  2. Thống nhất cách ký và danh sách event của feed.
  3. Catalogue nội dung lấy từ đâu?
  4. App nhận push cho nút Remind thế nào?
