#!/bin/bash
# Auto-run daily report (triggered by systemd timer at 8AM, or on boot if missed)
# Waits for network, then runs claude headlessly with /daily-report skill

set -euo pipefail

PROJECT_DIR="/home/nus/projects/My-AI-Agent"
CLAUDE_BIN="/home/nus/.local/bin/claude"
TODAY=$(date +%Y-%m-%d)
REPORT_FILE="$PROJECT_DIR/reports/$TODAY/daily-report.md"

# Skip if today's report already exists
if [ -f "$REPORT_FILE" ]; then
  echo "[$TODAY] Daily report already exists, skipping."
  exit 0
fi

# Wait for network (max 60s)
for i in $(seq 1 12); do
  if ping -c1 -W2 imap.zoho.com &>/dev/null; then
    break
  fi
  sleep 5
done

LOG_DIR="$PROJECT_DIR/reports/$TODAY"
mkdir -p "$LOG_DIR"

cd "$PROJECT_DIR"

# Run daily report headlessly, log output
# Use script(1) to force PTY — ensures line-buffered streaming to log
script -qefc "$CLAUDE_BIN -p /daily-report --dangerously-skip-permissions --output-format text" "$LOG_DIR/autorun.log"
