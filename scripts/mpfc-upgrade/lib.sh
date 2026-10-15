#!/bin/bash
# Shared helpers for the MPFC upgrade scripts (run as root on the NEW server).
# No secrets here: DB credentials are read from the site's own wp-config.php.
set -euo pipefail

SITE=/var/www/mypersonalfootballcoach.com
LIVE_SSH=${LIVE_SSH:-mpfc@10.106.0.6}          # live droplet over DO private network (override if needed)
LIVE_KEY=${LIVE_KEY:-/root/.ssh/mpfc_live_ed25519}
HERE=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
ART=${ART:-/root/mpfc-upgrade}                  # artifacts dir: zips, backups, logs
TARGET_WP=7.1.3
mkdir -p "$ART"

log()  { echo "[$(date -u +%H:%M:%S)] $*" | tee -a "$ART/upgrade.log"; }
die()  { log "FATAL: $*"; exit 1; }
wpc()  { sudo -u www-data wp --path="$SITE" --skip-themes "$@" 2>&1 | grep -v "HTTP_HOST\|^Deprecated\|^PHP Deprecated\|^Notice\|^Warning: " || true; }
wpr()  { wp --allow-root --path="$SITE" --skip-themes "$@"; }   # root, for downloads (www-data egress may be firewalled)
live() { ssh -i "$LIVE_KEY" -o StrictHostKeyChecking=accept-new "$LIVE_SSH" "$@"; }
fixperm() { chown -R www-data:www-data "$SITE/wp-content" "$SITE"/*.php 2>/dev/null || true; }

# wp-config constant reader (works before WP can boot)
wpconf() { php -r "error_reporting(0);\$c=file_get_contents('$SITE/wp-config.php');preg_match(\"/^define\\(\\s*.$1.\\s*,\\s*.([^\\x27]*)./m\",\$c,\$m);echo \$m[1]??'';"; }

# mysql client against the configured primary DB (no password on the command line)
dbq() {
  local h; h=$(wpconf DB_HOST)
  MYSQL_PWD=$(wpconf DB_PASSWORD) mysql -h"${h%:*}" -P"${h##*:}" -u"$(wpconf DB_USER)" -N "$@"
}

# Schema fingerprint of a database (tables, columns, indexes) — used to verify migrations.
schema_dump() {
  local d=$1
  dbq -e "SELECT CONCAT('T ',table_name,' ',engine,' ',table_collation) FROM information_schema.tables WHERE table_schema='$d'
   UNION ALL SELECT CONCAT('C ',table_name,'.',column_name,' ',column_type,' ',is_nullable,' ',IFNULL(column_default,'NULL'),' ',extra) FROM information_schema.columns WHERE table_schema='$d'
   UNION ALL SELECT CONCAT('I ',table_name,'.',index_name,' ',non_unique,' ',GROUP_CONCAT(column_name ORDER BY seq_in_index)) FROM information_schema.statistics WHERE table_schema='$d' GROUP BY table_name,index_name,non_unique" | sort
}
