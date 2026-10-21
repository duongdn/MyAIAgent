# MPFC upgrade — Release plan (bản review)

Mục tiêu: chuyển production sang droplet mới **Ubuntu 24.04 / PHP 8.3 / WP 7.1.3 / MM 3.1.1**, downtime ghi ≈ 15–30 phút, rollback được trong 5 phút.
Chi tiết lệnh: `runbook.md`. Kết quả test: `test-results.md`.

## 0. Trạng thái hiện tại
- Diễn tập đầy đủ trên server test: build code + migrate DB + smoke (4 role) + functional (checkout Stripe, team manager, forms, Elementor, unit, upload) + json-api 469/472 case, coverage 96%. Không còn lỗi PHP fatal.
- Live: droplet 4 vCPU / 8 GB, đĩa 155G (dùng 55G) + volume `volume-lon1-02` 199G (uploads, dùng 127G). DB = DO managed MySQL (dùng chung, **không copy DB**).

## 1. Cần chốt trước (anh/Saul)
| # | Việc | Ai |
|---|---|---|
| 1 | Gửi Saul email thông báo + xin giờ bảo trì (em soạn, anh duyệt, **không tự gửi**) | anh |
| 2 | Giờ cutover: thấp điểm UK, đề xuất **thứ Ba/Tư 06:00 UK (12:00 VN)** | Saul |
| 3 | Backup DB cluster (DO snapshot/managed backup) ngay trước giờ G | em |
| 4 | Có chuyển staging + 3 app phụ (MyDailyAgent, quantification, MyBussinessAiAgent) cùng lúc không? Đề xuất: **không**, làm đợt sau | anh |
| 5 | Dùng luôn droplet test `608944558` làm production, resize lên **= live (4 vCPU/8 GB, disk 160G — resize disk là vĩnh viễn)** | anh |

## 2. T-2 ngày: chuyển droplet test thành production (không ảnh hưởng live)
1. Snapshot droplet test (để quay lại được) → power off → **resize** `s-4vcpu-8gb` (CPU/RAM + disk) → power on (~5 phút downtime của test, không liên quan live).
2. Dọn đồ chỉ dành cho test: mu-plugin `zz-upgrade-test-safety.php`, `zz-upgrade-test-pcov.php` + `php8.3-pcov`, `/var/www/jsonapi-cov`, user test `nus_upgrade_*`/`nus_jsonapi_*` (nằm ở DB test, không theo sang).
3. `01-provision-server.sh` (KHÔNG `--test`): vhost production + cert LE từ live, unit Resque (chưa start), swap theo RAM mới.
4. `02-build-code.sh` (KHÔNG `--test`): rsync `--delete` lấy code + `wp-config.php` của live (trỏ DB live) → WP 7.1.3 + plugin + patch + `/var/www/keys`. Từ lúc này server dùng chung DB live → **không thao tác ghi**, không chạy 03.
5. Bỏ basic auth + DNS `upgrade-test`; kiểm offline qua hosts file (domain thật → IP droplet, chỉ máy em): trang chủ, login, wp-admin.
6. Thêm IP droplet vào trusted sources DB cluster (đã có, kiểm lại).

## 3. Giờ G — cutover (≈ 30–45 phút)
| Phút | Bước |
|---|---|
| G-15 | Backup DB cluster; ghi lại `wp option get mm-major-version`, số đơn hàng/thành viên mới nhất |
| G+0 | Live: bật maintenance page; tắt root cron `wp cron` + cron PHP; dừng 3 Resque worker (`pkill -f vendor/bin/resque`) |
| G+5 | Server mới: `02-build-code.sh` lần cuối (lấy code đổi trong ngày) |
| G+15 | Detach `volume-lon1-02` khỏi live → attach server mới, mount `/mnt/volume_lon1_02` (uploads symlink sẵn) |
| G+20 | `CONFIRM_LIVE_DB=yes 03-migrate-db.sh`: `wp core update-db`, plugin migrate, Elementor DB, `mm-major-version=3.1.1`, flush. Migration chỉ **thêm** bảng/cột |
| G+25 | Cloudflare: A record `mypersonalfootballcoach.com`, `www`, `admin` → IP mới (proxied, có hiệu lực ngay) |
| G+27 | Server mới: root crontab (02 in ra, php7.4→8.3), `systemctl start mpfc-resque@{1,2,3}`, New Relic + monit |
| G+30 | Tắt maintenance → smoke test (mục 4) |

## 4. Kiểm tra sau cutover (go/no-go, ≈ 30 phút)
- [ ] Trang chủ, login member, dashboard, xem video Vimeo, hoàn thành unit
- [ ] wp-admin: vào được **MemberMouse → Product Settings → Bundles** (xác nhận license MM nhận domain thật)
- [ ] MM **On-site Rebilling** đang chạy (không bị "Paused"); nếu paused → bật lại sau khi kiểm
- [ ] 1 giao dịch thật nhỏ Stripe + refund; PayPal kiểm IPN log
- [ ] App: login, get_plans, xem video (json-api); 1 lần mua IAP sandbox nếu có máy
- [ ] Form (Gravity Forms, CF7 reCAPTCHA), email gửi đi
- [ ] Resque worker chạy, queue không ứ (`redis-cli llen resque:queue:default`)
- [ ] `debug.log`/Rollbar không có Fatal mới trong 1 giờ; New Relic bình thường
- [ ] Cron chạy (wp cron, MM rebilling cron)

## 5. Rollback (nếu no-go)
1. Bật maintenance trên server mới, dừng Resque/cron server mới.
2. Detach volume → attach lại live; Cloudflare A record về IP cũ.
3. Bật lại cron + Resque trên live. Code cũ chạy được trên DB đã migrate (chỉ thêm bảng/cột). `mm-major-version` đặt lại `3.0.29`.
4. Nếu DB hỏng: restore backup cluster bước G-15 (mất dữ liệu từ G-15 → hạn chế bằng maintenance).
Thời gian ≈ 10 phút. Giữ live cũ **1–2 tuần** không xoá.

## 6. Sau release
- Theo dõi 48h: Rollbar, New Relic, đơn hàng/rebilling MM, push notification.
- T+1 tuần: xoá DB test `wp_mpfc_upgrade`, snapshot droplet test, key/ssh test trên live.
- T+2 tuần: xoá droplet live cũ (sau snapshot).
- Đợt sau: chuyển app phụ (checklist trong runbook, tăng size droplet), vá lỗ hổng json-api (`setPassword`, `changeAccountInfo`…), đóng mailcatcher 1080, update plugin premium nếu có license.

## Rủi ro chính
| Rủi ro | Giảm thiểu |
|---|---|
| License MM không nhận server mới | Cùng domain → MM tự xác thực lại; nếu không: liên hệ MM support, rollback nếu chặn thanh toán |
| Rebilling bị MM tự pause khi đổi server | Kiểm mục 4, bật lại tay |
| Thiếu file/dịch vụ chỉ có trên live | Đã bổ sung keys, Resque; so plugin 101/101 khớp |
| Plugin premium cũ (ACF 5.2, GF 2.4…) | Đã vá PHP 8.3 + test, chỉ còn deprecated warning |
| Không bấm "Database Upgrade Required" của MM | Bấm sẽ đổi `mm_*` → `wp_mm_*`, làm hỏng code custom — ghi chú cho admin |

## Câu hỏi chưa chốt
- Giờ G + ai báo khách? Có cần email thành viên trước không?
- Staging + 3 app phụ: đợt này hay đợt sau?
- PayPal: chưa test sandbox — chấp nhận kiểm bằng giao dịch thật sau cutover?
