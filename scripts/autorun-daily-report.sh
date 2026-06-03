#!/bin/bash
# Auto-run daily report headlessly via claude -p
# Cron: 0 22 * * * (22:00 UTC = 05:00 UTC+7)
#
# Runs as a SINGLE claude -p session with --cron flag.
# Memory loads once; pieces execute inline (no subagents).
# This matches terminal behavior: 1 session, 1 memory load.

PROJECT_DIR="/var/www/MyDailyAgent"
CLAUDE_BIN="/usr/bin/claude"
TODAY=$(TZ='Asia/Ho_Chi_Minh' date +%Y-%m-%d)
REPORT_FILE="$PROJECT_DIR/reports/$TODAY/daily-report.md"
LOG_DIR="$PROJECT_DIR/tmp/alert-logs"

mkdir -p "$LOG_DIR" "$PROJECT_DIR/reports/$TODAY"

LOG="$LOG_DIR/daily-report-cron.log"

log() { echo "[$(date '+%H:%M:%S')] $*" | tee -a "$LOG"; }

# Skip only when report is complete (has substantial content)
if [ -f "$REPORT_FILE" ] && [ $(wc -l < "$REPORT_FILE") -gt 50 ]; then
  log "Report already complete ($TODAY), skipping."
  exit 0
fi

# Wait for network via TCP (ICMP/ping is blocked on this server)
for i in $(seq 1 12); do
  if nc -z -w3 imap.zoho.com 993 &>/dev/null; then break; fi
  sleep 5
done

cd "$PROJECT_DIR"

log "Starting daily report (single session, --cron mode)"

out_file="$LOG_DIR/.cron-run.tmp"

"$CLAUDE_BIN" -p "/me:daily-report --cron" \
  --dangerously-skip-permissions \
  > "$out_file" 2>&1

exit_code=$?
cat "$out_file" >> "$LOG"

if grep -q "hit your limit" "$out_file"; then
  rm -f "$out_file"
  log "Rate limit hit."
  exit 1
fi

rm -f "$out_file"
log "Done (exit $exit_code)"

# Commit and push the completed report
if [ -f "$REPORT_FILE" ] && [ "$(wc -l < "$REPORT_FILE")" -gt 10 ]; then
  git -C "$PROJECT_DIR" add "reports/$TODAY/" >> "$LOG" 2>&1
  git -C "$PROJECT_DIR" commit -m "auto: $TODAY daily report" >> "$LOG" 2>&1
  git -C "$PROJECT_DIR" push >> "$LOG" 2>&1
  log "Git push done (exit $?)"
else
  log "Report incomplete, skipping git push."
fi
