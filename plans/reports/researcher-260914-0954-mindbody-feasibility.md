# Mindbody API Feasibility — Wildsoul Wellness Brief

**Date:** 2026-09-14
**Nguồn brief:** Email "Wildsoul Mindbody x NUS Technology.pdf" forward từ Chien Tran (CEO), khách Wildsoul Wellness (multi-location wellness studio, Úc), dùng Mindbody.
**Yêu cầu của khách:** đánh giá tính khả thi kỹ thuật cho 6 hạng mục, đề xuất kiến trúc + lộ trình theo giai đoạn (ưu tiên value cao nhất trước).

---

## Phần tiếng Việt — Khách nói gì & mình giải quyết thế nào

*(Dịch/diễn giải sát nội dung file PDF "Wildsoul Mindbody x NUS Technology" khách gửi kèm email, không thêm ý ngoài brief. Phần "Cách giải quyết" dựa trên nghiên cứu Mindbody Public API v6 thật, có trích API cụ thể.)*

### A. Không biết vì sao member không book được lớp

**Khách nói gì:** Đây là vấn đề gây khó chịu member nhiều nhất hiện tại. Việc 1 member có book được lớp/dịch vụ hay không phụ thuộc vào nhiều thứ liên kết với nhau: gói/pricing option họ đang có, dịch vụ gói đó có bao gồm hay không (entitlement), chi nhánh, cấu hình lớp/appointment, và lịch. Vấn đề là khi booking fail, Mindbody **không nói rõ lý do** — có thể lớp, lịch, pricing option nhìn "có vẻ" cấu hình đúng nhưng member vẫn không book được, mà lỗi lại hiện khác nhau giữa backend/app/web booking. Đội vận hành của Wildsoul phải mò từng màn hình, test thử từng profile, rồi phải escalate lên Mindbody support mới ra được nguyên nhân. Họ muốn có 1 "diagnostic view" nói thẳng ra kiểu: *"Member không book được vì Pricing Option X không bao gồm Service Y tại Location Z."*

**Mình giải quyết thế nào:** Mindbody API có sẵn data để lấy — `GetClientServices` cho biết member đang có gói/pricing option gì đang active, `GetClasses` cho biết lớp đó cấu hình giới hạn gì (chi nhánh, sức chứa, pricing tier yêu cầu). Vấn đề là Mindbody **không có 1 endpoint duy nhất trả thẳng "lý do fail"** — nên mình phải tự xây 1 lớp logic ở giữa: kéo full thông tin gói của member + full rule của lớp, rồi so khớp từng điều kiện (chi nhánh khớp không, entitlement có bao gồm dịch vụ không, còn hạn không...) để tự sinh ra câu giải thích. Về bản chất là build 1 "rule engine" nhỏ chạy trên dữ liệu API, không phải chỉnh gì trong Mindbody. Độ khó ở mức trung bình vì phải fix cứng nhiều luật nghiệp vụ dựa theo cách Mindbody thực sự vận hành (phải test kỹ với nhiều case thật của Wildsoul để rule engine đúng, không đoán).

### B. Sửa hợp đồng/membership hàng loạt đang phải làm tay từng người

**Khách nói gì:** Wildsoul đang scale nhiều chi nhánh, cấu trúc membership ngày càng phức tạp (Foundation, Move, Recover, Balance, Premium, Collective, gói lẻ, trả trọn gói, membership cũ...). Ví dụ cụ thể họ đưa ra: member Foundation cần giữ giá cũ (legacy pricing) nhưng lại đổi sang cơ cấu quyền lợi khác (như thay đổi quyền vào phòng red-light hoặc giới hạn lượt dùng) — muốn đổi thì phải **hủy hợp đồng cũ bằng tay rồi tạo hợp đồng mới khớp chính xác ngày autopay**, vừa giữ giá vừa check lại quyền dịch vụ vừa check quyền đa chi nhánh vừa review lại từng profile sau khi đổi. Vấn đề là việc này đang làm **từng profile một** — khi số lượng member cần đổi cùng lúc lớn (do thay đổi chính sách chung) thì rủi ro sai sót và rủi ro billing tăng theo quy mô. Họ muốn 1 workflow ở cấp toàn network: có template đã duyệt sẵn, đổi hàng loạt, validate trước khi đổi, báo cáo case lỗi (exception), và có audit trail đầy đủ.

**Mình giải quyết thế nào:** Đây là hạng mục rủi ro cao nhất trong 6 cái. Mindbody API cho phép đọc và sửa từng client/contract riêng lẻ, nhưng tài liệu API v6 công khai **không xác nhận có endpoint update hàng loạt (bulk)** — nghĩa là về mặt kỹ thuật có thể phải lặp update từng người một, mà API lại giới hạn khoảng 1.000 call/ngày cho 1 API key, nên sửa vài trăm/nghìn member cùng lúc sẽ đụng trần rate-limit, và không có cơ chế rollback nếu giữa chừng lỗi (100 người đã đổi, người 101 lỗi thì 100 người trước vẫn đã bị đổi rồi, không tự động hủy được). **Trước khi báo giá hay cam kết bất kỳ gì cho hạng mục này, cần hỏi thẳng Mindbody (support hoặc sandbox account) xem có endpoint update hàng loạt thật sự tồn tại không** — nếu không có, giải pháp sẽ phải là 1 hàng đợi (queue) tự chạy tuần tự có log + validate từng bước + cảnh báo khi có case bất thường, và phải nói rõ với khách đây không phải "bulk update tức thời" mà là "chạy nền có kiểm soát".

### C. Muốn làm kiosk on-site riêng cho khu "Wildsoul Collective"

**Khách nói gì:** Khu Collective có hành trình khách hàng khác hẳn lớp học thông thường, không nên ép vào flow đặt lịch trước như các lớp khác. Ý tưởng của họ: member mua gói/membership Collective qua app riêng của Wildsoul (mua trước được, bình thường), nhưng **không đặt chỗ buổi tập trước online** — mà khi tới nơi, member sẽ thao tác trên 1 màn hình tại chỗ (kiosk/tablet): hệ thống nhận diện member, xác nhận họ còn quyền lợi (entitlement) hay không, hiển thị những gì đang trống ngay lúc đó theo dạng trực quan, member chọn buổi/tài nguyên còn trống và xác nhận ngay tại chỗ, hệ thống tự trừ đúng gói/membership và **không cho vượt quá hạn mức**, đồng thời dữ liệu sử dụng phải đồng bộ ngược về Mindbody để Mindbody vẫn quản lý được member + thanh toán. Khách hỏi thẳng: cái này build được bằng Mindbody API không, và Mindbody có API/cách tích hợp nào để validate quyền lợi, tạo booking/usage, và giữ sức chứa real-time không.

**Mình giải quyết thế nào:** Đây là hạng mục khả thi nhất và nên làm trước (Phase 1). Mindbody API hỗ trợ đủ cả chuỗi: `GetClasses` lấy sức chứa còn trống theo thời gian thực, `GetClientServices` xác nhận member còn active pricing option/entitlement hay không, `AddClientToClass` tạo booking và Mindbody sẽ tự trừ entitlement nếu gói đó theo kiểu pass/entitlement pricing, và Mindbody có webhook đẩy thông báo khi có booking mới/thay đổi sức chứa gần như real-time — nên phần "sync ngược về Mindbody" gần như tự động chứ không cần mình tự đẩy lại thủ công. Về kiến trúc, đây sẽ là 1 web app/tablet app riêng do NUS build (giao diện thương hiệu Wildsoul), chạy phía sau gọi các API trên của Mindbody làm nguồn dữ liệu member/thanh toán. Cần lưu ý: Mindbody có sẵn app Check-In riêng của họ — nên kiểm tra xem app đó có che được 1 phần nhu cầu (nhận diện member khi tới) trước khi build từ đầu, tránh làm trùng. Điểm chưa xác nhận: entitlement được validate/trừ *trước khi* xác nhận booking (để báo lỗi ngay nếu hết hạn mức) hay chỉ trừ *sau khi* xác nhận — cần test trên sandbox Mindbody thật để chắc chắn UX kiosk mượt.

### D. Quyền truy cập đa chi nhánh dễ bị cấu hình sai khi lên thêm chi nhánh mới

**Khách nói gì:** Mỗi chi nhánh mới mở ra sẽ tạo thêm rất nhiều tổ hợp hợp đồng/pricing/dịch vụ/quyền truy cập cần giữ nhất quán. Ví dụ: membership Foundation/legacy nên chỉ giới hạn 1 chi nhánh, còn Premium/Passport thì cố ý cho phép truy cập toàn network, còn quyền Class/Recovery/Collective phải tách biệt rõ ràng — và mọi thay đổi cấu hình cần được kiểm tra (validate) trước khi áp dụng cho số đông member, tránh 1 lỗi cấu hình nhỏ ảnh hưởng dây chuyền cả network.

**Mình giải quyết thế nào:** Mindbody có data về quan hệ member với các chi nhánh (cross-site/location relations) qua API, nhưng không có sẵn 1 endpoint "quét ra lỗi cấu hình" — nên hướng làm là: định kỳ (ví dụ hàng đêm) chạy 1 job tự động kéo toàn bộ member + quyền chi nhánh của họ, so với "luật đúng" mà Wildsoul định nghĩa (ai được network-wide, ai chỉ 1 chi nhánh), rồi xuất ra danh sách các case lệch chuẩn để đội vận hành review, thay vì họ phải tự lọc thủ công. Với số lượng member lớn (chục nghìn), do giới hạn ~1.000 call/ngày của API, việc quét toàn network 1 lần có thể phải chia làm nhiều ngày — cần bàn với khách về tần suất quét chấp nhận được (theo tuần hay theo ngày).

### E. Báo cáo hiện tại không trả lời được câu hỏi vận hành thực tế

**Khách nói gì:** Report chuẩn của Mindbody không trả lời được đúng câu hỏi vận hành cần, phải tự cross-check qua nhiều report hoặc từng profile — bản thân đây vừa là vấn đề report vừa là vấn đề cấu trúc dữ liệu (vì 1 member/membership có thể bị phân loại không nhất quán do quan hệ phức tạp giữa pricing option và nhiều hợp đồng qua nhiều chi nhánh). Ví dụ cụ thể: tìm member bị cấu hình quyền truy cập chéo chi nhánh ngoài ý muốn, member bị suspend nhưng vẫn bị charge tiền, hoặc member đang dùng sản phẩm cũ (legacy) với 1 quyền lợi cụ thể. HQ cần cái nhìn ở cấp toàn network thay vì phải điều tra từng chi nhánh, và lịch sử thay đổi/audit trail cần dễ truy cập hơn.

**Mình giải quyết thế nào:** Đây là hạng mục khả thi tốt (Phase 2). Toàn bộ dữ liệu nền (client, sale, hợp đồng, danh sách lớp) đều lấy được qua API dạng GET, và webhook của Mindbody bắt được mọi thay đổi (mutation) — đủ để build 1 pipeline riêng: kéo dữ liệu định kỳ + log mọi thay đổi qua webhook, đẩy vào 1 lớp BI (Tableau/Power BI hoặc dashboard tự build) để tạo báo cáo đúng câu hỏi Wildsoul cần thay vì report có sẵn của Mindbody. Ví dụ báo cáo "suspend nhưng vẫn charge" hoàn toàn làm được bằng cách đối chiếu 2 tập dữ liệu (trạng thái member + lịch sử sale) trong pipeline riêng. Đây không phải giới hạn của Mindbody API mà là việc thiếu 1 lớp BI/report engine riêng cho Wildsoul — công sức chủ yếu nằm ở xây pipeline + dashboard, không phải rủi ro kỹ thuật với Mindbody.

### F. Cấu hình backend đôi khi không lên đúng trên app/booking cho khách hàng thấy

**Khách nói gì:** Có tình trạng cấu hình đúng trong Mindbody backend nhưng app thương hiệu (branded app) hoặc trải nghiệm đặt lịch online lại không phản ánh đúng ngay lập tức. Họ cần nhìn thấy rõ trạng thái đồng bộ (sync) và các trường hợp đồng bộ lỗi giữa backend và các kênh khách hàng thấy, và mong muốn thay đổi (đặc biệt cho campaign, sự kiện, đổi giá, mở chi nhánh mới) có thể test trước khi thực sự lên live.

**Mình giải quyết thế nào:** Đây là hạng mục khó nhất vì Mindbody **không hề có endpoint nào báo "trạng thái đồng bộ"** — nói cách khác, đây không phải là giới hạn kỹ thuật của API mà là 1 bài toán tự giám sát hoàn toàn nằm ngoài phạm vi Mindbody: mình sẽ phải tự build 1 hệ thống kiểm tra độc lập (kiểu "canary"), tự động gọi API lấy trạng thái cấu hình ở backend, đồng thời tự động kiểm tra qua giao diện app/web khách hàng thấy (có thể phải dùng automation duyệt web/app), rồi so sánh 2 bên để phát hiện lệch. Webhook chỉ xác nhận là "backend đã đổi" chứ không xác nhận "đã lan xuống app" — nên không dùng webhook thay thế được. Đây là hạng mục nên để sau cùng và cần trao đổi kỹ với khách về phạm vi thực tế trước khi cam kết, vì bản chất là xây thêm 1 hệ thống giám sát riêng chứ không phải tích hợp thêm với Mindbody.

---

## Bảng tóm tắt nhanh (đọc lướt)

| # | Hạng mục | Mindbody hỗ trợ tới đâu | Độ khó | Gợi ý |
|---|----------|--------------------------|--------|-------|
| A | Chẩn đoán lỗi booking | Có data thô, không có endpoint trả lý do — tự xây rule engine | Trung bình | Phase 3 |
| B | Sửa hợp đồng hàng loạt | Không xác nhận có bulk endpoint, giới hạn 1.000 call/ngày | Cao, rủi ro | Hỏi Mindbody trước khi báo giá |
| C | Kiosk Wildsoul Collective | Hỗ trợ đầy đủ chuỗi API + webhook | Thấp | 🟢 Phase 1 |
| D | Đồng bộ quyền đa chi nhánh | Có data, không có endpoint audit — tự quét định kỳ | Trung bình | Phase 3 |
| E | Báo cáo network-level | Đủ data + webhook, cần build BI riêng | Thấp-Trung bình | 🟢 Phase 2 |
| F | Đồng bộ backend↔app | Ngoài phạm vi API, cần hệ giám sát riêng | Cao | Phase cuối, cần bàn kỹ scope |

**Điều kiện tiên quyết:** xác nhận gói Mindbody của Wildsoul có bật API access + đủ quyền (Enrollment/ClassService/SaleService) trước khi báo giá bất kỳ hạng mục nào.

---

## Đối chiếu với dự án Rory (BXR App, Swift Studio) — kinh nghiệm thực tế đã làm với Mindbody

Check lại Matrix room "Rory Hackett - BXR App" + Slack "Swift Studio" thì team mình **đã tích hợp Mindbody thật trong production cho BXR London** — không phải lý thuyết, đây là bằng chứng năng lực thực tế nên đưa thẳng vào buổi nói chuyện với Wildsoul.

**Xác nhận từ chat thật (LuHX, LeNH, KhanhHH — 2026-09-14 sáng nay, khi được hỏi trực tiếp):**
- LuHX: App BXR dùng rất nhiều API v5. Khi Mindbody thông báo khai tử v5, docs của Mindbody cho v6 không rõ ràng, tự làm không ra — team đã **tạo ticket support với Mindbody**, trao đổi qua email với người tên Jeff bên Mindbody, được họ hướng dẫn cụ thể từng bước (login, update profile...) theo chuẩn v6. → Kinh nghiệm quý: Mindbody support thực sự phản hồi và hướng dẫn kỹ khi mình chủ động hỏi, không phải cứ đoán mù theo docs.
- LeNH (backend): đã từng tạo ticket riêng cho vấn đề **"Client ID number (client membership number) across multi-regions"** — đúng y hệt bài toán "quyền truy cập đa chi nhánh" (mục D) trong brief Wildsoul — Mindbody đã reply qua email cho Carrick. → Đây là bằng chứng cụ thể nhất: mình **đã từng hỏi Mindbody support đúng chủ đề multi-region member identity** và có phản hồi thật, nên với Wildsoul hoàn toàn có thể lặp lại cách này thay vì đoán.
- KhanhHH: phần việc của bạn thì không cần ticket hỗ trợ, tự làm được với docs sẵn có.

**Đối chiếu với Slack Swift Studio (lịch sử thật):**
- **OAuth2 với Mindbody:** Carrick từng hướng dẫn dev cụ thể flow OAuth (`/connect/authorize`, `/connect/token`) theo đúng doc `developers.mindbodyonline.com/.../authentication/oauth` — xác nhận flow OAuth chuẩn dùng được thật, không chỉ trên giấy.
- **Custom registration/waiver (liên quan mục A — entitlement/eligibility):** Mindbody's registration form **không cho tùy biến** — team đã xử lý bằng cách tự build 1 modal/màn hình riêng ngay sau khi user đăng ký để hiện điều khoản/checkbox, rồi lưu dữ liệu vào **CustomClientFields trên profile Mindbody** (field mở rộng Mindbody cho phép lưu data ngoài chuẩn). → Đây chính là pattern có thể tái dùng cho mục A: khi Mindbody không cho biết trực tiếp lý do fail, có thể lưu thêm metadata chẩn đoán vào CustomClientFields để tra cứu nhanh hơn.
- **Bug thật liên quan mục A:** log giờ làm của Jeff cho thấy các bug đã từng gặp và fix thật: "Credit Counter Issue", "Reservation History Not Working", "Membership..." — đúng dạng lỗi "member tưởng book được nhưng bị chặn do credit/entitlement" mà Wildsoul đang mô tả. Team đã có kinh nghiệm debug trực tiếp qua Mindbody backend (roryh: "in the back-end of Mindbody, this is what we see") để tìm nguyên nhân — quy trình thủ công tương tự cái Wildsoul đang than phiền, nên mình hiểu rõ nỗi đau này từ kinh nghiệm thật, không phải đoán.
- **Custom booking flow (liên quan mục C):** đã từng build "Booking Flow – BXR Member Classes" riêng cho app — chứng minh team có kinh nghiệm build UX đặt lịch tùy biến nằm trên nền Mindbody, đúng hướng cần cho kiosk Collective.
- **Đồng bộ dữ liệu ngoài Mindbody (liên quan mục D/E):** đã làm tích hợp Mindbody ↔ Klaviyo (đồng bộ field 2 chiều) và Mindbody ↔ Twilio (verify số điện thoại + check trùng qua database riêng của mình) — chứng minh team quen làm việc "Mindbody không đủ, phải build thêm lớp dữ liệu/đối chiếu riêng", đúng hướng giải pháp đề xuất cho mục D và E ở trên.

**Kết luận đối chiếu:** Brief Wildsoul không phải bài toán hoàn toàn mới — BXR App đã đụng gần hết các dạng vấn đề tương tự (multi-region member ID, entitlement/credit không rõ lý do fail, custom field mở rộng, custom booking flow, đồng bộ dữ liệu ngoài). Nên đưa case BXR vào buổi họp với Chien/Wildsoul như 1 "case study" chứng minh năng lực thật, đồng thời tận dụng lại đúng những người đã làm (LuHX, LeNH) để ước lượng effort chính xác hơn thay vì ước lượng từ đầu.

---

## Chi tiết kỹ thuật sâu hơn — đào thêm code/Slack/Jira/email thật của BXR

*(Đào thêm theo yêu cầu: đọc full Slack thread, JIRA ticket thật qua API, email carrick@ có từ khóa Mindbody. Không tìm được repo code BXR trong phạm vi GitHub accounts hiện có — swiftstudio.co là domain riêng của khách, không phải repo NUS quản lý trực tiếp trong GitHub org đã cấu hình ở đây.)*

### 1. Multi-region / multi-location — GIẢI PHÁP THẬT ĐÃ TRIỂN KHAI (map thẳng vào mục D của Wildsoul)

Tìm được JIRA ticket **BXR-224 "UAE - BE - Implement Region-Aware Mindbody Integration"** (swiftstudio.atlassian.net), tạo bởi Jeff Nguyen 20/05/2026, assignee Carrick Tran, **fetch trực tiếp qua API xác nhận status hiện tại: "Deployed on staging"** — tức là đã code xong và deploy thật, không phải ý tưởng.

**Kiến trúc thật đã dùng:** Mindbody quản lý mỗi vùng/chi nhánh lớn như **1 SiteId riêng biệt** (không phải 1 site chung có field "region"):
- London → SiteId `427862`
- UAE → SiteId `586783`

**Acceptance criteria của ticket (4 điểm, tương ứng đúng cách giải bài toán multi-location):**
1. Dynamic SiteId injection — tức backend tự chọn đúng SiteId theo request/context (region của user hoặc chi nhánh member) thay vì hard-code 1 SiteId
2. Environment variables configured — mỗi region 1 bộ config Mindbody (site id, có thể cả API key riêng) đặt trong env, không hard-code trong code
3. Region-aware booking supported — flow booking phải biết gọi đúng SiteId
4. Region-aware purchases supported — flow mua gói cũng vậy

→ **Đây là bằng chứng kỹ thuật mạnh nhất cho mục D của Wildsoul.** Thay vì nói chung chung "sẽ tự build logic đối chiếu", giờ có thể nói cụ thể: kiến trúc region-aware kiểu này team đã làm thật và deploy thành công cho BXR (London + UAE), nên với Wildsoul (nhiều chi nhánh hơn) sẽ áp dụng đúng pattern "1 SiteId/config riêng per location + lớp routing ở giữa chọn đúng SiteId theo location của member", chứ không phải làm từ số 0.

**Lưu ý quan trọng cần hỏi thêm Wildsoul:** cách BXR làm ngầm định là mỗi location = 1 Mindbody site riêng (site độc lập, không chia sẻ member database mặc định) — nên vấn đề thật sự khó không phải là "gọi đúng site" (đã giải được) mà là "hợp nhất identity của cùng 1 member khi họ active ở nhiều site khác nhau" (member Passport/cross-location trong brief Wildsoul). Đây là phần LeNH từng phải mở ticket hỏi thẳng Mindbody support ("Client ID number across multi-regions") — team CHƯA có xác nhận từ Mindbody support cho phần merge-identity này, nên vẫn nên hỏi lại Mindbody support 1 lần nữa cho case Wildsoul cụ thể (số lượng site khác, có thể chính sách support đã đổi từ đó tới giờ) thay vì giả định y hệt câu trả lời cũ.

### 2. Waiver / entitlement diagnostics — 2 thread Slack full chi tiết (map vào mục A)

Đọc full 2 thread trong kênh Swift Studio (không chỉ snippet search):

**Bug thật:** Client (roryh) test tài khoản của mình: xoá waiver khỏi profile nhưng app **không hiện prompt bắt ký lại** — đúng loại lỗi "entitlement tưởng đúng nhưng hệ thống không chặn/không báo đúng" giống hệt Wildsoul mô tả trong mục A.

**Cách debug/API thật đã dùng:** dev (U08EWQ42Y7J) xác nhận Liability Waiver được fetch từ endpoint thật:
```
GET https://api.mindbodyonline.com/public/v6/site/liabilitywaiver
```
cấu hình tại `clients.mindbodyonline.com` (khu vực client-facing site settings). Logic cần làm: "nếu tìm thấy đúng waiver VÀ user chưa approve nó → chặn booking" — đây chính xác là kiểu "rule engine" mình đề xuất xây cho mục A, và ở đây có 1 rule cụ thể đã implement thật để tham khảo.

**Phát hiện thêm — GOTCHA THẬT cần cảnh báo Wildsoul:** Wildsoul có 3 loại "form" khác nhau dễ gây nhầm y hệt BXR đã gặp:
- Liability Waiver (native trong Mindbody, qua endpoint trên)
- Health Questionnaire — **Mindbody hiển thị được nhưng KHÔNG cập nhật trạng thái hoàn thành qua API** ("upon completion, no user status gets updated, so there is no way to determine whether the user has completed it or not") — nghĩa là nếu Wildsoul cũng cần track "đã điền health form chưa" như 1 điều kiện eligibility, **API sẽ không cho biết trực tiếp**, phải tự lưu trạng thái riêng (không dựa được vào Mindbody).
- WaiverMaster (`waivermaster.com`) — 1 dịch vụ e-signature bên thứ 3 mà BXR đang dùng song song, KHÔNG PHẢI của Mindbody — 2 bên (roryh và dev) từng nhầm lẫn 2 form giống hệt nhau giữa Mindbody waiver và WaiverMaster link, mất nhiều lượt trao đổi mới rõ. → Nếu Wildsoul cũng có form bên thứ 3 tương tự, cần hỏi rõ ngay từ đầu để không lặp lại nhầm lẫn này.

### 3. OAuth / Developer Portal — thông tin thật hữu ích cho scoping (map vào tất cả các mục cần API access)

Từ thread Slack thật (Carrick + dev khác, kênh Swift Studio):
- **Giới hạn thật: tối đa 5 OAuth client/app** trong Mindbody Developer Portal cho 1 tài khoản — cần biết trước nếu Wildsoul cần nhiều client riêng (web, mobile, kiosk...).
- **Gotcha thật:** OAuth client phải tạo với **Application Type = SPA** (không phải "Web") để flow OAuth chạy được cho ứng dụng chạy trên browser — nếu tạo sai loại phải xoá tạo lại (không sửa được), tốn 1 slot trong giới hạn 5 client.
- **Tin tốt trả lời được 1 câu hỏi mở trước đó:** dev xác nhận **"the developer portal doesn't show any of the actual CRM data... I can spin up a developer test account to build against, so we don't need a separate sandbox"** — nghĩa là Mindbody Developer Portal cho phép tự tạo tài khoản test/sandbox ngay trong portal, KHÔNG cần đợi khách cấp sandbox riêng. → Trả lời câu hỏi mở "có sandbox không" ở báo cáo trước: CÓ, tự tạo được, không phụ thuộc khách.

### 4. Webhook — sự cố thật, bài học quan trọng cho mọi mục có nhắc tới webhook/sync real-time

Tìm thấy email thật forward bởi Rory (rory@swiftstudio.co) tới carrick@, chủ đề **"DEACTIVATED: Your MINDBODY Webhooks Subscription has been deactivated"** (gửi từ MINDBODYWebhooks@mindbodyonline.com, 11/03/2026):

> "We have deactivated your Webhooks subscription due to a **high number of delivery failures** to your Webhook URL... we recommend using the MINDBODY Public API to perform a manual sync of cached data."

Webhook URL bị lỗi lúc đó là `https://airlines-sublime-chen-ram.trycloudflare.com/...` — **1 tunnel Cloudflare tạm thời** (dạng dùng để test local, không phải endpoint production ổn định) — rất có thể đây chính là lý do bị fail liên tục dẫn tới bị Mindbody tự động tắt subscription.

**Bài học thật cần áp dụng cho Wildsoul (đặc biệt mục C — kiosk cần sync real-time, và mục E — báo cáo dựa trên webhook log):** Mindbody sẽ **tự động huỷ webhook subscription** nếu endpoint nhận không ổn định/fail nhiều lần, và phải tự gọi `PATCH Subscription` để kích hoạt lại thủ công sau khi sửa. Nên khi build cho Wildsoul, endpoint nhận webhook bắt buộc phải là **domain production ổn định** (không dùng tunnel tạm/ngrok/cloudflared cho production), và nên có thêm cơ chế tự kiểm tra + cảnh báo nếu Mindbody báo huỷ subscription, để không bị mất dữ liệu âm thầm.

---

## Cập nhật câu trả lời cho các câu hỏi còn mở (so với báo cáo trước)

1. ~~Có cần sandbox riêng từ khách không?~~ → **Đã có câu trả lời:** không cần, tự tạo test account ngay trong Mindbody Developer Portal.
2. ~~Bulk update endpoint có tồn tại không?~~ → Vẫn CHƯA xác nhận được từ nguồn nào (BXR cũng không có ví dụ dùng) — vẫn cần hỏi thẳng Mindbody support giống cách LeNH từng làm.
3. Multi-location: đã có pattern thật (SiteId riêng/region) nhưng phần "hợp nhất identity 1 member qua nhiều site" thì BXR cũng mới dừng ở mức tạo ticket hỏi, chưa có xác nhận rõ ràng từ Mindbody — cần hỏi lại mới cho case Wildsoul.
4. Health Questionnaire completion status — xác nhận CHẮC CHẮN Mindbody không trả trạng thái này qua API (không phải "chưa tìm thấy docs" mà là dev đã confirm thật khi làm cho BXR) — nếu Wildsoul cần track cái tương tự, phải tự lưu, không dựa Mindbody được.

---

## Đào sâu thêm — toàn bộ lịch sử JIRA thật (25 ticket Mindbody, 2024-2026)

Query trực tiếp JIRA API (`text ~ "Mindbody"`, project BXR) ra 25 ticket trải dài từ 02/2024 tới 05/2026 — gần như toàn bộ lịch sử vận hành Mindbody thật của BXR. Đọc full description + comment của các ticket liên quan nhất tới 6 mục Wildsoul:

### ⚠️ CASE CHƯA GIẢI ĐƯỢC — cần nói thẳng với Wildsoul, không nên giấu

**BXR-88 "Access Control - Memberships" — status vẫn "To Do", chưa từng làm xong.**
> "Need to understand/edit how memberships work with the door scanner as the **Program IDs shown in the URL on Mindbody Client side is different to what the API is seeing**."

Đây là 1 phát hiện quan trọng: **ID mà Mindbody hiển thị ở giao diện quản trị (client-facing UI) có thể KHÁC với ID mà API trả về** cho cùng 1 đối tượng (ở đây là Program ID gắn với quyền cửa/door access). Team BXR chưa từng giải quyết xong case này. Đây chính xác là loại rủi ro nền tảng cho mục A (chẩn đoán eligibility) và mục D (đối chiếu quyền) của Wildsoul — nếu Mindbody có kiểu lệch ID tương tự ở phần entitlement/pricing option, việc "đối chiếu để tìm lý do fail" có thể phức tạp hơn dự tính ban đầu. **Nên chủ động nói với Wildsoul: đây là rủi ro thực tế đã gặp, cần thời gian khảo sát/POC trước khi cam kết timeline chắc chắn cho mục A**, thay vì hứa suôn sẻ.

### Region Config — chi tiết đầy đủ hơn (bổ sung cho BXR-224 đã nêu)

**BXR-221 "UAE - BE - Implement Region Configuration Management"** (ticket song song với BXR-224, cũng "Deployed on staging") cho biết rõ hơn dữ liệu nằm trong 1 "Region entity" thật đã build:
- currency (tiền tệ riêng theo vùng)
- timezone
- mindbody instance (chính là SiteId)
- Klaviyo list (marketing list riêng theo vùng)
- payment configuration

→ Đây gần như là bản nháp thật của "approved template/network-level config" mà Wildsoul mô tả trong mục B (dù BXR làm cho khái niệm "region" chứ chưa phải "membership template", nhưng kiến trúc Region entity + Config API + dynamic loading là đúng pattern có thể tái dùng/mở rộng cho membership template của Wildsoul).

### Spot booking thật — sát nhất với kiosk Collective (mục C)

**BXR-97 "App - Spot Booking"** (Done) — chức năng chọn 1 "spot" cụ thể trong lớp (giống hệt ý tưởng "chọn resource/session cụ thể tại kiosk" của Collective). Bug thật ghi nhận bởi chính Rory Hackett:
- "Not showing in back end of MB (booking is showing, spot is not showing)" — Mindbody backend đôi khi không hiện đúng spot đã book dù booking chính đã ghi nhận.
- "When cancelling a class, spot is not being released" — huỷ lớp nhưng spot không được trả lại pool (ảnh hưởng trực tiếp tới bài toán "giữ đúng sức chứa real-time" mà Wildsoul yêu cầu cho kiosk).

→ Cảnh báo thật cho mục C: dù kiến trúc tổng thể khả thi (đã nêu ở trên), **có rủi ro cụ thể ở khâu release/cancel entitlement khi dùng spot-level booking** — cần thiết kế kỹ + test kỹ case huỷ/đổi lịch, không chỉ happy path.

### Sync issues thật — dữ liệu quý cho mục D/E/F

**BXR-152 "Trainers not Syncing"** — thread debug thật hé lộ cách Mindbody API thật sự lọc theo chi nhánh: BXR gọi 2 API riêng cho 2 "thương hiệu" (BXR/SWEAT) dùng tổ hợp tham số cụ thể:
```
ProgramIds: 54, 59, 85, 60, 84, 55, 65, 66, 53, 47, 49, 58, 64, 69, 70
locationIds: BXR City, BXR Marylebone
StartDate: now → EndDate: next month
```
Bug thật: 1 trainer (Monika) không hiện ra dù đang active, vì tổ hợp filter (ProgramIds + locationIds + date range) không khớp đúng case của cô ấy — mất 3 vòng trao đổi (02/12 → 10/12) mới fix xong. → Bài học cho mục D: lọc dữ liệu theo chi nhánh qua Mindbody API dễ bị sai sót ở tổ hợp filter (không chỉ đơn giản là "theo SiteId"), cần test kỹ với dữ liệu thật của từng chi nhánh Wildsoul, không suy luận từ 1-2 case là đủ.

**BXR-264 "Timetable not syncing correctly"** — Carrick kể lại quá trình debug thật: thử xoá cache ở Admin (không được) → debug trực tiếp source code + test qua Mindbody API như website đang gọi (lớp vẫn không hiện) → so sánh với dev site (dev site lại hiện đúng, rất lạ) → cuối cùng tìm ra nguyên nhân nằm ở phía cấu hình Mindbody riêng của BXR (comment bị cắt, chưa rõ chi tiết cuối). → Xác nhận thực tế: bug "backend đúng nhưng app/web không hiện" (mục F) từng xảy ra thật và **không có cách chẩn đoán nhanh** — phải debug nhiều lớp (cache → code → API trực tiếp → so sánh môi trường) mới ra, đúng như Wildsoul đang than phiền.

**BXR-173 "Not all profiles are synced in Klaviyo"** — phát hiện: có push token nhưng không link được với profile Mindbody ở nhiều trường hợp, ticket đóng "Done" nhưng không có comment nào ghi lại nguyên nhân gốc — dấu hiệu cho thấy case này có thể chỉ được vá tạm chứ chưa chắc đã hiểu hết root cause.

**BXR-112 "Location Selector not working"** — việc tưởng đơn giản: kéo danh sách chi nhánh (`locations`) từ Mindbody để hiện trong dropdown chọn chi nhánh lúc tạo tài khoản — nhưng mất hơn 1 tháng (17/06 → 15/07/2026, 2 lần cập nhật kèm build iOS/Android mới) mới xong triệt để vì thay đổi 1 chỗ kéo theo phải sửa nhiều màn hình khác cũng dùng location. → Bài học ước lượng: ngay cả tác vụ nghe đơn giản (đọc danh sách chi nhánh) cũng có thể lan ra nhiều nơi trong app nếu location là khái niệm dùng xuyên suốt hệ thống — Wildsoul cũng multi-location nên rủi ro tương tự cần tính vào ước lượng, không nên coi là "chỉ 1 API call là xong".

### V5 → V6 migration — dòng thời gian thật

Từ danh sách ticket: BXR-7/BXR-37 (Sign in/Up v6, 02/2024) → BXR-72 (App V6 login, 09/2024) → BXR-140 "Review and remove all MindBody v5 on website" (10/2025) — cho thấy quá trình dọn sạch hoàn toàn v5 kéo dài **gần 2 năm** từ lúc bắt đầu chuyển sang v6 tới lúc dọn sạch hết v5 trên web. → Nếu Wildsoul cũng đang dùng phần nào của Mindbody sắp bị deprecate, nên hỏi rõ version hiện tại của họ ngay từ đầu, và không đánh giá thấp thời gian dọn dẹp legacy nếu có.

**Chưa tìm được code repo BXR trong phạm vi GitHub accounts đang cấu hình** (duongdn, nusken) — domain code thật (`dev.bxrlondon.com`) có vẻ do khách/bên khác host riêng, không nằm trong GitHub org NUS quản lý ở đây. Nếu cần xem code thật, phải hỏi trực tiếp Rory/team BXR hoặc kiểm tra xem có repo riêng nào của Carrick/LuHX/LeNH chưa được biết tới.

---

## Full English Detail

### A. Booking Eligibility & Diagnostics
**Verdict: Partially supported — custom logic required.**
Mindbody exposes the raw components (`GetClientServices` for a member's active pricing options/entitlements, `GetClasses` for class capacity/restrictions) but no single endpoint explains *why* a specific booking is blocked. Building this means: fetch member's active contracts → query class restrictions → write custom conflict-resolution logic to produce a human-readable denial reason. No dedicated diagnostics endpoint exists; webhooks don't help here since they fire on state changes, not hypothetical queries.

### B. Membership/Contract Bulk Management
**Verdict: Not directly supported — needs a workaround.**
The API reads contracts/memberships and updates individual client services, but there is **no confirmed bulk-update endpoint** in the public v6 spec. Scaling to "update 500 members across 8 locations" means looping individual update calls, against a **1,000 calls/day** rate limit, with no atomic/rollback guarantee. `UpdateMembership`'s existence itself needs confirming via API sandbox or a direct question to Mindbody support before this can be scoped or quoted.

### C. On-Site Kiosk Booking (Wildsoul Collective)
**Verdict: Directly supported — best Phase 1 candidate.**
`GetClasses` gives live capacity, `GetClientServices` confirms entitlement, `AddClientToClass` creates the booking (and deducts the pass/entitlement automatically for pass-based pricing), and webhooks push booking/capacity changes in near real time. Mindbody's native Check-In app already covers part of this kiosk flow — worth checking if it covers Wildsoul's exact UX before building custom. Estimated 2-3 week build. Unconfirmed: whether entitlement can be validated *before* confirming a booking (pre-flight check) vs. only at confirmation time.

### D. Multi-Location Access & Permissions Consistency
**Verdict: Partially supported — validation requires custom queries.**
`GetClientRelations`/cross-site data tells you which locations a member can access; you'd cross-reference this against site-level membership rules yourself — no built-in "audit inconsistency" endpoint. At scale (10,000+ members), the 1,000 calls/day limit means batching over multiple days for a full network audit.

### E. Reporting & Data Visibility
**Verdict: Directly supported — pair with a BI pipeline.**
All the underlying data (clients, sales, contracts, class rosters) is queryable via API GET endpoints, and webhooks capture every mutation — enough to build a custom transaction log/audit trail feeding Tableau/Power BI/a custom pipeline. No native custom-report-builder via API, so this still needs an external BI layer, but the data access itself isn't a blocker. Good Phase 2 candidate.

### F. Backend-to-App Sync Visibility
**Verdict: Not an API-solvable problem — needs a separate monitoring harness.**
Mindbody has no "config deployment status" endpoint. Verifying that a backend change (pricing, new class, studio launch) actually propagated to the branded app means querying both systems independently and diffing — a canary/test-harness problem, not something the API exposes directly. Webhooks confirm a backend mutation happened, not that it propagated downstream.

### Key Dependency
Mindbody gates API access behind partner approval + subscription tier — confirm Wildsoul actually has an API key issued with Enrollment/ClassService/SaleService scopes, plus sandbox access for testing, before committing to any of the above.

### Unresolved Questions
1. Does Mindbody Public API v6 have a genuine bulk-update endpoint, or only single-client updates? (needs sandbox test / direct Mindbody support question)
2. Can `AddClientToClass` validate/deduct entitlement *before* confirming a booking, or only after? (affects kiosk pre-flight UX)
3. Does Mindbody's native Check-In app already cover the Collective kiosk UX, or is a fully custom build needed?
4. Are higher rate-limit tiers available above 1,000 calls/day for bulk/audit operations?
5. What is the typical sync delay between a backend config change and branded-app propagation?

### Sources
- Mindbody API Release Notes — developers.mindbodyonline.com/Resources/ApiReleaseNotes
- Mindbody Webhooks API Documentation — developers.mindbodyonline.com/WebhooksDocumentation
- Mindbody Public API v6.0 — developers.mindbodyonline.com/ui/documentation/public-api
- Mindbody Multi-location Management — mindbodyonline.com/business/multi-location-management
- Mindbody Check-In App (App Store listing)
