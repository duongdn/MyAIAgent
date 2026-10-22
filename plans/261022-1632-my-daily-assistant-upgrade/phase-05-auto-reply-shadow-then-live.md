# Phase 5 — Auto-reply tier (T1): shadow → live
**Priority:** P1 · **Status:** todo

## Overview
"Có msg khách thì msg tạm" — chỉ holding reply, không cam kết nội dung/thời hạn/giá.

## Rules
- Chỉ khi: sender_role=customer, hỏi trực tiếp, chưa ai bên mình trả lời (kể cả emoji reaction — memory holding_reply), ngoài giờ/anh chưa đọc sau X phút.
- Câu mẫu từ `config/assistant-reply-templates.json` (anh duyệt), LLM chỉ chọn template + điền tên; ngôn ngữ theo khách.
- Tối đa 1 holding reply / thread / 24h.

## Rollout
1. **Shadow 1–2 tuần:** chỉ ghi "đã định gửi gì" vào digest, anh chấm đúng/sai.
2. Live theo allowlist từng kênh; kill-switch trong policy.

## Success criteria
Shadow precision ≥ 95% trước khi bật live.
