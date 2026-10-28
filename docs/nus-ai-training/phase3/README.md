# Giai đoạn 3 — Build AI Agent (S5–S9) · tài liệu

DuongDN làm S5 + S6. S7–S9 do VinhNT làm.

| Deck | Link |
|---|---|
| S5 · Agent khác workflow ở đâu (45') — 11/11 | https://docs.google.com/presentation/d/10ZYIXeEzlElYai6ws9xd77ZN8QbNfAAdPMJekhkHMWI |
| S6 · Agent loop và tool contracts (60') — 18/11 | https://docs.google.com/presentation/d/1pIVAHFwBg3Bgb28oBeJVJ19rEOyx8KFDlFn0PlcHPyQ |

## Session 5
- `s5-presentation-script.md`: kịch bản trình bày (⚠ chưa cập nhật theo deck ngày 28/10)
- `s5-syllabus-to-slides-mapping.md`: dòng nào trong PDF đề cương ứng với slide nào
- `s5-deck-review-loop-log.md`: log các vòng review deck

## Session 6
- `s6-presentation-script-and-syllabus-mapping.md`: kịch bản + đối chiếu PDF + 3 demo live

## Chung
- `session2-overlap-with-s5-s6.md`: chỗ trùng với Session 2 (ChienTX)
- `s5-s9-techlead-depth-review.md`: review độ sâu S5–S9
- `s7-presentation-script-draft.md`: bản nháp S7 (S7 do VinhNT làm)
- `changelog/<ngày>.md`: mọi lần sửa deck/demo (giờ · vấn đề · trước/sau · commit)
- `archive/`: bản cũ

## Code
- Deck: `scripts/nus-ai-training/phase3-deck/` (1 file/session + `slide-kit.js`)
- Sửa deck: `scripts/nus-ai-training/deck-tools/patch-slides-from-code.js <session> <slide…>` chỉ thay đúng slide cần sửa. Không chạy build-phase3-agent-deck.js vì nó xoá cả deck, mất phần sửa tay
- Demo: `scripts/nus-ai-training/support_agent_demo/`
