# Elena OP: việc cần sửa cho team BE

> Gửi: kietnht (BE lead), tuanntg/Brian, tiennd2. Người review: DuongDN. Cập nhật 09/10/2026.
> Code đối chiếu: `nus-base` `a288733a18` + branch `feature/op-26-be-model-run-save-draft-discard-state` (op-26, chưa có PR) + PR #315, #321 (chưa merge nhưng đã deploy test env).
> Phạm vi: chỉ code OP. Phần copy theo pattern sẵn có của repo không tính là duplicate. Không review unit test.

## 0. Bối cảnh nhanh: BE OP gồm những gì

Đọc phần này trước nếu chưa làm BE OP.

**Luồng một request "tạo model":**
```
FE (optimization-ui)
  → Gateway  POST /optimization/models/create   (GW/...external, ghi đè userId theo session)
    → RSocket → microservices-optimization
        Controller → Control (DaeOptimizationModelControl: logic chính)
                   → Constraints (DaeOptimizationModelConstraints: validate)
                   → gọi domain service kiểm tra tag có tồn tại (Neo4j)
                   → Repository → MongoDB collection `optimizationModel`
```

**Các phần code BE OP:**

| Phần | Ở đâu | Trạng thái |
|------|-------|-----------|
| Service `microservices-optimization` (create model) | commit `4acdfda072` (Brian, 06/10) | đã vào nus-base, **commit thẳng, không qua PR** |
| Upsert/draft theo từng step của wizard | branch op-26 | chưa có PR |
| License đa module (Monitoring + OP) | PR #315 | mở, đã deploy test env |
| API `POST /model/tags/details` (lấy unit, icon, asset của tag) | PR #321 | mở, đã deploy test env |

**Khái niệm cần biết:**
- **Model:** cấu hình tối ưu do user tạo qua wizard 4 bước: Goal (tag mục tiêu + hướng tăng/giảm), Influencers (các tag ảnh hưởng), Data Exclusions (loại bỏ dữ liệu xấu), Operating Constraints.
- **Run / Calculation:** lần chạy thuật toán (Algorithm, repo khác, giao tiếp qua RabbitMQ) trên model để ra **Recommendation** (gợi ý chỉnh influencer).
- **errorId:** BE không trả message lỗi tự do mà trả mã (`DaeApiUserDisplayedErrorId`), FE dịch mã ra text.
- **Changelog migration:** repo có 2 loại file migration Mongo, một cho cài mới (`db.changelog-new-customer.yaml`), một cho khách đang chạy nâng cấp (`db.changelog-existing-customer-<version>.yaml`).

Các mục 🔴 là những lỗi **khách đã từng bắt sửa** trong các PR trước (có trích câu của khách).

## Tóm tắt

| # | Việc | Mức | Khi nào |
|---|------|-----|---------|
| 1 | Bỏ `assert`, ném exception tường minh | 🔴 | Ngay (đang gây lỗi trên test env) |
| 2 | Migration cho khách đang chạy | 🔴 | Trước khi deliver |
| 3 | Bỏ check "chỉ người tạo được sửa" (op-26) | 🔴 | Trước khi merge op-26 |
| 4 | Chống sửa đồng thời + chặn sửa model đang chạy | 🔴 | Trước khi merge op-26 |
| 5 | Viết spec BE cho contract model | 🔴 | Trước khi FE nối Save/Create |
| 6 | Mọi code BE OP qua PR trước khi deploy | 🔴 | Từ nay |
| 7 | Status ban đầu + một luồng tạo model | ⚠️ | Trong op-26 |
| 8 | Update phía DB, không load-merge-save | ⚠️ | Trong op-26 |
| 9 | Log giữ stack trace | ⚠️ | PR tới |
| 10 | #315: dùng enum thay chuỗi module | ⚠️ | Trước khi merge #315 |
| 11 | #321: bỏ class 1 field, bỏ thay đổi không liên quan | ⚠️ | Trước khi merge #321 |
| 12 | Khớp contract với FE | ⚠️ | Cùng mục 5 |
| 13 | Dọn code lặp, code chưa dùng | 💬 | Khi tiện |
| 14 | Quyết định nền tảng cần chốt với khách | 🔴 | Trước khi làm Step 4 / Run |

---

## 1. Validate bằng `assert` 🔴

**Giải thích:** trong Java, lệnh `assert điều_kiện : message` chỉ chạy khi JVM bật cờ `-ea`. Mặc định cờ này **tắt**, nên mọi `assert` bị bỏ qua hoàn toàn: dữ liệu sai vẫn được lưu mà không báo lỗi.

**Đã kiểm chứng trên test env:** gửi `improvement = 999` (luật là 0–20) vẫn tạo model thành công. Test env không bật `-ea`.

**Khách từng nói:** *"do not use asserts (they are turned off by default) you have to raise exception and log here"* (PR 4533). *"Assertions are commonly disabled in production"* (Kfir, PR 4563).

**Chỗ cần sửa:**
- `DaeOptimizationModelConstraints`: 22 `assert`
- op-26: thêm 19
- #315: 2, #321: 1

**Cách sửa:** viết helper, ví dụ `requireThat(boolean condition, DaeApiUserDisplayedErrorId errorId)`, ném exception mang errorId và log. Thay toàn bộ `assert` trong code OP. Không đụng code cũ ngoài OP.

- [ ] Xong

## 2. Migration chỉ có cho khách mới 🔴

**Giải thích:** khi cài mới, hệ thống chạy `db.changelog-new-customer.yaml`. Khách **đang chạy** khi nâng cấp chỉ chạy các file `db.changelog-existing-customer-<version>.yaml`. Code OP chỉ thêm changeSet `create-optimization-model-collection` (tạo collection + unique index tên model) vào file new-customer.

**Hậu quả:** khách hiện tại nâng cấp lên bản có OP sẽ **không có unique index**, nên 2 người tạo model cùng tên cùng lúc sẽ ra 2 model trùng tên (chống trùng đang dựa vào index này).

**Khách từng giải thích:** *"When we are installing on new customer, it runs only the migration for new customer and after that version it will run future existing customer"* (Kfir, PR 4509).

**Cách sửa:** thêm changeSet tương ứng vào file existing-customer của version hiện tại.

- [ ] Xong

## 3. Quyền sửa model trái với lời khách 🔴

**Giải thích:** op-26 `updateDraft()` có đoạn: nếu `createdBy` khác user hiện tại thì trả lỗi `notOptimizationModelOwner`, tức là **chỉ người tạo được sửa**.

**Khách trả lời (vytth chuyển, Matrix 08/10 15:09):** chỉ System Administrator quản lý license, *"còn lại chúng sinh bình đẳng"*, nghĩa là mọi user có quyền đều sửa được model của người khác.

**Cách sửa:** bỏ check owner. Ghi quyết định này vào spec BE kèm nguồn (mục 5).

- [ ] Xong

## 4. Sửa đồng thời và sửa model đang chạy 🔴

**Giải thích:** vì ai cũng sửa được (mục 3), 2 người có thể mở cùng một model.
- op-26 đọc document → merge request → `save()` **ghi đè cả document**. Có tăng `revision` nhưng request không gửi `revision` lên để so, nên người lưu sau xóa mất thay đổi của người lưu trước mà không ai biết (gọi là "lost update").
- Timeline cũng bị ghi đè cùng document, nên 2 request song song thì mất một dòng lịch sử.
- Không kiểm tra status: model đang `CALCULATING` hay `COMPLETED` vẫn sửa được. Kết quả Algorithm trả về sẽ không còn khớp cấu hình đang lưu, recommendation áp sai ở nhà máy.

**Cách sửa:**
- Request mang `revision`. Update có điều kiện `{_id, revision}` (hoặc dùng `@Version`). Lệch thì trả errorId mới, ví dụ `optimizationModelChanged`, FE báo "model đã bị người khác sửa, tải lại".
- Chỉ cho update khi model ở `DRAFT` (hoặc `PAUSED`). Cần chốt: sửa model đã chạy thì xử lý thế nào.
- Timeline ghi bằng `$push` (xem mục 8).

- [ ] Optimistic lock
- [ ] Kiểm tra status khi update

## 5. Không có spec BE cho contract 🔴

**Giải thích:** dự án dùng OpenSpec. Quy tắc trong `openspec/config.yaml`: API contract **chỉ được mô tả ở root BE** (`openspec/`). Hiện root này **rỗng**, dù BE đã có create, upsert, license, tag details. FE design (op-13, op-16) phải tự đọc code BE để mô tả lại, và đã lệch (mục 12).

**Cách sửa:** tạo `openspec/changes/op-xx-optimization-model/` mô tả contract **đang có** (capture baseline từ code):
- request/response của create và upsert
- errorId của từng luật validate, ngưỡng (improvement 0–20, cost 1.000–10.000.000, tên ≤100)
- vòng đời status
- đơn vị của `effectDelay` (phút?), operator/function hỗ trợ

FE sẽ tham chiếu capability này thay vì ghi `UNKNOWN`. Kiểm tra bằng `npx @fission-ai/openspec@1.13.2 validate --all --strict`.

- [ ] Xong

## 6. Code BE OP chưa qua review 🔴

**Giải thích:** `4acdfda072` vào thẳng nus-base không qua PR. op-26 chưa có PR. #315, #321 chưa merge nhưng đã chạy trên test env. Tức là QC đang test code chưa ai review.

**Cách làm:** mọi thay đổi BE OP mở PR vào `nus-base`, có người BE khác review, rồi mới deploy test env. op-26 nên lên PR sớm vì có mục 3, 4, 7, 8.

- [ ] op-26 lên PR

## 7. Status ban đầu và hai đường tạo model ⚠️

**Giải thích:**
- `create()` đặt status `CALCULATING` ngay khi tạo, dù chưa có gì gửi sang Algorithm. Model sẽ hiện "đang tính" mãi.
- Hiện có 2 đường tạo: `create` (đủ thông tin, CALCULATING) và `upsert` không id (op-26, tạo draft). Hai luật khác nhau, ví dụ upsert check trùng tên **kể cả model đã xóa**, còn create thì không.
- `DaeOptimizationModelCompletion.isConditionSetValid` có luật "hợp lệ" riêng, lỏng hơn Constraints.

**Cách sửa:** một luồng duy nhất: upsert tạo/sửa draft → endpoint submit riêng mới chuyển sang trạng thái chạy. Thống nhất luật trùng tên. Completion gọi lại Constraints (chế độ không ném lỗi).

- [ ] Xong

## 8. Load-merge-save trong Java ⚠️

**Khách từng nói:** *"Try to update investigation on the db side. Handle object on the java side is not a good solution"* (PR 4435).

**Chỗ:** op-26 `updateDraft`: `findById` → `applySections` → `repository.save(document)`.

**Cách sửa:** `ReactiveMongoTemplate.updateFirst(Query(_id, revision), Update.set(<section>).push(timeline))`. Làm cùng lúc giải quyết luôn lock ở mục 4.

- [ ] Xong

## 9. Log mất stack trace ⚠️

**Khách từng nói:** *"to keep full stack trace - remove getMessage and keep just error"* (PR 4533).

**Chỗ:** `DaeOptimizationModelControl:142` (và 1 chỗ ở op-26): `log.warn("Optimization model create failed: {}", e.getMessage())`.

**Cách sửa:** `log.warn("Optimization model create failed", e)`.

- [ ] Xong

## 10. #315: so chuỗi thay vì enum ⚠️

**Giải thích:** #315 cho license bật nhiều module. Code so chuỗi `"MONITORING"`, `"OPTIMIZATION"`, `"OP"`, `"MONITOR"` ở 12 chỗ, viết lại ở cả `LicenseController` (tạo) và `DaeLicenseStatusTools` (đọc), dù đã có `DaeLicensedModuleType`.

**Khách từng nói:** *"instead of hardcoded strings use the enum constants"* (PR 4607).

**Cách sửa:** parse một chỗ qua `DaeLicensedModuleType` (alias OP/MONITOR xử lý trong enum).

- [ ] Xong

## 11. #321: class 1 field và thay đổi không liên quan ⚠️

- `DaeTagDetailsRequest` chỉ có 1 field. Khách: *"No need to create one-field class"* (PR 4428). Dùng `DaeApiCollection<String>` hoặc `List<String>` như endpoint khác.
- PR sửa cả `DaeApiSearchController` (chỉ thêm import thừa) và `reference.conf` (config của phần đã rút khỏi PR). Khách: *"why changes from another PR presented here?"* (PR 4435). Bỏ ra.
- Search yêu cầu ≥3 ký tự. FE đang cho 2, đã báo FE sửa theo BE.

- [ ] Xong

## 12. Contract lệch với FE ⚠️

FE gửi lên sẽ bị từ chối hoặc lưu sai. Chốt bên nào đổi, ghi vào spec (mục 5):

| Field | FE | BE |
|-------|----|----|
| direction | `min` / `max` | `MINIMIZE` / `MAXIMIZE` |
| Cost bỏ trống | gửi `0` | yêu cầu 1.000–10.000.000 |
| Hàm expression | có `MEAN`, `DIFF`, `PROP` | không có |
| Logical operator | `AND`, `OR` | chỉ `AND` |

Ngoài ra lỗi trả về FE đang lộ message Java thô (lỗi NPE/Jackson rơi vào `reason`). Lỗi không phải nghiệp vụ nên trả errorId chung.

- [ ] Xong

## 13. Code lặp và code chưa dùng 💬

| Chỗ | Đề xuất |
|-----|---------|
| `create()` gom tagId từ dataExclusions + operatingConditions, `validateCreate()` duyệt lại đúng danh sách đó | Một hàm `conditionSets(request)` dùng chung |
| `create()` là chuỗi Reactor ~100 dòng | Tách `buildDocument()`, `referencedTagIds()` |
| Timeline action builder lặp 2 lần | Factory `timelineAction(type, ...)` |
| `normalizedName` tính 2 lần | Tính một lần |
| `DaeAmqpMessageSender`, `DaeRabbitMQConfig` chưa ai gọi (bước gửi Algorithm còn TODO) nhưng service vẫn phải kết nối RabbitMQ khi khởi động | Bỏ, hoặc ghi chú chuẩn bị cho bước Algorithm |
| `findTagsByIds` gọi domain với mọi tag, không giới hạn số lượng | Giới hạn số tag trong request |
| #321 `toPrimitiveBytes(Byte[])` tự viết | Kiểm tra `libraries/tools` đã có chưa |

## 14. Quyết định nền tảng cần chốt trước khi làm tiếp 🔴

Đây là data model. Sai bây giờ thì sau phải migrate dữ liệu khách, sửa cả FE + BE + Algorithm. Không cần code ngay, nhưng **phải chốt (qua vytth/anhttl) trước khi làm Step 4 hoặc Run**:

1. **Run nằm ở đâu?** FE coi Run là thực thể riêng (1 model có nhiều run, mỗi run có tên, lịch chạy, influencer, recommendations). BE chỉ có 1 `calculation` nhúng trong model. Đề xuất vẽ ERD Model 1–n Run 1–n Execution 1–n Recommendation rồi xác nhận với khách. Credit tính theo run nên sai chỗ này là sai luôn chỗ trừ credit.
2. **Model thuộc plant nào?** Document không có `environmentId`. Tên unique toàn hệ thống, nên 2 plant không đặt được cùng tên. Nếu có thể nhiều plant thì thêm field ngay, unique theo `(environmentId, normalizedName)`.
3. **Tag chỉ lưu id, ngưỡng không có đơn vị.** Tag bị xóa trong Digital Plant thì model trỏ vào id không còn. Tag đổi đơn vị (°C → °F) thì điều kiện `> 80` đổi nghĩa. Đề xuất lưu `unit` cạnh ngưỡng và định nghĩa hành vi khi tag mất.
4. **Timeline nhúng trong document.** Mảng tăng mãi theo mỗi lần sửa/chạy (Mongo giới hạn 16MB/document), đọc list model kéo theo cả lịch sử. Đề xuất collection riêng `optimizationModelTimeline`, giống `licenseHistory`.
5. **Contract với Algorithm** (queue, payload, kết quả, timeout, retry) chưa có. Spec trước khi làm Run.
6. Các field thiếu đơn vị: `effectDelay` (đề xuất `effectDelayMinutes`), `improvementCost` (currency).

Chi tiết từng mục: [elena-op-foundation-structure-review.md](elena-op-foundation-structure-review.md).

---

## Những gì đang làm tốt (giữ nguyên)
- Layering đúng pattern repo: Controller → Control → Constraints → Repository → Mapper, giống `microservices-license`.
- Gateway ghi đè `userId` theo session, client không giả mạo được.
- Soft delete + partial unique index tên model, bắt `DuplicateKeyException` trả errorId.
- Kiểm tra tag tồn tại và là `Column` qua domain service trước khi lưu.
- Upsert theo `step` (op-26) hợp với wizard nhiều bước.
- Có `revision` và timeline: đúng ý tưởng audit, chỉ cần sửa cách lưu và thêm lock.
