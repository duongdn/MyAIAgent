#!/bin/bash
# Layer A cron: read-only alert scan every 2h, Mon–Fri 08–20 (crontab: 0 8-20/2 * * 1-5 <this>)
PROJECT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
LOCK=/tmp/assistant-alert-cycle.lock
[ -f "$LOCK" ] && [ $(( $(date +%s) - $(stat -c %Y "$LOCK") )) -lt 3600 ] && exit 0
touch "$LOCK"; trap 'rm -f "$LOCK"' EXIT
export PATH="$HOME/.local/bin:$HOME/.nvm/versions/node/$(ls $HOME/.nvm/versions/node/ | tail -1)/bin:$PATH"
cd "$PROJECT_DIR" && node scripts/assistant/alert-cycle.js >> tmp/assistant-alert-cycle.log 2>&1
