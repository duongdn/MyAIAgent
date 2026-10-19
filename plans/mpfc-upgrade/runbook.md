# MPFC upgrade — Runbook (scripts)

Scripts: `plans/mpfc-upgrade/scripts/` (repo này). Chạy **root trên server MỚI**. Không chứa secret (DB creds đọc từ wp-config copy từ live).

| Script | Làm gì | Khi nào |
|---|---|---|
| `lib.sh` | helper chung (log, wp-cli, đọc wp-config, schema dump) | — |
| `01-provision-server.sh [--test]` | Ubuntu 24.04 → Apache + mod_php 8.3, ext, php.ini/mpm y live, users mpfc/mpfc-fpt, swap, apache2.conf + vhosts + LE certs copy từ live, unattended-upgrades chỉ security 02:00 UTC | 1 lần khi dựng server |
| `02-build-code.sh [--test]` | rsync code từ live → patch PHP 8.3 site → WP core 7.1.3 → plugin đúng `target-plugin-versions.csv` (wp.org) → MemberMouse 3.1.1 + `patches/membermouse-3.1.1-mpfc-custom.patch` → Elementor Pro 4.3.2 (zip `mpfc:~/elementor-pro-4.3.2.zip`) → patch wd-instagram-feed → lint. **Không đụng DB, không load plugin** (`--skip-plugins`) | trước cutover + chạy lại lúc cutover (lấy code mới nhất) |
| `03-migrate-db.sh [--check]` | `wp core update-db`, admin_init cho plugin tự migrate, `elementor update db`, `mm-major-version=3.1.1`, flush cache, schema before/after diff | lúc cutover. DB live cần `CONFIRM_LIVE_DB=yes` |
| `90-test-env.sh --copy-only` / `--skip-copy` | CHỈ test: copy DB từ replica (bỏ data 9 bảng log), tắt Rollbar + payment live (không load plugin), tạo user test | diễn tập |

Patch: `patches/site-php83-fixes.patch` (mu-plugin force-strong-passwords, json-api query/coachpass/dashboard/dynamicballmastery, gravityforms forms_model, WPBakery x3), `patches/wd-instagram-feed-1.4.35-fixes.patch`, `patches/membermouse-3.1.1-mpfc-custom.patch`.

Truy cập live từ server mới: key `/root/.ssh/mpfc_live_ed25519`, thêm vào `mpfc@live:~/.ssh/authorized_keys` với `from="<private IP server mới>"`. Live private IP 10.106.0.6.

## Diễn tập trên test (thứ tự đúng)
1. `02-build-code.sh --test`
2. `90-test-env.sh --copy-only` (DB mới = live, chưa migrate)
3. `03-migrate-db.sh` → so schema diff với `schema-diff-live-vs-upgraded.txt`
4. `TEST_PW_*=… 90-test-env.sh --skip-copy` → user test
5. smoke: `node plans/mpfc-upgrade/tests/smoke-test.js` (máy local) + API app

## Cutover (production) — nháp, chốt sau khi Saul duyệt
1. T-1 ngày: tạo droplet mới (tag `mpfc`, lon1, size như live), `01-provision-server.sh`, `02-build-code.sh`, smoke qua hosts file.
2. Giờ thấp điểm UK: thông báo bảo trì ngắn.
3. Live: tắt root cron `wp cron` (tránh chạy song song), chặn ghi (maintenance page).
4. Server mới: `02-build-code.sh` lần cuối (lấy code đổi trong ngày).
5. Detach volume `volume-lon1-02` khỏi live → attach server mới, mount `/mnt/volume_lon1_02`.
6. `CONFIRM_LIVE_DB=yes 03-migrate-db.sh` (DB dùng chung cluster — không copy DB).
7. Cloudflare: A record `mypersonalfootballcoach.com` (+ admin., staging…) → IP mới (proxied, đổi tức thì).
8. Root crontab (02 in ra, php7.4→8.3), New Relic, monit, `wp yoast index` off-peak.
9. Smoke test + API app + 1 giao dịch thật nhỏ + refund.
10. Rollback: trỏ DNS lại live cũ (code cũ chạy được trên DB đã migrate vì chỉ thêm bảng/cột); attach volume lại. Giữ live cũ 1–2 tuần.

## Checklist release: chuyển app phụ sang server mới (hoãn tới lúc release)
Quyết định 19/10: chuyển #3 MyDailyAgent, #4 quantification, #5 MyBussinessAiAgent sang server production mới (KHÔNG lên droplet test). Lúc release **tăng size droplet mới** (≥ live 4vCPU/8G) vì thêm Chrome/Claude CLI/cron.
- [ ] Viết + chạy `04-move-side-apps.sh` (chưa viết)
- [ ] Gói: google-chrome-stable, xvfb, x11vnc, gh, fonts; npm -g: `@anthropic-ai/claude-code`, `@google/gemini-cli`, `@openai/codex`, `claudekit-cli`, `repomix`, `wrangler`, `pnpm`, `rmbg-cli`
- [ ] rsync `/var/www/MyDailyAgent` (3.4G, có `tmp/` chứa browser profile login), `/var/www/MyBussinessAiAgent` (chỉ code, không vhost/cron)
- [ ] rsync `/home/mpfc` dotfiles: `.claude` `.claude.json` `.claudekit` `.config` `.ssh` (key github `duongdn`) `.gitconfig` `.local` — bỏ zip Elementor, `upgrade/`, `mm-data-export*`
- [ ] systemd `mydailyagent-web` (3334), `quantification-web` (3335); bỏ node chạy tay cũ port 3333
- [ ] vhost `dailyagent`/`quantification` (01 đã copy) + copy `/etc/apache2/.htpasswd`, `.htpasswd-quantification`; LE certs (01 đã copy)
- [ ] crontab user `mpfc` (6 dòng autorun-*.sh)
- [ ] Xvfb :1 + x11vnc **listen localhost** (live đang `-nopw` 0.0.0.0)
- [ ] DNS Cloudflare: `dailyagent.mypersonalfootballcoach.com`, `quantification.youragentstore.net` → IP mới
- [ ] Không chuyển: mailcatcher (port 1080 đang mở public trên live — chặn), staging (hỏi Saul), file rác (`DONT.REMOVED...zip`, PDF 320M trong wp-content, `elementor-backup-3.3.1` — hỏi Saul)
- [ ] Sau chuyển: chạy thử 1 lần daily-report + news-digest, login lại VNC nếu session mất

## Câu hỏi chưa giải quyết
- CustomLog pipe mysql (password plaintext trong vhost) — giữ hay bỏ ở server mới?
- 3 app phụ (MyDailyAgent, quantification, MyBussinessAiAgent) chuyển theo không?
- Giờ cutover + ai báo khách.

## Diễn tập 2026-10-16 (kết quả)
- 02 --test: rsync live → WP 7.1.3 → 57 plugin wp.org + MM 3.1.1 custom + Elementor Pro 4.3.2 + patch: **khớp 100% target-plugin-versions.csv** (~8 phút).
- 90 --copy-only: DB mới từ replica 22 phút (285 bảng), live không ảnh hưởng (live / 200 ~0.9s).
- 03: schema cuối = lần nâng cấp tay 15/10, chỉ thiếu `wp_fv_player_encoding_jobs` (FV Player tạo lười khi mở trang admin encoding — không cần).
- Smoke: guest 25 / member 27 / team 34 / manager 57 trang, 0 lỗi PHP; API app 20 endpoint chính OK (login, likeVideo, favorites, coach_corner, DBM, setPassword…).
- Lỗi script phát hiện + đã sửa: (1) rsync live cần `sudo rsync` + bỏ debug.log; (2) mu-plugin chưa vá làm wp-cli fatal → áp patch site trước mọi lệnh wp; (3) 02 phải `--skip-plugins` (load plugin = migration sớm); (4) 03 đọc version phải `--skip-plugins`; (5) **rewrite rules mất CPT của theme (/user-video/ 404) khi chạy `--skip-themes` → 03 flush rewrite có load theme**; (6) 90 tắt payment/Rollbar bằng wp `--skip-plugins` (không REPLACE SQL trên dữ liệu serialize).
