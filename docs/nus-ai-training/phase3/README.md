# Giai đoạn 3 — Build AI Agent (S5–S9) · tài liệu

DuongDN làm S5 + S6. S7–S9 do VinhNT làm.

| Deck | Link |
|---|---|
| S5 · Agent khác workflow ở đâu (45') — 11/11 | https://docs.google.com/presentation/d/10ZYIXeEzlElYai6ws9xd77ZN8QbNfAAdPMJekhkHMWI |
| S6 · Agent loop và tool contracts (60') — 18/11 | https://docs.google.com/presentation/d/1pIVAHFwBg3Bgb28oBeJVJ19rEOyx8KFDlFn0PlcHPyQ |

## Cấu trúc
```
session-05/   demo/ (support agent + trang web demo, dùng chung S5–S9 + GĐ5) · presentation-script.md (cập nhật 29/10) · syllabus-to-slides-mapping.md · deck-review-loop-log.md
session-06/   presentation-script-and-syllabus-mapping.md · archive-presentation-script-old-261018.md
session-07/   presentation-script-draft.md (S7 do VinhNT làm)
shared/       session2-overlap-with-s5-s6.md · s5-s9-techlead-depth-review.md
changelog/    <ngày>.md (mọi lần sửa deck/demo: giờ · vấn đề · trước/sau · commit)
```

## Code
Demo: `session-05/demo/` (cạnh kịch bản S5). Code dựng slide: `scripts/nus-ai-training/phase3/`
```
phase3/
├── build-phase3-agent-deck.js   ⚠ xoá cả deck rồi dựng lại — không dùng khi deck đã sửa tay
├── deck/                        nội dung slide: slide-kit.js + 1 file/session (session-05-*.js …)
└── deck-tools/                  patch-slides-from-code.js (sửa đúng slide) · render-slide-thumbnails.js · dump-slide-text-and-notes.js
```
- Demo dùng chung với Giai đoạn 5 (security demo, số eval) — sửa demo thì chạy lại cả demo GĐ5.
- Sửa deck: `node scripts/nus-ai-training/phase3/deck-tools/patch-slides-from-code.js <session> <slide…>`; kiểm tra người sửa cuối trước khi patch.
