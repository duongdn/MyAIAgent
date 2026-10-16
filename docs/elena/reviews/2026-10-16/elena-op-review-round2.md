# Elena OP: review lần 2 (16/10/2026)

So sánh với lần review 13/10 (`docs/elena/reviews/2026-10-13/elena-op-review-followup.md`). Code đã pull lúc 15:40 ngày 16/10.

## Tóm tắt

| Hạng mục | 13/10 | 16/10 |
|---|---|---|
| Mock license trong portal/admin (🔴) | Có trong nus-base | ✅ **Đã gỡ** (`098b8b44f0`), chỉ còn mô tả trong tasks.md |
| #336 không merge được do commit revert (🔴) | Conflict | ✅ **Hết vấn đề**: BE đóng #315/#321/#336, gom vào branch mới `feature/optimization-be-m1` (PR #353), tách từ develop sạch của khách |
| FE gửi OR, BE chỉ nhận AND (🔴) | Loại trừ nhau | 🟡 PR #362 đổi BE sang chỉ nhận OR, khớp FE. **Nhưng chưa merge** |
| Tên hàm FE ≠ BE (mới) | – | 🔴 **Lỗi mới do #362**: BE đổi `AVERAGE/MINIMUM/MAXIMUM` → `AVG/MIN/MAX`, FE vẫn gửi tên cũ |
| Unique index tên model (🔴) | Bị comment-out | ❌ **Vẫn comment-out** |
| Chỉ người tạo được sửa model (trái lời khách) | Còn | ✅ **Đã bỏ** (`bb87e3af14`) |
| `assert` làm validate | 23+2 | ⚪ **Rút lại, không tính là lỗi**: đây là pattern chung của code khách (732 `assert` trong code develop của Precognize), mọi Dockerfile (cả `microservices-optimization`) chạy `java -ea`. Release note M1 (14/10) không nhắc tới assert |
| Lưu đè cả document, không lock / log `getMessage()` | Còn | ❌ Vẫn còn (`DaeOptimizationModelControl.java:240,245`) |
| Merge khi reviewer còn "Request changes" | 3 PR | 🟡 Không còn PR nào merge khi đang Request changes, nhưng vẫn **chưa PR nào được Approve** |
| `OptimizationTagType` hardcode loại đo (FE) | Chưa | ❌ Vẫn chưa (`optimization-model-item.component.ts:19`) |

**DuongDN cần làm ngay:**
1. Báo tiennd2 (#362) và Ken/Aron: thống nhất tên hàm trước khi merge #362 (mục 1.1). Không thì mọi condition có hàm sẽ bị BE từ chối.
2. Nhắc Brian/kietnht: unique index vẫn chưa bật (mục 2.1). Đây là việc tồn lần thứ 3.
3. Nhắc team: PR BE lớn #353 (154 file, +5.497 dòng) chưa có ai review mà sắp vào branch giao khách. Cần kietnht hoặc Brian review chéo.

## Cấu trúc branch đã thay đổi (để đọc phần dưới)

- **BE**: `feature/OP-xx` → `feature/optimization-be-m1` → (PR #353) → `feature/nus-optimization`. `feature/nus-optimization` là bản develop của khách (commit cuối là merge PR #5498 của Precognize). Branch be-m1 **không có thư mục `openspec/`**, vì là branch để giao khách.
- **FE**: `nus-base` (đã giao M1) và các branch milestone `nus-op-m2` → `nus-op-m3`. PR mới vào `nus-op-m3`.

## 1. PR #362: OP-34 hàm điều kiện + tô vùng thời gian (BE, tiennd2) — ❌

https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/362

**PR làm gì:** Ở bước 3 (loại trừ dữ liệu) và bước 4 (điều kiện vận hành), người dùng nhập điều kiện kiểu "áp suất > 10 OR SUM(tag A, tag B) > 50". PR này thêm API `POST /optimization/models/highlight-periods`. API nhận một nhóm điều kiện và trả về các khoảng thời gian trong 1 năm gần nhất thỏa điều kiện, để FE tô màu trên biểu đồ. PR cũng đổi luật: nhóm điều kiện **bắt buộc OR** (trước đây bắt buộc AND), đúng như khách đã chốt và FE đã làm.

**Kết luận:** ❌ Hướng đi đúng và có spec rõ, nhưng làm vỡ contract với FE ở tên hàm. Ngoài ra API mới không kiểm tra tag.

### 1.1 🔴 Tên hàm BE và FE không còn khớp
- **Vấn đề:** `DaeApiOptimizationFunction.java` đổi `AVERAGE→AVG`, `MINIMUM→MIN`, `MAXIMUM→MAX`, và thêm `DIFF`, `PROP`. FE (`expression.model.ts:14` trên nus-base và nus-op-m3) vẫn gửi `'AVERAGE' | 'MINIMUM' | 'MAXIMUM' | 'DIFFERENCE' | 'PROPORTION'`.
- **Tại sao quan trọng:** Người dùng chọn hàm AVG trong điều kiện → FE gửi `"function":"AVERAGE"` → BE không đọc được JSON (enum không có giá trị này), trả lỗi. Cả nút lưu bước 3/4 lẫn tô vùng đều hỏng với mọi hàm trừ SUM và RANGE. Lỗi này chỉ lộ ra khi test tích hợp, vì mỗi bên test riêng đều xanh.
- **Cách sửa:** Hai team chốt một bộ tên (ghi trong spec BE vì spec BE là nơi duy nhất định nghĩa API). Hoặc BE giữ tên cũ, hoặc FE đổi theo, và cả hai sửa trong cùng đợt.
- **Mức:** 🔴 phải sửa trước khi merge.

### 1.2 ⚠️ API tô vùng không kiểm tra tag
- **Vấn đề:** Khi lưu model (`upsert`), BE gọi `verifyTags` để chắc tag tồn tại. API `highlight-periods` (`DaeControlOptimizationModel.highlight`) gửi thẳng sang data-manager, không có bước này.
- **Tại sao quan trọng:** FE gửi tagId sai (tag đã xóa, hoặc gõ tay) → câu truy vấn Influx chạy 1 năm trên tag không có → trả rỗng. Người dùng tưởng "điều kiện không khớp lúc nào", thực ra là sai tag.
- **Cách sửa:** Kiểm tra tag giống upsert, trả lỗi rõ ràng.
- **Mức:** ⚠️ nên sửa.

### 1.3 ⚠️ Số được ghi vào câu truy vấn theo locale của máy
- **Vấn đề:** `DaeInfluxTopLevelFilterByConversionRulesTemplates.formatValueList` dùng `String.format("%f", value)`.
- **Tại sao quan trọng:** `%f` dùng locale mặc định của JVM. Nếu server khách chạy locale như de_DE, `1.5` thành `1,500000` → câu Flux `set: [1,500000, 2,000000]` sai cú pháp hoặc ra số khác. `%f` cũng làm tròn còn 6 chữ số thập phân.
- **Cách sửa:** `String.format(Locale.ROOT, ...)` hoặc `Double.toString(value)`.
- **Mức:** ⚠️ nên sửa (lỗi chỉ xảy ra trên một số môi trường, rất khó tìm).

### 1.4 ⚠️ Mỗi điều kiện chạy một truy vấn 1 năm, song song không giới hạn
- **Vấn đề:** `DaeConditionControl.calculateOptimizationHighlight` dùng `flatMap` trên toàn bộ điều kiện, mỗi điều kiện truy vấn Influx 1 năm. Hàm cuộn (rolling) cũng dùng cửa sổ 1 năm.
- **Tại sao quan trọng:** FE gọi một lần cho **mỗi thẻ** loại trừ. Model có 5 thẻ × 4 điều kiện = 20 truy vấn 1 năm cùng lúc, mỗi lần người dùng sửa. Influx của khách đang phục vụ cả portal.
- **Cách sửa:** Giới hạn song song (`flatMap(..., concurrency)`), và xác nhận với BA về khoảng thời gian 1 năm.
- **Mức:** ⚠️ nên sửa hoặc ghi rõ là đã chấp nhận.

### 1.5 Spec (OpenSpec) — 💬
- Spec đầy đủ: lý do, bảng ánh xạ hàm, ghi rõ **BREAKING** (draft cũ lưu AND sẽ bị từ chối ở lần lưu sau). Code khớp spec.
- ⚠️ PR **thêm thư mục `openspec/` vào branch be-m1**, trong khi be-m1 là branch giao khách nên trước đó không có openspec. PR còn thêm `openspec/config.yaml` dạng **template rỗng**. Bản thật trên nus-base có 76 dòng với các `rules:`. Hậu quả: validate spec trên branch này không áp luật của team, và openspec có thể đi theo #353 sang branch của khách. Nên để spec ở nus-base/branch nus như các change khác.
- 💬 Đường dẫn capability lồng 2 cấp `specs/optimization/conditions-highlight/spec.md`, khác quy ước `specs/<capability>/spec.md`.
- 💬 Spec nói MEAN là bí danh của AVG. Nhưng phía FE, MEAN là hàm dùng ở bước **đánh giá** (evaluation), không phải điều kiện. Cần BA xác nhận hai cái có thật sự giống nhau.

**Điểm tốt:** chuyển sang OR đúng lời khách. Sửa lỗi toán tử IN và thêm NOT IN trong engine. Gộp các khoảng chồng/chạm nhau. Không có secret hay hardcode env.

> **Đính chính về `assert`** (so với review 09/10 và 13/10): rủi ro "JVM không bật `-ea` thì bỏ qua validate" **không xảy ra**, vì Dockerfile của mọi service, kể cả optimization, đều chạy `java -ea`. Validate bằng `assert` là cách code gốc của khách đang làm (732 chỗ). Release note M1 gửi khách (Slack #optimization, 14/10) **không** liệt kê assert trong Known Issues (4 mục: tham số trend/data check cố định, usage meter hardcode, upload license chưa cập nhật credit, tooltip chưa hiện unit). Theo chỉ đạo DuongDN, không tính là lỗi nữa.

## 2. Các việc BE tồn từ lần trước (branch `feature/optimization-be-m1`, PR #353)

https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/353 — Brian, 42 commit, 154 file. **Chưa có review nào.**

### 2.1 🔴 Unique index tên model vẫn bị comment-out (tồn lần 3)
- **Vấn đề:** `DaeMigrationCreateOptimizationModelCollectionLogic.java:53-64`, cả 3 index (tên, status, goal.targetTagId) vẫn là comment. Code bắt `DuplicateKeyException` (`DaeOptimizationModelControl.java:241`) nhưng sẽ không bao giờ xảy ra vì không có index.
- **Tại sao quan trọng:** Hai người cùng bấm lưu model tên "Line 1" gần như cùng lúc. Cả hai đều qua bước kiểm tra tên (`assertNameAvailable`) vì chưa ai lưu xong → DB có 2 model trùng tên. Comment trong file vẫn nói "soft-deleted… partial filter", trong khi soft-delete đã bị bỏ (`8bcff28d92`).
- **Cách sửa:** Bỏ comment, bỏ `partialFilterExpression(deleted=false)` vì không còn field `deleted`, sửa lại comment cho đúng.
- **Mức:** 🔴

### 2.2 ✅ Đã sửa
- Bỏ check "chỉ người tạo được sửa" (`bb87e3af14`), đúng lời khách.
- Chặn sửa model không ở trạng thái DRAFT (`:185`).
- Bỏ soft-delete, gộp loại timeline action, bỏ currency ở improvement cost.

### 2.3 ❌ Chưa sửa (đã nêu 09/10 và 13/10, nhắc lại ngắn)
- `repository.save(document)` ghi đè cả document, không có version/lock. Hai người sửa cùng lúc thì người lưu sau xóa thay đổi của người trước, và không ai được báo.
- `log.warn(..., e.getMessage())` (`:245`): không có stack trace, lỗi NPE chỉ log ra `null`.
- `DaeTagDetailsRequest` / `DaeApiSearchController` vẫn còn trong be-m1 (code tag-details của OP-22 sửa vào API search chung).

## 3. FE

### 3.1 PR #354: OP-38 drawer chọn model khi tạo Run mới (Ken) — 💬
https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/354

**PR làm gì:** Trên trang Optimization Runs, nút "New Run" giờ mở một ngăn kéo bên phải để chọn model có sẵn (có tìm kiếm) hoặc tạo model mới. Nếu đã đạt giới hạn số model theo license, app hiện popup mời nâng cấp. Vì BE chưa có API danh sách model, PR dùng dữ liệu mẫu của Manage Models.

**Kết luận:** 💬 Code sạch. Các subscription đều có `takeUntilDestroyed`/`switchMap`, chữ hiển thị đều qua translate, có spec (16/18 task, 2 task còn lại là QA tay). Chưa ai review.
- 💬 Vẫn dùng sample data, không gửi request. Đây là bước demo có chủ đích (ghi trong PR), nhưng phải thay bằng API thật trước khi giao M3. Nên thêm vào checklist giao hàng giống lần gỡ mock license.
- 💬 `open()` gọi `getUsage().subscribe` mỗi lần mở mà không hủy. Với dữ liệu mẫu thì vô hại. Khi nối API thật nên đổi sang `switchMap` như phần search.

### 3.2 PR FE đã merge từ 13/10
#337, #339, #341, #349, #350, #352, #356, #357, #359, #360, #361: tất cả có người khác comment (Ken ↔ Aron, Ryan), không PR nào merge khi đang "Request changes". #357/#359 là merge giữa các branch milestone nên không review. **Chưa PR nào có Approve chính thức.** Team đang dùng "Comment" thay cho approve, nên không phân biệt được "đã review xong, OK" với "góp ý, chưa xong".

### 3.3 Còn tồn
- ❌ `OptimizationTagType` hardcode 6 loại đo (`optimization-model-item.component.ts:19`).
- ✅ Mock license đã gỡ khỏi cả 3 app.

## Câu hỏi còn mở
- BA: khoảng thời gian tô vùng 1 năm và MEAN = AVG đã được khách xác nhận chưa?
