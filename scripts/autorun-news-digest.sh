#!/bin/bash
# Auto-run news digest headlessly via claude -p
# Cron: 0 19 * * * (19:00 UTC = 02:00 UTC+7)

PROJECT_DIR="/var/www/MyDailyAgent"
CLAUDE_BIN="/usr/bin/claude"
TODAY=$(TZ='Asia/Ho_Chi_Minh' date +%Y-%m-%d)
LOG_DIR="$PROJECT_DIR/tmp/alert-logs"

mkdir -p "$LOG_DIR" "$PROJECT_DIR/reports/$TODAY"

LOG="$LOG_DIR/news-digest-cron.log"

log() { echo "[$(date '+%H:%M:%S')] $*" | tee -a "$LOG"; }

# Kill any stale claude -p news-digest process older than 2 hours
stale_pids=$(pgrep -f "claude.*news-digest" 2>/dev/null)
for pid in $stale_pids; do
  age=$(ps -o etimes= -p "$pid" 2>/dev/null | tr -d ' ')
  if [ -n "$age" ] && [ "$age" -gt 7200 ]; then
    kill -9 "$pid" 2>/dev/null
    log "Killed stale news-digest process PID $pid (${age}s old)"
  fi
done

# Skip if digest already exists for today
if ls "$PROJECT_DIR/reports/$TODAY/"*news-digest.md &>/dev/null 2>&1; then
  log "News digest already exists for $TODAY, skipping."
  exit 0
fi

# Wait for network via TCP
for i in $(seq 1 12); do
  if nc -z -w3 imap.zoho.com 993 &>/dev/null; then break; fi
  sleep 5
done

cd "$PROJECT_DIR"

# Pull latest code so skill updates are applied before Claude runs
git_before=$(git rev-parse HEAD)
git pull --rebase origin master >> "$LOG" 2>&1
log "Git pull done (exit $?)"

# Re-exec if this script was updated
if [ "$(git rev-parse HEAD)" != "$git_before" ]; then
  if git diff "$git_before" HEAD --name-only 2>/dev/null | grep -q "scripts/autorun-news-digest.sh"; then
    log "autorun-news-digest script updated — re-execing"
    exec "$0" "$@"
  fi
fi

# Start Xvfb at :1 if not already running
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
# Handles: "resets 2am (UTC)", "resets 11pm (UTC)", "resets 9pm (UTC)"
wait_for_reset() {
  local out_file="$1"
  local reset_str
  reset_str=$(grep -oE 'resets [0-9]+(am|pm) \(UTC\)' "$out_file" | head -1)
  [ -z "$reset_str" ] && { log "Cannot parse reset time from limit message."; return 1; }

  local time_part hour ampm
  time_part=$(echo "$reset_str" | grep -oE '[0-9]+(am|pm)')
  hour=$(echo "$time_part" | grep -oE '[0-9]+')
  ampm=$(echo "$time_part" | grep -oE '(am|pm)')

  # Convert to 24h UTC
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

out_file="$LOG_DIR/.news-digest-run.tmp"

for attempt in 1 2; do
  # Re-compute date/time each attempt (day may change after sleeping)
  TODAY=$(TZ='Asia/Ho_Chi_Minh' date +%Y-%m-%d)
  export REPORT_DATE=$(TZ='Asia/Ho_Chi_Minh' date '+%Y-%m-%d')
  export REPORT_TIME=$(TZ='Asia/Ho_Chi_Minh' date '+%H%M')

  # Skip if digest already exists (may have been created while we slept)
  if ls "$PROJECT_DIR/reports/$TODAY/"*news-digest.md &>/dev/null 2>&1; then
    log "News digest already exists for $TODAY (after sleep), skipping."
    rm -f "$out_file"
    exit 0
  fi

  log "Starting news digest (--cron mode, attempt $attempt)"
  log "Report datetime (UTC+7): ${REPORT_DATE} ${REPORT_TIME}"

  "$CLAUDE_BIN" -p "/me:news-digest --report-date=${REPORT_DATE} --report-time=${REPORT_TIME}" \
    --dangerously-skip-permissions \
    > "$out_file" 2>&1

  exit_code=$?
  cat "$out_file" >> "$LOG"

  if grep -qE "hit your (session )?limit" "$out_file"; then
    rm -f "$out_file"
    if [ "$attempt" -eq 1 ]; then
      wait_for_reset "$LOG_DIR/.news-digest-run.tmp" 2>/dev/null || { log "Rate/session limit hit. Giving up."; exit 1; }
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
