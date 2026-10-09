# Elena OP — Code review FE (optimization-ui, những gì đã merge)

> Phạm vi: code FE OP đã vào `nus-base` (`a288733a18`, 09/10): PR #311–#329, khoảng 7.800 dòng trong `precognize-workspace/projects/optimization-ui` + 27 file `projects/shared` + license trong admin-ui/portal.
> Trọng tâm: **duplicate code · structure · follow spec**. Lỗi runtime/nghiệp vụ đã ghi ở [review đã deploy](elena-op-deployed-code-review.md). OpenSpec: [elena-op-openspec-review.md](elena-op-openspec-review.md). BE: [elena-op-code-review-be.md](elena-op-code-review-be.md).
> Viết tắt `FE/` = `precognize-workspace/projects/optimization-ui/src/app/`

## Tóm tắt

| Mảng | Đánh giá | Ý chính |
|------|----------|---------|
| Duplicate | 🟡 Chấp nhận được, có kỷ luật | 2,3% dòng trùng (626/26.983, jscpd). Phần lớn là **clone có chủ đích** theo quy ước "Cloned components" (user quyết 07/10). Nhưng **2 clone không đăng ký** và một số logic overlay bị lặp |
| Structure | 🟢 Tốt | Tách core/features/shared rõ. Logic thuần TS tách khỏi component (expression, runs search/filter/sort). Standalone component, lazy wizard |
| Follow spec | 🟡 | Code khớp spec ở các điểm em kiểm. Nhưng spec **ghi luôn những quyết định cần bàn** (fail-open license, mock name/draft), nên "đúng spec" chưa chắc đúng nghiệp vụ |
| Test | 🔴 | **0 file `*.spec.ts`** trong optimization-ui trên nus-base. Rule OpenSpec FE cố ý "không yêu cầu unit test". Logic nặng (expression rules, runs search/filter/sort, license-modules, wizard state) không có test tự động |

## 1. Duplicate code

### 1.1 Clone có đăng ký (OK theo quy ước)
`precognize-workspace/ai_docs/CONVENTIONS.md` → "Reusing components in optimization-ui": cần thay đổi component ở `projects/shared` hoặc app khác thì **clone vào optimization-ui, không sửa bản gốc**, và ghi vào bảng "Cloned components".

| Clone | Nguồn | Dòng trùng | Nhận xét |
|-------|-------|-----------|----------|
| `shared/components/number-stepper` | `projects/shared/components/number-stepper` | khoảng 70 (ts gần như y hệt + scss 44+24 dòng) | Có lý do (thêm `clampTypedValue`, `decimals`). ⚠️ SCSS copy nguyên, không thay đổi gì |
| `shared/components/license/license-information-dialog` | admin-ui | html 9 + scss 34 | OK |
| `shared/components/license/upload-license-button` | admin-ui | html 9 | OK |
| `shared/components/empty-state` | portal | | OK |

**Rủi ro của cách này:** sửa bug ở bản gốc (ví dụ number-stepper làm tròn sai) thì phải nhớ sửa clone. Quy ước có điều 4 ("PR sửa nguồn phải kiểm tra clone"), nhưng chỉ dựa vào người review nhớ.
**Đề xuất:** thêm một script CI nhỏ đọc bảng Cloned components, so `git log` của file nguồn với "Source commit at clone time", rồi cảnh báo khi nguồn đã đổi.

### 1.2 Clone KHÔNG đăng ký (⚠️ vi phạm quy ước)
| File | Trùng với | Bằng chứng |
|------|-----------|-----------|
| `FE/core/services/interceptor/session-expired.util.ts` | `admin-ui/src/app/core/services/interceptor/session-expired.util.ts` | **Giống 100%**, cả comment |
| `FE/core/services/interceptor/httpconfig.interceptor.ts` | interceptor của admin/portal | header ghi "Clone of", không có trong bảng |
| `FE/core/services/optimization-login.service.ts` | login redirect của portal | header ghi "Clone of", không có trong bảng |
| `FE/core/services/optimization-header-*.service.ts` (5 file) | các service header của portal/admin | adapter cho shared header (em chưa so chi tiết với bản gốc, cần xem có copy logic không) |

- **Vì sao quan trọng:** BE đổi reason 405 (ví dụ thêm "Session expired") thì phải sửa ở 2–3 nơi. Bảng clone không có các file này nên không ai biết để sửa.
- **Đề xuất:** `isSessionExpiredError` không có thay đổi nào → theo chính quy ước (điều 3) phải **chuyển vào `projects/shared`** rồi import, không clone. Interceptor/login thì ghi thêm vào bảng.

### 1.3 Lặp logic trong chính optimization-ui (💬)
| Chỗ | Trùng | Đề xuất |
|-----|-------|---------|
| `side-drawer.component.ts:73` ↔ `sort-menu.component.ts:92` ↔ `scoped-search.component.ts:149` | 13–21 dòng: tạo CDK Overlay + backdrop + Escape + dispose | Tách `createDismissibleOverlay()` helper |
| `influencers-step.component.html:229` ↔ `step-placeholder.component.html:3` | 23 dòng footer Cancel/Previous/Next | Một component `wizard-footer` |
| `goal-step` và `influencers-step`: cùng pattern `createRequestState(tagDetails.getDetails…)` + `effect()` + retry + `isXIconLoading` | khoảng 30 dòng mỗi bên | Một service/hook `useTagDetails()` cho wizard |
| `LICENSE_UPLOAD_PATH = '/license/upload'` | hardcode ở 3 app (comment thừa nhận) | Thêm vào `ApiCallsPathsEnum` (rule tasks của OpenSpec FE yêu cầu vậy) |
| `uploadLicense()` | `OptimizationLicenseService` ≈ admin `LicenseService.uploadLicense` | Chấp nhận (clone có lý do), nhưng nên nằm trong bảng |

## 2. Structure

**Tốt:**
- `core/` (guard, interceptor, khởi động), `features/` (home, runs, model-wizard, shared-ui), `shared/` (components, services, state, expression, utils, mocks). Đúng cấu trúc trong `ai_docs/ARCHITECTURE.md`.
- Wizard lazy-load (`loadChildren`), state nằm trong service cấp page (`providers: [ModelWizardStateService]`), nên mỗi lần mở wizard có state mới.
- Logic thuần tách khỏi Angular: `shared/expression/*.ts`, `optimization-runs.{search,filter,sort,query}.ts`. Test được, dùng lại được.
- `createRequestState` + validate response `unknown` (`toDetails`): phòng thủ tốt.
- Playground `#/shared-ui` cho mọi component, hữu ích cho review UI và QC.

**Cần xem lại:**
| # | Vấn đề | Chỗ | Mức |
|---|--------|-----|-----|
| S1 | Mock trộn vào code production: `shared/mocks/optimization-mock-data.ts`, `optimization-runs.sample-data.ts` (461 dòng), `OptimizationModelService` mock. Không có cờ môi trường | `FE/shared/mocks`, `features/optimization-runs` | ⚠️ |
| S2 | `WIZARD_STEPS` có `operating-constraints` nhưng route không có, stepper hiện bước không mở được | `model-wizard.model.ts:14` vs `model-wizard.routes.ts` | 💬 |
| S3 | `QueryCacheService` viết xong, có test, **không ai dùng** (ai_docs tự ghi) | `FE/shared/state/query-cache.service.ts` | 💬 YAGNI |
| S4 | Wizard state chỉ trong RAM: không có `modelId` trên URL, nên không thể mở lại draft | `model-wizard-state.service.ts` | ⚠️ (chặn khi làm Edit/Draft) |
| S5 | `OptimizationTagDetail` bỏ field `units` mà BE trả, nên expression builder không có unit để check "same unit" | `shared/services/optimization-tag-details.service.ts` | ⚠️ |
| S6 | Kiểu FE và DTO BE không chung nguồn: direction `min/max` ↔ `MAXIMIZE/MINIMIZE`, function MEAN/DIFF/PROP không có ở BE | `model-wizard.model.ts`, `expression.model.ts` | ⚠️ (xem walkthrough §3) |
| S7 | Sửa `projects/shared` (license-modules, header, app-menu, access-denied) ảnh hưởng **portal + admin**. Hợp lý vì license dùng chung, nhưng cần test regression 3 app | `projects/shared/**` | 💬 |
| S8 | 33 component trong `FE/shared/components`, nhiều cái chỉ dùng 1 chỗ (direction-toggle, eye-toggle, segmented-control...). Không sai, nhưng "shared" đang thành nơi chứa mọi thứ | | 💬 |

## 3. Follow spec

Em đối chiếu các điểm chính (spec ở `precognize-workspace/openspec/`):

| Spec | Yêu cầu | Code | Khớp? |
|------|---------|------|-------|
| `shared-license-module-access` (op-9) | "Licence cannot be read → pages SHALL open as the preview does today" | guard `catchError → of(null)`, modules null → cho qua | ✅ khớp, nhưng **spec chọn fail-open**: cần khách/anhttl duyệt (review A) |
| `optimization-auth-access` | Upload sai → "Licence validation failed. The current licence remains active." | có key i18n + xử lý ở dialog clone | ✅ |
| op-13 design D8 | Tên trùng + draft = **mock**, fixtures `Mock Error`, `Mock Save Error` | `optimization-mock-data.ts` | ✅ khớp. Nhưng tên "mock error" sẽ lên build thật |
| op-13 | Improvement 0–20, cost 1.000–10.000.000, tên ≤100 | validators FE = constraints BE | ✅ |
| `optimization-tag-picker` | search theo tên + mô tả, độ dài tối thiểu từ config | FE mặc định 2, BE (#321) đặt 3 | ⚠️ lệch BE |
| op-16 | Non-goal: không UI, không API | đúng, chỉ có logic | ✅ |
| op-14 | influencer thiếu asset thì chặn ADD/NEXT | `isMissingAsset` + `influencersValid` | ✅ |
| `optimization-runs-page` | sample data requirement | runs service mock | ✅ |

Chỗ code có mà spec không có: retry tag details, `beforeunload` warning. Nhỏ, không sao.

## 4. Đề xuất ưu tiên (FE)
0. Đề xuất với anhttl: **bắt buộc unit test cho logic thuần** (`shared/expression`, `license-modules.ts`, `optimization-runs.*.ts`, `model-wizard-state.service`). Không cần test component. Hiện rule OpenSpec FE dòng "Do not require unit-test files" đang cấm ngầm việc này.
1. Chuyển `session-expired.util` vào `projects/shared` (không có thay đổi gì, nên đúng quy ước là phải dùng chung) + đăng ký các clone còn thiếu.
2. Tách mock ra sau 1 provider (`OPTIMIZATION_DATA_SOURCE`) hoặc cờ `environment`, để build production không mang fixture.
3. Hook `useTagDetails` dùng chung cho Goal/Influencers, giữ `units`.
4. Thống nhất kiểu với DTO BE (mapper một chỗ, có test) trước khi nối Save/Create.
5. Script kiểm tra clone bị lệch nguồn (bảng Cloned components).

## Câu hỏi chưa giải quyết
- Ai duyệt quyết định fail-open trong spec op-9 (khách hay chỉ team)?
- Có định gom các clone header-service về `projects/shared` khi deliver sang origin không? (origin chưa có optimization-ui)
