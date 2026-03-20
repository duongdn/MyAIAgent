#!/bin/bash
# Encrypt all secret config files using AES-256-CBC
# Reads SECRETS_KEY from .env file
# Outputs .enc files that are safe to commit to git

set -euo pipefail
cd "$(dirname "$0")/.."

# Load key from .env
if [ ! -f .env ]; then
  echo "ERROR: .env file not found. Create it with: SECRETS_KEY=your-secret-key"
  exit 1
fi
source .env

if [ -z "${SECRETS_KEY:-}" ]; then
  echo "ERROR: SECRETS_KEY not set in .env"
  exit 1
fi

# Files to encrypt
SECRET_FILES=(
  .email-accounts.json
  .slack-accounts.json
  .discord-accounts.json
  .google-docs.json
  .trello-config.json
  .scrin-config.json
  .redmine-config.json
  .elena-pending-actions.json
  .matrix-config.json
  .web-monitors.json
  .jira-config.json
  .monitoring-timelines.json
)

# Google service account key (variable name)
SA_KEY=$(ls daily-agent-*.json 2>/dev/null | head -1)
if [ -n "$SA_KEY" ]; then
  SECRET_FILES+=("$SA_KEY")
fi

encrypted=0
skipped=0

for file in "${SECRET_FILES[@]}"; do
  if [ -f "$file" ]; then
    openssl enc -aes-256-cbc -salt -pbkdf2 -in "$file" -out "${file}.enc" -pass "pass:${SECRETS_KEY}"
    echo "✓ Encrypted: $file → ${file}.enc"
    ((encrypted++))
  else
    echo "⚠ Skipped (not found): $file"
    ((skipped++))
  fi
done

echo ""
echo "Done: $encrypted encrypted, $skipped skipped"
echo "Encrypted files (.enc) are safe to commit to git."
