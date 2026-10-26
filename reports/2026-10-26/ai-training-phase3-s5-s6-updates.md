# AI Training GĐ3 — cập nhật S5 + S6 (2026-10-26)

File theo dõi: mỗi lần sửa thêm mục mới ở cuối file. Log trước: `reports/2026-10-20/ai-training-phase3-s5-s6-updates.md`.

---

## 13:50 — S5 slide 14–16: đi sâu hơn Session 2

**Vấn đề:** Session 2 (ChienTX, Trello 21/10) đã dạy "chọn pattern đơn giản nhất" (model call · RAG · workflow · agent). S5 slide 14–16 cũ (bảng 4 yêu cầu → mức + cây 3 câu hỏi) chỉ lặp lại phần basic đó. Phân tích trùng: `plans/reports/review-261026-1326-session2-overlap-with-s5-s6.md`.

**Đo mới (model thật, deepseek-v4.1-flash, 10 lần mỗi ô):** `support_agent_demo/compare_decision_consistency.py` → `decision_consistency.json`

| Mã lỗi (đúng là) | Mức | Đúng | Lượt gọi | Token/lần |
|---|---|---|---|---|
| E205 (không tạo) | Workflow tra trước | 10/10 | 1 | 344–395 |
| E205 | Agent | 10/10 | 2 | 1.970–2.548 |
| E999 (tạo ticket) | Workflow tra trước | 10/10 | 1 | 361–485 |
| E999 | Agent | 9/10 | 2 hoặc 4 | 2.480–6.203 |

→ Slide 13 cũ cho agent thắng là vì workflow viết sai thứ tự. Viết đúng thứ tự thì workflow đúng hơn và rẻ hơn 6–13 lần.

| Slide | Trước | Sau |
|---|---|---|
| 14 | Câu hỏi "Yêu cầu support nào cần agent?" | "Viết workflow đúng thứ tự — agent còn thắng không?" |
| 15 | Bảng 4 yêu cầu → mức (trùng S2 slide 5) | Bảng đo thật ở trên + 2 thẻ (agent sai 1/20; nhánh liệt kê được → code giữ thứ tự) |
| 16 | Cây 3 câu hỏi | "Agent chỉ đáng tiền khi code không liệt kê được nhánh": 4 tình huống, mỗi tình huống kèm số đo |
| 21 Ghi nhớ | "Chi phí: …agent rẻ ~2,8×" | "Nhánh liệt kê được → workflow rẻ 2,6–13× · Không liệt kê được → agent" |

Code: `phase3-deck/session-05-decision-slides.js` (mới), `session-05-agent-vs-workflow.js` (gọi module mới). Deck vẫn 23 slide, đã render lại slide 14–16 và kiểm tra.

### Còn mở
- Kịch bản S5 (`plans/reports/script-261016-1531-...`) do bạn đã tự sửa → mình chưa động vào; đoạn slide 14–16 trong đó đã cũ.
- S6: chưa xử lý phần trùng với S2 (slide 5, 9–11).
