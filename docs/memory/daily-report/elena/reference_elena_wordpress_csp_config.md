---
name: reference_elena_wordpress_csp_config
description: Where samguard.co's CSP policy lives (DB option, not a file) — needed whenever a CSP violation alert needs a precise fix, not just a flag
metadata:
  type: reference
---

samguard.co's Content-Security-Policy is set by the WordPress plugin **"Headers Security Advanced & HSTS WP"** (`headers-security-advanced-hsts-wp`), not a server config file or `.htaccess`.

**Location:**
- Server: `samguard.co` SSH host (see `~/.ssh/config`, key `~/.ssh/kai/id_rsa`)
- WordPress root: `/var/www/html/Elena-WPSamGuard/`
- DB: `wp_samguard` (root/password per `wp-config.php`, localhost)
- Option: `wp_options` table, `option_name = 'hsts_csp'` — full CSP string (default-src/script-src/connect-src/style-src/font-src/img-src/worker-src/frame-src/frame-ancestors all in one value)
- Related toggles: `disable_csp_header`, `disable_hsts_header`, `disable_x_content_type_options_header`, `disable_x_frame_options_header`, `hsts_csp_report_uri`

**How to apply when a CSP violation alert appears (per [[feedback_csp_violations_are_real_errors]]):**
1. Re-run `node scripts/wordpress-samguard-check.js` (needs `TMPDIR_OVERRIDE=<writable dir>` locally — the script defaults to a server-only path `/var/www/MyDailyAgent/tmp/chrome-tmp`) to confirm which domain is actually blocked right now.
2. SSH to `samguard.co`, `mysql -uroot -ppassword wp_samguard -e "SELECT option_value FROM wp_options WHERE option_name='hsts_csp';"` to read the live policy.
3. Identify which directive (`connect-src`, `script-src`, etc.) is missing the blocked domain.
4. **Do not apply the SQL UPDATE without asking the user first** — this is a live production security-header change, even though it's just a domain whitelist addition. Present the exact before/after value and let the user decide.

**2026-06-18 incident:** `connect-src` was missing `https://ad.doubleclick.net` (Google Ads remarketing collect call), causing real CSP violations. User chose to leave it documented rather than auto-apply the fix.

**2026-07-10 confirmed hard blocker (not just "ask first" caution):** even with explicit user authorization to fix internal issues directly, this CANNOT currently be applied by the agent — verified live:
- SSH user `nustech` on `samguard.co` is NOT in the `www-data` group; `.htaccess` is `rw-rw-r-- www-data:www-data` → no write access.
- `sudo -n` fails ("a password is required") — no stored sudo password anywhere in `config/`.
- No wp-admin login credentials stored anywhere in `config/` to automate the fix via browser.
- A raw SQL `UPDATE` on `wp_options.hsts_csp` changes the DB but does NOT rewrite `.htaccess` (only the plugin's own `update_option` hook does that, which only fires on a real wp-admin settings-page save) — so a direct DB edit would silently NOT fix the live served header even though it looks fixed in the DB.
**To actually unblock:** need either wp-admin credentials for samguard.co, or the `nustech` sudo password, or add `nustech` to the `www-data` group. Until one of those exists, treat any samguard.co CSP violation as reportable-only, not agent-fixable.
