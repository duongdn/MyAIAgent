#!/bin/bash
# Daily FB post draft (Only-me audience) via claude -p
# Cron: 45 8 * * * (local UTC+7; PC is off overnight, boots ~08:15)

PROJECT_DIR="/home/nus/projects/My-AI-Agent"
# cron has a minimal PATH without ~/.local/bin (where claude lives) — set it before resolving claude
export PATH="$HOME/.local/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
CLAUDE_BIN="$(command -v claude)"
LOG_DIR="$PROJECT_DIR/tmp/alert-logs"
LOG="$LOG_DIR/fb-post-cron.log"
mkdir -p "$LOG_DIR"

log() { echo "[$(date '+%F %H:%M:%S')] $*" | tee -a "$LOG"; }

cd "$PROJECT_DIR" || exit 1
TODAY=$(TZ='Asia/Ho_Chi_Minh' date +%Y-%m-%d)

# Skip if today's draft already exists
if grep -q "\"date\": *\"$TODAY\"" docs/fb-post/post-history.json 2>/dev/null; then
  log "FB draft already exists for $TODAY, skipping."
  exit 0
fi

# Skip if another fb-post run is in progress
if pgrep -f "claude.*me:fb-post" >/dev/null; then
  log "fb-post already running, skipping."
  exit 0
fi

git pull --rebase origin master >> "$LOG" 2>&1
[ -x "$CLAUDE_BIN" ] || { log "claude CLI not found in PATH=$PATH"; exit 1; }
log "Starting fb-post draft"

"$CLAUDE_BIN" -p "/me:fb-post --report-date=$TODAY --report-time=$(TZ='Asia/Ho_Chi_Minh' date +%H%M)" \
  --dangerously-skip-permissions >> "$LOG" 2>&1
log "Done (exit $?)"
