#!/bin/bash
# Friday 17:40 (+07) cron: submit Workstream "Weekly Report Finalization" for every project not yet finalized.
# Crontab: 40 17 * * 5 /home/nus/projects/My-AI-Agent/scripts/workstream-weekly-finalization-cron.sh
# Runs before Workstream's own 18:00 auto-finalize. Projects with Pending-review hours stay blocked → desktop alert.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
LOG_DIR="$PROJECT_DIR/tmp/workstream-weekly-finalization-logs"
mkdir -p "$LOG_DIR"
cd "$PROJECT_DIR"
export PATH="$HOME/.nvm/versions/node/$(ls $HOME/.nvm/versions/node/ | tail -1)/bin:$PATH"
export DBUS_SESSION_BUS_ADDRESS="unix:path=/run/user/$(id -u)/bus"
export XDG_RUNTIME_DIR="/run/user/$(id -u)"
LOG_FILE="$LOG_DIR/run-$(date +%Y%m%d-%H%M).log"

node scripts/workstream-weekly-finalization-submit.js --submit >> "$LOG_FILE" 2>&1
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
  node "$SCRIPT_DIR/desktop-notify.js" --title "Workstream weekly finalization: not all submitted" \
    --body "$(grep -E '🔴|❌' "$LOG_FILE" | head -5) — log: $LOG_FILE" --urgency critical
fi
find "$LOG_DIR" -name "run-*.log" -mtime +30 -delete 2>/dev/null
exit $EXIT_CODE
