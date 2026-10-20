# Elena OP: review lần 4 (20/10/2026)

Tiếp theo lần 3 (`docs/elena/reviews/2026-10-19/elena-op-review-round3.md`) và báo cáo standards (`2026-10-19/elena-op-standards-review.md`). Code pull lúc 14:00 ngày 20/10.

## Tóm tắt

| Hạng mục | 19/10 | 20/10 |
|---|---|---|
| PR giao BE `Precognize/development#5512` | Chưa review | 🔴 **Bị CHANGES_REQUESTED** (nusdavid, 20/10): thiếu config optimization trong `reference.conf` (đã kiểm: không có), code comment-out ở migration (đúng vụ unique index tồn 4 lần), dependency không dùng ở `DaeApiSearchController` |
| PR giao FE `#5511` (khách comment 9 chỗ) | Chưa trả lời | ✅ Ken đã trả lời 11 comment, chuyển SVG ra file (`59186d8f37`), dời sample tag về playground (`ff36446477`). Chờ khách phản hồi |
| Branch BE | `feature/optimization-algorithm-integration` | Đổi sang **`feature/optimization-be-m2`**; #362, #364, #372 đều nhắm vào đây |
| PR BE mới #372 (upsert theo bước + operating conditions dạng list) | – | 💬 mục 1.1 |
| #364 model list | 16e2a5bd | 1 commit mới (`afda7fcb70`). 🔴 **Lệch contract với FE OP-27**: BE trả `limit = null`, FE coi là lỗi (mục 1.2) |
| FE nus-op-m2 (42 commit, +4.720 dòng) | – | OP-27 nối API list, OP-19 nối API tô vùng (bỏ sample). ⚠️ Chi tiết model vẫn là dữ liệu mẫu ghép với model thật (mục 2.1) |
| Unique index tên model | Comment-out lần 4 | ❌ Vẫn vậy, **và giờ khách đã tự bắt** ở #5512 |
| Review chéo nội bộ | 4 PR không ai review | ❌ #353, #354, #362, #364, #372: **vẫn 0 review** |

**DuongDN cần làm ngay:**
1. Báo kietnht/Brian xử lý 3 comment của khách ở #5512 (mục 3). Riêng vụ unique index: quyết định dứt điểm (bật index hoặc xoá hẳn đoạn comment, sửa comment trong document) rồi trả lời khách.
2. Báo tiennd2 + ryannus thống nhất `usage.limit` (null hay số) trước khi merge #364, nếu không drawer Manage Models báo lỗi trên mọi nhà máy không có giới hạn license (mục 1.2).
3. Chỉ định review chéo BE cho #362/#364/#372 (Brian ↔ tiennd2 ↔ kietnht).

## 1. PR BE

### 1.1 PR #372 `fix/upsert-op-model` (tiennd2) — 💬
https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/372 (+215/−115, base `feature/optimization-be-m2`, body trống, chưa ai review)

**PR làm gì:** Đưa logic "lưu theo từng bước" (commit `043c4d52f1` đã review lần 3) sang branch m2, và đổi cấu trúc dữ liệu bước 3/4: mỗi data exclusion có thêm `name`; `operatingConditions` từ **một** condition set thành **danh sách** các condition có `id` (tự sinh UUID), `name`, `conditionSet`. Đồng thời đổi luật nối điều kiện: chỉ chấp nhận **OR** (trước là chỉ AND).

**Kết luận:** 💬 Logic đúng hướng, khớp FE (FE luôn gửi `OR`, `expression.model.ts:8`). Nhưng là thay đổi contract mà không có spec, không có test, và có mã lỗi sai.

- **⚠️ Thay đổi contract không có spec.**
  - **Vấn đề:** `operatingConditions` đổi kiểu (object → array), `logicalOperator` đổi từ AND sang OR, thêm `name`. Không có file `openspec/` nào được sửa; spec op-26 hiện vẫn mô tả kiểu cũ.
  - **Tại sao quan trọng:** API contract chỉ được mô tả trong `openspec/` gốc (quy tắc dự án). FE OP-18/OP-19 sẽ đọc spec để nối API lưu bước 3/4. Spec cũ → FE gửi object → BE trả lỗi deserialize.
  - **Cách sửa:** Thêm delta spec cho op-26 (kiểu mới, luật OR, scenario lỗi).
- **⚠️ Không có test, test cũ có thể vỡ.** `validateUpsert` đổi chữ ký (thêm `stored`), `upsert` đổi luồng, nhưng PR không sửa file test nào. Cần chạy `mvn test` module optimization và cập nhật test.
- **💬 Tên trống báo sai mã lỗi.** `validateName()` (`DaeOptimizationModelConstraints.java`, cuối file) báo `invalidOptimizationConditionSet` khi exclusion/condition không có tên. FE sẽ hiện "điều kiện không hợp lệ" thay vì "thiếu tên". Nên có errorId riêng (ví dụ `missingOptimizationConditionName`) và giới hạn độ dài tên như tên model.
- **💬 Dữ liệu cũ không dọn khi bỏ influencer** (đã nêu lần 3): vẫn còn. Đổi bước 2 không làm lại kiểm tra `affectedTagIds` của exclusion đã lưu.
- **💬 Commit trùng:** `2c9fd4755c` là cùng nội dung với `043c4d52f1` ở #364. Merge cả hai sẽ trùng/xung đột. Nên rebase #372 lên #364 hoặc tách rõ.
- ✅ Bỏ `copyLifecycleFields` (giờ sửa trực tiếp document đã lưu) gọn hơn; chặn kiểm tra trùng tên khi không phải bước GOAL là đúng.

### 1.2 PR #364 OP-43 model list (tiennd2) — ❌ (trước: 💬)
https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/364 (commit mới `afda7fcb70`: thêm `sendRSocketRequestResponse` không có body cho license service)

- **🔴 Lệch contract `usage.limit` với FE OP-27.**
  - **Vấn đề:** BE: `limit(capacity.orElse(null))` (`DaeOptimizationModelControl.java:295`), tức khi license không có giới hạn số model thì `limit` là `null`. FE: `toModelsPage()` (`manage-models.service.ts`) yêu cầu `typeof data.usage?.limit === 'number'`, nếu không thì `throw new Error('Unexpected models response')`.
  - **Tại sao quan trọng:** Nhà máy có license không giới hạn (hoặc chưa có license OP) → mở drawer Manage Models → **toàn bộ danh sách báo lỗi**, dù có model. Guard trang chủ `hasOptimizationModelsGuard` cũng dùng hàm này → bắt lỗi → người dùng đã có model vẫn bị đưa về trang "chưa có model".
  - **Cách sửa:** Chốt một bên: BE luôn trả số (0 = không giới hạn?) hoặc FE chấp nhận `null` và hiển thị "x Models Used" không có "/ y". Ghi vào spec op-34.
- Các điểm lần 3 (soft-delete trong spec, tìm tag không giới hạn, tên ticket OP-43/OP-34, openspec lọt vào branch BE) **chưa sửa**.
- ⚠️ Rule mới từ #5512: khách bắt "dependency không dùng". `afda7fcb70` thêm hàm mới mà không có test.

### 1.3 PR #362 OP-34 (tiennd2), #353 be-m1 (Brian)
Không commit mới. #362 đổi base sang be-m2. Vẫn 0 review.

## 2. FE (nus-op-m2, 42 commit từ 19/10)

### 2.1 OP-27 nối API danh sách model (ryannus) — 💬
**Làm gì:** Drawer Manage Models giờ lấy danh sách, tìm kiếm, phân trang, bộ đếm "x / y" từ `GET /optimization/models` (#364). Trang chủ `#/` mở thẳng Optimization Runs nếu đã có model (guard mới). Sửa nhiều lỗi giao diện (cắt tên, tooltip, cột 360px, trang cuối rỗng).

- **🔴 `usage.limit` null làm hỏng cả danh sách**: xem 1.2 (lỗi nằm ở cả hai phía, chỉ cần sửa một phía).
- **⚠️ Chi tiết model là dữ liệu mẫu ghép vào model thật.**
  - **Vấn đề:** `getModel()` lấy `MODELS_SAMPLE[hashOf(item.id) % length]` rồi chỉ thay tên/mô tả/hướng/tag mục tiêu bằng dữ liệu thật. Health, status, ngày tạo, influencer, exclusion, constraint, lịch sử run **đều là giả**.
  - **Tại sao quan trọng:** Khi danh sách đã là thật (model người dùng vừa tạo), bấm vào xem chi tiết lại thấy influencer và lịch sử run không hề tồn tại. QC/khách sẽ coi là bug dữ liệu. Khách đã hỏi đúng chỗ này ở #5511 ("Do you need mocks?"), Ken trả lời "M1 chưa có endpoint", nhưng ở M2 list đã thật mà detail vẫn giả thì khó giải thích hơn.
  - **Cách sửa:** Khi chưa có API detail, chỉ hiện các field có thật và để trạng thái "chưa có dữ liệu" cho phần còn lại; hoặc có ticket API detail trước khi giao M2.
- **💬 Nút DELETE MODEL chỉ đóng dialog** (`TODO(OP-27)` trong `manage-models-drawer.component.ts`): người dùng bấm xoá, dialog đóng, model vẫn còn, không báo gì. Đây đúng kiểu "hàm rỗng" khách đã comment. Nên ẩn/disable nút cho đến khi có API.
- **💬 Guard timeout 1.500 ms**: API chậm (lần đầu, cold start) → người có model vẫn bị đưa về trang "chưa có model". Chấp nhận được nếu BA đồng ý; nên ghi vào spec.
- ✅ Dùng `HttpService` + `ApiCallsPathsEnum.OPTIMIZATION_MODELS` (đúng standard, không viết URL tay), validate envelope trước khi map, lọc dòng thiếu id/name.

### 2.2 OP-19 nối API tô vùng (Aron) — ✅
**Làm gì:** Bỏ sample `operating-constraint-periods`, gọi API `highlight-periods` (#362) cho từng rule ở bước 3/4, có loading, timeout 30s, tooltip theo chuột, debounce khi cuộn bằng `requestAnimationFrame`.
- ✅ Đã gỡ mock như góp ý lần 3. Subscription mỗi rule được hủy khi rule bỏ chọn và khi component destroy (`rule-periods.ts`), có `takeUntilDestroyed`, có cache.
- 💬 Phụ thuộc #362 chưa merge và chưa ai review. FE sẵn sàng trước BE; nếu #362 đổi contract thì FE phải sửa theo.
- Spec OP-18/19 được cập nhật, archive đúng quy trình.

### 2.3 Khác
- redmine-81535 (ô số bắt đầu rỗng với placeholder 0), OP-55 (cột lịch sử licence), OP-14: thay đổi nhỏ, ổn.
- PR #354 OP-38 (Ken): không commit mới, 0 review.

## 3. Khách review PR giao M1

### 3.1 `#5512` BE — 🔴 CHANGES_REQUESTED (nusdavid, 20/10 10:23)
https://github.com/Precognize/development/pull/5512

| # | File | Khách nói | Đánh giá |
|---|---|---|---|
| 1 | `DaeControlOptimizationModel.java:31` | Application gọi OptimizationService nhưng `reference.conf` **không có config optimization**, có thể quên đẩy | 🔴 Đúng. Không config → application không biết địa chỉ service khi chạy ở môi trường khách. Thêm block config + kiểm tra deploy |
| 2 | `DaeMigrationCreateOptimizationModelCollectionLogic.java:50` | "Sao push code comment-out? Nếu collection chưa có thì sao? Chỉ tạo collection mà không làm gì" | 🔴 Đúng vụ **unique index em đã nhắc 4 lần**. Phải bật index (tốt nhất) hoặc xoá đoạn comment và giải thích |
| 3 | `DaeApiSearchController.java:26` | "Các dependency mới đều không dùng" | ⚠️ Head hiện tại của #5512 đã không còn inject thừa, nhưng để lại 5 dòng trống giữa field và method (đúng loại "thay đổi không liên quan" khách hay bắt). Dọn và trả lời khách là đã sửa |

### 3.2 `#5511` FE — Ken đã trả lời
Ken trả lời 11 comment hôm nay: giữ handler rỗng (template đã bind, chờ API), giữ sample data (M1 chưa có endpoint), playground không translate (trang dev), `<title>` không dùng key được; đã chuyển SVG ra file. Hợp lý, khớp CONVENTIONS nội bộ. Việc mở còn lại: chờ khách chấp nhận.

## Rule bổ sung vào checklist (từ #5512)
- Service mới gọi từ application → phải có config trong `reference.conf` (và các file config môi trường).
- Không đẩy code comment-out vào PR giao khách (khách bắt thật, không chỉ nội bộ).
- Không inject dependency không dùng, kể cả "để sau dùng".

## Câu hỏi còn mở
- tiennd2/ryannus: `usage.limit` khi license không giới hạn là `null` hay số?
- Brian/kietnht: bật unique index tên model hay bỏ hẳn? (cần trả lời khách ở #5512)
- BA: detail model ở M2 có API không, hay vẫn sample khi giao?
