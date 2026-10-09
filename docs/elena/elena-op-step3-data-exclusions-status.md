# Elena OP — Step 3 Data Exclusions: đã có gì, code chạy thế nào

> Cập nhật **2026-10-09**. Trả lời câu hỏi: "Step 3 báo chưa available, đã làm chưa?"
> Liên quan: [walkthrough](elena-op-optimization-module-walkthrough.md) · [review](reviews/2026-10-09/elena-op-deployed-code-review.md)

## Kết luận
**Chưa có UI Step 3.** Trên test env và `nus-base`, route `#/models/new/data-exclusions` trỏ vào `StepPlaceholderComponent` (chỉ có nút Cancel/Previous, hiện "not available"). Đúng như anh thấy.

Đã có **các mảnh nền**, chưa ráp lại:

| Mảnh | Ở đâu | Trạng thái | Chạy trên test env? |
|------|-------|-----------|---------------------|
| Logic biểu thức (expression model): validate, preview, xuất/đọc JSON cho BE | FE `shared/expression/*` (OP-16, PR #326) | ✅ merged, **không có UI**, không gọi API | Có trong bundle, chưa ai dùng |
| Hiển thị biểu thức chỉ đọc (expression-view, OR connector) | FE PR #328 (OP-27) | 🟡 PR mở | Không |
| UI builder (card biểu thức, chọn tag/hàm/operator) | "shared-UI work" | ⬜ chưa có ai làm (OP-16 ghi rõ là Non-goal) | — |
| Màn Step 3 | — | ⬜ chưa có ticket/branch | — |
| BE nhận `dataExclusions` khi **create** | `microservices-optimization` (`4acdfda072`) | ✅ merged, có validate | Có (chưa ai gọi) |
| BE **upsert/draft theo từng step** (`step: DATA_EXCLUSIONS`) | branch `feature/op-26-be-model-run-save-draft-discard-state` (Brian, chưa PR) | 🟡 code xong, chưa PR | Chưa rõ |
| Đếm coverage dữ liệu / time window mặc định cho exclusions | BE (tiennd2/kietnht) | ⬜ đang chờ chốt với khách (1 năm cố định hay theo config) | — |

## Flow code HIỆN TẠI khi tới Step 3 (đang chạy trên test env)

```
Step 2: InfluencersStepComponent.next()                      steps/influencers/influencers-step.component.ts:330
   ├─ influencersValid(state.influencers)? (≥1 tag, không tag nào thiếu asset)   — sai thì return, đứng yên
   ├─ state.markCompleted('influencers')
   └─ router.navigate(['../data-exclusions'])
        │
        ▼
model-wizard.routes.ts: path 'data-exclusions' → StepPlaceholderComponent
ModelWizardPageComponent.onStepRoute()  (nghe NavigationEnd)
   ├─ activeStep = 'data-exclusions'
   ├─ state.firstOpenableStep('data-exclusions'): goal + influencers đã completed → cho mở
   └─ steps[] cho stepper header: Goal ✓, Influencers ✓, Data Exclusions = active, Operating Constraints = upcoming
        │
        ▼
StepPlaceholderComponent                                       steps/step-placeholder/*
   template: <p>{{ 'optimization.model_wizard.step_not_available' | translate }}</p>
   footer:  CANCEL   → router.navigate(['/']) → confirmLeaveWizardGuard → có thay đổi → dialog Save/Discard
            PREVIOUS → về 'influencers' (state giữ nguyên, guard không chạy vì vẫn trong wizard)
            NEXT     → [disabled]="true", không có handler
```
- Không gọi API nào. Không đọc/ghi gì của data exclusions. `ModelWizardStateService` **không có field** `dataExclusions` (chỉ goal + influencers). `draftValue()` cũng chỉ gửi 2 phần đó.
- Bước 4 `operating-constraints` có trong `WIZARD_STEPS` (hiện ở stepper) nhưng **không có route**. Gõ URL `#/models/new/operating-constraints` sẽ rơi vào route không tồn tại.
- Code tương lai sẽ dùng `shared/expression/*` (OP-16) đã nằm sẵn trong bundle, nhưng hiện **không có import nào** từ màn hình thật.

## Flow khi làm xong (ghép từ code đã có)

```
Step 2 xong (influencers) ──► #/models/new/data-exclusions
  [UI chưa có] User thêm 1..n "exclusion":
     mỗi exclusion = conditionSet (AND, list biểu thức) + affectedTagIds (tag nào bị loại dữ liệu)
     vd: "khi FT0105 < 5 thì bỏ dữ liệu của PT0102, AIT0302"
       │
       ▼  FE shared/expression (đã có)
     ExpressionDraft (đang gõ) ──rules.validate──► lỗi: thiếu field, value không phải số, số tag sai,
                                                   khác đơn vị (SUM/RANGE trên tag khác unit)
     toBackend() ──► {logicalOperator, conditions:[{operand:{type, tagId|function+tagIds}, operator, value|values}]}
     preview()   ──► "FT0105 < 5 m³/h AND SUM ( PT0102 , PT0211A ) > 10 bar"
       │
       ▼  Save / Next  (BE op-26, chưa merge)
  POST /optimization/models/upsert {id, step:"DATA_EXCLUSIONS", dataExclusions:[...]}
     gateway → RSocket optimization.model.upsert
     → validateUpsert + validateMerged:
        - conditions không rỗng; logicalOperator chỉ AND (OR bị từ chối)
        - TAG cần tagId; FUNCTION cần function + đúng số tag (SUM ≥2, còn lại =1), không trùng
        - operator in/notIn cần values[], còn lại cần value
        - affectedTagIds ⊆ influencers, không trùng, không rỗng
     → tag tồn tại & là Column (domain)
     → lưu Mongo, status DRAFT, completedSteps tính lại (DaeOptimizationModelCompletion:
        Step 3 "complete" nếu không có exclusion nào HOẶC mọi exclusion có ≥1 condition)
```

## Vấn đề cần bàn trước khi làm Step 3

| # | Vấn đề | Bằng chứng | Đề xuất |
|---|--------|-----------|---------|
| 1 | **FE cho OR, BE chỉ nhận AND** | FE `ExpressionLogicalOperator = 'AND' \| 'OR'`. BE `invalidOptimizationLogicalOperator` nếu khác AND (cả create và op-26) | Hỏi vytth/khách: exclusion có cần OR không? Có thì BE mở, không thì FE ẩn OR |
| 2 | **Hàm lệch:** FE có MEAN, DIFF, PROP, BE không có | FE `ExpressionFunctionId`, BE `DaeApiOptimizationFunction` (SUM, AVERAGE, MIN, MAX, RANGE) | BE thêm 3 hàm (DIFF/PROP đúng 2 tag) hoặc FE ẩn |
| 3 | **Không có nguồn "unit của tag"** cho luật "khác đơn vị không được cộng" | OP-16 dựa vào `unit` của tag search OP-22, nhưng phần đó **đã bị rút**. `tags/details` trả `units` = **danh sách đơn vị của measurement type** (vd `["°C","°F","K"]`), không phải đơn vị thật của tag. FE `toDetails()` còn bỏ luôn field `units` | Chốt với BE: tag có field unit thật không (Influx/tag property)? Nếu không thì luật same-unit nên so **measurementType** |
| 4 | **affectedTagIds chỉ được là influencer**, không được là target | BE `influencerTagIds.containsAll(affectedTagIds)`. Spec #321 cũ ghi "Step 3 drawn from Step 2 influencers/**Target Tags**" | Hỏi BA: có loại dữ liệu của target không? Nhiều khả năng **có** (loại dữ liệu target lúc máy dừng) |
| 5 | Operator `≠`: BE có `!=`, FE không | FE Non-goal ghi "the ≠ operator" | Thống nhất theo Figma |
| 6 | **Time window**: exclusion áp dụng trên khoảng nào? | Matrix 08/10: vytth "default 1 year", anhttl "hay theo configuration", chưa chốt. DTO BE không có field thời gian | Chốt trước, vì ảnh hưởng DTO |
| 7 | **Ai làm UI builder?** | OP-16 Non-goal: "UI owned by the shared-UI work". #328 chỉ có view chỉ đọc | anhttl giao ticket rõ ràng cho Step 3 (FE) + PR cho op-26 (BE) |
| 8 | Validate BE bằng `assert` | Test env đang bỏ qua assert (review H) | Phải sửa trước, không thì exclusion sai vẫn lưu được |

## Có thể test gì ngay bây giờ (không cần UI)

**a) Logic FE (OP-16):** chỉ review bằng cách đọc code `shared/expression/*.ts`.

**b) BE validate data exclusions qua API create** (dùng tag test trong `config/.elena-op-test-data.json`; **đây là request thật, đúng thì sẽ TẠO model**, nên dùng tên `zz-test-...` và báo team):
```bash
B=https://active-alerts.nusdev.net/vp_server/dae/rest   # đã login vào /tmp/elena.cj theo test guide mục 0
T=f4328381-8896-42c7-8d63-97794a620c70   # LT0103 target
I1=ff83a93d-c737-4812-af8a-e48e082503d9  # PT0102
I2=3fee7dc5-843b-4343-8e18-d9d0231698b0  # FT0105
body() { jq -nc --arg t $T --arg i1 $I1 --arg i2 $I2 --argjson ex "$1" \
  '{name:"zz-test-exclusion",goal:{targetTagId:$t,direction:"MAXIMIZE",minimumDesiredImprovement:5},
    influencers:[{tagId:$i1},{tagId:$i2}],dataExclusions:$ex}'; }
# Kỳ vọng lỗi (an toàn, không tạo dữ liệu):
curl -s -b /tmp/elena.cj -X POST $B/optimization/models/create -H 'Content-Type: application/json' \
  -d "$(body '[{"conditionSet":{"logicalOperator":"OR","conditions":[{"operand":{"type":"TAG","tagId":"'$I2'"},"operator":"<","value":5}]},"affectedTagIds":["'$I1'"]}]')" | jq -c .
#   → invalidOptimizationLogicalOperator   (nếu ra lỗi khác hoặc success → assert không chạy, review H)
curl -s -b /tmp/elena.cj -X POST $B/optimization/models/create -H 'Content-Type: application/json' \
  -d "$(body '[{"conditionSet":{"conditions":[{"operand":{"type":"TAG","tagId":"'$I2'"},"operator":"<","value":5}]},"affectedTagIds":["'$T'"]}]')" | jq -c .
#   → invalidDataExclusionAffectedTags     (target không được nằm trong affected)
```
Lưu ý: với tình trạng test env hiện tại (assert tắt), 2 lệnh trên có thể **tạo model thật** thay vì báo lỗi. Nên chỉ chạy sau khi kietnht bật `-ea`, hoặc chạy trên local.

**c) UI chỉ đọc:** khi #328 merge, xem `#/shared-ui` → mục expression view.

## Câu hỏi chưa giải quyết
- Ticket Jira nào là Step 3 Data Exclusions (FE) và ai nhận?
- op-26 (upsert/draft) khi nào mở PR? FE Save draft đang mock và chờ API này.
- Đơn vị thật của tag lấy ở đâu (mục 3)?
