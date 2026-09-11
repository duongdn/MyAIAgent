---
name: feedback_ai_training_slides_design_pattern
description: "User's required slide design pattern for the NUS internal AI-training deck (Part 5) — short visual cards on-screen, full explanation in speaker notes"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: cf74cab6-c7fe-4999-a5e4-c0f3dec37319
  modified: 2026-09-11T08:06:33.065Z
---

For the "NUS Training Part 5" Google Slides deck (presentation ID `10ZYIXeEzlElYai6ws9xd77ZN8QbNfAAdPMJekhkHMWI`, Trello card https://trello.com/c/rCundWKl/1368-nus-training-part-5), user rejected a first draft that put full paragraph explanations directly on slide bodies ("đây ko phải là slide để chiếu, mà là copy lại content, ko ổn tí nào với view người đọc") and a follow-up that had visual cards but no images/diagrams ("toàn là gạch đầu dòng, ko có content, ko hình ảnh minh họa").

**Why:** These are presentation slides meant to be projected/shown to dev audience during a live 30-min training session, not a document. Wall-of-text bullets don't work as "slides to project" even if factually complete.

**How to apply** (confirmed-good pattern, used for Session 13 and to repeat for Sessions 14-16):
- On-slide text = short keyword phrases / card labels only (3-6 words), large font (~16-22pt for cards, bigger for single big labels).
- Full explanations, worked examples, analogies (e.g. "circuit breaker = cầu dao điện"), and quiz-answer hints go into **Speaker Notes** (`slideProperties.notesPage.notesProperties.speakerNotesObjectId`), not the visible slide body — trainer reads notes live, audience only sees the short version.
- Each content slide should be a **visual layout**: colored ROUND_RECTANGLE cards in a grid/row (not a bulleted TEXT placeholder), with one color per card and a distinct accent color (e.g. orange) for the single most-important/most-often-gotten-wrong item in a group.
- A concept with sequential/branching relationships (versions, error fallback paths, request pipeline) should get an actual diagram with `createLine` arrows connecting `createShape` boxes, not more bullets.
- Put a "Tổng kết" (summary) diagram slide, covering the whole session's architecture, at the END of that session's slides — not near the top — since it doubles as the answer to the session's stated learning-objective/output requirement.
- Colors used so far: NAVY `{0.12,0.22,0.40}` (primary/dark cards, title text), LIGHTNAVY `{0.85,0.9,0.97}` (neutral cards), ORANGE `{0.92,0.55,0.15}` (⚠️ pay-extra-attention item), GREEN `{0.88,0.95,0.82}` (safe/positive), YELLOW `{0.99,0.92,0.7}` (caution/note label), on a light `{0.97,0.98,1}` slide background — keep this palette consistent across Sessions 14-16 for the same deck.

See [[feedback_google_slides_api_enabled_and_gotchas]] for the API mechanics used to build this.
