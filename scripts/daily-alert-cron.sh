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
  if [ "$LOCK_AGE" -lt 1800 ]; then
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
export PATH="$HOME/.local/bin:$HOME/.nvm/versions/node/$(ls $HOME/.nvm/versions/node/ | tail -1)/bin:$PATH"
export DISPLAY=:1
export DBUS_SESSION_BUS_ADDRESS="unix:path=/run/user/$(id -u)/bus"
export XDG_RUNTIME_DIR="/run/user/$(id -u)"
claude -p "/daily-alert" > "$LOG_FILE" 2>&1
EXIT_CODE=$?

# Check if rate-limited — skip notification, create backoff marker
if grep -q "hit your limit" "$LOG_FILE" 2>/dev/null; then
  BACKOFF_FILE="$LOG_DIR/.rate-limited"
  if [ ! -f "$BACKOFF_FILE" ]; then
    # First rate-limit hit — notify once
    node "$SCRIPT_DIR/desktop-notify.js" \
      --title "Alert Cron: Rate Limited" \
      --body "Claude API quota exhausted. Will auto-resume when limit resets." \
      --urgency low
    touch "$BACKOFF_FILE"
  fi
  exit 0
fi

# Clear backoff marker on successful run
rm -f "$LOG_DIR/.rate-limited"

if [ $EXIT_CODE -ne 0 ]; then
  # Notify on cron failure (non-rate-limit)
  node "$SCRIPT_DIR/desktop-notify.js" \
    --title "Alert Cron Failed" \
    --body "Exit code $EXIT_CODE — check $LOG_FILE" \
    --urgency critical
fi

# Cleanup old logs (keep 7 days)
find "$LOG_DIR" -name "alert-*.log" -mtime +7 -delete 2>/dev/null

exit $EXIT_CODE
