# Rory (Swift Studio) — Sprint 9 Estimate Review

Nguồn: ClickUp list "Sprint 9" (team 90121968813, list 901220374040) + Slack #swift-studio + sheet est của Khánh (`18GBG2NEyIcfIU3NvXWquWYzugT0Yz0BSDe-1ePVpjDw`). Mục tiêu: đánh giá từng con số est của Khánh có hợp lý về mặt kỹ thuật, break nhỏ từng task thành sub-task để lộ ra chỗ nào tight/loose.

Tổng est Khánh: **101h** / 8 task.

---

## 1. Update Email/Password in App — 5h

Mô tả: "Give ability to update email address and change password in app, to be contained in the 'personal information' section."

Breakdown kỹ thuật:
| Sub-task | Giờ |
|---|---|
| UI: 2 form field (email mới, password mới+confirm) trong màn Personal Info sẵn có | 1.0h |
| Validate client-side (email format, password rule) | 0.5h |
| Gọi API đổi email (re-dùng endpoint Mindbody/backend account update có sẵn — task không nói phải tạo API mới) | 1.0h |
| Gọi API đổi password + xử lý lỗi (sai password cũ, trùng password cũ...) | 1.0h |
| Re-auth / re-login session sau khi đổi (nếu đổi email ảnh hưởng token) | 1.0h |
| Test case cơ bản (đổi thành công, sai input, lỗi mạng) | 0.5h |
| **Tổng** | **5.0h** |

**Nhận định: KHỚP chính xác với breakdown kỹ thuật tối thiểu.** Đây là task duy nhất trong 8 task có số giờ ăn khớp sát nhất với scope viết ra — giả định reuse được API account update sẵn có (hợp lý vì app chắc chắn đã có user account management). Rủi ro duy nhất: nếu phải TẠO MỚI API đổi password từ đầu (chưa chắc Mindbody expose endpoint này cho third-party app) thì +4-6h. Cần hỏi Khánh: "API đổi password đã verify được Mindbody hỗ trợ chưa, hay giả định có sẵn?"

---

## 2. Class Reviews (Sweat & BXR) — 14h

Mô tả: "Ability to add a review after a class is completed (will need to use the checked-in API endpoint to confirm someone has actually attended) and then need to find out where the reviews are saved in mindbody."

Breakdown:
| Sub-task | Giờ |
|---|---|
| **Research: tìm hiểu Mindbody lưu review ở đâu/endpoint nào** (task tự thừa nhận chưa biết — đây là discovery task, không phải dev thuần) | 3.0h |
| Gọi check-in API để verify user đã tham gia class trước khi cho review (tránh review giả) | 2.0h |
| UI: màn review (rating sao + text) xuất hiện sau khi class kết thúc | 2.5h |
| Backend: lưu review (vào Mindbody nếu API hỗ trợ, fallback DB riêng nếu không) | 3.0h |
| Xử lý 2 brand (Sweat & BXR) — có thể khác namespace/class type, cần filter đúng | 1.5h |
| Test + edge case (chưa check-in mà cố review, review trùng) | 2.0h |
| **Tổng** | **14.0h** |

**Nhận định: HỢP LÝ, thậm chí hơi tight.** Điểm mấu chốt là phần research "chưa biết lưu ở đâu" — đây là rủi ro lớn nhất vì nếu Mindbody KHÔNG hỗ trợ lưu review qua API (nhiều khả năng, vì review thường là feature UI-only của họ), toàn bộ phải build backend riêng + đồng bộ ngược, phá vỡ cả estimate. Khánh nên note rõ: "est này giả định Mindbody có API, nếu không có thì cần thêm ~X giờ để tự build storage."

---

## 3. Door Access QR & Reception Barcode — 14h

Mô tả ClickUp (task "Embedding MB QR codes into app instead of current barcode"): "use the supplied integration guide to remove the wallet function, and integrate a new auto-rotating QR code into the app."

Thực tế theo Slack (thread dài nhất trong cả dự án, **chưa chốt xong tính đến hôm nay 30/10**):
- Rory muốn: QR auto-rotate (member ID) + vẫn giữ barcode thường cho reception
- Carrick đề xuất: token service backend ký HMAC, time-window 30s, GymAxess chỉ đọc mã rồi gửi về backend mình validate
- Chưa xác nhận: GymAxess có hỗ trợ custom validation hay chỉ đọc raw membership number
- Rory tự đề nghị: "có thể cần Bluetooth/WiFi beacon để check proximity" — rồi tự bỏ ý đó

Breakdown (dựa trên flow Carrick đề xuất — phương án khả thi nhất hiện tại):
| Sub-task | Giờ |
|---|---|
| Backend: token service sinh QR token HMAC-signed, time-window 30s | 3.0h |
| App: hiển thị QR, auto-refresh mỗi 20-30s | 2.0h |
| Giữ lại regular barcode cho reception (không đổi gì — nhưng cần đảm bảo 2 luồng không conflict) | 1.0h |
| Backend: endpoint validate khi GymAxess (hoặc app) gửi code về | 2.5h |
| Research + làm việc với Gerwin (GymAxess) để confirm họ nhận raw hay validated code — **đây là phần phụ thuộc bên thứ 3, không kiểm soát được thời gian** | 3.0h |
| Testing thiết bị thật (Rory có sẵn 1 door controller + QR/barcode reader để test — theo Slack) | 2.5h |
| **Tổng** | **14.0h** |

**Nhận định: RỦI RO CAO NHẤT trong 8 task — 14h chỉ đủ nếu GymAxess trả lời nhanh và chấp nhận flow Carrick đề xuất.** Nếu GymAxess KHÔNG hỗ trợ nhận validated token (chỉ đọc raw membership number như Rory mô tả ngày 30/10), toàn bộ phần "token service HMAC" trở nên vô nghĩa — phải quay lại phương án "rotating ID đơn giản" (ít giờ hơn nhưng kém an toàn) hoặc thêm lớp trung gian (nhiều giờ hơn). **Khuyến nghị: không chốt est task này cho tới khi Carrick nhận được xác nhận kỹ thuật từ Gerwin/GymAxess** — hiện đang treo.

---

## 4. Gift Card Redemption/Cash Values in App — 12h

Mô tả: "cash value hiện trong account area. Users cần dùng cash value khi mua hàng → cần basket/cart page, chọn vừa trả bằng cash value vừa trả thêm bằng thẻ/Stripe, rồi đưa item đã mua vào account."

Breakdown:
| Sub-task | Giờ |
|---|---|
| UI: hiện cash value trong account area | 1.0h |
| **Basket/cart page hoàn toàn mới** (app hiện tại theo mô tả CHƯA có cart — phải tạo list item, quantity, tổng tiền) | 3.5h |
| **Split-tender payment logic**: tính đúng phần trả bằng cash value, phần còn lại charge thẻ/Stripe trong CÙNG 1 giao dịch | 3.0h |
| Xử lý edge case: cash value KHÔNG đủ trả hết → phải charge thêm; cash value DƯ hơn giá trị → giữ lại số dư | 1.5h |
| Backend: trừ cash value + ghi nhận item mua vào account sau khi thanh toán thành công | 1.5h |
| Rollback nếu thanh toán thẻ fail giữa chừng (đã trừ cash value chưa, cần transaction-safe) | 1.0h |
| Test | 0.5h |
| **Tổng cần thiết: ~12.0h vừa khít, KHÔNG có buffer** |

**Nhận định: THẤP, rủi ro underestimate cao nhất trong 8 task.** Đây là logic thanh toán phức tạp nhất (split-tender + transaction safety) nhưng lại có est thấp thứ nhì. Breakdown ở trên đã là kịch bản tối ưu (giả định basket page build 1 lần dùng chung được với task #6 "Purchasing Gift Cards" — xem mục overlap cuối report). Nếu build độc lập không chung cart, cần +3-4h nữa.

---

## 5. In-App Notifications — 18h

Mô tả: "Develop a dashboard for in-app notifications, allows segmentation through Klaviyo... not push, pop-up when open app, lưu vào message centre."

Breakdown:
| Sub-task | Giờ |
|---|---|
| **Admin dashboard mới**: tạo/sửa/xoá notification, chọn đối tượng | 4.0h |
| Tích hợp Klaviyo segmentation API (lấy list audience, match với notification) | 3.5h |
| Backend: lưu notification + trạng thái đã-xem/chưa-xem per user | 2.5h |
| App: component popup khi mở app, check notification mới chưa đọc | 2.5h |
| App: message centre (danh sách lịch sử notification, giống inbox) | 3.0h |
| Test (segment đúng người, không duplicate popup, đồng bộ đã đọc) | 2.5h |
| **Tổng** | **18.0h** |

**Nhận định: HỢP LÝ.** Đây là 1 trong 2 feature tốn công nhất vì phải build NGUYÊN 1 admin dashboard mới (không chỉ API) — khác các task khác chỉ cần sửa/thêm vào UI app có sẵn. 18h không dư nhiều nếu Klaviyo integration chưa từng làm trước đó trong codebase (cần học API Klaviyo + xử lý rate limit/segment sync).

---

## 6. Purchasing of Gift Cards in App — 14h

Mô tả: "có thể làm dưới mục 'store', theo flow giống website."

Breakdown:
| Sub-task | Giờ |
|---|---|
| UI: màn chọn mệnh giá gift card, số lượng | 2.0h |
| Thêm vào cart (dùng CHUNG basket component với task #4 nếu làm sau task đó — xem overlap) | 1.5h (nếu reuse) / 3.5h (nếu làm độc lập) |
| Payment: gọi Stripe/payment provider để charge | 2.5h |
| Backend: generate gift card code, gửi email/hiện trong app sau khi mua | 3.0h |
| Port lại logic validate từ website (theo yêu cầu "flow giống website") — đọc hiểu code web hiện có | 2.0h |
| Test | 1.5h |
| **Tổng (nếu KHÔNG reuse cart)** | **~14.5h** — khớp sát |
| **Tổng (NẾU reuse cart từ task #4)** | **~11-12h** — rẻ hơn |

**Nhận định: HỢP LÝ nếu tính độc lập, nhưng CÓ THỂ RẺ HƠN nếu làm sau task #4 và share basket component.** Đây chính là chỗ cho thấy 2 task (4 và 6) nên được est/làm theo cụm (cluster), không tách rời — xem phần cuối.

---

## 7. Clear Mindbody Balance in App — 18h

Mô tả: "balance phát sinh từ mua đồ ad-hoc (nước uống...) gắn vào account → cho user xem + pay now qua Apple/Google Pay hoặc thẻ lưu → **ideally** chặn booking tới khi trả hết."

Ticket này MỚI tạo (Jeff hỏi trong Slack "I just saw the new ticket... Do you want us to add an estimate?") — chưa có thảo luận chi tiết với Rory như các task khác.

Breakdown:
| Sub-task | Giờ |
|---|---|
| UI: hiện balance pending trong account area | 1.5h |
| Tích hợp Apple Pay | 2.5h |
| Tích hợp Google Pay | 2.5h |
| Saved card flow (nếu Apple/Google Pay không khả dụng) | 2.5h |
| Backend: đánh dấu balance đã-trả, đồng bộ lại Mindbody | 2.5h |
| Logic chặn booking nếu balance > 0 (từ "ideally" — có thể là nice-to-have, không bắt buộc launch) | 2.5h |
| Test (3 phương thức thanh toán × các trạng thái balance) | 3.0h |
| **Tổng** | **~17.0h**, làm tròn 18h khớp |

**Nhận định: HỢP LÝ về tổng số, nhưng rủi ro ở chỗ "ideally" (chặn booking) — nếu đây là optional, có thể bớt 2.5h; nếu bắt buộc, giữ nguyên 18h.** Vì ticket mới, chưa qua vòng hỏi-đáp với Rory như Door Access, nên breakdown này dựa hoàn toàn trên đọc description, CHƯA verify được Mindbody expose API lấy balance pending hay không — đây là rủi ro ẩn giống task Class Reviews (research risk).

---

## 8. T&Cs + Forms — 6h

Mô tả: "backend dashboard để edit/publish T&Cs, cũng expose qua API cho app+web, cần full ability format text render đúng."

Breakdown:
| Sub-task | Giờ |
|---|---|
| Admin dashboard: 1 trang CRUD đơn giản (rich text editor, save/publish) | 2.0h |
| API endpoint GET content cho app+web | 1.0h |
| App: render formatted text (rich text → native component) | 1.5h |
| Website: render formatted text | 1.0h |
| Test | 0.5h |
| **Tổng** | **6.0h** |

**Nhận định: HỢP LÝ, khớp sát breakdown.** Task đơn giản nhất về logic, chỉ là CMS content cơ bản.

---

## Phát hiện quan trọng: 3 task dùng chung hạ tầng payment/cart

**Gift Card Redemption (12h) + Purchasing Gift Cards (14h) + Clear Mindbody Balance (18h) = 44h.**

Cả 3 đều cần: (a) basket/cart hoặc checkout UI, (b) gọi payment provider (Stripe/Apple/Google Pay). Nếu build task đầu tiên trong cụm này xong, 2 task sau sẽ RẺ HƠN đáng kể vì chỉ cần gọi lại component/service đã có — Purchasing Gift Cards riêng đã note rõ khả năng tiết kiệm ~3h nếu làm sau task #4.

**Khuyến nghị cụ thể cho Khánh:**
1. Note rõ thứ tự làm: nên làm Gift Card Redemption (xây cart+split-payment) TRƯỚC, rồi Purchasing Gift Cards và Clear Mindbody Balance sau để reuse — có thể tiết kiệm tổng cộng 5-8h nếu làm đúng thứ tự.
2. 2 task cần xác nhận lại trước khi chốt số: Door Access (đang treo với GymAxess) và Class Reviews/Clear Mindbody Balance (research risk — chưa verify Mindbody API có hỗ trợ).
3. Update Email/Password (5h) là task đáng tin cậy nhất, dùng làm baseline tham chiếu cho các task khác.

---

## Tổng kết so sánh

| Task | Est Khánh | Breakdown của em | Chênh lệch |
|---|---|---|---|
| Update Email/Password | 5h | 5.0h | Khớp |
| Class Reviews | 14h | 14.0h | Khớp (có rủi ro ẩn) |
| Door Access QR | 14h | 14.0h | Khớp NHƯNG phụ thuộc bên thứ 3 chưa chốt — rủi ro cao nhất |
| Gift Card Redemption | 12h | 12.0h (vừa khít, 0 buffer) | **Rủi ro underestimate cao nhất** |
| In-App Notifications | 18h | 18.0h | Khớp |
| Purchasing Gift Cards | 14h | 14.5h (độc lập) / 11-12h (reuse) | Khớp, có thể tối ưu hơn |
| Clear Mindbody Balance | 18h | 17.0h | Khớp (research risk) |
| T&Cs + Forms | 6h | 6.0h | Khớp |
| **Tổng** | **101h** | **~100.5h** | Khớp |

**Kết luận cuối:** Tổng thể 101h của Khánh **được tính có cơ sở kỹ thuật thật**, không phải số áng chừng. Vấn đề không nằm ở "thừa giờ" mà ở 2 chỗ cụ thể: (1) Gift Card Redemption thiếu buffer cho rủi ro, (2) Door Access phụ thuộc bên thứ 3 chưa chốt nên 14h có thể không giữ được. Nên trao đổi lại với Khánh đúng 2 điểm này thay vì yêu cầu cắt giảm tổng thể.

## Câu hỏi còn mở
- Mindbody có expose API lưu Class Review không, hay phải tự build storage? (ảnh hưởng task #2)
- Mindbody có expose API lấy "pending balance" cho Clear Mindbody Balance không? (ảnh hưởng task #7)
- GymAxess (Gerwin) đã xác nhận flow validate QR/token chưa? (ảnh hưởng task #3, hiện đang treo tính đến 30/10)
- App hiện tại đã có cart/basket component nào chưa, hay cả 3 task payload phải xây từ đầu? (không xem được code do SSH `rory.cpanel` yêu cầu password, key hiện không login được)
