#!/bin/bash
# 90 — TEST SERVER ONLY. Refresh the test DB (wp_mpfc_upgrade) from the live READ REPLICA and make it safe:
# payments in test/sandbox mode, Rollbar off, mail blocked (mu-plugin), test users recreated.
# Usage: bash 90-test-env.sh --copy-only        # 1) fresh pre-upgrade DB copy (no WP load => no plugin migrations)
#        (run 03-migrate-db.sh here)
#        TEST_PW_MEMBER=.. TEST_PW_TEAM=.. TEST_PW_MANAGER=.. TEST_PW_ADMIN=.. bash 90-test-env.sh --skip-copy   # 2) safety + users
#   (passwords: jq .test_users config/.mpfc-upgrade-test-config.json on the operator machine)
source "$(dirname "$0")/lib.sh"
DB=$(wpconf DB_NAME); [ "$DB" = "wp_mpfc_upgrade" ] || die "refusing: DB_NAME=$DB (must be wp_mpfc_upgrade)"
RO=private-db-ro-mysql-lon1-25682-do-user-7370600-0.g.db.ondigitalocean.com
# Big log tables: copy structure only (full copy pushed the 1vCPU primary to 95% CPU on 2026-10-14).
HEAVY="mm_notifications mm_app_usage_logs mm_app_log_events wp_uap_action_log_meta mm_log_events api_payment_logs wp_uap_api_log wp_posts_bkp wp_prli_clicks"

if [ "${1:-}" != "--skip-copy" ]; then
  log "90: recreate $DB from replica (throttled 2MB/s)"
  h=$(wpconf DB_HOST); U=$(wpconf DB_USER); export MYSQL_PWD; MYSQL_PWD=$(wpconf DB_PASSWORD)
  dbq -e "DROP DATABASE IF EXISTS wp_mpfc_upgrade; CREATE DATABASE wp_mpfc_upgrade"
  IGN=""; for t in $HEAVY; do IGN="$IGN --ignore-table=wp_mpfc.$t"; done
  O="-h$RO -P${h##*:} -u$U --single-transaction --quick --set-gtid-purged=OFF --no-tablespaces --column-statistics=0"
  # shellcheck disable=SC2086
  { mysqldump $O --no-data wp_mpfc $HEAVY; mysqldump $O $IGN wp_mpfc; } | pv -q -L 2m |
    mysql -h"${h%:*}" -P"${h##*:}" -u"$U" --init-command="SET SESSION sql_require_primary_key=0" wp_mpfc_upgrade
  log "90: copy done: $(dbq -e "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='wp_mpfc_upgrade'") tables"
fi
# Safety first, with --skip-plugins: writes options only, loads no plugin => no plugin migrations run here.
log "90: Rollbar off, payments neutralised (no plugin load)"
wps() { sudo -u www-data wp --path="$SITE" --skip-themes --skip-plugins "$@" 2>&1 | grep -v "HTTP_HOST\|Deprecated" || true; }
wps plugin deactivate rollbar | tail -1
wps option patch update rollbar_wp enabled 0 | tail -1
cp "$HERE/test-neutralize-payments.php" /tmp/neutralize-payments.php && chmod 644 /tmp/neutralize-payments.php
wps eval-file /tmp/neutralize-payments.php
[ "${1:-}" = "--copy-only" ] && { log "90: copy-only done (now run 03-migrate-db.sh, then 90 --skip-copy)"; exit 0; }

log "90: test users (MPFC Demo level 9, team key NUS-UPGRADE-TEST)"
mkuser() { # login email role password
  local id; id=$(wpc user get "$1" --field=ID | tail -1)
  if ! [[ "$id" =~ ^[0-9]+$ ]]; then id=$(wpc user create "$1" "$2" --role="$3" --user_pass="$4" --porcelain | tail -1); else wpc user update "$id" --user_pass="$4" --role="$3" >/dev/null; fi
  wpc user meta update "$id" show_admin_bar_front false >/dev/null
  echo "$id"
}
ADMIN=$(mkuser nus_upgrade_admin upgrade-admin@nustechnology.invalid administrator "${TEST_PW_ADMIN:?}")
MEM=$(mkuser nus_upgrade_member upgrade-member@nustechnology.invalid subscriber "${TEST_PW_MEMBER:?}")
TEAM=$(mkuser nus_upgrade_team upgrade-team@nustechnology.invalid subscriber "${TEST_PW_TEAM:?}")
MGR=$(mkuser nus_upgrade_manager upgrade-manager@nustechnology.invalid team-manager "${TEST_PW_MANAGER:?}")
TPL=$(dbq -e "SELECT wp_user_id FROM wp_mpfc_upgrade.mm_user_data WHERE membership_level_id=9 AND status=1 LIMIT 1")
for id in $MEM $TEAM $MGR; do
  dbq wp_mpfc_upgrade -e "DELETE FROM mm_user_data WHERE wp_user_id=$id;
    CREATE TEMPORARY TABLE t SELECT * FROM mm_user_data WHERE wp_user_id=$TPL;
    UPDATE t SET wp_user_id=$id, membership_level_id=9, status=1, first_name='Upgrade', last_name='Tester'; INSERT INTO mm_user_data SELECT * FROM t;"
done
KEY=$(dbq wp_mpfc_upgrade -e "SELECT id FROM wp_team_keys WHERE \`key\`='NUS-UPGRADE-TEST'")
[ -n "$KEY" ] || KEY=$(dbq wp_mpfc_upgrade -e "INSERT INTO wp_team_keys (membership_id,\`key\`) VALUES (9,'NUS-UPGRADE-TEST'); SELECT LAST_INSERT_ID()")
dbq wp_mpfc_upgrade -e "DELETE FROM wp_team_keys_users WHERE user_id IN ($MEM,$TEAM); INSERT INTO wp_team_keys_users (team_key_id,user_id) VALUES ($KEY,$MEM),($KEY,$TEAM)"
log "90: users admin=$ADMIN member=$MEM team=$TEAM manager=$MGR key=$KEY"
wpc cache flush | tail -1
log "90: done"
