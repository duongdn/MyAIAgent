#!/bin/bash
# Auto-run daily report headlessly via claude -p
# Cron: 0 22 * * * (22:00 UTC = 05:00 UTC+7)

set -euo pipefail

PROJECT_DIR="/var/www/MyDailyAgent"
CLAUDE_BIN="/usr/bin/claude"
TODAY=$(date +%Y-%m-%d)
REPORT_FILE="$PROJECT_DIR/reports/$TODAY/daily-report.md"
LOG_DIR="$PROJECT_DIR/tmp/alert-logs"

mkdir -p "$LOG_DIR"

# Skip if today's report already exists
if [ -f "$REPORT_FILE" ]; then
  echo "[$TODAY] Daily report already exists, skipping." | tee -a "$LOG_DIR/daily-report-cron.log"
  exit 0
fi

# Wait for network via TCP (ICMP/ping is blocked on this server)
for i in $(seq 1 12); do
  if nc -z -w3 imap.zoho.com 993 &>/dev/null; then
    break
  fi
  sleep 5
done

mkdir -p "$PROJECT_DIR/reports/$TODAY"

cd "$PROJECT_DIR"

# Run daily report headlessly with Haiku (cheaper quota than Sonnet)
"$CLAUDE_BIN" -p "/me:daily-report" \
  --model claude-haiku-4-5-20251001 \
  --dangerously-skip-permissions \
  2>&1 | tee -a "$LOG_DIR/daily-report-cron.log"
