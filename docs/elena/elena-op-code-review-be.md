# Elena OP — Code review BE (optimization + phần BE OP đã làm)

> Phạm vi: BE OP trên `nus-base` (`a288733a18`, 09/10) + các branch BE **đang chạy trên test env nhưng chưa merge**.
> Trọng tâm: **duplicate · structure · follow spec**. FE: [elena-op-code-review-fe.md](elena-op-code-review-fe.md) · OpenSpec: [elena-op-openspec-review.md](elena-op-openspec-review.md) · lỗi runtime: [review đã deploy](elena-op-deployed-code-review.md)

## Phạm vi code BE OP

| Mảng | Ở đâu | Trạng thái | Qua PR/review? |
|------|-------|-----------|----------------|
| Service mới `microservices-optimization` (31 file main, 1.176 dòng test) + gateway `POST /optimization/models/create` + lib `optimization-api` | `4acdfda072` Brian 06/10 | merged nus-base | ❌ **commit thẳng, không PR** |
| Upsert/draft theo step (`/optimization/models/upsert`, `DaeOptimizationModelCompletion`) | branch `feature/op-26-be-model-run-save-draft-discard-state` | chưa PR | ❌ |
| License đa module | PR #315 (Brian) | mở, **đã deploy test env** | đang review (❌ 2 lỗi 🔴 chưa sửa) |
| Tag details `POST /model/tags/details` | PR #321 (tiennd2) | mở, **đã deploy test env** | đang review |

Mọi BE OP đang chạy trên test env đều **chưa qua review được merge**. Đây là vấn đề quy trình lớn nhất.

> **Phạm vi review (user 09/10):** clone (theo quy ước "Cloned components") **không tính là duplicate**, vì đã thống nhất với khách. Dự án fixed-cost: chỉ review code OP của mình, không đề xuất sửa phần khác của repo (portal, admin, service khác, pattern chung).

## Tóm tắt

| Mảng | Đánh giá | Ý chính |
|------|----------|---------|
| Duplicate | 🟡 | Khung service theo pattern repo (không tính). Lặp nội bộ: duyệt condition set ở 2 nơi, 2 định nghĩa "hợp lệ" ở op-26. Có code RabbitMQ copy sang mà **chưa dùng** |
| Structure | 🟢/🟡 | Đúng pattern Controller → Control → Constraints → Repository → Mapper. `create()` là một lambda dài khoảng 100 dòng |
| Follow spec | 🔴 | **Root BE `openspec/` không có spec hay change nào** cho optimization model, tag details, license đa module (đã merge/đang chạy). Trái rule "API contract chỉ được spec ở backend root" |
| Test | 🟢 | Có test cho control, constraints, gateway control |

## 1. Duplicate code

### 1.1 Code copy sang mà chưa dùng (💬 YAGNI)
- `common/external_services/queue/DaeAmqpMessageSender.java`, `common/configuration/queue/DaeRabbitMQConfig.java`: không ai gọi, vì bước gửi algorithm còn TODO. Service vẫn phải kết nối RabbitMQ lúc khởi động. Bỏ đi, hoặc ghi chú là chuẩn bị cho bước algorithm.
- Phần khung còn lại (RSocket client, Mongo convertors) copy theo pattern sẵn có của repo, nên không tính.

### 1.2 Lặp logic trong service
| Chỗ | Trùng | Đề xuất |
|-----|-------|---------|
| `DaeOptimizationModelControl.create()` gom tagId từ dataExclusions + operatingConditions ↔ `DaeOptimizationModelConstraints.validateCreate()` duyệt lại đúng danh sách conditionSets theo cùng thứ tự | khoảng 20 dòng, cùng thứ tự "data exclusions trước, operating sau" | Một hàm `conditionSets(request)` + `referencedTagIds(request)` dùng chung |
| Timeline action builder lặp 2 lần trong `create()` (CREATED, STATUS_UPDATED) | | Factory `timelineAction(type, ...)` |
| Branch op-26: `validateCreate`, `validateUpsert`, `validateMerged` + `DaeOptimizationModelCompletion.isConditionSetValid` | 2 bộ luật "condition set hợp lệ" (constraints chặt, completion lỏng) | Completion nên gọi lại constraints (chế độ không ném lỗi), tránh 2 định nghĩa "hợp lệ" |
| `normalizedName = name.toLowerCase(Locale.ROOT)` tính 2 lần trong `create()` | | Tính một lần |

### 1.3 Ngoài optimization service
- **#315 license:** logic "module nào được bật" viết lại ở cả `tools/licensing/LicenseController` (tạo) và `DaeLicenseStatusTools` (đọc), với alias khác nhau (`OP`/`OPTIMIZATION`, `MONITOR`/`MONITORING`). Đề xuất parse qua `DaeLicensedModuleType` ở một chỗ.
- **#321 tag details:** `toPrimitiveBytes(Byte[])` tự viết, kiểm tra xem `libraries/tools` đã có chưa.

## 2. Structure

**Tốt:**
- Đúng layering repo: gateway mỏng (`GW/...external` + `business/control`), service có `external` (controller RSocket) / `business/control` / `constraints` / `database/{models,repository}` / `mappers`. Cấu trúc giống `microservices-license`, nhất quán.
- Gateway **ghi đè userId bằng user của session**, client không giả mạo được.
- Unique index `normalizedName` + `deleted=false` (partial) để chống tạo trùng đồng thời, bắt `DuplicateKeyException` → errorId.
- Kiểm tra tag tồn tại + là `Column` qua domain service trước khi lưu.
- Có "extension point" comment rõ cho license check và publish calculation.

**Cần xem lại:**
| # | Vấn đề | Chỗ | Mức |
|---|--------|-----|-----|
| B1 | **Validate nghiệp vụ bằng `assert`**: phụ thuộc cờ JVM `-ea`. Test env đang **không** bật (đã kiểm chứng, review H) | `DaeOptimizationModelConstraints` | 🔴 |
| B2 | `create()` là một chuỗi Reactor + lambda khoảng 100 dòng (validate, check tên, gom tag, gọi domain, build document, timeline, save) | `DaeOptimizationModelControl.create()` | ⚠️ tách hàm `buildDocument()`, `referencedTagIds()` |
| B3 | Lỗi ném `AssertionError(enum.name())` trong `Mono.flatMap`, nên lỗi khác (NPE, Jackson) rơi ra `reason` thô | control + gateway | ⚠️ (review J) |
| B4 | Migration index chỉ ở `db.changelog-new-customer.yaml`. Khách đang chạy có được tạo index không? | `libraries/migration` | ⚠️ cần xác nhận |
| B5 | `findTagsByIds` gọi domain với **mọi** tag (target + influencer + expression), không giới hạn số lượng | control | 💬 |
| B6 | Status đặt cứng `CALCULATING` khi create dù chưa có ai tính, nên model sẽ "đang tính" mãi | control | ⚠️ nên là `DRAFT`/`READY` đến khi gửi algorithm |
| B7 | Logical operator: chỉ nhận AND, FE có OR | constraints | ⚠️ chốt nghiệp vụ |
| B8 | Không có endpoint đọc (get/list/delete) model, nên FE Manage Models (#328) không nối được | | ⚠️ (đã biết, chưa có ticket?) |

## 3. Follow spec

| Kiểm tra | Kết quả |
|----------|---------|
| Root `openspec/` (BE) | `specs/` **rỗng**, `changes/` chỉ có `archive/` rỗng. `openspec validate --all` → "No items found" |
| Optimization model create/upsert | ❌ **không có spec BE**. Contract chỉ thấy gián tiếp qua FE design op-13/op-16 ("contract on nus-base commit 4acdfda072", "`backend:op-13-...` to be opened") |
| Tag details (#321) | ✅ có change trong PR, nhưng chưa merge, và archive một change đã rút (xem review PR) |
| License đa module (#315) | ✅ có change trong PR (đường dẫn capability lồng `license/<sub>`) |
| FE nhắc tới `backend:op-13-optimization-goal-step`, `backend:op-16-expression-builder` | ❌ không tồn tại |

**Hệ quả:** không có chỗ để đối chiếu "code BE đúng chưa". Ngưỡng (improvement 0–20, cost 1.000–10.000.000, tên ≤100, effectDelay) hiện chỉ nằm trong code `DaeOptimizationModelConstraints` và trong design FE. Hai bên có thể lệch mà không ai biết (đã lệch: direction, function MEAN/DIFF/PROP, OR).
**Đề xuất:** Brian/kietnht viết `openspec/changes/op-xx-optimization-model/` mô tả **contract hiện có** (capture baseline từ code, đúng rule "capture the current behaviour as the baseline"). Gồm request/response, errorId từng luật, status lifecycle. FE tham chiếu capability id này.

## 4. Đề xuất ưu tiên (BE)
1. **Quy trình:** mọi BE OP đi qua PR + review trước khi deploy test env (`4acdfda072`, op-26, #315, #321 đều chưa).
2. Spec BE cho optimization model (baseline + upsert/draft) **trước khi** FE nối Save/Create.
3. Bỏ `assert` cho validate nghiệp vụ (đổi thành throw tường minh), hoặc bắt buộc `-ea` + health check.
4. Tách `create()` thành các hàm nhỏ. Gom duyệt condition set một chỗ, dùng chung cho create/upsert/completion.
5. Bỏ hoặc ghi chú phần RabbitMQ chưa dùng.

## Câu hỏi chưa giải quyết
- Ai review/duyệt commit `4acdfda072` trước khi vào nus-base?
- op-26 khi nào lên PR, có spec BE kèm không?
- Status ban đầu của model nên là gì khi chưa có algorithm?
