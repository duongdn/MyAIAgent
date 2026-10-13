# Elena OP: review lại sau 09/10 (13/10/2026)

> Code: `nus/nus-base` `c18d945d4f` (116 commit kể từ lần review trước `a288733a18`), `nus/feature/optimization`, và 5 PR đang mở.
> Đối chiếu với: [FE action items](../2026-10-09/elena-op-fe-team-action-items.md) · [BE action items](../2026-10-09/elena-op-be-team-action-items.md) · [quy tắc review của khách](../2026-10-09/elena-op-customer-review-rules-compliance.md).
> Repo: https://github.com/nustechnology/Elena-SamGuard-Digital-Plant

## Tóm tắt

| Mảng | Kết quả |
|------|---------|
| **FE** | Team đã xử lý theo file action items qua PR #332. Trong 10 việc: **5 đã xong** (translate, date format, gộp interface tag, function trong template, search tối thiểu 3 ký tự), **3 xong một phần**, **1 chưa làm** (loại đo hardcode), và **1 team chủ động hoãn** (mock, vì app còn đang phát triển, có ghi lý do) |
| **BE** | Đã đổi quy trình: Brian revert BE khỏi nus-base, giờ BE đi qua PR vào branch `feature/optimization`. Có spec BE cho op-26. **Nhưng code chưa sửa lỗi nào** trong danh sách: vẫn dùng `assert`, vẫn chỉ người tạo được sửa, vẫn không có lock |
| **Phát hiện mới** | 🔴 Unique index tên model **bị comment-out từ commit đầu tiên**, nên chống trùng tên không hoạt động. 🔴 Mock license đã vào **portal và admin** của khách. 🔴 FE vừa chốt OR cố định, trong khi BE chỉ nhận AND. 🔴 PR #336 (op-26) đang conflict với commit revert |

### DuongDN cần làm ngay
1. Báo kietnht/Brian 2 lỗi 🔴 BE mới (mục 3.1 và 3.3), chặn merge #336 cho đến khi sửa.
2. Thống nhất với Ken (nusken) thời hạn gỡ mock license (mục 3.2), ghi vào checklist deliver.
3. Nhắc team: không merge khi reviewer còn đang "Request changes" (mục 4).

---

## 1. FE: tình trạng 10 việc đã giao

Nguồn: PR [#332](https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/332) (Ken, merged 12/10) và code trên nus-base. Em đã kiểm lại trực tiếp từng mục trên code, không chỉ đọc mô tả PR.

| # | Việc | Trạng thái | Kiểm chứng trên code |
|---|------|-----------|----------------------|
| 1 | Text qua translate | ✅ Xong | Không còn chuỗi "No Optimization Runs Available", "Manage Models", "Pause Run"... trong template. Thêm 83 key i18n. Riêng playground `#/shared-ui` (công cụ dev) vẫn để chữ cứng, chấp nhận được |
| 2 | Bỏ mock | ⏸ Hoãn có lý do | 3 file sample/mock vẫn còn. Team ghi quyết định: trang ngoài milestone 1 giữ sample data trong lúc phát triển, màn hình M1 đã dùng API thật. **Phải gỡ trước khi deliver** |
| 3 | Kiểu dữ liệu khớp BE | 🟡 Một phần | Direction đã map `max → MAXIMIZE`. Đã giữ `units`. Cost bỏ trống không gửi. Còn OR và MEAN/DIFF/PROP, xem mục 3.4 |
| 4 | Date format từ configuration | ✅ Xong | Không còn `MM/dd/yyyy` cứng. Ngày theo format và múi giờ của plant |
| 5 | Loại đo lấy từ API | ❌ Chưa | `optimization-model-item.component.ts:19` vẫn còn `OptimizationTagType = 'speed' \| 'pressure' \| …`. Team ghi chờ API runs |
| 6 | Một interface tag | ✅ Xong | `shared/models/optimization-tag.model.ts`: `OptimizationTag`. Các kiểu khác thành `Pick<OptimizationTag, …>` |
| 7 | Không gọi function trong template | ✅ Xong | Các chỗ cũ (`isMissingAsset(…)`, `costOrderError()`...) đã chuyển sang `functionCallPipe`. Còn `$any(token)` trong expression-view |
| 8 | Search tối thiểu 3 ký tự | ✅ Xong | `tag-picker.component.ts:28` `DEFAULT_MINIMUM_QUERY_LENGTH = 3`, lấy từ config nếu có |
| 9 | `modelId` trên URL | 🟡 Một phần | Đã có route placeholder `operating-constraints`. `modelId` chờ làm Edit/Draft |
| 10 | Code lặp | 🟡 Một phần | Gõ type cho 2 chỗ `any`. Overlay helper, wizard footer, service tag-details dùng chung chưa làm. `QueryCacheService` giữ lại có chủ đích |

**Đánh giá:** team FE làm tốt. Mỗi mục đều có trạng thái rõ ràng và ghi lý do nếu chưa làm. Các quy tắc cũng được viết vào `ai_docs/CONVENTIONS.md` mục "optimization-ui delivery rules" để áp dụng cho code về sau.

## 2. BE: tình trạng 14 việc đã giao

Code BE kiểm trên branch op-26 (PR [#336](https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/336), head `13853643`), PR #315 (head `76141d7e`) và #321 (head `fd2bf6e0`).

| # | Việc | Trạng thái | Kiểm chứng |
|---|------|-----------|-----------|
| 1 | Bỏ `assert` | ❌ Chưa | op-26 vẫn còn 23 assert ở `DaeOptimizationModelConstraints` và 2 ở `DaeOptimizationModelControl`. #315 còn 2, #321 còn 1 |
| 2 | Migration cho khách đang chạy | ❌ Chưa, **nặng hơn đã báo** | `db.changelog-existing-customer-9_4.yaml` không có changeSet nào cho optimization. Ngoài ra index bị comment-out, xem mục 3.1 |
| 3 | Bỏ check "chỉ người tạo được sửa" | ❌ Chưa | `DaeOptimizationModelControl.java:187` vẫn còn. Spec op-26 còn ghi thành requirement "Draft ownership" |
| 4 | Lock + chặn sửa model đang chạy | 🟡 Một phần | ✅ Đã chặn update khi model không ở `DRAFT` (`:189`, errorId `optimizationModelNotDraft`). ❌ Không có lock: proposal ghi rõ là non-goal "last-write-wins" |
| 5 | Spec BE cho contract | 🟡 Đang có | Đã có `openspec/changes/op-26-upsert-optimization-model` (có requirement và scenario, tasks đã tick hết). Nhưng nằm trong PR chưa merge, và có 2 requirement trái lời khách (mục 3 và 4 ở trên) |
| 6 | BE qua PR trước khi deploy | ✅ Đã đổi | Commit `97c338d58c` (Brian, 12/10) revert service khỏi nus-base. BE giờ mở PR vào `feature/optimization`: #315, #321, #336 |
| 7 | Status ban đầu, một luồng tạo | 🟡 | Upsert tạo `DRAFT`. `create` cũ vẫn đặt `CALCULATING` (spec op-26 vẫn giữ "One-shot creation") |
| 8 | Update phía DB | ❌ Chưa | Vẫn `repository.save(document)` ghi đè cả document (`:244`) |
| 9 | Log giữ stack trace | ❌ Chưa | `:249` vẫn `e.getMessage()` |
| 10 | #315 enum thay chuỗi | ❌ Chưa | Từ lần review trước không có commit Java mới (chỉ merge). Vẫn 12 chỗ so chuỗi module |
| 11 | #321 class 1 field, thay đổi thừa | ❌ Chưa | `DaeTagDetailsRequest`, `DaeApiSearchController`, `reference.conf` vẫn nằm trong diff |
| 12 | Contract khớp FE | ❌ Lệch thêm | Xem mục 3.4 |
| 13 | Code lặp | — | Chưa xem lại |
| 14 | Quyết định nền tảng | — | Chưa thấy chốt (Run, plant, đơn vị tag, timeline) |

**Đánh giá:** quy trình đã tốt hơn (BE qua PR, đã có spec), nhưng **chưa sửa code**. Những lỗi khách từng bắt sửa (assert, migration, getMessage, magic string, class 1 field) vẫn còn nguyên.

## 3. Phát hiện mới

### 3.1 🔴 Unique index tên model không được tạo ở đâu cả

**Vấn đề:** trong `libraries/migration/.../version_9_4/create_optimization_model_collection/DaeMigrationCreateOptimizationModelCollectionLogic.java`, đoạn tạo index (unique `normalizedName`, index `status`, `goal.targetTagId`) **bị comment-out** từ commit đầu tiên `4acdfda072`:
```java
//            IndexOptions uniqueNameOptions = new IndexOptions()
//                    .unique(true)
//                    .partialFilterExpression(new Document("deleted", false))
//            collection.createIndex(new BasicDBObject("normalizedName", 1), uniqueNameOptions);
```
Service cũng không có `@Indexed` hay auto-index. Lần review 09/10 em ghi nhận nhầm đây là "điểm tốt", vì chỉ đọc comment và yaml.

**Vì sao quan trọng:** việc chống trùng tên giờ chỉ dựa vào bước "kiểm tra rồi mới lưu" (`existsByNormalizedName` → `save`). Hai người bấm Save cùng lúc với cùng một tên thì cả hai đều qua bước kiểm tra, và DB có 2 model trùng tên. Đoạn bắt `DuplicateKeyException` → `nameAlreadyExist` không bao giờ chạy. Ngoài ra, list và filter theo status sẽ không có index.

**Cách sửa:** bỏ comment và tạo index. Vì op-26 đã bỏ soft-delete, cần xem lại `partialFilterExpression(deleted=false)`: model mới không có field `deleted` thì không khớp filter, nên index **vẫn không có tác dụng**. Nên dùng unique thường trên `normalizedName`. Đồng thời thêm changeSet vào `db.changelog-existing-customer-9_4.yaml` (việc 2).

### 3.2 🔴 Mock license đã nằm trong portal và admin của khách

**Vấn đề:** PR [#334](https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/334) (commit `970d684598`, đã merge 12/10) thêm `projects/shared/dev-license-mock.ts` và gọi nó trong interceptor của **cả 3 app**: precognize-portal, admin-ui, optimization-ui. Chỉ cần gõ `localStorage.setItem('mockLicense', 'valid')` trong console là response `/license/status` bị thay đổi.

**Vì sao quan trọng:** file tự ghi: *"It must not reach a release: with the key set, the front-end licence checks can be bypassed."* Portal và admin là app khách đang dùng thật. Reviewer nus-aron đã "Request changes" đúng điểm này, nhưng PR vẫn được merge 9 phút sau. Hiện việc gỡ chỉ được nhắc bằng một task chưa tick. Nếu quên, bản deliver sẽ có cửa sau bỏ qua license.

**Cách sửa:** trước khi deliver, chạy `grep -rn "TEMP-LICENSE-MOCK\|mockLicenseStatus" projects` phải không còn kết quả nào. Đề xuất thêm bước này vào script `deliver-to-origin.sh` hoặc pre-commit để chặn tự động. Tốt hơn nữa là chỉ import mock trong `environment` dev.

### 3.3 🔴 PR #336 (op-26) không merge được do commit revert

**Vấn đề:** `feature/optimization` đã có commit `97c338d58c` (revert "init optimization"). Branch op-26 được tách ra **trước** commit revert. GitHub báo `mergeable=false`, em thử merge local cũng bị conflict.

**Vì sao quan trọng:** đây là bẫy "revert của revert" của git. Nếu giải conflict kiểu nhanh, những file của `4acdfda072` mà op-26 không sửa sẽ **vẫn bị xóa** sau khi merge. Service sẽ thiếu file mà không ai để ý.

**Cách sửa:** trên `feature/optimization`, revert lại commit revert trước (`git revert 97c338d58c`), sau đó mới merge op-26. Sau khi merge, kiểm tra service build được và đủ 31 file main.

### 3.4 🔴 FE chốt OR cố định, BE chỉ nhận AND

**Vấn đề:** PR [#337](https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/337) (Ken, đang mở) làm theo ticket OP-16 đã cập nhật: các expression trong một condition set **luôn nối bằng OR**, bỏ lựa chọn AND/OR. BE (op-26) thì chỉ nhận `AND`, gửi `OR` sẽ lỗi `invalidOptimizationLogicalOperator`. Hàm DIFF/PROP/MEAN (dùng cho Run Evaluation) cũng chưa có contract BE.

**Vì sao quan trọng:** trước đây chỉ lệch một phần (FE cho chọn cả hai). Giờ thì hai bên loại trừ nhau hoàn toàn: mọi condition set FE gửi lên đều bị BE từ chối. Proposal #337 đã ghi rõ là đang chờ BE.

**Cách sửa:** BE đổi luật logical operator theo ticket (nhận `OR`, hoặc bỏ field), cập nhật spec op-26. Ngoài ra, op-26 đã có `!=` và `notIn`, khớp với FE.

### 3.5 ⚠️ Spec op-26 ghi những quyết định trái lời khách

- Requirement "Draft ownership": chỉ người tạo được sửa. Khách (08/10): ai cũng sửa được.
- Non-goal: "No optimistic locking… last-write-wins".
- Proposal ghi "No status guard", nhưng code đã có kiểm tra `DRAFT`. Spec và code không khớp.

Spec hợp lệ về format. Vấn đề nằm ở nội dung: khi merge, những quyết định sai này trở thành "nguồn chuẩn". Cần sửa trước khi merge.

## 4. Quy trình review chéo

| PR | Tác giả | Review | Merge |
|----|---------|--------|-------|
| #332 delivery rules | nusken | nus-aron **Request changes** (07:15) → có commit sửa (07:43) | nusken tự merge 07:51, reviewer chưa xác nhận lại |
| #333 trend graph | nusteam (Aron) | nusken **Request changes** (07:00) | nus-aron merge 08:29, nusken chưa xác nhận lại |
| #334 licence states | nusken | nus-aron **Request changes** (08:21), đúng điểm mock 3.2 | nusken tự merge 08:30, 9 phút sau |
| #325, #328, #335 | nusteam | chỉ có COMMENTED | phongtb merge |
| #329, #330, #331 | — | chỉ có COMMENTED | tác giả tự merge |

**Điểm tốt:** FE đã review chéo đều (Aron ↔ Ken), nội dung review kỹ, có checklist QA.
**Cần sửa:** chưa PR nào có **Approve**. Có 3 PR merge khi reviewer vẫn đang "Request changes". Đề xuất bật branch protection trên `nus-base` và `feature/optimization` (yêu cầu 1 approve, chặn merge khi còn "changes requested"), hoặc ít nhất thống nhất quy ước này trong team.
**BE:** #315, #336 chưa có review nào. #321 chỉ có CodeRabbit.

## 5. PR đang mở

| PR | Nội dung | Kết luận |
|----|----------|----------|
| [#336](https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/336) op-26 upsert (Brian → `feature/optimization`) | Lưu draft theo từng step của wizard, có spec BE | ❌ Conflict (3.3), assert, check owner, không lock, index (3.1), log `getMessage` |
| [#315](https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/315) license đa module (Brian) | Không có commit Java mới từ lần review trước | ❌ Giữ kết luận cũ (assert, magic string) |
| [#321](https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/321) tag details (tiennd2) | Thêm "data coverage verdict" cho tag details (`a94ca8e50d`), sửa build | ❌ Lỗi cũ chưa sửa. Phần data coverage mới chưa review sâu |
| [#337](https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/337) OP-16 cập nhật luật expression (Ken) | Cố định OR, thêm `≠`, chia hàm theo nơi dùng, bỏ check cùng đơn vị, mỗi tag chỉ xuất hiện 1 lần trong expression. Chỉ sửa model, chưa có UI | 💬 Code và spec ổn, đúng ticket. Chờ BE đổi luật OR trước khi có màn hình nào Save (3.4) |
| [#339](https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/339) OP-18 shared components (ryannus → branch #337) | Expression card/editor/rule drawer, selected tag list, tag picker. 3.132 dòng | 💬 Không thấy text cứng, không `any`, template chỉ gọi event handler. Còn `$any(token)` ×10. Base là branch #337, nên phải merge #337 trước |

## 6. Việc tiếp theo
- Gửi team BE danh sách mục 2 + 3.1, 3.3, 3.4, 3.5 (đã có file action items BE ngày 09/10, chỉ cần nhắc lại phần chưa sửa).
- Lần review sau: xem kỹ phần data coverage của #321 và code lặp BE (việc 13).
