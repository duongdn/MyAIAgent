# MPFC go-live checklist — 23/10/2026

Server mới: droplet `608944558` (4 vCPU/8 GB/160G, private `10.106.0.2`, public `144.126.236.208`).
Live cũ: droplet `293179468` (`142.93.46.109`, private `10.106.0.6`). Reserved IP `159.65.213.246` (mọi domain trỏ vào đây) đang gắn live cũ.
Plan đầy đủ + rà soát: `release-plan.md`. Lệnh chi tiết: `runbook.md`.

## Đã xong
- [x] Resize droplet mới + snapshot `mpfc-upgrade-test-before-prod-20261021`
- [x] App phụ chạy ở server mới từ 21/10 (cron mpfc 6 dòng chạy OK đêm 22–23/10: hello, news-digest, daily-report); live đã tắt cron/service phụ
- [x] quantification proxy qua VPC; port 3334/3335 firewall; staging đã xoá
- [x] Test: smoke + functional + json-api (469/472, cov 96%)

## A. Trước giờ G (không ảnh hưởng live) — ~20 phút
- [ ] A1. Dọn đồ test trên server mới: xoá mu-plugin `zz-upgrade-test-safety.php`, `zz-upgrade-test-pcov.php`; `apt purge php8.3-pcov`; xoá `/var/www/jsonapi-cov`; xoá thư mục `wp-content/uploads` local của test (để 02 tạo symlink sang volume)
- [ ] A2. `01-provision-server.sh` (không `--test`): apache2.conf + vhost main/admin/dailyagent/quantification + cert từ live (có CustomLog → mysql apache_logs), swap 8G, unit Resque (không enable)
- [ ] A3. Bỏ vhost + basic auth `upgrade-test`; xoá DNS `upgrade-test`
- [ ] A4. Kiểm DB cluster trusted sources (tag `mpfc`) cho IP mới
- [ ] A5. Backup DB cluster (DO managed backup / dump `wp_mpfc` từ replica, không chạy trên primary)

## B. Giờ G — cutover (~30–45 phút, site trong chế độ bảo trì)
- [ ] B1. Live: `wp maintenance-mode activate`; xoá root crontab (backup trước: `wp cron`, `backup_live_volume.php`, `clone_apache_logs.php`); dừng 3 Resque (`pkill -f '[b]in/resque'`); tắt monit (để nó không bật lại Resque)
- [ ] B2. Server mới: `02-build-code.sh` (không `--test`) — rsync code + `wp-config.php` + `.htaccess` live → WP 7.1.3, plugin, patch PHP 8.3, MM 3.1.1, Elementor Pro 4.3.2, `/var/www/keys`
- [ ] B3. Detach volume `volume-lon1-02` khỏi live → attach server mới → mount `/mnt/volume_lon1_02` + fstab; kiểm `wp-content/uploads` → symlink đúng
- [ ] B4. `CONFIRM_LIVE_DB=yes 03-migrate-db.sh` (core update-db, plugin migrate, Elementor DB, `mm-major-version=3.1.1`, flush rewrite)
- [ ] B5. Chuyển Reserved IP `159.65.213.246` → droplet `608944558`
- [ ] B6. Server mới: root crontab (php8.3) 3 dòng như live; `systemctl enable --now mpfc-resque@{1,2,3}`; quantification vhost proxy về `127.0.0.1:3335` (đã đúng ở server mới)
- [ ] B7. `wp maintenance-mode deactivate`

## C. Kiểm tra go/no-go (~30 phút)
- [ ] C1. Trang chủ, login member, dashboard, xem video, hoàn thành unit; team manager trang team-stats (switcher)
- [ ] C2. wp-admin → MemberMouse → Product Settings → **Bundles** mở được (license MM nhận domain); **On-site Rebilling** không bị Paused
- [ ] C3. 1 giao dịch Stripe thật nhỏ + refund
- [ ] C4. App: login, get_plans, video (json-api)
- [ ] C5. Form Gravity Forms + CF7; email đi (Gmail API)
- [ ] C6. Resque chạy, `redis-cli llen resque:queue:default` không tăng mãi
- [ ] C7. `debug.log` + Rollbar không có Fatal mới; `apache_logs` DB có dòng mới (CustomLog pipe)
- [ ] C8. wp cron chạy (`cron.log`), MM rebilling cron
- [ ] C9. App phụ dailyagent/quantification mở được qua domain

## D. Rollback (nếu no-go ở C) — ~10 phút
1. Maintenance trên server mới; dừng Resque + root cron server mới
2. Detach volume → attach lại live; Reserved IP về droplet `293179468`
3. Live: khôi phục root crontab, start Resque + monit, `mm-major-version` = `3.0.29`, deactivate maintenance
4. DB hỏng → restore backup A5

## E. Sau go-live
- [ ] Cấp lại cert `mypersonalfootballcoach.com-0001` bỏ domain staging (gia hạn ~02/11 sẽ lỗi nếu không); xoá cert `mypersonalfootballcoach.com` hết hạn 2022
- [ ] Theo dõi 48h: Rollbar, đơn hàng/rebilling, push
- [ ] T+1 tuần: xoá DB `wp_mpfc_upgrade`, key ssh test trên live
- [ ] T+2 tuần: snapshot + xoá droplet live cũ
- [ ] Đợt sau: vá lỗ hổng json-api, đóng mailcatcher, update plugin premium

## Cần anh chốt trước khi bắt đầu
- Giờ G (bây giờ 09:40 VN = 03:40 UK — đang thấp điểm, làm luôn được?)
- Báo Saul trước hay sau?
- C3 giao dịch Stripe thật: dùng thẻ/tài khoản nào?
