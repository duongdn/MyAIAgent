# Elena OP — Review code đã deploy & hướng dẫn test

> File sống, cập nhật mỗi lần review. Lần cập nhật: **2026-10-09** (nus-base `a288733a18`, FE test env build 09/10 09:40).
> Test env: https://active-alerts.nusdev.net/optimizations · Admin: https://active-alerts.nusdev.net/admin-ui/ · Repo local: `/home/nus/projects/Elena/develop`

## 1. Phạm vi: cái gì đang chạy trên test env

**Toàn bộ code đã merge vào `nus-base` là FE** (Angular, `precognize-workspace`). Code BE của OP (license đa module, tag details) **chưa merge**. Nếu test env đang chạy BE mới thì đó là kietnht deploy thẳng từ branch.

| Mảng | PR đã merge | Trạng thái dữ liệu |
|------|-------------|--------------------|
| License: panel + history (Admin), license status API, chặn/cho vào app theo module | #314, #324, #329 (OP-9) | **Thật**: gọi `/license/status`, `/license/upload`, `/license/history` |
| Header/app menu theo module, trang Access Denied, default page | #319, #329 | Thật |
| Wizard tạo model: Step 1 Goal, Step 2 Influencers, Manage Influencer dialog | #312, #320, #322, #317 (OP-10/13/14/15) | Search tag + tag details **thật**. **Check tên trùng + Save draft là MOCK** |
| Expression builder | #326 (OP-16) | FE thuần |
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
- FE chặn bằng guard + ẩn menu. Các API OP sắp làm (create/save model, run now, pause) cần BE kiểm tra lại: license có OP, chưa vượt `modelCapacity`, còn `totalCredits`.
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

## 5. Hướng dẫn test (làm mỗi ngày)

### 0. Chuẩn bị
- Tài khoản: 1 user **System**, 1 user **Admin** (không phải System), 1 user thường. Hỏi kietnht/duyvna nếu chưa có.
- 3 file license test (only OP / only Monitor / all): tuanntg gửi trong room ngày 07/10 (`Licenses.zip`).
- Mở DevTools, tab **Network**, lọc `vp_server` để xem API.
- Kiểm tra bản build: View source trang `/optimizations/`, tên file `main-XXXX.js`. Đổi tên tức là có deploy mới.

### Test A: License và quyền vào app (5 phút)
| Bước | Kỳ vọng |
|------|---------|
| Admin → System Configuration → License, upload **only Monitor** | Card hiện Monitoring, menu app **không có** Optimization |
| Mở thẳng `/optimizations/` (user Admin) | Chuyển sang trang Access Denied |
| Upload **only OP** | Menu có Optimization + Configuration + Digital Plant, không có Dashboard/Active Alerts. Không có cảnh báo tag |
| Mở portal gốc | Tự chuyển sang Optimization (default page) |
| Upload **all** | Tất cả menu có |
| License History | Có dòng cho mỗi lần upload, đúng module |
| User thường + license hết hạn | Popup "License needs renewal, contact administrator", đóng popup thì về login |
| **Test fail-open (A):** DevTools → Network → chặn request `license/status` (chuột phải → Block request URL), reload `/optimizations/` | Hiện tại **vẫn vào được**. Đây là lỗi A, ghi kết quả |

### Test B: Wizard tạo model, Step 1 (5 phút)
| Bước | Kỳ vọng |
|------|---------|
| Runs → New Model | Mở wizard Step 1 |
| Gõ 1 ký tự vào ô Target Tag | Báo "quá ngắn", không gọi API |
| Gõ ≥2 ký tự | Sau khoảng 300ms gọi `entityByNameAndDescription`, có danh sách tag |
| Chọn 1 tag | Gọi `POST /model/tags/details`, card hiện asset name + icon + measurement icon |
| `tags/details` trả 404/405/500 | Card báo lỗi + nút Retry (nếu vậy thì BE #321 chưa deploy) |
| Tag không gắn asset | Báo lỗi "target phải có asset", không cho Continue |
| Đặt tên `Line A - Max Throughput` | Báo trùng (mock) |
| Improvement / cost min > max | Báo lỗi validate |
| Save draft rồi F5 | **Mất** (mock, xem E) |

### Test C: Step 2 Influencers
| Bước | Kỳ vọng |
|------|---------|
| Thêm nhiều tag | Nhóm theo asset, 1 request `tags/details` cho cả lô |
| Target tag không xuất hiện trong danh sách influencer | Đúng |
| Xóa 1 asset group | Mất cả nhóm |
| Influencer thiếu asset | Không cho Continue |

### Test D: Hiệu năng search (2 phút, làm khi có data thật trên plant2)
- Gõ một chuỗi rất chung (`PV`, `.OP`). Trong Network ghi lại **thời gian** và **kích thước response** của `entityByNameAndDescription`.
- Response quá 1MB hoặc trên 2s, hoặc dropdown giật, thì báo lại vấn đề D.

### Test E: Trang Runs (mock)
- Search, filter, sort, phân trang chạy được. Chỉ là dữ liệu mẫu, F5 về trạng thái ban đầu.
- Chỉ test UI: tên dài bị cắt, ở 1920×1080 không vỡ layout (anhttl báo lỗi này ngày 07/10).

### Test API bằng curl (tùy chọn)
DevTools → request bất kỳ → Copy as cURL để lấy cookie:
```bash
B=https://active-alerts.nusdev.net/vp_server/dae/rest
C='Cookie: <dán từ browser>'
curl -s "$B/license/status" -H "$C" | jq '.data | {isValid, activeModules, modules}'
curl -s -X POST "$B/model/tags/details" -H "$C" -H 'Content-Type: application/json' \
  -d '{"tagIds":["<tagId>","<tagId>","khong-ton-tai"]}' | jq
# Kỳ vọng: 1 dòng, có assetName/units; id lạ bị bỏ
```

### Chạy local (khi cần test branch chưa deploy)
```bash
cd /home/nus/projects/Elena/develop && git fetch nus
git worktree add /tmp/elena-test nus/<branch>
cd /tmp/elena-test/precognize-workspace && npm ci
# Muốn gọi BE test env: sửa proxy.conf.json target -> https://active-alerts.nusdev.net/vp_server
npm run start-optimization   # http://localhost:4203
```

## 6. Nhật ký test

| Ngày | Build (`main-*.js`) | Test | Kết quả / bug |
|------|---------------------|------|---------------|
| 2026-10-09 | main-SOJERMXW | Kiểm tra bundle | Có OP-11 tag details. Chưa có #325/#328. BE `tags/details` chưa xác nhận (cần login) |

## Câu hỏi chưa giải quyết
- BE license đa module (#315) và tag details (#321) có đang chạy trên test env không? Cần login để kiểm tra (Test A, B).
- Mapping account GitHub ↔ người (nusteam, nusken, nus-aron, ryannus, nustom, briannus).
