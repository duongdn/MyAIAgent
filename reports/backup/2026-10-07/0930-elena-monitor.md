# Elena OP: Review PR, 2026-10-07

Repo: `nustechnology/Elena-SamGuard-Digital-Plant`. Gồm 4 PR đang mở vào branch `nus-base`.

## Tóm tắt

| PR | Nội dung | Kết luận | Vì sao |
|----|----------|----------|--------|
| [#315](https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/315) | License hỗ trợ module Optimization (BE) | ❌ Chưa merge được | Có thể cấp nhầm module OP có tính phí cho khách, và có thể tắt mất Monitoring của khách cũ |
| [#320](https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/320) | Wizard tạo model, bước 1 (FE) | 💬 Sửa nhỏ rồi merge | Reviewer đã yêu cầu sửa nhưng chưa sửa; PR có đụng vào portal cũ |
| [#318](https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/318) | Header và ô search trang Runs (FE) | 💬 Sửa nhỏ rồi merge | Code tốt; có 2 chỗ sẽ thành lỗi khi nối API thật |
| [#317](https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/317) | Dialog cài đặt Influencer (FE) | 💬 Cần người review | Chưa có ai review; còn 1 lỗi cho phép lưu dữ liệu sai |

Kiểm tra tự động: cả 4 PR đều qua `openspec validate --strict`, tức là spec đúng format. Chưa build FE nên chưa xác nhận được code compile; CI của repo chỉ build Java.

### Việc anh cần làm ngay
1. **#315:** request changes 3 lỗi 🔴 bên dưới. PR này liên quan trực tiếp đến tiền và quyền sử dụng của khách.
2. **#317:** chỉ định một dev FE (trinm hoặc samht) review chéo, vì hiện tại chưa ai đọc PR này.
3. **3 PR FE cùng sửa chung một số file:** chốt thứ tự merge #317 → #318 → #320. PR merge sau sẽ phải cập nhật lại từ `nus-base` và giải quyết conflict.

---

## ❌ #315: License đa module (Brian, BE)

### PR này làm gì
Phần mềm Precognize bán theo license: một file `.key` được ký số, cài ở máy khách, quy định khách được dùng gì. Trước đây chỉ có một sản phẩm là **Monitoring**, và license chỉ ghi số tag tối đa (`maxColumnCount`). Giờ có thêm module **Optimization (OP)**, bán riêng. Tài nguyên của OP gồm số model tối đa (`modelCapacity`) và số credit (`totalCredits`).

PR sửa 3 chỗ:
- **Tool tạo license** (`tools/licensing`, dùng nội bộ): thêm các flag `-mo` (bật Monitor), `-op` (bật OP), `-oc` (số model), `-cr` (số credit) và `-mod` (liệt kê module).
- **Script trợ giúp** `generate_string.py`: script này in ra sẵn câu lệnh tạo license cho người vận hành copy và chạy.
- **Service đọc license** (`microservices-license`): đọc cấu trúc mới và trả về cho FE biết khách có những module nào.

### Kết luận: ❌ Request changes
Phần ký số và phần tương thích với license cũ làm đúng. Nhưng có 3 lỗi logic có thể khiến **khách được cấp sai quyền**. Đây là lỗi nghiệp vụ, không phải lỗi kỹ thuật vặt.

### Vấn đề 1: Script mặc định tặng module OP cho mọi license mới (🔴)
- **Vấn đề:** trong `tools/licensing/generate_string.py`:
  ```python
  DEFAULT_OP_ENABLED = True
  DEFAULT_OP_CAPACITY = 10
  DEFAULT_OP_CREDITS = 50000
  ```
  Câu lệnh mà script in ra luôn kèm `-op -oc 10 -cr 50000`.
- **Vì sao quan trọng:** người vận hành (ví dụ kietnht) cần tạo license gia hạn Monitoring cho khách X, nên chạy script rồi copy lệnh. License sinh ra có thêm OP với 10 model và 50.000 credit, dù khách X không mua OP. Đây là thất thoát doanh thu, và khó phát hiện vì license hợp lệ, có chữ ký đàng hoàng.
- **Cách sửa:** đặt `DEFAULT_OP_ENABLED = False`. Chỉ bật OP khi người vận hành chủ động truyền tham số, ví dụ `--with-op`. Sửa luôn scenario "Developer Automation Command Helper" trong spec, vì spec đang ghi đúng hành vi sai này.

### Vấn đề 2: Số 0 vừa nghĩa là "không giới hạn" vừa là "không có quyền" (🔴)
- **Vấn đề:**
  - Phần help của flag `-oc` và spec ("Default unlimited model capacity") đều nói `0 = không giới hạn số model`.
  - Nhưng khi khách **không mua OP**, code cũng ghi `modelCapacity = 0` làm giá trị mặc định (`OptimizationModuleLicense`, `DaeOptimizationModuleLicense`, `DaeLicenseMapper`).
- **Vì sao quan trọng:** sau này, đoạn code kiểm tra "còn được tạo model không?" sẽ thấy số 0 và không biết nó nghĩa là vô hạn hay bị cấm. Ví dụ cụ thể: người vận hành chạy `-mod OPTIMIZATION` mà quên `-oc`, thì khách được tạo **không giới hạn** model, trong khi đúng ra chỉ được 5 hoặc 10.
- **Cách sửa:** dùng một giá trị riêng cho "không giới hạn", như `-1` hoặc `null`. Hoặc bắt buộc phải có `-oc` mỗi khi bật OP. Cần vytth hỏi khách: gói OP có tồn tại loại "không giới hạn" không?

### Vấn đề 3: Cấp license OP có thể tắt mất Monitoring của khách cũ (🔴)
- **Vấn đề:** trong `LicenseController.java`, đoạn tính `isMonitorLicensed`, nếu lệnh chỉ có flag OP (`-op` hoặc `-mod OPTIMIZATION`) mà không có `-mo` hay `-t` thì Monitor bị coi là **không có quyền**, và `maxColumnCount = 0`.
- **Vì sao quan trọng:** khách Y đang dùng Monitoring, nay mua thêm OP. Người vận hành nghĩ là chỉ cần "thêm OP" nên chạy `license.sh -op -oc 5 -cr 20000 ...`. Khách Y cài license mới thì **Monitoring ngừng hoạt động** (0 tag), tức là sự cố vận hành ngay tại nhà máy của khách.
- **Cách sửa:** khi không có flag nào về Monitor, tool phải dừng lại và hỏi rõ (bắt buộc chọn `-mo` hoặc `--no-monitor`), hoặc ít nhất in cảnh báo thật rõ. Thêm scenario này vào spec.

### Vấn đề 4: Nhận cả tên module bịa (⚠️)
- **Vấn đề:** cờ `-mod` nhận chuỗi tùy ý. Tên lạ như `-mod MONITOR,OPTIMIZATON` (gõ sai chính tả) vẫn được ghi thẳng vào license đã ký (`LicenseController.java`, vòng lặp `activeModules`).
- **Vì sao quan trọng:** license sinh ra mang tên module sai mà không ai được báo, và chỉ phát hiện khi khách phàn nàn.
- **Cách sửa:** chỉ chấp nhận các giá trị có trong `DaeLicensedModuleType` (MONITORING, OPTIMIZATION), sai thì báo lỗi ngay.

### Vấn đề 5: Branch quá cũ (⚠️)
- **Vấn đề:** branch chậm **190 commit** so với `nus-base`.
- **Vì sao quan trọng:** những gì review và test hôm nay có thể không còn đúng khi ghép vào code mới nhất.
- **Cách sửa:** Brian merge `nus-base` vào, chạy lại test, rồi mới review lần cuối.

### Spec (OpenSpec)
- 💬 **Spec chứa đường dẫn máy cá nhân:** proposal và design có link `file:///home/nus/Documents/Java_Elena/...`, người khác bấm vào không mở được. Nên đổi sang đường dẫn tương đối trong repo.
- 💬 **Archive spec trước khi merge:** 2 change đã nằm trong thư mục `archive/`, tức là đã được đánh dấu "đã hoàn thành" và nhập vào spec chính, trong khi code chưa merge. Nếu PR bị sửa nhiều hoặc bị bỏ, spec chính sẽ mô tả một tính năng không tồn tại.
- 💬 **Thiếu các trường hợp lỗi:** spec chưa mô tả license sai chữ ký, license hết hạn, `-oc` nhập chữ hoặc số âm (hiện code sẽ văng lỗi Java thô), và tên module không hợp lệ.
- **Spec có khớp code không:** khớp. Nhưng spec đang ghi đúng cả lỗi ở vấn đề 1 và 2, nên phải sửa spec cùng lúc với code.

### Điểm tốt
- Chữ ký số (`SHA1WithRSA`) bao toàn bộ nội dung license, gồm cả phần module mới, nên khách không tự sửa file để tăng quyền được.
- License cũ vẫn chạy: không có thông tin module thì mặc định Monitor bật, OP tắt.
- Có thêm unit test cho tool tạo license và cho service đọc license.

---

## 💬 #320: Wizard tạo Optimization Model, bước 1 (Ken, FE)

### PR này làm gì
Màn hình `#/models/new` để người dùng tạo một "model tối ưu hóa". Bước 1 là nhập mục tiêu: tên, mô tả, chọn **tag mục tiêu** (cảm biến cần tối ưu, ví dụ nhiệt độ lò), % cải thiện mong muốn, chiều tối ưu (MIN hoặc MAX) và chi phí ước tính. Bước 2 hiện là màn hình giữ chỗ. Khi rời trang mà chưa lưu thì hiện hộp thoại "You have unsaved changes". Dữ liệu tag hiện là dữ liệu giả (mock), vì API search tag (OP-22) chưa có.

### Kết luận: 💬 Sửa nhỏ rồi merge
Code tốt và spec rất chi tiết. Còn vướng 2 việc: phản hồi của reviewer chưa được xử lý, và PR đụng vào phần portal cũ.

### Vấn đề 1: Yêu cầu sửa của reviewer chưa được xử lý (⚠️)
- **Vấn đề:** nus-aron (review bằng Devin) đã request changes trên đúng commit hiện tại `a409e6b0`, gồm 1 lỗi Major (2 task kiểm thử 2.1 và 6.3 trong `tasks.md` chưa làm) và 1 lỗi Minor (bỏ viền focus của ô chọn tag mà không ghi lại lý do). Sau đó chưa có commit mới.
- **Vì sao quan trọng:** việc bỏ viền focus khiến người dùng bàn phím (Tab) không thấy mình đang đứng ở ô nào.
- **Cách sửa:** Ken xử lý 2 điểm này rồi push lại.

### Vấn đề 2: PR sửa cả portal cũ (⚠️)
- **Vấn đề:** ngoài phần Optimization, PR còn chuyển component `empty-state` (màn hình "không có dữ liệu") sang thư mục dùng chung, và sửa 5 tab trong trang chi tiết Alert của **precognize-portal**, là sản phẩm đang chạy cho khách. Component `number-stepper` dùng chung cũng thêm 171 dòng.
- **Vì sao quan trọng:** người test sẽ chỉ kiểm tra màn hình Optimization. Nếu thay đổi này làm vỡ giao diện portal (ví dụ tab Notes của Alert trống), sẽ không ai thấy cho đến khi khách báo.
- **Cách sửa:** chạy `npm run build-portal`, mở trang chi tiết Alert, xem các tab không có dữ liệu có hiển thị giống trước không. Nhờ QC (duyvna, handn) test lại portal.

### Vấn đề 3: Ô search tag sẽ lỗi khi nối API thật (💬)
- **Vấn đề:** `optimization-goal-step.component.ts:142`: mỗi lần gõ phím là gửi một lượt tìm kiếm riêng. Hiện tại mock trả kết quả ngay nên không sao (code có comment giải thích).
- **Vì sao quan trọng:** khi có API thật, người dùng gõ "PDI" rồi "PDI32". Nếu kết quả của "PDI" về **sau** kết quả của "PDI32", danh sách sẽ hiện kết quả cũ, không khớp với chữ đang gõ.
- **Cách sửa:** chưa cần sửa bây giờ. Thêm một ghi chú TODO gắn với OP-22, để lúc nối API thì chuyển sang cơ chế chỉ lấy kết quả của lần gõ cuối cùng (`switchMap`).

### Spec (OpenSpec)
- ✅ Spec rất chi tiết: từng ô nhập có quy tắc riêng (tên tối đa 100 ký tự, % cải thiện từ 0 đến 20, chi phí từ 1.000 đến 10.000.000…) và kèm câu thông báo lỗi.
- ✅ Change chưa archive, đúng quy trình vì PR chưa merge.
- 💬 Proposal nói panel biểu đồ có màn hình xem trước trong `#/shared-ui`, nhưng spec và code không có. Cần sửa lại cho khớp.
- **Spec có khớp code không:** khớp. Aron cũng đã đối chiếu từng requirement với code.

### Điểm tốt
Chặn rời trang khi chưa lưu, kiểm tra trùng tên, và tách 6 component dùng lại được.

---

## 💬 #318: Header và ô tìm kiếm trang Optimization Runs (ryannus/phongtb, FE)

### PR này làm gì
Trang danh sách các lượt chạy tối ưu (Runs) được thêm phần đầu trang gồm tiêu đề, số kết quả, nút New Run và **ô tìm kiếm có phạm vi** (Search In: All, Tag, Run Name, Model Name). Ví dụ: chọn "Tag" thì chỉ tìm trong tên và mô tả tag. Dữ liệu hiện vẫn là mẫu cố định vì backend chưa có.

### Kết luận: 💬 Sửa nhỏ rồi merge
Code chất lượng tốt. Hai điểm dưới đây chưa gây lỗi lúc này, nhưng sẽ gây lỗi khi có backend.

### Vấn đề 1: Reviewer yêu cầu tách commit, chưa sửa (⚠️)
- **Vấn đề:** commit `7197db5` gộp cả file spec lẫn file code. Aron đã request changes vì team quy định commit spec và commit code phải tách riêng.
- **Vì sao quan trọng:** khi giao code cho Precognize, script `deliver-to-origin.sh` sẽ lọc bỏ file spec. Commit tách riêng thì lịch sử giao đi gọn và dễ review hơn.
- **Cách sửa:** tách commit đó thành 2.

### Vấn đề 2: Một lần gọi API lỗi là trang đứng luôn (💬, sẽ thành ⚠️ khi nối API)
- **Vấn đề:** trong `optimization-runs-page.component.ts`, luồng tải dữ liệu `query$.pipe(switchMap(getRuns))` không có xử lý lỗi (`catchError`).
- **Vì sao quan trọng:** khi có API thật, chỉ cần một lần server lỗi (500 hoặc mất mạng) là luồng này dừng hẳn. Sau đó search, lọc, sắp xếp hay chuyển trang đều không làm gì cả, và người dùng phải reload trang.
- **Cách sửa:** thêm `catchError` bên trong `switchMap` để báo lỗi và giữ luồng chạy tiếp. Có thể làm ngay, hoặc ghi TODO gắn với ticket nối API.

### Vấn đề 3: Kiểm tra phạm vi search chưa chặt (💬)
- **Vấn đề:** `optimization-runs.search-in.ts`: hàm `isRunSearchIn` dùng toán tử `in`, nên giá trị như `"toString"` cũng được coi là hợp lệ.
- **Cách sửa:** đổi sang `Object.hasOwn(...)`. Sửa trong 1 dòng.

### Spec (OpenSpec)
- ✅ Cấu trúc tốt. Spec ghi rõ requirement "dùng dữ liệu mẫu cho đến khi có backend" và có mục Related changes.
- ⚠️ **Thiếu spec phía backend:** spec định nghĩa "All" tìm trong tên run, tên model, tên và mô tả của tag mục tiêu, tag influencer và tag điều kiện vận hành. Khi có backend, việc tìm kiếm sẽ chạy trên server. Theo quy định của repo, hợp đồng API chỉ được viết trong spec backend (`openspec/` ở root). Cần mở sớm một change backend tương ứng, để phần tag search tiennd2 đang làm tìm đúng những trường này.
- 💬 Archive trước khi merge (giống #315).
- **Spec có khớp code không:** khớp.

### Điểm tốt
Ô search xử lý kỹ: dọn dropdown khi đóng, hỗ trợ điều hướng bằng bàn phím, chờ 500ms sau khi ngừng gõ mới tìm, và không tìm lại khi chữ không đổi.

---

## 💬 #317: Dialog quản lý Influencer (ryannus, FE)

### PR này làm gì
Influencer là các tag (cảm biến hoặc thông số) ảnh hưởng đến tag mục tiêu. Dialog dạng ngăn kéo bên phải cho phép đánh dấu một influencer là "Optimizable" (hệ thống được phép đề xuất thay đổi nó), rồi đặt giới hạn theo một trong hai kiểu: **Range** (từ Min đến Max) hoặc **Fixed Values** (một danh sách giá trị cụ thể, nhập dạng chip). PR cũng tạo component ngăn kéo dùng chung và chuyển panel Filter của trang Runs sang dùng component này.

### Kết luận: 💬 Cần người review chéo
Đây là PR duy nhất chưa có người thật nào review. Commit "record PR 317 review outcome" là tác giả tự ghi kết quả review.

### Vấn đề 1: Chưa có người review (⚠️)
- **Vấn đề:** chỉ có CodeRabbit (bot) để lại 6 comment, và chưa comment nào được trả lời.
- **Vì sao quan trọng:** anh Trinh đã giao anh chịu trách nhiệm việc review chéo. PR 2.700 dòng mà chưa ai đọc là lỗ hổng trong quy trình.
- **Cách sửa:** chỉ định trinm hoặc samht review. Tác giả trả lời hoặc resolve từng comment của CodeRabbit.

### Vấn đề 2: Vẫn bấm SAVE được khi đang báo lỗi (⚠️)
- **Vấn đề:** `manage-influencer-dialog.component.ts:130`: hàm `canSave` chỉ kiểm tra danh sách giá trị đã thêm, không xét lỗi của ô đang nhập (`chipError`).
- **Vì sao quan trọng:** người dùng đã có chip "10" và gõ thêm "abc". Ô nhập báo lỗi "không phải số", nhưng nút SAVE vẫn bấm được. Người dùng tưởng "abc" đã được lưu, nhưng thực tế chỉ có "10" được lưu.
- **Cách sửa:** thêm điều kiện `&& !this.chipError` vào `canSave`.

### Vấn đề 3: Panel Filter trang Runs bị viết lại (💬)
- **Vấn đề:** `filter-panel` được chuyển sang dùng ngăn kéo mới (bớt 195 dòng). PR #318 cũng đụng vào trang Runs.
- **Cách sửa:** QC test lại chức năng Filter trên trang Runs sau khi merge cả 2 PR.

### Đã kiểm tra lại comment của CodeRabbit
- "Giá trị số quá lớn (Infinity)": **đã sửa**, code có kiểm tra `Number.isFinite`.
- "SAVE khi có lỗi": **vẫn còn** (vấn đề 2 ở trên).
- 4 comment còn lại (liên kết thông báo lỗi với ô nhập cho trình đọc màn hình, độ tương phản chữ, ngăn kéo trên màn hình hẹp, đánh dấu ô Range bỏ trống): nhỏ, nên sửa nhưng không chặn merge.

### Spec (OpenSpec)
- ✅ Cấu trúc đúng.
- 💬 Không có mục "Related changes". Giới hạn của influencer (Range hoặc Fixed) sau này phải được backend lưu lại, nên cần ghi rõ phụ thuộc này vào một change backend.
- 💬 Archive trước khi merge.
- **Spec có khớp code không:** khớp, trừ lỗi SAVE ở vấn đề 2 (spec có nói không cho lưu khi có lỗi).

---

## Lưu ý chung cho 3 PR FE
#317, #318 và #320 cùng sửa các file `shared-ui-page.component.*`, `en-us.json` (file ngôn ngữ) và `custom-icons-registration.service.ts`, cùng spec `optimization-shared-ui-playground`. PR merge trước thì 2 PR sau sẽ bị conflict. Cả 3 đang chậm 12 commit so với `nus-base`.

**Đề xuất:** merge #317 trước (sửa nền ngăn kéo và filter), rồi #318, cuối cùng #320. Sau mỗi lần merge, PR kế tiếp cập nhật lại từ `nus-base`.

## Câu hỏi còn mở
- Gói OP có loại "không giới hạn số model" không? Liên quan vấn đề 2 của #315; cần vytth hỏi khách.
