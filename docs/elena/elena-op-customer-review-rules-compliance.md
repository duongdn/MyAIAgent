# Elena OP — Đối chiếu quy tắc review của khách (Precognize)

> **Nguồn:** 811 comment review của khách trên **317 PR của NUS** ở repo khách `Precognize/development` (07/2025 → 10/2026). Kéo bằng account GitHub `nusken`. Reviewer: majdhajjo08 (226), katyachernov (160), Vladimir-precog (140), mahkris (96), KfirBernsteinSamson (56), DmitriySel (28), DanielGavrilkin (26), lena-precog (15). Kèm feedback khách qua Matrix (room Elena - Optimization / Digital Plant).
> **Đối chiếu với:** code OP trên `nus-base` `a288733a18` + các branch BE OP đang chạy trên test env (#315 OP-25, #321 OP-22, op-26). Cập nhật 2026-10-09.
> **Bối cảnh:** optimization-ui hiện mới là bản nội bộ, chưa giao cho khách. Khi `deliver-to-origin.sh` đẩy sang `Precognize/development`, các reviewer trên sẽ review lại. Mọi vi phạm dưới đây **sẽ bị bắt sửa**, tốn effort không tính tiền (fixed-cost).
> Bỏ qua: clone (đã thống nhất với khách), unit test, pattern chung của repo (vd `import static ...ErrorId.*` có ở 43 file).

## Tóm tắt

| # | Quy tắc khách | Vi phạm trong code OP? | Mức |
|---|---------------|------------------------|-----|
| B1 | **Không dùng `assert` để validate** ("turned off by default, raise exception and log") | ✅ **Vi phạm nặng**: 22 assert ở optimization service, +19 ở op-26, +2 ở #315, +1 ở #321. Test env đang chạy không có `-ea` | 🔴 |
| B2 | Log lỗi giữ stack trace, không `e.getMessage()` | ✅ `DaeOptimizationModelControl:142` (+1 ở op-26) | ⚠️ |
| B3 | Cập nhật ở phía DB, không load về Java sửa rồi save | ✅ op-26 `updateDraft` load → merge → `save` toàn document + timeline | ⚠️ |
| B4 | Migration: phải có cho **cả new-customer và existing-customer** | ✅ Collection/index `optimizationModel` chỉ có ở `db.changelog-new-customer.yaml` | 🔴 |
| B5 | Không tạo class 1 field | ✅ `DaeTagDetailsRequest { List<String> tagIds }` (#321) | 💬 |
| B6 | Không magic string, dùng enum/constant | ✅ #315: 12 chỗ `"MONITORING"/"OPTIMIZATION"/"OP"/"MONITOR"` dù đã có `DaeLicensedModuleType` | ⚠️ |
| B7 | Không đưa thay đổi không liên quan vào PR | ✅ #321 sửa `DaeApiSearchController` (chỉ thêm import thừa) + `reference.conf` (config của phần đã rút) | ⚠️ |
| B8 | Dùng exchange/queue có sẵn, khai báo trong `docker/.../rabbitConfig`, không tạo queue mới vô cớ | 🟡 optimization copy `DaeRabbitMQConfig` + `DaeAmqpMessageSender` nhưng chưa dùng, chưa khai báo trong rabbitConfig | 💬 |
| F1 | **Mọi text trong template phải qua translate** | ✅ **Vi phạm**: Runs page, table header, recommendations button, filter labels, aria-label hardcode tiếng Anh | 🔴 |
| F2 | **Không để mock trong code** ("Why is MOCK_USERS_RESPONSE needed?") | ✅ `shared/mocks/optimization-mock-data.ts`, `optimization-runs.sample-data.ts` (461 dòng), `OptimizationModelService` mock | 🔴 (khi deliver) |
| F3 | **Date format lấy từ configuration**, không hardcode | ✅ `optimization-model-item.component.ts:62` `DATE_TIME_FORMAT = 'MM/dd/yyyy HH:mm'` | ⚠️ |
| F4 | Status/text/icon lấy từ API, không hardcode | ✅ `OptimizationTagType = 'speed' \| 'pressure' \| …` hardcode loại đo, trong khi BE có measurement type + icon | ⚠️ |
| F5 | Không tạo nhiều interface giống nhau với tên khác | ✅ 6 kiểu cho "tag": `OptimizationTagOption`, `OptimizationTargetTag`, `OptimizationTagDetail`, `ExpressionTag`, `RunTag`, `WizardInfluencer.tag` | ⚠️ |
| F6 | Không gọi function trong template (dùng `functionCallPipe`) | ✅ khoảng 20 chỗ: `isMissingAsset(influencer)`, `isTagIconLoading(...)`, `costOrderError()`, `orderError(delay)`, `isVisible(group)`... | ⚠️ |
| F7 | Enum thay cho chuỗi trạng thái (`'completed'`, `'failed'`…) | 🟡 dùng union string type (`OptimizationStatus`), khách từng yêu cầu Enum (#4454, #4539) | 💬 |
| F8 | Có type rõ ràng, không `any` | 🟡 4 chỗ `any` (`app.module.ts:24`, `initialize-optimization-header.ts:75`, interceptor). `unknown` dùng có kiểm tra (OK) | 💬 |
| F9 | Không gọi API trùng lặp ("bên họ nhạy cảm vấn đề duplicate API calls", anhttl 09/09) | 🟢 license đọc 1 lần/navigation, tag details theo lô. OK | ✅ |
| F10 | Ưu tiên standalone component | 🟢 OP toàn standalone | ✅ |
| F11 | Không console.log, không code comment-out, không comment thừa | 🟢 không console.log. Comment mức vừa (301/7.111 dòng ts), chủ yếu giải thích "vì sao" | ✅ |

## Chi tiết (BE)

### B1. `assert` cho validate (🔴)
- **Khách nói:** *"do not use asserts (they are turned off by default) you have to raise exception and log here"* (katyachernov, PR 4533, 2025-11-20). *"Please avoid using `assert` for input validation / business rules… Assertions are commonly disabled in production"* (Kfir, PR 4563, 2025-12-11). *"the assert false may be ignored in prod → silent…"* (PR 4621, 2026-01-13).
- Một comment cũ hơn (DmitriySel, PR 4446, 2025-10) có nói "please use assert and error display message". Nhưng **các comment mới hơn của 2 reviewer chính đều cấm**, nên theo cái mới.
- **Code OP:** `DaeOptimizationModelConstraints` gần như toàn bộ là `assert ... : errorId`. op-26 thêm 19 dòng. Test env đã chứng minh hậu quả (improvement 999 lọt qua, review H).
- **Sửa:** helper `requireThat(boolean, DaeApiUserDisplayedErrorId)` ném exception + log, thay toàn bộ assert trong code OP (không đụng code cũ của repo).

### B2. Log mất stack trace (⚠️)
- **Khách:** *"to keep full stack trace - remove getMessage and keep just error"* (PR 4533).
- **Code:** `.doOnError(e -> log.warn("Optimization model create failed: {}", e.getMessage()))`. Sửa thành `log.warn("...", e)`.
- Khách cũng muốn **1 info log/request** (PR 4564, 4567). OP đang có `doOnSuccess log.info` 1 dòng, OK.

### B3. Load-merge-save trong Java (⚠️)
- **Khách:** *"Try to update investigation on the db side. Handle object on the java side is not a good solution"* (PR 4435). *"Do not load all events to the memory. Do filtering on DB side"* (PR 4564).
- **Code op-26:** `updateDraft` `findById` → `applySections` → `repository.save(document)` (ghi đè cả document, kèm timeline). Trùng với vấn đề lost-update ở [foundation review §3](elena-op-foundation-structure-review.md).
- **Sửa:** `ReactiveMongoTemplate.updateFirst` với `Query(_id, revision)` + `Update.set(section)` + `push(timeline)`.

### B4. Migration chỉ cho khách mới (🔴)
- **Khách giải thích:** *"When we are installing on new customer, it runs only the migration for new customer and after that version it will run future existing customer"* (Kfir, PR 4509). Khách đã nhiều lần hỏi "do we need migration for a new customer?" (PR 4641).
- **Code:** changeSet `create-optimization-model-collection` chỉ trong `db.changelog-new-customer.yaml`. **Khách đang chạy nâng cấp lên bản có OP sẽ không có collection, không có unique index**, nên chống trùng tên dựa vào index sẽ không hoạt động.
- **Sửa:** thêm changeSet tương ứng vào `db.changelog-existing-customer-<version>.yaml`.

### B5–B8
- **B5:** `DaeTagDetailsRequest` một field. Khách: *"Why do you create one-field class?"* (PR 4157), *"No need to create one-field class"* (PR 4428). Dùng `DaeApiCollection<String>` hoặc `List<String>` như các endpoint khác.
- **B6:** #315 so chuỗi `"OPTIMIZATION".equalsIgnoreCase(m) || "OP"...` ở nhiều nơi. Khách: *"instead of hardcoded strings use the enum constants"* (PR 4607), *"define constants instead of magic numbers"* (PR 4747).
- **B7:** khách: *"why changes from another PR presented here?"* (PR 4435), *"please move formatting changes to develop"* (PR 4553).
- **B8:** khách: *"on this task new exchange is not needed please use precog.domain.model.changeLog"* (PR 4428), *"you need to define values: docker/application/rabbitMQ/rabbitConfig/02-application.json"* (PR 4157). Khi làm bước gửi Algorithm phải hỏi khách exchange nào trước.

## Chi tiết (FE)

### F1. Text không qua translate (🔴)
- **Khách:** *"We use translation pipe for all kinds of texts in templates"*, *"please use translate"*, *"add translate for Delete"* (DanielGavrilkin, PR 4454, 2025-10-09).
- **Code (nus-base):**
  - `features/optimization-runs/optimization-runs-page.component.html:80,89,95`: "No optimization runs match the selected filters", "No Optimization Runs Available", "New Run"
  - `shared/components/table-actions-header/table-actions-header.component.html:22,36,51,76`: "Suspend Selected Runs", "Manage Models", "Sort by", "Filters"
  - `shared/components/recommendations-button/recommendations-button.component.html:10`: "Recommendations"
  - `features/optimization-runs/optimization-runs.filters.ts:29-31`: label filter
  - `aria-label` ở pagination, sort-menu, tag-picker, app.component
  - PR #325: `pauseLabel` trả `'Pause Run' : 'Pause'`, tooltip `text="Run Now"`
- Wizard (Goal/Influencers) thì **đã dùng translate đúng**. Lỗi tập trung ở phần Runs/shared components làm trước.

### F2. Mock trong code (🔴 trước khi deliver)
- **Khách:** *"Why is MOCK_USERS_RESPONSE needed?"*, *"I see that you removed the mocks here too"* (Vladimir-precog, PR 4539).
- **Code:** `shared/mocks/optimization-mock-data.ts` (tên "mock error", "mock save error"), `features/optimization-runs/optimization-runs.sample-data.ts`, `OptimizationModelService` (check tên, save draft), PR #325/#328 thêm mock run/model.
- **Sửa:** đây là điều kiện **chặn deliver**. Phải nối API thật, hoặc tách mock ra file dev-only không đi vào delivery.

### F3. Date format hardcode (⚠️)
- **Khách:** *"we definitely need to use format from configuration (on both places)"*, *"Why date format is passed here? We usually use default format from configuration service"* (PR 4750, 2026-03-03). anhttl nhắc lại trong room 07/10.
- **Code:** `shared/components/optimization-model-item/optimization-model-item.component.ts:62` `const DATE_TIME_FORMAT = 'MM/dd/yyyy HH:mm'`. Fallback `'MM/DD/YYYY HH:mm'` ở `optimization-header-date.service.ts:35` (fallback thì chấp nhận được).

### F4. Hardcode loại đo (⚠️)
- **Khách/anhttl (29/07):** *"status đang hardcode text, icon… update API để text, icon lấy từ API thay vì hardcode"*.
- **Code:** `optimization-model-item.component.ts:17` `OptimizationTagType = 'speed' | 'pressure' | …` + icon theo type. Plant có measurement type riêng (Temperature, Level, Conductivity…, có icon base64 từ `tags/details`).

### F5. Nhiều interface "tag" (⚠️)
- **Khách:** *"I see in several components that you are creating the same interface but with different names. Please find all the places where you did this and use the single"* (PR 4539).
- **Code:** `OptimizationTagOption` (tag-picker), `OptimizationTargetTag extends OptimizationTagOption`, `OptimizationTagDetail` (details service), `ExpressionTag` (expression), `RunTag` (runs query), `WizardInfluencer['tag']`. Đề xuất 1 `OptimizationTag` + `Partial`/`Pick`.

### F6. Gọi function trong template (⚠️)
- **Khách:** *"Try to avoid calling functions from the template. The admin/portal project has a custom pipe functionCallPipe, add it to the project"* (Vladimir-precog, PR 4544).
- **Code:** `influencers-step.component.html` (`isMissingAsset(influencer)`, `isVisible(group)`, `hasHistory(group)`, `isTagIconLoading`, `isAssetIconLoading`, `orderError(delay)`), `optimization-goal-step.component.html` (`costOrderError()`, `isTargetIconLoading(tag)`). Khoảng 20 chỗ.
- Signal (`detailsState()`) thì OK, vì đó là cách đọc signal chuẩn.

### F7, F8 (💬)
- Khách từng yêu cầu Enum thay chuỗi (`ConnectionType`, `INTERNAL_TAG_TAB.AVAILABLE`, completed/failed/importing). OP dùng union type. Hỏi lại khách chấp nhận union type không, hoặc đổi sang `enum`/`as const`.
- `any`: `app.module.ts:24 Observable<any>`, `initialize-optimization-header.ts:75 const result: any`.

## Những gì đang làm đúng theo khách
- Không gọi API trùng (license 1 lần/navigation, tag details theo lô).
- Standalone component, có typing, không console.log, không code comment-out.
- Gateway mỏng, logic ở service (khách: *"please move this logic to the target service"*).
- Joda `DateTime` thống nhất (khách: *"better to stay with Joda"*).
- Có xử lý race tạo trùng tên bằng unique index (khách từng hỏi race ở PR 4520). Nhưng thiếu migration existing-customer (B4).

## Đề xuất
1. **Ngay (BE, trước khi merge op-26/#315/#321):** B1 (bỏ assert), B4 (migration existing-customer), B2, B5, B6, B7.
2. **Trước khi deliver FE OP:** F1 (translate hết), F2 (bỏ mock), F3, F4, F5, F6.
3. Đưa bảng quy tắc này vào checklist review PR của team (đã lưu vào memory để `/me:elena-monitor` tự kiểm tra).

## Câu hỏi chưa giải quyết
- Khách có chấp nhận union string type thay Enum (F7) không?
- Exchange RabbitMQ cho Algorithm của OP dùng cái có sẵn hay tạo mới (B8)?
