# Elena OP — Kiến trúc dự án & cách code chạy

> Giải thích để hiểu hệ thống, không phải review. Cập nhật: **2026-10-09** (nus-base `a288733a18`).
> Review: [elena-op-deployed-code-review.md](elena-op-deployed-code-review.md) · Test: [elena-op-daily-test-guide.md](elena-op-daily-test-guide.md)
> Nguồn gốc trong repo: `docs/ai/{PROJECT,ARCHITECTURE}.md` (BE), `precognize-workspace/ai_docs/ARCHITECTURE.md` (FE). Repo local: `/home/nus/projects/Elena/develop`

## 1. Sản phẩm là gì

**Precognize** là phần mềm giám sát nhà máy công nghiệp:
- Nhà máy được mô hình hóa thành một **đồ thị**: Plant → Section → Asset (thiết bị) → **Tag** (cảm biến, mỗi tag là một chuỗi số đo theo thời gian).
- Dữ liệu số đo lấy từ historian (PI, Siemens...) và lưu vào InfluxDB.
- Module cũ **Monitoring** (Active Alerts, Dashboard...): phát hiện bất thường, cảnh báo.
- Module mới **Optimization (OP)**, dự án NUS đang làm: user chọn 1 **Target Tag** cần tối ưu (ví dụ tăng sản lượng) và các **Influencer** (tag có thể chỉnh, ví dụ nhiệt độ, áp suất). Thuật toán của Precognize sẽ đưa ra **khuyến nghị** chỉnh influencer thế nào. Mỗi lần chạy thuật toán là một **Run** và tốn **credit**.
- Khách mua theo **license**: file `.key` có chữ ký số, ghi module nào được dùng, số tag, số model, số credit.

## 2. Bức tranh tổng thể

```
                          Browser (cùng 1 domain: active-alerts.nusdev.net)
 ┌──────────────┬───────────────┬───────────────┬──────────────────────┬───────────────┐
 │ /investigation│  /admin-ui    │ /optimizations│ /process-digital-plant│ /vp (legacy)  │
 │  (portal:     │ (login, config│  (OP: wizard, │ (vẽ đồ thị nhà máy,   │               │
 │  Active Alerts│  license)     │  runs, models)│  nối asset↔tag)       │               │
 └──────┬───────┴──────┬────────┴──────┬────────┴──────────┬───────────┴───────────────┘
        │  REST JSON + cookie "token"   │                   │
        ▼                               ▼                   ▼
 ┌──────────────────────────────────────────────────────────────────────────────┐
 │ vp_server (application/) — Tomcat + Jersey  /vp_server/dae/rest/*            │
 │ Filter: auth (cookie token → auth service) → Controller (@Path) → DaeControl*│
 │ Gần như không có logic, chủ yếu chuyển tiếp                                  │
 └───────────────────────────────┬──────────────────────────────────────────────┘
                                 │ RSocket (TCP), route dạng chuỗi "optimization.model.create"
     ┌──────────┬──────────┬─────┴─────┬──────────┬───────────┬──────────────┬──────────┐
     ▼          ▼          ▼           ▼          ▼           ▼              ▼          ▼
  auth      domain     license    optimization  admin   data-manager  investigation  expert…
 (user,    (đồ thị    (đọc file   (OP model —   (config, (đọc Influx)   (search,
  token)    nhà máy)   license)    MỚI)          mail)                   Elastic)
     │          │          │           │          │           │
     ▼          ▼          ▼           ▼          ▼           ▼
   Neo4j      Neo4j     file .key    MongoDB    MongoDB    InfluxDB      + RabbitMQ giữa các service
              +Mongo    +Mongo(history)
```

- **Một gateway, nhiều microservice.** Mọi request từ browser đi qua `vp_server`. Gateway xác thực, rồi gửi tiếp qua **RSocket** tới đúng service. Mỗi service là một Spring Boot app chạy riêng (Docker).
- **Mọi response đều bọc trong envelope:** `{success, reason, errorId, data, warning...}`. Lỗi nghiệp vụ trả `success:false` + `errorId` (vẫn HTTP 200). Chưa đăng nhập thì trả **HTTP 405** (không phải 401, quy ước của hệ thống).

## 3. Repo: cái gì nằm ở đâu

| Thư mục | Là gì | Ai làm (OP) |
|---------|-------|-------------|
| `application/` | Gateway `vp_server.war` (Java 21, Jersey). Thêm endpoint OP ở `components/optimization/...` | BE |
| `services/microservices-*` | 10 service Spring Boot (domain, license, auth, **optimization**...) | BE |
| `libraries/common/schema/api`, `libraries/*-api` | DTO dùng chung giữa gateway và service (`DaeApi*`) | BE |
| `libraries/migration` | Liquibase migration cho Mongo (tạo collection, index) | BE |
| `tools/licensing` | Tool nội bộ **tạo** file license (`license.sh`, `generate_string.py`) | BE (tuanntg) |
| `precognize-workspace/` | Angular workspace: `precognize-portal`, `admin-ui`, **`optimization-ui`**, `shared` | FE |
| `process-digital-plant/` | App Angular riêng để vẽ đồ thị nhà máy | (DP, chưa merge develop) |
| `openspec/`, `precognize-workspace/openspec/`, `process-digital-plant/openspec/` | Spec (OpenSpec) cho BE / FE / DP | tất cả |

**Git flow:**
```
origin/develop (repo của Precognize)
      │ merge định kỳ
      ▼
nus/nus-base  = develop + openspec + docs/ai      ◄── feature/OP-xx-... (PR, review chéo)
      │ deliver-to-origin.sh: cherry-pick commit của feature, bỏ openspec
      ▼
origin deliver/<ticket>  → giao cho khách
```
NUS không bao giờ push branch nus lên origin. Spec và docs AI chỉ ở phía NUS.

## 4. Một request chạy thế nào (ví dụ: tạo Optimization Model)

```
optimization-ui                vp_server (gateway)                      microservices-optimization
───────────────                ───────────────────                      ──────────────────────────
POST /vp_server/dae/rest/      DaeAuthFilter: cookie "token"
  optimization/models/create ─►  → hỏi auth service: token hợp lệ?
  body {name, goal,              (sai → 405)
        influencers...}        DaeApiOptimizationModelController
                                 → DaeControlOptimizationModel.create()
                                 → lấy currentUser, ghi đè userId          (client không tự khai userId được)
                                 → RSocket route "optimization.model.create" ─►
                                                                          DaeOptimizationModelController (@MessageMapping)
                                                                          → DaeOptimizationModelConstraints.validateCreate()
                                                                             tên 1–100 ký tự, improvement 0–20%, cost 1.000–10.000.000,
                                                                             influencer không trùng, không trùng target...
                                                                          → Mongo: tên đã tồn tại? (normalizedName, không phân biệt hoa thường)
                                                                          → RSocket sang domain service: các tagId có tồn tại & là Column?
                                                                          → [chưa làm] kiểm tra license / số model
                                                                          → lưu Mongo collection "optimizationModel"
                                                                             status=CALCULATING, calculation=REQUESTED, timeline CREATED
                                                                          → [chưa làm] gửi yêu cầu tính toán cho thuật toán
◄──────────── {success:true, data: model}  ◄───────────────────────────────
```

Ý chính:
- **Validate 2 lớp:** FE có validator trùng ngưỡng (`goal-step.validators.ts`: `COST_MIN=1000`, `IMPROVEMENT_MAX=20`). BE là lớp quyết định.
- **Lỗi validate BE** dùng `assert` (service chạy `java -ea`), bắt `AssertionError` rồi trả `success:false` + errorId như `invalidOptimizationModelName`.
- **Hiện FE chưa gọi API này:** Save draft trong wizard vẫn là mock. Khi nối vào, đây là luồng sẽ chạy.

## 5. Frontend: các app load thế nào

### 5.1 Workspace
- Một Angular CLI workspace (`precognize-workspace/angular.json`) chứa nhiều project. Mỗi app build ra thư mục riêng:
  - `optimization-ui` → `npm run build-optimization` → `dist/optimizations/`, base href `/optimizations/`
  - portal → `/investigation`, admin → `/admin-ui`
- Code dùng chung nằm ở `projects/shared` (alias `@workspace-shared/...`): header, HttpService, LicenseModulesService, notification...
- Router dùng **hash** (`/optimizations/#/runs`, `#/models/new`, `#/shared-ui`).

### 5.2 Khởi động optimization-ui (theo thứ tự)
```
1. index.html tải main-XXXX.js (+ các chunk)
2. APP_INITIALIZER: initializeOptimizationHeader()
     - đặt config mặc định (fallback)
     - không có cookie token → dừng (chưa đăng nhập)
     - có cookie → gọi song song: GET /get-all (config), GET /configuration/interface (menu app, logo),
       GET /auth/current (user)
     - chờ tối đa 1.5s, quá thì render luôn với cái đang có
3. Router → OptimizationLicenseGuard.canActivate()
     a. không có cookie → chuyển sang /admin-ui/#/login
     b. GET /license/status (timeout 1.5s) → LicenseModulesService.update()
     c. license không hợp lệ → user System: cho qua; Admin: popup có nút Upload; user thường: popup "liên hệ admin"
     d. license không có OPTIMIZATION → #/access-denied
     e. không đọc được license → CHO QUA (chế độ preview, xem review mục A)
4. Trang render: Runs page, Wizard...
```
`/admin-ui` lo đăng nhập. Mọi app dùng chung cookie `token` vì cùng domain. Response 405 "Not authenticated" bị interceptor bắt và chuyển về trang login.

### 5.3 License quyết định menu và quyền vào app
```
GET /license/status ─► { isValid, expirationDate, activeModules: ["MONITORING","OPTIMIZATION"],
                         modules: { monitor: {maxColumnCount...}, optimization: {modelCapacity, totalCredits} } }
        │
        ▼  shared/services/license-modules/license-modules.ts
 MONITORING   → Dashboard, Active Alerts, Configuration, Advanced Tools, Digital Plant
 OPTIMIZATION → Configuration, Digital Plant, Optimization
 (rỗng/lạ     → coi như MONITORING)
        │
        ▼  LicenseModulesService (1 instance, dùng chung)
   modules$ → header ẩn/hiện menu app · guard portal/optimization · default page
```
- Một navigation chỉ đọc `/license/status` **một lần**: guard và trang dùng chung kết quả (`currentNavigationRead`).
- Upload license (Admin → System Configuration → License, hoặc popup chặn) → `POST /license/upload` → microservice license kiểm chữ ký, lưu file, ghi history (Mongo) → FE đọc lại status.

### 5.4 Quản lý state (không dùng NgRx)
- Service + RxJS `BehaviorSubject` cho state chung (ví dụ `ModelWizardStateService` giữ form Step 1 + danh sách influencer).
- `createRequestState()` (`shared/state/request-state.ts`): bọc 1 API call thành signal `idle/loading/success/error`, tự hủy request cũ (`switchMap`). Dùng cho tag details.
- `QueryCacheService`: cache theo key + TTL. **Chưa có chỗ nào dùng.**
- Reactive Forms + validator đồng bộ/bất đồng bộ (check tên trùng có debounce).

### 5.5 Wizard tạo model: dữ liệu lấy ở đâu
| Bước | Dữ liệu | API | Thật/Mock |
|------|---------|-----|-----------|
| Step 1 chọn Target Tag | gõ ≥2 ký tự, debounce 300ms | `GET /search/entityByNameAndDescription?query=..&entityType=COLUMN` (API cũ dùng chung) | Thật |
| Step 1 hiện asset/icon của tag | id tag đã chọn | `POST /model/tags/details` | Thật (BE ở PR #321, chưa merge) |
| Step 1 check tên trùng | tên | (sẽ là API optimization) | **Mock** |
| Step 2 Influencers | nhiều tag, 1 request cho cả lô | `POST /model/tags/details` | Thật |
| Save draft / Create | toàn bộ form | `POST /optimization/models/create` (đã có BE) | **Mock** (FE chưa nối) |
| Trang Runs, Manage Models | danh sách | chưa có BE | **Mock** |

Quan hệ asset ↔ tag lấy từ đồ thị Neo4j (cạnh `DirectConnection` Object→Column). Đồ thị này do app **Digital Plant** tạo. Vì vậy test env phải có data DP (plant2) thì Step 1 mới hiện asset.

## 6. Backend: pattern code cần biết khi đọc

| Lớp | Ví dụ OP | Ghi chú |
|-----|----------|---------|
| Gateway Controller | `DaeApiOptimizationModelController` (`@Path("/optimization/models")`) | JAX-RS, trả `CompletionStage<Response>` |
| Gateway Control | `DaeControlOptimizationModel` | Gửi RSocket bằng `DaeRSocketMessageBuilder...serviceName(...).route(...)` |
| Service Controller | `DaeOptimizationModelController` `@MessageMapping("optimization.model.create")` | Spring RSocket |
| Service Control | `DaeOptimizationModelControl` | Logic, trả `Mono/Flux` (Reactor) |
| Constraints | `DaeOptimizationModelConstraints` | `assert` + errorId |
| Repository | `DaeOptimizationModelMongoRepository` | Spring Data reactive Mongo |
| Mapper | `DaeOptimizationModelMapper` | MapStruct DTO ↔ Document |
| Gọi service khác | `DaeDomainServiceControl.findTagsByIds` | RSocket client sang domain |
| Migration | `libraries/migration/.../db.changelog-new-customer.yaml` | Tạo collection + unique index `normalizedName` |
| Đồ thị | `DaeDomainDaoQueryTemplates` | Cypher viết bằng Cypher-DSL, gọi neo4j driver |

**License service** (`microservices-license`): đọc file `.key` từ disk, kiểm chữ ký + installationId, trả status. Có Quartz job nhắc khi sắp hết hạn hoặc vượt tag (gửi mail qua RabbitMQ → admin). Số tag hiện dùng (`currentColumnCount`) do domain service báo về.

## 7. Môi trường test

| Thành phần | URL / ghi chú |
|------------|---------------|
| FE OP | https://active-alerts.nusdev.net/optimizations/ |
| Admin (login, license) | https://active-alerts.nusdev.net/admin-ui/ |
| API | https://active-alerts.nusdev.net/vp_server/dae/rest/... |
| Digital Plant (tạo asset–tag test) | https://process-digital-plant2.nusdev.net (đang trỏ BE active-alerts) |
| Deploy | kietnht build + deploy thủ công (đang build thì 502). Không có CI deploy tự động |
| Bug | Redmine `elena-active-alerts` · Jira OP board 317 |

**Chạy local FE:** `cd precognize-workspace && npm ci && npm run start-optimization` → http://localhost:4203. Proxy `/vp_server` → `localhost:8000` (sửa `proxy.conf.json` để trỏ test env).
Route `#/shared-ui` là **playground** component, không cần đăng nhập. Dùng để xem UI từng component rời.

## 8. Thuật ngữ
| Từ | Nghĩa |
|----|-------|
| Tag / Column | Một cảm biến / chuỗi dữ liệu. Trong code gọi là `Column` |
| Asset / Object | Thiết bị chứa tag |
| Part type | Loại thiết bị (template asset), có icon |
| Measurement type | Loại đo (nhiệt độ, áp suất), có đơn vị + icon |
| Target tag | Tag cần tối ưu |
| Influencer | Tag tác động tới target, kèm effect delay (độ trễ tác động) |
| Data exclusion / Operating condition | Tập điều kiện (biểu thức trên tag) để loại dữ liệu / chỉ dùng dữ liệu khi máy chạy đúng chế độ |
| Run | Một lần chạy thuật toán tối ưu, tốn credit |
| Credit / model capacity | Quota trong license OP |
| System user | Account đặc biệt, không bị chặn bởi license |
| DTE | Một loại permission, thấp hơn Admin |
