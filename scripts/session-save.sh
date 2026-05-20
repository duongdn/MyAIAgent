#!/usr/bin/env bash
# Save current Claude Code session state to docs/session-state.md for cross-PC resumability.
# State is loaded back by Claude on next SessionStart via the session-init hook.
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
HASH=$(node -e "const c=require('crypto'),o=require('os'),p=require('path'); console.log(c.createHash('md5').update('$PROJECT_ROOT').digest('hex').slice(0,12));")
STATE_FILE="$HOME/.claude/session-states/$HASH/latest.md"
DEST="$PROJECT_ROOT/docs/session-state.md"

if [ ! -f "$STATE_FILE" ]; then
  echo "No session state found at: $STATE_FILE"
  exit 0
fi

cp "$STATE_FILE" "$DEST"
echo "Session state saved → docs/session-state.md (from $STATE_FILE)"
echo "Commit docs/session-state.md to sync to another PC."
