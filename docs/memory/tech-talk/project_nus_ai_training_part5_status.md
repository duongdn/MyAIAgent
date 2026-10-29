---
name: project_nus_ai_training_part5_status
description: "Status of DuongDN's assigned Phase 5 (Sessions 13-16) for the company-wide \"NUS AI training for developers\" program"
metadata: 
  node_type: memory
  type: project
  originSessionId: cf74cab6-c7fe-4999-a5e4-c0f3dec37319
  modified: 2026-09-11T08:06:47.976Z
---

Company-wide internal AI training program (namtv organizing): 16 sessions across 5 phases, weekly ~30min during work hours, starting ~early Oct 2026. User (DuongDN) is trainer for **Phase 5 — "Production security và solution consulting"** (Sessions 13-16), picked after Chiến took phase #1. Phase 5 focus: applying AI into product (features, agents) — not internal dev tooling.

Source docs (in Trello card https://trello.com/c/rCundWKl/1368-nus-training-part-5, attachments): `01_De_cuong_chuong_trinh_dao_tao_AI.pdf` (outline) and `02_Noi_dung_chi_tiet_chuong_trinh_dao_tao_AI.pdf` (40-page detailed trainer content — Session 13 = pages 32-33, Session 14 = pages 34-35, Session 15 = pages 36-37, Session 16 = pages 38-40).

Sessions: 13 = Production architecture cho AI feature, 14 = Observability latency và cost, 15 = Security privacy và Responsible AI, 16 = AI product discovery và solution consulting (this one doubles as the program's final assessment).

**Status as of 2026-09-11**: Session 13 slides fully built in Google Slides (presentation ID `10ZYIXeEzlElYai6ws9xd77ZN8QbNfAAdPMJekhkHMWI`) — 9 slides: Title, Agenda, Execution mode, Resilience, Caching, Versioning, Graceful degradation, Tổng kết diagram (moved to end), Quiz. Speaker notes filled with full explanations. See [[feedback_ai_training_slides_design_pattern]] for the design pattern to repeat for Sessions 14-16 (not yet started as of this date).

**How to apply:** When resuming this work, build Sessions 14/15/16 slides in the SAME presentation, following the same visual-card + speaker-notes pattern, pulling source content from pages 34-40 of `02_Noi_dung_chi_tiet_chuong_trinh_dao_tao_AI.pdf`.

**UPDATE 2026-10-12 — plan changed:** New PDFs on Trello card = 13 sessions (P1 S1-2, P2 RAG S3-4, P3 Build AI Agent S5-9 w/ OpenAI Agents SDK, P4 MCP S10-11, P5 S12-13). Trello comment (06:54): Phase 5 → ONE simple session (user confirmed "gom lại thành 1"); Agent phase is most important, DuongDN + Nghiệp share it (exact split TBD); idea: build a real agent for company. Old Session 13 slides (Execution mode/Resilience/Caching...) DELETED (recover via Slides version history). Deck now = 12 slides, merged Phase 5: Title, Agenda, Architecture flow, Model vs App, Sensitive data, Prompt injection+approval, Ops metrics, Failure ladder, Consulting 6 questions, Prototype P1-P3, Tổng kết = solution brief 6 parts (final assessment), Quiz. Builder script was in session scratchpad (session dc0f5fe8 "nus-ai-training"). Next: Agent-phase sessions after split with Nghiệp is known.

**UPDATE 2026-10-13:** Security part DONE (user accepted): demo `scripts/nus-ai-training/support_agent_demo/` — OpenAI Agents SDK + company LLM gateway llm.nustechnology.com (key in config/.nus-llm-gateway-config.json; models deepseek/qwen/glm/mimo), `--compare` multi-model, `--sdk claude` fallback; script `docs/nus-ai-training/phase5/phase5-support-agent-demo-presentation-script.md`. Consulting part script drafted: `docs/nus-ai-training/phase5/phase5-customer-consulting-presentation-script.md` (role-play customer ABC). Next: Agent phase (S5-9) split with Nghiệp still TBD.

**Deck IDs (2026-10-15):**
- Giai đoạn 5 (17 slide, Security + Vận hành + Tư vấn): `1Stt_wQjaHJtLND_dFI0S3iWA4l_OTxjKB2_cOwRzw_Y` — user tạo, share cho service account; `PID` trong build-phase5-session-deck.js.
- Giai đoạn 3 (S5–9, 41 slide): `10ZYIXeEzlElYai6ws9xd77ZN8QbNfAAdPMJekhkHMWI` (file cũ "Sesion 13"). Ngày 14/10 build-phase3-agent-deck.js chạy với PHASE3_PID = ID này → xoá mất deck GĐ5 (service account hết Drive quota, không tạo file mới được). Đã thêm guard: chỉ rebuild deck trống hoặc deck có slide đầu "Giai đoạn 3".
- **Why:** service account không tạo được file → luôn để user tạo file trống + share; không bao giờ cho 2 deck dùng chung 1 ID.

**Giai đoạn 3 rebuild (2026-10-15):** deck 10ZYIX… dựng lại 77 slide bằng `build-phase3-agent-deck.js` + `phase3-deck/` (slide-kit + 1 file/session). Style theo deck Session 1 của ChienTX (Matrix room "AI Training"): kicker + tiêu đề là câu khẳng định + log chạy thật + nhịp CÂU HỎI → ĐÁP ÁN. User: **mỗi session = 1 ngày training riêng**, user tự tách → mỗi session có header, nhắc lại buổi trước, agenda, ghi nhớ, thử thách; số trang reset theo session. Demo thêm thật: retry+idempotency (ticket_system.py), task state + resume (task_state.py), budget, guardrail, trace local (trace_local.py), kịch bản 6–8.
Lịch: training 11h thứ 4 hàng tuần, S1 = 14/10/2026 → S5–S9 = 11/11, 18/11, 25/11, 2/12, 9/12. Section 3 giao cho DuongDN + VinhNT (không phải Nghiệp).

- 🔴 2026-10-16: presenter GĐ3 (S5–S9) ghi "DuongDN · VinhNT" (user sửa: không dùng "Dương Nguyễn"). Dùng tên viết tắt NUS kiểu DuongDN/VinhNT trên slide.
- 🔴 2026-10-29: deck S5, S6 chỉ ghi "DuongDN" (bỏ VinhNT); S7–S9 ghi "VinhNT". slide-kit.js đặt người trình bày theo số session.
- 🔴 2026-10-20: GĐ3 chia lại — DuongDN làm S5 + S6; VinhNT làm S7, S8, S9 (không đụng deck S7–S9 nữa trừ khi user yêu cầu).
