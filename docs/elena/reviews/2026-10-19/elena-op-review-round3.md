# Elena OP: review lần 3 (19/10/2026)

Tiếp theo lần 2 (`docs/elena/reviews/2026-10-16/elena-op-review-round2.md`). Code pull lúc 14:55 ngày 19/10.

## Tóm tắt

| Hạng mục | 16/10 | 19/10 |
|---|---|---|
| Tên hàm FE ≠ BE ở #362 (🔴) | `AVG/MIN/MAX` vs `AVERAGE/...` | ✅ **Đã sửa** (`6dbf55da3a`): BE dùng lại tên đầy đủ `AVERAGE, MINIMUM, MAXIMUM, DIFFERENCE, PROPORTION`, khớp FE |
| Lưu đè toàn bộ model mỗi bước | Có | 🟡 **Cải thiện** (`043c4d52f1`): mỗi bước chỉ cập nhật phần của bước đó, giữ nguyên phần khác. Vẫn không có lock khi 2 người sửa cùng lúc |
| Unique index tên model (🔴, tồn lần 4) | Comment-out | ❌ Vẫn comment-out (12 dòng) |
| Quy tắc tên model FE ≠ BE (mới) | – | 🔴 **Lỗi mới** ở nus-base (`3163acf25e`), mục 3.1 |
| Branch tích hợp BE mới | – | `feature/optimization-algorithm-integration` (chứa toàn bộ be-m1). PR #364 nhắm vào branch này |
| openspec lọt vào branch BE | #362 | ⚠️ #364 lặp lại (thêm `openspec/config.yaml` rỗng) |
| Review chéo BE | #353, #362 chưa ai review | ❌ **Cả 4 PR đang mở (BE #353, #362, #364 và FE #354) đều chưa có review nào** |

**DuongDN cần làm ngay:**
1. Báo Aron/Ken và kietnht: quy tắc tên model FE và BE lệch nhau (mục 3.1). Người dùng gõ tên tiếng Thái/Hindi hoặc tiếng Việt dạng tổ hợp, FE cho qua nhưng BE từ chối khi lưu.
2. Yêu cầu review chéo BE: kietnht ↔ Brian ↔ tiennd2. Hiện có 3 PR BE (#353 154 file, #362, #364) chưa ai đọc.
3. Nhắc lần 4 vụ unique index (mục 2.1).

## 1. PR BE

### 1.1 PR #364: OP-43 danh sách model (tiennd2) — 💬
https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/364 (+1.210 dòng, base `feature/optimization-algorithm-integration`)

**PR làm gì:** Thêm API `GET /optimization/models` cho drawer "Manage Optimization Models" (hiện FE đang dùng dữ liệu mẫu). API trả danh sách model theo trang (mặc định 10, tối đa 100), tìm theo tên model hoặc tên/mô tả của tag mục tiêu và tag influencer. Kèm bộ đếm "x / y Models Used" (x = số model không phải DRAFT, y = giới hạn theo license).

**Kết luận:** 💬 Code gọn, dùng regex có `Pattern.quote` (không bị chèn regex), giới hạn page size ở cả 2 tầng. Còn vài điểm cần làm rõ:

- **⚠️ Spec nói về soft-delete, nhưng OP-26 đã bỏ soft-delete.**
  - **Vấn đề:** Proposal/design ghi "soft-deleted models are excluded, each item exposes `deletedAt`, `deletedBy`", và query lọc `deleted != true`. Nhưng commit `8bcff28d92` của OP-26 đã bỏ soft-delete khỏi luồng upsert, và không có API xoá nào.
  - **Tại sao quan trọng:** Sau này người làm chức năng xoá đọc spec sẽ tưởng hệ thống dùng soft-delete, trong khi OP-26 đã quyết định ngược lại. FE cũng nhận thêm 2 field không bao giờ có giá trị.
  - **Cách sửa:** Thống nhất một hướng với Brian (OP-26). Nếu đã bỏ soft-delete thì bỏ `deletedAt/deletedBy` khỏi `DaeApiOptimizationModelListItem` và sửa spec.
- **⚠️ Tìm kiếm theo tag có thể kéo về rất nhiều id.**
  - **Vấn đề:** `findColumnIdsByNameAndDescription` tìm trên toàn bộ tag của nhà máy, gom **tất cả** id khớp, rồi đưa vào `$in` của Mongo. Không có độ dài tìm kiếm tối thiểu và không giới hạn số kết quả.
  - **Tại sao quan trọng:** Người dùng gõ "1" hoặc "PV" có thể khớp hàng chục nghìn tag → một danh sách id khổng lồ gửi qua RSocket rồi vào câu query Mongo. Mỗi lần gõ phím (sau debounce) lặp lại.
  - **Cách sửa:** Bắt buộc tối thiểu 3 ký tự (FE đã làm vậy ở chỗ khác), hoặc giới hạn số tag trả về.
- **💬 Tên ticket lẫn lộn:** tiêu đề PR là OP-43 nhưng commit và thư mục spec ghi OP-34 (`op-34-model-list`). #362 cũng là OP-34. Khó truy ngược Jira.
- **💬 Nếu service license lỗi thì cả danh sách lỗi theo:** `licenseCapacity()` không bắt lỗi. Có thể trả danh sách kèm `limit = null` thay vì làm hỏng cả màn hình.
- **⚠️ Spec:** lại thêm `openspec/config.yaml` dạng template rỗng và `openspec/` vào branch BE (giống #362). Base `feature/optimization-algorithm-integration` hiện **không có** openspec. Nếu branch này đi tiếp sang branch giao khách thì openspec đi theo.

### 1.2 PR #362: OP-34 hàm điều kiện + tô vùng (tiennd2) — 💬 (trước: ❌)
https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/362

- ✅ Tên hàm đã khớp FE (`6dbf55da3a`).
- 🔁 Rút lại góp ý `String.format("%f")` theo locale: code gốc của khách cũng định dạng số như vậy (`DaeInfluxTopLevelFilterByConversionRulesTemplates.java:312`), nên đây là pattern chung, không tính cho OP.
- Còn mở từ lần 2: ⚠️ API tô vùng không kiểm tra tag tồn tại; ⚠️ mỗi điều kiện chạy một truy vấn 1 năm, song song không giới hạn; ⚠️ openspec lọt vào branch BE.

### 1.3 Commit `043c4d52f1` "update logic for upsert op model" (trên branch tích hợp)
- **Thay đổi:** Mỗi lần lưu, BE đọc bản draft đang lưu, chỉ thay phần của bước đang lưu (GOAL / INFLUENCERS / DATA_EXCLUSIONS / OPERATING_CONDITIONS), giữ nguyên các phần khác. Validate bước sau dựa trên dữ liệu đã lưu của bước trước, và chặn đổi tag mục tiêu trùng với một influencer đã lưu. Thêm loại timeline `UPDATED_DRAFT`.
- ✅ Hợp lý hơn kiểu "ghi đè toàn bộ" trước đây.
- ⚠️ **Dữ liệu cũ không được dọn khi bước trước thay đổi:** Người dùng lưu bước 3 với một exclusion có affected tag là influencer X → quay lại bước 2 bỏ X → BE vẫn giữ X trong `dataExclusions[].affectedTagIds`. FE đã tự bỏ ở phía mình (`73ea23cfa8`), nhưng BE không làm, nên dữ liệu lưu có thể trỏ tới tag không còn là influencer. Nên dọn hoặc validate lại ở BE khi lưu bước INFLUENCERS.
- Vẫn không có lock: hai người cùng sửa một draft, người lưu sau thắng (spec op-26 đã ghi rõ là chấp nhận).

## 2. Việc BE tồn

### 2.1 🔴 Unique index tên model vẫn comment-out (lần 4)
Trên branch tích hợp mới, `DaeMigrationCreateOptimizationModelCollectionLogic.java` vẫn 12 dòng comment. Comment trong `DaeOptimizationModelDocument.java:23` vẫn viết "backs the case-insensitive unique index together with deleted=false", tức là mô tả một index không tồn tại. Hệ quả như lần trước: hai người lưu cùng tên gần như cùng lúc → 2 model trùng tên.

### 2.2 Còn lại
- Log `e.getMessage()` không kèm stack trace.
- `DaeTagDetailsRequest` (OP-22, nằm trong API search chung) giờ được #364 dùng tiếp, nên khó gỡ hơn.

## 3. FE

### 3.1 🔴 Quy tắc tên model FE và BE lệch nhau (nus-base, `3163acf25e`, OP-13)
- **Vấn đề:** FE đổi regex tên thành `/^[\p{L}\p{M}\p{Nd} _-]+$/u` (thêm `\p{M}`, các dấu tổ hợp), với comment cũ "The backend's name rule" bị xoá. BE vẫn là `^[\p{L}\p{Nd} _-]{1,100}$` (`DaeOptimizationModelConstraints.java:34`), không có `\p{M}`.
- **Tại sao quan trọng:** Tiếng Thái, Hindi và tiếng Việt gõ theo kiểu tổ hợp (macOS/một số bộ gõ tạo "e" + dấu rời) đều chứa ký tự `\p{M}`. Người dùng gõ tên → FE báo hợp lệ → bấm lưu → BE trả `invalidOptimizationModelName`. Người dùng không hiểu vì sao. Bug này đã nằm trong **nus-base, bản đã giao M1**.
- **Cách sửa:** Thống nhất một regex. Hoặc BE thêm `\p{M}`, hoặc FE bỏ `\p{M}` (hay chuẩn hoá NFC trước khi gửi, để "e" + dấu thành "ế" một ký tự). Ghi regex vào spec BE vì đây là contract.
- **Mức:** 🔴 sửa nhỏ nhưng ảnh hưởng người dùng thật.

### 3.2 OP-17 Data Exclusions (Aron, nus-op-m2 → m3, khoảng +1.300 dòng) — 💬
**Làm gì:** Bước 3 của wizard: thêm/sửa các luật loại trừ dữ liệu (ví dụ "loại bỏ lúc máy dừng"), chọn tag bị ảnh hưởng trong số influencer của bước 2, bật/tắt tô vùng thời gian trên biểu đồ.
- ✅ Code sạch: subscription đều có `takeUntilDestroyed`/`switchMap`, text qua translate, đã sửa theo góp ý review (keyboard trong tag picker, translate tiêu đề kèm số đếm, bỏ affected tag khi bước 2 đổi).
- ⚠️ **FE không lưu exclusions lên BE ("visit-local"):** luật chỉ sống trong phiên. Rời trang hoặc bấm Start Run thì có hộp thoại báo mất (`exclusionsUnsavable`). Trong khi BE (OP-26, `043c4d52f1`) đã có bước lưu `DATA_EXCLUSIONS`. Cần BA xác nhận đây là hướng sản phẩm tạm thời, và có ticket nối API.
- 💬 Vùng tô vẫn lấy từ dữ liệu mẫu (`operating-constraint-periods.sample-data`). API thật đã có ở #362 (chưa merge). Phải nối trước khi giao M2, giống vụ gỡ mock license ở M1.

### 3.3 OP-18 named periods trên biểu đồ (ryannus, `97e8906b90`) và fix M1 #363
Thay đổi nhỏ, không có vấn đề. #363 có Ken và Aron review, CodeRabbit comment.

### 3.4 PR #354 OP-38 (Ken): không có commit mới, vẫn chưa ai review.

## Câu hỏi còn mở
- BA: Data Exclusions không lưu (visit-local) là hướng sản phẩm chính thức của M2, hay chỉ tạm thời trong lúc chờ nối API?
- Brian/tiennd2: hướng soft-delete cuối cùng là bỏ hay giữ?
