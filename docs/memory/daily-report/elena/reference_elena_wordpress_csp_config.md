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
