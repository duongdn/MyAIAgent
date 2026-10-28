# AI Training GĐ3 — cập nhật S5 + S6 (2026-10-28)

## 15:45 — S5: review dưới góc người xem, gỡ chữ dành cho trainer

| Slide | Trước | Sau |
|---|---|---|
| 1 | "Session 5–9 · một support agent mở rộng dần · OpenAI Agents SDK" + chip search_kb → create_ticket → T-1001 | "Session 5–9 · OpenAI Agents SDK", bỏ chip |
| 2 | Chú thích "câu hỏi của buổi ↑ · phần agent có thêm sau buổi ↑" | Bỏ (đã có trong notes) |
| 4 | Mục 02 "ví dụ support + 3 câu hỏi quyết định" (lỗi thời) | "đo token · khi nào workflow thắng" |
| 6 | Caption dài về điều kiện dừng | "↻ số lượt do model quyết · dừng: trả lời cuối hoặc max_turns" |
| 7 | Dòng "rút gọn từ compare_orchestration_levels.py · output thật…" | Bỏ (đã có trong notes) |
| 10 | Khung 2 câu văn xuôi, "agent đáng tiền khi số bước không biết trước" mâu thuẫn slide 15 | "Bước biết trước → workflow đủ việc, ít token hơn" |
| 11 | Câu dài ở cuối slide | "Tổng 2.511 vào + 489 ra · model không nhớ → mỗi lượt gửi lại từ đầu" |
| 13 | Tiêu đề "agent rẻ hơn, nhanh hơn" (slide 15 lại nói ngược) | "Workflow quyết trước khi tra: tốn ~2,8× agent" |
| 15 | Header "Mã lỗi · đúng là" | "Mã lỗi → đúng là" |
| 16 | Dòng cam lặp lại tiêu đề | Bỏ |
| 18 | Câu dài ở cuối slide | "Trace = tool nào · tham số gì · bao lâu · bao nhiêu token" |
| 21 | Thẻ "Chọn mức"/"Chi phí" lỗi thời, trùng nhau | Chọn mức: liệt kê được nhánh → workflow · Chi phí: agent tốn 2,6–13×, dao động |

Đã render lại cả 23 slide và kiểm tra. Deck vẫn 23 slide.

## 16:05 — S5 slide 2 (lộ trình) vẽ lại

**Vấn đề:** 2 hàng ô (câu hỏi / phần thêm) + chú thích "↑" → người xem không hiểu slide muốn nói gì.
**Sau:** dạng bậc thang. Mỗi hàng = agent sau buổi đó; ô cam = lớp mới thêm, ô nhạt = lớp đã có. Hàng S9 = agent đầy đủ. Đã render, ok.

## 15:45 — S5 slide 2: S8, S9 viết lại bằng lời thường

| Hàng | Trước | Sau |
|---|---|---|
| S8 | "Giữ gì, khi nào dừng?" · "State, khi dừng" | "Làm dở thì sao?" · "Nhớ việc dở, biết lúc dừng" |
| S9 | "Đủ để review chưa?" · "Harness, trace" | "Sao biết agent chạy đúng?" · "Bộ test, trace" |

Giải thích state/harness chuyển vào notes.

## 15:55 — S5 slide 2: dùng tên session chính thức

**Vấn đề:** câu hỏi tự đặt ("Làm dở thì sao?"…) nghe lạ, không khái quát nội dung buổi.
**Sau:** cột trái = tên session đúng đề cương (giống trang tiêu đề mỗi deck). Ô = phần agent có thêm, thuật ngữ chuẩn: Agent tối thiểu · Tool contract · Kiểm quyền, phê duyệt · Task state, điều kiện dừng · Eval, tracing.

## 16:00 — S5 slide 1: bỏ subtitle (user đã xoá tay, bị rebuild dựng lại)

- Xoá đúng element "Session 5–9 · OpenAI Agents SDK" trên deck (deleteObject), không rebuild.
- Code builder bỏ dòng này luôn.
- ⚠ Các lần rebuild S5 hôm nay (khoảng 15:40–15:55) đã ghi đè mọi chỗ user sửa tay trên deck S5. Nếu còn chỗ khác bị mất: Google Slides → File → Version history.
- Từ giờ chỉ patch từng slide, không rebuild cả deck.

## 16:15 — S5: viết lại cho người đã học Session 1–2

**Vấn đề:** deck và notes vẫn giả định học viên chưa biết gì về AI, ví dụ warm-up ChatGPT web search, slide "Agent là gì".
Cách cập nhật deck: dùng tool mới `deck-tools/patch-slides-from-code.js`, chỉ xoá/thay đúng slide, không rebuild cả deck. Deck không ai sửa tay sau 15:47 (đã kiểm tra modifiedTime trên Drive).

| Slide | Trước | Sau |
|---|---|---|
| 3 (notes) | Warm-up "Ai bật web search trong ChatGPT…" | Warm-up nối S2: email đã extract thành JSON → muốn tự xử lý tiếp thì viết thêm bước code hay để model chọn? Ghi lựa chọn của lớp, cuối buổi đối chiếu với số đo |
| 5 cũ "Agent là gì" | Agent = LLM + Tools + Context + Code (S1/S2 đã dạy) | **Xoá**. Deck 23 → 22 slide |
| 5 (notes, 3 mức) | Giải thích cơ bản + hỏi "workflow có dùng LLM không" | "S2 đã có 4 pattern; ở đây chỉ so 3 mức trên cùng 1 yêu cầu" |
| 10 (token cộng dồn) | "model không nhớ → gửi lại từ đầu" | "input cộng dồn theo số lượt"; notes: hệ quả về tiền của điều S1 đã dạy |
| 20 Ghi nhớ | Thẻ "Agent là gì" | Thẻ "Đo trước khi chọn: chạy lặp, đúng mấy lần, token dao động bao nhiêu" |
| 21 Thử thách | Q2 "Workflow có LLM có phải agent?", Q4 "RAG muốn tạo ticket thêm gì?" | Q2 "Khi nào workflow tra trước thua agent?", Q4 "Agent đúng 19/20 — production phát hiện lần sai bằng cách nào?" (đáp án trong notes) |
| Mọi notes | Tham chiếu số slide cũ | Đã trừ đi 1 cho khớp sau khi xoá slide |

Đã render cả 22 slide, ok.

## 16:05 — S5 slide 5 "Agent là gì" thêm lại, chuyển thành slide nhắc lại

User muốn giữ slide này nhưng chỉ để nhắc lại. Kicker đổi thành "Nhắc lại · Session 1–2", nội dung hình giữ nguyên. Notes: tối đa 1 phút, không giảng lại, nối sang "hôm nay đo xem để model chọn bước thì được gì, mất gì". Deck 22 → 23 slide; tham chiếu số slide trong notes đã cộng 1 lại. Patch slide 5–23 (không ai sửa tay sau lần patch trước, đã kiểm tra trên Drive).

## 16:12 — S5 slide 5: theo slide "LLM vs Agent" của Session 1 (ChienTX)

**Vấn đề:** slide nhắc lại dùng `search_kb`, `create_ticket` của demo mình. Người xem chưa biết demo này nên không hiểu.
**Sau:** theo đúng slide 16 của ChienTX S1:
- Tiêu đề "ChatGPT, Claude không chỉ là LLM — agent là app bao quanh nó".
- Tool chung: Web search · Chạy code · Database · API · File · Memory.
- 4 bước: "LLM nói: tôi cần một tool" → app chạy tool → kết quả về LLM → lặp.
Slide 6: ô "Code chạy tool" đổi `search_kb · create_ticket` → "tra KB · tạo ticket". Chỉ patch slide 5, 6.

## 16:15 — S5: slide code 3 mức dời xuống cuối

Các session trước chỉ đưa code ra khi demo, slide chỉ nói nguyên lý → slide "Cùng một yêu cầu, 3 cách viết code" dời từ 7 → 21 (trước Ghi nhớ). Notes: tham chiếu đổi thành "sơ đồ 3 mức (slide 6)"; mọi số slide đã cập nhật lại. Patch slide 7–23, đã render, ok.
