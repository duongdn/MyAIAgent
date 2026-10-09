# Elena Optimization (OP) Monitor — 2026-10-09 09:46

Repo: [nustechnology/Elena-SamGuard-Digital-Plant](https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pulls?q=is%3Aopen+base%3Anus-base) · Room: [Elena - Optimization](https://matrix.to/#/!KGfMOdTMWQwLObwAEk:nustechnology.com) · Kỳ trước: 2026-10-07 09:30

## Tóm tắt

| PR | Nội dung | Dev | Kết luận | Lý do chính |
|----|----------|-----|----------|-------------|
| [#315](https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/315) | License đa module (BE) | Brian | ❌ | 3 lỗi 🔴 kỳ trước, mới sửa được 1 phần. Script vẫn mặc định tặng OP |
| [#325](https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/325) | Nút Run Now / Pause Run trên bảng Runs (FE) | ryannus | ❌ | Đang **conflict** với nus-base, chưa merge được |
| [#321](https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/321) | API lấy chi tiết tag (BE) | tiennd2 (nustom) | 💬 | Code ổn. Còn rác của tính năng đã rút và spec archive sai. Chậm 296 commit |
| [#328](https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/328) | Drawer "Manage Optimization Models" (FE) | ryannus | 💬 | Chạy hoàn toàn trên dữ liệu giả, nhiều nút bấm không làm gì. Đụng file với #325 |

PR đã merge từ kỳ trước: #317, #318, #320 (07/10). **Không PR nào có review của người** (chỉ có CodeRabbit), nên cross-review chưa diễn ra.
Test env: `200` trong 0.77s. Nhưng sáng nay 09:09 kietnht báo AA "mất hết asset name" (⚠️ xem Piece 3).

### DuongDN cần làm ngay
1. **Giao cross-review:** #321 → tuanntg review. #315 → tiennd2/kietnht review. #325 + #328 → samht hoặc trinm review (FE↔FE). Hiện 4/4 PR chưa có ai review.
2. **#315:** nhắc Brian sửa 3 điểm còn lại (mặc định OP trong `generate_string.py`, số 0 mập mờ, `-mod` nhận tên lạ) trước khi merge. PR này liên quan trực tiếp đến tiền.
3. **#325 / #328:** ryannus nên merge `nus-base` vào #325 trước, sau đó rebase #328 lên. Hai PR sửa chung `optimization-runs-page` cùng spec `optimization-runs-page`.

---

## ❌ #315: License đa module (Brian, BE). Cập nhật từ kỳ trước

### PR này làm gì
Phần mềm Precognize bán theo license: một file `.key` có chữ ký số, cài ở máy khách, quy định khách được dùng module nào. Trước đây chỉ có **Monitoring** (giới hạn số tag). Giờ có thêm **Optimization (OP)**, bán riêng, với giới hạn số model (`modelCapacity`) và số credit (`totalCredits`). PR sửa tool tạo license nội bộ (`tools/licensing`), script in sẵn lệnh tạo license (`generate_string.py`) và service đọc license (`microservices-license`).

Commit mới từ `6510653e` đến `e782c560`: thêm lịch sử license đa module (lưu `activeModules`/`modules` vào history), cập nhật luật validate (OP-only license không bị cảnh báo vượt số tag), đã merge `nus-base` (giải quyết luôn ⚠️ "branch cũ" của kỳ trước).

### Kết luận: ❌ vẫn request changes
Phần mới (history, validate) làm tốt, có test. Nhưng 2 trong 3 lỗi 🔴 kỳ trước **chưa sửa**, lỗi còn lại mới sửa một phần.

### Vấn đề 1: Script vẫn mặc định tặng OP cho mọi license (🔴 chưa sửa)
- **Vấn đề:** `tools/licensing/generate_string.py:15-17,64-65` vẫn là `DEFAULT_OP_ENABLED = True`, `-op -oc 10 -cr 50000`.
- **Vì sao quan trọng:** người vận hành tạo license gia hạn Monitoring cho khách X bằng lệnh script in ra, và khách X được thêm OP 10 model / 50.000 credit miễn phí. License vẫn có chữ ký hợp lệ nên không ai phát hiện.
- **Cách sửa:** `DEFAULT_OP_ENABLED = False`, chỉ bật OP khi truyền tham số rõ ràng. Sửa luôn scenario "Developer Automation Command Helper" trong spec `generate-multi-module-license`.

### Vấn đề 2: Số 0 vừa là "không giới hạn" vừa là "không có quyền" (🔴 chưa sửa)
- **Vấn đề:** `LicenseController.java` đặt mặc định `int opCapacity = 0;`. Help của `-oc` và spec lại nói `0 = unlimited`. Phía service, `DaeLicenseConstraints.validateOptimizationEntitlements` chấp nhận `modelCapacity >= 0`.
- **Vì sao quan trọng:** người vận hành bật OP mà quên `-oc`, thế là khách được tạo **không giới hạn** model. Sau này code đếm model (drawer #328 đã có "limit reached") sẽ không biết 0 nghĩa là chặn hay vô hạn.
- **Cách sửa:** dùng `-1`/`null` cho "không giới hạn", hoặc bắt buộc `-oc` khi bật OP. vytth cần hỏi khách có gói OP "không giới hạn" không.

### Vấn đề 3: Thêm OP có thể tắt Monitoring của khách cũ (⚠️ đã sửa một phần)
- **Vấn đề:** `LicenseController.java` (khối `isMonitorLicensed`): khi chỉ truyền flag OP (`-op/-oc/-cr`), Monitor lấy theo `hasMoInRequest`, tức là chỉ bật nếu file request của khách có `modules.monitor`, `activeModules` chứa MONITORING, hoặc `maxColumnCount > 0`. Đây là tiến bộ so với kỳ trước (trước đây tắt luôn).
- **Vì sao quan trọng:** file request **kiểu cũ** của khách đang dùng Monitoring nhiều khả năng không có các trường trên. Chạy `license.sh -op -oc 5 ...` thì Monitor bị tắt (`maxColumnCount = 0`), không có cảnh báo, và nhà máy ngừng giám sát.
- **Cách sửa:** khi bật OP mà không xác định được Monitor, in WARNING rõ ràng hoặc bắt buộc chọn `-mo`/`--no-monitor`. Thêm test cho request kiểu cũ + chỉ flag OP.

### Vấn đề 4: `-mod` vẫn nhận tên module bịa (⚠️ chưa sửa)
- **Vấn đề:** vòng lặp `activeModules` trong `LicenseController.java` có nhánh `else if (!activeModules.contains(mod)) activeModules.add(mod);`, nên `-mod OPTIMIZATON` (gõ sai) vẫn được ghi vào license đã ký.
- **Vì sao quan trọng:** khách nhận license có module sai tên. Service `isOptimizationLicensed` không nhận ra, nên khách đã trả tiền OP mà không dùng được.
- **Cách sửa:** chỉ chấp nhận giá trị của `DaeLicensedModuleType`, sai thì báo lỗi và dừng.

### Vấn đề 5: Test tự nuốt lỗi khi không có Docker (💬)
- **Vấn đề:** `DaeMongoDBTestExtension.java` bọc `MONGO_DB_CONTAINER.start()` trong `try/catch` rỗng ("fallback to local MongoDB on port 30017").
- **Vì sao quan trọng:** trên CI không có Docker và không có Mongo local, test sẽ fail với lỗi kết nối khó hiểu thay vì báo "Docker unavailable". Ngược lại, máy dev có Mongo thật ở port đó thì test ghi vào DB thật.
- **Cách sửa:** log rõ, hoặc `Assumptions.assumeTrue(...)` để skip có lý do.

### Spec (OpenSpec): 💬
- `validate --strict`: ✅ pass (3 spec).
- 💬 Capability lồng thư mục: `openspec/specs/license/<sub>/spec.md` (3 cái). Rule là `specs/<capability>/spec.md`. Nên đổi thành `license-history`, `license-validation`...
- 💬 Vẫn archive 4 change (02/10, 05/10, 07/10 ×2) **trước khi code merge**.
- Spec khớp code, kể cả 2 lỗi 🔴 ở trên. Sửa code thì phải sửa spec cùng lúc.

### Điểm tốt
- Validate tách riêng Monitor/OP: OP-only license không bị nhắc "vượt số tag" (`DaeLicenseJobSchedulerControl`), và có test `shouldNotSendTagExceededNotificationForOpOnlyLicense`.
- Null-safe cho `expirationDate`, `maxColumnCount`.
- History lưu đủ module, có test round-trip API → document → API.
- Đã merge nus-base, `mergeable` không còn bị báo chậm.

---

## ❌ #325: Nút Run Now / Pause Run (ryannus, FE, OP-20)

### PR này làm gì
Trên trang **Optimization Runs** (danh sách các lần chạy tối ưu), mỗi dòng run có 1 nút hành động theo trạng thái: run **Completed** thì có **Run Now** (chạy lại ngay, tốn 1 credit), run **Running/Waiting** thì có **Pause Run** (hiện popup xác nhận, sau đó dừng lịch chạy). Hết credit thì hiện thông báo lỗi kèm số dư. Tên run dài thì cắt và hiện tooltip. Toàn bộ chạy trên **dữ liệu mẫu**: credit giả = 2, run giả tự "hoàn thành" sau 10 giây.

### Kết luận: ❌ chưa merge được vì conflict. Code bản thân thì sạch

### Vấn đề 1: Conflict với nus-base (🔴)
- **Vấn đề:** GitHub báo `mergeable_state = dirty`, branch chậm 59 commit.
- **Vì sao quan trọng:** không merge được. Sau khi resolve, code có thể khác bản đang review.
- **Cách sửa:** ryannus merge `nus-base` vào, resolve, chạy lại `ng test` và openspec validate.

### Vấn đề 2: Đụng file với #328 (⚠️)
- **Vấn đề:** cả #325 và #328 đều sửa `optimization-runs-page.component.ts/html`, `shared-ui-page.component.html` và `openspec/specs/optimization-runs-page/spec.md`.
- **Vì sao quan trọng:** PR nào merge sau cũng conflict, và dễ mất phần của PR kia (ví dụ mất `(runNowClick)` hoặc mất nút mở drawer Manage Models).
- **Cách sửa:** merge #325 trước, sau đó #328 rebase lên. Hoặc gộp thứ tự với team.

### Vấn đề 3: Chạy hoàn toàn trên dữ liệu giả, chưa có API BE (⚠️)
- **Vấn đề:** `optimization-runs.service.ts`: `runNow`/`pauseRun` chỉ sửa mảng trong bộ nhớ, credit giả = 2 (`SAMPLE_CREDIT_BALANCE`). Backend root (`openspec/`) chưa có capability run/pause.
- **Vì sao quan trọng:** QC test trên staging sẽ thấy Run Now "chạy được" rồi tự Completed sau 10s, F5 thì mất hết, và nghĩ là bug. Credit giả 2 lần sẽ báo "hết credit" dù license thật còn nhiều.
- **Cách sửa:** ghi rõ trên Jira OP-20 là "FE mock, chờ BE". Tạo ticket BE cho endpoint run/pause/credit. Spec đã ghi điều này ở Non-goals, nên chỉ cần truyền đạt cho QC.

### Vấn đề 4: Run Now dùng icon "Add" (💬)
- **Vấn đề:** nút Run Now dùng `optimization_item_add` và class `model-item__action--add`.
- **Vì sao quan trọng:** nếu Figma có icon "play" riêng thì UI lệch thiết kế, và anhttl đã phàn nàn về chất lượng UI (07/10 14:05).
- **Cách sửa:** đối chiếu Figma 17451:34962. Nếu đúng là icon "+" thì bỏ qua.

### Spec (OpenSpec): 💬
- `validate --strict` (precognize-workspace): ✅ 26 pass.
- Proposal ghi rõ mock, ghi backend là Non-goal và trỏ về root `openspec/` cho contract. Đây là cách làm đúng.
- 💬 Archive `2026-10-08-add-optimization-run-actions` trước khi merge.
- Spec khớp code (luật trạng thái nằm ở `run-actions.ts`, dùng chung cho row và service).

### Điểm tốt
- Chặn double-click: `busyRunIds` giữ nút disabled cả khi popup đang mở.
- Dialog có `role="alertdialog"`, aria labels, và Escape/backdrop đều trả về false.
- Run hoàn thành trong lúc popup mở thì pause không làm gì (`allows(canPause)`).
- Có unit test cho service và component.

---

## 💬 #321: API chi tiết tag (tiennd2, BE, OP-22)

### PR này làm gì
Ở bước 1 của wizard tạo Optimization Model, user chọn **Target Tag** và các **Influencer**. FE cần, cho mỗi tag đã chọn: tên, mô tả, asset chứa nó, loại thiết bị (part type), loại đo (measurement type), đơn vị và icon. PR thêm `POST /model/tags/details` (body `{tagIds: [...]}`). API trả về một dòng cho mỗi tag, giữ đúng thứ tự gửi lên, gộp id trùng và bỏ id không tồn tại. Phần "search tag theo text" và "lọc tag có đủ X tháng dữ liệu" đã được **rút ra** khỏi PR (commit cuối `2e41f5bd`).

### Kết luận: 💬 approve sau khi dọn dẹp. Logic đúng, có test

### Vấn đề 1: Còn rác của phần đã rút (⚠️)
- **Vấn đề:**
  - `application/.../webfront/reference.conf`: thêm `search.query.minimumLength: 3`, nhưng không còn endpoint search nào dùng.
  - `DaeApiSearchController.java`: chỉ thêm 3 import thừa (`DaeDomainNamedEntityApi`, `StandardCharsets`, `Set`), không có code nào.
- **Vì sao quan trọng:** file bị sửa mà không có thay đổi thật thì dễ conflict khi merge với nus-base, và config "ma" làm người sau tưởng có validation độ dài query.
- **Cách sửa:** revert hẳn 2 file này về nus-base.

### Vấn đề 2: Truy vấn không giới hạn là tag, và có thể trả asset sai (⚠️)
- **Vấn đề:** `DaeDomainDaoQueryTemplates.findTagsByIds`: `match(anyNode("node")).where(DaeId IN ids)` không lọc node là Column/tag. Hai `optionalMatch` (object→column, object→partType) có thể sinh **nhiều dòng cho 1 tag** nếu tag nối với nhiều object. Sau đó `collectMap(getId)` giữ ngẫu nhiên dòng cuối.
- **Vì sao quan trọng:** (a) FE gửi nhầm id asset vẫn nhận được "tag", trái với spec ("one row per requested **tag**"). (b) Dữ liệu DP đang được tạo tay trên plant2 (Matrix 08/10). Nếu một tag bị nối 2 asset thì wizard hiện asset khác nhau giữa các lần gọi.
- **Cách sửa:** thêm điều kiện `Type = 'Column'` (giống `findByNameAndDescription`). Với nhiều asset thì chọn rõ một (`LIMIT 1`/`collect`) hoặc trả list, và ghi quyết định vào design.

### Vấn đề 3: Branch rất cũ (⚠️)
- **Vấn đề:** chậm **296 commit** so với nus-base, `mergeable` = unknown, lần cập nhật cuối 07/10 (sắp quá 2 ngày làm việc).
- **Cách sửa:** merge nus-base, chạy lại `mvn test` của 3 module.

### Spec (OpenSpec): ❌
- `validate --strict`: ✅ pass (`op-22-tag-details`).
- ❌ **Archive một change đã rút:** `openspec/changes/archive/2026-10-02-op-22-optimization-tag-search/` vẫn nằm trong PR. Change này mô tả `POST /search/tags`, `includeTagIds/excludeTagIds/tagScope`, những thứ task 1.3/3.7/4.3 đã xóa khỏi code. Archive nghĩa là "đã làm xong", nên lịch sử spec sẽ nói sai. **Cách sửa:** xóa thư mục archive đó (change chưa từng được merge).
- ⚠️ Capability lồng: `specs/domain-model/tag-details/spec.md` → nên là `specs/tag-details/spec.md`.
- Spec khớp code ở các scenario thứ tự / trùng / id lạ / rỗng, trừ điểm "chỉ trả tag" ở Vấn đề 2.
- Spec chưa có scenario lỗi kiểu `tagIds` quá dài (ví dụ 10.000 id) hay domain service không phản hồi (💬).

### Điểm tốt
- Gộp truy vấn part type / measurement type theo lô (không N+1).
- Test `DaeDomainControlFindTagDetailsTest` phủ thứ tự, trùng, id lạ, rỗng, thiếu context.
- Tasks ghi rõ cách kiểm tra surefire vì `testFailureIgnore=true`.

---

## 💬 #328: Drawer "Manage Optimization Models" (ryannus, FE, OP-27)

### PR này làm gì
Trên trang Runs có thêm nút mở **ngăn kéo bên phải** để quản lý các Optimization Model:
- bên trái là danh sách model (tìm kiếm, phân trang 10, badge sức khỏe model)
- bên phải là chi tiết model với 2 tab, **Settings** (Goal, Influencers, Constraints, Exclusions, Cost... hiển thị dạng "biểu thức" tag) và **Runs** (các run của model)
- các nút Delete (có popup xác nhận), Edit, New Model (mở tab mới; nếu đạt giới hạn model thì popup "Upgrade License" dẫn sang Admin)

Kèm nhiều component dùng chung mới: confirm-dialog, detail-tabs, expression-view, stat-card, section-nav... PR lớn: 119 file, +7.866 dòng (phần lớn là spec, icon và dữ liệu mẫu).

### Kết luận: 💬 cho merge làm khung UI, nhưng phải dọn các nút "câm" và báo QC đây là mock

### Vấn đề 1: Nhiều nút bấm không làm gì (⚠️)
- **Vấn đề:** `manage-models-drawer.component.ts`: `onPause()`, `onNewRun()`, `onRunClick()` để trống (TODO). `onEdit()` không làm gì khi model không có run active. Nút "PAUSE ALL RUN & EDIT" chỉ đóng popup.
- **Vì sao quan trọng:** QC (duyvna/handn) bấm Edit/Pause không thấy gì, log bug lên Redmine, tốn thời gian của cả team. Khách xem demo cũng tưởng là lỗi.
- **Cách sửa:** ẩn hoặc disable kèm tooltip "Coming soon" những nút chưa có flow. Ghi vào Jira OP-27 phần nào chưa làm.

### Vấn đề 2: Giới hạn model lấy từ dữ liệu giả, không từ license (⚠️)
- **Vấn đề:** `ManageModelsService.getUsage()` trả `MODEL_USAGE_SAMPLE`. Toàn bộ list/detail/delete là mảng trong bộ nhớ (`manage-models.sample-data.ts`).
- **Vì sao quan trọng:** API license thật đã có (OP-9 của samht đã hiện được data license, #315 có `modelCapacity`). Popup "đạt giới hạn → Upgrade License" đang hiện theo số giả, nên QC test luồng license sẽ thấy không khớp với license đã upload. Delete xong F5 thì model "sống lại".
- **Cách sửa:** ít nhất nối `getUsage()` với API license status (`modules.optimization.modelCapacity`) ngay. Phần model chờ BE (tiennd2/kietnht đang làm save step 1). Lưu ý chờ chốt Vấn đề 2 của #315 (0 = vô hạn?).

### Vấn đề 3: Đụng file với #325 (⚠️)
Xem #325 Vấn đề 2. #328 nên rebase sau khi #325 merge.

### Vấn đề 4: PR quá lớn, 1 ticket gộp 4 change (💬)
- **Vấn đề:** 4 change OpenSpec (expression-view, manage-models-drawer, shared-detail-pieces, ticket-alignment) trong 1 PR.
- **Vì sao quan trọng:** khó review kỹ, và component dùng chung (confirm-dialog, side-drawer) bị sửa lẫn với feature.
- **Cách sửa:** lần sau tách component dùng chung thành PR riêng.

### Spec (OpenSpec): 💬
- `validate --strict` (precognize-workspace): ✅ 38 pass.
- Proposal ghi rõ "no backend yet, mock data", dependencies backend đánh dấu UNKNOWN. Đây là cách làm đúng.
- 💬 Cả 4 change đã archive ngày 08/10, trước khi merge.
- Spec khớp code. Các TODO ở Vấn đề 1 cũng nên ghi vào Non-goals của spec cho rõ.

### Điểm tốt
- `switchMap` bỏ response cũ khi gõ search nhanh.
- Sau khi xóa thì chọn model kế tiếp hợp lý, kể cả khi trang trống thì lùi trang.
- New Model mở tab mới bằng `noopener`, drawer giữ nguyên.
- Chỉ reload trang Runs khi thật sự có xóa (`modelsChanged`).

---

## Piece 2: Matrix room (07/10 09:30 → 09/10 09:10, 333 tin)

**Tiến độ dev**
- tuanntg: gửi 3 key license test (only OP / only Monitor / all) cho samht (07/10). Xong license history (08/10 08:40), đã resolve conflict.
- kietnht: review + deploy phần license (07/10). Deploy search của tiennd2 (08/10). Draft state BE "done, chưa deploy" (08/10 16:53).
- samht: OP-13 lên staging (07/10). OP-9 có hàng trên staging cho QC (08/10 08:55). Được giao OP-16, rồi step 3.
- tiennd2: search tag xong. Đang làm microservice + create model cùng kietnht. Upsert node ok (08/10 14:08).
- trinm: nối process-digital-plant2 với BE active-alerts để tạo data DP test.

**Câu hỏi khách và trạng thái**
- ✅ Permission (khách trả lời 08/10 15:09): chỉ System Admin quản lý license. **Mọi user đều tạo/sửa được model** của nhau. ⚠️ Edit đồng thời thì "ai save sau thắng" (tiennd2), chưa ai xử lý xung đột. Nên ghi vào spec.
- ✅ "X months of data": khách yêu cầu là tham số backend. anhttl đã confirm (09/10 08:46).
- ❓ Time window mặc định cho Data Exclusions: "default 1 year" (vytth) hay lấy từ configuration (anhttl 16:56)? Chưa chốt. "configurable limit" lấy từ đâu cũng chưa rõ.
- ❓ Khách hỏi về bản backup DB đầy đủ. Team đã chạy lại migration, đủ data. Đang chờ vytth giải thích workaround cho khách.
- ⚠️ **Khách nghỉ 09/10** (anhttl 08/10 17:23), nên các câu còn mở sẽ phải chờ sang tuần.

**Khác**
- anhttl báo UI vỡ ở 1920×1080 (07/10 14:05). samht trả lời "tạm ignore, sau coi lại", chưa có ai theo dõi. Nên log Redmine.
- anhttl: mọi chỗ hiển thị ngày giờ phải theo configuration của `/get-all`.
- "Upgrade License" = upload thêm license (FE làm, đã ghi Jira).
- QC (duyvna 08/10 14:42): ticket nào deploy rồi thì kéo đúng status trên Jira.
- Bug log trên Redmine: https://redmine.nustechnology.com/projects/elena-active-alerts
- Không có tin nhắn nào gửi trực tiếp cho DuongDN.

## Piece 3: Test env
- `https://active-alerts.nusdev.net/optimizations` → `200`, 0.77s.
- ⚠️ 08/10 09:47 có 502 lúc kietnht đang build (đã hết).
- ⚠️ **09/10 09:09 kietnht: "AA bị issues, mất tiêu hết mấy cái asset name"**. Có thể liên quan đến việc chạy lại migration DP ngày 08/10. Cần theo dõi ở catch-up 09:15.

## Piece 4: Jira
Chưa có credential (`config/.jira-precognize.json`).

## Câu hỏi chưa giải quyết
- Gói OP có loại "không giới hạn model" không? (ảnh hưởng #315 Vấn đề 2 và popup limit của #328)
- Time window mặc định cho Data Exclusions: cố định 1 năm hay theo configuration?
