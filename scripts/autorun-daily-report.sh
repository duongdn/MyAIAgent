#!/bin/bash
# Auto-run daily report when PC starts (triggered by systemd user service)
# Waits for network, then runs claude headlessly with /daily-report skill

set -euo pipefail

PROJECT_DIR="/home/nus/projects/My-AI-Agent"
CLAUDE_BIN="/home/nus/.local/bin/claude"
LOG_DIR="$PROJECT_DIR/reports/$(date +%Y-%m-%d)"

# Wait for network (max 60s)
for i in $(seq 1 12); do
  if ping -c1 -W2 imap.zoho.com &>/dev/null; then
    break
  fi
  sleep 5
done

mkdir -p "$LOG_DIR"

cd "$PROJECT_DIR"

# Run daily report headlessly, log output
"$CLAUDE_BIN" -p "/daily-report" \
  --dangerously-skip-permissions \
  2>&1 | tee "$LOG_DIR/autorun.log"
