#!/bin/bash
# 02 — Build the upgraded site code on the NEW server: copy current code from live, then upgrade
# WP core + plugins to the exact versions tested (target-plugin-versions.csv), port custom code, apply PHP 8.3 fixes.
# Run as root on the NEW server. Re-runnable (each run starts again from a fresh rsync of live).
# Usage: bash 02-build-code.sh [--test]
#   --test : keep this server's own wp-config.php and test-only mu-plugin; skip .git
# Does NOT touch the database (see 03-migrate-db.sh).
source "$(dirname "$0")/lib.sh"
TEST=0; [ "${1:-}" = "--test" ] && TEST=1
PATCHES="$HERE/patches"

log "02: rsync code from live ($LIVE_SSH)"
# junk excluded only at the site root / wp-content root (plugins ship their own .sql/.zip/.log files — keep those)
EXC=(--exclude=/wp-content/uploads --exclude=/wp-content/cache --exclude='/*.sql' --exclude='/*.sql.gz' --exclude='/*.log'
     --exclude='/*.zip' --exclude=/uploads.bak --exclude=/wp-content/upgrade --exclude=/wp-content/ai1wm-backups
     --exclude='/wp-content/debug.log*' --exclude='/wp-content/plugins/*.zip')
[ $TEST = 1 ] && EXC+=(--exclude=.git --exclude=wp-config.php --exclude=wp-config.php.orig-live
                      --exclude=wp-content/mu-plugins/zz-upgrade-test-safety.php --exclude=.htaccess)
mkdir -p "$SITE"
rc=0; rsync -a --delete --rsync-path="sudo rsync" "${EXC[@]}" -e "ssh -i $LIVE_KEY" "$LIVE_SSH:$SITE/" "$SITE/" || rc=$?
[ $rc = 0 ] || [ $rc = 24 ] || die "rsync failed ($rc)"   # 24 = files vanished during copy (fine on a live site)
if [ $TEST = 0 ] && [ ! -e "$SITE/wp-content/uploads" ]; then
  ln -s /mnt/volume_lon1_02/uploads "$SITE/wp-content/uploads"   # same symlink as live (volume moved at cutover)
fi
fixperm

log "02: /var/www/keys (Apple App Store .p8 key for StoreKit2 IAP verification, APPLE_PRIVATE_KEY_PATH)"
mkdir -p /var/www/keys
rsync -a --rsync-path="sudo rsync" -e "ssh -i $LIVE_KEY" "$LIVE_SSH:/var/www/keys/" /var/www/keys/ || die "keys rsync failed"
chown -R root:www-data /var/www/keys && chmod 750 /var/www/keys && chmod 640 /var/www/keys/*

# Idempotent patch apply: skip when already applied (reverse applies cleanly).
apply_patch() {
  if patch -d "$SITE" -p1 -R --dry-run -s -f < "$PATCHES/$1" >/dev/null 2>&1; then log "   $1 already applied"
  else patch -d "$SITE" -p1 --no-backup-if-mismatch -s < "$PATCHES/$1" || die "$1 failed"; log "   $1 applied"; fi
}
log "02: PHP 8.3 fixes for site code (before any wp-cli call: unpatched mu-plugin fatals on PHP 8)"
apply_patch site-php83-fixes.patch
apply_patch site-ui-fixes.patch   # UI fixes requested during testing (e.g. team-stats toggle spinner)

log "02: WP core -> $TARGET_WP (files only, no DB)"
wpr core download --version="$TARGET_WP" --locale=en_GB --force --skip-content --path="$SITE" >/dev/null
wpr --skip-plugins core verify-checksums 2>&1 | grep -v "should not exist" | tail -1

log "02: plugins -> versions in target-plugin-versions.csv (wp.org packages)"
declare -A CUR
while IFS=, read -r n v; do CUR[$n]=$v; done < <(wpr --skip-plugins plugin list --fields=name,version --format=csv 2>/dev/null | tail -n +2)
FAILED=()
while IFS=, read -r name status ver; do
  [ "$name" = name ] || [ -z "$ver" ] && continue
  case "$name" in membermouse|elementor-pro) continue ;; esac          # premium: handled below
  [ "${CUR[$name]:-}" = "$ver" ] && continue                            # already at target (incl. custom forks)
  url="https://downloads.wordpress.org/plugin/$name.$ver.zip"
  # some plugins have no per-version zip: fall back to the latest zip when wp.org's latest == target
  curl -sfI "$url" >/dev/null || { [ "$(curl -s "https://api.wordpress.org/plugins/info/1.0/$name.json" | jq -r '.version // empty')" = "$ver" ] && url="https://downloads.wordpress.org/plugin/$name.zip"; }
  if curl -sfI "$url" >/dev/null; then
    wpr --skip-plugins plugin install "$url" --force >/dev/null 2>&1 && log "   $name ${CUR[$name]:-none} -> $ver" || FAILED+=("$name")
  else
    FAILED+=("$name(not on wp.org)")
  fi
done < "$HERE/target-plugin-versions.csv"
[ ${#FAILED[@]} -eq 0 ] || log "   WARN not updated: ${FAILED[*]}"

log "02: MemberMouse 3.1.1 + MPFC custom patch"
MMZ="$ART/mm-3.1.1.zip"
[ -s "$MMZ" ] || curl -sfL -o "$MMZ" "https://hub.membermouse.com/major-versions/3.1.1.zip" || die "MM download failed"
rm -rf "$ART/mm" && mkdir -p "$ART/mm" && unzip -q "$MMZ" -d "$ART/mm"
patch -d "$ART/mm/membermouse" -p1 --no-backup-if-mismatch -s < "$PATCHES/membermouse-3.1.1-mpfc-custom.patch" || die "MM patch failed"
sed -i "s#^\$wpload_path = '.*';#\$wpload_path = '$SITE/wp-load.php';#" "$ART/mm/membermouse/bootstrap/barebones.php"
rm -rf "$SITE/wp-content/plugins/membermouse" && cp -a "$ART/mm/membermouse" "$SITE/wp-content/plugins/"

log "02: Elementor Pro 4.3.2 (licensed zip kept on live: ~/elementor-pro-4.3.2.zip)"
EPZ="$ART/elementor-pro-4.3.2.zip"
[ -s "$EPZ" ] || scp -q -i "$LIVE_KEY" "$LIVE_SSH:elementor-pro-4.3.2.zip" "$EPZ" || die "elementor-pro zip missing"
wpr --skip-plugins plugin install "$EPZ" --force >/dev/null

log "02: PHP 8.3 fix for wd-instagram-feed (new version)"
apply_patch wd-instagram-feed-1.4.35-fixes.patch

log "02: lint touched PHP files"
for f in $(grep -h '^+++ b/' "$PATCHES"/site-php83-fixes.patch "$PATCHES"/site-ui-fixes.patch "$PATCHES"/wd-instagram-feed-1.4.35-fixes.patch | sed 's#^+++ b/##;s#\t.*##' | grep '\.php$'); do
  php -l "$SITE/$f" >/dev/null || die "syntax error in $f"
done
for f in $(grep -h '^+++ b/' "$PATCHES/membermouse-3.1.1-mpfc-custom.patch" | sed 's#^+++ b/##;s#\t.*##' | grep '\.php$'); do
  php -l "$SITE/wp-content/plugins/membermouse/$f" >/dev/null || die "syntax error in membermouse/$f"
done

fixperm
log "02: result — WP $(wpr --skip-plugins core version), plugins differing from target:"
wpr --skip-plugins plugin list --fields=name,version --format=csv 2>/dev/null | tail -n +2 | sort > "$ART/plugins-now.csv"
awk -F, '{print $1","$3}' "$HERE/target-plugin-versions.csv" | tail -n +2 | grep -v ',$' | sort | comm -13 "$ART/plugins-now.csv" - | tee -a "$ART/upgrade.log" || true
[ $TEST = 1 ] || { log "02: live root crontab with php7.4 -> php8.3 (install manually after review):"; live "sudo crontab -l" | sed 's#/usr/bin/php7.4#/usr/bin/php8.3#g'; }
log "02: done"
