# Phase 2 — Triage engine
**Priority:** P0 · **Status:** todo

## Overview
Mỗi batch event `new` → Claude phân loại + tóm tắt + đề xuất hành động, output JSON có schema.

## Architecture
- `scripts/assistant/triage.js`: gom event theo thread, gọi `claude -p --output-format json` (model Sonnet cho rẻ; Opus cho thread phức tạp) với prompt `scripts/assistant/prompts/triage.md`.
- Output schema mỗi thread:
  `{ category: ignore|info|needs_reply|task|incident, urgency: low|med|high, summary, tier: T0|T1|T2, proposed_action: {type, params}, draft_reply?, reasoning }`
- Context đưa vào prompt: `config/assistant-policy.json` (rule tier), contacts map, các memory liên quan (feedback_project_topics_not_alerts, holding_reply..., ignore list paused items).
- Không keyword-classify (memory no_keyword_alert_classification) → để LLM quyết, policy chỉ là ràng buộc cứng (vd: tier T1 chỉ khi kênh ∈ allowlist).

## Related files
Create: `scripts/assistant/triage.js`, `scripts/assistant/prompts/triage.md`, `config/assistant-policy.json` (không secret, track git). Table mới: `triage(event_ids, result_json, model, cost)`.

## Todo
- [ ] prompt + schema  - [ ] policy file  - [ ] validate JSON, retry 1 lần  - [ ] eval: chạy lại trên event 1 tuần cũ, so với daily report đã có

## Success criteria
Trên dataset 1 tuần: không bỏ sót customer direct ask (memory customer_direct_ask_universal_gate); false alert < 10%.

## Risks
Chi phí token → batch theo thread, bỏ qua bot/noise trước khi gọi LLM.
