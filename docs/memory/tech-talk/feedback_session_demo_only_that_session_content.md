---
name: session-demo-only-that-session-content
description: Demo/README của 1 session chỉ được chứa nội dung session đó — không để code/comment/kịch bản của session sau
metadata:
  type: feedback
---
Demo `phase3/session-05/demo/` phải chỉ có nội dung Session 5. User đã nhắc nhiều lần ("xóa hết tất cả các thứ ko liên quan session 5 !!!!") khi code còn checkpoint ①–⑤, tenant, task state, idempotency, kịch bản prompt injection của S6–S9.

**Why:** người trình bày + học viên đọc code S5 bị rối bởi khái niệm chưa học (tenant, ①–⑤ trùng ký hiệu vòng lặp ①–④); "để lại, ghi chú học sau" không đủ.

**How to apply:** khi demo dùng chung nhiều session → tách: bản tối giản trong folder session, bản đầy đủ nơi khác (đã copy sang `phase5/demo/` 30/10). Không thêm comment "[Session 7]…" vào code S5 — xoá code đó. Liên quan [[reply_in_vietnamese]].
