#!/bin/bash
# 03 — Migrate the database to the upgraded code (WP core + plugin schema upgrades). Run on the NEW server
# AFTER 02-build-code.sh. Migrations are additive (new tables/columns/indexes) — old code keeps working on it.
# Usage: bash 03-migrate-db.sh            # DB = DB_NAME from wp-config (refuses wp_mpfc unless CONFIRM_LIVE_DB=yes)
#        bash 03-migrate-db.sh --check     # only show versions + schema diff, change nothing
source "$(dirname "$0")/lib.sh"
CHECK=0; [ "${1:-}" = "--check" ] && CHECK=1
DB=$(wpconf DB_NAME)
[ -n "$DB" ] || die "DB_NAME not found in wp-config"
if [ "$DB" = "wp_mpfc" ] && [ $CHECK = 0 ] && [ "${CONFIRM_LIVE_DB:-}" != "yes" ]; then
  die "DB_NAME is the LIVE database. Re-run with CONFIRM_LIVE_DB=yes during the cutover window only."
fi

wps() { sudo -u www-data wp --path="$SITE" --skip-themes --skip-plugins "$@" 2>&1 | grep -v "HTTP_HOST\|Deprecated" || true; }
# Read versions WITHOUT loading plugins (loading them triggers their migrations).
ver() { echo "WP db_version=$(wps option get db_version | tail -1) mm-major-version=$(wps option get mm-major-version | tail -1) elementor=$(wps option get elementor_version | tail -1) yoast_db=$(wps eval 'echo (get_option("wpseo")["version"] ?? "-");' | tail -1)"; }
schema_dump "$DB" > "$ART/schema-before-$DB.txt"   # first: before anything loads WP
log "03: target DB=$DB — before: $(ver)"

if [ $CHECK = 0 ]; then
  log "03: WP core DB upgrade"
  wpc core update-db | tail -1 | tee -a "$ART/upgrade.log"

  log "03: plugin upgrade routines (run on plugins_loaded/init/admin_init by each plugin)"
  # Loading WP as an administrator with admin_init fired lets MemberMouse, Uncanny Automator, FV Player,
  # Yoast etc. run their own version-check migrations exactly as on the first wp-admin visit.
  ADMIN=$(wpc user list --role=administrator --field=ID --number=1 | tail -1)
  wpc eval "wp_set_current_user($ADMIN); if(!defined('WP_ADMIN')) define('WP_ADMIN', true); do_action('admin_init'); echo 'admin_init ok';" | tail -1
  wpc elementor update db | tail -1
  wpc elementor-pro update db 2>/dev/null | tail -1 || true

  log "03: MemberMouse version marker"
  wpc option update mm-major-version 3.1.1 | tail -1

  log "03: flush caches + rebuild rewrite rules WITH the theme loaded"
  # pfc7 theme registers CPTs (mpfc_user_video => /user-video/...). Rules regenerated while the theme
  # is skipped lose them => 404s (caught in rehearsal 2026-10-16). Never use --skip-themes here.
  wpt() { sudo -u www-data wp --path="$SITE" "$@" 2>&1 | grep -v "HTTP_HOST\|^Deprecated\|^PHP Deprecated\|^Notice\|^Warning: " || true; }
  wpt cache flush | tail -1
  wpt transient delete --expired | tail -1
  wpt rewrite flush | tail -1
  log "03: rewrite rules for /user-video/: $(wpt rewrite list --format=csv | grep -c 'user-video')"
fi

schema_dump "$DB" > "$ART/schema-after-$DB.txt"
log "03: after: $(ver)"
ADDED=$(diff "$ART/schema-before-$DB.txt" "$ART/schema-after-$DB.txt" | grep -c '^>' || true)
REMOVED=$(diff "$ART/schema-before-$DB.txt" "$ART/schema-after-$DB.txt" | grep -c '^<' || true)
log "03: schema lines added=$ADDED removed/changed=$REMOVED (expected: only additions, see plans/mpfc-upgrade/schema-diff-live-vs-upgraded.txt)"
diff "$ART/schema-before-$DB.txt" "$ART/schema-after-$DB.txt" | grep '^<' | head -20 | tee -a "$ART/upgrade.log" || true
log "03: done. Yoast indexables are NOT built here (heavy on the 1vCPU DB): run 'wp yoast index' off-peak later."
