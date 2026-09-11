#!/bin/bash
# Auto-run finance-quantification cafef data-shape audit — DAILY 20:00 UTC+7
# Cron: 0 13 * * * (13:00 UTC = 20:00 UTC+7)
# If the audit finds nothing new (exit 0), this is a no-op. If it finds something
# (exit 2), it hands the findings to `claude -p /me:finance-quantification-audit-fix`
# to investigate, verify, and (only if confirmed) fix — see that command's file for
# the verify-before-fix safety rules.

PROJECT_DIR="/var/www/MyDailyAgent"
CLAUDE_BIN="/usr/bin/claude"
TODAY=$(TZ='Asia/Ho_Chi_Minh' date +%Y-%m-%d)
NOW=$(TZ='Asia/Ho_Chi_Minh' date +%H%M)
LOG_DIR="$PROJECT_DIR/tmp/alert-logs"
LOG="$LOG_DIR/finance-quantification-audit-cron.log"

mkdir -p "$LOG_DIR" "$PROJECT_DIR/reports/$TODAY"

log() { echo "[$(date '+%H:%M:%S')] $*" | tee -a "$LOG"; }

cd "$PROJECT_DIR"

# Pull latest code so audit/script fixes from prior runs are applied
git pull --rebase origin master >> "$LOG" 2>&1
log "Git pull done (exit $?)"

log "Running finance-quantification audit..."
AUDIT_OUTPUT_FILE="$LOG_DIR/.finance-quantification-audit-$TODAY-$NOW.tmp"
node scripts/finance-quantification-audit-cron.js > "$AUDIT_OUTPUT_FILE" 2>&1
AUDIT_EXIT=$?

cat "$AUDIT_OUTPUT_FILE" >> "$LOG"

if [ "$AUDIT_EXIT" -eq 0 ]; then
  log "Audit clean, nothing to do."
  rm -f "$AUDIT_OUTPUT_FILE"
  exit 0
fi

if [ "$AUDIT_EXIT" -eq 1 ]; then
  log "Audit script ERRORED (not a data finding) — skipping AI fixer, needs manual look."
  exit 1
fi

log "Audit found new anomalies (exit 2) — invoking AI fixer"
export AUDIT_OUTPUT_FILE
export REPORT_DATE="$TODAY"
export REPORT_TIME="$NOW"

out_file="$LOG_DIR/.finance-quantification-audit-fix-run.tmp"
"$CLAUDE_BIN" -p "/me:finance-quantification-audit-fix" \
  --dangerously-skip-permissions \
  > "$out_file" 2>&1
exit_code=$?
cat "$out_file" >> "$LOG"

if grep -q "hit your limit" "$out_file"; then
  log "Rate limit hit during AI fixer run."
fi

rm -f "$out_file" "$AUDIT_OUTPUT_FILE"
log "AI fixer done (exit $exit_code)"
