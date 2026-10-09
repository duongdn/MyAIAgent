# Elena OP — Review cấu trúc nền tảng (data model, contract, luồng)

> **Mục đích:** đây là các bước đầu. Sai ở data model/contract thì sau này phải migrate dữ liệu khách, sửa cả FE + BE + Algorithm. Review **không mặc định spec đúng**: OpenSpec chỉ ghi lại điều team đã chọn, chưa chắc khách đã duyệt.
> Nguồn: `nus-base` `a288733a18` + branch `feature/op-26-be-model-run-save-draft-discard-state` (upsert/draft, Brian, 09/10) + FE optimization-ui + Matrix room. Cập nhật 2026-10-09.
> Sắp theo **chi phí sửa về sau** (cao → thấp), không theo độ khó.

## Tóm tắt: 6 quyết định cần chốt TRƯỚC khi code thêm

| # | Quyết định | Hiện trạng | Mức |
|---|-----------|-----------|-----|
| 1 | **Run là gì, nằm ở đâu?** Model ↔ Run ↔ Calculation ↔ Recommendation | FE coi Run là thực thể riêng (tên, lịch chạy, influencer optimizable, recommendations). BE **không có Run**, chỉ 1 `calculation` nhúng trong model. `operatingConditions` nằm trên model | 🔴 |
| 2 | **Ai được sửa model?** | Khách trả lời 08/10: "mọi user có quyền đều sửa được". op-26 code: **chỉ người tạo** (`notOptimizationModelOwner`) | 🔴 |
| 3 | **Sửa đồng thời / sửa model đang chạy** | Không có optimistic lock (có `revision` nhưng không so). Update **không kiểm tra status**, nên sửa được model đang CALCULATING/COMPLETED | 🔴 |
| 4 | **Model thuộc plant nào?** | Document không có `environmentId`/plant/section. Tên unique **toàn hệ thống** | 🔴 |
| 5 | **Tham chiếu tag chỉ bằng id**, ngưỡng không có đơn vị | Tag bị xóa/đổi đơn vị trong DP là model hỏng hoặc sai mà không ai biết | ⚠️ |
| 6 | **Timeline nhúng trong document** | Mỗi lần sửa/đổi status/chạy thì thêm phần tử vào mảng, không giới hạn | ⚠️ |

Chi tiết bên dưới. Mỗi mục có: **bằng chứng · vì sao nghiêm trọng · đề xuất · ai quyết**.

---

## 1. Run / Calculation / Recommendation chưa có mô hình (🔴)

**Bằng chứng**
- FE `optimization-model-item.component.ts`: `OptimizationRunRow { name, modelName, lastTriggeredAt, frequency, influencers{optimizable,total}, recommendations{total,pending,unread}, failure }`. Tức là **1 model có nhiều run**, mỗi run có tên riêng, lịch chạy, tập influencer được phép tối ưu, và recommendations.
- FE OP-16 proposal: expression dùng cho "Data Exclusions (Step 3), Operating Constraints (Step 4), **run operating conditions and run evaluation**". Nghĩa là điều kiện vận hành có ở **cấp run**.
- BE `DaeOptimizationModelDocument`: `calculation` (1 object), `operatingConditions` (cấp model), `health`, `status`. Không có collection run, không có recommendation.
- Wizard bước 4 FE tên "**Operating Constraints**", BE field tên "**operatingConditions**". Hai từ khác nghĩa (ràng buộc khi tối ưu ≠ điều kiện để chạy).

**Vì sao nghiêm trọng:** đây là xương sống của OP. Nếu run thật sự là thực thể riêng mà BE lưu trong model, thì sau này phải tách collection, migrate model đã tạo, đổi contract với Algorithm, đổi API FE. Credit cũng tính theo run (`RUN_CREDIT_COST`), nên sai chỗ này thì sai luôn chỗ trừ credit.

**Đề xuất:** vẽ ERD trước, xác nhận với khách qua vytth:
```
Model (định nghĩa: goal, influencers, data exclusions, [operating constraints?])
  1 ── n  Run (tên, lịch/frequency, influencer optimizable, operating conditions?, status, credit)
            1 ── n  Execution/Calculation (mỗi lần chạy: requestedAt, result, failure)
                       1 ── n  Recommendation (đề xuất chỉnh influencer, trạng thái pending/accepted)
```
Chốt rõ: operating constraints/conditions thuộc model hay run? `health` thuộc model hay run? Credit trừ khi nào?
**Ai quyết:** anhttl + vytth (hỏi khách), kietnht (BE).

## 2. Quyền sửa model: code trái với câu trả lời của khách (🔴)

**Bằng chứng**
- Matrix 08/10 15:09, vytth chuyển lời khách: *"The System Administrator is responsible for editing and managing the license… còn lại chúng sinh bình đẳng"*. Nghĩa là user bình thường tạo được model, và người khác **sửa được**.
- Trước đó (08/10 09:04) tiennd2: "để tránh rủi ro thì cứ cho Creator có quyền Edit thôi".
- op-26 `updateDraft()`: `if (!Objects.equals(stored.getCreatedBy(), request.getUserId())) → notOptimizationModelOwner`.

**Vì sao nghiêm trọng:** user B mở model của user A, sửa, bấm Save → bị chặn, mà theo khách đây là hành vi hợp lệ. Ngược lại, nếu sau này khách muốn giới hạn (theo asset hoặc role DTE) thì code cũng chưa có khái niệm đó.
**Đề xuất:** bỏ check owner (đúng lời khách). Ghi quyết định vào spec BE kèm nguồn. Hỏi thêm: user chỉ thấy asset được phân quyền (`assets` trong user DTO) thì có được chọn tag ngoài asset của mình không?

## 3. Sửa đồng thời và sửa model đang chạy (🔴)

**Bằng chứng (op-26)**
- `updateDraft()`: đọc `stored`, merge request, `repository.save(document)`, tức là **ghi đè cả document**. `revision = stored.revision + 1`, nhưng request **không mang revision** để so. Mongo document không có `@Version`.
- Timeline: `appendAction(stored.getTimeLine(), ...)` rồi ghi đè. Hai request song song thì mất một action.
- Không kiểm tra `stored.status`. Model CALCULATING/COMPLETED/PAUSED vẫn bị "update draft" mà status giữ nguyên.
- tiennd2 (08/10): "ai Save sau thì lưu của người đó".

**Vì sao nghiêm trọng:** khách cho phép nhiều người cùng sửa (mục 2), nên mất dữ liệu là chuyện **sẽ xảy ra**. Tệ hơn: sửa influencer của model **đang được tính**, nên kết quả Algorithm trả về không còn khớp cấu hình đang lưu. Recommendation áp sai, hậu quả vận hành ở nhà máy.
**Đề xuất:**
- Request mang `revision`. BE update có điều kiện `{_id, revision}` (hoặc `@Version`), lệch thì trả errorId `optimizationModelChanged`, FE báo "model đã bị người khác sửa, tải lại".
- Chỉ cho update khi `DRAFT` (hoặc PAUSED). Model đã tính thì sửa = tạo revision mới + đánh dấu kết quả cũ không còn hiệu lực. Cần định nghĩa rõ.
- Timeline ghi bằng `$push` nguyên tử hoặc collection riêng (mục 6).

## 4. Model không gắn plant/phạm vi (🔴)

**Bằng chứng:** `DaeOptimizationModelDocument` không có `environmentId`/`plantId`/`sectionId`. Unique index `normalizedName` (deleted=false) trên **toàn collection**. Hệ thống gốc có hierarchy Environment (plant) → DomainSection → Asset → Tag (`docs/ai/ARCHITECTURE.md`).
**Vì sao nghiêm trọng:** một cài đặt có nhiều plant/section thì 2 plant không đặt được cùng tên model. Danh sách model/run không lọc được theo plant. Quota license (modelCapacity) không biết tính theo plant hay toàn cài đặt. Thêm field sau = migrate mọi model đã có.
**Đề xuất:** hỏi khách: 1 installation = 1 plant? (AA hiện có "1 root object" `ICL-WPA`). Nếu có thể nhiều plant thì thêm `environmentId` ngay, unique theo `(environmentId, normalizedName)`.

## 5. Tag chỉ lưu id, ngưỡng không có đơn vị (⚠️)

**Bằng chứng:** `DaeOptimizationGoal.targetTagId`, `DaeOptimizationInfluencer.tagId`, `DaeApiOptimizationExpression {operand.tagId, value}`. Không có tên, đơn vị hay measurement type lúc tạo. `verifyTags` chỉ kiểm tra lúc lưu. Tag nằm ở Neo4j (domain), model ở Mongo (optimization), không có ràng buộc giữa hai bên.
**Kịch bản:**
- Ai đó xóa/merge tag trong Digital Plant → model trỏ vào id không còn. Run sau đó lỗi, hoặc Algorithm nhận tag rỗng.
- Đổi đơn vị hiển thị/measurement type của tag (°C → °F) → điều kiện `TI-101 > 80` giữ số 80 nhưng nghĩa đã khác.
- FE expression cần "same unit" nhưng BE không có unit thật của tag (xem Step 3 doc, mục 3).

**Đề xuất:** lưu `unit` (hoặc measurementTypeId + unit) cạnh mỗi ngưỡng. Snapshot tên tag để hiển thị lịch sử. Định nghĩa hành vi khi tag mất: model → status `FAILED` + `statusReason`, hoặc chặn xóa tag đang được dùng (cần domain service hỗ trợ, ngoài scope OP nên phải hỏi).

## 6. Timeline nhúng trong document (⚠️)

**Bằng chứng:** `timeLine.actions[]` nhúng trong `optimizationModel`, mỗi action có `changes: Map<String, {Object oldValue, Object newValue}>`. Mỗi lần update/đổi status đều append (`appendAction`).
**Vì sao:** model chạy theo lịch nhiều tháng thì mảng này phình (Mongo giới hạn 16MB/document). Mỗi lần đọc list model cũng kéo theo toàn bộ lịch sử. `Object oldValue` không có schema, sau này khó query hay hiển thị.
**Đề xuất:** collection riêng `optimizationModelTimeline` (modelId, revision, action…), giống cách license làm `licenseHistory`. Model chỉ giữ `revision` + `updatedAt`.

## 7. Các điểm cấu trúc khác (⚠️/💬)

| # | Vấn đề | Bằng chứng | Đề xuất |
|---|--------|-----------|---------|
| 7.1 | Tên đã xóa bị giữ chỗ vĩnh viễn ở upsert, nhưng create thì không | op-26 `assertNameAvailable` dùng `existsByNormalizedName` (không lọc deleted). Create dùng `...AndDeletedFalse`. Index partial `deleted=false` | Thống nhất một luật |
| 7.2 | Create đặt `CALCULATING` khi chưa có ai tính | `create()` | Thống nhất với upsert (DRAFT), chỉ CALCULATING khi thật sự gửi Algorithm |
| 7.3 | Hai đường tạo model: `create` (đủ, CALCULATING) và `upsert` không id (draft) | nus-base + op-26 | Một đường: upsert draft → `submit`/`publish` riêng |
| 7.4 | Completion "đủ bước" lỏng hơn constraints (chỉ cần conditions không rỗng) | `DaeOptimizationModelCompletion` | Completion dùng chung luật với constraints |
| 7.5 | Không có time window / tần suất dữ liệu trong model, dù khách nói tính trên 1 năm / X tháng | Matrix 07–09/10 | Thêm `trainingWindow` (hoặc tham chiếu config) vào model. Algorithm cần biết |
| 7.6 | `effectDelay` Integer, không đơn vị | DTO | Ghi đơn vị (phút) trong spec + tên field (`effectDelayMinutes`) |
| 7.7 | `improvementCost` không có currency | DTO | Lưu currency hoặc ghi rõ là theo config hệ thống lúc tạo |
| 7.8 | Credit: license (file ký) có `totalCredits`, nhưng `usedCredits` phải lưu ở DB. Chưa có thiết kế ai trừ, trừ khi nào, chống trừ 2 lần | #315, Matrix tuanntg 07/10 | Thiết kế ledger credit (append-only), trừ theo execution id |
| 7.9 | FE wizard state chỉ trong RAM, không có `modelId` | `ModelWizardStateService` | Route `#/models/:id/edit/<step>`: mỗi step load/save qua upsert theo `step`. Phải làm khi nối op-26 |
| 7.10 | Kiểu FE và DTO BE định nghĩa 2 nơi, đã lệch (direction, function, OR, operator `!=`) | walkthrough §3 | Một mapper FE duy nhất + spec BE là nguồn chuẩn |
| 7.11 | Algorithm là repo khác, giao tiếp RabbitMQ (khách 15/09), nhưng chưa có contract message | Matrix | Spec contract (queue, payload = snapshot model + revision, kết quả, timeout, retry) **trước** khi làm Run |

## 8. Những gì cấu trúc đang làm ĐÚNG (giữ nguyên)
- Gateway ghi đè `userId` từ session.
- Soft delete + partial unique index (đúng hướng, chỉ cần thống nhất mục 7.1).
- Kiểm tra tag tồn tại và là `Column` qua domain trước khi lưu.
- `revision` + timeline (đúng ý tưởng audit, chỉ sai chỗ lưu và thiếu lock).
- Upsert theo `step` (op-26): hợp với wizard nhiều bước và lưu draft từng bước.
- FE tách logic thuần (expression, runs query) khỏi UI. Dễ đổi khi BE chốt contract.

## 9. Thứ tự đề xuất
1. **Tuần này, trước khi merge op-26:** chốt mục 2 (quyền), 3 (lock + status), 7.1–7.3 (một luồng tạo). Sửa trong op-26.
2. **Trước khi làm Step 4 / Run:** ERD mục 1 + plant mục 4 + contract Algorithm 7.11, hỏi khách qua vytth.
3. **Trước khi nối FE Save:** spec BE contract (OpenSpec review §3), mapper FE 7.10, route có modelId 7.9.
4. **Trước khi có data khách thật:** đơn vị/snapshot tag (5), timeline tách collection (6), ledger credit (7.8).

## Câu hỏi cho khách (gom để vytth hỏi một lần)
1. Một model có nhiều run không? Run có tên, lịch chạy, tập influencer riêng? Operating constraints thuộc model hay run?
2. Một installation có nhiều plant không? Tên model unique trong plant hay toàn hệ thống?
3. Model đang chạy có được sửa không? Sửa thì kết quả/recommendation cũ xử lý ra sao?
4. Credit trừ theo mỗi lần chạy (execution) hay mỗi run? Chạy lỗi có hoàn credit không?
5. Tag bị xóa/đổi trong Digital Plant thì model xử lý thế nào?
6. Khoảng dữ liệu để tính (1 năm cố định / config / theo model)?
