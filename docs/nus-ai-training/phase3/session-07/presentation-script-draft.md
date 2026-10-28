# Session 7 — Kịch bản trình bày (60 phút)

Deck (16 slide): https://docs.google.com/presentation/d/1x5lvgyO4nNgGYq_hton3_5OPBRNFQD2Tk1Om9bzPpS0
Code demo: `scripts/nus-ai-training/support_agent_demo/`
Người trình bày: VinhNT (S7–S9). Bản nháp do DuongDN soạn trước khi chia lại, VinhNT tự quyết dùng hay không.

## Chuẩn bị trước buổi (10 phút)

- [ ] `cd scripts/nus-ai-training/support_agent_demo` và kích hoạt venv
- [ ] Có key gateway trong `config/.nus-llm-gateway-config.json`
- [ ] Chạy thử: `python3 run_demo.py --scenario 6 --approve yes --disable idem` rồi
      `python3 run_demo.py --scenario 6 --approve yes` (xem đúng 2 kết quả khác nhau: trùng ticket vs
      idempotency giữ nguyên T-1001)
- [ ] Mở sẵn 1 tab terminal, font to; slide 6 và 7 có chạy live (timeout/idempotency)
- [ ] Nếu gateway lỗi: dùng output in sẵn trên slide, không cần chạy lại

## Dòng thời gian

| Phút | Slide | Phần | Gợi ý người nói |
|---|---|---|---|
| 0–5 | 1–2 | Mở đầu | VinhNT |
| 5–18 | 3–5 | 01 · Quyền | VinhNT |
| 18–38 | 6–9 | 02 · Lỗi | VinhNT |
| 38–53 | 10–12 | 03 · Approval & dữ liệu ngoài | VinhNT |
| 53–57 | 13–14 | Ghi nhớ + thử thách | VinhNT |
| 57–60 | 15–16 | Q&A | cả hai |

---

## Mở đầu (0–5')

**Slide 1 · Session 7 (2')**
- Hỏi lại câu chốt Session 6: "Ai thật sự gọi tool?" → application. "Vậy application phải kiểm soát
  gì trước và sau khi gọi?"
- Lưu ý ngay: OWASP LLM Top 10 và security tổng thể học ở Giai đoạn 5 — buổi này chỉ tập trung lớp
  thực thi tool.

**Slide 2 · Agenda (1')**
- 3 phần ~13 phút: Quyền · Lỗi · Approval & dữ liệu ngoài. Demo chạy thật kịch bản 3, 6, 8.

## Phần 01 · Quyền (5–18')

**Slide 3 · Tổng quan 3 thời điểm kiểm soát (3')**
- TRƯỚC (④ input+quyền bằng code, ⑤ người duyệt) · TRONG (timeout/retry/idempotency) · SAU (ghi
  ticket_id vào state, lỗi → trả rõ cho model).
- "Model đề xuất tham số — code quyết định có chạy không, chạy thế nào, kết quả có thật không."

**Slide 4 · Quyền lấy từ session, không từ tham số tool (4')**
- 2 lỗi kinh điển: lấy user_id/tenant từ tham số tool (model điền theo lời user); viết rule trong
  prompt (có thể bị thuyết phục bỏ qua).
- Đọc code `validate_ticket()`: role, priority, assignee — rule nằm trong CODE, không trong prompt.
- Đọc kết quả thật kịch bản 3 (bob viewer bị chặn).

**Slide 5 · Guardrail ≠ authorization (3')**
- Bảng so sánh: guardrail không biết user là ai; authorization biết, lấy từ session.
- Kết quả thật kịch bản 8 (câu hỏi dán số thẻ) → guardrail chặn TRƯỚC khi tốn 1 lượt gọi model nào.
- "Sai lầm hay gặp: đã bật guardrail của SDK nên an toàn — KHÔNG đúng."

## Phần 02 · Lỗi (18–38')

**Slide 6 · Câu hỏi: timeout — ticket đã tạo chưa? (1')**
- Cho lớp chọn (a) chưa tạo, (b) đã tạo, (c) không biết. Đáp án đúng: (c).

**Slide 7 · Đáp án · chạy thật — DEMO LIVE (4')**
- Chạy: `python3 run_demo.py --scenario 6 --approve yes --disable idem`
- Chỉ dòng: "⏱ lần 1 không nhận response sau 5s → retry (KHÔNG có idempotency key!)" → 💥 TRÙNG, 2
  ticket T-1001 + T-1002 cho cùng 1 yêu cầu.
- "Với ticket chỉ phiền; với chuyển tiền / gửi email cho khách là sự cố thật."

**Slide 8 · Idempotency — DEMO LIVE (4')**
- Chạy: `python3 run_demo.py --scenario 6 --approve yes` (không disable idem)
- So với slide trước: cùng timeout nhưng hệ thống đích trả lại T-1001 cũ, không tạo T-1002.
- Chỉ code `idempotency_key()`: sinh từ task_id + priority + assignee — "Key do APPLICATION sinh,
  model không biết, không điền được."

**Slide 9 · Bảng xử lý lỗi (3')**
- 7 dòng: thiếu quyền, input sai, timeout, kết quả rỗng, gọi lặp, yêu cầu phê duyệt, lỗi hệ thống (503)
  — đúng 6 mục của bài tự thực hành + 1 dòng bổ sung.
- "Kết quả rỗng nguy hiểm nhất — không phải lỗi kỹ thuật nhưng model dễ bịa. Trace đủ của kịch bản 7 ở
  Session 8, buổi này chỉ nêu nguyên tắc: nói rõ 'không có tài liệu', không bịa."

## Phần 03 · Approval & dữ liệu ngoài (38–53')

**Slide 10 · Lỗi là dữ liệu (3')**
- Helpdesk 503 → tool trả JSON lỗi có hướng dẫn rõ ("KHÔNG báo đã tạo") thay vì exception câm.
- "Nếu SDK chỉ trả error chung chung, model sẽ đoán — thường nói 'đã tạo xong'."

**Slide 11 · Human approval (4')**
- Thứ tự quan trọng: ④ code kiểm tra TRƯỚC, ⑤ người duyệt SAU. Đảo ngược → approval fatigue.
- Code: `needs_approval=<hàm>` trả False nếu ④ đã chặn (không làm phiền người), True nếu hợp lệ.
- "Người duyệt phải thấy CHÍNH XÁC tham số, không phải tóm tắt mơ hồ."

**Slide 12 · Dữ liệu không đáng tin (3')**
- Kịch bản 5: KB có "quy định" giả trông hợp lệ, không có câu lệnh nào cho AI — model vẫn có thể tin.
- "Không thể làm model 100% không bị lừa → đặt kiểm soát ở chỗ text biến thành hành động (④)."

## Kết (53–57')

**Slide 13 · Ghi nhớ (2')**
- 4 thẻ: Quyền · Lỗi · Approval · Dữ liệu ngoài.

**Slide 14 · Thử thách + bài tự thực hành (2')**
- Giao bài: viết bảng xử lý cho use case của chính họ (6 trường hợp). Mang tới đầu Session 8.

## Q&A (57–60')

**Slide 15–16**
- Câu hay gặp:
  - "Vì sao user_id không được là tham số của tool?" → model điền được theo lời user.
  - "Idempotency key do ai sinh?" → application, từ task + nội dung nghiệp vụ.

## Nếu bị thiếu thời gian
- Bỏ chạy live slide 7 hoặc 8 (chỉ chạy 1 trong 2, dùng output in sẵn cho cái còn lại) — tiết kiệm 3'.
- Slide 12 (dữ liệu không đáng tin) có thể gộp nhanh vào Ghi nhớ nếu cần thêm thời gian Q&A.

## Câu hỏi chưa giải quyết
