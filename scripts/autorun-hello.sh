#!/bin/bash
# Lightweight hello to open a Claude session and anchor the 5-hour rolling window.
# Cron: 0 0,6,12,18 * * * (every 6h UTC = 07:00, 13:00, 19:00, 01:00 UTC+7)

PROJECT_DIR="/var/www/MyDailyAgent"
CLAUDE_BIN="/usr/bin/claude"
LOG="$PROJECT_DIR/tmp/alert-logs/hello-cron.log"

mkdir -p "$PROJECT_DIR/tmp/alert-logs"

log() { echo "[$(date -u '+%Y-%m-%d %H:%M:%S')] $*" >> "$LOG"; }

log "Hello ping"
"$CLAUDE_BIN" -p "Hello" --dangerously-skip-permissions >> "$LOG" 2>&1
log "Done (exit $?)"
