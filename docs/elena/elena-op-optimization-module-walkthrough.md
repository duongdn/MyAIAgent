# Elena OP — Walkthrough module Optimization (code chạy thế nào)

> Chỉ riêng module Optimization: user mở app → tạo model → (sau này) chạy run → xem khuyến nghị. Đọc kèm từng file trong code.
> Cập nhật: **2026-10-09** (nus-base `a288733a18`). Kiến trúc chung: [elena-op-architecture-explained.md](elena-op-architecture-explained.md) · Review: [elena-op-deployed-code-review.md](reviews/2026-10-09/elena-op-deployed-code-review.md)
> Viết tắt: `FE/` = `precognize-workspace/projects/optimization-ui/src/app/` · `SVC/` = `services/microservices-optimization/src/main/java/com/vp/dae/` · `GW/` = `application/src/main/java/com/vp/dae/components/optimization/` · `DTO/` = `libraries/.../optimization_api_schema/models/model/`

## 0. Bản đồ 1 trang

```
 [User]──► /optimizations/#/ ──► HomePage ──"Create model"──► #/models/new ──► Wizard
                    │                                                   │
                    └──► #/runs ──► Runs page (MOCK)                    ├─ Step 1 Goal          ✅ UI xong · tag search/details THẬT
                                                                        ├─ Step 2 Influencers   ✅ UI xong · tag details THẬT
                                                                        ├─ Step 3 Data excl.    ⬜ placeholder
                                                                        └─ Step 4 Operating     ⬜ chưa có route
                                                                               │ Save draft / Create
                                                                               ▼  (FE đang MOCK, chưa gọi)
 GW  POST /optimization/models/create ──RSocket "optimization.model.create"──► SVC optimization
                                                                               ├─ validate (constraints)
                                                                               ├─ tag tồn tại? ──RSocket──► domain (Neo4j)
                                                                               ├─ [TODO] license/model capacity
                                                                               ├─ save Mongo optimizationModel (status CALCULATING)
                                                                               └─ [TODO] gửi RabbitMQ ──► Algorithm (repo khác của Precognize)
                                                                                                         └─► kết quả/khuyến nghị (chưa thiết kế)
```

Trạng thái thật (09/10): **FE có UI cho Step 1–2. BE mới có 1 API `create`.** Phần nối FE↔BE, Run, Algorithm, Recommendation đều chưa có.

## 1. App load thế nào (từ lúc gõ URL)

| # | Chuyện gì xảy ra | File | Ghi chú review |
|---|------------------|------|----------------|
| 1 | Tomcat trả `index.html` + `main-*.js` của build `optimization-ui` (base `/optimizations/`) | `angular.json` → `build-optimization` | |
| 2 | `AppModule` khởi tạo: Translate (gộp `shared-locale` + `locale` của app), Toastr, interceptor, icon registry | `FE/app.module.ts` | |
| 3 | `APP_INITIALIZER` `initializeOptimizationHeader`: config fallback. Có cookie `token` thì gọi song song `/get-all`, `/configuration/interface`, `/auth/current`, **race 1.5s** | `FE/core/services/initialize-optimization-header.ts` | 1.5s quá ngắn (review C) |
| 4 | Router hash. Mọi route trừ `#/shared-ui` đi qua `OptimizationLicenseGuard` | `FE/app-routing.module.ts` | |
| 5 | Guard: không cookie → `/admin-ui/#/login`. `GET /license/status` (1.5s). Invalid → popup (System được qua). Thiếu module OP → `#/access-denied`. **Không đọc được → cho qua** | `FE/core/guards/optimization-license.guard.ts` + `shared/services/license-modules/*` | fail-open (review A) |
| 6 | Header chung (menu app theo license, user, logout) | `FE/core/components/header`, `core/services/optimization-header-*.service.ts` | |
| 7 | Mọi HTTP sau đó: lỗi 405 "Not authenticated" → interceptor đá về login | `FE/core/services/interceptor/*` | |

Routes:
```
#/                 HomePage (empty state + "Create model")
#/runs             OptimizationRunsPage           (eager)
#/models/new       lazy: model-wizard.routes.ts → ModelWizardPage
   ├─ goal               OptimizationGoalStep
   ├─ influencers        InfluencersStep
   └─ data-exclusions    StepPlaceholder
#/access-denied    (guard chỉ đọc license)
#/shared-ui        playground component, KHÔNG cần login
```

## 2. Wizard tạo model: luồng chi tiết

### 2.1 Ai giữ state
```
ModelWizardPageComponent  (providers: [ModelWizardStateService])  ← 1 instance / 1 lần mở wizard
   │  header stepper, beforeunload, confirmLeave() khi rời wizard
   ├── <router-outlet> → GoalStep / InfluencersStep  (inject cùng ModelWizardStateService)
   └── ModelWizardStateService
         goalForm: FormGroup {name, description, targetTag, improvement, direction, costMin, costMax}
         influencers$: BehaviorSubject<WizardInfluencer[]>
         completedSteps: Set   ← chặn nhảy cóc qua URL (firstOpenableStep)
         visibleAssetKeys: Set ← nhóm asset nào đang "hiện trend"
```
- State **chỉ nằm trong RAM của trang**. F5 thì mất (có cảnh báo `beforeunload`). Đi sang route khác trong app thì `confirmLeaveWizardGuard` hỏi Save/Discard.
- Gõ thẳng `#/models/new/influencers` khi Step 1 chưa xong → `onStepRoute()` đẩy về `goal`.

### 2.2 Step 1: Optimization Goal (`FE/features/model-wizard/steps/optimization-goal/`)
```
User gõ tên ──► validator đồng bộ (trimmedRequired, namePattern)
            └─► async uniqueName: debounce → OptimizationModelService.isNameAvailable()  ⚠ MOCK
User gõ tag ──► TagPicker: ≥2 ký tự, debounce 300ms
            └─► GET /search/entityByNameAndDescription?query=..&entityType=Column   (API legacy)
User chọn tag ─► state.setTarget(tag) + createRequestState → POST /model/tags/details {tagIds:[id]}
            └─► effect(): state.applyTargetDetail() → card hiện asset name/icon, measurement icon
                 targetHasAsset validator: tag không có asset → không cho NEXT
Improvement (0 < x ≤ 20, 2 số lẻ) · Direction (min/max) · Cost min/max (1.000–10.000.000, 0 = bỏ trống)
TargetTrendPanel: biểu đồ trend của target (trinm đang gắn data)
NEXT ──► markCompleted('goal') → ../influencers
```

### 2.3 Step 2: Influencers (`FE/features/model-wizard/steps/influencers/`)
```
"Add influencers" ──► side drawer, TagPicker multi (loại target ra: excludedTagIds)
   chọn N tag ──► draft list ──► POST /model/tags/details {tagIds:[...N]}  (1 request cho cả lô, có session id
                                  để bỏ response cũ)
              ──► nhóm theo asset (groupByAsset), tag không có asset → "Unassigned" + lỗi
   mỗi tag: effect delay min/max (phút, số nguyên, min ≤ max)
ADD ──► state.setInfluencers()
Trang chính: card theo asset, eye-toggle hiện trend, xóa tag/xóa cả asset
NEXT (≥1 influencer, không tag nào thiếu asset) ──► data-exclusions (placeholder)
```

### 2.4 Save draft / rời wizard
```
Rời wizard có thay đổi ──► UnsavedChangesDialog: Save | Discard | Cancel
   Save ──► chờ check tên xong ──► OptimizationModelService.saveDraft(draftValue())   ⚠ MOCK (delay 300ms, lưu RAM)
```
**Chưa có chỗ nào gọi `POST /optimization/models/create`.**

### 2.5 Expression builder (dùng cho Step 3/4 sau này) (`FE/shared/expression/`, PR #326)
- Logic thuần TS (không phụ thuộc Angular): `expression.model.ts` (kiểu), `expression.rules.ts` (validate), `expression.preview.ts` (hiện dạng chữ).
- Một **condition set** = `AND|OR` + danh sách expression. Expression = operand (`TAG` một tag | `FUNCTION` hàm trên nhiều tag) + operator + value(s).
- Ví dụ: `AVERAGE(TI-101) > 80 AND FI-202 in [1,2]`.

## 3. Hợp đồng FE ↔ BE (chỗ dễ vỡ khi nối)

Request BE `DaeApiOptimizationModelCreateRequest`:
```jsonc
{
  "name": "Line A - Max Throughput",        // ^[chữ số _ -]{1,100}$, unique không phân biệt hoa thường
  "description": "…",                        // ≤1000
  "goal": {
    "targetTagId": "<tagId>",
    "direction": "MAXIMIZE",                 // MAXIMIZE | MINIMIZE
    "minimumDesiredImprovement": 5.5,        // 0 < x ≤ 20, ≤2 số lẻ
    "improvementCost": {"min": 1000, "max": 50000}   // tùy chọn; nếu gửi thì cả 2 trong [1.000, 10.000.000]
  },
  "influencers": [{"tagId": "<id>", "effectDelay": {"min": 0, "max": 30}}],
  "dataExclusions": [{"conditionSet": {...}, "affectedTagIds": [...]}],   // tùy chọn
  "operatingConditions": {"logicalOperator": "AND", "conditions": [
     {"operand": {"type": "FUNCTION", "function": "SUM", "tagIds": ["a","b"]}, "operator": ">", "value": 10}
  ]}
}
```
`userId` không cần gửi, gateway ghi đè bằng user của session.

| Trường | FE đang có | BE cần | Lệch? |
|--------|-----------|--------|-------|
| direction | `'min' \| 'max'` (`GOAL_DEFAULTS.direction='min'`) | `MAXIMIZE \| MINIMIZE` | ⚠️ cần map |
| improvementCost | `costMin/costMax`, **0 = bỏ trống**, `goalValue()` trả `|| 0` | bỏ hẳn object nếu trống; có thì ≥1000 | ⚠️ gửi `{0,0}` là lỗi `invalidImprovementCost` |
| improvement mặc định | `0` | > 0 | OK (FE validator chặn) |
| influencer | `{tag:{id..}, asset, effectDelay}` | `{tagId, effectDelay}` | cần map (bỏ asset/tag info) |
| effectDelay đơn vị | phút (comment FE) | không ghi đơn vị | 💬 chốt đơn vị trong spec BE |
| operator | `> >= == < <= in notIn` | `@JsonProperty` cùng ký hiệu + `!=` | ✅ (FE thiếu `!=`) |
| function | SUM, AVERAGE, **MEAN, DIFFERENCE, PROPORTION**, MIN, MAX, RANGE | SUM(≥2 tag), AVERAGE, MINIMUM, MAXIMUM, RANGE (1 tag) | ⚠️ 3 hàm FE BE chưa có (FE comment đã ghi) |
| draft | FE có "Save draft" ở mọi bước | BE `create` luôn tạo `CALCULATING`, **bắt buộc đủ influencer**; enum có `DRAFT` nhưng chưa có API lưu draft | ⚠️ chưa có API draft (kietnht nói "done" 08/10, chưa thấy trong nus-base) |

## 4. BE: `create` chạy qua những gì

```
GW/model/external/DaeApiOptimizationModelController     POST /optimization/models/create
  assertArgument(body != null)
GW/model/business/control/DaeControlOptimizationModel
  controlAuth.getCurrentUser() → request.userId = user.id
  RSocket → DaeServiceName.OptimizationService, route "optimization.model.create"
──────────────────────────────────────────────────────────────────────────────
SVC/components/model/external/DaeOptimizationModelController   @MessageMapping
SVC/components/model/business/control/DaeOptimizationModelControl.create()
  1. constraints.validateCreate(request)                ← assert (cần -ea! xem review H)
     - trim name/description; check name, goal, improvement, cost
     - influencers: không rỗng, không trùng, không trùng target, effectDelay nguyên ≥0
     - conditionSets: operand/operator/value hợp lệ theo loại; chuẩn hóa field thừa
  2. Mongo: existsByNormalizedNameAndDeletedFalse(name.lower) → nameAlreadyExist
  3. Gom mọi tagId (target + influencer + tag trong expression)
     → DaeDomainServiceControl.findTagsByIds (RSocket sang domain/Neo4j)
     → thiếu id → optimizationTagNotFound; không phải Column → optimizationTagNotColumn
  4. [TODO] license / model-capacity check
  5. mapper.toDocument → status CALCULATING, calculation{id, REQUESTED}, revision 1,
     timeline [CREATED, STATUS_UPDATED], createdBy/At, deleted=false
  6. repository.save → Mongo "optimizationModel" (unique index normalizedName+deleted=false: migration
     libraries/migration/.../db.changelog-new-customer.yaml)
  7. [TODO] publish calculation request (RabbitMQ → algorithm)
  → trả DaeApiOptimizationModel
```
Vòng đời model (enum đã có, chưa có code chuyển trạng thái):
```
DRAFT ──create──► CALCULATING ──algorithm xong──► COMPLETED ──pause──► PAUSED
                       └──lỗi──► FAILED
calculation: REQUESTED → RUNNING → COMPLETED | FAILED
```

Đã có trên test env nhưng chưa merge: `POST /model/tags/details` (domain, PR #321), license đa module `modules.optimization {modelCapacity, totalCredits, usedCredits...}` (PR #315).

## 5. Runs page (`FE/features/optimization-runs/`): toàn bộ MOCK
```
OptimizationRunsPageComponent
  query = {search(text, searchIn), filters, sort, page, pageSize}
  → OptimizationRunsService.getRuns(query)   ← lọc/sort/phân trang trên OPTIMIZATION_RUNS_SAMPLE (461 dòng)
  → optimization-model-item (1 dòng run: tên, status, frequency, improvement, recommendations button…)
  file tách theo trách nhiệm: .search.ts, .filters.ts, .sort.ts, .query.ts, .search-in.ts
```
Thiết kế tốt cho lúc nối BE: page chỉ biết `RunsQuery → RunsPage`. Khi có API thì chỉ cần thay thân `getRuns()`. **Cần BE hỗ trợ đúng các tham số search/filter/sort/page này** (chưa có spec BE).

## 6. Các component dùng chung quan trọng (`FE/shared/components/`)
| Component | Dùng ở | Vai trò |
|-----------|--------|---------|
| `tag-picker` | Step 1, 2 | ô search tag (live API hoặc list có sẵn), single/multi |
| `target-tag-card`, `asset-tag-card` | Step 1, 2 | hiện tag + asset + icon (data URL từ base64) |
| `manage-influencer-dialog` | Step 2 | dialog sửa influencer |
| `side-drawer` | Step 2, Manage Models (#328) | ngăn kéo phải |
| `optimization-model-item` | Runs | 1 dòng model/run |
| `page-header` (stepper), `page-footer` (Cancel/Prev/Next) | wizard | |
| `scoped-search`, `filter-panel`, `sort-menu`, `pagination` | Runs | |
| `license/*` | guard popup | popup chặn license (clone từ portal) |

`#/shared-ui` hiển thị mọi component này kèm mô tả. Muốn xem UI một component thì vào đây, không cần data.

## 7. Gợi ý review và đề xuất (theo luồng)

| # | Ở đâu | Đề xuất | Ưu tiên |
|---|-------|---------|---------|
| 1 | Nối Save/Create | Viết 1 mapper `toCreateRequest(draftValue)` ở `optimization-model.service.ts`: map direction min/max → MINIMIZE/MAXIMIZE, bỏ `improvementCost` khi 0, influencer → `{tagId,effectDelay}`. Thêm unit test cho mapper | 🔴 |
| 2 | Draft | Chốt với BE: draft có lưu thiếu field không (BE `create` bắt buộc đủ). Cần API `saveDraft`/`update` riêng, status DRAFT | 🔴 |
| 3 | BE validate | Thay `assert` bằng throw tường minh, hoặc đảm bảo `-ea` (review H) | 🔴 |
| 4 | License BE | Làm "extension point" ở bước 4: OP licensed + `activeModelCount < modelCapacity` | 🔴 |
| 5 | Function lệch | MEAN/DIFFERENCE/PROPORTION: hoặc BE thêm, hoặc FE ẩn đến khi có | ⚠️ |
| 6 | effectDelay | Ghi đơn vị (phút) vào spec BE + DTO comment | 💬 |
| 7 | Tag search | Endpoint search riêng cho OP: phân trang + lọc "đủ X tháng data" (khách đã confirm) thay API legacy | ⚠️ |
| 8 | State wizard | F5 mất hết. Khi có draft BE thì URL nên mang `modelId` (`#/models/<id>/edit`) để mở lại | ⚠️ |
| 9 | Runs | Viết spec BE cho `GET runs` khớp `RunsQuery` trước khi BE làm, tránh FE phải đổi | ⚠️ |
| 10 | Algorithm | Thiết kế message RabbitMQ (queue, payload, kết quả trả về, timeout) là việc lớn nhất còn trống. Cần spec trước | 🔴 (M1+) |

## 8. Cách tự đi theo code (gợi ý đọc)
1. `FE/app-routing.module.ts`, rồi `core/guards/optimization-license.guard.ts`
2. `features/model-wizard/model-wizard-page/*`, rồi `services/model-wizard-state.service.ts`
3. `steps/optimization-goal/*`, rồi `shared/components/tag-picker/*`, rồi `shared/services/optimization-tag-details.service.ts`
4. `steps/influencers/*`
5. BE: `GW/model/external/DaeApiOptimizationModelController.java`, rồi `SVC/components/model/business/control/DaeOptimizationModelControl.java`, rồi `constraints/DaeOptimizationModelConstraints.java`
6. Spec: `precognize-workspace/openspec/specs/optimization-*` (FE), `openspec/` (BE, phần optimization model nếu có)
7. Chạy `npm run start-optimization` → `http://localhost:4203/#/shared-ui` để xem component, `#/models/new` để đi wizard (cần BE/login cho search tag)

## Câu hỏi chưa giải quyết
- API draft BE kietnht báo "done" 08/10: ở branch nào, contract ra sao?
- Algorithm giao tiếp qua RabbitMQ (khách nói 15/09): queue/payload đã có tài liệu chưa?
- Run = gì về mặt dữ liệu (1 model có nhiều run? lịch chạy?), chưa có DTO BE.
