# Mindbody API Feasibility — Wildsoul Wellness Brief

**Date:** 2026-09-14
**Nguồn:** PDF "Wildsoul Mindbody x NUS Technology" (Chien Tran forward từ Yami Chandhok, Wildsoul Wellness — multi-location wellness studio, Úc, dùng Mindbody).
**Yêu cầu khách:** đánh giá khả thi kỹ thuật 6 hạng mục, đề xuất kiến trúc + lộ trình phase, ưu tiên value cao nhất trước.
**Nguồn đối chiếu:** dự án Rory/BXR App (London, cũng chạy trên Mindbody) — Matrix "Rory Hackett - BXR App", Slack "Swift Studio", 25 ticket JIRA (swiftstudio.atlassian.net, project BXR), email carrick@, và **code thật đã SSH pull về từ `rory.cpanel` → `/home/nus/projects/Rory/code/booking/`**.

**Điều kiện tiên quyết chung:** cần xác nhận gói Mindbody của Wildsoul có bật API access + đủ quyền (Enrollment/ClassService/SaleService) trước khi báo giá bất kỳ mục nào. Sandbox: KHÔNG cần khách cấp riêng — BXR xác nhận có thể tự tạo test account ngay trong Mindbody Developer Portal.

---

## A. Chẩn đoán lỗi booking — vì sao member không book được

**Khách nói gì:** Booking fail là vấn đề gây khó chịu nhất. Việc book được hay không phụ thuộc nhiều yếu tố liên kết (gói/pricing option, entitlement dịch vụ, chi nhánh, cấu hình lớp, lịch), nhưng khi fail Mindbody không nói rõ lý do — lớp/lịch/pricing nhìn "có vẻ" đúng mà vẫn fail, lỗi hiện khác nhau giữa backend/app/web. Đội vận hành phải mò từng màn hình, test từng profile, escalate Mindbody support. Muốn có 1 "diagnostic view" nói thẳng: *"Member không book được vì Pricing Option X không bao gồm Service Y tại Location Z."*

**Cách giải quyết:** Mindbody có data thô (`GetClientServices` → gói/entitlement member đang có, `GetClasses` → rule của lớp) nhưng KHÔNG có endpoint trả thẳng "lý do fail". Phải tự xây 1 rule engine: kéo full entitlement của member + full rule của lớp, đối chiếu từng điều kiện, tự sinh câu giải thích. Độ khó trung bình, cần test kỹ với case thật của Wildsoul để rule đúng, không đoán.

**Refer Rory (BXR):**
- Slack Swift Studio (2 thread full, kênh waiver 2026-09): bug thật y hệt — client xoá waiver khỏi profile nhưng app không hiện prompt bắt ký lại. Endpoint thật dùng: `GET https://api.mindbodyonline.com/public/v6/site/liabilitywaiver`. Logic đã viết: "nếu tìm thấy đúng waiver VÀ user chưa approve → chặn booking" — đúng kiểu rule engine cần xây cho Wildsoul.
- **Gotcha thật xác nhận chắc chắn:** Health Questionnaire hiển thị được nhưng Mindbody **KHÔNG cập nhật trạng thái hoàn thành qua API** ("no way to determine whether the user has completed it or not" — dev tự confirm khi làm). Nếu Wildsoul cũng cần track tương tự (health form là điều kiện eligibility), phải tự lưu trạng thái riêng, không dựa được vào Mindbody.
- Có 3 loại form dễ nhầm ở BXR: Mindbody Liability Waiver (native) vs Health Questionnaire (native, không track status) vs WaiverMaster (bên thứ 3, `waivermaster.com`) — 2 người từng nhầm lẫn giữa Mindbody waiver và WaiverMaster link, mất nhiều lượt mới rõ. Cần hỏi Wildsoul ngay từ đầu có dùng form bên thứ 3 nào song song không.
- **⚠️ Ticket BXR-88 "Access Control - Memberships" — status "To Do", CHƯA GIẢI ĐƯỢC:** *"Program IDs shown in the URL on Mindbody Client side is different to what the API is seeing."* — ID hiển thị trên UI quản trị Mindbody có thể khác ID API trả về cho cùng 1 đối tượng. Rủi ro nền tảng thật cho mục A — nên cảnh báo Wildsoul cần thời gian khảo sát/POC trước khi cam kết timeline chắc chắn, không hứa suôn sẻ.
- Đọc thẳng code thật (`barcode_ajax.php` trên server, xem chi tiết ở mục C) xác nhận: flow check-in hiện tại của BXR **hoàn toàn không có bước gọi `GetClientServices` để validate entitlement** trước khi quyết định — tức là ngay cả BXR cũng chưa thực sự giải xong bài toán "kiểm tra đúng quyền trước khi cho phép" mà Wildsoul đang cần ở mục A lẫn C.
- **🔴🔴 2 bug thật đọc trực tiếp từ `sweatApi/functions.php` (SSH `rory.cpanel`, dòng ~519-561) — bằng chứng rõ nhất cho việc "hệ thống tưởng đúng nhưng thật ra không hề validate" mà Wildsoul đang than phiền, xảy ra ngay trên chính dự án NUS đang chạy:**
  1. **Check credit/entitlement bị vô hiệu hoá cứng trong code**, không phải "không có check":
     ```php
     $rem = getRemainingSweatCredit($profileId);   // gọi API Mindbody thật để lấy credit còn lại
     $rem = 1;                                      // dòng NGAY SAU đó ghi đè, luôn = 1
     if ($rem > 0) {                                // → luôn TRUE, credit thật KHÔNG BAO GIỜ được dùng
     ```
     Kết quả gọi API thật bị vứt bỏ hoàn toàn, thay bằng giá trị cứng — member hết credit thật vẫn được cho qua bước kiểm tra này. Nhiều khả năng ai đó tắt tạm lúc debug rồi quên bật lại.
  2. **Bug đọc kết quả booking — điều kiện `Error->Code == 'Unknown'` bị viết lặp 2 lần với ý nghĩa mâu thuẫn:**
     ```php
     if ($datas->Error->Code == 'Unknown') {
         echo "Something went wrong, please contact our front desk to make a booking.";
         return;                              // ← return luôn ở đây
     }
     if ($datas->Error->Code == 'ClassSignUpsFull') { ... }
     if ($datas->Error->Code == 'Unknown') {   // ← nhánh này KHÔNG BAO GIỜ chạy tới được
         ... echo 'Your class has been booked successfully.'; return;
     }
     ```
     Theo quy ước thật của Mindbody, `Error.Code = "Unknown"` nghĩa là **KHÔNG có lỗi = booking THÀNH CÔNG**. Nhưng nhánh đầu tiên lại xử lý `Unknown` như thất bại và return ngay → nhánh xử lý thành công thật (gửi email nền + báo "booked successfully") **là dead code, không bao giờ chạy được**.
     **Hậu quả thật đang chạy production:** mọi member book thành công thật trên Mindbody vẫn nhận thông báo SAI *"Something went wrong, please contact our front desk"* — dù booking đã được ghi nhận thật.
  → **Kết luận trực tiếp cho mục A:** đây chính là minh chứng cụ thể nhất, ngay trên dự án của chính NUS, cho việc "hệ thống không thực sự validate + không báo đúng trạng thái" — chốt lại đúng vấn đề gốc Wildsoul đang mô tả, và là lý do bắt buộc phải làm cẩn thận, có test coverage đầy đủ (kể cả case thành công lẫn thất bại) khi xây rule engine cho Wildsoul, tránh lặp lại đúng loại lỗi này.
- **🔴 Đào thêm code mobile app thật (`Brando-Media/bxr-app-2022`, React Native, clone về `/home/nus/projects/Rory/code/mobile/`) — phát hiện web và mobile của CHÍNH BXR xử lý waiver theo 2 CƠ CHẾ HOÀN TOÀN KHÁC NHAU, xác nhận rõ hơn nghi vấn từ Slack trước đó:**
  - Web (`book-a-session.php`) check waiver qua Mindbody native: `GET /public/v6/site/liabilitywaiver`.
  - Mobile (`src/screens/profile/FormWeb.js`) **KHÔNG dùng Mindbody native waiver luôn** — mở thẳng WebView tới URL cứng bên thứ 3:
    ```js
    const url = `https://waivermaster.com/sign.html?q=${isHealth ? 'D97782004' : 'DD4EC9E3F'}`;
    ```
    2 form ID (`D97782004`=Health, `DD4EC9E3F`=Membership) hardcode cứng trong code, và **không có bất kỳ dòng nào đọc lại/lưu trạng thái đã hoàn thành form hay chưa** — người dùng bấm "Done" là điều hướng đi luôn, bất kể có điền xong trong WebView hay không.
  → **Đây là bằng chứng code-level xác nhận: chính BXR cũng có tình trạng "backend đúng nhưng app/web xử lý khác nhau"** (đúng vấn đề mục F Wildsoul mô tả) — với waiver, web và mobile dùng 2 nguồn dữ liệu hoàn toàn khác nhau (Mindbody native vs bên thứ 3), không đồng bộ với nhau, mobile còn không track được trạng thái hoàn thành. Nếu Wildsoul có nhu cầu tương tự (waiver/health form), cần thiết kế 1 nguồn dữ liệu DUY NHẤT cho mọi kênh (web/app/kiosk) ngay từ đầu, tránh lặp lại tình trạng phân mảnh này.
- **So sánh check credit/entitlement — mobile làm ĐÚNG hơn web ở phần PT, nhưng cũng có lỗ hổng ở phần lớp nhóm:** Trong `src/store/classes/saga.js` (mobile), hàm `addAppointmentSaga` (đặt lịch PT 1-1) có check credit THẬT — gọi API lấy `ClientServices`, lọc theo `PT_ids` cụ thể, cộng dồn `Remaining`, và **chặn thật bằng `Alert.alert('Error', 'Not enough credits to make this booking.')` nếu = 0** — đây là 1 ví dụ THẬT về cách check entitlement đúng cần tham khảo cho mục A. Nhưng hàm `addClientToClassSaga` (đặt lớp nhóm, cùng file) thì KHÔNG có bước pre-check credit tương tự — dựa hoàn toàn vào phản hồi thật từ Mindbody API (đọc `response.status` + `result.Visit`, không có bug đọc sai `Error.Code` như bên web). → Tức là ngay trong cùng 1 app, cách xử lý entitlement cho PT và cho lớp nhóm cũng KHÁC NHAU (1 bên tự check trước, 1 bên để Mindbody tự quyết) — không có 1 pattern thống nhất, nên khi làm cho Wildsoul cần chọn 1 cách nhất quán (khuyến nghị: để Mindbody tự trả lỗi làm nguồn sự thật, tránh tự tính lại như bên PT vì dễ sai sót/lệch dữ liệu — nhưng phải đọc đúng response, không lặp lại bug web).
- **Xác nhận thêm kiến trúc check-in vật lý:** mobile app hiện Client ID của member dưới dạng mã vạch CODE128 ngay trên điện thoại (`src/screens/profile/BarcodeSection.js`, dùng thư viện `react-native-barcode-svg`) — đúng khớp với phần kiosk quét mã bằng QuaggaJS đã tìm thấy ở mục C, khép kín toàn bộ luồng "member mở app hiện mã → kiosk quét → gọi Mindbody `client/addarrival`".

**ChatGPT đề xuất (đối chiếu):** Public docs không có endpoint kiểu "dry-run/explain booking" trả nguyên nhân — khớp đúng với kết luận của mình. Đề xuất kiến trúc 2 tầng: (1) **Pre-flight diagnostics** — tự check từng điều kiện (active contract/service, còn lượt, pricing option có bao gồm service, dùng được tại location, membership có suspend không, lớp còn chỗ đúng window) và (2) **Authoritative execution** — khi book thật vẫn gửi qua Mindbody, chuẩn hoá Error code/message, log lại input+rule result+response để điều tra sau. Đề xuất hiển thị dạng "decision trace" (từng điều kiện PASS/FAIL + lý do cuối) — cách trình bày dễ hiểu hơn là chỉ nói "không đủ điều kiện". Có cảnh báo hợp lý: rule nào Mindbody không expose qua API phải đánh dấu rõ "Mindbody-only validation, chưa verify được" thay vì đoán mò.

**Kết luận mục A:** Khả thi 1 phần — phải tự xây rule engine (Mindbody không có sẵn), và có bằng chứng thật (bug `$rem=1`, bug `Error.Code` trùng ở web BXR; waiver phân mảnh giữa web/mobile) cho thấy chính NUS cũng từng làm sai đúng kiểu lỗi này. Nên áp dụng thiết kế 2 tầng + decision-trace của ChatGPT, đo độ chính xác checker bằng cách so với kết quả booking thật trong sandbox trước khi giao cho Wildsoul dùng thật, và bắt buộc có test coverage cho cả case fail lẫn pass (rút kinh nghiệm từ bug BXR).

---

## B. Sửa hợp đồng/membership hàng loạt

**Khách nói gì:** Cấu trúc membership ngày càng phức tạp (Foundation, Move, Recover, Balance, Premium, Collective, gói lẻ, legacy...). Ví dụ: member Foundation cần giữ giá cũ nhưng đổi cơ cấu quyền lợi (red-light access, giới hạn lượt) — phải hủy hợp đồng cũ bằng tay, tạo hợp đồng mới khớp đúng ngày autopay, giữ giá, check lại entitlement/quyền đa chi nhánh, review từng profile. Đang làm **từng profile một** — khi cần đổi hàng loạt, rủi ro sai sót/billing tăng theo quy mô. Muốn: workflow network-level có template duyệt sẵn, đổi hàng loạt, validate trước, exception reporting, audit trail.

**Cách giải quyết:** Đây là hạng mục rủi ro cao nhất trong 6 mục. API đọc/sửa được từng client/contract riêng lẻ nhưng tài liệu công khai **không xác nhận có endpoint bulk-update**. Sửa hàng trăm/nghìn member = lặp gọi từng người, giới hạn ~1.000 call/ngày/API key, không có rollback nếu giữa chừng lỗi. **Trước khi báo giá bất kỳ gì cho mục này, phải hỏi thẳng Mindbody support/sandbox xem endpoint bulk-update có thật tồn tại không.** Nếu không có, giải pháp là 1 queue chạy tuần tự có log + validate từng bước + cảnh báo bất thường — nói rõ với khách đây là "chạy nền có kiểm soát", không phải "bulk update tức thời".

**Refer Rory (BXR):**
- **BXR-221 "UAE - Implement Region Configuration Management"** (Deployed on staging) — đã build thật 1 "Region entity" với Config API + dynamic loading, seed sẵn config cho London/UAE, gồm: currency, timezone, mindbody instance (SiteId), Klaviyo list, payment config. Đây là bản nháp thật của kiến trúc "approved template + network-level config" Wildsoul cần — dù BXR làm cho khái niệm "region" chứ chưa phải "membership template", nhưng pattern Region entity + Config API hoàn toàn mở rộng được cho membership template.
- **BXR-148 "Update the pricing rule of Black Friday contract display"** và **BXR-145 "Enable job to sync Contract"** (cả 2 Done) — xác nhận BXR đã từng làm job đồng bộ + sửa rule pricing/contract thật, nhưng ở quy mô nhỏ (1 rule/1 campaign), chưa ở quy mô "bulk update network-wide" như Wildsoul cần — không phải bằng chứng đã giải bài toán scale, chỉ là bằng chứng team quen thao tác contract/pricing qua API.
- **Mobile app (`bxr-app-2022`):** không tìm thấy màn hình/luồng nào cho phép sửa hàng loạt hợp đồng — mobile chỉ có `Contracts.js`, `MembershipsCredits.js` (xem thông tin cá nhân của chính member, không có chức năng quản trị hàng loạt). Xác nhận: BXR **chưa từng build phần admin bulk-edit ở bất kỳ nền tảng nào** (web lẫn mobile) — mục B với Wildsoul sẽ là 1 hệ thống admin hoàn toàn mới, không có sẵn cái gì để tái dùng, khác hẳn mục C/D (có pattern thật để kế thừa).

**ChatGPT đề xuất (đối chiếu):** Đồng ý không có bulk endpoint công khai — nên coi "bulk update" là 1 workflow của Wildsoul tự chạy từng member có kiểm soát, không phải 1 API call. Đề xuất quy trình cụ thể, hợp lý: cohort query xác định đúng danh sách → template nguồn/đích được duyệt trước → kiểm tra giá cũ/autopay/home site/entitlement/outstanding balance → báo cáo tác động trước khi chạy → **four-eyes approval** cho thay đổi billing → idempotency key/member → batch nhỏ có thể dừng giữa chừng → reconciliation sau mỗi batch → **exception queue** (không tự động bỏ qua lỗi) → audit trail đầy đủ (ai duyệt, giá trị cũ/mới, response, thời điểm). Điểm hay nhất: với case "giữ giá cũ nhưng đổi entitlement", nên ưu tiên **tạo trước 1 product/contract template hợp lệ trong chính Mindbody rồi migrate sang template đó** — không nên tự đặt ra "giá riêng" ngoài Mindbody vì sẽ sinh 2 nguồn sự thật (source of truth) khác nhau, dễ lệch dữ liệu về sau.

**Kết luận mục B:** Đây là mục rủi ro cao nhất và **không có pattern sẵn nào từ Rory để tái dùng** (cả web lẫn mobile đều chưa làm phần này). Phải làm 2 việc trước khi báo giá: (1) hỏi thẳng Mindbody có bulk endpoint thật không, (2) áp quy trình an toàn của ChatGPT (four-eyes approval + idempotency + exception queue + audit trail) làm khung thiết kế mặc định, và ưu tiên tạo template hợp lệ trong Mindbody trước khi migrate thay vì tự chế giá/entitlement ngoài Mindbody.

---

## C. Kiosk on-site "Wildsoul Collective"

**Khách nói gì:** Khu Collective có hành trình khác lớp học thường, không ép vào flow đặt trước online. Member mua gói/membership Collective qua app (mua trước bình thường), nhưng **không đặt chỗ buổi tập trước** — khi tới nơi, thao tác trên kiosk/tablet tại chỗ: hệ thống nhận diện member, xác nhận entitlement, hiện chỗ trống trực quan, member chọn và xác nhận tại chỗ, hệ thống tự trừ đúng gói (không vượt hạn mức), dữ liệu sync ngược về Mindbody. Khách hỏi thẳng: build được bằng Mindbody API không, API/tích hợp nào validate entitlement + tạo booking/usage + giữ sức chứa real-time.

**Cách giải quyết:** Đây là mục khả thi nhất, đề xuất **Phase 1**. Chuỗi API đủ dùng: `GetClasses` (chỗ trống real-time), `GetClientServices` (entitlement), `AddClientToClass` (tạo booking cho session/lớp cụ thể, tự trừ entitlement nếu là pass-based pricing), webhook (đẩy thay đổi booking/sức chứa gần real-time → phần "sync ngược Mindbody" gần như tự động). Kiến trúc: 1 web/tablet app riêng thương hiệu Wildsoul, gọi các API trên làm nguồn dữ liệu member/thanh toán.

**Refer Rory (BXR) — bằng chứng mạnh nhất trong cả report, đọc thẳng code thật:**
- **BXR đã có sẵn 1 kiosk check-in thật đang chạy production** — SSH pull code mới nhất từ `rory.cpanel` (`/home/bql6w65kif0q/www/booking/`) về `/home/nus/projects/Rory/code/booking/`, đọc trực tiếp 2 file `barcode_reader.php` + `barcode_ajax.php`:
  - Kiosk dùng **QuaggaJS** (thư viện JS mã nguồn mở) bật camera thiết bị quét mã vạch Code128 chứa Client ID — không cần đầu đọc chuyên dụng, có ô nhập tay dự phòng.
  - Quét xong gọi thẳng **`POST https://api.mindbodyonline.com/public/v6/client/addarrival`** với `{ClientId, LocationId}` — **đây là endpoint đúng cho bước "Arrive/nhận diện member" trong flow Wildsoul, KHÔNG PHẢI `AddClientToClass`** (bản nháp report trước đoán sai chỗ này, giờ đã sửa theo bằng chứng code thật).
  - Nếu `ArrivalAdded==1` → xanh "WELCOME" + gọi 1 thiết bị điều khiển cửa qua LAN nội bộ (`GET https://192.168.1.94/api/switch/caps`, IP riêng theo từng chi nhánh).
- **⚠️ Lỗ hổng thật, chính là gốc của ticket BXR-88 nêu ở mục A:** logic hiện tại **chỉ ghi nhận "có người tới" (`addarrival`) chứ KHÔNG hề gọi `GetClientServices` để kiểm tra entitlement/membership có hợp lệ hay không** trước khi mở cửa (xanh/WELCOME). Đây đúng là phần cốt lõi Wildsoul yêu cầu ("validate entitlement, không cho vượt hạn mức") mà **BXR chưa từng làm xong** — nên với Wildsoul, bước "check entitlement trước khi cho vào/cho book" là phần việc THẬT SỰ MỚI, không tái dùng nguyên code cũ được, cần ước lượng effort riêng cho đúng, đừng để khách nghĩ đây là "đã có sẵn, chỉ cần sao chép".
- **BXR-97 "App - Spot Booking"** (Done) — chức năng chọn 1 spot cụ thể trong lớp, giống hệt ý tưởng "chọn resource/session cụ thể tại kiosk". Bug thật (Rory Hackett ghi nhận): "booking hiện nhưng spot không hiện trong backend MB", và **"khi huỷ lớp, spot không được trả lại pool"** — ảnh hưởng trực tiếp bài toán giữ đúng sức chứa real-time Wildsoul cần. Cảnh báo: thiết kế kỹ khâu cancel/release entitlement, không chỉ test happy-path.
- **Gotcha kỹ thuật khác từ code thật** (nên tránh lặp lại): hardcode cứng Api-Key/SiteId/cookie ngay trong PHP (nên đưa vào config/env); gọi thiết bị cửa chạy **từ phía trình duyệt** (client-side JS) nên máy kiosk phải cùng mạng LAN với thiết bị cửa — code còn dấu vết thử nghiệm dở dang (đoạn cũ bị comment, thay bằng đoạn mới), không nên coi phần tích hợp phần cứng là "đã ổn định, cứ copy y chang".
- **Mindbody native Check-In app:** nên kiểm tra xem app có sẵn này của Mindbody có che được 1 phần nhu cầu trước khi build custom, tránh làm trùng — BXR chọn build custom (lý do có thể vì cần tích hợp thiết bị cửa riêng mà app native không hỗ trợ).
- **🔴🔴🔴 Phát hiện bảo mật thật, xác nhận trực tiếp trong code mobile khi đối chiếu với cảnh báo của ChatGPT (xem bên dưới) — KHÔNG liên quan Wildsoul, là lỗ hổng đang chạy thật trên BXR, cần báo Rory/Carrick sớm:** `src/store/baseUrl.js:4` hardcode plaintext Mindbody Api-Key thật ngay trong code React Native, và mọi cuộc gọi Mindbody trong `src/store/classes/saga.js` (đặt lớp, đặt PT, lấy credit, mua gói...) đều gọi **trực tiếp từ client-side JS** kèm key này trong header — nghĩa là key nằm sẵn trong bundle app đã build, ai bắt traffic hoặc decompile app đều lấy được. Web (`book-a-session.php`) thì đúng chuẩn hơn — key giữ ở PHP backend, không lộ ra trình duyệt. **Nên đề xuất Rory/Carrick xoay key + chuyển toàn bộ call Mindbody trên mobile qua 1 backend proxy trước khi làm gì thêm cho BXR.**

**ChatGPT đề xuất (đối chiếu — khớp hoàn toàn với phát hiện code thật ở trên):** Xác nhận nguyên tắc **"Không đặt API key trong kiosk hoặc mã JavaScript phía trình duyệt; Mindbody yêu cầu API call xuất phát từ backend"** — đây chính là nguyên tắc mobile BXR đang VI PHẠM thật (xem trên), nên với kiosk Wildsoul phải làm đúng ngay từ đầu, không lặp lại lỗi này. Các nguyên tắc khác cũng hợp lý: không cho tìm toàn bộ danh sách member trên màn hình công cộng; dùng QR (branded app) hoặc phone/email+OTP để xác thực, không dùng họ tên/ngày sinh; **kiosk không được tự trừ lượt cục bộ rồi đồng bộ sau** (đúng khớp bug BXR-97 "spot không release" ở trên); capacity hiển thị có thể cache ngắn nhưng thao tác booking cuối phải đi trực tiếp Mindbody; có timeout tự động + che dữ liệu cá nhân + xoá phiên sau mỗi lượt; khi Mindbody gián đoạn nên chuyển "staff-assisted mode", không nhận booking offline nếu chưa có cơ chế reconciliation chặt. Về mô hình hoá Collective trong Mindbody, đề xuất thử **"Appointment + resource"** trước (mỗi sauna/pod/boot = 1 resource có khung giờ riêng) thay vì "class with capacity" (nhiều người 1 session cố định) — Mindbody có endpoint xem bookable items + tạo appointment + webhook khi appointment tạo/sửa/huỷ.

**Kết luận mục C:** Vẫn là Phase 1 hợp lý nhất — BXR đã có 60-70% pattern thật (quét mã CODE128 cả 2 chiều web+mobile, gọi `addarrival`, tích hợp thiết bị cửa). Nhưng phải bổ sung 2 việc trước khi làm cho Wildsoul: (1) validate entitlement thật trước khi cho vào/cho book — phần BXR chưa làm xong ở cả web lẫn mobile, và (2) áp toàn bộ nguyên tắc bảo mật của ChatGPT ngay từ thiết kế đầu (đặc biệt: không gọi Mindbody API từ client-side, học đúng bài học từ lỗi thật của BXR mobile). Cần quyết định sớm mô hình Collective trong Mindbody là appointment+resource hay class trước khi code, theo gợi ý ChatGPT nên thử appointment+resource trước.

---

## D. Đồng bộ quyền truy cập đa chi nhánh

**Khách nói gì:** Mỗi chi nhánh mới tạo thêm nhiều tổ hợp hợp đồng/pricing/dịch vụ/quyền cần nhất quán. Foundation/legacy nên chỉ giới hạn 1 chi nhánh; Premium/Passport cố ý cho network-wide; quyền Class/Recovery/Collective phải tách biệt rõ; thay đổi cần validate trước khi áp dụng cho số đông, tránh lỗi cấu hình lan dây chuyền.

**Cách giải quyết:** Mindbody có data quan hệ member-chi nhánh (cross-site relations) nhưng không có endpoint "quét lỗi cấu hình" sẵn. Hướng làm: job định kỳ (VD hàng đêm) kéo toàn bộ member + quyền chi nhánh, so với "luật đúng" Wildsoul định nghĩa, xuất case lệch chuẩn cho đội vận hành review. Với member số lớn, do giới hạn ~1.000 call/ngày, quét toàn network 1 lần có thể phải chia nhiều ngày — cần bàn tần suất chấp nhận được.

**Refer Rory (BXR) — bằng chứng mạnh nhất cho mục này:**
- **JIRA BXR-224 "UAE - BE - Implement Region-Aware Mindbody Integration"** — fetch trực tiếp qua API xác nhận status **"Deployed on staging"** (đã code xong, deploy thật). Kiến trúc: mỗi vùng/chi nhánh lớn = **1 SiteId riêng biệt** (London=SiteId 427862, UAE=SiteId 586783), không phải 1 site chung có field "region". Acceptance criteria: (1) Dynamic SiteId injection — backend tự chọn đúng SiteId theo context, (2) Environment variables per-region, (3) Region-aware booking, (4) Region-aware purchases. → Bằng chứng kỹ thuật mạnh nhất có thể đưa cho Wildsoul: pattern "1 SiteId/config riêng per location + lớp routing chọn đúng SiteId theo member" đã làm thật, không phải làm từ số 0.
- **Giới hạn thật cần nói rõ:** cách BXR làm ngầm định mỗi location = 1 Mindbody site độc lập (không chia sẻ member DB mặc định). Phần khó thật sự không phải "gọi đúng site" (đã giải được) mà là **"hợp nhất identity 1 member khi active ở nhiều site"** (đúng nhu cầu Passport/cross-location của Wildsoul). LeNH (backend BXR) từng mở ticket hỏi thẳng Mindbody support đúng chủ đề **"Client ID number (client membership number) across multi-regions"**, Mindbody đã reply qua email cho Carrick — nhưng team CHƯA có xác nhận rõ ràng/giải pháp hoàn chỉnh cho phần merge-identity này. Nên hỏi lại Mindbody support 1 lần nữa cho case Wildsoul cụ thể (chính sách/API có thể đã đổi), không giả định y hệt câu trả lời cũ.
- **BXR-152 "Trainers not Syncing"** (Done, 4 comment debug thật) — hé lộ cách lọc dữ liệu theo chi nhánh qua API thật:
  ```
  ProgramIds: 54,59,85,60,84,55,65,66,53,47,49,58,64,69,70
  locationIds: BXR City, BXR Marylebone
  StartDate: now → EndDate: next month
  ```
  Bug thật: 1 trainer (Monika) active nhưng không hiện vì tổ hợp filter không khớp đúng case — mất 3 vòng trao đổi (02/12→10/12) mới fix. Bài học: lọc theo chi nhánh dễ sai ở tổ hợp filter, không chỉ đơn giản "theo SiteId" — cần test kỹ với dữ liệu thật từng chi nhánh Wildsoul.
- **BXR-112 "Location Selector not working"** (Done) — việc tưởng đơn giản (kéo danh sách `locations` từ Mindbody cho dropdown chọn chi nhánh) mất hơn 1 tháng (17/06→15/07/2026, 2 lần cập nhật kèm build iOS/Android mới) vì đổi 1 chỗ kéo theo sửa nhiều màn hình khác dùng location. → Bài học ước lượng: đừng coi việc liên quan đến "location" là 1-API-call-là-xong khi location là khái niệm xuyên suốt hệ thống.
- **⚠️ Phát hiện đáng chú ý ở mobile app:** dù JIRA BXR-224/221 ghi "Deployed on staging" cho region-aware integration, code mobile pull về (`src/store/baseUrl.js:8`) vẫn **hardcode cứng `siteId = '427862'`** (SiteId London) — không thấy cơ chế chọn SiteId động theo region nào trong app. Có thể do: (a) repo pull về chưa phải nhánh mới nhất có phần UAE, hoặc (b) phần region-aware mới chỉ xong ở BE/staging, chưa lan xuống mobile thật. → Không nên khẳng định với Wildsoul là "multi-region đã chạy đầu-cuối" chỉ dựa vào status JIRA — cần hỏi lại Rory/Carrick xem UAE đã thật sự live trên app hay chỉ dừng ở BE, trước khi dùng case này làm bằng chứng "đã làm xong" trong buổi họp.

**ChatGPT đề xuất (đối chiếu):** Đề xuất xây **canonical entitlement catalogue** (ma trận product × service × location) làm nguồn chuẩn duy nhất, và chạy kiểm tra drift (lệch chuẩn) định kỳ so với catalogue này — về bản chất giống hướng "job định kỳ so với luật đúng" mình đã đề xuất, nhưng đặt tên/khung rõ ràng hơn (1 catalogue trung tâm thay vì rule rải rác). Đây là ý nên giữ vì nó cũng chính là nền tảng dùng chung cho cả mục A (rule engine cần đọc catalogue này) và mục C (kiosk cần biết đúng entitlement nào hợp lệ ở location nào).

**Kết luận mục D:** Có pattern kiến trúc thật từ BXR-224 (1 SiteId/config riêng per region) đáng tham khảo, nhưng **cần verify lại với Rory xem đã thật sự chạy đầu-cuối (kể cả mobile) hay mới chỉ xong ở backend** trước khi dùng làm bằng chứng "đã làm được" cho Wildsoul. Phần khó nhất (hợp nhất identity qua nhiều site) BXR vẫn chưa có câu trả lời rõ ràng từ Mindbody. Nên áp dụng ý tưởng "canonical entitlement catalogue" của ChatGPT làm nền tảng chung, dùng lại được cho cả mục A/C, thay vì chỉ làm 1 job quét riêng lẻ.

---

## E. Báo cáo & data visibility network-level

**Khách nói gì:** Report chuẩn Mindbody không trả lời đúng câu hỏi vận hành, phải cross-check qua nhiều report/profile — vừa là vấn đề report vừa là vấn đề cấu trúc dữ liệu (quan hệ phức tạp giữa pricing option và nhiều hợp đồng qua nhiều chi nhánh gây phân loại không nhất quán). Ví dụ: tìm member bị cấu hình quyền chéo chi nhánh ngoài ý muốn, member suspend nhưng vẫn bị charge, member dùng sản phẩm legacy với quyền cụ thể. Cần cái nhìn network-level thay vì điều tra từng chi nhánh, và audit trail dễ truy cập hơn.

**Cách giải quyết:** Mục khả thi tốt, đề xuất **Phase 2**. Toàn bộ data nền (client, sale, hợp đồng, danh sách lớp) lấy được qua API GET, webhook bắt mọi thay đổi — đủ để build pipeline riêng: kéo định kỳ + log qua webhook, đẩy vào BI (Tableau/Power BI/dashboard tự build). Ví dụ "suspend nhưng vẫn charge" hoàn toàn làm được bằng đối chiếu 2 tập dữ liệu (trạng thái member + lịch sử sale). Không phải giới hạn API mà là thiếu lớp BI riêng — công sức chủ yếu ở xây pipeline/dashboard.

**Refer Rory (BXR):**
- **BXR-173 "Not all profiles are synced in Klaviyo"** (Done, 0 comment) — phát hiện: có push token nhưng không link được profile Mindbody ở nhiều trường hợp. Ticket đóng "Done" nhưng KHÔNG có comment ghi lại root cause — dấu hiệu case này có thể chỉ được vá tạm, chưa chắc hiểu hết nguyên nhân gốc. Bài học: đừng coi "Done" trên ticket = đã hiểu hết vấn đề đồng bộ dữ liệu, nên có bước audit lại định kỳ.
- **BXR-160 "Research Klaviyo Token/MB Profile Sync"** (Done) — xác nhận team đã có kinh nghiệm thật nghiên cứu + build pipeline đồng bộ Mindbody ↔ hệ thống ngoài (Klaviyo) — đúng năng lực cần cho việc xây BI pipeline của Wildsoul, dù đối tượng khác (marketing tool thay vì BI tool).
- **Mobile:** không có code liên quan reporting/BI/Klaviyo trong app (hợp lý, đây là việc backend/marketing, không phải app hiển thị cho member) — không có gì để cross-check thêm ở phía mobile cho mục này.

**ChatGPT đề xuất (đối chiếu):** Nhấn mạnh 1 điểm mình chưa nêu rõ: Mindbody Webhooks **có thể gửi trùng, không đảm bảo đúng thứ tự, chỉ retry trong khoảng thời gian hữu hạn** — nên kiến trúc pipeline phải có: webhook receiver trả phản hồi nhanh, queue + dead-letter queue, dedup theo message/event ID, version/timestamp để chống event cũ ghi đè dữ liệu mới, **reconciliation với Mindbody mỗi 24h** (không chỉ dựa 100% vào webhook), và bảng lịch sử effective-from/effective-to cho contract/entitlement (để trả lời được "tại thời điểm X, member này có quyền gì"). Đề xuất cụ thể danh sách 8 exception monitor nên làm đầu tiên (member vào sai home location, suspended nhưng vẫn bị charge, active nhưng không có entitlement dùng được, entitlement dùng ở location ngoài template, contract thay thế lệch autopay/giá, product/service mapping khác chuẩn giữa các studio, webhook/reconciliation bị trễ, booking app fail dù eligibility checker dự đoán hợp lệ) — danh sách này thực dụng, có thể dùng thẳng làm checklist thiết kế dashboard cho Wildsoul.

**Kết luận mục E:** Vẫn là Phase 2 hợp lý — đủ data qua API, chỉ cần xây pipeline. Điểm bổ sung quan trọng từ ChatGPT: đừng tin tưởng webhook 100% (trùng/lệch thứ tự là chuyện thật của chính Mindbody, không phải lỗi code), bắt buộc có reconciliation định kỳ + dedup — nếu không sẽ lặp lại đúng kiểu lỗi "Done nhưng không rõ root cause" như BXR-173. Dùng ngay danh sách 8 exception monitor của ChatGPT làm điểm khởi đầu thiết kế dashboard.

---

## F. Đồng bộ backend ↔ app/booking

**Khách nói gì:** Cấu hình đúng ở Mindbody backend nhưng branded app/booking online không phản ánh đúng ngay lập tức. Cần thấy rõ trạng thái sync + case lỗi giữa backend và kênh khách hàng thấy, và cần test thay đổi trước khi lên live (đặc biệt campaign, sự kiện, đổi giá, mở chi nhánh mới).

**Cách giải quyết:** Mục khó nhất. Mindbody **không có endpoint "trạng thái đồng bộ"** — không phải giới hạn API mà là bài toán tự giám sát hoàn toàn ngoài phạm vi Mindbody: phải tự build hệ thống kiểm tra độc lập (canary) — gọi API lấy trạng thái backend, tự động kiểm tra qua giao diện app/web khách thấy (có thể cần automation duyệt web/app), so sánh 2 bên để phát hiện lệch. Webhook chỉ xác nhận "backend đã đổi" chứ không xác nhận "đã lan xuống app". Nên để phase cuối, cần bàn kỹ scope với khách trước khi cam kết.

**Refer Rory (BXR):**
- **Email thật (Rory forward tới carrick@, 11/03/2026): "DEACTIVATED: Your MINDBODY Webhooks Subscription has been deactivated"** — Mindbody tự động huỷ webhook subscription của BXR do **"high number of delivery failures"**. Webhook URL lúc đó là `https://airlines-sublime-chen-ram.trycloudflare.com/...` — **1 tunnel Cloudflare tạm thời** (kiểu dùng test local), rất có thể là nguyên nhân fail liên tục. Sau khi bị huỷ, phải tự gọi `PATCH Subscription` để kích hoạt lại thủ công. **Bài học trực tiếp cho Wildsoul:** endpoint nhận webhook (dùng cho mục C/E lẫn F) BẮT BUỘC phải là domain production ổn định, không dùng tunnel tạm/ngrok/cloudflared cho production, và nên có cơ chế tự kiểm tra + cảnh báo nếu Mindbody báo huỷ subscription để không mất dữ liệu âm thầm.
- **BXR-264 "Timetable not syncing correctly"** (Done, 1 comment debug chi tiết bởi Carrick) — câu chuyện debug thật: xoá cache Admin (không được) → debug trực tiếp source code, test qua Mindbody API như website đang gọi (lớp vẫn không hiện) → so sánh dev site (dev site lại hiện đúng, rất lạ) → cuối cùng tìm ra nguyên nhân ở phía cấu hình Mindbody riêng của BXR. Xác nhận thực tế: bug "backend đúng nhưng app/web không hiện" từng xảy ra thật và **không có cách chẩn đoán nhanh** — phải debug nhiều lớp (cache→code→API→so sánh môi trường) mới ra, đúng như Wildsoul đang than phiền. Đây là bằng chứng cho khách thấy team hiểu rõ độ khó thật của mục F, không phải nói suông.
- Dòng thời gian v5→v6 (BXR-7/37 02/2024 → BXR-72 09/2024 → BXR-140 "Review and remove all MindBody v5" 10/2025): dọn sạch hoàn toàn v5 mất **gần 2 năm**. Nếu Wildsoul đang dùng phần nào sắp deprecate, nên hỏi rõ version hiện tại ngay từ đầu, không đánh giá thấp thời gian dọn legacy.
- **Mobile — chính là ví dụ thật rõ nhất của mục F đang tồn tại ngay lúc này:** waiver mobile dùng WaiverMaster (bên thứ 3) trong khi web dùng Mindbody native (`/site/liabilitywaiver`) — đã nêu chi tiết ở mục A. Đây không phải case lịch sử đã fix như BXR-264, mà là **sự lệch pha đang tồn tại thật giữa 2 kênh cùng lúc, chưa ai coi là bug cần fix** — minh chứng sống rằng "backend đúng nhưng app xử lý khác" có thể tồn tại âm thầm rất lâu nếu không có cơ chế phát hiện chủ động, đúng khớp lo ngại của Wildsoul ở mục F.

**ChatGPT đề xuất (đối chiếu):** Đề xuất quy trình cụ thể cho rollout: **synthetic test members** (tài khoản giả lập cho từng loại membership archetype) để tự động test xuyên suốt các kênh, **pre-launch checklist** trước mỗi lần đổi giá/mở campaign/mở chi nhánh mới, **canary rollout** (bật cho 1 nhóm nhỏ trước khi bật toàn network), và có màn hình theo dõi riêng trạng thái đồng bộ giữa backend/API/app. Cách tiếp cận này thực dụng hơn "tự xây canary tổng quát" mình đề xuất trước — cụ thể hoá thành quy trình test có thể lặp lại mỗi lần Wildsoul launch thứ gì mới, thay vì chỉ là 1 hệ giám sát chạy nền.

**Kết luận mục F:** Đây vẫn là mục khó nhất, không phải giới hạn API mà là bài toán quy trình/giám sát. Case waiver web-vs-mobile của chính BXR là bằng chứng sống, đang xảy ra, cho thấy loại lỗi này rất dễ tồn tại âm thầm nhiều tháng nếu không chủ động test. Nên áp dụng quy trình synthetic-member + pre-launch checklist + canary của ChatGPT làm khung vận hành chính thức cho Wildsoul, thay vì chỉ hứa "sẽ có hệ giám sát" chung chung.

---

## Đề xuất lộ trình (bổ sung Phase 0 theo đề xuất ChatGPT — hợp lý, nên áp dụng)

| Phase | Nội dung | Vì sao |
|---|---|---|
| **0 — Feasibility spike (2-3 tuần)** | Kết nối Mindbody sandbox + 1 site thử; lập inventory SiteID/LocationID/ContractID/ProductID/ServiceID/ProgramID thật của Wildsoul; thu thập 20-30 case booking-fail thật; test trực tiếp các endpoint client services/contracts/bookable items/booking/cross-regional lookup; chốt mô hình hoá Collective (appointment+resource hay class); xác minh quota + quyền tài khoản Wildsoul. | **Cổng go/no-go trước khi cam kết scope/giá** — đúng tinh thần "test sandbox trước khi hứa" mình nhấn mạnh xuyên suốt report. Chi phí thấp, giảm rủi ro toàn bộ các phase sau. |
| 1 | **C — Kiosk Collective** | BXR đã có sẵn 60-70% pattern thật (quét mã, check-in, thiết bị cửa) — chỉ cần xây thêm phần validate entitlement (phần BXR cũng chưa xong) + vá lỗi bảo mật API-key-lộ-client-side đã phát hiện. Rủi ro thấp nhất, ước lượng ~2-3 tuần cho phần mở rộng. |
| 2 | **E — Báo cáo network-level** | Đủ data qua API+webhook, chỉ cần xây pipeline + reconciliation định kỳ — không phụ thuộc gỡ vướng gì từ Mindbody trước. |
| 3 | **A, D** | Cần xây thêm rule engine (A, theo mô hình 2 tầng + decision-trace) và canonical entitlement catalogue (D) — có pattern tham khảo từ BXR nhưng cần code mới, và mục A có rủi ro nền (BXR-88 chưa giải). |
| 4 (cần khảo sát thêm trước khi cam kết) | **B, F** | B: chưa xác nhận bulk endpoint có tồn tại, không có pattern nào từ BXR để tái dùng — phải hỏi Mindbody trước, áp quy trình four-eyes/idempotency/exception-queue. F: không phải bài toán API, phải tự xây quy trình synthetic-member + canary rollout, scope cần bàn kỹ với khách. |

## Lưu ý pháp lý (Úc) — bổ sung theo ChatGPT, mình chưa từng đề cập

Wildsoul vận hành tại Úc, và kiosk/data store sẽ xử lý dữ liệu cá nhân (bao gồm health questionnaire — dữ liệu nhạy cảm). Cần thiết kế theo nguyên tắc: thu thập tối thiểu, kiểm soát truy cập, mã hoá, audit log, chính sách retention/de-identification, và có quy trình xử lý khi xảy ra data breach — theo yêu cầu của OAIC (Australian Privacy Principle 11 + Notifiable Data Breaches scheme). Đây là điểm cần đưa vào scope ngay từ Phase 0/1, không nên để tới lúc build kiosk (Phase 3) mới nghĩ tới, vì ảnh hưởng cách thiết kế lưu trữ dữ liệu member/health form ngay từ đầu.

## Câu hỏi còn mở

1. Bulk update endpoint (mục B) có thật sự tồn tại trong Mindbody API v6 không — cần hỏi thẳng Mindbody support/sandbox, BXR cũng chưa từng dùng qua.
2. Hợp nhất identity 1 member qua nhiều site (mục D, phần khó nhất) — LeNH từng hỏi Mindbody nhưng chưa có xác nhận rõ ràng, cần hỏi lại cho case Wildsoul.
3. `AddClientToClass` có validate/trừ entitlement *trước khi* xác nhận booking hay chỉ *sau khi* — ảnh hưởng UX kiosk pre-flight (mục C), cần test sandbox thật.
4. Mindbody native Check-In app có che được 1 phần nhu cầu kiosk Collective không — nên kiểm tra trước khi build custom.
5. Wildsoul hiện đang ở Mindbody version/API tier nào, có sẵn API access chưa — cần hỏi trước khi báo giá bất kỳ mục nào.
6. ⚠️ **ChatGPT khẳng định Mindbody "hỗ trợ cross-regional lookup cho client services, schedule, visits và contracts"** — claim này **CHƯA verify được với bằng chứng thật**, và có dấu hiệu mâu thuẫn với thực tế BXR (LeNH phải mở ticket hỏi thẳng Mindbody đúng vấn đề multi-region client ID, không dùng được tính năng có sẵn nào nếu nó tồn tại). Không đưa claim này vào proposal cho khách như sự thật đã xác nhận — phải test trực tiếp trong Phase 0.
7. Region-aware integration của BXR (BXR-224/221, JIRA ghi "Deployed on staging") có thật sự chạy tới mobile app chưa, hay mới chỉ ở backend — code mobile pull về vẫn hardcode SiteId London, cần hỏi lại Rory/Carrick trước khi dùng case này làm bằng chứng "đã chạy đầu-cuối" với Wildsoul.

## 🔴 Việc cần làm riêng, không thuộc phạm vi Wildsoul — báo cho Rory/BXR sớm

Đào code phục vụ report này phát hiện: Mindbody Api-Key thật bị hardcode plaintext trong `bxr-app-2022/src/store/baseUrl.js` và được gọi trực tiếp từ client-side JS ở nhiều nơi trong `src/store/classes/saga.js` — lỗ hổng bảo mật đang tồn tại thật trên app production của BXR, không phải rủi ro giả định. Khuyến nghị: xoay key trên Mindbody Developer Portal + chuyển các call này qua 1 backend proxy (theo đúng mẫu web `book-a-session.php` đã làm đúng). Cần báo việc này cho Rory/Carrick/Minh Trinh xử lý độc lập với việc trao đổi Wildsoul.

## Nguồn

- PDF brief gốc: "Wildsoul Mindbody x NUS Technology" (đính kèm email Chien Tran, 14/09/2026)
- Mindbody Public API v6.0 docs — developers.mindbodyonline.com
- Mindbody Webhooks Documentation — developers.mindbodyonline.com/WebhooksDocumentation
- Matrix room "Rory Hackett - BXR App", Slack "Swift Studio" (full thread reads)
- JIRA swiftstudio.atlassian.net, project BXR — 25 ticket liên quan Mindbody, đọc trực tiếp qua API
- Email carrick@nustechnology.com (Mindbody support correspondence)
- **Code thật (web):** SSH `rory.cpanel` → pull về `/home/nus/projects/Rory/code/booking/` (276+ file, đọc trực tiếp `barcode_reader.php`, `barcode_ajax.php`, `mb_v6.php`, `sweatApi/functions.php`)
- **Code thật (mobile):** GitHub `Brando-Media/bxr-app-2022` (React Native) → clone về `/home/nus/projects/Rory/code/mobile/bxr-app-2022/`, đọc trực tiếp `src/store/classes/saga.js`, `src/store/baseUrl.js`, `src/screens/profile/{FormWeb,WavierKing,BarcodeSection}.js`
- Phân tích đối chiếu từ ChatGPT (link chia sẻ, không fetch được trực tiếp do Cloudflare chặn — nội dung do user paste vào), đối chiếu thủ công với bằng chứng thật ở trên trước khi đưa vào report
