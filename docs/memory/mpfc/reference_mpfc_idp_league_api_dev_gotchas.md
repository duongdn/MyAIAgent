---
name: reference_mpfc_idp_league_api_dev_gotchas
description: MPFC IDP/League Tables API work — where code/docs/specs live, demo test account, HyperDB + Cloudflare gotchas
metadata:
  type: reference
---

Learned 2026-10-22 while answering Tien's (app dev) 6 API questions in Slack mpdm C057Y0CUKFC.

- 🔴 **Server moved 2026-10-23 10:09:** live = `159.65.213.246` (droplet 608944558), branch **`live-php83`**. Old `142.93.46.109` / branch `live` = rollback only (SSH now blocked). `ssh mpfc.mpfc.live` alias repointed. Check `hostname` = mpfc-upgrade-test before editing.
- Many PHP files are CRLF: edit with `open(p, newline='')`, never plain read/write (rewrites every line). Theme files owned www-data → `sudo`.
- **App Feed** (signed S2S, `controllers/appfeed.php`, doc `api-docs/app-feed/`): secret in option `mpfc_app_feed_secret`, test `/tmp/appfeed-e2e-test.py`.
- **Code (commit + push directly):** `wp-content/plugins/json-api/controllers/{idp,leaguetables}.php`, logic in `wp-content/themes/pfc7/inc/{idp,league-tables}.php`.
- **API docs:** `https://mypersonalfootballcoach.com/api-docs/` (basic auth in Slack DM), files `/var/www/mypersonalfootballcoach.com/api-docs/{idp,idp-player,idp-coach,league-tables,app-feed}/index.html` — NOT in git, back up before editing. Never create a new doc file; update these.
- **Specs:** Slack MPFC files `League Tables — Team Manager Backend.pdf` (F0C576HH9NW), `Answers to the Developer's Questions…` (F0C5JM5DXPU), `MPFC-Club-Dashboard-Brief.pdf` (F0C596NQL8Z). Token now has `files:read`. Read spec before answering "is X specified".
- **Demo test account:** `lt-player` (WP id 69084, club 9 MPFC Demo). IDP/LT flags default to club 9 only. Test over real HTTP with `wp_generate_auth_cookie(69084,…)` → `?cookie=`.
- **Gotchas:** HyperDB — all SELECTs go to a read-only replica (no `FOR UPDATE`, replica lag right after writes → sleep before verifying). Cloudflare caches GET `/api/*` 4h → always POST. json-api returns HTTP 200 for errors; real code in body `status`. Python urllib needs `User-Agent: curl/…` or Cloudflare blocks.
- Known spec gaps not yet fixed (user said optional): ties should share position alphabetically; club-wide league should be per squad; "league player sees first" setting.

Related: [[feedback_mpfc_plugins_have_custom_code_check_before_update]]
