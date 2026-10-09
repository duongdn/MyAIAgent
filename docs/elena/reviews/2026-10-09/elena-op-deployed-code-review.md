# Elena OP — Review code đã deploy

> Cập nhật: **2026-10-09** (nus-base `a288733a18`, FE build 09/10 09:40). Hướng dẫn test: [elena-op-daily-test-guide.md](../../elena-op-daily-test-guide.md)
> Test env: https://active-alerts.nusdev.net/optimizations · Admin: https://active-alerts.nusdev.net/admin-ui/ · Repo local: `/home/nus/projects/Elena/develop`

## 1. Phạm vi: cái gì đang chạy trên test env

Code đã merge vào `nus-base` gồm **FE** (Angular, `precognize-workspace`, qua các PR bên dưới) và **BE `microservices-optimization` + gateway `POST /optimization/models/create`** (Brian commit thẳng `4acdfda072` "feat: init optimization" ngày 06/10, không qua PR). BE license đa module (#315) và tag details (#321) **chưa merge**, nhưng **đã chạy trên test env** (kiểm chứng 09/10: `/license/status` có `modules.optimization`, `/model/tags/details` trả 200), tức là kietnht deploy thẳng từ branch. Kiến trúc: [elena-op-architecture-explained.md](../../elena-op-architecture-explained.md).

| Mảng | PR đã merge | Trạng thái dữ liệu |
|------|-------------|--------------------|
| License: panel + history (Admin), license status API, chặn/cho vào app theo module | #314, #324, #329 (OP-9) | **Thật**: gọi `/license/status`, `/license/upload`, `/license/history` |
| Header/app menu theo module, trang Access Denied, default page | #319, #329 | Thật |
| Wizard tạo model: Step 1 Goal, Step 2 Influencers, Manage Influencer dialog | #312, #320, #322, #317 (OP-10/13/14/15) | Search tag + tag details **thật**. **Check tên trùng + Save draft là MOCK** |
| Expression builder | #326 (OP-16) | FE thuần |
| BE tạo Optimization Model (service mới + Mongo `optimizationModel`) | commit `4acdfda072`, không có PR | Thật, nhưng **FE chưa gọi** |
| Tag search + chọn tag | #327 (OP-11) | Thật: `GET /search/entityByNameAndDescription` + `POST /model/tags/details` |
| Trang Optimization Runs: bảng, search, filter, sort, phân trang | #313, #316, #318 (OP-20) | **MOCK 100%** (`optimization-runs.sample-data.ts`) |

## 2. Tóm tắt kết luận

Kiến trúc FE gọn, có pattern chung tốt: `createRequestState` (loading/success/error), `QueryCacheService`, `switchMap` chống response cũ, validate response kiểu `unknown`. Không thấy lỗi bảo mật kiểu XSS: icon base64 chỉ nhận PNG/SVG và hiển thị qua `<img>`.

Có **3 vấn đề cần bàn ngay** và một vài điểm technical/perf:

| # | Vấn đề | Mức |
|---|--------|-----|
| A | Guard license **fail-open**: không đọc được license, hoặc chưa cài license, thì vẫn vào được Optimization | 🔴 cần quyết định |
| B | BE chưa tự chặn theo license, mọi kiểm tra quyền chỉ nằm ở FE | 🔴 cần ticket BE |
| C | Timeout 1.5s cho config/license/user lúc khởi động: mạng chậm thì sai format ngày, sai quyền | ⚠️ |
| D | Tag search dùng API legacy, chưa lọc "đủ X tháng dữ liệu" mà khách yêu cầu, và có thể trả rất nhiều kết quả | ⚠️ |
| E | Mock vẫn chạy trên test env (Runs, check tên, save draft), kể cả "tên ma" gây lỗi giả | ⚠️ |
| F | Module OP mở cả Configuration + Digital Plant, cần khách xác nhận | 💬 bàn |
| G | Chưa có cảnh báo hết credit / sắp đầy model cho OP (chỉ có cảnh báo tag của Monitoring) | 💬 bàn |
| H | **Live 09/10:** validate của optimization service (`assert`) **không chạy** trên test env, dữ liệu sai lọt qua | 🔴 |
| I | **Live 09/10:** FE cho search từ 2 ký tự, BE yêu cầu ≥3 (`minimumLength: 3` của #321), nên gõ 2 ký tự FE báo lỗi/không ra kết quả | ⚠️ |
| J | **Live 09/10:** lỗi trả về lộ message Java thô (`Cannot invoke "String.trim()"...`, `Cannot deserialize ... [MAXIMIZE, MINIMIZE]`) | ⚠️ |

## 3. Chi tiết từng vấn đề

### A. Guard license fail-open (🔴 cần quyết định)
- **Code:** `optimization-ui/src/app/core/guards/optimization-license.guard.ts`
  - `readLicense()` timeout 1500ms, rồi `catchError(() => of(null))`.
  - `LicenseModulesService.update(null)` gán `modules = null`, nên `isAvailable()` trả `true` khi modules null (`shared/services/license-modules/license-modules.service.ts`).
  - Khi chưa cài license (không có `expirationDate`), `modules` cũng là null, tức là **mọi module đều mở**.
- **Kịch bản:** khách chỉ mua Monitoring. `/license/status` chậm hơn 1.5s (server bận, lúc khởi động), hoặc license bị xóa, thì user vẫn vào và dùng được Optimization.
- **Ghi chú:** comment trong code nói cố ý ("app still runs as a preview without a backend"). Chạy dev không có BE thì tiện, nhưng lên production là lỗ hổng thương mại.
- **Đề xuất:** production thì fail-closed (đọc lỗi thì hiện "không kiểm tra được license, thử lại"). Chỉ fail-open khi `!environment.production`. Ngoài ra nâng timeout lên khoảng 5–10s.

### B. Chưa có kiểm tra license phía BE (🔴 cần ticket)
- FE chặn bằng guard + ẩn menu. API OP đầu tiên đã có (`DaeOptimizationModelControl.create`), nhưng còn để comment `// extension point: license / model-capacity check (not implemented in this version)`, tức là **đã xác nhận chưa kiểm tra license**. Các API sau (run now, pause) cần BE kiểm tra: license có OP, chưa vượt `modelCapacity`, còn `totalCredits`.
- Code này vào nus-base **không qua PR/review**. Nên yêu cầu mọi code BE đi qua PR.
- Unique index `normalizedName` (chống tạo trùng tên khi 2 người tạo cùng lúc) chỉ nằm trong `db.changelog-new-customer.yaml`. Cần kiểm tra khách **đang chạy** (đã cài trước đó) có được tạo index không. Nếu không thì chống trùng chỉ còn bước check trước, có race condition.
- Khi nối FE: FE `goalValue()` gửi `costMin/costMax = 0` khi bỏ trống (`value.costMin || 0`), nhưng BE yêu cầu cost **≥ 1000 nếu có gửi object cost**. FE phải bỏ hẳn `improvementCost` khi trống, không thì sẽ luôn lỗi `invalidImprovementCost`.
- **Kịch bản:** user có token gọi thẳng API (Postman/curl) là bỏ qua được FE.
- **Đề xuất:** đưa vào spec BE (root `openspec/`) cho từng endpoint OP: `success=false` + errorId khi không có license / vượt quota. Nên chốt trước khi kietnht/tiennd2 làm save model.

### C. Timeout 1.5s lúc khởi động (⚠️)
- **Code:** `core/services/initialize-optimization-header.ts`: `Promise.race([... , 1500ms])` cho `/get-all`, `/configuration/interface`, `/auth/current`.
- **Kịch bản:** mạng nhà máy chậm. App render với config mặc định (`fallbackLegacyConfiguration`): ngày giờ không theo configuration `/get-all`, trái với yêu cầu của anhttl ngày 07/10, logo/màu header sai. Guard license thì phải chờ thêm user cho case System (đã xử lý bằng `whenCurrentUserLoaded`, 10s).
- **Đề xuất:** kiểm tra các component ngày giờ có subscribe lại config khi config về muộn không. Nếu không thì chờ `/get-all` (có spinner) thay vì race 1.5s.

### D. Tag search (⚠️ perf + nghiệp vụ)
- **Code:** `shared/components/tag-picker/tag-picker.component.ts` gọi `SearchColumnObjectService.searchTags`, tức là `GET /search/entityByNameAndDescription` (API legacy dùng chung với Active Alerts). Debounce 300ms, tối thiểu 2 ký tự (`minimumSearchQueryLength`).
- **Perf:** API legacy không có tham số phân trang/limit. Plant lớn (hàng chục nghìn tag), gõ "PV" có thể trả hàng nghìn dòng và dropdown render hết. **Cần đo** trên data thật (xem mục test D).
- **Nghiệp vụ:** khách yêu cầu chỉ hiện tag có đủ X tháng dữ liệu (tham số BE, đã confirm 09/10). Phần filter này đã bị rút khỏi PR #321, nên hiện **mọi tag đều chọn được**, kể cả tag không có data.
- **Tag details:** `POST /model/tags/details` trả icon base64 **lặp lại cho từng tag**. 50 influencer cùng asset thì có 50 bản icon giống nhau. Hiện chấp nhận được, nhưng nên cache icon theo partType/measurementType nếu payload lớn.

### E. Mock vẫn chạy trên test env (⚠️)
- **Trang Runs:** `features/optimization-runs/optimization-runs.service.ts` đọc dữ liệu mẫu (461 dòng), và **bundle vào cả production**.
- **Check tên model trùng / Save draft:** `features/model-wizard/services/optimization-model.service.ts` là mock:
  - đặt tên `mock error` hoặc `mock save error` (`shared/mocks/optimization-mock-data.ts`) thì app báo lỗi giả
  - các tên "Line A - Max Throughput", "Boile…" luôn bị coi là trùng
  - draft lưu trong RAM, F5 là mất
- **Kịch bản:** QC (duyvna/handn) log bug "lưu draft xong F5 mất", "tên X báo trùng", hoặc khách thấy dữ liệu giả lúc demo.
- **Đề xuất:** BE draft của kietnht đã xong (08/10), nên ưu tiên nối Save draft. Thêm banner "Sample data" trên trang Runs, hoặc ẩn trang Runs ở production cho đến khi có BE. Bỏ các "tên ma" ra khỏi build production.

### F. Module OP mở cả Configuration và Digital Plant (💬)
- **Code:** `shared/services/license-modules/license-modules.ts`, `MODULES_BY_LICENSE[OPTIMIZATION] = [CONFIGURATION, DIGITAL_PLANT, OPTIMIZATION]`.
- Hợp lý về kỹ thuật, vì OP cần DP để nối asset-tag và cần Admin để upload license. Nhưng khách mua chỉ OP sẽ dùng được Digital Plant miễn phí. **Cần vytth xác nhận với khách.**
- Kèm theo: `licensedModules()` khi `activeModules` rỗng hoặc chứa tên lạ thì **mặc định Monitoring**. License OP gõ sai tên module (lỗi tool BE, xem review #315) sẽ thành Monitoring.

### G. Chưa có cảnh báo cho tài nguyên OP (💬)
- `admin-ui/.../license/license.service.ts` `getWarningMessage()` mới cảnh báo hết hạn, vượt tag và trial. Chưa có "credit sắp hết", "đã dùng 9/10 model".
- Có thể đây là ticket sau. Nên hỏi vytth có trong M1 không.

### H. Validate bằng `assert` không chạy trên test env (🔴)
- **Kiểm chứng:** đăng nhập System, gọi `POST /optimization/models/create` với `minimumDesiredImprovement: 999` (giới hạn là 20) và tag giả. Kết quả trả `optimizationTagNotFound`, tức là đã **qua** bước check improvement. Body `{}` thì trả `Cannot invoke "String.trim()" because "name" is null` (NPE) thay vì `invalidOptimizationModelName`. Cả hai cho thấy các dòng `assert` trong `DaeOptimizationModelConstraints` bị bỏ qua.
- **Nguyên nhân khả dĩ:** `assert` chỉ chạy khi JVM có `-ea`. Dockerfile có `-ea`, nhưng bản trên test env có lẽ chạy jar không qua Dockerfile đó (kietnht deploy tay).
- **Kịch bản:** FE nối Save/Create mà gửi dữ liệu sai (improvement 50%, cost âm, influencer trùng target) thì BE **lưu vào Mongo** không báo gì. Thuật toán sau đó nhận model rác. Lỗi này cũng có thể xảy ra ở production nếu khởi động sai cách.
- **Đề xuất:** hỏi kietnht service optimization chạy bằng lệnh gì, thêm `-ea`. Lâu dài thì không dùng `assert` cho validate nghiệp vụ (đổi thành `if (...) throw new AssertionError(...)`, như code đã làm với `nameAlreadyExist`). Áp dụng cho cả license/domain service nếu cũng chạy thiếu `-ea`.

### I. Độ dài search tối thiểu FE ≠ BE (⚠️)
- **Kiểm chứng (đính chính):** ban đầu em tưởng search hỏng (0 kết quả), thực ra là test bằng 2 ký tự. BE đang chạy trả `success:false, reason: searchQueryTooShort` khi query < 3 ký tự (config `search.query.minimumLength: 3` mà branch #321 thêm vào `reference.conf`, đã deploy). Với ≥3 ký tự thì chạy tốt (`.PV` → 197 tag, khoảng 0.5s, 22KB).
- FE `tag-picker` dùng `minimumSearchQueryLength` mặc định **2**, nên gõ 2 ký tự sẽ ra lỗi hoặc danh sách rỗng mà không hiện "quá ngắn".
- **Đề xuất:** thống nhất một nguồn: FE đọc từ config BE, hoặc bỏ config thừa ở #321 (review PR #321 vấn đề 1). Ghi chú: gửi `entityType=COLUMN` (viết hoa) bị lỗi enum, FE gửi `Column` nên không sao.
- **Data test:** chỉ khoảng 38% tag có asset (1.142/2.974 tag quét được). Bộ tag test để trong `config/.elena-op-test-data.json`.

### J. Lộ message lỗi Java ra client (⚠️)
- Response `reason` chứa nguyên exception (tên class Java, danh sách enum). Đây không phải errorId nên FE không dịch được, và để lộ cấu trúc nội bộ.
- **Đề xuất:** gateway/service map lỗi parse và NPE thành errorId chung (ví dụ `invalidPayload`).

### Điểm tốt đã kiểm tra
- `LicenseModulesService` chia sẻ 1 lần đọc `/license/status` mỗi navigation (guard + trang dùng chung), không gọi lặp.
- Admin license card: `switchMap` bỏ response cũ, lỗi thì giữ card cũ, session hết hạn thì không hiện toast thừa.
- `toImageDataUrl` kiểm tra base64 + magic bytes PNG/SVG, dùng qua `<img>` nên không chạy script.
- `toDetails` lọc row không hợp lệ và id không yêu cầu, không tin response mù quáng.
- Async validator tên model có debounce + nhớ câu trả lời cuối.
- System user được miễn chặn license (giống portal), có chờ user load để không chặn nhầm.

## 4. Cần bàn với team / khách

| Câu hỏi | Hỏi ai | Liên quan |
|---------|--------|-----------|
| Production có fail-closed khi không đọc được license không? | anhttl + kietnht | A |
| BE OP endpoints kiểm tra license/quota ở đâu, có spec chưa? | kietnht, tiennd2 | B |
| Mua chỉ OP thì có được dùng Digital Plant không? | vytth → khách | F |
| Gói OP "không giới hạn model" có không (0 = ?) | vytth → khách | F, review #315 |
| Filter "đủ X tháng dữ liệu" làm khi nào, ở endpoint nào? | tiennd2 | D |
| Trang Runs mock: ẩn hay gắn nhãn khi demo khách? | anhttl | E |
| Cảnh báo credit/model có trong M1? | vytth | G |

## Câu hỏi chưa giải quyết
- BE license đa module (#315) và tag details (#321) có đang chạy trên test env không? Cần login để kiểm tra (Test A, B).
- Mapping account GitHub ↔ người (nusteam, nusken, nus-aron, ryannus, nustom, briannus).
