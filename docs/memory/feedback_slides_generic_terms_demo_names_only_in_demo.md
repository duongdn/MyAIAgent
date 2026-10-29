---
name: slides-generic-terms-demo-names-only-in-demo
description: AI training GĐ3 decks — slide trước phần demo chỉ dùng từ chung; tên/ví dụ riêng của demo (search_kb, tra KB, tạo ticket, E205…) chỉ xuất hiện ở demo cuối buổi
metadata:
  type: feedback
---
Slide nói nguyên lý dùng từ chung: lấy dữ liệu, thực hiện, tool, model, code. Tên hàm hoặc ví dụ của demo, ví dụ `search_kb`, "tra KB", "tạo ticket", `max_turns`, chỉ được xuất hiện trong phần demo / code ở cuối buổi. Ví dụ cụ thể muốn nói miệng thì ghi vào notes.
**Why:** user nhắc 3 lần trong ngày 28/10: "search_kb ko có ý nghĩa ở đây", "demo ở cuối", "dùng các từ chung chung, tra kb hay tạo ticket đều ko đúng". Cách làm theo deck S1/S2 của ChienTX.
**How to apply:** trước khi patch slide, quét chữ trên slide (không tính notes) tìm tên riêng của demo; thay bằng từ chung. Liên quan [[deck-rebuild-overwrites-manual-slide-edits]].
- Chữ trên slide không được nhắc "slide N" (user: "slide 5 gì đây trời"). Tham chiếu số slide chỉ để trong notes.
