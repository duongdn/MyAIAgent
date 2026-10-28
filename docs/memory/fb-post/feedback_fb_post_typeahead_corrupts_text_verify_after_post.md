---
name: fb_post_typeahead_corrupts_text_verify_after_post
description: FB composer typeahead/emoticon chèn bậy vào bài (2026-10-28 "dự Phong Cách Sexy", "8)"→😎); script giờ paste + so khớp, và phải đọc lại bài sau khi đăng
metadata:
  type: feedback
---
Gõ từng dòng bằng keyboard → FB bật gợi ý tag trang ("phòng" → page "Phong Cách Sexy") và Shift+Enter chọn luôn gợi ý; "8)" bị đổi thành emoji kính râm lúc hiển thị. User phát hiện: "Cái gì mà dự phòng cách sexy...".

**Why:** bài đăng tên thật của user; chữ lạ/nhạy cảm chèn vào là rất xấu hổ.
**How to apply:** `facebook-profile-post.js` giờ paste (ClipboardEvent) + throw `composer_text_mismatch` nếu khác file. Emoticon (`8)`, `:)`, `:D`, `<3`) FB đổi lúc HIỂN THỊ nên composer check không bắt được → tránh trong text (viết "8 cái)"). Sau mỗi lần đăng, đọc lại text bài trên FB rồi mới báo user. Liên quan [[fb_daily_post_draft_is_only_me]].
