#!/bin/bash
# Friday 17:30 (+07) cron: submit "Check memo logs in Upwork Tracker" Workstream requests.
# Crontab: 30 17 * * 5 /home/nus/projects/My-AI-Agent/scripts/workstream-review-submit-cron.sh
# Skips (no Claude run) when every memo request of the current week is already submitted.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
LOG_DIR="$PROJECT_DIR/tmp/workstream-review-submit-logs"
mkdir -p "$LOG_DIR"
cd "$PROJECT_DIR"
export PATH="$HOME/.local/bin:$HOME/.nvm/versions/node/$(ls $HOME/.nvm/versions/node/ | tail -1)/bin:$PATH"
export DBUS_SESSION_BUS_ADDRESS="unix:path=/run/user/$(id -u)/bus"
export XDG_RUNTIME_DIR="/run/user/$(id -u)"
LOG_FILE="$LOG_DIR/run-$(date +%Y%m%d-%H%M).log"

# Pending = memo request still NotStarted / NeedsRevision. Exit 0 = nothing pending, 1 = pending or unknown.
node -e '
const c=require("./config/.workstream-config.json");
fetch(c.api_base+"/requests",{headers:{Authorization:"Bearer "+c.access_token}})
  .then(r=>{if(!r.ok)throw new Error("HTTP "+r.status);return r.json()})
  .then(j=>{const p=(j.items||[]).filter(i=>i.title.startsWith("Check memo logs in Upwork Tracker")&&["NotStarted","NeedsRevision"].includes(i.status));
    p.forEach(i=>console.log("pending:",i.projectName,i.title));process.exit(p.length?1:0)})
  .catch(e=>{console.log("precheck failed:",e.message);process.exit(1)})' >> "$LOG_FILE" 2>&1
if [ $? -eq 0 ]; then
  echo "$(date): all memo requests already submitted — skip" >> "$LOG_FILE"
  exit 0
fi

claude -p "/me:workstream-review-submit --submit" >> "$LOG_FILE" 2>&1
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
  node "$SCRIPT_DIR/desktop-notify.js" --title "Workstream memo submit cron failed" \
    --body "Exit $EXIT_CODE — check $LOG_FILE" --urgency critical
fi
find "$LOG_DIR" -name "run-*.log" -mtime +30 -delete 2>/dev/null
exit $EXIT_CODE
