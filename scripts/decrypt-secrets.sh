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

# All config files are in config/
ENC_FILES=(
  config/.email-accounts.json.enc
  config/.slack-accounts.json.enc
  config/.discord-accounts.json.enc
  config/.google-docs.json.enc
  config/.trello-config.json.enc
  config/.scrin-config.json.enc
  config/.redmine-config.json.enc
  config/.elena-pending-actions.json.enc
  config/.matrix-config.json.enc
  config/.web-monitors.json.enc
  config/.jira-config.json.enc
  config/.monitoring-timelines.json.enc
  config/.bailey-config.json.enc
)

# Add any daily-agent-*.json.enc
for f in config/daily-agent-*.json.enc; do
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
