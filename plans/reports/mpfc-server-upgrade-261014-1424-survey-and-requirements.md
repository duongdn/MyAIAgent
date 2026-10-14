# Báo cáo: MPFC nâng cấp server — khảo sát & yêu cầu

Ngày: 2026-10-14 | Trạng thái: NHÁP — chờ Saul duyệt
Nguồn: SSH read-only vào `mpfc.mpfc.live` (không thay đổi gì). Chưa gửi gì cho Saul.

## Bối cảnh
Email nháp gửi Saul (khách MPFC): đề xuất server mới Ubuntu 24.04, nâng PHP, nâng WP; prep trên server mới, downtime cutover <30 phút. Chờ Saul duyệt.

## Hiện trạng server
| Hạng mục | Giá trị |
|---|---|
| Host | DO droplet 142.93.46.109, 4 vCPU, 8GB RAM, disk 56/155GB |
| OS | Ubuntu 20.04.6 (EOL 04/2025) |
| Web/PHP | Apache2, PHP 7.4.3 |
| DB | MySQL 8.0.40, wp_mpfc 4GB |
| Khác | Redis, monit, New Relic, Let's Encrypt |
| WP | 6.6.2, theme pfc7 4.3.0.2, site 12GB |

**vhost cùng box:** mypersonalfootballcoach.com, admin., staging., staging-admin., dailyagent., quantification.youragentstore.net
**App khác cùng box:** MyDailyAgent (cron daily-report/news-digest/bailey/weekly/hello/finance-audit + mydailyagent-web), quantification-web, MyBussinessAiAgent → chuyển server ảnh hưởng luôn hệ thống cron của mình.

## Rủi ro chính — plugin, không phải OS
Plugin cũ, khả năng lỗi trên PHP 8.3:
- ACF Pro 5.2.1, Gravity Forms 2.4.15 (+Stripe 3.2, Mailchimp 4.6)
- Essential Grid 1.5.1-**custom** (bản sửa tay → không update thẳng được)
- Yoast 12.6.2, CF7 5.1.5, WP Courseware 4.6.4, json-api 1.1.1 (bỏ rơi)
- MemberMouse 3.0.22 (thanh toán) + addon WP Courseware 1.9
- go_pricing 2.4.2, mega-addons-for-visual-composer 3.1
- Code custom: theme pfc7, mpfc-firebase-bridge, video-library-manager, collections
→ Phần lớn giờ công nằm ở đây.

## Các phase
1. Chuẩn bị: snapshot droplet cũ; kiểm kê (crontab, systemd unit, apache conf, php.ini, NR, monit, /var/www/keys, utils, SMTP, ufw, DNS/Cloudflare)
2. Droplet mới Ubuntu 24.04: Apache, PHP 8.3-fpm (+ extension tương đương), MySQL 8.0, Redis, certbot, NR agent, monit
3. Copy file (rsync) + dump DB; trỏ hostname tạm / file hosts; TẮT mail gửi ra, cron, webhook MemberMouse/Stripe trên box mới
4. Tương thích PHP 8.3: quét PHPCompatibility theme+plugin; update plugin; sửa code custom (pfc7, essential-grid custom, mpfc-firebase-bridge, video-library-manager, collections)
5. WP core → mới nhất; upgrade DB; QA đầy đủ (trang, Elementor, video player, form, login member, truy cập khóa học, checkout Stripe test mode, admin)
6. Chuyển app khác (MyDailyAgent, quantification, MyBussinessAiAgent) — hoặc quyết định để lại
7. Cutover (<30 phút): maintenance mode → dump/import DB cuối + rsync uploads → đổi DNS (Cloudflare, TTL thấp) hoặc gán lại Reserved IP → cert → smoke test → bật lại cron/webhook
8. Rollback: giữ droplet cũ chạy nguyên trạng 1–2 tuần; trỏ DNS ngược lại nếu lỗi

## Cần anh cung cấp
1. Saul duyệt + duyệt estimate (gồm phần sửa plugin)
2. Quyền DigitalOcean (tạo droplet, snapshot) — hiện chỉ có SSH
3. Quyền DNS/Cloudflare (có proxy? TTL)
4. License: Elementor Pro, Gravity Forms + addon, ACF Pro, MemberMouse, WP Courseware, FV Player Pro, Essential Grid, go_pricing
5. Stripe/MemberMouse test mode để test signup/rebill/cancel
6. Phạm vi: MyDailyAgent/quantification/MyBussinessAiAgent có chuyển theo?
7. Khung giờ cutover; giữ server cũ 1–2 tuần để rollback (trả 2 droplet song song)

## Đề xuất sửa email gửi Saul
- Ghi rõ **PHP 8.3** thay vì "latest" (8.4 nhiều plugin chưa hỗ trợ)
- Nói rõ **plugin cũ cần update, vài plugin cần gia hạn license** → tránh bất ngờ về giờ công
- **Giữ server cũ làm rollback 1–2 tuần**
- **Test signup/thanh toán membership** trên server mới trước khi chuyển

## Bước tiếp theo
- Chờ Saul duyệt → nhận quyền/license → phase 1 (snapshot + kiểm kê)

## Câu hỏi chưa giải quyết
- Saul hay mình trả chi phí droplet song song?
- Có chuyển 3 app phụ không, hay tách riêng?
- Essential Grid custom sửa gì — có tài liệu/diff không?
- PHP đang chạy mod_php hay fpm (chưa kiểm)?
