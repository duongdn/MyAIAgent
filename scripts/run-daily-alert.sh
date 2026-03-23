#!/bin/bash
# Cron wrapper for /daily-alert
# Runs Claude Code daily-alert skill non-interactively

CLAUDE="/Users/duongdn/.nvm/versions/node/v22.15.0/bin/claude"
PROJECT="/Users/duongdn/projects/MyAIAgent"
LOG="/tmp/daily-alert-cron.log"

export PATH="/Users/duongdn/.nvm/versions/node/v22.15.0/bin:/usr/local/bin:/usr/bin:/bin"
export HOME="/Users/duongdn"

cd "$PROJECT" || exit 1

echo "--- $(date '+%Y-%m-%d %H:%M:%S') ---" >> "$LOG"
"$CLAUDE" --dangerously-skip-permissions -p "/daily-alert" >> "$LOG" 2>&1
echo "Exit: $?" >> "$LOG"
