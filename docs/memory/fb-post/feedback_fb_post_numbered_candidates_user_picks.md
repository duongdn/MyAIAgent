---
name: feedback_fb_post_numbered_candidates_user_picks
description: FB post flow changed 2026-10-26 — cron posts nothing; it writes 10–15 numbered candidates and the user picks by number; read the user's own FB timeline to rotate topics
metadata:
  type: feedback
---

User (2026-10-26): "fb post tuần này chưa ok, mỗi ngày chỉ có 1 tin ko ổn, random maximum tin có thể đi để tôi chọn, đánh số để tôi post lên nếu cần; đọc thêm fb của tôi để luân chuyển chủ đề".

**Why:** one auto-picked draft a day often missed the user's taste. They want to choose from many options.
**How to apply:**
- The cron (08:45) writes `docs/fb-post/candidates/{date}.json` and `reports/{date}/{HHMM}-fb-post-candidates.md` with 10–15 numbered posts across all types. It NEVER posts.
- `/me:fb-post --pick N` posts the user's choice, publicly by default, and completes the Trello card.
- Before writing, run `node scripts/facebook-profile-post.js --list-own-posts --limit=20`. Lower the priority of topics the user posted in the last ~3 days (the user also posts by hand: running, recruiting, family TV show).
- Read NUS blog posts before writing about them, not just the titles.

Related: [[project_fb_post_content_types_rotation]] [[feedback_fb_post_write_for_general_public_no_jargon]]

- 2026-10-26: caption kỷ niệm "đánh nhau xong rủ nhau đi ăn" bị user hỏi "là cái gì vậy" vì nó viết theo nghĩa đen câu đùa của bài gốc, trong khi ảnh là hội bạn đi ăn gà rán. Trước khi viết caption fb-memory phải xem ảnh (dry-run screenshot), và report phải mô tả kỷ niệm gốc.
- 2026-10-26: user: "ko có bài viết sao tôi biết là bài nào được" + "ko đủ các category". Mỗi ứng viên giờ phải có Nguồn (tiêu đề, nơi đăng, link, tóm tắt) + ảnh xem trước; mỗi type ≥2 bài, phải thử hết nguồn dự phòng trước khi bỏ một type.
