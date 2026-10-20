# MPFC upgrade — Test cases & kết quả

Cập nhật: 2026-10-19 12:10 (+07) | Server test: https://upgrade-test.mypersonalfootballcoach.com
Bản đang test: **dựng bằng script** (`plans/mpfc-upgrade/scripts/02→03`, diễn tập 16/10) — Ubuntu 24.04, PHP 8.3.6, WP 7.1.3, MemberMouse 3.1.1 (+custom), Elementor/Pro 4.3.5/4.3.2, Yoast 28.7, plugin theo `plans/mpfc-upgrade/scripts/target-plugin-versions.csv`. DB `wp_mpfc_upgrade` = copy live 16/10 đã migrate.
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
| A9 | Code custom plugin giữ đúng (MemberMouse, json-api-auth, duplicate-page, json-api…) | ✅ | patch trong `plans/mpfc-upgrade/scripts/patches/` |
| A10 | Redis object cache | ⛔ | tắt trên test |
| A11 | Root cron (wp cron, backup volume, clone apache logs) trên PHP 8.3 | ⛔ | kiểm lúc cutover (script gọi `php7.4` → đổi `php8.3`) |

## B. Guest (chưa login)
| # | Case | KQ | Ghi chú |
|---|---|---|---|
| B1 | Trang chủ + 25 trang link từ home (blog, podcast, free videos, about, contact…) | ✅ | 24×200, 0 lỗi PHP |
| B2 | `/?page_id=1155` | ✅ | 404 — live cũng 404 |
| B3 | 15 trang dựng bằng Elementor: hiển thị giống live | ✅ | số element khớp từng trang |
| B4 | REST `/wp-json/` (`mpfc/v1`, `wpcw/v1`) | ✅ | |
| B5 | Đăng ký / mua membership mới (checkout MM + Stripe test) | ✅ | 19/10 tự động: thẻ 4242 → SetupIntent (trial) → `/cp-subscription/`, order 25802. Sửa lỗi MM intent rỗng khi submit lại |
| B6 | Submit form CF7 / Gravity Forms (có upload file) | ✅/⚠️ | GF 4 form active (Contact, Subscribe, Drill Video, VA Interest) lưu entry OK. CF7 bị đánh `spam` vì test chặn mạng ra Google reCAPTCHA → kiểm lại sau cutover. Không form active nào có upload file |

## C. Member
| # | Case | KQ | Ghi chú |
|---|---|---|---|
| C1 | Login form MemberMouse | ✅ | về `/` (config live mới: homepage không redirect) |
| C2 | Trang member: dashboard, my-account, training log, team library, user videos, 1v1 library, edit goals… | ✅ | 26×200, 0 lỗi PHP |
| C3 | Trang chủ khi đã login không redirect về dashboard | ✅ | đã sửa trên live 15/10 |
| C4 | Trang course / unit / video load (WP Courseware, FV Player) | ✅ | 0 lỗi PHP |
| C5 | Video **phát được** (player chạy) | ✅ | Vimeo embed load, không chặn domain (video tự phát cần người bấm — phía Vimeo) |
| C6 | Đánh dấu hoàn thành unit, làm quiz | ✅ | Mark as Completed unit 7202 OK (course của member không có quiz) |
| C7 | Upload video member (user-videos) | ✅ | API UploadMemberVideo → `uploads/lib_videos/` + post; DeleteMemberVideo OK (file mp4 không bị xoá — hành vi cũ) |
| C8 | Đổi profile, đổi mật khẩu | ✅ | qua API app: changeAccountInfo + setPassword (F3). Web không có form riêng |
| C9 | Quên mật khẩu | ⛔ | mail chặn → kiểm sau cutover |
| C10 | Huỷ / nâng cấp membership | ✅ | remove_plan bundle 9, canselMembership OK; mua thêm = B5 |
| C11 | Logout | ✅ | link logout → `/logout/`, hết cookie đăng nhập |

## D. Team
| # | Case | KQ | Ghi chú |
|---|---|---|---|
| D1 | Team member login + team library | ✅ | 0 lỗi PHP |
| D2 | Team manager: `/team-manager/`, `/team-stats/`, xem chi tiết từng member | ✅ | 52×200, 0 lỗi PHP |
| D3 | Admin bar không hiện với team-manager/member | ✅ | |
| D4 | Team manager thêm / xoá member, tạo team key | ✅ | 8 bước: tạo/đổi tên/xoá key, add member, gán/bỏ key, remove khỏi team, invite link |

## E. Admin
| # | Case | KQ | Ghi chú |
|---|---|---|---|
| E1 | Login `/old-login` | ✅ | |
| E2 | 314 trang menu admin load 200, 0 fatal | ✅ | crawl + curl (bản nâng cấp tay 15/10, cùng code) |
| E3 | Add New post / video (WPBakery) | ✅ | fatal `count()` đã vá |
| E4 | Yoast settings | ✅ | Yoast 28.7 hết fatal |
| E5 | Elementor / Elementor Pro admin + mở editor | ✅ | 200, 0 fatal |
| E6 | **Sửa & lưu** trang bằng Elementor editor / WPBakery | ✅ | Elementor 4.3.5: thêm widget + publish, DB có data. Console lỗi `jQuery.live` (plugin cũ) không chặn lưu |
| E7 | MemberMouse admin: Manage Members, Transactions, Reports (Product Sales GBP) | — | bỏ qua theo anh (admin test không phải MM employee) |
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
| F7 | Huỷ membership, đổi thông tin account, xoá account, đăng ký mới, xoá video/comment, logout app | ✅ | `tests/app-api-write-test.sh` 10/10 (register→login→đổi info→plans→cancel→logout→delete) |
| F8 | Firebase session (`mpfc/v1/firebase-session`), push notification | ✅/⛔ | session ký HMAC đúng → user; sai → 401. Push cần thiết bị thật |
| F9 | Upload video từ app (S3) | ✅ | lưu local `uploads/lib_videos` (không phải S3) — như C7 |

## G. Tích hợp ngoài — kiểm sau cutover
| # | Case | KQ | Ghi chú |
|---|---|---|---|
| G1 | Thanh toán Stripe thật (1 giao dịch nhỏ + refund) | ⛔ | test đang ở test mode |
| G2 | PayPal | ⛔ | chưa có sandbox creds |
| G3 | MemberMouse rebill (cron) | ⛔ | cron tắt trên test để không charge thật |
| G4 | Email (WP, MemberMouse, GF notifications, quên mật khẩu) | ⛔ | mail chặn |
| G5 | Mailchimp, Uncanny Automator webhooks | ⛔ | chặn mạng ra ngoài |
| G6 | MemberMouse IAP (Apple/Google) | ⛔ | |
| G7 | License plugin premium (Elementor Pro, GF, ACF Pro, WPCW, FV Player Pro, Essential Grid, go_pricing) | ⛔ | kích hoạt trên domain thật |
| G8 | Rollbar, New Relic, GA / Hotjar / FB pixel | ⛔ | cố ý tắt trên test |
| G9 | Yoast index (`wp yoast index`) | ⛔ | chạy off-peak sau cutover (nặng DB 1vCPU) |

## Còn lại (không tự động được)
1. E7 MemberMouse admin — bỏ qua theo anh
2. G2 PayPal — cần sandbox creds
3. Push notification (F8) — cần thiết bị thật
4. CF7 reCAPTCHA (B6) + các mục ⛔ — kiểm sau cutover

Chạy lại test: `node plans/mpfc-upgrade/tests/functional-test.js checkout team cf7 logout unit toggle` · `POST_ID=<draft> … elementor` · `MEDIA_DIR=<dir có t.mp4,t.jpg> bash plans/mpfc-upgrade/tests/app-api-write-test.sh`

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
| `video-library-manager` vlm-custom.js | Toggle active/inactive video ở /team-stats/ không có loading | spinner thay switch khi đang lưu (**đã deploy live 19/10**, commit `f9b9d8f1f`) |
| Rewrite rules | `/user-video/...` 404 sau migrate | 03 flush rewrite có load theme |
| MemberMouse `class.stripeservice.php` (validate checkout) | Submit lại form đã có intent cùng số tiền → ajax trả `message` rỗng, kẹt "Please wait…" (lỗi gốc MM, live 3.0.x cũng có) | trả lại intent cũ (patch MM) |

## 🔴 Bảo mật (có sẵn trên live, không do upgrade) — chỉ ghi nhận, KHÔNG vá (quyết định 19/10)
- `api/dashboard/changeAccountInfo`: **không kiểm tra đăng nhập**, nối `$_REQUEST` thẳng vào SQL → ai cũng đổi được email user bất kỳ (chiếm tài khoản qua quên mật khẩu) + SQL injection.
- `api/dashboard/canselMembership`: không kiểm tra đăng nhập → xoá course/bundle của user bất kỳ.
- mailcatcher trên live mở public port 1080.

## Câu hỏi chưa giải quyết
- License key plugin premium (G7)? PayPal sandbox creds (G2)?
- Build app mobile trỏ domain test được không (F7–F9)?
- Sau khi bật config homepage, member login xong về `/` thay vì dashboard — giữ hay sửa code MM?

## json-api (app API) — test tự động + coverage (20/10)
Chạy: `node tests/json-api/run.js` (fixtures tự tạo/dọn qua `tests/json-api/fixtures.php`), coverage: `bash tests/json-api/coverage.sh [lines]` (pcov trên server test, mu-plugin `zz-upgrade-test-pcov.php` — gỡ khi xong project).
Kết quả: **469/472 case pass** (3 fail = assertion test đã sửa), **line coverage controllers 96.2%** (3155/3281):

| File | Cov |
|---|---|
| registration, user, idp, leaguetables, dynamicballmastery | 100% |
| otherpages | 99.7% |
| Auth | 98.2% |
| coachpass | 95.0% |
| virtualacademy | 93.0% |
| dashboard | 91.4% |

Dòng chưa cover (lý do):
- Không thể/dead code: Auth HTTP-only branch (server luôn redirect https), `Auth.php:63` sau `error()`, `otherpages.php:1036` (empty() chặn trước), lỗi ghi file upload / "User in not valid" (cần hỏng disk), `player_of_the_week* Invalid membership` (theme chặn user không active trước controller), `coachpass.php:60-61` (`$json_api` không global → includeLocalVideo không bao giờ chạy — bug).
- Phụ thuộc dữ liệu: grid Arsenal (skill/featured/ask) rỗng trên DB → vòng lặp + cache path không chạy; nhánh "không có quyền xem video" (CANNOT_ACCESS_VIDEO_ID); format cũ của trang myaccount/course name có ":".
- Lưu ý: coverage theo DÒNG, `if (...) return` 1 dòng tính là cover dù nhánh return chưa chạy.

Lỗi tìm được:
- 🔴 PHP 8 fatal (500): `virtualacademy/getVideo`, `dashboard/player_of_the_week_old` — `$vDesc` chưa khởi tạo → **đã sửa** trong `site-php83-fixes.patch` + test server.
- 🔴 Server mới thiếu `/var/www/keys/*.p8` (Apple StoreKit2) và Resque workers → **đã thêm** vào 02/01 + runbook.
- `virtualacademy/uploadVideo|deleteVideo` trả HTTP 404 kèm body SUCCESS (die() trước json-api) — có sẵn trên live.
- `idp/set_target_hidden` báo success cả khi target không phải của user (update 0 dòng vẫn ok) — không đổi dữ liệu người khác, chỉ sai thông báo.
- `otherpages/Success_stories` trả gần như rỗng trên live (trang 247 đã chuyển Elementor).
- 🔴 Bảo mật (có sẵn, chỉ ghi nhận): `dashboard/setPassword` (đổi mật khẩu user bất kỳ chỉ cần id!), `changeAccountInfo`, `canselMembership`, `getAccountInfo/getAccountSettings/get_MembershipInfo` (lộ thông tin theo id), `dynamicballmastery/Insert_Completed_Sessions|Get_Completed_Sessions` (user_id tuỳ ý), `otherpages/store_app_log_events` — đều không kiểm tra cookie; nhiều chỗ nối thẳng `$_REQUEST` vào SQL.
