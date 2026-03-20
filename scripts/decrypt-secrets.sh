#!/bin/bash
# Decrypt all secret config files from .enc files
# Reads SECRETS_KEY from .env file
# Run this after cloning on a new PC

set -uo pipefail
cd "$(dirname "$0")/.."

if [ ! -f .env ]; then
  echo "ERROR: .env file not found. Create it with: SECRETS_KEY=your-secret-key"
  exit 1
fi
source .env

if [ -z "${SECRETS_KEY:-}" ]; then
  echo "ERROR: SECRETS_KEY not set in .env"
  exit 1
fi

# Explicit list to avoid glob issues with dotfiles
ENC_FILES=(
  .email-accounts.json.enc
  .slack-accounts.json.enc
  .discord-accounts.json.enc
  .google-docs.json.enc
  .trello-config.json.enc
  .scrin-config.json.enc
  .redmine-config.json.enc
  .elena-pending-actions.json.enc
  .matrix-config.json.enc
  .web-monitors.json.enc
  .jira-config.json.enc
  .monitoring-timelines.json.enc
  .bailey-config.json.enc
)

# Add any daily-agent-*.json.enc
for f in daily-agent-*.json.enc; do
  [ -f "$f" ] && ENC_FILES+=("$f")
done

for enc_file in "${ENC_FILES[@]}"; do
  if [ -f "$enc_file" ]; then
    original="${enc_file%.enc}"
    openssl enc -aes-256-cbc -d -salt -pbkdf2 -in "$enc_file" -out "$original" -pass "pass:${SECRETS_KEY}"
    echo "✓ $enc_file → $original"
  else
    echo "⚠ skip: $enc_file"
  fi
done

echo "Done."
