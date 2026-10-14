# MPFC server upgrade — Ubuntu 24.04 + PHP 8.3 + WP latest

Status: DRAFT — waiting on Saul sign-off + inputs (see bottom)

## Current state (live, read-only check 2026-10-14)
- Droplet 142.93.46.109 (DO), 4 vCPU / 8GB / 155GB (56GB used), Ubuntu 20.04.6 (EOL)
- Apache2 + PHP 7.4.3 (mod_php/fpm?), MySQL 8.0.40, Redis, monit, New Relic PHP agent, LE certs
- WP 6.6.2, theme pfc7 4.3.0.2, DB wp_mpfc 4GB, site dir 12GB
- vhosts: mypersonalfootballcoach.com, admin., staging., staging-admin., dailyagent., quantification.youragentstore.net
- Also hosts: MyDailyAgent cron (6 jobs) + mydailyagent-web.service, quantification-web.service, MyBussinessAiAgent

## Highest risks
1. Plugins very old vs PHP 8.3: ACF Pro 5.2.1, Gravity Forms 2.4.15 (+Stripe 3.2, Mailchimp 4.6), Essential Grid 1.5.1-**custom**, Yoast 12.6, CF7 5.1.5, json-api 1.1.1 (abandoned), WP Courseware 4.6.4, MemberMouse 3.0.22, go_pricing 2.4, mega-addons-VC, custom theme pfc7. Premium ones need licenses to update.
2. MemberMouse = payments/membership → must test signup, login, rebill webhook, cancel.
3. Shared box: our own cron agent + 2 other apps must move too (or stay on old box).
4. Cutover: DB writes (new signups/payments) during sync → final delta dump at cutover in maintenance mode.

## Phases
1. Prep: snapshot old droplet; inventory (crontabs, systemd units, apache confs, php.ini, NR, monit, /var/www/keys, utils, SMTP, firewall/ufw, DNS/Cloudflare)
2. New droplet Ubuntu 24.04: Apache, PHP 8.3-fpm (+ same extensions), MySQL 8.0, Redis, certbot, NR agent, monit
3. Copy files (rsync) + DB dump; point to temp hostname / hosts file; DISABLE outgoing mail, cron, MemberMouse/Stripe webhooks on new box
4. PHP 8.3 compat: run PHPCompatibility scan on theme+plugins; update plugins; patch custom code (pfc7, essential-grid custom, mpfc-firebase-bridge, video-library-manager, collections)
5. WP core → latest; DB upgrade; full QA checklist (pages, Elementor, video player, forms, member login, course access, checkout in Stripe test mode, admin)
6. Move other apps (MyDailyAgent, quantification, MyBussinessAiAgent) — or decide they stay
7. Cutover (<30m): maintenance mode → final DB dump/import + rsync uploads → switch DNS (Cloudflare, low TTL) or reassign Reserved IP → certs → smoke test → re-enable cron/webhooks
8. Rollback: old droplet kept running untouched 1–2 weeks; flip DNS back

## Needed from user / Saul
- Saul sign-off + who pays new droplet (run both ~2 weeks)
- DigitalOcean access (create droplet/snapshot/Reserved IP) — current: SSH only
- DNS: Cloudflare access (proxied? TTL)
- Licenses: Elementor Pro, Gravity Forms + addons, ACF Pro, MemberMouse, WP Courseware, FV Player Pro, Essential Grid, go_pricing
- MemberMouse/Stripe: can webhook URL stay same (domain) — confirm; test-mode access
- Cutover window (low-traffic time, Saul's TZ)
- Scope: other apps on box move too?
- Budget/estimate approval (plugin compat could be the bulk of hours)
