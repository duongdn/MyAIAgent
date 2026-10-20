# Elena OP: review code nhánh `nus-base` (20/10/2026)

Nhờ mọi người xem và sửa các điểm dưới đây trên `nus-base`. Mức: ⚠️ nên sửa trước lần giao tới, 💬 sửa khi tiện.

## Tóm tắt

| # | Mức | Vấn đề | File |
|---|---|---|---|
| 1 | ⚠️ | Đọc license lỗi thì mọi module đều mở | `shared/services/license-modules/license-modules.service.ts` |
| 2 | ⚠️ | Nút bấm không làm gì (handler rỗng / TODO) | `manage-models-drawer.component.ts`, `model-detail.component.ts` |
| 3 | ⚠️ | 4 hàm export nhưng không ai gọi | `shared/expression/expression.rules.ts`, `expression.model.ts` |
| 4 | ⚠️ | Script nội bộ đi theo bản giao khách | `precognize-workspace/scripts/check-asset-boundaries.mjs`, `package.json` |
| 5 | 💬 | Input `id` thừa ở tooltip dùng chung | `shared/components/custom-tooltip/custom-tooltip.component.ts` |
| 6 | 💬 | Trộn `async/await` với RxJS | `core/services/*` |
| 7 | 💬 | Trộn signal với BehaviorSubject, comment mâu thuẫn | `model-wizard-state.service.ts` |
| 8 | 💬 | URL viết tay + `HttpClient` trực tiếp | `optimization-legacy-config.service.ts:31` |
| 9 | 💬 | File quá dài | `influencers-step.component.ts` |

## 1. ⚠️ Đọc license lỗi thì mọi module đều mở
- **Vấn đề:** `LicenseModulesService.isAvailable()` trả `true` khi `modules` là `null`. `modules` thành `null` khi `/license/status` lỗi (`update(null)` trong `tap.error` ở portal `license.service.ts`) hoặc chưa cài license.
- **Hậu quả:** `AuthGuard` dùng hàm này để chặn route theo module (`appModule` trong `core-routing.module.ts`). API license lỗi → người dùng không mua Dashboard/Advanced Tools vẫn vào được.
- **Cách sửa:** Nếu đây là ý đồ (không đọc được license thì không chặn, giống hành vi cũ), ghi rõ trong comment và spec. Nếu không, chặn khi đọc lỗi.

## 2. ⚠️ Nút bấm không làm gì
- **Vấn đề:** `manage-models-drawer.component.ts` có 5 TODO: `onPause`, `onNewRun`, `onRunClick` rỗng; nút "PAUSE ALL RUN & EDIT" chỉ đóng dialog; `onEdit` không làm gì khi model không có run. `model-detail.component.ts` có 1 TODO.
- **Hậu quả:** Người dùng bấm mà không có phản hồi. Khách đã hỏi đúng chỗ này ở #5511 ("implementation?").
- **Cách sửa:** Ẩn hoặc disable các nút chưa có chức năng (có thể kèm tooltip "Coming soon").

## 3. ⚠️ Hàm không ai gọi
| Hàm | File |
|---|---|
| `addFunctionTag`, `fromConditionSet`, `toConditionSet` | `shared/expression/expression.rules.ts` |
| `indexTags` | `shared/expression/expression.model.ts` |

- **Cách sửa:** Xoá khỏi `nus-base`. Nếu cần cho bước 3/4 thì để ở nhánh M2. Khách có bắt lỗi "unused" khi review.

## 4. ⚠️ Script nội bộ đi theo bản giao
- **Vấn đề:** `scripts/check-asset-boundaries.mjs` và npm script `check:asset-boundaries` có trong bản giao #5511.
- **Cách sửa:** Nếu chỉ dùng nội bộ thì đưa vào danh sách loại trừ khi giao; nếu muốn giao thì cần mô tả cho khách biết script làm gì.

## 5. 💬 Input `id` thừa ở tooltip dùng chung
- **Vấn đề:** `CustomTooltipComponent` (component dùng chung của khách) có cả `@Input() tooltipId` và setter `@Input() id`. Cả repo chỉ dùng `[tooltipId]` (`info.component.html:1`).
- **Hậu quả:** Ai đặt `id="x"` lên `<vp-custom-tooltip>` thì host và hộp tooltip bên trong cùng mang id `x`, gây trùng id trong DOM.
- **Cách sửa:** Bỏ setter `id`, chỉ giữ `tooltipId`.

## 6. 💬 Trộn `async/await` với RxJS
- **File:** `initialize-optimization-header.ts`, `optimization-header-auth.service.ts`, `optimization-header-dialog.service.ts`, `optimization-legacy-config.service.ts`, `r-socket.service.ts` (`connectWithRetry`).
- **Vấn đề:** Phần còn lại của app dùng Observable. Ở các dự án trước, khách đã yêu cầu dùng một kiểu.
- **Cách sửa:** Chuyển sang Observable những chỗ không bắt buộc Promise, ví dụ `openChangePasswordDialog`, `openUserManagementPopup`. `APP_INITIALIZER` thì giữ Promise.

## 7. 💬 Trộn signal với BehaviorSubject
- **Vấn đề:** Trong `model-wizard-state.service.ts`, `influencersSubject` và `savingSubject` là BehaviorSubject, còn `visibleAssetKeysState` là signal rồi lại chuyển bằng `toObservable()`.
- **Comment mâu thuẫn:** `forgetRemovedAssets` ghi "a re-added asset starts hidden", còn `setInfluencers` ghi "Newly committed asset groups start visible".
- **Cách sửa:** Chọn một kiểu cho state của service. Sửa lại comment cho đúng với code.

## 8. 💬 URL viết tay + `HttpClient` trực tiếp
- **Vấn đề:** `optimization-legacy-config.service.ts:31` gọi `` `${ApiCallsPathsEnum.BASE_URL}/configuration/interface` `` bằng `HttpClient`. Các chỗ khác đều dùng `HttpService` + key trong `ApiCallsPathsEnum`.
- **Cách sửa:** Thêm key vào `ApiCallsPathsEnum` (hoặc dùng key sẵn có của khách nếu có) và gọi qua `HttpService`.

## 9. 💬 File quá dài
`influencers-step.component.ts` dài 551 dòng. Nên tách phần tag picker và phần effect delay thành component riêng.

## Cần xác nhận
- BA: license đọc lỗi thì mở hết module (mục 1) có phải ý đồ không?
- Ken: script `check-asset-boundaries` (mục 4) có định giao cho khách không?
- Ken: 4 hàm ở mục 3 xoá hay chuyển sang M2?
