# Elena OP: rà soát vi phạm standard (19/10/2026)

## Nguồn rule
- **819 comment review của khách** trên các PR của NUS ở `Precognize/development` (kéo lại hôm nay bằng account `nusken`). Trong đó có **113 comment trên 10 PR của process-digital-plant (DP)**, chủ yếu của Vladimir-precog (97). Đây là FE Angular giống optimization-ui, và cũng là người đang review OP.
- **PR giao M1 FE #5511: Vladimir đã review hôm nay (19/10, 14:42–15:09)**, 9 comment. Mục 1.
- Quy ước nội bộ: `precognize-workspace/ai_docs/CONVENTIONS.md` (mục "optimization-ui delivery rules") và `docs/ai/CONVENTIONS.md` (BE).
- Code đối chiếu: FE `nus-op-m3` (`97e8906b90`), BE head #364 (`16e2a5bd`, gồm cả be-m1 và commit upsert mới), #362 (`6dbf55da`).
- Bỏ qua theo thỏa thuận: clone, unit test, `assert`, pattern chung của code khách.

## Tóm tắt

| # | Rule (nguồn) | Hiện trạng OP | Mức |
|---|---|---|---|
| 1 | Không để hàm rỗng / stub "out of scope" (#5511 "implementation?", DP "empty function") | **10 handler rỗng** chỉ có comment | 🔴 khách đã bắt |
| 2 | Không mock / sample data (#5511 "Do you need mocks?", DP "Why is MOCK_USERS_RESPONSE needed?") | 5 file sample + `shared/mocks/` | 🔴 khách đã bắt, **trái với quy ước nội bộ** |
| 3 | Mọi text qua translate, **kể cả playground `#/shared-ui`** (#5511) | Playground đang được miễn trong CONVENTIONS | 🔴 khách đã bắt, **trái với quy ước nội bộ** |
| 4 | SVG để trong file, không inline (#5511 "move svg to file") | `eye-toggle.component.html` | 🔴 khách đã bắt |
| 5 | Xoá code không dùng (DP "remove unused methods", "is this component used?") | 4 hàm export không ai gọi, 1 component không dùng, 2 component chỉ dùng ở playground | ⚠️ |
| 6 | Một kiểu async, ưu tiên RxJS thay Promise (DP 4539) | `async/await` + `Promise.race` ở 4 service core | ⚠️ |
| 7 | Hàm ngắn, tách nhỏ (DP: "too much logic for one method") | FE ổn (dài nhất 52 dòng). **BE**: `validateUpsert` 138 dòng, `upsert` 75 dòng | ⚠️ |
| 8 | Không validate trùng giữa gateway và service (BE 5293) | #364 kiểm page/size ở cả 2 tầng, `MAX_PAGE_SIZE = 100` khai báo 2 lần | ⚠️ |
| 9 | Không sửa dữ liệu (mutate) bên trong chuỗi reactive (BE 4823) | #364 `enrichTargetTags` sửa list `items` trong `doOnNext` | ⚠️ |
| 10 | Không dùng `Optional` trong code reactive (BE 4885) | `Mono<Optional<Integer>>` (#364), `singleOptional()` ở upsert | 💬 |
| 11 | URL qua `ApiCallsPathsEnum` + `HttpService` (CONVENTIONS, DP) | 1 URL viết tay, 3 chỗ gọi `HttpClient` trực tiếp | 💬 |
| 12 | Không đưa thay đổi không liên quan vào PR (BE 4435, 4553) | BE xoá 3 dòng trống ở `DaeObjectMapperConfiguration` (service investigation) | 💬 |
| 13 | Tránh ternary lồng nhau (DP 4544) | 3 chỗ ngoài playground | 💬 |
| 14 | Comment đúng sự thật / không thừa (DP "remove comments") | Comment mô tả unique index không tồn tại (`DaeOptimizationModelDocument.java:23`) | 💬 |

**DuongDN cần làm ngay:**
1. **Quyết định 2 chỗ quy ước nội bộ trái với khách** (mục 1.2): khách hỏi lại mock và text chưa translate trong playground. CONVENTIONS đang ghi là được phép. Hoặc trả lời khách lý do (app đang phát triển, playground là công cụ dev), hoặc gỡ khỏi bản giao. Đây là PR đang mở, nên trả lời sớm.
2. Giao Ken (người tạo #5511) sửa 4 điểm khách đã comment (mục 1.1) và gỡ các stub tương tự còn lại.
3. Đưa các rule mới (mục 4) vào checklist review cho cả team, vì Vladimir sẽ review từng milestone.

## 1. Review của khách trên #5511 (giao M1 FE)
https://github.com/Precognize/development/pull/5511 (chưa merge, 8 review dạng COMMENTED)

### 1.1 Các comment và việc cần làm
| File | Khách nói | Việc cần làm |
|---|---|---|
| `manage-models-drawer.component.ts:197-207` | "check whether these onPause onNewRun onRunClick are needed" | Bỏ handler và binding trên template. Nút chưa có chức năng thì ẩn hoặc disable |
| `manage-models-drawer.component.ts:193` | "implementation?" (dialog "PAUSE ALL RUN & EDIT" chỉ đóng lại) | Như trên |
| `optimization-runs-page.component.ts:156, 252-266` | "implementation?", "same" | 5 handler rỗng: `onNewRun`, `onRunMore`, `onRunOpen`, `onRunInfluencers`, `onRunRecommendations` |
| `manage-models.sample-data.ts`, `optimization-runs.sample-data.ts` | "Do you need mocks?", "need?" | Xem mục 1.2 |
| `shared-ui/form-field-preview.component.ts`, `shared-ui-page.component.html` | "pls add translate", "translate" | Xem mục 1.2 |
| `eye-toggle.component.html:20` | "move svg to file" | Đưa SVG ra file `.svg` trong assets, dùng `<img>` / mat-icon như các icon khác |

**Tại sao quan trọng:** Đây là cùng kiểu comment Vladimir đã viết trên PR DP #4539: nhiều vòng "not fixed", "I don't see any changes", cuối cùng PR bị kéo dài. Với fixed-cost, mỗi vòng sửa là effort không tính tiền.

### 1.2 Hai chỗ quy ước nội bộ trái với khách
- **Mock:** CONVENTIONS rule 2 ghi "Mock data: not restricted while the app is in development… Every other page keeps bundled sample data, in every build". Khách hỏi thẳng "Do you need mocks?". Trước đây ở DP khách đã bắt gỡ `MOCK_USERS_RESPONSE`.
- **Playground `#/shared-ui`:** CONVENTIONS ghi "Rule 1 does not apply to its own demo text". Khách yêu cầu translate.
- **Cách xử lý đề xuất:** trả lời trên PR: (a) sample data chỉ phục vụ màn hình chưa có API, sẽ thay ở milestone sau, hoặc (b) gỡ hẳn khỏi bản giao: ẩn route Runs/Manage Models và playground khỏi build giao khách. Cập nhật CONVENTIONS theo quyết định, để team không tiếp tục làm theo quy ước cũ.

### 1.3 Các stub còn lại (khách chưa comment nhưng sẽ gặp)
- `model-detail.component.ts:70` `// TODO(OP-27): replace with the rule from the full ticket.`
- `manage-models-drawer.component.ts:183` (Edit model chưa làm).
- Tổng cộng 11 TODO/"out of scope" trong code FE.

## 2. FE (optimization-ui, `nus-op-m3`)

### 2.1 ⚠️ Code không dùng
- **Hàm export không ai gọi** (chỉ có định nghĩa): `addFunctionTag`, `fromConditionSet`, `toConditionSet` (`shared/expression/expression.rules.ts`), `indexTags` (`shared/expression/expression.model.ts`). `toConditionSet/fromConditionSet` là mapper sẽ dùng khi nối API lưu condition set. Hoặc nối luôn (BE đã có), hoặc tạm bỏ khỏi bản giao.
- **Component không dùng:** `StepPlaceholderComponent` (`features/model-wizard/steps/step-placeholder/`). Các bước đã có component thật.
- **Component chỉ dùng trong playground:** `app-active` (`shared/components/active/`), `ManageInfluencerDialogComponent`. Khách DP: "is this component used?", "remove unused methods".

### 2.2 ⚠️ Trộn Promise/async với RxJS
- `core/services/optimization-legacy-config.service.ts:28`, `optimization-header-auth.service.ts:54`, `initialize-optimization-header.ts:65-77` (`await Promise.race` + `setTimeout`), `r-socket/r-socket.service.ts:185-196`.
- Khách DP #4539: *"use a single async style (async/await or RxJS)"*, *"usually we prefer to use rxjs instead of promise"*.
- `APP_INITIALIZER` cần Promise, nên `initialize-optimization-header.ts` có lý do. Nên đổi 2 service còn lại sang Observable, hoặc ghi chú vì sao.

### 2.3 💬 URL và HTTP
- `optimization-legacy-config.service.ts:31` ``this.http.get(`${ApiCallsPathsEnum.BASE_URL}/configuration/interface`)``: đường dẫn viết tay. Thêm vào `ApiCallsPathsEnum`.
- `HttpClient` gọi trực tiếp ở `optimization-license.guard.ts:122`, `optimization-legacy-config.service.ts`, `initialize-optimization-header.ts:78`. CONVENTIONS: "Always go through `HttpService`". Lúc app khởi động có thể chưa dùng được `HttpService` (interceptor), nên cần ghi lý do trong code. Guard thì nên dùng `HttpService`.

### 2.4 💬 Khác
- Ternary lồng nhau: `model-run-row.component.ts:46`, `optimization-model-item.component.ts:206` (cùng một logic `'none' | 'new' | 'default'` viết 2 lần), `model-wizard-page.component.ts:104`.
- `$any(token)` ×10 trong `expression-view.component.html`: đã có trong CONVENTIONS rule 10. Khách DP/portal từng hỏi "can we add typing here?".

### 2.5 Đã đạt
Không `console.log`, không code comment-out, không text cứng ngoài playground, ngày tháng qua `optimizationDate`, không `DatePipe`/`formatDate`, không ghép chuỗi để tạo text, không file environment chứa dữ liệu cá nhân, method ngắn (dài nhất 52 dòng).

## 3. BE (optimization service + gateway)

### 3.1 ⚠️ Validate trùng ở gateway và service (#364)
- `DaeApiOptimizationModelController.list` kiểm `page >= 0`, `size >= 1`, cắt `Math.min(size, MAX_PAGE_SIZE)`. `DaeOptimizationModelControl.resolvePage/resolveSize` làm lại y hệt, với `MAX_PAGE_SIZE = 100` khai báo lần nữa.
- Khách (PR 5293): *"you already checked if the values are null in controller. no need to validate them again."*
- **Cách sửa:** giữ một nơi (service), gateway chỉ chuyển tiếp.

### 3.2 ⚠️ Sửa dữ liệu bên trong chuỗi reactive (#364)
- `enrichTargetTags`: `.doOnNext(details -> items.forEach(item -> item.setTargetTag(...)))`, tức là sửa list `items` được truyền từ ngoài vào trong `doOnNext`.
- Khách (PR 4823): *"The list is mutated inside the reactive chain. This introduces side effects and makes the flow harder to reason about."*
- **Cách sửa:** `map` ra list mới (`items.stream().map(item -> item.toBuilder().targetTag(...).build())`) rồi trả về.

### 3.3 ⚠️ Hàm quá dài
- `DaeOptimizationModelConstraints.validateUpsert`: **138 dòng**, một `switch` với 4 nhánh lớn. `DaeOptimizationModelControl.upsert`: 75 dòng lồng nhiều lớp lambda.
- Khách (PR 4799): *"consider move validation to separated class"*. DP: *"too many code for one method, separate the logic to a couple of methods with clear names"*.
- **Cách sửa:** tách mỗi bước thành 1 hàm `validateGoal/validateInfluencers/validateConditionSets`.

### 3.4 💬 Optional trong code reactive
`Mono<Optional<Integer>> licenseCapacity()` (#364), `storedDraft.singleOptional()` trong upsert. Khách (PR 4885): *"Optional breaks the style of reactive"*. Có thể dùng `Mono.empty()` + `defaultIfEmpty`.

### 3.5 💬 Khác
- **Thay đổi không liên quan:** `services/microservices-investigation/.../DaeObjectMapperConfiguration.java` chỉ xoá 3 dòng trống. Khách: *"please move formatting changes to develop"*.
- **Route gateway viết literal:** `String.join(".", "optimization", "model", "upsert")` lặp ở 2 hàm. Service đã có `BASE_URL = "optimization.model"`. CONVENTIONS BE: *"BASE_URL constant in both gateway control and service controller — keep them in sync"*.
- **Comment sai sự thật:** `DaeOptimizationModelDocument.java:23` nói về unique index không tồn tại. Field `Boolean deleted` vẫn còn dù OP-26 đã bỏ soft-delete (#364 lại dùng nó).
- `DaeAmqpMessageSender` có mà không ai dùng. Nếu để chờ tích hợp thuật toán thì ghi chú, vì khách sẽ hỏi.
- `logback.xml` của optimization thiếu dòng trống cuối file.
- Còn 1 chỗ `e.getMessage()` (`DaeOptimizationModelControl` upsert).

### 3.6 Đã đạt
Migration có ở cả new-customer và existing-customer (9.5). Joda DateTime. Không class request 1 field mới. Không magic string loại license. Gateway mỏng, logic ở service. Mapper MapStruct đúng quy ước tên.

## 4. Rule mới rút ra từ DP và review gần đây (thêm vào checklist)
Các rule chưa có trong checklist 09/10:

**FE**
1. Không để hàm rỗng hay stub "out of scope". Nút chưa có chức năng thì không gắn handler.
2. Playground và mọi màn hình trong bản giao đều phải translate.
3. SVG để trong file, không inline trong template. Không dùng emoji thay icon (DP: "maybe there is svg for ➕?").
4. Xoá method, component, import không dùng.
5. Một kiểu async (ưu tiên RxJS). `ngOnInit` chỉ gọi các hàm con. Không viết subscribe dài inline.
6. Hàm dài thì tách. Hai hàm gần giống nhau thì gộp. Template lặp thì dùng `ng-template`. Class Tailwind/CSS lặp thì dùng `@apply`.
7. Một kiểu viết trong cùng một file (ví dụ `if (x) { return; }` và `if (x) return;` không trộn).
8. Không `if`/`else` rỗng, không ternary lồng nhau, không kiểm null thừa (`!== null && !== undefined`, `trim()` trên id không thể null).
9. So sánh trạng thái bằng Enum (`ConnectionType`, `INTERNAL_TAG_TAB.AVAILABLE`), không bằng chuỗi.
10. FE không lặp logic của BE (ví dụ BE đã xử lý `***`).
11. Không giá trị mặc định "rơi rớt" (`id = '1'`), không dữ liệu test trong template, không file environment có dữ liệu cá nhân, không `yarn.lock`/file không liên quan.
12. Giới hạn (kích thước file, độ dài) phải báo cho người dùng khi vượt.
13. Biến trong text dịch dùng tham số (`{year}`), không nối chuỗi.
14. Comment viết bằng tiếng Anh, không comment thừa, không sai chính tả.

**BE**
15. Không validate lặp ở gateway và service.
16. Không mutate dữ liệu trong chuỗi reactive. Không `block()`. Không `collectList()` không giới hạn trên tập dữ liệu lớn.
17. Không `Optional` trong code reactive. Dùng `boolean` thay `Boolean` khi không cần null.
18. Dùng `CollectionUtils.isEmpty`/`StringUtils.isNotBlank` thay kiểm tay.
19. Validate lớn thì tách class/hàm riêng. Tên class không quá dài.
20. Route dùng hằng `BASE_URL`, `serviceName` đã khai báo.
21. Không log lỗi 2 lần cho cùng một exception.
22. Timezone theo cấu hình datasource/plant, không theo mặc định của JVM.

## Câu hỏi còn mở
- DuongDN/anhttl: với #5511, trả lời khách giữ sample data và playground (lý do đang phát triển) hay gỡ khỏi bản giao?
