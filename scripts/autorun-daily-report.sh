#!/bin/bash
# Auto-run daily report headlessly via claude -p
# Cron: 0 22 * * * (22:00 UTC = 05:00 UTC+7)
#
# Runs each piece sequentially to minimize token usage:
# - No parallel subagents (each spawn = fresh context overhead)
# - Each piece is a small focused task (~5-10k tokens vs 50k+ for full run)
# - Resumes from last completed piece if interrupted (e.g. rate limit)

PROJECT_DIR="/var/www/MyDailyAgent"
CLAUDE_BIN="/usr/bin/claude"
TODAY=$(TZ='Asia/Ho_Chi_Minh' date +%Y-%m-%d)
REPORT_DIR="$PROJECT_DIR/reports/$TODAY"
DONE_FILE="$REPORT_DIR/.pieces-done"
LOG_DIR="$PROJECT_DIR/tmp/alert-logs"

mkdir -p "$LOG_DIR" "$REPORT_DIR"

LOG="$LOG_DIR/daily-report-cron.log"

log() { echo "[$(date '+%H:%M:%S')] $*" | tee -a "$LOG"; }

ALL_PIECES="email slack discord sheets scrin fountain elena trello reminders"

# Check if all pieces are done
all_done() {
  for p in $ALL_PIECES; do
    grep -qxF "$p" "$DONE_FILE" 2>/dev/null || return 1
  done
  return 0
}

is_done() { grep -qxF "$1" "$DONE_FILE" 2>/dev/null; }
mark_done() { echo "$1" >> "$DONE_FILE"; }

# Skip only when all pieces are complete
if all_done; then
  log "All pieces already done, skipping."
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
  if is_done "$piece"; then
    log "Skip (done): $piece"
    return 0
  fi
  log "Running: $piece"
  # Capture output in tmp file so rate-limit check is scoped to this piece only
  local tmp_out="$LOG_DIR/.piece-$piece.tmp"
  "$CLAUDE_BIN" -p "/me:daily-report $piece" \
    --dangerously-skip-permissions \
    > "$tmp_out" 2>&1
  local exit_code=$?
  cat "$tmp_out" >> "$LOG"
  if grep -q "hit your limit" "$tmp_out"; then
    rm -f "$tmp_out"
    log "Rate limit hit, stopping."
    exit 1
  fi
  rm -f "$tmp_out"
  mark_done "$piece"
  log "Done: $piece (exit $exit_code)"
  sleep 10  # brief pause between pieces
}

# Run pieces sequentially — resumes automatically if interrupted
for piece in $ALL_PIECES; do
  run_piece "$piece"
done

log "All pieces complete."
