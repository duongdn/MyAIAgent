# MPFC upgrade — Test result (PHP 8.3 / Ubuntu 24.04)

Cập nhật: 2026-10-15 10:20 (+07) | Server test: https://upgrade-test.mypersonalfootballcoach.com
Handover chính: `plans/mpfc-upgrade/handover.md` (§0 có cách login).
**Từ 2026-10-15 11:10: đã UPGRADE** WP 6.6.2 → **7.1.3** + 63 plugin wp.org (xem §7). Mục 1–6 bên dưới là vòng test trước upgrade; §7 là kết quả sau upgrade.

Ký hiệu: ✅ pass | ❌ fail (lỗi thật) | ⚠️ fail do môi trường test | ⏳ đang test | 🙋 anh test giúp | ⛔ không test được trên test server

## Thông tin test
| | |
|---|---|
| URL | https://upgrade-test.mypersonalfootballcoach.com |
| Basic auth | user `mpfc` — pass: `jq -r .basic_auth.password config/.mpfc-upgrade-test-config.json` |
| Admin | `/old-login` — user `nus_upgrade_admin` — pass: `jq -r .test_users.admin.password config/.mpfc-upgrade-test-config.json` |
| Member | form MemberMouse `/login/` — user `nus_upgrade_member` (MPFC Membership, Active) — pass: `jq -r .test_users.member.password config/.mpfc-upgrade-test-config.json` |
| Team member | form `/login/` — user `nus_upgrade_team` (subscriber, MPFC Membership, team key `NUS-UPGRADE-TEST` id 144) — pass: `jq -r .test_users.team_member.password config/.mpfc-upgrade-test-config.json` |
| Team manager | form `/login/` — user `nus_upgrade_manager` (role `team-manager`, MPFC Membership; ở `/team-manager/` lọc team key `NUS-UPGRADE-TEST` → thấy `nus_upgrade_member` + `nus_upgrade_team`; không lọc = toàn bộ ~33k user MPFC Membership) — pass: `jq -r .test_users.team_manager.password config/.mpfc-upgrade-test-config.json` |
| Thẻ Stripe test | `4242 4242 4242 4242`, hạn bất kỳ tương lai, CVC bất kỳ |
| Smoke script | `env -u DISPLAY ONLY=admin,member,guest OUT=out.json EXTRA=/?p=123 node scripts/mpfc-upgrade-smoke-test.js` |

(Pass không ghi thẳng vào file vì repo push GitHub — chạy `bash scripts/decrypt-secrets.sh` rồi lệnh jq.)

Môi trường test khác live (cố ý): mail bị chặn, PHP không gọi ra ngoài được (trừ Stripe), Stripe/PayPal ở test/sandbox, không có wp cron, uploads redirect về live, droplet 512MB (chậm, không đo hiệu năng).

## 1. Hạ tầng
| # | Case | KQ | Ghi chú |
|---|---|---|---|
| 1.1 | Apache + mod_php 8.3 chạy, mods giống live | ✅ | |
| 1.2 | PHP ext + php.ini khớp live | ✅ | |
| 1.3 | SSL LE + http→https | ✅ | |
| 1.4 | Basic auth chặn truy cập ngoài (domain + IP) | ✅ | 401 |
| 1.5 | DirectoryIndex `index.php` trước `index.html` như live | ✅ | đã sửa 10-15 (trước đó home hiện trang "maintaining") |
| 1.6 | Kết nối DB managed (primary + replica qua HyperDB) | ✅ | |
| 1.7 | Uploads (ảnh/video cũ) hiển thị | ✅ | 302 về live |
| 1.8 | Upload file mới | 🙋 | disk test còn ~2.6GB |
| 1.9 | Redis / object cache | ⛔ | WP_CACHE tắt trên test |
| 1.9b | Cấu trúc DB `wp_mpfc_upgrade` = `wp_mpfc` (bảng, engine, collation, cột, index) | ✅ | 3550 dòng schema, diff 0 (10-15). Sẽ khác sau khi update WP/plugin (migration) — đó là mục đích test |
| 1.10 | Cron root (`wp cron`, backup volume, clone apache logs) chạy PHP 8.3 | ⛔ | cố ý tắt; kiểm khi dựng server chính thức (script gọi `/usr/bin/php7.4` → phải sửa) |

## 2. Guest (chưa login)
| # | Case | KQ | Ghi chú |
|---|---|---|---|
| 2.1 | Home + 25 trang link từ home | ✅ | 25×200, 0 lỗi PHP |
| 2.2 | `/?page_id=1155` | ✅ | 404 — live cũng 404 |
| 2.3 | Blog, podcast, free videos, about, contact... | ✅ | trong 2.1 |
| 2.4 | Đăng ký / mua membership (checkout MM + Stripe test) | 🙋 | |
| 2.5 | Form CF7 / Gravity Forms submit | 🙋 | mail bị chặn → chỉ kiểm submit OK + entry lưu |
| 2.6 | `/wp-json/` REST | ✅ | parity live=test 200, có `mpfc/v1`, `wpcw/v1` |

## 3. Member
| # | Case | KQ | Ghi chú |
|---|---|---|---|
| 3.1 | Login form MemberMouse `/login/` | ✅ | → `/home/my-dashboard/` |
| 3.2 | 31 trang member (dashboard, my-account, training log, team library, user videos, 1v1 library, edit goals, video...) | ✅ | 31×200, 0 lỗi PHP |
| 3.3 | Trang course unit / video / course (WP Courseware, FV Player) | ⏳ | chạy sau admin crawl (EXTRA) |
| 3.4 | Đánh dấu hoàn thành unit, quiz | 🙋 | |
| 3.5 | Xem video phát được (player) | 🙋 | cần mắt người |
| 3.6 | Upload video member (user-videos) | 🙋 | disk nhỏ |
| 3.7 | Đổi pass / profile / quên mật khẩu | 🙋 | mail bị chặn → reset pass không nhận mail |
| 3.8 | Huỷ / nâng cấp membership | 🙋 | Stripe test |
| 3.9 | Logout | 🙋 | |
| 3.10 | Team member login → dashboard team | ✅ | → `/home/master-football-academy-taiwan-u7-u8-dashboard/`, 48 trang: 47×200, 1×404 (`?page_id=1155`, live cũng 404), 0 lỗi PHP |
| 3.11 | Team library `/team-library/` | ✅ | 200 |
| 3.12 | Team manager login + `/team-manager/`, `/team-stats/`, xem 23 member (`?user_id=`) gồm `nus_upgrade_team` | ✅ | 54 trang: 53×200, 1×404 (page_id=1155), 0 lỗi PHP |
| 3.13 | Team manager thêm/xoá member, tạo team key | 🙋 | thao tác ghi DB |

## 4. Admin (crawl ~316 trang menu admin)
| # | Case | KQ | Ghi chú |
|---|---|---|---|
| 4.1 | Login `/old-login` | ✅ | |
| 4.2 | Crawl toàn bộ menu admin (314 trang) | ⏳ | lần 1 hỏng do tab puppeteer chết (lỗi script, không phải PHP); đang chạy lại, mỗi trang 1 tab |
| 4.3 | `post-new.php` (Add New post / video) | ❌ | **Fatal PHP 8**: `count()` string — `themes/pfc7/wpbakery/js_composer/include/classes/shortcodes/shortcodes.php:808` (WPBakery cũ bundle trong theme) → cần update WPBakery |
| 4.4 | Yoast SEO `wpseo_titles` | ❌ | **Fatal PHP 8**: Yoast 12.6 `array_merge()` named param (`admin/class-admin-editor-specific-replace-vars.php:223`) → update Yoast |
| 4.5 | mu-plugin force-strong-passwords | ❌→✅ | Fatal `round($wp_version)`; đã sửa trên test, **phải commit vào repo site** |
| 4.6 | ~281 trang admin "critical error" Stripe `/v1/account` | ⚠️ | do firewall test chặn Stripe (đã mở) — nhưng cho thấy live sẽ chết admin nếu Stripe down (GF Stripe 3.2) |
| 4.7 | Elementor `Filter_Plugins::get_add_ons_installation_status()` null | ⚠️ | nhiều khả năng do chặn mạng; kiểm lại sau |
| 4.8 | Vài trang admin timeout (Pages list, Comments, Media order) | ⏳ | đang xác minh — server load 0 nên nghi script/puppeteer, không phải PHP |
| 4.9 | Elementor editor / WPBakery editor sửa trang | 🙋 | cần thao tác UI |
| 4.10 | MemberMouse admin: members, products, transactions | ⏳ | trong crawl |
| 4.11 | Gravity Forms: list 10 form, entries | ✅ | wp-cli |
| 4.12 | ACF field groups (3) | ✅ | wp-cli |
| 4.13 | WP Courseware: 25 course / 709 unit | ✅ | DB đọc được; UI ⏳ |
| 4.14 | Export / import, ai1wm backup | ⛔ | disk nhỏ |

## 5. Tích hợp ngoài — không test được trên test server
| # | Case | KQ | Lý do |
|---|---|---|---|
| 5.1 | Thanh toán Stripe LIVE thật | ⛔ | đã đổi test mode; test thật sau cutover (1 giao dịch nhỏ + refund) 🙋 |
| 5.2 | PayPal | 🙋 | sandbox, creds trống → cần sandbox creds nếu muốn test |
| 5.3 | Rebill MemberMouse (cron) | ⛔ | cron tắt để không charge thật |
| 5.4 | Email (WP mail, MM, GF notifications) | ⛔ | bị chặn — kiểm sau cutover |
| 5.5 | Mailchimp sync | ⛔ | egress chặn |
| 5.6 | Firebase push / app mobile (`mpfc/v1/firebase-session`) | 🙋 | cần app trỏ về test domain |
| 5.7 | MemberMouse IAP (Apple/Google) | ⛔ | |
| 5.8 | Uncanny Automator webhooks | ⛔ | egress chặn |
| 5.9 | License/update plugin premium (Elementor Pro, GF, ACF Pro, MM, WPCW, FV Player, Essential Grid, go_pricing) | ⛔ | cần license key của Saul |
| 5.10 | Rollbar, New Relic, GA/Hotjar/FB pixel | ⛔ | cố ý tắt (Rollbar đã lỡ gửi vài lỗi lên prod trước khi tắt) |
| 5.11 | Side apps (MyDailyAgent, quantification, MyBussinessAiAgent) | ⛔ | chưa quyết có chuyển không |

## 6. Lỗi thật cần sửa (tổng hợp)
1. `mu-plugins/force-strong-passwords/slt-force-strong-passwords.php:53` — cast `(float)` (đã sửa test).
2. WPBakery bundle trong theme pfc7 — `count()` string → update WPBakery (hoặc vá `shortcodes.php:808`).
3. Yoast 12.6 → update.
4. wp-config: define trùng + `$_SERVER['HTTP_HOST']` không check (Warning).
5. user-role-editor `__wakeup` private → update.
6. ~4000 Deprecated (ACF Pro, pfc7, GF, CF7...) — không chặn, giảm dần khi update plugin.
7. Rủi ro live: GF Stripe 3.2 chết admin nếu Stripe API lỗi.

## 7. Sau upgrade (2026-10-15)
Backup code trước update: `root@test:/root/upgrade/code-before-update-2026-10-15.tgz`. Bản gốc mọi file vá: `/root/upgrade/*.orig`.

### 7.1 Đã làm
- WP core 6.6.2 → 7.1.3, `core update-db` (db 57155 → 61833). `verify-checksums` OK; có file lạ `wp-logon.php` ở root — đã kiểm: rỗng 0 byte (cả live), vô hại, có thể xoá.
- 63 plugin wp.org update (Yoast 12.6 → 28.7, Elementor 3.27 → 4.3.5, CF7 5.1 → 6.2, MemberMouse…). Plugin premium/custom KHÔNG update (chưa license) → giữ bản cũ đang chạy được trên PHP 8.3: ACF Pro 5.2.1, Elementor Pro 3.27.7, Gravity Forms 2.4.15 + Stripe 3.2 + Mailchimp 4.6, WP Courseware 4.6.4, FV Player Pro, Essential Grid (custom), go_pricing, Uncanny Automator Pro, Thrive, LayerSlider (inactive), json-api (custom).
- **Plugin có code custom bị update ghi đè → đã khôi phục bản custom cũ** (phát hiện qua git log trên live + diff với bản gốc wp.org):
  - `membermouse` 3.0.22-custom (27 commit: báo cáo GBP, transactions, login…). MM 3.1.1 đã chạy migration (thêm 1 index `mm_applied_bundles`); option `mm-major-version` trả về 3.0.29 như live.
  - `json-api-auth` (login app mobile: device token, bundle flags, chặn member hết hạn, logout).
  - `duplicate-page` (logic notification flag, Arsenal club).
- Plugin chỉ có commit "Fix warning" (vá PHP/WP cũ) → giữ bản mới (bản mới đã sửa).

### 7.2 Code đã sửa trên test — PHẢI đưa vào repo site
| File | Lỗi PHP 8 | Sửa |
|---|---|---|
| `mu-plugins/force-strong-passwords/slt-force-strong-passwords.php:53` | `round()` string | `round((float)$wp_version,1)` |
| `plugins/json-api/singletons/query.php:90` | `get_magic_quotes_gpc()` bị xoá → **app mobile login chết** | `function_exists()` guard |
| `plugins/gravityforms/forms_model.php:5378` | như trên → form upload file chết | guard |
| `plugins/json-api/controllers/coachpass.php:20` | `array_push()` vào null → API coach_corner chết | `$vDesc = array();` |
| `themes/pfc7/wpbakery/.../shortcodes.php:808`, `vc-column.php:80`, `vc-accordion-tab.php:41,86` | `count()` string → Add New post/video chết | `count((array)$width)` (giữ hành vi PHP 7) |
| `plugins/wd-instagram-feed/booster/TWBLibrary.php:264` (bản mới) | `end(false)` → **/team-library 500** | check `is_array` |
| `plugins/wd-instagram-feed/wd-instagram-feed.php:885` (bản mới) | include đường dẫn tương đối → class not found (wp-cli) | `__DIR__` |

### 7.3 Kết quả test sau upgrade
| Vai | Kết quả |
|---|---|
| Guest | 25 trang: 24×200, 1×404 (page_id=1155, live cũng 404), 0 lỗi ✅ |
| Member | 57 trang, 0 lỗi sau khi sửa team-library ✅ |
| Team member | 58 trang, 0 lỗi sau khi sửa team-library ✅ |
| Team manager | 57 trang: 56×200, 1×404, 0 lỗi ✅ |
| Admin | 314 trang menu admin: **tất cả 200, 0 fatal** ✅ (59 trang timeout trong puppeteer do droplet 512MB chậm 5–16s/trang → kiểm lại bằng curl: 200; 16 trang `000` do unattended-upgrades restart apache 06:31 UTC → chạy lại: 200). 2 link 404 `order-post-types-elementor_library` / `to-interface-elementor_library` = link menu giả của plugin sort, live cũng vậy |
| API app mobile | login (`/api/auth/generate_auth_cookie/`) ✅, validate/currentuserinfo ✅, dashboard (player_of_the_week, favorites, weekly_plan) ✅, coach_corner ✅ (sau sửa), otherpages (app_usage, leaderboard, notifications, membership_lists, timer) ✅, user (plans, trophies) ✅; idp/leaguetables trả "not enabled for your club" (đúng logic) |
| Elementor System Info | hiện exception Elementor Data API ⚠️ (có thể do chặn mạng) |

### 7.4 Thay đổi DB khi upgrade (cho ngày cutover)
File: `plans/mpfc-upgrade/schema-diff-live-vs-upgraded.txt`. Chỉ THÊM: bảng Yoast (`wp_yoast_indexable`… — live sẽ phải chạy index Yoast, nặng với cluster 1vCPU → chạy giờ thấp điểm/ WP-CLI có nghỉ), Uncanny Automator (`wp_uap_error_log`, `wp_uap_run_snapshots`), FV Player (`wp_fv_player_encoding_jobs`), `wp_upb_*`, index `wp_posts.type_status_author`, `mm_applied_bundles.access_type_id`. `wp_uap_recipe_count.recipe_id` thành UNIQUE — live không có trùng (19/19) → OK.

### 7.5 Rủi ro / việc còn lại
- ✅ Elementor Pro 3.27.7 → **4.3.2** (zip anh tải, `mpfc:~/elementor-pro-4.3.2.zip`; live git không có custom commit cho elementor-pro). 15 trang Elementor mới sửa gần nhất: test = live (200, số `elementor-element` khớp từng trang); admin Elementor/Pro (license, form submissions, theme builder, custom code, editor) 200, 0 fatal. Bản cũ: `/root/upgrade/elementor-pro-3.27.7-old`.
- ACF Pro 5.2.1 rất cũ (2015) — chạy được nhưng nên update khi có license.
- ✅ MemberMouse **3.1.1 + port custom** (anh duyệt 10-15). Custom thật = 12 commit sau `6c2aefac5 Upgrade mm to 3.0.22` (patch git `mpfc:~/upgrade/mm-custom.patch`, 13 file): 10 file áp tự động; tay: `hooks/class.userhooks.php` (bypass JSON API tránh 302 — phần expired/canceled 3.1.1 đã có upstream), `entity/class.order.php` (tắt vòng PRODUCT_PURCHASE vì custom bắn trong `MM_AccessControlEngine` sau khi tạo member — tránh gửi email 2 lần), `bootstrap/barebones.php` (wp-load path), bỏ 2 static property trùng ở `class.optionutils.php`. Các commit custom trước 3.0.22 (cache permission, change password, abandoned cart log) đã mất từ lần upgrade 3.0.22 trên live → không port. Gói: `/root/upgrade/mm-3.1.1.zip`, bản đã port: `/root/upgrade/mmv/work`. `mm-major-version`=3.1.1.
- unattended-upgrades tự update + restart apache giữa giờ (06:28 UTC) → server chính thức: đặt giờ chạy ban đêm UK hoặc chỉ security, có `Automatic-Reboot false`.
- Droplet test 512MB quá yếu cho admin → đề xuất tạm resize lên 2GB ($12/th) trong thời gian test.

## Câu hỏi chưa giải quyết
- License key plugin premium để update (§5.9)?
- Có PayPal sandbox creds không?
- App mobile có build trỏ test domain được không?
