#!/bin/bash
# Daily FB post candidates (numbered list for the user to pick; posts nothing) via claude -p
# Cron: 45 8 * * * (local UTC+7; PC is off overnight, boots ~08:15)

PROJECT_DIR="/home/nus/projects/My-AI-Agent"
# cron has a minimal PATH without ~/.local/bin (claude) and nvm (node) — set it before resolving claude
export PATH="$HOME/.local/bin:$HOME/.nvm/versions/node/$(ls -v $HOME/.nvm/versions/node/ | tail -1)/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
CLAUDE_BIN="$(command -v claude)"
# Chrome cookie decryption (Profile 9 → FB/Strava) needs the user keyring over D-Bus, absent in cron
export DBUS_SESSION_BUS_ADDRESS="${DBUS_SESSION_BUS_ADDRESS:-unix:path=/run/user/$(id -u)/bus}"
LOG_DIR="$PROJECT_DIR/tmp/alert-logs"
LOG="$LOG_DIR/fb-post-cron.log"
mkdir -p "$LOG_DIR"

log() { echo "[$(date '+%F %H:%M:%S')] $*" | tee -a "$LOG"; }

cd "$PROJECT_DIR" || exit 1
TODAY=$(TZ='Asia/Ho_Chi_Minh' date +%Y-%m-%d)

# Skip if today's candidates already exist
if [ -f "docs/fb-post/candidates/$TODAY.json" ]; then
  log "FB candidates already exist for $TODAY, skipping."
  exit 0
fi

# Skip if another fb-post run is in progress
if pgrep -f "claude.*me:fb-post" >/dev/null; then
  log "fb-post already running, skipping."
  exit 0
fi

git pull --rebase origin master >> "$LOG" 2>&1
[ -x "$CLAUDE_BIN" ] || { log "claude CLI not found in PATH=$PATH"; exit 1; }
log "Starting fb-post candidates"

"$CLAUDE_BIN" -p "/me:fb-post --report-date=$TODAY --report-time=$(TZ='Asia/Ho_Chi_Minh' date +%H%M)" \
  --dangerously-skip-permissions >> "$LOG" 2>&1
log "Done (exit $?)"
