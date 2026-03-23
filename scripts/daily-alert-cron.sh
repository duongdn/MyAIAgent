#!/bin/bash
# Persistent cron launcher for daily-alert
# Add to system crontab: */10 * * * 1-5 /home/nus/projects/My-AI-Agent/scripts/daily-alert-cron.sh
#
# Only runs during work hours (8AM-8PM, Mon-Fri)
# Reads ALERT_INTERVAL from .env (used by Claude session cron, not this script)

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
LOG_DIR="$PROJECT_DIR/tmp/alert-logs"
LOCK_FILE="/tmp/daily-alert.lock"

mkdir -p "$LOG_DIR"

# Work hours check (8-20, Mon-Fri)
HOUR=$(date +%H)
DOW=$(date +%u)  # 1=Mon, 7=Sun
if [ "$DOW" -gt 5 ] || [ "$HOUR" -lt 8 ] || [ "$HOUR" -ge 20 ]; then
  exit 0
fi

# Prevent concurrent runs
if [ -f "$LOCK_FILE" ]; then
  LOCK_AGE=$(( $(date +%s) - $(stat -c %Y "$LOCK_FILE" 2>/dev/null || stat -f %m "$LOCK_FILE" 2>/dev/null) ))
  if [ "$LOCK_AGE" -lt 600 ]; then
    echo "$(date): Another alert scan is running (lock age: ${LOCK_AGE}s)" >> "$LOG_DIR/skipped.log"
    exit 0
  fi
  rm -f "$LOCK_FILE"
fi

touch "$LOCK_FILE"
trap "rm -f $LOCK_FILE" EXIT

TIMESTAMP=$(date +%Y%m%d-%H%M)
LOG_FILE="$LOG_DIR/alert-$TIMESTAMP.log"

# Run Claude with daily-alert command
cd "$PROJECT_DIR"
claude -p "/daily-alert" --no-input > "$LOG_FILE" 2>&1
EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ]; then
  # Notify on cron failure
  node "$SCRIPT_DIR/desktop-notify.js" \
    --title "Alert Cron Failed" \
    --body "Exit code $EXIT_CODE — check $LOG_FILE" \
    --urgency critical
fi

# Cleanup old logs (keep 7 days)
find "$LOG_DIR" -name "alert-*.log" -mtime +7 -delete 2>/dev/null

exit $EXIT_CODE
