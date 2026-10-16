# MPFC upgrade — Test cases & kết quả

Cập nhật: 2026-10-16 11:20 (+07) | Server test: https://upgrade-test.mypersonalfootballcoach.com
Bản đang test: **dựng bằng script** (`scripts/mpfc-upgrade/02→03`, diễn tập 16/10) — Ubuntu 24.04, PHP 8.3.6, WP 7.1.3, MemberMouse 3.1.1 (+custom), Elementor/Pro 4.3.5/4.3.2, Yoast 28.7, plugin theo `scripts/mpfc-upgrade/target-plugin-versions.csv`. DB `wp_mpfc_upgrade` = copy live 16/10 đã migrate.
Handover: `plans/mpfc-upgrade/handover.md` · Runbook/script: `plans/mpfc-upgrade/runbook.md`

Ký hiệu: ✅ pass · ⚠️ khác live do môi trường test (không phải lỗi) · 🙋 **anh tự test** · ⛔ không test được trên test → kiểm sau cutover

## Thông tin login test
| | |
|---|---|
| URL | https://upgrade-test.mypersonalfootballcoach.com (basic auth user `mpfc`) |
| Admin | `/old-login` — `nus_upgrade_admin` |
| Member | form `/login/` — `nus_upgrade_member` (MPFC Demo) |
| Team member | form `/login/` — `nus_upgrade_team` (MPFC Demo, team key `NUS-UPGRADE-TEST`) |
| Team manager | form `/login/` — `nus_upgrade_manager` (MPFC Demo, thấy ~20 user demo + 2 user test) |
| Thẻ Stripe test | `4242 4242 4242 4242`, hạn tương lai, CVC bất kỳ |

Pass: `jq . config/.mpfc-upgrade-test-config.json` (sau `bash scripts/decrypt-secrets.sh`).
Khác live (cố ý): mail bị chặn · PHP không gọi ra ngoài (trừ Stripe) · Stripe test / PayPal sandbox · không wp cron · uploads redirect về live · droplet 512MB (chậm, admin 5–16s/trang).

## A. Hạ tầng & build
| # | Case | KQ | Ghi chú |
|---|---|---|---|
| A1 | Apache + mod_php 8.3, mods/mpm/php.ini giống live | ✅ | |
| A2 | SSL + http→https, basic auth chặn ngoài (domain + IP) | ✅ | 401 khi không auth |
| A3 | DirectoryIndex `index.php` trước `index.html` | ✅ | |
| A4 | Kết nối DB managed (primary + replica qua HyperDB) | ✅ | |
| A5 | Ảnh/video cũ hiển thị | ✅ | 302 về live |
| A6 | Script 02 build code: WP 7.1.3 + plugin khớp 100% danh sách version | ✅ | diễn tập 16/10 |
| A7 | Script 03 migrate DB: schema = lần làm tay, chỉ thêm (không xoá/đổi) | ✅ | diff: `schema-diff-live-vs-upgraded.txt` |
| A8 | Rewrite rules CPT theme (`/user-video/...`) sau migrate | ✅ | lỗi 404 bắt được khi diễn tập → đã sửa script |
| A9 | Code custom plugin giữ đúng (MemberMouse, json-api-auth, duplicate-page, json-api…) | ✅ | patch trong `scripts/mpfc-upgrade/patches/` |
| A10 | Redis object cache | ⛔ | tắt trên test |
| A11 | Root cron (wp cron, backup volume, clone apache logs) trên PHP 8.3 | ⛔ | kiểm lúc cutover (script gọi `php7.4` → đổi `php8.3`) |

## B. Guest (chưa login)
| # | Case | KQ | Ghi chú |
|---|---|---|---|
| B1 | Trang chủ + 25 trang link từ home (blog, podcast, free videos, about, contact…) | ✅ | 24×200, 0 lỗi PHP |
| B2 | `/?page_id=1155` | ✅ | 404 — live cũng 404 |
| B3 | 15 trang dựng bằng Elementor: hiển thị giống live | ✅ | số element khớp từng trang |
| B4 | REST `/wp-json/` (`mpfc/v1`, `wpcw/v1`) | ✅ | |
| B5 | Đăng ký / mua membership mới (checkout MM + Stripe test) | 🙋 | thẻ 4242… · 16/10 lỗi ajax message rỗng → đã sửa, test lại |
| B6 | Submit form CF7 / Gravity Forms (có upload file) | 🙋 | mail chặn → kiểm submit OK + entry lưu trong admin |

## C. Member
| # | Case | KQ | Ghi chú |
|---|---|---|---|
| C1 | Login form MemberMouse | ✅ | về `/` (config live mới: homepage không redirect) |
| C2 | Trang member: dashboard, my-account, training log, team library, user videos, 1v1 library, edit goals… | ✅ | 26×200, 0 lỗi PHP |
| C3 | Trang chủ khi đã login không redirect về dashboard | ✅ | đã sửa trên live 15/10 |
| C4 | Trang course / unit / video load (WP Courseware, FV Player) | ✅ | 0 lỗi PHP |
| C5 | Video **phát được** (player chạy) | 🙋 | cần mắt người |
| C6 | Đánh dấu hoàn thành unit, làm quiz | 🙋 | |
| C7 | Upload video member (user-videos) | 🙋 | disk test nhỏ |
| C8 | Đổi profile, đổi mật khẩu | 🙋 | |
| C9 | Quên mật khẩu | ⛔ | mail chặn → kiểm sau cutover |
| C10 | Huỷ / nâng cấp membership | 🙋 | Stripe test |
| C11 | Logout | 🙋 | |

## D. Team
| # | Case | KQ | Ghi chú |
|---|---|---|---|
| D1 | Team member login + team library | ✅ | 0 lỗi PHP |
| D2 | Team manager: `/team-manager/`, `/team-stats/`, xem chi tiết từng member | ✅ | 52×200, 0 lỗi PHP |
| D3 | Admin bar không hiện với team-manager/member | ✅ | |
| D4 | Team manager thêm / xoá member, tạo team key | 🙋 | ghi DB |

## E. Admin
| # | Case | KQ | Ghi chú |
|---|---|---|---|
| E1 | Login `/old-login` | ✅ | |
| E2 | 314 trang menu admin load 200, 0 fatal | ✅ | crawl + curl (bản nâng cấp tay 15/10, cùng code) |
| E3 | Add New post / video (WPBakery) | ✅ | fatal `count()` đã vá |
| E4 | Yoast settings | ✅ | Yoast 28.7 hết fatal |
| E5 | Elementor / Elementor Pro admin + mở editor | ✅ | 200, 0 fatal |
| E6 | **Sửa & lưu** trang bằng Elementor editor / WPBakery | 🙋 | thao tác UI |
| E7 | MemberMouse admin: Manage Members, Transactions, Reports (Product Sales GBP) | 🙋 | admin test không phải MM employee (anh bảo bỏ qua) |
| E8 | Gravity Forms (10 form, entries), ACF (3 group), WP Courseware (25 course) | ✅ | đọc qua wp-cli |
| E9 | Elementor System Info hiện exception Data API | ⚠️ | do chặn mạng ra ngoài |
| E10 | Export/import, ai1wm backup | ⛔ | disk test nhỏ |

## F. API app mobile (`/api/<controller>/<method>/`)
| # | Case | KQ | Ghi chú |
|---|---|---|---|
| F1 | Login app / validate / user info | ✅ | |
| F2 | Dashboard: POTW, favorites thêm/xem/xoá, like/unlike, course + video, team library, weekly plan, account info, membership info | ✅ | |
| F3 | Đổi mật khẩu trong app (setPassword) | ✅ | đặt lại pass cũ, login lại OK |
| F4 | Coach Corner, Dynamic Ball Mastery, Training Programme | ✅ | từng fatal PHP 8 → đã vá |
| F5 | App usage / leaderboard / statistic, notifications, timer, plans, trophies | ✅ | |
| F6 | IDP / League tables / Virtual Academy / Coach Pass trả lỗi quyền đúng logic | ✅ | user test không có các gói này |
| F7 | Huỷ membership, đổi thông tin account, xoá account, đăng ký mới, xoá video/comment, logout app | 🙋 | không chạy tự động (ghi/xoá dữ liệu) — test bằng app |
| F8 | Firebase session (`mpfc/v1/firebase-session`), push notification | 🙋 | cần app thật (chữ ký HMAC) |
| F9 | Upload video từ app (S3) | 🙋 | |

## G. Tích hợp ngoài — kiểm sau cutover
| # | Case | KQ | Ghi chú |
|---|---|---|---|
| G1 | Thanh toán Stripe thật (1 giao dịch nhỏ + refund) | ⛔ | test đang ở test mode |
| G2 | PayPal | 🙋 | cần sandbox creds nếu muốn test trước |
| G3 | MemberMouse rebill (cron) | ⛔ | cron tắt trên test để không charge thật |
| G4 | Email (WP, MemberMouse, GF notifications, quên mật khẩu) | ⛔ | mail chặn |
| G5 | Mailchimp, Uncanny Automator webhooks | ⛔ | chặn mạng ra ngoài |
| G6 | MemberMouse IAP (Apple/Google) | ⛔ | |
| G7 | License plugin premium (Elementor Pro, GF, ACF Pro, WPCW, FV Player Pro, Essential Grid, go_pricing) | ⛔ | kích hoạt trên domain thật |
| G8 | Rollbar, New Relic, GA / Hotjar / FB pixel | ⛔ | cố ý tắt trên test |
| G9 | Yoast index (`wp yoast index`) | ⛔ | chạy off-peak sau cutover (nặng DB 1vCPU) |

## 🙋 Danh sách anh cần tự test (gom lại)
1. B5 Đăng ký / mua membership mới bằng thẻ Stripe test
2. B6 Submit form CF7 / Gravity Forms (có upload file)
3. C5 Video phát được
4. C6 Hoàn thành unit / quiz
5. C7 Upload video member
6. C8 Đổi profile / mật khẩu trên web
7. C10 Huỷ / nâng cấp membership
8. C11 Logout
9. D4 Team manager thêm/xoá member, tạo team key
10. E6 Sửa & lưu trang bằng Elementor / WPBakery
11. E7 MemberMouse admin (Members, Transactions, Reports) — cần tài khoản admin thật là MM employee
12. F7–F9 Các chức năng app ghi/xoá dữ liệu, Firebase/push, upload video (cần build app trỏ domain test)
13. G2 PayPal (nếu có sandbox creds)

## Lỗi PHP 8 / upgrade đã sửa (đưa vào code qua script)
| File | Lỗi | Sửa |
|---|---|---|
| `mu-plugins/force-strong-passwords/slt-force-strong-passwords.php:53` | `round()` string → toàn site fatal | `(float)` |
| `plugins/json-api/singletons/query.php:90` | `get_magic_quotes_gpc()` bị xoá → app login chết | guard |
| `plugins/gravityforms/forms_model.php:5378` | như trên → form upload file chết | guard |
| `plugins/json-api/controllers/dynamicballmastery.php` (5 chỗ), `dashboard.php:656` | `$_REQUEST[id]` không nháy → Error | thêm nháy |
| `plugins/json-api/controllers/dashboard.php:1297` | `array_search()` trên false → likeVideo chết | guard |
| `plugins/json-api/controllers/coachpass.php:20` | `array_push()` vào null → coach_corner chết | khởi tạo mảng |
| `themes/pfc7/wpbakery/…` (4 chỗ) | `count()` string → Add New post chết | `count((array)…)` |
| `plugins/wd-instagram-feed` 1.4.35 (2 chỗ) | `/team-library` 500, include sai đường dẫn | guard, `__DIR__` |
| MemberMouse 3.1.1 | 12 commit custom bị ghi đè | port lại (patch) |
| Rewrite rules | `/user-video/...` 404 sau migrate | 03 flush rewrite có load theme |
| MemberMouse `class.stripeservice.php` (validate checkout) | Submit lại form đã có intent cùng số tiền → ajax trả `message` rỗng, kẹt "Please wait…" (lỗi gốc MM, live 3.0.x cũng có) | trả lại intent cũ (patch MM) |

## Câu hỏi chưa giải quyết
- License key plugin premium (G7)? PayPal sandbox creds (G2)?
- Build app mobile trỏ domain test được không (F7–F9)?
- Sau khi bật config homepage, member login xong về `/` thay vì dashboard — giữ hay sửa code MM?
