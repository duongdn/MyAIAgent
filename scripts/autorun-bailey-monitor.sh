#!/bin/bash
# Auto-run Bailey monitor headlessly via claude -p — WEEKLY on Friday UTC+7
# Cron: 5 19 * * 4 (Thursday 19:05 UTC = Friday 02:05 UTC+7)

PROJECT_DIR="/var/www/MyDailyAgent"
CLAUDE_BIN="/usr/bin/claude"
TODAY=$(TZ='Asia/Ho_Chi_Minh' date +%Y-%m-%d)
LOG_DIR="$PROJECT_DIR/tmp/alert-logs"

mkdir -p "$LOG_DIR" "$PROJECT_DIR/reports/$TODAY"

LOG="$LOG_DIR/bailey-monitor-cron.log"

log() { echo "[$(date '+%H:%M:%S')] $*" | tee -a "$LOG"; }

# Skip if monitor report already exists for today
if ls "$PROJECT_DIR/reports/$TODAY/"*bailey-monitor.md &>/dev/null 2>&1; then
  log "Bailey monitor already exists for $TODAY, skipping."
  exit 0
fi

# Wait for network via TCP
for i in $(seq 1 12); do
  if nc -z -w3 imap.zoho.com 993 &>/dev/null; then break; fi
  sleep 5
done

cd "$PROJECT_DIR"

# Pull latest code so skill updates are applied before Claude runs
git_before=$(git rev-parse HEAD)
git pull --rebase origin master >> "$LOG" 2>&1
log "Git pull done (exit $?)"

# Re-exec if this script was updated
if [ "$(git rev-parse HEAD)" != "$git_before" ]; then
  if git diff "$git_before" HEAD --name-only 2>/dev/null | grep -q "scripts/autorun-bailey-monitor.sh"; then
    log "autorun-bailey-monitor script updated — re-execing"
    exec "$0" "$@"
  fi
fi

# Start Xvfb at :1 if not already running (needed for Siteground Puppeteer scraper)
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

# Pre-compute UTC+7 datetime so Claude uses correct date/time for report path
export REPORT_DATE=$(TZ='Asia/Ho_Chi_Minh' date '+%Y-%m-%d')
export REPORT_TIME=$(TZ='Asia/Ho_Chi_Minh' date '+%H%M')
log "Report datetime (UTC+7): ${REPORT_DATE} ${REPORT_TIME}"

log "Starting Bailey monitor"

out_file="$LOG_DIR/.bailey-monitor-run.tmp"

"$CLAUDE_BIN" -p "/me:bailey-monitor" \
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
