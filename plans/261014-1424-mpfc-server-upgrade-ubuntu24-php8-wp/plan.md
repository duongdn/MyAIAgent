# MPFC nâng cấp server — Ubuntu 24.04 + PHP 8.3 + WP mới nhất

Trạng thái: NHÁP — chờ Saul duyệt + thông tin đầu vào (xem cuối file)
Báo cáo khảo sát: `plans/reports/mpfc-server-upgrade-261014-1424-survey-and-requirements.md`

## Hiện trạng (kiểm tra read-only 2026-10-14)
- Droplet DO 142.93.46.109, 4 vCPU / 8GB / 155GB (dùng 56GB), Ubuntu 20.04.6 (EOL)
- Apache2 + PHP 7.4.3, MySQL 8.0.40, Redis, monit, New Relic PHP agent, chứng chỉ LE
- WP 6.6.2, theme pfc7 4.3.0.2, DB wp_mpfc 4GB, thư mục site 12GB
- vhosts: mypersonalfootballcoach.com, admin., staging., staging-admin., dailyagent., quantification.youragentstore.net
- Cùng box: cron MyDailyAgent (6 job) + mydailyagent-web.service, quantification-web.service, MyBussinessAiAgent

## Rủi ro lớn nhất
1. Plugin rất cũ so với PHP 8.3: ACF Pro 5.2.1, Gravity Forms 2.4.15 (+Stripe 3.2, Mailchimp 4.6), Essential Grid 1.5.1-**custom**, Yoast 12.6, CF7 5.1.5, json-api 1.1.1 (bỏ rơi), WP Courseware 4.6.4, MemberMouse 3.0.22, go_pricing 2.4, mega-addons-VC, theme custom pfc7. Plugin premium cần license để update.
2. MemberMouse = thanh toán/membership → phải test signup, login, rebill webhook, cancel.
3. Box dùng chung: cron agent của mình + 2 app khác phải chuyển theo (hoặc ở lại box cũ).
4. Cutover: DB có ghi mới (signup/payment) trong lúc sync → dump delta DB cuối cùng khi bật maintenance mode.

## Các phase
1. Chuẩn bị: snapshot droplet cũ; kiểm kê (crontab, systemd unit, apache conf, php.ini, NR, monit, /var/www/keys, utils, SMTP, ufw, DNS/Cloudflare)
2. Droplet mới Ubuntu 24.04: Apache, PHP 8.3-fpm (+ extension tương đương), MySQL 8.0, Redis, certbot, NR agent, monit
3. Copy file (rsync) + dump DB; trỏ hostname tạm / file hosts; TẮT mail gửi ra, cron, webhook MemberMouse/Stripe trên box mới
4. Tương thích PHP 8.3: quét PHPCompatibility theme+plugin; update plugin; sửa code custom (pfc7, essential-grid custom, mpfc-firebase-bridge, video-library-manager, collections)
5. WP core → mới nhất; upgrade DB; QA đầy đủ (trang, Elementor, video player, form, login member, truy cập khóa học, checkout Stripe test mode, admin)
6. Chuyển app khác (MyDailyAgent, quantification, MyBussinessAiAgent) — hoặc quyết định để lại
7. Cutover (<30 phút): maintenance mode → dump/import DB cuối + rsync uploads → đổi DNS (Cloudflare, TTL thấp) hoặc gán lại Reserved IP → cert → smoke test → bật lại cron/webhook
8. Rollback: giữ droplet cũ chạy nguyên trạng 1–2 tuần; trỏ DNS ngược lại nếu lỗi

## Cần từ anh / Saul
- Saul duyệt + ai trả tiền droplet mới (chạy song song ~2 tuần)
- Quyền DigitalOcean (tạo droplet/snapshot/Reserved IP) — hiện chỉ có SSH
- DNS: quyền Cloudflare (có proxy không? TTL)
- License: Elementor Pro, Gravity Forms + addon, ACF Pro, MemberMouse, WP Courseware, FV Player Pro, Essential Grid, go_pricing
- MemberMouse/Stripe: xác nhận URL webhook giữ nguyên (theo domain); quyền test mode
- Khung giờ cutover (giờ ít traffic, theo TZ của Saul)
- Phạm vi: app khác trên box có chuyển theo không?
- Duyệt estimate (phần sửa tương thích plugin có thể chiếm phần lớn giờ)
