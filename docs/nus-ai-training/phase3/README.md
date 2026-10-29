# Giai đoạn 3 — Build AI Agent (S5–S9) · tài liệu

DuongDN làm S5 + S6. S7–S9 do VinhNT làm.

| Deck | Link |
|---|---|
| S5 · Agent khác workflow ở đâu (45') — 11/11 | https://docs.google.com/presentation/d/10ZYIXeEzlElYai6ws9xd77ZN8QbNfAAdPMJekhkHMWI |
| S6 · Agent loop và tool contracts (60') — 18/11 | https://docs.google.com/presentation/d/1pIVAHFwBg3Bgb28oBeJVJ19rEOyx8KFDlFn0PlcHPyQ |

## Cấu trúc
```
session-05/   presentation-script.md (cập nhật 29/10) · syllabus-to-slides-mapping.md · deck-review-loop-log.md
session-06/   presentation-script-and-syllabus-mapping.md · archive-presentation-script-old-261018.md
session-07/   presentation-script-draft.md (S7 do VinhNT làm)
shared/       session2-overlap-with-s5-s6.md · s5-s9-techlead-depth-review.md
changelog/    <ngày>.md (mọi lần sửa deck/demo: giờ · vấn đề · trước/sau · commit)
```

## Code
- Deck: `scripts/nus-ai-training/phase3-deck/` (1 file/session + `slide-kit.js`)
- Sửa deck: `scripts/nus-ai-training/deck-tools/patch-slides-from-code.js <session> <slide…>` chỉ thay đúng slide cần sửa. Không chạy build-phase3-agent-deck.js vì nó xoá cả deck, mất phần sửa tay
- Demo: `scripts/nus-ai-training/support_agent_demo/`
