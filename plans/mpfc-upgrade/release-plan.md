# MPFC upgrade — Release plan (bản review)

Go-live: **22/10/2026**. Chuyển production + app phụ (MyDailyAgent web/automation, quantification, MyBussinessAiAgent) sang droplet `608944558` (**Ubuntu 24.04 / PHP 8.3 / WP 7.1.3 / MM 3.1.1**), downtime ghi ≈ 15–30 phút, rollback ≈ 10 phút.
Chi tiết lệnh: `runbook.md`. Kết quả test: `test-results.md`.

## 0. Trạng thái hiện tại
- Diễn tập đầy đủ trên server test: build code + migrate DB + smoke (4 role) + functional (checkout Stripe, team manager, forms, Elementor, unit, upload) + json-api 469/472 case, coverage 96%. Không còn lỗi PHP fatal.
- Live: droplet 4 vCPU / 8 GB, đĩa 155G (dùng 55G) + volume `volume-lon1-02` 199G (uploads, dùng 127G). DB = DO managed MySQL (dùng chung, **không copy DB**).

## 1. Cần chốt trước (anh/Saul)
| # | Việc | Ai |
|---|---|---|
| 1 | Gửi Saul email thông báo + xin giờ bảo trì (em soạn, anh duyệt, **không tự gửi**) | anh |
| 2 | Giờ cutover 22/10: thấp điểm UK, đề xuất **06:00 UK (12:00 VN)** | anh/Saul |
| 3 | Backup DB cluster (DO snapshot/managed backup) ngay trước giờ G | em |
| 4 | App phụ chuyển **cùng đợt** (script `04`). Staging (11G, DB `wp_staging`) + mailcatcher: **không chuyển** trừ khi anh muốn | anh |
| 5 | Dùng luôn droplet test `608944558` làm production — **✅ đã resize 21/10** lên 4 vCPU/8 GB/160G (snapshot `mpfc-upgrade-test-before-prod-20261021`) | em |

## 2. Chuẩn bị (không ảnh hưởng live)
**Đã làm 21/10:**
1. ✅ Snapshot + resize droplet `s-4vcpu-8gb` (4 vCPU / 8 GB / 154G).
2. ✅ `04-move-side-apps.sh --prepare`: Chrome, Xvfb, x11vnc, gh, npm global (claude-code, gemini, codex, claudekit, repomix, wrangler, pnpm, rmbg) đúng version live; rsync `/var/www/MyDailyAgent` (3.6G, gồm `tmp/` profile browser đã login), `/var/www/MyBussinessAiAgent`, dotfiles `/home/mpfc` (.claude, .config, .ssh…); htpasswd, unit `mydailyagent-web`/`quantification-web`, vhost + cert LE copy sẵn. **Chưa bật** cron/service (tránh daily-report gửi tin 2 lần).

3b. ✅ **App phụ đã chuyển 21/10 17:10** (anh đồng ý chấp nhận downtime): `04 --activate` — crontab mpfc trên live đã xoá (backup `~/mpfc-crontab.backup-20261021`), 2 web service + x11vnc live đã tắt; server mới: crontab 6 dòng, `mydailyagent-web` (3334), `quantification-web` (3335), Xvfb :1, x11vnc **chỉ localhost** đều active. DNS `dailyagent` → `144.126.236.208`. Claude Code 2.1.296 + session/credentials chuyển qua, `claude -p` OK, `autorun-hello.sh` OK. **Còn**: DNS `quantification.youragentstore.net` (zone Cloudflare khác).
3c. ✅ DNS `staging`, `staging-admin` → IP riêng droplet cũ `142.93.46.109` (staging ở lại server cũ).

**Sáng 22/10, trước giờ G (vẫn không ảnh hưởng live):**
3. Dọn đồ test: mu-plugin `zz-upgrade-test-safety.php`, `zz-upgrade-test-pcov.php`, gỡ `php8.3-pcov`, xoá `/var/www/jsonapi-cov`.
4. `01-provision-server.sh` (KHÔNG `--test`): vhost production (main, admin) + cert, unit Resque (chưa start), swap theo RAM mới.
5. Kiểm DB cluster trusted sources có tag `mpfc` (droplet đã gắn tag).
6. Cloudflare: `staging` + `staging-admin` → IP riêng của droplet cũ `142.93.46.109` (staging ở lại server cũ, không đi theo Reserved IP). Kiểm `quantification.youragentstore.net` (zone ở Cloudflare **khác**, em không có quyền) đang trỏ IP nào.
7. ⚠️ **Chưa** chạy `02` non-test trước giờ G: nó lấy `wp-config.php` live (DB live) → nếu có request vào server mới, WP-cron sẽ chạy job live 2 nơi.

## 2b. Rà soát 2 server (21/10) — khác biệt & xử lý
| Hạng mục | Live | Server mới | Xử lý |
|---|---|---|---|
| OPcache | enable, 128M, 10000 files, revalidate 2s | giống + `jit=off` | OK |
| PHP limits (apache) | 128M, upload/post 100M, input_vars 1500, exec 30s | giống | OK |
| Apache log → DB | `CustomLog "|mysql … apache_logs"` trong vhost + format `mysql_custom_log` ở apache2.conf | 01 (non-test) copy nguyên apache2.conf + vhost; `mysql-client` đã cài | ✅ khi chạy 01 |
| Root cron | `wp cron` mỗi phút; `backup_live_volume.php` (snapshot volume); `clone_apache_logs.php` (xoay bảng apache_logs) | chưa có | Cài lúc G+27 (02 in ra, php7.4→**8.3**; 2 script đã `php -l` OK trên 8.3) |
| Resque ×3 + monit (trông redis/resque) | chạy tay + monit | unit systemd `mpfc-resque@` Restart=always — **không enable/start** cho tới G+27 (01 cũng không enable) | monit không cài |
| Apple key `/var/www/keys` | có | 02 copy | ✅ |
| Mail | WP Mail SMTP → Gmail API (cấu hình DB) | dùng chung DB | OK; mailcatcher (1080) không chuyển |
| Rollbar / Stripe live mode | bật trong DB live | test tắt **chỉ ở DB test** `wp_mpfc_upgrade`; production dùng DB live → giữ nguyên bật | Kiểm Rollbar nhận event sau cutover |
| mu-plugin test (safety, pcov) | — | có trên test | Xoá sáng 22/10 (bước 3); 02 non-test rsync `--delete` cũng xoá |
| Code untracked (vendor/, plugin không có trong git…) | ~60k file untracked | rsync theo file (không theo git) → đủ | ✅ Sửa thêm: exclude `*.zip/*.sql/*.log` trước đây áp dụng mọi thư mục → giờ chỉ ở thư mục gốc (không mất file của plugin) |
| Swap | 8G | 2G | 01 non-test tự tạo lại 8G |
| New Relic | php agent load nhưng `newrelic-daemon` **inactive** (đang không gửi data) | chưa cài | Không chặn go-live; cài sau nếu anh cần |
| ImageMagick policy | chặn PDF/PS | mặc định Ubuntu 24.04 | Không ảnh hưởng (site không xử lý PDF qua IM) |
| fluent-bit, td-agent-bit, mysql-server local | cài nhưng inactive | không cài | Bỏ |
| Stray node :3333, x11vnc 0.0.0.0 không mật khẩu | có | không | Đã bỏ / localhost |

## 3. Giờ G — cutover (≈ 30–45 phút)
| Phút | Bước |
|---|---|
| G-15 | Backup DB cluster; ghi lại `wp option get mm-major-version`, số đơn hàng/thành viên mới nhất |
| G+0 | Live: bật maintenance page; tắt root cron `wp cron` + cron PHP; dừng 3 Resque worker (`pkill -f vendor/bin/resque`) |
| G+2 | `04-move-side-apps.sh --activate`: lưu + xoá crontab mpfc trên live, dừng 2 web service + x11vnc live, rsync delta, cài crontab + bật service ở server mới (x11vnc chỉ localhost), bật vhost dailyagent/quantification |
| G+5 | Server mới: `02-build-code.sh` lần cuối (lấy code đổi trong ngày) |
| G+15 | Detach `volume-lon1-02` khỏi live → attach server mới, mount `/mnt/volume_lon1_02` (uploads symlink sẵn) |
| G+20 | `CONFIRM_LIVE_DB=yes 03-migrate-db.sh`: `wp core update-db`, plugin migrate, Elementor DB, `mm-major-version=3.1.1`, flush. Migration chỉ **thêm** bảng/cột |
| G+25 | **Chuyển Reserved IP `159.65.213.246`** (đang gắn droplet live `293179468`) sang droplet mới `608944558` — mọi domain (main, www, admin, dailyagent; quantification nếu trỏ về IP này) đổi trong vài giây, **không sửa DNS** |
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
- [ ] App phụ: `https://dailyagent.mypersonalfootballcoach.com` + `https://quantification.youragentstore.net` mở được (basic auth); `crontab -l -u mpfc` = 6 dòng; chạy tay `autorun-hello.sh` OK; trên live `crontab -l` rỗng
- [ ] Phiên browser đã login (Slack/Upwork/Workstream… trong `tmp/`) còn dùng được — nếu mất: login lại qua VNC (`ssh -L 5900:localhost:5900`)

## 5. Rollback (nếu no-go)
1. Bật maintenance trên server mới, dừng Resque/cron server mới.
2. Detach volume → attach lại live; **chuyển Reserved IP về droplet cũ** (vài giây).
3. Bật lại cron + Resque trên live; app phụ: `crontab ~/mpfc-crontab.backup-<ngày>` + `systemctl enable --now mydailyagent-web quantification-web` trên live (IP đã về cùng Reserved IP). Code cũ chạy được trên DB đã migrate (chỉ thêm bảng/cột). `mm-major-version` đặt lại `3.0.29`.
4. Nếu DB hỏng: restore backup cluster bước G-15 (mất dữ liệu từ G-15 → hạn chế bằng maintenance).
Thời gian ≈ 10 phút. Giữ live cũ **1–2 tuần** không xoá.

## 6. Sau release
- Theo dõi 48h: Rollbar, New Relic, đơn hàng/rebilling MM, push notification.
- T+1 tuần: xoá DB test `wp_mpfc_upgrade`, snapshot droplet test, key/ssh test trên live.
- T+2 tuần: xoá droplet live cũ (sau snapshot).
- Đợt sau: vá lỗ hổng json-api (`setPassword`, `changeAccountInfo`…), đóng mailcatcher 1080, update plugin premium nếu có license.

## Rủi ro chính
| Rủi ro | Giảm thiểu |
|---|---|
| License MM không nhận server mới | Cùng domain → MM tự xác thực lại; nếu không: liên hệ MM support, rollback nếu chặn thanh toán |
| Rebilling bị MM tự pause khi đổi server | Kiểm mục 4, bật lại tay |
| Thiếu file/dịch vụ chỉ có trên live | Đã bổ sung keys, Resque, app phụ; so plugin 101/101 khớp |
| IP outbound đổi (server mới gửi request ra bằng `144.126.236.208`, không phải Reserved IP) | Kiểm whitelist IP ở dịch vụ ngoài (SMTP, API đối tác) nếu có; DB cluster dùng tag `mpfc` nên OK |
| Automation chạy 2 nơi (gửi tin trùng) | `04 --activate` xoá crontab live trước khi cài ở server mới |
| Plugin premium cũ (ACF 5.2, GF 2.4…) | Đã vá PHP 8.3 + test, chỉ còn deprecated warning |
| Không bấm "Database Upgrade Required" của MM | Bấm sẽ đổi `mm_*` → `wp_mm_*`, làm hỏng code custom — ghi chú cho admin |

## Câu hỏi chưa chốt
- Giờ G + ai báo khách? Có cần email thành viên trước không?
- Staging (11G): giữ trên server cũ (DNS trỏ `142.93.46.109`) — khi xoá server cũ 1–2 tuần sau thì staging mất; có cần chuyển (chưa có patch PHP 8.3 cho staging)?
- `quantification.youragentstore.net` nằm ở tài khoản Cloudflare nào? Cần trỏ A record → `144.126.236.208` (app đã chạy ở server mới, server cũ đã tắt → **đang down** đến khi đổi DNS).
- PayPal: chưa test sandbox — chấp nhận kiểm bằng giao dịch thật sau cutover?
