# Elena OP — Review OpenSpec (trạng thái spec trên nus-base)

> `nus-base` `a288733a18`, 09/10. Chạy `openspec@1.13.2 validate --all --strict` trên 3 root + đọc cấu trúc. Rule đối chiếu: `config.yaml` của từng root.
> Liên quan: [FE review](elena-op-code-review-fe.md) · [BE review](elena-op-code-review-be.md)

## Tóm tắt

| Root | Validate | Vấn đề chính |
|------|----------|-------------|
| `openspec/` (BE) | "No items found" (rỗng) | 🔴 **Không có spec/change nào** dù BE OP đã merge + đang chạy |
| `precognize-workspace/openspec/` (FE) | ✅ 29 pass | 🔴 **6 change đã merge code nhưng chưa archive**, nên spec chính thiếu wizard/license. ⚠️ nhiều change chồng capability. 6 capability sai quy tắc tên |
| `process-digital-plant/openspec/` | (không đụng) | — |

Chất lượng nội dung từng change FE **tốt**: mọi proposal có Non-goals, mọi design có "Current implementation", 342 scenario trong spec chính, spec không nhắc tên class/component (đúng rule "observable behaviour only"), contract chưa có đều ghi `UNKNOWN`.

## 1. Vòng đời change (lifecycle) — 🔴

### 1.1 Code đã merge nhưng change chưa archive
| Change (còn ở `changes/`) | Code đã merge qua | Task còn mở |
|---------------------------|------------------|-------------|
| `op-9-license-module-navigation` | #324/#329 | 9 |
| `op-9-license-panel-history` | #314 | 7 |
| `op-9-optimization-license-auth` | #329 | 7 |
| `op-13-optimization-goal-step` | #320 | 0 |
| `op-14-influencers-step` | #322 | 1 (manual QA) |
| `op-16-expression-builder` | #326 | 1 |

**Hệ quả:** `openspec/specs/` (nguồn sự thật) **không có** `optimization-model-wizard`, `optimization-model-goal-step`, `optimization-model-influencers-step`, `optimization-expression-model`, `optimization-auth-access`, `shared-license-module-access`, `admin-license`. Người mới đọc spec chính sẽ không biết wizard và license đã tồn tại.

### 1.2 Ngược lại: PR đang mở thì archive trước khi merge
#315, #321, #325, #328 đều đã có change trong `archive/` dù PR chưa merge (#321 còn archive cả change **đã rút**).

**Kết luận:** team chưa có quy ước thống nhất. Lúc archive sớm, lúc quên archive.
**Đề xuất quy ước:** *archive trong cùng PR, ngay trước khi merge* (bước cuối của tasks), reviewer chặn PR nếu chưa archive. Change đã merge mà chưa archive (bảng trên) cần một PR dọn: archive và đóng các task QA còn mở (hoặc ghi lý do).

## 2. Chồng chéo capability (nguy cơ conflict khi archive) — ⚠️

| Capability | Bị sửa bởi (change còn mở + PR mở) |
|------------|-----------------------------------|
| `optimization-app-shell` | op-9-license-module-navigation, op-9-optimization-license-auth, op-13 |
| `optimization-runs-page` | op-9-license-module-navigation, op-9-optimization-license-auth, PR #325, PR #328 |
| `optimization-shared-ui-playground` | op-13, op-14, PR #328 (+ nhiều archive cũ) |
| `optimization-model-wizard` | op-13, op-14 |
| `shared-license-module-access` | op-9-license-module-navigation, op-9-optimization-license-auth |

Archive theo thứ tự sai thì delta sau ghi đè delta trước. op-9 tách 3 change cùng sửa một capability là dấu hiệu nên gộp, hoặc archive tuần tự có kiểm tra.
**Đề xuất:** archive theo thứ tự merge thực tế, mỗi lần archive chạy `openspec validate --strict` + diff `specs/<cap>/spec.md`.

## 3. Thiếu root BE — 🔴
- `openspec/specs/` rỗng, `openspec/changes/` chỉ có `archive/` rỗng.
- BE đã chạy: optimization model create (`4acdfda072`), upsert/draft (branch op-26), license đa module (#315), tag details (#321). Chỉ #315 và #321 có change, và đều nằm trong PR chưa merge.
- FE trỏ tới change BE không tồn tại: `backend:op-13-optimization-goal-step`, `backend:op-16-expression-builder` (proposal FE "to be opened by the backend team").
- Rule FE: "API contracts ... are specified **only in the backend root**". Hiện contract optimization model **không có ở đâu cả**. FE design op-13/op-16 phải mô tả lại contract đọc từ code BE (vi phạm tinh thần rule).

**Đề xuất:** change BE `op-optimization-model-contract` capture baseline: request/response create + upsert, errorId từng luật, status lifecycle, đơn vị effectDelay, operator/function. Sau đó FE đổi "UNKNOWN" thành tham chiếu capability này.

## 4. Quy tắc đặt tên / cấu trúc — ⚠️

| Vấn đề | Chi tiết | Rule |
|--------|----------|------|
| Capability không có tiền tố app | `active-indicator`, `direction-indicator`, `frequency-value-indicator`, `improvement-value-indicator`, `recommendation-indicator`, `recommendations-button` | FE rule: "prefixed with the app, e.g. optimization-…" → nên là `optimization-active-indicator`... |
| Capability lồng thư mục (BE, trong PR) | `license/<sub>/spec.md` (#315), `domain-model/tag-details/spec.md` (#321) | `specs/<capability>/spec.md` |
| Change quá to | `op-13`: 8 capability, design 454 dòng, spec goal-step 327 dòng | proposal rule "keep scope to one coherent change" |
| Spec cho component clone | `optimization-number-stepper` | chấp nhận được (hành vi khác bản gốc), nhưng nên ghi "clone of vp-number-stepper" trong Purpose |

## 5. Spec đúng format nhưng nội dung cần duyệt nghiệp vụ — 💬
Những quyết định này được ghi thành `SHALL`. Code làm đúng, nhưng chưa thấy khách xác nhận:
- `shared-license-module-access`: "Licence cannot be read → pages SHALL open" (fail-open).
- Module OP mở Configuration + Digital Plant.
- op-13 D8: tên trùng/draft là mock, fixtures `Mock Error`/`Mock Save Error` đi vào build.
- `activeModules` rỗng/lạ = Monitoring.

**Đề xuất:** mỗi quyết định nghiệp vụ trong spec ghi nguồn (`Source: customer via vytth 2026-10-xx` hoặc `Decision: team, pending customer`). Reviewer sẽ biết cái nào cần hỏi khách.

## 6. Checklist review OpenSpec cho mỗi PR (dùng lại)
1. `openspec validate --all --strict` pass ở mọi root bị đụng.
2. Change nằm đúng root. FE không mô tả contract, chỉ tham chiếu capability BE. **Capability BE đó phải tồn tại.**
3. Archive trong PR, ngay trước merge. Không archive change đã rút. Không để change đã merge nằm ở `changes/`.
4. Capability `specs/<app>-<name>/spec.md`, không lồng.
5. Capability này có change khác đang mở sửa không (bảng §2)?
6. Quyết định nghiệp vụ có ghi nguồn không?
7. Tasks đánh `[x]` khớp code. Task QA còn mở thì ghi lý do.

## Câu hỏi chưa giải quyết
- Ai chịu trách nhiệm spec root BE (Brian/kietnht/tuanntg)?
- Gộp 3 change op-9 thành 1 khi archive, hay archive tuần tự?
