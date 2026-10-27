# MPFC go-live checklist — 23/10/2026

Server mới: droplet `608944558` (4 vCPU/8 GB/160G, private `10.106.0.2`, public `144.126.236.208`).
Live cũ: droplet `293179468` (`142.93.46.109`, private `10.106.0.6`) — chỉ còn Apache với vhost quantification (proxy VPC → server mới). Reserved IP `159.65.213.246` **đã gắn server mới** từ 10:09 23/10.
Git: code server mới sẽ commit lên nhánh mới `live-php83` (từ `live` @ `523e85cb5`, tag `pre-php83-20261023`); nhánh `live` giữ nguyên = code server cũ (rollback = checkout `live`).
Plan đầy đủ + rà soát: `release-plan.md`. Lệnh chi tiết: `runbook.md`.

## Đã xong
- [x] Resize droplet mới + snapshot `mpfc-upgrade-test-before-prod-20261021`
- [x] App phụ chạy ở server mới từ 21/10 (cron mpfc 6 dòng chạy OK đêm 22–23/10: hello, news-digest, daily-report); live đã tắt cron/service phụ
- [x] quantification proxy qua VPC; port 3334/3335 firewall; staging đã xoá
- [x] Test: smoke + functional + json-api (469/472, cov 96%)

## A. Trước giờ G (không ảnh hưởng live) — ~20 phút
- [x] A1. Dọn đồ test trên server mới: xoá mu-plugin `zz-upgrade-test-safety.php`, `zz-upgrade-test-pcov.php`; `apt purge php8.3-pcov`; xoá `/var/www/jsonapi-cov`; xoá thư mục `wp-content/uploads` local của test (để 02 tạo symlink sang volume)
- [x] A2. `01-provision-server.sh` (không `--test`): apache2.conf + vhost main/admin/dailyagent/quantification + cert từ live (có CustomLog → mysql apache_logs), swap 8G, unit Resque (không enable)
- [x] A3. Bỏ vhost + basic auth `upgrade-test`; xoá DNS `upgrade-test`
- [x] A4. Kiểm DB cluster trusted sources (tag `mpfc`) cho IP mới
- [x] A5. Backup DB cluster (DO managed backup / dump `wp_mpfc` từ replica, không chạy trên primary)

**Kết quả A (23/10 09:50–10:00):** test mu-plugin + pcov + uploads test xoá; `01` prod OK (swap 8G, vhost main/admin/dailyagent/quantification + CustomLog→apache_logs, Resque disabled); quantification vhost server mới proxy `127.0.0.1:3335`; vhost/DNS/cert `upgrade-test` xoá; DB firewall có tag `mpfc` (droplet mới có tag); DO auto backup 23/10 01:32 UTC (21.9G) + dump `wp_mpfc` từ replica `/root/db-backup/wp_mpfc-20261023-0251.sql.gz` (312M, ~1.5 phút) → **dump lại ngay trước B1**.
⚠️ Từ giờ server mới chưa có `wp-config` live (vẫn DB test) cho tới B2 — không trỏ traffic vào.

## B. Giờ G — cutover (~30–45 phút, site trong chế độ bảo trì)
- [x] B0. Dump lại `wp_mpfc` từ replica (lệnh như A5, ~2 phút)
- [x] B1. Live: `wp maintenance-mode activate`; xoá root crontab (backup trước: `wp cron`, `backup_live_volume.php`, `clone_apache_logs.php`); dừng 3 Resque (`pkill -f '[b]in/resque'`); tắt monit (để nó không bật lại Resque)
- [x] B2. Server mới: `02-build-code.sh` (không `--test`) — rsync code + `wp-config.php` + `.htaccess` live → WP 7.1.3, plugin, patch PHP 8.3, MM 3.1.1, Elementor Pro 4.3.2, `/var/www/keys`
- [x] B3. Detach volume `volume-lon1-02` khỏi live → attach server mới → mount `/mnt/volume_lon1_02` + fstab; kiểm `wp-content/uploads` → symlink đúng
- [x] B4. `CONFIRM_LIVE_DB=yes 03-migrate-db.sh` (core update-db, plugin migrate, Elementor DB, `mm-major-version=3.1.1`, flush rewrite)
- [x] B5. Chuyển Reserved IP `159.65.213.246` → droplet `608944558`
- [x] B6. Server mới: root crontab (php8.3) 3 dòng như live; `systemctl enable --now mpfc-resque@{1,2,3}`; quantification vhost proxy về `127.0.0.1:3335` (đã đúng ở server mới)
- [x] B7. `wp maintenance-mode deactivate`

**Kết quả B (23/10 10:00–10:11 VN, bảo trì ~11 phút):** dump `wp_mpfc-20261023-0258.sql.gz`; live: root crontab backup `~/root-crontab.backup-20261023` rồi xoá, monit + Resque dừng, apache live **đang tắt**; 02 OK (exit 1 cuối chỉ do in crontab live đã xoá); volume chuyển — **sửa symlink**: đúng là `/mnt/volume_lon1_02/mypersonalfootballcoach.com/wp-content/uploads` (02 đã sửa); 03: db 57155→61833, MM 3.1.1, Elementor 4.3.5, schema giống diễn tập; Reserved IP → `608944558`; root cron php8.3 cài; Resque phải start **sau** khi tắt maintenance (WP maintenance làm worker thoát) → 3 worker active.

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
- [x] Cấp lại cert `mypersonalfootballcoach.com-0001` chỉ domain chính (hết hạn 21/01/2027, account live `02c1…`); xoá cert hết hạn 2022; dry-run gia hạn OK main/admin/dailyagent (quantification gia hạn trên server cũ)
- [ ] Theo dõi 48h: Rollbar, đơn hàng/rebilling, push
- [ ] T+1 tuần: xoá DB `wp_mpfc_upgrade`, key ssh test trên live
- [ ] T+2 tuần: snapshot + xoá droplet live cũ
- [ ] Đợt sau: vá lỗ hổng json-api, đóng mailcatcher, update plugin premium

## Cần anh chốt trước khi bắt đầu
- Giờ G (bây giờ 09:40 VN = 03:40 UK — đang thấp điểm, làm luôn được?)
- Báo Saul trước hay sau?
- C3 giao dịch Stripe thật: dùng thẻ/tài khoản nào?

## Sự cố sau go-live (23/10) & xử lý
- 10:11–10:55: firewall test chặn egress của `www-data` (tạo tay lúc test, không có trong script) còn trên prod → Gmail (4 email đơn 25841), Apple IAP (`add_plan`), Cloudflare purge lỗi. **Đã gỡ + lưu** (`netfilter-persistent save`). → Runbook: kiểm `iptables -S OUTPUT` sạch trước khi chuyển IP.
- `add_plan` 500: Carbon 2.35 `setLastErrors(array)` nhận `false` trên PHP 8.2+ → vá `vendor/nesbot/carbon/.../Creator.php` (thêm vào `site-php83-fixes.patch`).
- Rollbar plugin bị inactive trên prod → đã activate.
- New Relic: live cũ daemon đã tắt từ trước; server mới cài `newrelic-php5` 12.12, app `MPFC-live2` **connected** 11:02.

## Cập nhật 23/10 11:30
- [x] Cert main cấp lại (xem E)
- [x] `TESTFREE2610` (free 100%, không giới hạn, đã dùng 3 lần) → archived
- [x] Runbook + `01` (prod tự xoá firewall egress test, cài New Relic) — commit `69d4b40c`
- [x] **quantification down 10:06–11:28** (DNS trỏ IP riêng server cũ, Apache cũ đã tắt) → bật lại Apache cũ **chỉ vhost quantification** (proxy VPC → server mới); vhost main/admin/dailyagent trên server cũ đã tắt/cất `/root/vhosts-disabled-20261023`
- [~] `wp yoast index` đang chạy nền (nice 15), log `/root/upgrade/yoast-index.log`
- [x] Commit code server mới lên **nhánh mới `live-php83`** (đã push; `live` giữ nguyên @ `523e85cb5`, tag `pre-php83-20261023`). 4 commit revert riêng được:
  - `811ce0161` wip(theme): 5 file theme sửa dở từ server cũ
  - `809274c3f` chore(core): WP 7.1.3 (2550 file)
  - `1bb8d1de1` chore(plugins): 83 plugin đã track (24070 file, gồm MM 3.1.1 + patch json-api/gravityforms/wd-instagram)
  - `9679af8ab` fix(theme): WPBakery PHP 8.3 (4 file)
  - Không commit: `wp-config.php`, `db-config.php`, `.htaccess` gốc, `advanced-cache.php`, `wp-content/cache`, `vendor/` (patch Carbon chỉ nằm trong `site-php83-fixes.patch`), `pfc7/backups/`, 11 plugin chưa track, `wp-logon.php` (file rỗng 0 byte, có trên live từ 20/05 — nên xoá)
  - Server mới đang checkout `live-php83`; từ giờ commit/pull trên nhánh này. `.git` đã `chown mpfc:www-data` (trước đó lẫn owner → lỗi ghi object)

## Rà soát cuối server cũ → mới (23/10 12:00)
- [x] DNS `*.youragentstore.net` + `youragentstore.net` → `159.65.213.246` (anh đổi 11:52); quantification vào server mới; cert dry-run OK; **Apache server cũ stop + disable**
- [x] Apache log → MySQL `apache_logs`: chạy, 5026 dòng từ 10:10, nối liền dòng cuối của server cũ (10:09:56). Pipe thỉnh thoảng crash với URL độc (Apache tự bật lại) — giống live cũ
- [x] `/home/mpfc`: chép phần thiếu (`--update`): 64 file session Claude (`projects/-home-mpfc`, backup `.claude.json`), PDF/TSV/script làm việc, zip Elementor Pro, `.bash_history`, `.mysql_history`
- [x] `/root` cũ: archive đủ ở `/root/old-server` (5.1G, gồm `.ssh`, script `cancel-orphan-subscriptions.php`, `patch-user-delete.py`, backup 20/10, `mpfc_dump.sql` 2.7G); Claude/Codex/Gemini/claudekit của root đặt vào `/root` — `claude -p` OK
- [x] `/home/mpfc-fpt` chép; hash mật khẩu `mpfc`, `mpfc-fpt` giống cũ (SSH vẫn chỉ key)
- [x] root `authorized_keys`: thêm key `duongdn@duongdn-mackbook.local` (thiếu); bỏ key `mpfc-upgrade-test-pull` khỏi mpfc server mới
- [x] logrotate `debug.log` (`/etc/logrotate.d/wp`) — thiếu, đã thêm (debug.log 138MB)
- [x] So sánh (rsync dry-run) MyDailyAgent / MyBussinessAiAgent / keys: không thiếu (khác biệt = bản mới hơn ở server mới hoặc chỉ khác group)
- Không chuyển (cố ý): `/var/www/utils/start_resque_live.sh` (thay bằng systemd), `/var/www/html` (trang mặc định), `DONT.REMOVED.ZIP…` (1G rác), monit, fluent-bit/td-agent-bit/newrelic-infra (đều inactive), mailcatcher

## Việc tiếp theo
1. Commit + push code server mới (anh duyệt trước)
2. Đổi DNS `quantification.youragentstore.net` → `159.65.213.246` (zone Cloudflare khác — anh làm) → sau đó tắt hẳn server cũ
3. Theo dõi 48h: Rollbar, New Relic, debug.log, đơn hàng + MM rebilling, push, cron đêm (backup volume, clone apache_logs)
4. T+1 tuần: xoá DB `wp_mpfc_upgrade`, account certbot test `433b…`, key ssh test trên live cũ; đổi tên droplet + bỏ tag `upgrade-test`
5. T+2 tuần: snapshot + xoá droplet cũ `293179468` (sau khi quantification đã đổi DNS)
6. Đợt sau: vá json-api (`setPassword`, `changeAccountInfo`, `canselMembership`), update plugin premium, email tóm tắt cho Saul (em soạn, anh duyệt)

## Review lần 2 server cũ (23/10 13:30) — diff inventory tự động (pkg, php ext, units, cron mọi user, /var/www, /home, /usr/local, apache mods/sites, listen ports, npm/pip, Claude sessions)
- Không sót gì cần thiết. Chỉ khác trên server cũ (đều không cần mang qua):
  - monit (redis + resque_live) → thay bằng systemd `mpfc-resque@1..3` Restart=always (đang active)
  - `/var/www/utils/start_resque_live.sh` → đã thay bằng systemd; bản sao lưu `/root/old-server/var-www-utils/`
  - newrelic-infra + fluent-bit: không chạy từ trước 07/2026 (journal rỗng) → không phải gap
  - mysql-server local: inactive, ko dùng (DB = DO managed); mailcatcher (ruby :1080/:1025): ko được WP dùng
  - volume_lon1_01/03: mount rỗng; zip 1GB `DONT.REMOVED...zip` (12/2024) để lại trong snapshot droplet cũ
  - build tools/python3.8/snap/lxd: hệ điều hành cũ, ko cần
- Đã khớp: cron root (backup_live_volume, wp cron, clone_apache_logs) + 6 dòng cron mpfc; apache log → mysql pipe đang chạy; Claude sessions /home/mpfc 248 (cũ 233), /root 2 (cũ 1); PHP ext giống nhau

## Review lần 3 — config tuning + performance (23/10 15:00–15:20, mở lại server cũ)
- An toàn khi bật server cũ: gỡ droplet 293179468 khỏi DB trusted sources + bỏ tag `mpfc` → bật → stop cron/apache/monit/redis/resque → so → shutdown lại (DB rule KHÔNG thêm lại)
- So: effective php.ini (apache SAPI), php/apache modules, apache conf, .htaccess, wp-config defines, drop-ins, redis, sysctl, limits, cron, mysql client
- **OPcache full** (128M/8M interned mặc định, hit 58%) → 512M/64M/60000 files (`99-mpfc-opcache.ini`); p50 2.81s → 1.71s (cũ 1.77s)
- **.htaccess bị Really Simple Security ghi đè 06:28 UTC** (lúc admin vào wp-admin) → mất Expires, 3 redirect 301; khôi phục bản server cũ (bản lỗi: `/root/upgrade/htaccess.overwritten-20261023`). FilesMatch chặn .log/.sql vẫn còn trong bản lỗi
- Phần cứng/đĩa/latency DB tương đương (php bench 2.2s vs 2.2s, dd 471 vs 520 MB/s, ping DB ~1ms)
- 404 chậm (avg 19.5s, tới 66s) = bot quét `/@fs/.env`, `/graphql`…
- **Gap: cloud firewall `MPFC-common` (22/80/443/1080) chỉ gắn droplet cũ** — server mới chưa có cloud firewall
- 15:35 mu-plugin `00-mpfc-silence-deprecations.php` (error_reporting bỏ E_DEPRECATED): debug.log 1.9 MB/min → 77 KB/min; commit `6f05694eb` live-php83 (chưa push)
- 15:42 cloud firewall `MPFC-common` gắn thêm droplet mới (trước đó 3334/3335 node app lộ public, bypass basic auth) — verify site/ssh/DB/cron OK, 3334 blocked
- 15:45 Cloudflare custom WAF rule (id 128c8f6a…): block path chứa `%2525`, `/.env`, `/@fs/`, thư mục VCS — test 403 cho scanner, 200 cho trang thật
- 16:00 NR 08:35–08:59 UTC: new avg 2.71 / p50 1.84 / p95 10.25 vs old 1.55 / 1.34 / 3.44; DB như nhau (0.56 vs 0.53). Tail = burst API test từ dev (lt-player, 171.251.232.148). API endpoints (apache_logs) chậm 1.3–2x vs cũ
- NR agent overhead đo trực tiếp: uncached page OFF ~1.4s vs ON ~1.85–2.6s. Đã thử tắt composer_api, app logging, tracer detail, span/DT, wordpress.hooks, error_collector → không giảm đáng kể. Giữ `99-mpfc-newrelic.ini` (composer_api off, log forwarding off)
- .htaccess: RSS ghi lại lúc 08:56 UTC nhưng chỉ bỏ 2 dòng trống, redirect còn. `6f05694eb` đã có trên origin/live-php83

### 2026-10-26 — WAF rule extended
- 10-24 09:36 UTC: 87.121.84.174 sent 257 `/%252f%252eenv.*` probes (single double-encoding bypassed `%2525`/`/.env` match); each 404 took ~107s in WP.
- Rule 128c8f6a… now also blocks path containing `%252e`, `%252f` (case-insensitive), `service-account.json`, `firebase-key.json`, `gcp-key.json`. Verified: probes 403; `/`, `/search/football/`, `/our-courses/` 200.

### 2026-10-26 07:46 UTC — New Relic agent disabled (temporary, user-approved)
- `/etc/php/8.3/{apache2,cli}/conf.d/99-mpfc-newrelic-off.ini` → `newrelic.enabled = false`; apache reloaded, newrelic-daemon stopped. Browser (NREUM) snippet gone too.
- Reason: ~0.4s/request agent overhead on PHP 8.3 (uncached page 1.4s off vs 1.85–2.6s on).
- Re-enable: delete both files, `systemctl reload apache2`.
- Measure from now with `apache_logs` (%D µs) — compare 10-27 vs 10-24/25 same hours (exclude 171.251.232.148 dev tests + 404).

### 2026-10-27 — New Relic overhead A/B (agent 12.12 / PHP 8.3)
- State now: apache2 NR enabled at startup (off-ini parked in `/root/upgrade/99-mpfc-newrelic-off.apache2.ini.parked`), but `conf-enabled/mpfc-nr-bench.conf` sets `newrelic.enabled 0` per request unless header `X-NR-Bench` (full/nohooks/seg/lite/detail0/nofw/min). CLI still off.
- NOTE: `newrelic.enabled=0` at PHP startup = agent never initialises → per-request enable impossible. Sampling only works as "enabled at startup, php_value 0 per request".
- Web A/B /our-courses/ (12 runs, interleaved): off 1.12–1.20s | full 1.61–1.69 | nohooks 1.45–1.51 | lite 1.48–1.55 | detail0 1.62 | no_framework 1.53 | min (all optional features off) 1.50.
- CLI render bench (/opt/nrbench): none 1.94–2.02 | 12.12 2.45–2.51 | 11.10 2.47–2.65 | 10.22 2.57–2.78 → older agents no better; overhead intrinsic (per-function-call instrumentation × WP+~60 plugins).

### 2026-10-27 — New Relic OFF for good; perf dashboard replaces it
- NR: `99-mpfc-newrelic-off.ini` back in apache2 + cli; bench conf removed (`/root/upgrade/mpfc-nr-bench.conf.disabled`); daemon stopped.
- Dashboard: https://admin.mypersonalfootballcoach.com/perf/ (own basic auth `/etc/apache2/.htpasswd-perf`, user `duong`, password in local `config/.mpfc-perf-dashboard.json`; does not open the admin site).
  - Code: `plans/mpfc-upgrade/perf-dashboard/` → server `/var/www/mpfc-perf/`; DB creds `/etc/mpfc-perf/config.php` (read-only DB user `perf_ro`, SELECT on apache_logs.*).
  - admin vhost: `ProxyPass /perf !` + `Alias /perf` (backup `/root/upgrade/admin-le-ssl.conf.bak-20261027`).
  - Shows KPIs, avg/p95/throughput chart, transactions by total time (routes normalized, `?json=` endpoints kept), slow requests list, top IPs. Ranges 1h–7d; default excludes dev IP 171.251.232.148.
- apache_logs: added `idx_datetime` on live table (clones inherit via CREATE TABLE LIKE) + clones 1024–1027. `apache_logs_clone_20261024` holds 8.4M rows (2026-05-20 → 10-24, old server clone cron stalled).
- Load time: 24h 0.8s, 3d 2.1s, 7d 12s (PHP aggregation of ~430k rows).
