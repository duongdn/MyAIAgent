#!/bin/bash
# Session health check — runs before daily cron to catch expired sessions early
# Cron: 30 17 * * * (17:30 UTC = 00:30 UTC+7) — 4.5h before daily report

PROJECT_DIR="/var/www/MyDailyAgent"
LOG_DIR="$PROJECT_DIR/tmp/alert-logs"
mkdir -p "$LOG_DIR"
LOG="$LOG_DIR/session-health.log"

log() { echo "[$(date '+%H:%M:%S')] $*" | tee -a "$LOG"; }

log "=== Session health check ==="

cd "$PROJECT_DIR"

# Pull latest code
git pull --rebase origin master >> "$LOG" 2>&1

# Try Matrix token refresh via API (no browser)
node "$PROJECT_DIR/scripts/matrix-token-refresh.js" >> "$LOG" 2>&1
MATRIX_EXIT=$?
if [ $MATRIX_EXIT -ne 0 ]; then
  log "Matrix token refresh FAILED — need manual device-auth"
fi

# Run full session health check (also checks Workstream + Upwork, sends Slack alert)
node "$PROJECT_DIR/scripts/session-health-check.js" >> "$LOG" 2>&1
HEALTH_EXIT=$?

if [ $HEALTH_EXIT -eq 0 ]; then
  log "All sessions OK"
else
  log "Session(s) need re-auth — Slack alert sent"
fi

log "=== Done ==="
