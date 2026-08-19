## Performance [all] — 08:51 (+07:00)

Window: 2026-08-18T08:35:00+07:00 → 2026-08-19T08:51:00+07:00

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| ohcleo (prod) | 0.92 | 1079 ms | 2.34% (804/34424) — ~94% benign NotAuthenticated/InvalidToken; real ~0.15% (51) | 23.63 req/min |
| ohcleo (staging) | 0.96 | 182 ms | 3.37% (60/1781) — 59 NotAuthenticated benign; real 0.06% (1) | 1.22 req/min |
| mpfc | 0.60 | 870 ms | 0.67% (215/31872) | 21.88 req/min |
| fountain | 0.98 | 130 ms | 0.01% (3/44762) | 30.72 req/min |
| infinity | 0.98 | 141 ms | 0.02% (4/17286) | 11.86 req/min |

### ohcleo (prod) — topErrors (full)

| facet | count |
|-------|-------|
| rest_framework.exceptions:NotAuthenticated — "Authentication credentials were not provided." | 753 |
| rest_framework_simplejwt.exceptions:InvalidToken — Token is invalid or expired | 26 |
| rest_framework.exceptions:AuthenticationFailed — "Passwords don't match!" | 9 |
| builtins:ValueError — "Invalid bcrypt hash format" | 4 |
| rest_framework.exceptions:AuthenticationFailed — "User does not exist!" | 4 |
| rest_framework.exceptions:ValidationError — email + username already exists | 4 |
| rest_framework.exceptions:ValidationError — email already exists | 2 |
| rest_framework.exceptions:ValidationError — "No user found with this email address." | 1 |
| rest_framework.exceptions:ValidationError — username already exists | 1 |

### ohcleo (prod) — slowestTransactions (full)

| endpoint | avgMs | calls |
|----------|-------|-------|
| app.views.medias:MediaByKeyView.get | 51414 | 569 |
| app.views.creator_verification:CreatorVerificationSubmitView.post | 16315 | 1 |
| app.views.medias:HomeMediasView.get | 3261 | 722 |
| app.views.users:CreatorPayoutHistoryView.get | 1706 | 1 |
| app.views.medias:MediaRecommendsView.get | 1083 | 860 |

### ohcleo (staging) — topErrors (full)

| facet | count |
|-------|-------|
| rest_framework.exceptions:NotAuthenticated — "Authentication credentials were not provided." | 59 |
| rest_framework_simplejwt.exceptions:InvalidToken — Token is invalid or expired | 1 |

### ohcleo (staging) — slowestTransactions (full)

| endpoint | avgMs | calls |
|----------|-------|-------|
| app.views.medias:MediaAddTrackAPIView.post | 12094 | 6 |
| app.views.play_history:RecentTracksView.get | 1124 | 36 |
| app.views.medias:HomeMediasView.get | 722 | 55 |
| app.views.medias:MediaRecommendsView.get | 710 | 7 |
| app.views.moderation:ModerationActionView.post | 616 | 3 |

### mpfc (prod) — topErrors (full)

| facet | count |
|-------|-------|
| Error — Call to undefined method WP_Error::get_method() (wp-rest-server.php:1091) | 176 |
| E_WARNING — "continue" targeting switch is equivalent to "break" | 23 |
| E_COMPILE_ERROR — require(): Failed opening 'ABSPATHWPINC/blocks/legacy-widget.php' | 3 |
| E_WARNING — mysqli_real_connect(): (HY000/2002): No such file or directory | 2 |
| E_WARNING — mysqli_real_connect(): getaddrinfo failed: Temporary failure in name resolution | 2 |
| Error — Class 'MM_Event' not found (pfc7/functions.php:3739) | 2 |
| E_COMPILE_ERROR — require(): Failed opening 'ABSPATHwp-includes/version.php' | 1 |
| E_WARNING — mkdir(): File name too long | 1 |
| Error — Call to undefined function add_action() (twentytwenty/functions.php:144) | 1 |
| Error — Call to undefined function get_header() (twentynineteen/404.php:12) | 1 |

### mpfc (prod) — slowestTransactions (full)

| endpoint | avgMs | calls |
|----------|-------|-------|
| user-video/goal-2/ | 42041 | 1 |
| user-video/emin-kulla-training/1626551687-jpeg/ | 39671 | 1 |
| soccer-player-development-podcast-episode-93-jeroen-chantrain/podcast-square-thumbnails-5/ | 38877 | 1 |
| sitemap_index.xml | 36975 | 1 |
| user-video/inside-outside-monday-rolls-turns-program/1601361151-png/ | 30404 | 1 |

### fountain (prod) — topErrors (full)

| facet | count |
|-------|-------|
| ArgumentError — "wrong number of arguments (given 3, expected 2)" | 3 |

### fountain (prod) — slowestTransactions (full)

| endpoint | avgMs | calls |
|----------|-------|-------|
| Controller/admin/product_catalogs/import_csv | 104927 | 4 |
| Controller/admin/credit_histories/index | 8280 | 1 |
| Controller/admin/promo_codes/index | 4379 | 1 |
| Controller/admin/product_catalogs/update | 1780 | 51 |
| Controller/gifts/build_a_box_gift_variants | 1749 | 109 |

### infinity (prod) — topErrors (full)

| facet | count |
|-------|-------|
| ArgumentError — "wrong number of arguments (given 3, expected 2)" | 4 |
| NoMethodError — "undefined method `id' for nil:NilClass" | 1 |

### infinity (prod) — slowestTransactions (full)

| endpoint | avgMs | calls |
|----------|-------|-------|
| Controller/admin/gifts/edit | 3267 | 1 |
| Controller/admin/extra_items/create | 2542 | 2 |
| Controller/payment_intents/create | 1307 | 7 |
| Controller/users/registrations/create | 1163 | 1 |
| Controller/cart_items/create | 893 | 13 |

### Slow transactions >5s (ALERT)

- **ohcleo (prod) MediaByKeyView.get — 51.4s avg / 569 calls** (was 24.7s/324 on 08-18; worsened ~2x, chronic unresolved for weeks). Highest-volume slow endpoint.
- **ohcleo (prod) CreatorVerificationSubmitView.post — 16.3s / 1 call** (new outlier this window).
- **ohcleo (staging) MediaAddTrackAPIView.post — 12.1s / 6 calls** (recurring outlier; 80.8s on 08-18).
- **mpfc — all 5 slowest >5s**: video/image/podcast page + sitemap_index.xml at 30–42s each (single calls, uncached page-load pattern; SQLi WAITFOR probes NOT in top-5 this window).
- **fountain import_csv — 104.9s / 4 calls** (admin CSV import, 1 call can legitimately take long but 4x in window); **fountain credit_histories/index — 8.3s / 1 call**.

### New / unusual top errors

- **ohcleo (prod) builtins:ValueError "Invalid bcrypt hash format" — 4x**: not noted in prior windows; likely malformed stored hash on login, small volume but new signature. Watch.
- **ohcleo (prod) AuthenticationFailed "Passwords don't match!" — 9x** + "User does not exist!" — 4x: routine bad-login noise, elevated slightly.
- **mpfc E_COMPILE_ERROR require() failures (legacy-widget.php 3x, version.php 1x)**: PHP include-path/file-resolution failures — suggest filesystem/theme file inconsistency; recurred intermittently before.
- **mpfc WP_Error::get_method() 176x**: chronic (89x on 08-18, increasing). Top real bug.
- **mpfc slowest txn pattern switched** from SQLi WAITFOR DELAY probes (08-18, chronic) to video/image/page URLs — probes absent this window, good; uncached page loads now dominate.
- **fountain/infinity ArgumentError "wrong number of arguments (given 3, expected 2)"**: chronic signature on both Rails apps, low volume (3x / 4x). Known.

### Flags

- **mpfc apdex 0.60** (< 0.7) — still poor (was 0.54); driven by 870ms avg + slow page loads + 620 frustrating responses. Chronic.
- **ohcleo prod apdex 0.92** — healthy but avg 1079ms elevated by MediaByKeyView 51s outlier.
- No project exceeded 5% real error rate (all post-benign-exclusion well under 1%).
