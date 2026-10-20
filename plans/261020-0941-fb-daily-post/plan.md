# FB Daily Post — Plan

Trello task: đăng 1 bài FB (sau này Zalo) mỗi ngày. Default = draft, user review rồi submit.

## Decisions (user, 2026-10-20)
- Target: trang cá nhân (no API → puppeteer, dedicated profile `tmp/facebook-profile`, xvfb, KHÔNG xdotool trên DISPLAY thật)
- Sources: news-digest, finance-report, ghi chú user (`docs/fb-post-ideas/`), trải nghiệm làm việc (memory/report, đã lọc tên khách hàng), + tự tìm ý tưởng hợp phong cách user
- Draft: nằm trên FB. Profile không có tính năng "nháp" thật → đăng audience **"Chỉ mình tôi"** = draft; submit = đổi audience → Công khai/Bạn bè
- Tiếng Việt, cron 07:00 VN

## Phases
| # | Phase | Status |
|---|-------|--------|
| 1 | Style profile — bỏ (user chưa có bài cũ) | skipped |
| 2 | Content picker: gom nguồn 3 ngày gần nhất, chống trùng với `data/fb-post-history.json` | done |
| 3 | `scripts/facebook-profile-post.js` — `--draft` (Only me) / `--submit <postUrl> [--audience public\|friends]` / `--dry-run` | done |
| 4 | Command `.claude/commands/me/fb-post.md` (`/me:fb-post`, `--submit`) | done |
| 5 | `scripts/autorun-fb-post.sh` + crontab `0 7 * * *` (skip nếu đã có draft hôm nay) | done |
| 6 | Test dry-run → 1 draft thật → user submit thử | draft thật done, submit chờ user |

## Guardrails
- Không bao giờ auto đổi sang Public; chỉ khi user chạy `--submit`
- Lọc tên khách hàng/dev/số tiền nội bộ trước khi viết
- Finance: thêm câu "không phải khuyến nghị đầu tư"
- Log post URL + nguồn vào history để không lặp chủ đề

## Risks
- FB đổi DOM / checkpoint → script chụp screenshot + báo lỗi qua Matrix, không retry mù
- Session hết hạn → cần user login lại 1 lần vào profile riêng

## Unresolved
- URL profile FB của user (để học văn phong)
- Profile `tmp/facebook-profile` đang login tài khoản nào — có đúng tài khoản sẽ đăng không
