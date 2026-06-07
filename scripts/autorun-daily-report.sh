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

# Pull latest code so skill/script updates are applied before Claude runs
git_before=$(git rev-parse HEAD)
git pull --rebase origin master >> "$LOG" 2>&1
log "Git pull done (exit $?)"

# Re-exec this script if it was updated (so new Xvfb/env changes take effect)
if [ "$(git rev-parse HEAD)" != "$git_before" ]; then
  if git diff "$git_before" HEAD --name-only 2>/dev/null | grep -q "scripts/autorun-daily-report.sh"; then
    log "autorun script updated — re-execing"
    exec "$0" "$@"
  fi
fi

# Start Xvfb at :1 if not already running (needed for Puppeteer browser scripts)
# Use socket check (xdpyinfo not always in PATH); sudo needed since /tmp/.X1-lock is root-owned
if [ ! -S /tmp/.X11-unix/X1 ]; then
  sudo Xvfb :1 -screen 0 1280x800x24 -ac &
  XVFB_PID=$!
  sleep 2
  log "Started Xvfb :1 (PID $XVFB_PID)"
else
  XVFB_PID=""
  log "Xvfb :1 already running"
fi
export DISPLAY=:1

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

# Kill Xvfb if we started it
if [ -n "$XVFB_PID" ]; then
  kill "$XVFB_PID" 2>/dev/null
  log "Stopped Xvfb (PID $XVFB_PID)"
fi
