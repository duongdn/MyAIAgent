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

## Cập nhật 2026-10-14 14:45 — quyết định & hạ tầng thật
- **Build lại từ đầu, KHÔNG clone droplet**; cấu trúc thư mục/vhost/user/cron y hệt server cũ.
- **DO token**: lấy từ `mpfc:/var/www/mypersonalfootballcoach.com/scripts/backup_live_volume.php` (script snapshot volume, root cron 00:00). Lưu local `config/.digitalocean-config.json` (gitignored). Account `freelancer@MyPersonalFootballCoach.com`, token có quyền ghi (đã tạo droplet được).
- **Droplet test đã tạo**: `mpfc-upgrade-test` id 608944558, 144.126.236.208, lon1, s-1vcpu-512mb-10gb ($4), Ubuntu 24.04.5, tag `mpfc`,`upgrade-test`, SSH `root@` key `~/.ssh/carrick/id_rsa`.
- **DB KHÔNG nằm trên droplet**: dùng DO Managed MySQL `db-mysql-lon1-14783` (8.0.45, db-s-1vcpu-1gb, 30GB). DB: wp_mpfc 4.25GB, wp_staging 5.25GB, apache_logs 7.25GB → dùng ~17GB, trống ~13GB. Có read replica `db-ro-mysql-lon1-25682`. Firewall DB cho phép tag `mpfc` → droplet test kết nối được luôn. MySQL local trên server cũ đã tắt.
- **Dữ liệu site** nằm trên volume `volume-lon1-02` 200GB (dùng 126GB) mount `/mnt/volume_lon1_02`; `/var/www/*` symlink vào đó. Droplet test KHÔNG copy uploads → proxy ảnh về live.
- **Server cũ thực tế**: droplet 293179468 `mpfc-live` s-4vcpu-8gb, IP 142.93.46.109 + 159.65.213.246. Root cron: snapshot volume, `wp cron` mỗi phút, clone_apache_logs (php7.4).

### DB cho server test (chưa làm, chờ anh chốt)
- KHÔNG trỏ thẳng vào `wp_mpfc` live: nâng WP core/plugin sẽ chạy migration DB → đổi schema/option của site live đang chạy WP 6.6/PHP 7.4 → hỏng live.
- Đề xuất: copy `wp_mpfc` → `wp_mpfc_upgrade` ngay trên cùng cluster (dump|import qua pipe, không tốn disk droplet; cluster còn đủ chỗ). Lưu ý: cluster chỉ 1vCPU/1GB → chạy copy giờ thấp điểm, có thể làm chậm live vài phút.
- Hoặc dùng luôn `wp_staging` có sẵn (không cần copy) nếu staging không còn ai dùng.
- Server mới chính thức: dùng chung cluster này, KHÔNG cần dump/migrate DB khi cutover → downtime gần 0.

## Cập nhật 2026-10-14 15:40 — dựng server test + so sánh 2 server
### HyperDB VẪN ĐANG CHẠY trên live (không phải đã bỏ)
- `wp-content/db.php` = HyperDB 1.8 drop-in; `wp eval get_class($wpdb)` → `hyperdb`. Sửa gần nhất commit `43e1d53d8` 2025-12-20 "FIX: HyperDB read-only slave write failures"; đọc từ replica `db-ro-mysql-lon1-25682`.
- Thư mục `plugins/hyperdb`, `plugins/hyperdb-1-1` có nhưng không active (drop-in tự load, không cần active).
- Server test: giữ db.php, nhưng `DB_HOST_SLAVE` = primary (replica không phục vụ DB test). Muốn bỏ HyperDB → xoá `wp-content/db.php` + `db-config.php` (quyết định riêng).

### Đã làm trên server test (144.126.236.208)
- Apache 2.4.58 + mod_php 8.3.6 (giống old: mod_php, không fpm), mpm_prefork 5/150, mods = old + remoteip; custom `apache2.conf` (LogFormat `mysql_custom_log` + RemoteIP Cloudflare) copy nguyên
- PHP ext: đủ như old (curl gd mbstring xml mysqli exif sockets...) + thêm intl bcmath soap zip redis imagick igbinary; `json` built-in từ 8.0
- php.ini apache khớp old: upload/post 100M, max_input_vars 1500, expose_php Off, disable_functions pcntl_* y hệt
- imagemagick, ffmpeg, zip, nodejs 22, redis-server, mysql-client 8, wp-cli, composer, phpcs (PHPCompatibility tại /opt/phpcompat)
- user `mpfc` (sudo, www-data) + swap 2G; TZ UTC
- Code: rsync từ live (0.8GB), bỏ .git/*.sql/*.log/cache/uploads.bak/pdf/uploads. Uploads → 302 về live.
- wp-config test: DB `wp_mpfc_upgrade`, WP_CACHE off, WP_HOME `http://144.126.236.208`, gốc lưu `wp-config.php.orig-live`; mu-plugin `zz-upgrade-test-safety.php` chặn mọi mail
- DB copy `wp_mpfc`→`wp_mpfc_upgrade` đang chạy nền (script `mpfc:~/upgrade/copy-db.sh`, log `~/upgrade/copy-db.log`); chậm do cluster 1vCPU, kẹt ở `mm_notifications` 2GB; live vẫn 200/0.33s

### Cố ý KHÔNG làm trên test (làm khi dựng server chính thức)
- KHÔNG root cron `wp cron event run` mỗi phút → tránh MemberMouse rebill/Stripe/mail thật từ DB copy
- KHÔNG CustomLog pipe vào `apache_logs` (tránh ghi log test vào DB live); không SSL/certbot (chưa có domain test); không New Relic, monit
- Không các vhost admin/staging/dailyagent/quantification, mydailyagent-web/quantification-web services, cron MyDailyAgent, user `mpfc-fpt`, /var/www/keys (.p8 Apple), /var/www/utils
- Swap 8G→2G, disk 10GB (giới hạn gói $4); MaxRequestWorkers 150 với 512MB dễ OOM nếu tải test

### Checklist server chính thức (từ diff)
certbot + cert 6 domain, newrelic-php + infra (license key lấy từ old newrelic.ini), monit, root cron (backup_live_volume.php, wp cron, clone_apache_logs.php — đang gọi `/usr/bin/php7.4` → đổi `php`), user mpfc-fpt, /var/www/keys, staging, MyDailyAgent+MyBussinessAiAgent+services, gắn volume 200GB (DO volume chỉ gắn 1 droplet → cutover phải detach/attach), swap 8G

### Phát hiện bảo mật
- Mật khẩu `doadmin` DB nằm plaintext trong `/etc/apache2/sites-enabled/mypersonalfootballcoach.com-le-ssl.conf` (CustomLog pipe `mysql -p...`) → server mới dùng `~/.my.cnf`/option file thay vì -p.
- Toàn bộ site dùng user `doadmin` (admin cluster) → nên tạo user riêng quyền hạn chế.

### Quét PHPCompatibility 8.3 (tĩnh)
- Lỗi báo ở db.php (mysql_*), pfc7/wpbakery (cú pháp PHP5), gravityforms 26, wp-courseware 30, wp-mail-smtp 26, membermouse 14... Phần lớn là pattern đã bị bỏ từ PHP 7.0 mà site vẫn chạy 7.4 → code có guard/không tới. Không đáng tin → phải chạy thật trên test, đọc debug.log.

## Cập nhật 2026-10-14 15:30 — domain test + basic auth
- Cloudflare token (Freelancer account, cfat_ account-owned) lưu `config/.cloudflare-mpfc-config.json` (gitignored). `/user/tokens/verify` báo invalid (bình thường với account token) nhưng đọc zone + TẠO DNS được. Zone `mypersonalfootballcoach.com` id `ded47d2c4247118dac024d793372b069`, SSL mode `full`.
- DNS: `upgrade-test.mypersonalfootballcoach.com` A 144.126.236.208, DNS-only (không proxy), TTL 300, record id `a2fdc62cb91ae93eb64b43714c7fe806`.
- Basic auth toàn server (`/etc/apache2/conf-available/upgrade-test-basic-auth.conf`, chừa `/.well-known/acme-challenge/`): user `mpfc`, pass trong `config/.digitalocean-config.json` → `basic_auth`. Truy cập không auth → 401 (cả domain lẫn IP).
- SSL Let's Encrypt (certbot --apache), http→https 301. vhost riêng `upgrade-test.conf`. WP_HOME/SITEURL = https://upgrade-test.mypersonalfootballcoach.com
- Dọn khi xong: xoá DNS record, droplet, DB `wp_mpfc_upgrade`.

## Câu hỏi chưa giải quyết
- Saul hay mình trả chi phí droplet song song?
- Có chuyển 3 app phụ không, hay tách riêng?
- Essential Grid custom sửa gì — có tài liệu/diff không?
- ~~mod_php hay fpm~~ → mod_php (đã kiểm)
- HyperDB: giữ hay bỏ hẳn ở server mới?
- User `mpfc-fpt` là ai, có cần trên server mới?
- ~~DB test~~ → copy `wp_mpfc_upgrade` (đã chốt)
- Chuyển cả apache_logs (7.25GB, chiếm cluster) hay dọn bớt?
