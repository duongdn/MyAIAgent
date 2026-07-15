#!/bin/bash
# Auto-run daily report headlessly via claude -p
# Cron: 0 22 * * * (22:00 UTC = 05:00 UTC+7)
#
# Runs as a SINGLE claude -p session with --cron flag.
# Memory loads once; pieces execute inline (no subagents).
# This matches terminal behavior: 1 session, 1 memory load.

PROJECT_DIR="/var/www/MyDailyAgent"
CLAUDE_BIN="/usr/bin/claude"
TODAY=$(TZ='Asia/Ho_Chi_Minh' date +%Y-%m-%d)
REPORT_FILE="$PROJECT_DIR/reports/$TODAY/daily-report.md"
LOG_DIR="$PROJECT_DIR/tmp/alert-logs"

mkdir -p "$LOG_DIR" "$PROJECT_DIR/reports/$TODAY"

LOG="$LOG_DIR/daily-report-cron.log"

log() { echo "[$(date '+%H:%M:%S')] $*" | tee -a "$LOG"; }

# Kill any stale claude -p daily-report process older than 2 hours
stale_pids=$(pgrep -f "claude.*daily-report.*cron" 2>/dev/null)
for pid in $stale_pids; do
  age=$(ps -o etimes= -p "$pid" 2>/dev/null | tr -d ' ')
  if [ -n "$age" ] && [ "$age" -gt 7200 ]; then
    kill -9 "$pid" 2>/dev/null
    log "Killed stale daily-report process PID $pid (${age}s old)"
  fi
done

# Skip only when report is complete (has substantial content)
if [ -f "$REPORT_FILE" ] && [ $(wc -l < "$REPORT_FILE") -gt 50 ]; then
  log "Report already complete ($TODAY), skipping."
  exit 0
fi

# Wait for network via TCP (ICMP/ping is blocked on this server)
for i in $(seq 1 12); do
  if nc -z -w3 imap.zoho.com 993 &>/dev/null; then break; fi
  sleep 5
done

cd "$PROJECT_DIR"

# Pull latest code so skill/script updates are applied before Claude runs
git_before=$(git rev-parse HEAD)
git pull --rebase origin master >> "$LOG" 2>&1
log "Git pull done (exit $?)"

# Re-exec this script if it was updated (so new Xvfb/env changes take effect)
if [ "$(git rev-parse HEAD)" != "$git_before" ]; then
  if git diff "$git_before" HEAD --name-only 2>/dev/null | grep -q "scripts/autorun-daily-report.sh"; then
    log "autorun script updated — re-execing"
    exec "$0" "$@"
  fi
fi

# Start Xvfb at :1 if not already running (needed for Puppeteer browser scripts)
# Use socket check (xdpyinfo not always in PATH); sudo needed since /tmp/.X1-lock is root-owned
if [ ! -S /tmp/.X11-unix/X1 ]; then
  sudo Xvfb :1 -screen 0 1280x800x24 -ac &
  XVFB_PID=$!
  sleep 2
  log "Started Xvfb :1 (PID $XVFB_PID)"
else
  XVFB_PID=""
  log "Xvfb :1 already running"
fi
export DISPLAY=:1

# Parse reset time from limit message and sleep until then (+5min buffer)
wait_for_reset() {
  local out_file="$1"
  local reset_str
  reset_str=$(grep -oE 'resets [0-9]+(am|pm) \(UTC\)' "$out_file" | head -1)
  [ -z "$reset_str" ] && { log "Cannot parse reset time from limit message."; return 1; }

  local time_part hour ampm
  time_part=$(echo "$reset_str" | grep -oE '[0-9]+(am|pm)')
  hour=$(echo "$time_part" | grep -oE '[0-9]+')
  ampm=$(echo "$time_part" | grep -oE '(am|pm)')

  if [ "$ampm" = "pm" ] && [ "$hour" -ne 12 ]; then hour=$((hour + 12))
  elif [ "$ampm" = "am" ] && [ "$hour" -eq 12 ]; then hour=0; fi

  local now reset_epoch
  now=$(date -u +%s)
  reset_epoch=$(date -u -d "$(date -u +%Y-%m-%d) ${hour}:05:00" +%s 2>/dev/null)
  [ "$reset_epoch" -le "$now" ] && reset_epoch=$(date -u -d "tomorrow ${hour}:05:00" +%s 2>/dev/null)

  local sleep_secs=$(( reset_epoch - now ))
  log "Session/rate limit hit — sleeping ${sleep_secs}s until ${hour}:05 UTC then retrying."
  sleep "$sleep_secs"
}

# Log all running claude processes at cron start time (for quota debugging)
log "=== Claude processes at start ==="
ps aux | grep '[c]laude' | awk '{print $1,$2,$11,$12,$13}' | while read line; do log "  $line"; done
log "=== End process snapshot ==="

out_file="$LOG_DIR/.cron-run.tmp"

for attempt in 1 2; do
  # Re-compute date after potential sleep
  TODAY=$(TZ='Asia/Ho_Chi_Minh' date +%Y-%m-%d)
  REPORT_FILE="$PROJECT_DIR/reports/$TODAY/daily-report.md"
  mkdir -p "$PROJECT_DIR/reports/$TODAY"

  if [ -f "$REPORT_FILE" ] && [ "$(wc -l < "$REPORT_FILE")" -gt 50 ]; then
    log "Report already complete ($TODAY) after wait, skipping."
    rm -f "$out_file"
    exit 0
  fi

  log "Starting daily report (single session, --cron mode, attempt $attempt)"

  "$CLAUDE_BIN" -p "/me:daily-report --cron" \
    --dangerously-skip-permissions \
    > "$out_file" 2>&1

  exit_code=$?
  cat "$out_file" >> "$LOG"

  if grep -qE "hit your (session )?limit" "$out_file"; then
    rm -f "$out_file"
    if [ "$attempt" -eq 1 ]; then
      wait_for_reset "$LOG_DIR/.cron-run.tmp" 2>/dev/null || { log "Rate/session limit hit. Giving up."; exit 1; }
      continue
    fi
    log "Rate/session limit hit on retry. Giving up."
    exit 1
  fi

  rm -f "$out_file"
  log "Done (exit $exit_code)"
  break
done

# Kill Xvfb if we started it
if [ -n "$XVFB_PID" ]; then
  kill "$XVFB_PID" 2>/dev/null
  log "Stopped Xvfb (PID $XVFB_PID)"
fi
