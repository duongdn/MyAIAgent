#!/bin/bash
# Auto-commit + push on Stop/SessionEnd. Safe for multiple concurrent Claude Code
# sessions on the same repo: serializes via flock, retries on non-fast-forward,
# and always cleans up a failed rebase instead of leaving the repo stuck mid-rebase.
set -uo pipefail
cd "$CLAUDE_PROJECT_DIR" || exit 0

LOCK_FILE="$CLAUDE_PROJECT_DIR/.git/auto-commit.lock"
LOG_FILE="$CLAUDE_PROJECT_DIR/.git/auto-commit.log"
MAX_RETRIES=5

exec 200>"$LOCK_FILE"
flock -w 60 200 || { echo "$(date '+%F %T') lock timeout, skipping" >> "$LOG_FILE"; exit 0; }

# Clean up any leftover rebase from a previous failed run before touching anything.
if [ -d "$CLAUDE_PROJECT_DIR/.git/rebase-merge" ] || [ -d "$CLAUDE_PROJECT_DIR/.git/rebase-apply" ]; then
  git rebase --abort >> "$LOG_FILE" 2>&1
fi

if [ -z "$(git status --porcelain)" ]; then
  exit 0
fi

git add -A
if ! git commit -m "auto: $(date '+%Y-%m-%d %H:%M')" >> "$LOG_FILE" 2>&1; then
  echo "$(date '+%F %T') commit failed" >> "$LOG_FILE"
  exit 0
fi

attempt=0
while [ $attempt -lt $MAX_RETRIES ]; do
  attempt=$((attempt + 1))
  if git pull --rebase origin master >> "$LOG_FILE" 2>&1 && git push origin master >> "$LOG_FILE" 2>&1; then
    echo "$(date '+%F %T') pushed on attempt $attempt" >> "$LOG_FILE"
    exit 0
  fi
  echo "$(date '+%F %T') attempt $attempt failed, retrying" >> "$LOG_FILE"
  if [ -d "$CLAUDE_PROJECT_DIR/.git/rebase-merge" ] || [ -d "$CLAUDE_PROJECT_DIR/.git/rebase-apply" ]; then
    git rebase --abort >> "$LOG_FILE" 2>&1
  fi
  sleep $((RANDOM % 3 + 1))
done

echo "$(date '+%F %T') gave up after $MAX_RETRIES attempts — local commit kept, not pushed" >> "$LOG_FILE"
exit 0
