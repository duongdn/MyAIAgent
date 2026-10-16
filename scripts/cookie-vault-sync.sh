#!/bin/bash
# Export fresh session cookies from this machine's real Chrome profiles and push them to the
# headless cron server (mpfc), which can't open a browser to log in / refresh sessions.
#
#   cookie-vault-sync.sh             always export + push (daily, before the 05:00 mpfc cron)
#   cookie-vault-sync.sh --if-stale  only if mpfc flagged tmp/cookie-vault/STALE (polled every 30 min)
#
# Server side: scripts/lib/cookie-vault.js (paths + markVaultStale), workstream-login.js and
# get-carrick-upwork-cookies.py read the vault when no local Chrome profile exists.
set -u
# cron has a bare PATH: miniconda python3 has a working browser_cookie3 (system/venv do not)
export PATH="$HOME/miniconda3/bin:/usr/local/bin:/usr/bin:/bin"
cd "$(dirname "$0")/.." || exit 1

REMOTE=mpfc.mpfc.live
REMOTE_VAULT=/var/www/MyDailyAgent/tmp/cookie-vault
LOG=tmp/cookie-vault-sync.log
mkdir -p tmp
log() { echo "$(TZ=Asia/Ho_Chi_Minh date '+%F %T') $*" | tee -a "$LOG"; }

if [ "${1:-}" = "--if-stale" ]; then
  STALE=$(ssh -o ConnectTimeout=20 -o BatchMode=yes "$REMOTE" "cat $REMOTE_VAULT/STALE 2>/dev/null")
  [ -z "$STALE" ] && exit 0
  log "mpfc STALE flag: $(echo "$STALE" | tail -3 | tr '\n' ' ')"
fi

# Upwork's short-lived access token (user_oauth2_slave_access_token) only refreshes when carrick's
# real Chrome loads an upwork.com page. If it's missing/expired, open one page in Profile 1 to
# refresh it (opens a tab in the running Chrome), then export.
upwork_token_valid() {
  local db; db=$(mktemp)
  cp "$HOME/.config/google-chrome/Profile 1/Cookies" "$db" 2>/dev/null || { rm -f "$db"; return 1; }
  local n; n=$(sqlite3 "$db" "select count(*) from cookies where host_key like '%upwork%' and name='user_oauth2_slave_access_token' and expires_utc/1000000-11644473600 > strftime('%s','now')+3600" 2>/dev/null)
  rm -f "$db"
  [ "${n:-0}" -gt 0 ]
}
if ! upwork_token_valid; then
  log "Upwork access token expired — opening upwork.com in carrick Chrome (Profile 1) to refresh"
  DISPLAY=${DISPLAY:-:1} nohup google-chrome-stable --profile-directory="Profile 1" "https://www.upwork.com/ab/messages/" >/dev/null 2>&1 &
  for _ in $(seq 1 12); do sleep 5; upwork_token_valid && break; done
  upwork_token_valid && log "Upwork access token refreshed" || log "WARN Upwork access token still missing (carrick may need a real login in Profile 1)"
fi

if ! python3 scripts/cookie-vault-export.py >>"$LOG" 2>&1; then
  log "WARN export had failures (see above) — pushing whatever was exported"
fi

ssh -o ConnectTimeout=20 -o BatchMode=yes "$REMOTE" "mkdir -p $REMOTE_VAULT && chmod 700 $REMOTE_VAULT" \
  && scp -q -o BatchMode=yes tmp/cookie-vault/*.json "$REMOTE:$REMOTE_VAULT/" \
  && ssh -o BatchMode=yes "$REMOTE" "chmod 600 $REMOTE_VAULT/*.json; rm -f $REMOTE_VAULT/STALE" \
  && log "pushed $(ls tmp/cookie-vault/*.json | wc -l) vault files to $REMOTE" \
  || { log "ERROR push to $REMOTE failed"; exit 1; }
