#!/bin/bash
# Friday 18:00 (+07) cron: (1) auto-submit Workstream Weekly Report Finalization for projects whose task log
# is complete (every active dev logged each working day except leave + no Pending review), then
# (2) run the weekly report, which includes the finalization result (submitted / blocked + reason).
# Crontab: 0 18 * * 5 /home/nus/projects/My-AI-Agent/scripts/weekly-report-cron.sh

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
LOG_DIR="$PROJECT_DIR/tmp/weekly-report-cron-logs"
mkdir -p "$LOG_DIR"
cd "$PROJECT_DIR"
export PATH="$HOME/.local/bin:$HOME/.nvm/versions/node/$(ls $HOME/.nvm/versions/node/ | tail -1)/bin:$PATH"
export DBUS_SESSION_BUS_ADDRESS="unix:path=/run/user/$(id -u)/bus"
export XDG_RUNTIME_DIR="/run/user/$(id -u)"
STAMP=$(date +%Y%m%d-%H%M)
FIN_LOG="$LOG_DIR/finalization-$STAMP.log"
LOG_FILE="$LOG_DIR/run-$STAMP.log"

node scripts/workstream-weekly-finalization-submit.js --submit > "$FIN_LOG" 2>&1
echo "finalization exit $? — $FIN_LOG" >> "$LOG_FILE"

claude -p "/me:weekly-report (cron run; Workstream finalization already submitted, result in $FIN_LOG — use it for #3, do not re-submit)" >> "$LOG_FILE" 2>&1
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
  node "$SCRIPT_DIR/desktop-notify.js" --title "Weekly report cron failed" \
    --body "Exit $EXIT_CODE — check $LOG_FILE" --urgency critical
fi
find "$LOG_DIR" -name "*.log" -mtime +60 -delete 2>/dev/null
exit $EXIT_CODE
