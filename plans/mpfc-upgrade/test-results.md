# MPFC upgrade — Test result (PHP 8.3 / Ubuntu 24.04)

Cập nhật: 2026-10-15 10:20 (+07) | Server test: https://upgrade-test.mypersonalfootballcoach.com
Handover chính: `plans/mpfc-upgrade/handover.md` (§0 có cách login).
Hiện test trên **WP 6.6.2 + plugin hiện tại** (chưa update) → lỗi ở đây = lỗi PHP 8.3 của code hiện tại.

Ký hiệu: ✅ pass | ❌ fail (lỗi thật) | ⚠️ fail do môi trường test | ⏳ đang test | 🙋 anh test giúp | ⛔ không test được trên test server

## Thông tin test
| | |
|---|---|
| URL | https://upgrade-test.mypersonalfootballcoach.com |
| Basic auth | user `mpfc` — pass: `jq -r .basic_auth.password config/.mpfc-upgrade-test-config.json` |
| Admin | `/old-login` — user `nus_upgrade_admin` — pass: `jq -r .test_users.admin.password config/.mpfc-upgrade-test-config.json` |
| Member | form MemberMouse `/login/` — user `nus_upgrade_member` (MPFC Membership, Active) — pass: `jq -r .test_users.member.password config/.mpfc-upgrade-test-config.json` |
| Team member | form `/login/` — user `nus_upgrade_team` (subscriber, MM level 1154 "Master Football Academy Taiwan U7/U8", team_key 143) — pass: `jq -r .test_users.team_member.password config/.mpfc-upgrade-test-config.json` |
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
| 3.12 | Team Manager quản lý member (thêm/xoá, team key) | 🙋 | |

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

## Câu hỏi chưa giải quyết
- License key plugin premium để update (§5.9)?
- Có PayPal sandbox creds không?
- App mobile có build trỏ test domain được không?
