# Giai đoạn 5 — Đưa AI vào product (DuongDN)

Gộp 1 buổi: Architecture · Security cơ bản · Vận hành · Tư vấn khách hàng.
Nguồn đề cương: Trello https://trello.com/c/rCundWKl/1368-nus-training-part-5 (`01_De_cuong…pdf`, `02_Noi_dung_chi_tiet…pdf`).

## Deck
https://docs.google.com/presentation/d/1Stt_wQjaHJtLND_dFI0S3iWA4l_OTxjKB2_cOwRzw_Y (17 slide)

| Phần | Slide |
|---|---|
| Mở đầu | 1 Tiêu đề · 2 Agenda |
| 1. Architecture | 3 Kiến trúc AI feature · 4 Model vs Application |
| 2. Security | 5 Dữ liệu nhạy cảm · 6 Prompt injection & approval · 7 OWASP LLM Top 10 → **demo live** |
| 3a. Vận hành | 8 3 điểm khác · 9 AI lỗi không báo lỗi · 10 4 nhóm chỉ số · 11 Eval = unit test · 12 Eval thật 6 model · 13 Thang xử lý lỗi |
| 3b. Tư vấn | 14 Yêu cầu mơ hồ → bài toán · 15 Prototype nhỏ nhất · 16 Tổng kết 1 trang |
| Kết | 17 Câu hỏi kiểm tra & tự thực hành |

## Tài liệu (đọc theo thứ tự)
1. `phase5-trainer-deep-dive-and-quiz-answers.md`: thông điệp cốt lõi, deep dive từng phần, đáp án slide 17
2. `phase5-support-agent-demo-presentation-script.md`: kịch bản demo security (~11')
3. `phase5-customer-consulting-presentation-script.md`: kịch bản tư vấn, role-play khách ABC (~15')

## Code
- Deck: `scripts/nus-ai-training/phase5-deck/`
  - `build-phase5-session-deck.js`: ⚠ xoá toàn bộ slide rồi dựng lại
  - `apply-phase5-owasp-patch.js`, `apply-phase5-operations-patch.js`: sửa trực tiếp 1 phần, không dựng lại cả deck
  - `phase5-owasp-llm-top10-content.js`, `phase5-operations-slides.js`: nội dung dùng chung
- Demo: `docs/nus-ai-training/phase5/demo/` — agent bản đầy đủ (checkpoint ①–⑤, task state, kịch bản 1–9; copy từ demo S5 cũ 30/10, S6 `compare_tool_descriptions.py` cũng dùng bản này). Eval: `run_eval.py` → `eval_results.json` (số trên slide 12). Demo S5 giờ là bản tối giản, không dùng chung nữa.
- Đọc deck/render ảnh: `scripts/nus-ai-training/phase3/deck-tools/`

## Lưu ý
- Demo GĐ5 = `phase5/demo/` (bản đầy đủ, tách khỏi S5 từ 30/10). Trước buổi GĐ5 chạy lại demo security + `run_eval.py`.
- Service account không tạo được file mới trên Drive. Mỗi deck phải có ID riêng, không dùng chung.
