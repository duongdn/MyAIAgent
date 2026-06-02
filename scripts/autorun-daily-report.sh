#!/bin/bash
# Auto-run daily report headlessly via claude -p
# Cron: 0 22 * * * (22:00 UTC = 05:00 UTC+7)
#
# Runs each piece sequentially to minimize token usage:
# - No parallel subagents (each spawn = fresh context overhead)
# - Each piece is a small focused task (~5-10k tokens vs 50k+ for full run)

PROJECT_DIR="/var/www/MyDailyAgent"
CLAUDE_BIN="/usr/bin/claude"
TODAY=$(TZ='Asia/Ho_Chi_Minh' date +%Y-%m-%d)
REPORT_FILE="$PROJECT_DIR/reports/$TODAY/daily-report.md"
LOG_DIR="$PROJECT_DIR/tmp/alert-logs"

mkdir -p "$LOG_DIR" "$PROJECT_DIR/reports/$TODAY"

LOG="$LOG_DIR/daily-report-cron.log"

log() { echo "[$(date '+%H:%M:%S')] $*" | tee -a "$LOG"; }

# Skip if today's report already exists and has content
if [ -f "$REPORT_FILE" ] && [ -s "$REPORT_FILE" ]; then
  log "Report already exists, skipping."
  exit 0
fi

# Wait for network via TCP (ICMP/ping is blocked on this server)
for i in $(seq 1 12); do
  if nc -z -w3 imap.zoho.com 993 &>/dev/null; then break; fi
  sleep 5
done

cd "$PROJECT_DIR"

run_piece() {
  local piece="$1"
  log "Running: $piece"
  "$CLAUDE_BIN" -p "/me:daily-report $piece" \
    --dangerously-skip-permissions \
    >> "$LOG" 2>&1
  local exit_code=$?
  if grep -q "hit your limit" "$LOG" 2>/dev/null; then
    log "Rate limit hit, stopping."
    exit 1
  fi
  log "Done: $piece (exit $exit_code)"
  sleep 10  # brief pause between pieces
}

# Run pieces sequentially — each is a small focused task
run_piece "email"
run_piece "slack"
run_piece "discord"
run_piece "sheets"
run_piece "scrin"
run_piece "fountain"
run_piece "elena"
run_piece "trello"
run_piece "reminders"

log "All pieces complete."
