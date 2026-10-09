# Elena OP: việc cần sửa cho team FE (optimization-ui)

> Gửi: samht, trinm (FE). Người review: DuongDN. Cập nhật 09/10/2026.
> Code đối chiếu: `nus-base` `a288733a18`. Viết tắt `FE/` = `precognize-workspace/projects/optimization-ui/src/app/`
> Phạm vi: chỉ code OP. Component clone (theo quy ước "Cloned components") **không tính** là duplicate. Không review unit test.

Các mục 🔴 là những lỗi **khách đã từng bắt sửa** trong các PR trước (dẫn nguồn ở từng mục). Khi deliver mà còn các lỗi này, khách sẽ trả về.

## Tóm tắt

| # | Việc | Mức | Khi nào |
|---|------|-----|---------|
| 1 | Mọi text trong template đi qua translate | 🔴 | Trước khi deliver |
| 2 | Bỏ mock khỏi code delivery | 🔴 | Trước khi deliver |
| 3 | Khớp kiểu dữ liệu với BE (direction, cost, function, OR, units) | 🔴 | Trước khi nối Save/Create |
| 4 | Date format lấy từ configuration | ⚠️ | PR tới |
| 5 | Loại đo (tag type) và icon lấy từ API | ⚠️ | PR tới |
| 6 | Gộp 6 interface "tag" thành 1 | ⚠️ | PR tới |
| 7 | Không gọi function trong template | ⚠️ | PR tới |
| 8 | Độ dài search tối thiểu = 3 (khớp BE) | ⚠️ | PR tới |
| 9 | Wizard state có `modelId` trên URL | ⚠️ | Khi làm Edit/Draft (op-26) |
| 10 | Gom code lặp trong optimization-ui | 💬 | Khi tiện |

---

## 1. Text không qua translate 🔴

**Khách từng nói:** *"We use translation pipe for all kinds of texts in templates"*, *"please use translate"* (PR 4454).

**Chỗ cần sửa:**
- `FE/features/optimization-runs/optimization-runs-page.component.html:80,89,95`: "No optimization runs match the selected filters", "No Optimization Runs Available", "New Run"
- `FE/shared/components/table-actions-header/table-actions-header.component.html:22,36,51,76`: "Suspend Selected Runs", "Manage Models", "Sort by", "Filters"
- `FE/shared/components/recommendations-button/recommendations-button.component.html:10`: "Recommendations"
- `FE/features/optimization-runs/optimization-runs.filters.ts:29-31`: label của filter
- `aria-label` trong pagination, sort-menu, tag-picker, `app.component`
- PR #325: `pauseLabel` (`'Pause Run' : 'Pause'`), tooltip `text="Run Now"`

**Cách sửa:** thêm key i18n, dùng `| translate` như wizard (Goal/Influencers) đang làm đúng.

- [ ] Xong

## 2. Mock nằm trong code 🔴

**Khách từng hỏi:** *"Why is MOCK_USERS_RESPONSE needed?"* (PR 4539).

**Chỗ cần sửa:**
- `FE/shared/mocks/optimization-mock-data.ts` (có tên "Mock Error", "Mock Save Error" sẽ hiện trên build thật)
- `FE/features/optimization-runs/optimization-runs.sample-data.ts` (461 dòng)
- `OptimizationModelService`: check tên trùng và save draft đang là mock
- Mock run/model thêm ở PR #325, #328

**Cách sửa:** nối API thật khi BE có. Trong lúc chờ, để mock sau 1 provider (ví dụ `OPTIMIZATION_DATA_SOURCE`) hoặc cờ `environment`, sao cho build delivery không mang fixture.

- [ ] Xong

## 3. Kiểu dữ liệu FE lệch với BE 🔴

Hiện tại FE gửi lên BE sẽ bị từ chối hoặc lưu sai. Đã kiểm trên test env.

| Field | FE | BE | Cần làm |
|-------|----|----|---------|
| direction | `min` / `max` | `MINIMIZE` / `MAXIMIZE` | Map trong mapper |
| Cost bỏ trống | gửi `0` | yêu cầu 1.000–10.000.000 | Không gửi, hoặc chặn ở form. Chốt với BA |
| Hàm expression | có `MEAN`, `DIFF`, `PROP` | không có | Chốt với BE/BA: BE thêm, hoặc FE ẩn |
| Logical operator | cho chọn `OR` | chỉ nhận `AND` | Chốt với BA, tạm ẩn `OR` |
| `units` của tag | bỏ field khi đọc `tags/details` (`optimization-tag-details.service.ts`) | có trả | Giữ `units`, expression builder cần để check "same unit" |

**Cách sửa:** một mapper FE ↔ DTO BE duy nhất (có test), dùng chung cho create/upsert. Không tự định nghĩa contract ở FE. Contract lấy theo spec BE (đang chờ BE viết).

- [ ] Mapper
- [ ] Giữ `units`
- [ ] Chốt cost/function/OR với BA (vytth)

## 4. Date format hardcode ⚠️

**Khách từng nói:** *"we definitely need to use format from configuration"* (PR 4750). anhttl nhắc lại trong room 07/10.

- `FE/shared/components/optimization-model-item/optimization-model-item.component.ts:62`: `DATE_TIME_FORMAT = 'MM/dd/yyyy HH:mm'` → lấy từ configuration service.

- [ ] Xong

## 5. Loại đo hardcode ⚠️

**Khách/anhttl (29/07):** text và icon trạng thái phải lấy từ API, không hardcode.

- `optimization-model-item.component.ts:17`: `OptimizationTagType = 'speed' | 'pressure' | …` và icon theo type. Plant có measurement type riêng (Temperature, Level, Conductivity…), icon base64 có sẵn trong `tags/details`.

- [ ] Xong

## 6. Sáu interface cho cùng "tag" ⚠️

**Khách từng nói:** *"you are creating the same interface but with different names… use the single"* (PR 4539).

- `OptimizationTagOption`, `OptimizationTargetTag`, `OptimizationTagDetail`, `ExpressionTag`, `RunTag`, `WizardInfluencer['tag']`
- **Cách sửa:** 1 `OptimizationTag`, chỗ nào cần ít field hơn thì dùng `Pick`/`Partial`.

- [ ] Xong

## 7. Gọi function trong template ⚠️

**Khách từng nói:** *"Try to avoid calling functions from the template… functionCallPipe"* (PR 4544).

- `influencers-step.component.html`: `isMissingAsset(influencer)`, `isVisible(group)`, `hasHistory(group)`, `isTagIconLoading`, `isAssetIconLoading`, `orderError(delay)`
- `optimization-goal-step.component.html`: `costOrderError()`, `isTargetIconLoading(tag)`
- Khoảng 20 chỗ. Đọc signal (`detailsState()`) thì không tính.
- **Cách sửa:** `functionCallPipe` (đã có ở admin/portal) hoặc `computed()`.

- [ ] Xong

## 8. Search tối thiểu 3 ký tự ⚠️

- FE tag-picker cho search từ 2 ký tự, BE (#321) yêu cầu ≥3, nên gõ 2 ký tự không ra kết quả mà không báo gì.
- **Cách sửa:** đặt mặc định 3 (hoặc lấy từ config), hiện gợi ý "nhập ít nhất 3 ký tự".

- [ ] Xong

## 9. Wizard state chỉ nằm trong RAM ⚠️

- `model-wizard-state.service.ts`: không có `modelId` trên URL, nên reload là mất, không mở lại draft được.
- **Cách làm (khi nối op-26):** route `#/models/:id/edit/<step>`, mỗi step load/save qua upsert.
- `model-wizard.model.ts:14` có step `operating-constraints` nhưng `model-wizard.routes.ts` chưa có route: stepper hiện bước không mở được. Thêm placeholder hoặc ẩn.

- [ ] Xong

## 10. Code lặp nội bộ 💬

| Chỗ | Đề xuất |
|-----|---------|
| Overlay (CDK + backdrop + Escape + dispose) ở `side-drawer.component.ts:73`, `sort-menu.component.ts:92`, `scoped-search.component.ts:149` | Helper `createDismissibleOverlay()` |
| Footer Cancel/Previous/Next ở `influencers-step.component.html:229` và `step-placeholder.component.html:3` | Component `wizard-footer` |
| Pattern tag-details + retry + icon loading ở goal-step và influencers-step | Service dùng chung (giữ `units`, xem mục 3) |
| `QueryCacheService` không ai dùng | Bỏ |
| 4 chỗ `any` (`app.module.ts:24`, `initialize-optimization-header.ts:75`, interceptor) | Thêm type |

---

## Những gì đang làm tốt (giữ nguyên)
- Wizard Goal/Influencers dùng translate đúng.
- Không gọi API trùng: license đọc 1 lần mỗi navigation, tag details gọi theo lô.
- Toàn bộ standalone component, wizard lazy-load, state theo page.
- Logic thuần (expression, runs search/filter/sort) tách khỏi component.
- Không `console.log`, không code comment-out.
