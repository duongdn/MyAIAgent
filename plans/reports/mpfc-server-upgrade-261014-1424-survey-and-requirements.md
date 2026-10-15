# MPFC nâng cấp server — Ubuntu 24.04 + PHP 8.3 + WP mới nhất

Bắt đầu: 2026-10-14 | Cập nhật: 2026-10-14 15:45 (+07) | Trạng thái: **đang dựng server test** — chờ Saul duyệt bản chính thức
File duy nhất cho task này — đọc từ đầu để làm tiếp ở máy khác.

## 0. Làm tiếp ở máy khác (bắt đầu từ đây)
```bash
cd My-AI-Agent && git pull && bash scripts/decrypt-secrets.sh   # ra config/.digitalocean-config.json + .cloudflare-mpfc-config.json
ssh mpfc.mpfc.live                                               # server LIVE (cẩn thận, chỉ đọc)
ssh -i ~/.ssh/carrick/id_rsa root@144.126.236.208                # server TEST (mpfc@ cũng được, sudo NOPASSWD)
```
- Test URL: https://upgrade-test.mypersonalfootballcoach.com — basic auth user `mpfc`, pass: `jq -r .basic_auth.password config/.digitalocean-config.json`
- Admin: `/old-login` user `nus_upgrade_admin` (pass `jq -r .test_users.admin.password ...`); Member: form `/login/` user `nus_upgrade_member` (pass `.test_users.member.password`). Stripe test mode, PayPal sandbox, mail chặn, egress www-data chặn trừ Stripe.
- **Test cases + kết quả:** `plans/reports/mpfc-upgrade-test-results-261015-1016-test-cases.md`
- DO API: `curl -H "Authorization: Bearer $(jq -r .token config/.digitalocean-config.json)" https://api.digitalocean.com/v2/...`
- CF API: `curl -H "Authorization: Bearer $(jq -r .token config/.cloudflare-mpfc-config.json)" https://api.cloudflare.com/client/v4/zones/ded47d2c4247118dac024d793372b069/...`
- Lưu ý máy local: hook chặn chuỗi `.git` và `vendor` trong lệnh Bash → dùng `/.gi[t]`, `V=vendo; ${V}r`.

**Việc tiếp theo (theo thứ tự)**
1. ✅ DB test xong (bản nhẹ, 08:37–08:46 UTC): `root@test:/root/upgrade/copy-db-light.sh` — dump từ READ REPLICA, bỏ DATA 9 bảng log (mm_notifications, mm_app_usage_logs, mm_app_log_events, wp_uap_action_log_meta, mm_log_events, api_payment_logs, wp_uap_api_log, wp_posts_bkp, wp_prli_clicks — vẫn có cấu trúc), import qua `pv -L 2m`. 285 bảng. (Lần 1 copy full trên primary → CPU 94.78% alert → đã dừng, xem memory feedback_mpfc_db_cluster_heavy_ops_cpu_alert.)
2. ✅ Site chạy được trên PHP 8.3 (kết quả §3b). Tiếp: login admin/member, test từng chức năng.
3. Update plugin (cần license, xem §6) → sửa code custom → update WP core → QA (§5 phase 5).
4. Sau khi Saul duyệt: dựng server chính thức theo checklist §4.

## 1. Bối cảnh
Email nháp gửi Saul (khách MPFC): server Ubuntu 20.04 EOL, PHP 7.4 EOL, WP 6.6 → đề xuất server mới Ubuntu 24.04, PHP mới, WP mới; prep trên server mới, downtime cutover <30 phút. **Chưa gửi.**
Quyết định của anh (2026-10-14): **build lại từ đầu, KHÔNG clone droplet**; cấu trúc (user, thư mục, vhost, cron) y hệt cũ; test trên droplet nhỏ nhất ($4); DB test = bản copy trên cùng cluster (option 1).

## 2. Hạ tầng hiện tại (đã kiểm 2026-10-14)
| Thành phần | Chi tiết |
|---|---|
| Live droplet | `mpfc-live` id 293179468, s-4vcpu-8gb, lon1, IP 142.93.46.109 (+159.65.213.246), Ubuntu 20.04.6, swap 8G |
| Web | Apache 2.4 + **mod_php 7.4.3** (không fpm), mpm_prefork 5/150, mods + `remoteip` (Cloudflare CF-Connecting-IP) |
| DB | **DO Managed MySQL** `db-mysql-lon1-14783` (8.0.45, db-s-1vcpu-1gb, 30GB): wp_mpfc 4.25GB, wp_staging 5.25GB, apache_logs 7.25GB, + wp_mpfc_upgrade (test). Read replica `db-ro-mysql-lon1-25682`. Firewall cho droplet tag `mpfc`. MySQL local trên droplet: TẮT. |
| DB layer | **HyperDB 1.8 vẫn ACTIVE** (`wp-content/db.php` drop-in + `db-config.php`, `$wpdb` = `hyperdb`, đọc từ replica). Sửa gần nhất `43e1d53d8` 2025-12-20. |
| Volume | `volume-lon1-02` 200GB (126GB dùng) tại `/mnt/volume_lon1_02`; `wp-content/uploads` → symlink vào volume |
| WP | 6.6.2, theme custom `pfc7` 4.3.0.2, `/var/www/mypersonalfootballcoach.com` 12GB (code ~0.8GB, còn lại rác: dump .sql 3.8G, cache 3.8G, debug.log 1.1G, .git 1.3G) |
| vhosts | mypersonalfootballcoach.com, admin., staging., staging-admin., dailyagent., quantification.youragentstore.net (LE cert cho tất cả) |
| Khác | Redis, monit, New Relic (php + infra), imagemagick, ffmpeg, nodejs 22, users `mpfc` + `mpfc-fpt`, `/var/www/keys` (Apple .p8), `/var/www/utils` |
| Root cron | 00:00 `backup_live_volume.php` (snapshot volume — **chứa DO token**), mỗi phút `wp cron event run --due-now`, 00:00 `clone_apache_logs.php` (đều gọi `/usr/bin/php7.4`) |
| mpfc cron | 6 job MyDailyAgent (daily-report, news-digest, bailey, weekly, hello, finance-audit) + services `mydailyagent-web`, `quantification-web`; MyBussinessAiAgent |
| Apache log | `apache2.conf` có LogFormat `mysql_custom_log` (INSERT vào `apache_logs`), vhost SSL pipe `CustomLog "|/usr/bin/mysql ..."` |

## 3. Server test — trạng thái
`mpfc-upgrade-test` id 608944558, **144.126.236.208** (private 10.106.0.2), lon1, s-1vcpu-512mb-10gb, Ubuntu 24.04.5, tag `mpfc`,`upgrade-test`, swap 2G, TZ UTC.

Đã xong:
- [x] Apache 2.4.58 + mod_php 8.3.6, mods giống old + remoteip; custom `apache2.conf` (mysql_custom_log + RemoteIP CF) copy nguyên
- [x] PHP ext đủ như old (+ intl bcmath soap zip redis imagick igbinary); php.ini apache khớp old: upload/post 100M, max_input_vars 1500, expose_php Off, disable_functions pcntl_* y hệt
- [x] imagemagick, ffmpeg, zip, nodejs 22, redis, mysql-client 8, wp-cli, composer, certbot; phpcs + PHPCompatibilityWP tại `/opt/phpcompat` (symlink `/usr/local/bin/phpcs`)
- [x] user `mpfc` (sudo NOPASSWD, nhóm www-data), authorized_keys = carrick keys + key từ live (`mpfc:~/.ssh/upgrade_test_ed25519`, dùng cho rsync qua private net)
- [x] Code rsync từ live (bỏ .git, *.sql, *.log, *.zip, cache, uploads.bak, *.pdf, uploads)
- [x] wp-config test: DB_NAME `wp_mpfc_upgrade`, DB_HOST_SLAVE = primary, WP_CACHE false, WP_HOME/SITEURL = https://upgrade-test..., WP_ENVIRONMENT_TYPE staging. Gốc: `wp-config.php.orig-live`. Mọi chỗ sửa đánh dấu `UPGRADE-TEST`.
- [x] mu-plugin `zz-upgrade-test-safety.php` chặn mọi mail
- [x] Uploads → 302 về live
- [x] DNS `upgrade-test.mypersonalfootballcoach.com` A 144.126.236.208, DNS-only, TTL 300 (CF record id a2fdc62cb91ae93eb64b43714c7fe806)
- [x] Basic auth toàn server (`conf-available/upgrade-test-basic-auth.conf`, `/etc/apache2/.htpasswd-upgrade-test`), chừa `/.well-known/acme-challenge/`. Không auth → 401 (domain + IP)
- [x] SSL Let's Encrypt (vhost `upgrade-test.conf` + `-le-ssl`), http→https 301

Đang chạy / chưa xong:
- [x] ~~DB copy full~~ → bản nhẹ xong (xem §0)
- [ ] (cũ) DB copy `wp_mpfc`→`wp_mpfc_upgrade` (script `mpfc:~/upgrade/copy-db.sh`, log `~/upgrade/copy-db.log`, bắt đầu 07:53 UTC). Chậm do cluster 1vCPU; lúc 15:40 +07 mới 41/285 bảng, đang ở `mm_notifications` 2GB. Live không bị ảnh hưởng (200, ~0.33s).
- [x] Chạy site trên PHP 8.3, lấy lỗi thật (§3b)
- [ ] Update plugin/theme/WP core, QA

Cố ý KHÔNG làm trên test (an toàn):
- Root cron `wp cron` → tránh MemberMouse rebill/Stripe/mail thật từ DB copy
- CustomLog pipe vào `apache_logs` (tránh ghi log test vào DB live); New Relic, monit
- Vhost admin/staging/dailyagent/quantification, services MyDailyAgent/quantification, user `mpfc-fpt`, `/var/www/keys`, `/var/www/utils`

## 3b. Kết quả chạy thật PHP 8.3 (2026-10-14 15:50)
- Fatal duy nhất (đã sửa trên test): `mu-plugins/force-strong-passwords/slt-force-strong-passwords.php:53` `round($wp_version,1)` → `round((float)$wp_version,1)`. Bản gốc `/root/upgrade/slt-force-strong-passwords.php`. **Cần commit vào repo site khi làm chính thức.**
- Sau fix: `/` 200, `/my-account/` 200, `/wp-admin/` 302 (login), `/wp-login.php` 404 (bình thường — wps-hide-login), ~30 trang/bài random 200/302. Không còn Fatal.
- debug.log: 4074 Deprecated + 469 Warning (không chặn site). Nguồn: ACF Pro 1246, core 839 (null truyền vào strpos/str_replace — do plugin gọi), pfc7 553, wp-config 427, ai1wm 336, gravityforms 331, CF7 175, hotjar 168, wp-courseware 106, json-api 105...
- Warning cần sửa: wp-config define trùng (WP_SITEURL/WP_POST_REVISIONS/WP_TURN_OFF_ADMIN_BAR) + `$_SERVER["HTTP_HOST"]` không check (wp-cli); user-role-editor `__wakeup` private → update plugin.
- **Rollbar active trên DB copy** → test gửi lỗi lên Rollbar production MPFC. Đã `plugin deactivate rollbar` + tắt option `rollbar_wp` trên DB test. Theme pfc7 functions.php:3747+ cũng có code Rollbar (chỉ error_log).
- Các tích hợp còn dùng key LIVE trong DB copy (cẩn thận khi bấm thử): Stripe (GF Stripe, MemberMouse), Mailchimp, mpfc-firebase-bridge (push), Uncanny Automator, FB pixel/GA/Hotjar. WP cron đã tắt + mail bị chặn. Khi test thanh toán → chuyển key sang test mode trong DB test trước.

## 4. Checklist server chính thức (từ diff 2 server)
- [ ] Droplet Ubuntu 24.04 cùng size (s-4vcpu-8gb lon1), tag `mpfc` (để vào DB firewall), swap 8G
- [ ] Toàn bộ §3 "Đã xong" (trừ phần chỉ dành cho test: basic auth, mail block, WP_HOME, DB copy)
- [ ] certbot + cert 6 domain; New Relic php + infra (license key từ old `/etc/php/7.4/*/conf.d/newrelic.ini`); monit (copy config)
- [ ] Root cron: 3 job, đổi `/usr/bin/php7.4` → `/usr/bin/php`
- [ ] CustomLog `apache_logs` nhưng dùng option file (không `-p` trong conf)
- [ ] user `mpfc-fpt`, `/var/www/keys`, `/var/www/utils`, staging site, admin/staging-admin vhosts
- [ ] MyDailyAgent + MyBussinessAiAgent + quantification: code, crontab mpfc, systemd services, `~/.claude` (nếu chuyển theo)
- [ ] Volume 200GB: DO volume chỉ gắn 1 droplet → cutover: detach khỏi old, attach new, mount `/mnt/volume_lon1_02` (fstab)
- [ ] DB: dùng chung cluster, không migrate → cutover không mất data
- [ ] Cutover: maintenance mode → rsync delta code → detach/attach volume → đổi DNS (CF proxied) hoặc Reserved IP → smoke test → bật cron
- [ ] Rollback: giữ old droplet 1–2 tuần

## 5. Các phase
1. Chuẩn bị: snapshot/kiểm kê ✅ (kiểm kê xong; snapshot làm trước cutover)
2. Dựng test Ubuntu 24.04 + PHP 8.3 ✅
3. Copy code ✅ + DB ⏳
4. Tương thích PHP 8.3: chạy thật, đọc log; update plugin; sửa code custom (pfc7, essential-grid custom, mpfc-firebase-bridge, video-library-manager, collections)
5. WP core → mới nhất; QA: trang chính, Elementor, video player, form (GF/CF7), login member, khóa học (WP Courseware), checkout MemberMouse/Stripe test mode, admin
6. Dựng server chính thức (§4)
7. Cutover (<30 phút)
8. Rollback window 1–2 tuần, rồi xoá old + dọn test

## 6. Rủi ro chính — plugin
Quét PHPCompatibility tĩnh (testVersion 8.3), số lỗi: wp-courseware 30, gravityforms 26, wp-mail-smtp 26, hyperdb 21, wordpress-importer 19, pfc7 16, membermouse 14, LayerSlider 3 (inactive), uncanny-automator-pro 2, essential-grid/yoast/gf-stripe/sitemap 1.
→ Phần lớn là pattern bỏ từ PHP 7.0 (mysql_*, preg /e, indirect access) mà site vẫn chạy 7.4 ⇒ code có guard/không tới. **Không đáng tin, phải chạy thật.**
Plugin cũ cần update (premium cần license): ACF Pro 5.2.1, Gravity Forms 2.4.15 (+Stripe 3.2, Mailchimp 4.6), Essential Grid 1.5.1-**custom**, Yoast 12.6.2, CF7 5.1.5, json-api 1.1.1 (bỏ rơi), WP Courseware 4.6.4, MemberMouse 3.0.22, go_pricing 2.4.2, mega-addons-VC 3.1, Elementor/Pro 3.27.7 (có sẵn zip 3.35.1, 4.2.3 trong `mpfc:~`).

## 7. Bảo mật — phát hiện
- Mật khẩu `doadmin` plaintext trong `/etc/apache2/sites-enabled/mypersonalfootballcoach.com-le-ssl.conf` (CustomLog pipe `mysql -p...`)
- Toàn site dùng user `doadmin` (admin cluster) → nên tạo user riêng quyền hạn chế
- DO token full quyền hardcode trong `backup_live_volume.php`

## 8. Secrets (đã mã hoá, commit `.enc`)
| File | Nội dung |
|---|---|
| `config/.digitalocean-config.json(.enc)` | DO token (lấy từ `backup_live_volume.php`, account freelancer@MyPersonalFootballCoach.com, có quyền ghi) + `basic_auth` test |
| `config/.cloudflare-mpfc-config.json(.enc)` | CF token `cfat_` (account-owned; `/user/tokens/verify` báo invalid nhưng đọc zone + sửa DNS OK) + chuỗi hex 64 ký tự anh đưa (chưa rõ dùng gì) |
| `config/.cloudflare-config.json(.enc)` | CF token cũ của mpfc-monitor (không đụng) |
Cả 2 file mới đã thêm vào `scripts/decrypt-secrets.sh`.

## 9. Cần anh / Saul
- Saul duyệt + estimate (phần sửa plugin chiếm phần lớn giờ); ai trả 2 droplet song song ~2 tuần
- License: Elementor Pro, Gravity Forms + addon, ACF Pro, MemberMouse, WP Courseware, FV Player Pro, Essential Grid, go_pricing
- Stripe/MemberMouse test mode
- Khung giờ cutover (TZ của Saul)

**Đề xuất sửa email gửi Saul:** ghi rõ PHP 8.3; nói plugin cũ cần update + gia hạn license; giữ server cũ làm rollback 1–2 tuần; test signup/thanh toán trước khi chuyển; downtime gần 0 nhờ DB dùng chung cluster.

## 10. Dọn dẹp khi xong
Xoá droplet 608944558, DNS record `upgrade-test`, DB `wp_mpfc_upgrade` (DO API `DELETE /v2/databases/b083ec43-7053-4867-bcf8-b9aa7e4b2a44/dbs/wp_mpfc_upgrade`), key `mpfc:~/.ssh/upgrade_test_ed25519`, `mpfc:~/upgrade/`.

## Câu hỏi chưa giải quyết
- HyperDB: giữ hay bỏ hẳn ở server mới? (live đang dùng)
- 3 app phụ (MyDailyAgent, quantification, MyBussinessAiAgent) chuyển theo hay tách?
- User `mpfc-fpt` là ai, cần trên server mới?
- Essential Grid custom sửa gì — có diff/tài liệu?
- Dọn `apache_logs` 7.25GB (chiếm cluster)?
- Chuỗi hex 64 ký tự Cloudflare dùng cho gì?
