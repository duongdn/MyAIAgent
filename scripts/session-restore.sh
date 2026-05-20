#!/usr/bin/env bash
# Restore Claude Code session state from docs/session-state.md on a new PC.
# Run after git pull to make Claude resume from where you left off.
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$PROJECT_ROOT/docs/session-state.md"

if [ ! -f "$SRC" ]; then
  echo "No saved session state at docs/session-state.md — nothing to restore."
  exit 0
fi

# Hash is based on current CWD (may differ from source PC, that's OK)
HASH=$(node -e "const c=require('crypto'); console.log(c.createHash('md5').update('$PROJECT_ROOT').digest('hex').slice(0,12));")
STATE_DIR="$HOME/.claude/session-states/$HASH"
STATE_FILE="$STATE_DIR/latest.md"

mkdir -p "$STATE_DIR"
cp "$SRC" "$STATE_FILE"
echo "Session state restored → $STATE_FILE"
echo "Start Claude Code in this project — it will resume from the saved state."
