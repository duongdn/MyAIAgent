# Code review: `nus-base` (20/10/2026)

**Branch:** `nus-base` @ `ff36446477`
**Reviewer:** DuongDN

Đường dẫn trong báo cáo được viết tắt như sau:
- `OPT/` = `precognize-workspace/projects/optimization-ui/src/app/`
- `WS/` = `precognize-workspace/projects/`

**Mức độ:**
- 🔴 **Blocker:** phải sửa.
- ⚠️ **Major:** sửa trước lần giao tới.
- 💬 **Minor:** sửa khi tiện.

## Tóm tắt

| # | Mức | Vị trí | Vấn đề |
|---|---|---|---|
| 1 | ⚠️ | `WS/shared/services/license-modules/license-modules.service.ts:63` | Đọc license lỗi thì mọi module đều được phép |
| 2 | ⚠️ | `OPT/features/optimization-runs/manage-models/manage-models-drawer/manage-models-drawer.component.ts:181-207` | Handler rỗng, nút bấm không có phản hồi |
| 3 | ⚠️ | `OPT/shared/expression/expression.rules.ts:86,152,174`, `expression.model.ts:118` | Hàm export không được dùng |
| 4 | ⚠️ | `precognize-workspace/package.json:8` | Script nội bộ nằm trong bản giao |
| 5 | 💬 | `WS/shared/components/custom-tooltip/custom-tooltip.component.ts:49-57` | Input `id` thừa |
| 6 | 💬 | `OPT/core/services/optimization-header-dialog.service.ts:32,40` | Dùng `async/await` thay vì Observable |
| 7 | 💬 | `OPT/features/model-wizard/services/model-wizard-state.service.ts:132,283` | Comment mâu thuẫn; trộn signal với BehaviorSubject |
| 8 | 💬 | `OPT/core/services/optimization-legacy-config.service.ts:31` | URL viết tay, gọi `HttpClient` trực tiếp |
| 9 | 💬 | `OPT/features/model-wizard/steps/influencers/influencers-step.component.ts` | File 551 dòng |

---

## 1. ⚠️ Đọc license lỗi thì mọi module đều được phép

**Vị trí:**
- `WS/shared/services/license-modules/license-modules.service.ts:61-63`
- `WS/precognize-portal/src/app/shared/services/license/license.service.ts:46`
- `WS/precognize-portal/src/app/core/services/Auth/auth-guard.guard.ts:35`

```ts
// license-modules.service.ts
isAvailable(module: AppModuleEnum): boolean {
  const modules = this.modulesSubject.value;
  return !modules || modules.includes(module);   // modules = null → true
}

// license.service.ts:46
error: () => this.licenseModulesService.update(null)
```

**Vấn đề:**
- `/license/status` lỗi → `modules = null` → `isAvailable()` trả `true` cho mọi module.
- `AuthGuard` dùng hàm này để chặn route theo `appModule`, nên guard cho qua tất cả.

**Hậu quả:** Khi API license lỗi, người dùng không có license Dashboard/Advanced Tools vẫn mở được các trang này.

**Đề xuất:** Tách trường hợp "chưa cài license" và trường hợp "đọc lỗi". Khi đọc lỗi thì chặn, hoặc giữ danh sách module đọc được lần trước:

```ts
error: () => this.licenseModulesService.markReadFailed()   // isAvailable() → false
```

Nếu cho qua khi lỗi là ý đồ của sản phẩm, ghi rõ trong comment của `isAvailable()` và trong spec.

---

## 2. ⚠️ Handler rỗng, nút bấm không có phản hồi

**Vị trí:** `OPT/features/optimization-runs/manage-models/manage-models-drawer/manage-models-drawer.component.ts`. Template bind ở `manage-models-drawer.component.html:56-59`.

| Dòng | Handler | Hiện trạng |
|---|---|---|
| 181-184 | `onEdit()` | Model không có run active thì `return`, không làm gì |
| 192-194 | `onEdit()` → `.subscribe(() => {})` | Nút "PAUSE ALL RUN & EDIT" chỉ đóng dialog |
| 197-199 | `onPause()` | Rỗng |
| 201-203 | `onNewRun()` | Rỗng |
| 205-207 | `onRunClick()` | Rỗng |

```ts
onPause(): void {
  // TODO(OP-27): pausing a model's runs is not defined yet.
}
```

**Vấn đề:** Nút vẫn hiện và vẫn bấm được nhưng không có gì xảy ra, không có thông báo. Khách đã comment đúng các dòng này ở #5511 ("implementation?").

**Đề xuất:** Khi chưa có chức năng, đưa trạng thái disable vào `app-model-detail` (ví dụ input `[actionsEnabled]`), disable nút và hiện tooltip "Coming soon". Bỏ `subscribe` rỗng ở dòng 192.

---

## 3. ⚠️ Hàm export không được dùng

| Hàm | Vị trí |
|---|---|
| `addFunctionTag` | `OPT/shared/expression/expression.rules.ts:86` |
| `toConditionSet` | `OPT/shared/expression/expression.rules.ts:152` |
| `fromConditionSet` | `OPT/shared/expression/expression.rules.ts:174` |
| `indexTags` | `OPT/shared/expression/expression.model.ts:118` |

**Vấn đề:** Ngoài chỗ khai báo, không file nào (trừ test) gọi các hàm này.

**Đề xuất:** Xoá khỏi `nus-base` cùng test của chúng. Nếu bước 3/4 cần, đưa vào nhánh M2.

---

## 4. ⚠️ Script nội bộ nằm trong bản giao

**Vị trí:** `precognize-workspace/package.json:8`, `precognize-workspace/scripts/check-asset-boundaries.mjs`

```json
"check:asset-boundaries": "node scripts/check-asset-boundaries.mjs",
```

**Vấn đề:** Script và npm script này có trong bản giao #5511.

**Đề xuất:** Nếu chỉ dùng nội bộ, thêm vào danh sách loại trừ khi giao. Nếu giao cho khách, ghi mô tả trong PR giao.

---

## 5. 💬 Input `id` thừa ở `CustomTooltipComponent`

**Vị trí:** `WS/shared/components/custom-tooltip/custom-tooltip.component.ts:47-57`

```ts
@Input() tooltipId: string = '';

@Input()
set id(value: string) {
  if (!this.tooltipId) {
    this.tooltipId = value;
  }
}
get id(): string {
  return this.tooltipId;
}
```

**Vấn đề:**
- Cả repo chỉ dùng `[tooltipId]` (`WS/shared/components/info/info.component.html:1`), không chỗ nào dùng `id`.
- Nếu đặt `id="x"` lên `<vp-custom-tooltip>`, cả host lẫn hộp tooltip bên trong (`[attr.id]="tooltipId"`) đều mang id `x`, gây trùng id trong DOM.

**Đề xuất:** Xoá setter/getter `id` (dòng 49-57). Component này là của khách, càng ít thay đổi API càng tốt.

---

## 6. 💬 Dùng `async/await` thay vì Observable

**Vị trí:** `OPT/core/services/optimization-header-dialog.service.ts:32,40,47`

```ts
async openChangePasswordDialog(): Promise<void> {
  if (await this.redirectGuest() || this.authService.user.isAdUser) {
```

**Vấn đề:** Phần còn lại của app dùng Observable. Khách đã yêu cầu thống nhất một kiểu ở các review trước.

**Đề xuất:** Chuyển `redirectGuest()`, `openChangePasswordDialog()`, `openUserManagementPopup()` sang Observable. Riêng hàm cho `APP_INITIALIZER` (`initialize-optimization-header.ts:44`) được giữ Promise.

---

## 7. 💬 Comment mâu thuẫn; trộn signal với BehaviorSubject

**Vị trí:** `OPT/features/model-wizard/services/model-wizard-state.service.ts`

```ts
// :132
// Newly committed asset groups start visible; an existing group keeps its choice.

// :283
// Drops eye states of assets that are no longer in the list, so a re-added asset starts hidden.
```

**Vấn đề:**
- Dòng 283 ngược với dòng 132 và ngược với code: asset thêm lại sẽ được `setInfluencers()` đặt là visible.
- Trong cùng một service, state dùng hai cơ chế:
  - `savingSubject` (:51) và `influencersSubject` (:71) là BehaviorSubject.
  - `visibleAssetKeysState` (:79) là signal, rồi lại chuyển sang Observable bằng `toObservable` (:81).

**Đề xuất:**
- Sửa comment dòng 283 thành: "…so a re-added asset is treated as new and starts visible."
- Thống nhất một cơ chế state cho service này.

---

## 8. 💬 URL viết tay, gọi `HttpClient` trực tiếp

**Vị trí:** `OPT/core/services/optimization-legacy-config.service.ts:1,13,31`

```ts
this.http.get(`${ApiCallsPathsEnum.BASE_URL}/configuration/interface`)
```

**Vấn đề:** Các service khác đều gọi qua `HttpService` với key trong `ApiCallsPathsEnum`.

**Đề xuất:**

```ts
// apiCallsPathsEnum.ts
CONFIGURATION_INTERFACE = '/configuration/interface',

// optimization-legacy-config.service.ts
this.httpService.get(ApiCallsPathsEnum.CONFIGURATION_INTERFACE)
```

Nếu enum của khách đã có key cho path này thì dùng key đó.

---

## 9. 💬 File quá dài

**Vị trí:** `OPT/features/model-wizard/steps/influencers/influencers-step.component.ts` (551 dòng)

**Đề xuất:** Tách phần tìm và chọn tag, và phần chỉnh effect delay, thành component con.

---

## Cần xác nhận
- **BA:** khi đọc license lỗi thì cho vào mọi module (mục 1) có phải ý đồ của sản phẩm không?
- **Ken:** script `check-asset-boundaries` (mục 4) có giao cho khách không?
- **Ken:** 4 hàm ở mục 3 xoá đi, hay chuyển sang M2?
