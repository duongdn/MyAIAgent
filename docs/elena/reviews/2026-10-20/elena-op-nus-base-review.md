# Elena OP: review code nhánh `nus-base` (20/10/2026)

**Phạm vi:** chỉ code team thêm/sửa trên `nus-base` so với `develop` của khách (merge `17f4f13174`). Bỏ openspec, docs, `*.spec.ts`, i18n, ảnh. Còn **342 file, +26.471 / −322 dòng, toàn bộ là FE** (`precognize-workspace`). Không xét PR.

**Cách làm:** quét tự động toàn bộ `optimization-ui` (191 file .ts/.html), đọc từng dòng phần **sửa vào code của khách** (portal, admin-ui, shared), đọc kỹ các file logic chính (`r-socket.service.ts`, `model-wizard-state.service.ts`, model/validator bước Goal, `optimization-legacy-config.service.ts`). Chưa chạy được build/lint (máy này không có `node_modules`).

## Tóm tắt

| Mức | Số | Nội dung |
|---|---|---|
| 🔴 | 0 | Không có lỗi chặn |
| ⚠️ | 3 | Hàm rỗng/TODO trong bản giao; code chết; API license lỗi thì mở hết module (fail-open) |
| 💬 | 5 | Trộn async/RxJS, trộn signal/BehaviorSubject, URL viết tay + `HttpClient` trực tiếp, input `id` thừa ở tooltip dùng chung, file quá dài |
| ✅ | | Không `console.*`, không `any`, không `innerHTML`, mọi subscribe đều có hủy, text đều qua translate, README/openspec/ai_docs không lọt vào bản giao |

**Sửa so với báo cáo standards 19/10:** `StepPlaceholderComponent` **có dùng** (route bước 3/4 ở M1), không phải code chết. `ManageInfluencerDialog` không còn trên nus-base.

## 1. Code của khách bị sửa (rủi ro cao nhất, đọc toàn bộ)

Team sửa 9 vùng code dùng chung của khách: auth guard + routing portal, interceptor admin-ui, license service (portal + admin), header + app-menu, custom-tooltip (dời từ portal sang `shared/`), custom-button, file-upload, `package.json`/`angular.json`.

### ⚠️ 1.1 Đọc license lỗi thì mọi module đều mở (fail-open)
- **Vấn đề:** `LicenseModulesService.isAvailable()` (`shared/services/license-modules/license-modules.service.ts`) trả `true` khi `modules` là `null`. `null` xảy ra khi `/license/status` lỗi (`update(null)` trong `tap.error` của portal `license.service.ts`) hoặc chưa cài license.
- **Tại sao quan trọng:** `AuthGuard` mới dùng hàm này để chặn route theo module (`appModule` trong `core-routing.module.ts`). API license chập chờn → người dùng không mua Dashboard/Advanced Tools vẫn vào được. Đây là logic license của khách, khách sẽ hỏi.
- **Cách sửa:** Xác nhận với BA đây có phải ý đồ ("không đọc được license thì không chặn", giống hành vi cũ). Nếu đúng thì ghi rõ trong spec và comment; nếu không thì chặn khi lỗi.

### 💬 1.2 Input `id` thừa ở `CustomTooltipComponent` (component dùng chung của khách)
- `shared/components/custom-tooltip/custom-tooltip.component.ts` thêm cả `@Input() tooltipId` **và** setter/getter `@Input() id`. Toàn bộ repo chỉ dùng `[tooltipId]` (`info.component.html:1`), không chỗ nào dùng `id`.
- Nếu sau này ai đặt `id="x"` lên `<vp-custom-tooltip>` thì host và hộp tooltip bên trong cùng mang id `x` → trùng id trong DOM, aria hỏng.
- **Cách sửa:** Bỏ setter `id`, chỉ giữ `tooltipId`.

### ✅ Còn lại ổn
- Dời `custom-tooltip` sang `shared/`: 4 file portal đổi import sang `@workspace-shared/...`, SCSS giữ nguyên 100%. Hành vi cũ giữ nguyên, chỉ thêm focus (bàn phím) và `role="tooltip"`.
- Interceptor admin-ui: tách `isSessionExpiredError()`, đồng thời bỏ `console.log` trùng của khách. Logic 405 giữ nguyên.
- `DefaultPageGuard`: trang gốc mở trang mặc định theo license, có `ACCESS_DENIED` dự phòng. Đọc license một lần mỗi lần điều hướng (`readOncePerNavigation`) để guard và trang dùng chung một request.
- `custom-button`: chỉ thêm `| undefined` vào kiểu, không đổi hành vi.

## 2. `optimization-ui` (app OP, 191 file)

### ⚠️ 2.1 Hàm rỗng / TODO trong bản đã giao
- `manage-models-drawer.component.ts`: 5 TODO. `onPause`, `onNewRun`, `onRunClick` rỗng; nút "PAUSE ALL RUN & EDIT" chỉ đóng dialog; `onEdit` không làm gì khi model không có run. `model-detail.component.ts`: 1 TODO.
- **Tại sao quan trọng:** Khách đã comment đúng chỗ này ở #5511 ("implementation?"). Ken trả lời giữ vì template đã bind. Nhưng người dùng bấm nút mà không có gì xảy ra, không báo gì.
- **Cách sửa:** Ẩn hoặc disable các nút chưa có chức năng (kèm tooltip "Coming soon") thay vì để handler rỗng.

### ⚠️ 2.2 Code chết (export nhưng không ai gọi)
| Hàm | File |
|---|---|
| `addFunctionTag`, `fromConditionSet`, `toConditionSet` | `shared/expression/expression.rules.ts` |
| `indexTags` | `shared/expression/expression.model.ts` |

Mỗi hàm chỉ có đúng 1 tham chiếu là chỗ khai báo. Khách hay bắt "unused" (vừa bắt ở #5512). Nếu để dành cho bước 3/4 (M2) thì nên đưa vào nhánh M2, không để ở nhánh giao M1.

### 💬 2.3 Trộn `async/await` với RxJS ở core
`initialize-optimization-header.ts`, `optimization-header-auth.service.ts`, `optimization-header-dialog.service.ts`, `optimization-legacy-config.service.ts`, `r-socket.service.ts` (`connectWithRetry`). Phần còn lại của app dùng Observable. Ở DP, khách đã yêu cầu dùng một kiểu. Một phần là bắt buộc (`APP_INITIALIZER` cần Promise), nhưng `openChangePasswordDialog`/`openUserManagementPopup` thì không.

### 💬 2.4 Trộn signal với BehaviorSubject trong cùng service
`model-wizard-state.service.ts`: `influencersSubject`/`savingSubject` (BehaviorSubject) cạnh `visibleAssetKeysState` (signal) rồi lại `toObservable()`. Comment ở `forgetRemovedAssets` ("a re-added asset starts hidden") ngược với `setInfluencers` ("Newly committed asset groups start visible").

### 💬 2.5 URL viết tay + `HttpClient` trực tiếp
`optimization-legacy-config.service.ts:31`: `` `${ApiCallsPathsEnum.BASE_URL}/configuration/interface` `` gọi qua `HttpClient`, không qua `HttpService` + enum như mọi chỗ khác. Nên thêm key vào `ApiCallsPathsEnum` (hoặc dùng key sẵn có của khách nếu có).

### 💬 2.6 File dài
`shared-ui-page.component.ts` 1.029 dòng (playground), `influencers-step.component.ts` 551, `optimization-runs.sample-data.ts` 461. Khách không có quy định độ dài, nhưng `influencers-step` nên tách (component tag picker / effect delay).

### ✅ Đã kiểm, ổn
- **Quét tự động:** 0 `console.*`, 0 kiểu `any`, 0 `innerHTML`/`bypassSecurity`, không text cứng trong HTML (trừ playground, đã trả lời khách).
- **Subscription:** 17 file không dùng `takeUntilDestroyed`, nhưng đã đọc từng file: đều tự `unsubscribe` ở `ngOnDestroy`/`disposeOverlay` hoặc là one-shot. Không có leak.
- **`r-socket.service.ts`:** retry 3 lần, timeout, hủy kết nối khi không còn ai dùng, xử lý mất kết nối. Mỗi app của khách cũng có RSocket service riêng (portal, admin-ui) nên không tính là trùng lặp.
- **Validator bước Goal khớp BE:** cost min/max 1.000–10.000.000, cặp min/max, improvement > 0. Default `0` + `||` nên không báo "chưa lưu" sai.
- **`localStorage.clear()` khi logout:** giống pattern của khách (portal, admin-ui).
- **Bản giao `#5511`:** không chứa README, openspec, ai_docs, `.claude`. Riêng `scripts/check-asset-boundaries.mjs` (script nội bộ) có đi theo bản giao, ⚠️ nên hỏi Ken có cố ý không.

## Câu hỏi còn mở
- BA: license đọc lỗi thì mở hết module (1.1) có phải ý đồ không?
- Ken: `scripts/check-asset-boundaries.mjs` + npm script `check:asset-boundaries` có định giao cho khách không?
- Ken: 4 hàm expression chưa dùng (2.2) để dành cho M2 hay xoá?
